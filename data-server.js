/**
 * Production server — serves frontend static files + API endpoints (Razorpay, data, registrations).
 * In dev mode (no dist/), runs as a pure API server on port 4000 for Vite proxy.
 * In production (dist/ exists), serves everything on PORT (default 3000).
 *
 * Usage:
 *   Dev:   node data-server.js & vite dev
 *   Prod:  npm run build && node data-server.js
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '.cloud-data.json');
const REGISTRATIONS_FILE = path.join(__dirname, '.soi-registrations.json');
const DIST_DIR = path.join(__dirname, 'dist');
const isProduction = fs.existsSync(DIST_DIR) && !process.env.API_ONLY;
const PORT = isProduction ? (parseInt(process.env.PORT, 10) || 3000) : (parseInt(process.env.DATA_API_PORT, 10) || 4000);

// Load env vars from .env manually (no dotenv dependency)
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
              val = val.slice(1, -1);
            }
            process.env[key] = val;
          }
        }
      }
    }
  } catch {}
}
loadEnv();

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RAZORPAY_KEY_ID = process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T0FdwnC16Luy4y';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ── MIME types for static file serving ──────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.pdf':  'application/pdf',
};

// ── Data helpers ────────────────────────────────────────────────────────────
function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {}
  return { adminData: {}, galleryMeta: [], galleryImages: {}, timestamp: null };
}
function writeData(obj) {
  obj.timestamp = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8');
}
function readRegistrations() {
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) return JSON.parse(fs.readFileSync(REGISTRATIONS_FILE, 'utf-8'));
  } catch {}
  return [];
}
function writeRegistrations(arr) {
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(arr, null, 2), 'utf-8');
}
function collectBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}
function serveStatic(url, res) {
  // Map '/' and extensionless SPA routes to '/index.html'
  let filePath = url === '/' ? '/index.html' : url;
  // SPA fallback: if no extension, serve index.html
  if (!path.extname(filePath)) filePath = '/index.html';

  const fullPath = path.join(DIST_DIR, filePath);

  // Prevent directory traversal
  if (!fullPath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      // SPA fallback — serve index.html for any unmatched route
      fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, indexData) => {
        if (err2) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexData);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}

// ── HTTP Server ─────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  // ── API Routes ──────────────────────────────────────────────────────────

  // GET /api/data
  if (req.method === 'GET' && req.url === '/api/data') {
    const data = readData();
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }

  // POST /api/data
  if (req.method === 'POST' && req.url === '/api/data') {
    try {
      const parsed = await collectBody(req);
      writeData(parsed);
      res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, timestamp: parsed.timestamp }));
    } catch {
      res.writeHead(400, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
    return;
  }

  // POST /api/create-order — Razorpay order creation
  if (req.method === 'POST' && req.url === '/api/create-order') {
    try {
      const { amount, currency, receipt } = await collectBody(req);
      if (!amount || amount <= 0) {
        res.writeHead(400, { ...CORS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid amount' }));
        return;
      }

      if (!RAZORPAY_KEY_SECRET) {
        console.error('RAZORPAY_KEY_SECRET is not set');
        res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payment gateway not configured' }));
        return;
      }

      // Call Razorpay API to create order
      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Razorpay expects paise
          currency: currency || 'INR',
          receipt: receipt || `receipt_${Date.now()}`,
          payment_capture: 1,
        }),
      });

      const order = await response.json();
      if (!response.ok) {
        console.error('Razorpay order creation failed:', JSON.stringify(order));
        res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: order.error?.description || 'Failed to create order', details: order }));
        return;
      }

      res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, order }));
    } catch (e) {
      console.error('Order creation error:', e);
      res.writeHead(500, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Server error creating order' }));
    }
    return;
  }

  // POST /api/soi-registration — store a completed registration
  if (req.method === 'POST' && req.url === '/api/soi-registration') {
    try {
      const reg = await collectBody(req);
      const registrations = readRegistrations();
      reg._id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      reg._createdAt = new Date().toISOString();
      registrations.push(reg);
      writeRegistrations(registrations);
      res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, id: reg._id }));
    } catch {
      res.writeHead(400, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid data' }));
    }
    return;
  }

  // GET /api/soi-registrations — list all registrations
  if (req.method === 'GET' && req.url === '/api/soi-registrations') {
    const registrations = readRegistrations();
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(registrations));
    return;
  }

  // ── Production: Serve static files ──────────────────────────────────────
  if (isProduction && req.method === 'GET') {
    serveStatic(req.url, res);
    return;
  }

  // 404
  res.writeHead(404, CORS);
  res.end('Not found');
});

// ── Start ───────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  const mode = isProduction ? 'PRODUCTION' : 'DEV (API only)';
  console.log(`[data-server] ${mode} — http://localhost:${PORT}`);
  if (isProduction) console.log(`[data-server] Serving static files from ${DIST_DIR}`);
});