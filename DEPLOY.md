# Deploying Fretwork to Vercel

Next.js is zero-config on Vercel, so there is no `vercel.json` to maintain.
Pick either path below. Both need a (free) Vercel account.

## Option A: CLI (fastest)

From inside `guitar-site/`:

```bash
npm i -g vercel
vercel login
vercel
```

- `vercel login` opens a browser to authenticate (you do this, not the tool).
- `vercel` runs an interactive first deploy. Accept the detected settings:
  framework **Next.js**, build command `next build`, output handled
  automatically. It creates a preview URL.
- When it looks right, ship production:

```bash
vercel --prod
```

## Option B: Git + dashboard (best for ongoing work)

1. Create a git repo and push to GitHub/GitLab/Bitbucket:

   ```bash
   git init
   git add .
   git commit -m "Fretwork: Next.js app with 10 tools"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Go to vercel.com, "Add New Project", import the repo.
3. Framework preset auto-detects as **Next.js**. Leave build settings default.
4. Deploy. Every future `git push` to `main` redeploys automatically; pull
   requests get preview URLs.

## After it is live

- Add a custom domain in the Vercel project settings once you pick the name.
- **Canonical / SEO URLs** resolve automatically from Vercel's production domain,
  so they are correct out of the box. When you attach a custom domain, set an
  environment variable in the Vercel project settings to pin every canonical,
  sitemap, and Open Graph URL to it:

  ```
  NEXT_PUBLIC_SITE_URL = https://your-domain.com
  ```

  Then redeploy. (Priority: `NEXT_PUBLIC_SITE_URL` > Vercel production domain >
  localhost. See `lib/seo.js`.)
- After the site is indexed, submit `https://your-domain.com/sitemap.xml` in
  Google Search Console.

## Notes

- No environment variables are required for the current build (no accounts /
  database yet).
- The tuner needs microphone permission and the audio tools need a user gesture
  to start; both work over HTTPS, which Vercel provides by default.
