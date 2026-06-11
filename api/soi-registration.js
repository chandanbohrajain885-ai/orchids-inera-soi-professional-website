// Vercel Serverless Function — POST /api/soi-registration & GET /api/soi-registrations
// Stores and retrieves SOI registrations

import fs from 'node:fs';
import path from 'node:path';

const REGISTRATIONS_FILE = '/tmp/soi-registrations.json';

function readRegistrations() {
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      return JSON.parse(fs.readFileSync(REGISTRATIONS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed to read registrations:', e);
  }
  return [];
}

function writeRegistrations(arr) {
  try {
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(arr, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write registrations:', e);
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    const registrations = readRegistrations();
    res.status(200).json(registrations);
    return;
  }

  if (req.method === 'POST') {
    try {
      const reg = req.body || {};
      reg._id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      reg._createdAt = new Date().toISOString();
      const registrations = readRegistrations();
      registrations.push(reg);
      writeRegistrations(registrations);
      res.status(200).json({ ok: true, id: reg._id });
    } catch {
      res.status(400).json({ error: 'Invalid data' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}