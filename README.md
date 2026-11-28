# social-autopost

Free, zero-click daily posting of Instagram Reels and YouTube Shorts for several channels, using the official Instagram Graph API, the YouTube Data API and GitHub Actions.

- **Every day at 6:00 PM IST** the `Post reels` workflow posts the next reel in each enabled channel's queue to Instagram (video + custom cover + caption) and, if turned on, to YouTube as a Short.
- Each platform is tracked separately: if YouTube fails but Instagram worked, the next run retries only YouTube.
- Right after, `Clean up posted reels` deletes the posted video from the repo and squashes git history, so the repo stays small.
- Posting results are logged in `state/<channel>/posted.json`.

GitHub's scheduler can start a few minutes late at busy times, so a post may go out at about 6:05–6:20 PM.

## How it's organised

```
channels.json                     # one entry per channel (enable/disable, which secrets to use)
queue/<channel>/<NNN-slug>/       # one folder per reel, posted in name order
    reel.mp4  cover.jpg  post.json   # post.json = {"caption": "..."}
state/<channel>/posted.json       # what was posted, when, and the Instagram link
scripts/post.mjs                  # posts the next reel per channel
scripts/cleanup.mjs               # removes posted reels from the queue
scripts/add-reel.mjs              # adds a reel to a queue
scripts/status.mjs                # shows queue + recent posts
scripts/check.mjs                 # verifies tokens for every platform
scripts/platforms/                # instagram.mjs, youtube.mjs
scripts/youtube-auth.mjs          # one-time YouTube sign-in to get a refresh token
```

## One-time setup (per Instagram account)

Your Instagram account must be **professional** (Creator or Business) and **linked to a Facebook Page**.

1. **Create a Meta app**: go to developers.facebook.com → *My Apps* → *Create app* → choose the **Business** type (or the use case for managing Instagram content with Facebook Login). Name it, for example, "autopost".
2. **Create a System User token that never expires**: business.facebook.com/settings → *Users → System users* → *Add* (role: Admin).
   - *Assign assets*: give it your **Facebook Page** (linked to the Instagram account) and the **app** with full control.
   - *Generate new token*: pick the app, set **Expiration: Never**, and tick `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`, `business_management`. Copy the token.
3. **Find the Instagram user ID**: in the Graph API Explorer (developers.facebook.com/tools/explorer), paste the token and run
   `me/accounts?fields=name,instagram_business_account`. The `instagram_business_account.id` value is the Instagram user ID.
4. **Add GitHub secrets** (repo → *Settings → Secrets and variables → Actions → New repository secret*):
   - `KAALCHITRA_IG_USER_ID` = the ID from step 3
   - `KAALCHITRA_IG_TOKEN` = the token from step 2
5. **Allow the workflows to commit**: repo → *Settings → Actions → General → Workflow permissions* → **Read and write permissions**.
6. **Test**: *Actions → Check setup → Run workflow* should show ✓ with your @username. Then *Actions → Post reels → Run workflow* with **Dry run** ticked shows what would be posted.

## YouTube Shorts setup (per channel, one time)

1. **Google Cloud project**: console.cloud.google.com → new project (e.g. "kaalchitra-autopost") → *APIs & Services → Library* → enable **YouTube Data API v3**.
2. **OAuth consent screen**: *APIs & Services → OAuth consent screen* → External → app name + your email → add yourself as a test user → then click **Publish app** (set it to *In production*). In *Testing* mode Google expires the refresh token after 7 days; in production it doesn't. You'll see an "unverified app" warning when signing in, which is fine for your own channel.
3. **OAuth client**: *Credentials → Create credentials → OAuth client ID* → type **Desktop app** → copy the **Client ID** and **Client secret**.
4. **Get the refresh token** on your computer (Node 18+), inside this repo folder:
   `node scripts/youtube-auth.mjs <CLIENT_ID> <CLIENT_SECRET>`
   Open the printed link, sign in with the Google account that owns the channel (pick the channel if asked), allow access, and copy the refresh token from the terminal.
5. **GitHub secrets**: `KAALCHITRA_YT_CLIENT_ID`, `KAALCHITRA_YT_CLIENT_SECRET`, `KAALCHITRA_YT_REFRESH_TOKEN`.
6. In `channels.json`, set `"youtube": {"enabled": true, ...}` for the channel, then run *Actions → Check setup*.

**Important:** videos uploaded through a new, unaudited API project are locked to **private** by YouTube until the project passes Google's free API compliance audit. Apply via the "YouTube API Services Audit and Quota Extension Form". Until approved, Shorts upload as private and you can switch them to public in YouTube Studio. Custom thumbnails also need a phone-verified channel; otherwise YouTube picks a frame.

Options per channel in `channels.json` → `youtube`: `privacy` (`public`, `unlisted`, `private`), `categoryId` (24 Entertainment, 27 Education). In a reel's `post.json` you can set `"title"` to override the Short's title (default: first line of the caption + `#shorts`).

## Adding another channel (e.g. Behind Everything)

1. In `channels.json`, set `"enabled": true` for `behind-everything` (or copy an entry with a new name).
2. Add its two secrets, `BEHIND_EVERYTHING_IG_USER_ID` and `BEHIND_EVERYTHING_IG_TOKEN`, following steps 2–4 for that account.
3. Add reels: `node scripts/add-reel.mjs behind-everything 001-tv-remote reel.mp4 cover.jpg --caption "..."`

Then add the channel's secret names to the `env:` list in `.github/workflows/post.yml` and `check.yml` (Behind Everything's are already there). Secrets are passed by name only, never all at once, so GitHub doesn't flag the workflow.

## Everyday use

- Add reels to the queue and push; one per channel posts each day at 6 PM IST.
- Pause a channel: set `"enabled": false`.
- Post 2 per day: set `"postsPerRun": 2`.
- Post right now: *Actions → Post reels → Run workflow*.
- If a post fails (for example a bad token), the run fails, GitHub emails you, and the reel stays in the queue for the next day.

## Limits

- Instagram allows up to 50 API posts per account per day.
- Reels must be 3–90 s, 9:16 (ours are 1080×1920).
- Trending Instagram audio can't be added through the API; reels post with their own sound.
- The repo is public, so queued videos are visible on GitHub until they're posted and cleaned up.

## Posting exactly at 6 PM (outside timer)

GitHub's own schedule can start runs hours late, so the main trigger is a free timer at cron-job.org that starts the "Post reels" workflow at 6:00 PM IST. The GitHub schedule (6:11 PM) stays as a backup.

Runs only post between 6 and 9 PM IST, and only once per day per channel, so a late or duplicate run never posts at the wrong time. To post right now anyway: Actions → Post reels → Run workflow → tick **force**.

1. GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token. Repository access: only `social-autopost`. Permissions: **Actions: Read and write**. Copy the token.
2. cron-job.org → Create cronjob:
   - URL: `https://api.github.com/repos/kuldeeppatil341997/social-autopost/actions/workflows/post.yml/dispatches`
   - Schedule: every day at 18:00, time zone Asia/Kolkata
   - Advanced → Request method **POST**; headers `Authorization: Bearer <token>`, `Accept: application/vnd.github+json`; body `{"ref":"main"}`
3. Use "Test run": a new "Post reels" run should appear in Actions (it posts only if it's 6-9 PM).
