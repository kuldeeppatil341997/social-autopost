// Verifies each enabled channel's credentials for every platform it uses.
// Usage: node scripts/check.mjs
import {channels, graph, platformsFor} from './lib.mjs';
import * as instagram from './platforms/instagram.mjs';
import * as youtube from './platforms/youtube.mjs';

const OAUTH = process.env.GOOGLE_OAUTH_BASE || 'https://oauth2.googleapis.com';
const API = process.env.YT_API_BASE || 'https://www.googleapis.com/youtube/v3';
let bad = 0;
for (const ch of channels()) {
  if (!ch.enabled) continue;
  for (const pl of platformsFor(ch)) {
    try {
      if (pl === 'instagram') {
        const c = instagram.credentials(ch);
        if (instagram.missing(c)) throw new Error(`secrets ${ch.instagram.userIdSecret}/${ch.instagram.tokenSecret} not set`);
        const me = await graph('GET', c.userId, {fields: 'username,followers_count'}, c.token);
        const lim = await graph('GET', `${c.userId}/content_publishing_limit`, {fields: 'quota_usage,config'}, c.token).catch(() => null);
        const q = lim?.data?.[0];
        console.log(`✓ ${ch.name} instagram: @${me.username} (${me.followers_count} followers)${q ? `, posts used today ${q.quota_usage}/${q.config?.quota_total}` : ''}`);
      } else {
        const c = youtube.credentials(ch);
        if (youtube.missing(c)) throw new Error(`secrets ${ch.youtube.clientIdSecret}/${ch.youtube.clientSecretSecret}/${ch.youtube.refreshTokenSecret} not set`);
        const t = await fetch(`${OAUTH}/token`, {method: 'POST', body: new URLSearchParams({client_id: c.clientId, client_secret: c.clientSecret, refresh_token: c.refreshToken, grant_type: 'refresh_token'})}).then((r) => r.json());
        if (!t.access_token) throw new Error(`token refresh failed: ${t.error}${t.error_description ? ' (' + t.error_description + ')' : ''}`);
        const me = await fetch(`${API}/channels?part=snippet,statistics&mine=true`, {headers: {Authorization: `Bearer ${t.access_token}`}}).then((r) => r.json());
        const chn = me.items?.[0];
        if (!chn) throw new Error('no YouTube channel on this Google account');
        console.log(`✓ ${ch.name} youtube: ${chn.snippet.title} (${chn.statistics.subscriberCount} subscribers), uploads as ${c.privacy}`);
      }
    } catch (e) { console.log(`✗ ${ch.name} ${pl}: ${e.message}`); bad++; }
  }
}
if (bad) process.exit(1);
