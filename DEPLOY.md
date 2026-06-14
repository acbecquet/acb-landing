# Deploying ACB Landing to Vercel

This is a static **Vite + TypeScript** site (two pages: `/` and `/memoir.html`). No
server, no environment variables, no database — Vercel just builds and serves `dist/`.

## One-time setup

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. **Import** the `acbecquet/acb-landing` repository.
3. Vercel auto-detects the framework as **Vite**. Confirm the settings (they match
   `vercel.json`, so you shouldn't need to change anything):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**. In ~1 minute you'll get a live `https://<project>.vercel.app` URL.

## Production branch

Vercel deploys your repo's **default branch** as Production and gives every other
branch its own **preview URL** on each push. Right now the work lives on
`claude/focused-bell-09qwoj`. Two options:

- **Quick:** in Vercel → Project → **Settings → Git → Production Branch**, set it to
  `claude/focused-bell-09qwoj`. Every push there redeploys Production.
- **Cleaner (recommended later):** promote this work to `main` and use that as the
  default/Production branch. (Say the word and I'll set `main` up — it's a one-time
  thing that also unlocks a normal PR flow.)

## Local development

```bash
npm install      # once
npm run dev      # http://localhost:5173  (hot reload)
npm run build    # type-check + production build into dist/
npm run preview  # serve the built dist/ locally
```

## Custom domain (optional)

Vercel → Project → **Settings → Domains** → add your domain and follow the DNS
instructions. Works the same for an apex (`acb.dev`) or subdomain (`www`).

## Notes

- Fonts load from Google Fonts at runtime — nothing to configure.
- The headline balancing uses `@chenglou/pretext`; if a browser ever lacks the APIs
  it needs, headlines fall back to normal wrapping (nothing breaks).
