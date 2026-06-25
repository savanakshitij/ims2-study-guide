// Stores the study-guide progress in Netlify Blobs (no external DB needed).
// GET  -> returns { data, updated_at }
// POST -> body { data, updated_at } overwrites the stored progress
import { getStore } from '@netlify/blobs';

const KEY = 'ims2';

export default async (req) => {
  const store = getStore('study-progress');

  if (req.method === 'GET') {
    const saved = await store.get(KEY, { type: 'json' });
    return Response.json(saved || { data: {}, updated_at: 0 });
  }

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); } catch { return new Response('Bad JSON', { status: 400 }); }
    const record = { data: body.data || {}, updated_at: body.updated_at || Date.now() };
    await store.setJSON(KEY, record);
    return Response.json({ ok: true });
  }

  return new Response('Method not allowed', { status: 405 });
};

export const config = { path: '/.netlify/functions/progress' };
