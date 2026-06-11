// Vercel Serverless Function — GET/POST /api/data
// Cross-device sync for admin data and gallery

import fs from 'node:fs';

const DATA_FILE = '/tmp/cloud-data.json';

function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed to read data:', e);
  }
  return { adminData: {}, galleryMeta: [], galleryImages: [], timestamp: null };
}

function writeData(obj) {
  try {
    obj.timestamp = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write data:', e);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    const data = readData();
    res.status(200).json(data);
    return;
  }

  if (req.method === 'POST') {
    try {
      const parsed = req.body || {};
      writeData(parsed);
      res.status(200).json({ ok: true, timestamp: parsed.timestamp });
    } catch {
      res.status(400).json({ error: 'Invalid data' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}