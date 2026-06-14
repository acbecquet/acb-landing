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

## Custom domain — acb-apps.com

Vercel → Project → **Settings → Domains** → add **`acb-apps.com`** (and optionally
`www.acb-apps.com`). Vercel then shows the exact DNS records to add at your registrar:

- **Apex `acb-apps.com`:** an **A** record → `76.76.21.21`
  *(or, if your registrar supports it, an ALIAS/ANAME → `cname.vercel-dns.com`)*.
- **`www.acb-apps.com`:** a **CNAME** → `cname.vercel-dns.com`.

DNS can take a few minutes to a few hours to propagate; Vercel provisions the HTTPS
certificate automatically once it resolves. Pick whichever you want as the **primary**
(apex or `www`) and Vercel redirects the other to it.

### If the domain is registered/managed at Squarespace

Squarespace is the **DNS host**, so the records above must be added **in Squarespace** —
adding the domain in Vercel only tells Vercel to expect it and shows you which records to
create. The domain won't work until Squarespace actually points at Vercel:

1. Squarespace → **Domains → `acb-apps.com` → DNS / DNS Settings** (Squarespace bought
   Google Domains; the panel may read "DNS" or "Advanced DNS").
2. **Remove** Squarespace's default parking records that conflict — the existing `@`
   **A** records and the `www` **CNAME** pointing at Squarespace.
3. **Add:**
   - **A** · Host `@` · Value `76.76.21.21`
   - **CNAME** · Host `www` · Value `cname.vercel-dns.com`
4. Save. In Vercel the domain flips from "Invalid Configuration" to verified once DNS
   propagates, and HTTPS is issued automatically.

If Vercel throws a hard **error when you add the domain** (vs. just "Invalid
Configuration"), it's almost always one of:
- **"Domain is already in use"** — it's still attached to a Squarespace site, or to another
  Vercel project/account. Detach it there first, or use the **TXT** ownership-verification
  record Vercel offers.
- The apex-vs-`www` redirect prompt — not an error, just pick which one is primary.

## Notes

- Fonts load from Google Fonts at runtime — nothing to configure.
- The headline balancing uses `@chenglou/pretext`; if a browser ever lacks the APIs
  it needs, headlines fall back to normal wrapping (nothing breaks).
