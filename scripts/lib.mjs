// Shared helpers for the autopost scripts. Node 20+, no dependencies.
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const GRAPH_VERSION = process.env.GRAPH_VERSION || 'v22.0';
export const GRAPH = process.env.GRAPH_BASE || 'https://graph.facebook.com';
export const RUPLOAD = process.env.RUPLOAD_BASE || 'https://rupload.facebook.com';

export const readJSON = (p, fallback) => {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
};
export const writeJSON = (p, v) => {
  fs.mkdirSync(path.dirname(p), {recursive: true});
  fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');
};

export const channels = () => {
  const all = readJSON(path.join(ROOT, 'channels.json'), {});
  return Object.entries(all).filter(([k]) => !k.startsWith('_')).map(([name, cfg]) => ({name, ...cfg}));
};

export const postedLogPath = (ch) => path.join(ROOT, 'state', ch, 'posted.json');
export const queueDir = (ch) => path.join(ROOT, 'queue', ch);

// Queue items are folders sorted by name: queue/<channel>/<NNN-slug>/{reel.mp4, cover.jpg, post.json}
export const queueItems = (ch) => {
  const dir = queueDir(ch);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, {withFileTypes: true})
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((slug) => {
      const p = path.join(dir, slug);
      const files = fs.readdirSync(p);
      const video = files.find((f) => /\.(mp4|mov)$/i.test(f));
      const cover = files.find((f) => /\.(jpe?g|png)$/i.test(f));
      const meta = readJSON(path.join(p, 'post.json'), {});
      return {slug, dir: p, video: video && path.join(p, video), cover: cover && path.join(p, cover), meta};
    });
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const log = (...a) => console.log(new Date().toISOString(), ...a);

export async function graph(method, pathname, params, token) {
  const url = new URL(`${GRAPH}/${GRAPH_VERSION}/${pathname}`);
  const body = new URLSearchParams({...params, access_token: token});
  const res = method === 'GET'
    ? await fetch(`${url}?${body}`)
    : await fetch(url, {method, body});
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    const e = json.error || {};
    throw new Error(`Graph ${method} ${pathname} failed (${res.status}): ${e.message || JSON.stringify(json)}`);
  }
  return json;
}

// Secrets: plain env vars locally, or one JSON blob (SECRETS_JSON) in GitHub Actions.
const secretsBlob = (() => { try { return JSON.parse(process.env.SECRETS_JSON || '{}'); } catch { return {}; } })();
// All whitespace removed: IDs and tokens never contain any, but a value copied from a wrapped terminal line often does.
export const secret = (name) => (name ? (process.env[name] || secretsBlob[name] || '').replace(/\s+/g, '') || undefined : undefined);

// Platforms a channel posts to. Instagram is on unless "enabled": false; YouTube only when "enabled": true.
export const platformsFor = (ch) => [
  ch.instagram && ch.instagram.enabled !== false ? 'instagram' : null,
  ch.youtube && ch.youtube.enabled === true ? 'youtube' : null,
].filter(Boolean);

// posted.json entries: {slug, platform, ...}. Old entries without a platform were Instagram posts.
export const postedOn = (posted, slug) => new Set(posted.filter((p) => p.slug === slug).map((p) => p.platform || 'instagram'));
export const isDone = (ch, posted, slug) => {
  const on = postedOn(posted, slug);
  return platformsFor(ch).every((pl) => on.has(pl));
};
