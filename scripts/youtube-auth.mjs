// One-time helper: get a YouTube refresh token for a channel. Run on your own computer (needs Node 18+).
//   node scripts/youtube-auth.mjs <CLIENT_ID> <CLIENT_SECRET>
// It prints a Google sign-in link. Sign in with the account that owns the YouTube channel (pick the channel
// if asked), allow access, and the refresh token is printed here. Save it as a GitHub secret; don't commit it.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

// Written next to where you run the script, so the token never has to be copied out of a wrapped terminal line.
const OUT = 'youtube-refresh-token.txt';

const [clientId, clientSecret] = process.argv.slice(2);
if (!clientId || !clientSecret) {
  console.error('Usage: node scripts/youtube-auth.mjs <CLIENT_ID> <CLIENT_SECRET>');
  process.exit(1);
}
const PORT = 8085;
const redirect = `http://127.0.0.1:${PORT}`;
const scopes = ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'];
const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
  client_id: clientId, redirect_uri: redirect, response_type: 'code', scope: scopes.join(' '),
  access_type: 'offline', prompt: 'consent',
});

const server = http.createServer(async (req, res) => {
  const code = new URL(req.url, redirect).searchParams.get('code');
  if (!code) { res.end('Waiting for Google sign-in…'); return; }
  const t = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirect, grant_type: 'authorization_code'}),
  }).then((r) => r.json());
  if (t.refresh_token) {
    // Prove the token works before it goes into GitHub: refresh it and read the channel it uploads to.
    const r = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: new URLSearchParams({client_id: clientId, client_secret: clientSecret, refresh_token: t.refresh_token, grant_type: 'refresh_token'}),
    }).then((x) => x.json());
    const me = r.access_token
      ? await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {headers: {Authorization: `Bearer ${r.access_token}`}}).then((x) => x.json())
      : {};
    const channel = me.items?.[0]?.snippet?.title;
    fs.writeFileSync(OUT, t.refresh_token);
    res.end(channel ? `Done! Connected to the YouTube channel "${channel}". Go back to the terminal.` : 'Got a token, but no YouTube channel was found. Check the terminal.');
    console.log(channel ? `\n✓ Token works. It uploads to the YouTube channel: ${channel}` : `\n✗ Token test failed: ${r.error || 'no YouTube channel on the account you picked'}`);
    console.log(`\nThe refresh token (${t.refresh_token.length} characters) is saved in:\n  ${path.resolve(OUT)}`);
    console.log('Open that file in Notepad, select all, copy, and paste it into the GitHub secret. Delete the file afterwards.\n');
  } else {
    res.end('Something went wrong. Check the terminal.');
    console.error('No refresh token returned:', t);
  }
  server.close();
});
server.listen(PORT, '127.0.0.1', () => console.log(`Open this link in your browser and sign in:\n\n${url}\n`));
