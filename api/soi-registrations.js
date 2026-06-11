// Vercel Serverless Function — GET /api/soi-registrations
// Lists all SOI registrations

import fs from 'node:fs';

const REGISTRATIONS_FILE = '/tmp/soi-registrations.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  let registrations = [];
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      registrations = JSON.parse(fs.readFileSync(REGISTRATIONS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed to read registrations:', e);
  }

  res.status(200).json(registrations);
}