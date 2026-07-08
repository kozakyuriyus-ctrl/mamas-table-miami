# Lana's Kitchen Miami — Recovery Guide

> **Keep this file updated.** It contains no secrets — safe to store in Git.
> Last updated: 2026-07-08 | Commit: 7b9eb13

---

## 1. Project

| | |
|---|---|
| **Name** | Lana's Kitchen Miami |
| **Production URL** | https://lanaskitchenmiami.com |
| **Local project path** | `~/Documents/mamas-table-miami/` |
| **GitHub repository** | https://github.com/kozakyuriyus-ctrl/mamas-table-miami |
| **Production branch** | `main` |
| **GitHub Pages source** | Branch: `main` / root `/` |
| **Deploy trigger** | Push to `main` → GitHub Pages auto-deploys |

---

## 2. External Services

| Service | Purpose | Access |
|---------|---------|--------|
| **GitHub** | Code hosting + GitHub Pages (static site) | github.com/kozakyuriyus-ctrl |
| **Cloudflare** | DNS + CDN + Worker runtime | dash.cloudflare.com |
| **Cloudflare Worker** | Preorder API, Google Places proxy, Telegram notifications | Worker name: `lanas-kitchen-preorder-api` |
| **Custom domain** | lanaskitchenmiami.com | Managed via Cloudflare DNS |
| **Worker API domain** | api.lanaskitchenmiami.com | Cloudflare Worker route |
| **Google Cloud** | Google Places API (used via Worker) | console.cloud.google.com |

---

## 3. What IS Stored in Git

- HTML pages (`index.html`, `contact.html`, `custom-order.html`, etc.)
- CSS (`styles.css`)
- JavaScript (`script.js`)
- Static assets (`assets/images/`, `assets/icons/`)
- Favicon files
- Cloudflare Worker source code (`worker/index.js`, `worker/wrangler.toml`)
- Admin panel (`admin/index.html`)
- GitHub Actions workflow (`.github/workflows/`)
- This recovery guide and documentation

---

## 4. What is NOT Stored in Git

| Secret / Credential | Where It Lives |
|--------------------|----------------|
| TELEGRAM_BOT_TOKEN | Cloudflare Worker secret (dashboard) |
| TELEGRAM_CHAT_ID | Cloudflare Worker secret (dashboard) |
| GOOGLE_PLACES_KEY | Cloudflare Worker secret (dashboard) |
| Admin Bearer token | Stored locally in browser localStorage |
| Cloudflare account credentials | Password manager |
| Google Cloud credentials | Google Cloud Console |
| Billing information | Cloudflare + Google Cloud billing pages |
| Domain renewal credentials | Domain registrar / Cloudflare |

---

## 5. Backup

### Run local backup

```bash
bash ~/Documents/mamas-table-miami/scripts/backup-project.sh
```

### Backup location

```
~/Documents/LanasKitchenBackups/
```

Archives are named: `lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz`

### What is excluded from backup

- `.git/` directory
- `node_modules/`
- `.wrangler/` and `worker/.wrangler/`
- `.gstack/`
- `.env`, `.dev.vars` (secret files)
- `*.pem`, `*.key`
- `qa-shots-*/` (QA screenshots)
- `menu-audit-export.*`
- `.DS_Store`

---

## 6. Restore

### Check current production commit

```bash
git log --oneline -5
git log origin/main --oneline -5
```

### Restore a single file from a previous commit

```bash
git checkout <commit-hash> -- styles.css
# or
git checkout <commit-hash> -- index.html
```

### Revert the last deploy (undo last push to production)

```bash
# See recent commits
git log --oneline -10

# Revert last commit (safe — creates new revert commit)
git revert HEAD
git push origin main
# GitHub Pages redeploys automatically
```

### Restore from a Git tag

```bash
# List tags
git tag --sort=-creatordate

# Create a branch from a stable tag to inspect
git checkout -b rollback-check production-stable-2026-07-08

# Hard reset main to a tag (DESTRUCTIVE — confirm before running)
# git checkout main
# git reset --hard production-stable-2026-07-08
# git push origin main --force   ← only if truly necessary
```

### Redeploy GitHub Pages after rollback

GitHub Pages deploys automatically on every push to `main`. After any `git push origin main`, the site updates within ~60 seconds.

To verify deploy status:
```bash
gh run list --repo kozakyuriyus-ctrl/mamas-table-miami --limit 5
```

---

## 7. Worker Recovery

### Find the Worker

1. Open [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → find `lanas-kitchen-preorder-api`

### Roll back Worker via Dashboard

1. Cloudflare dashboard → Workers → `lanas-kitchen-preorder-api`
2. **Deployments** tab → find previous stable deployment
3. Click **Rollback** next to the version you want

### Roll back Worker via Wrangler CLI

```bash
# List recent deployments
npx wrangler deployments list --name lanas-kitchen-preorder-api

# Roll back to a specific deployment ID
npx wrangler rollback <deployment-id> --name lanas-kitchen-preorder-api
```

### Re-deploy Worker from local source

```bash
cd ~/Documents/mamas-table-miami/worker
npx wrangler deploy
# Secrets are stored in Cloudflare — no need to re-set after code redeploy
```

> **Note:** Worker secrets (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GOOGLE_PLACES_KEY) are stored in Cloudflare and survive code redeployments. You do NOT need to re-enter them after a normal redeploy.

---

## 8. Owner Security Checklist

Run through this checklist at least once per quarter:

- [ ] **GitHub 2FA** enabled on kozakyuriyus-ctrl account
- [ ] **Cloudflare 2FA** enabled on Cloudflare account
- [ ] **Domain auto-renewal** is ON for lanaskitchenmiami.com
- [ ] **Google Cloud billing alerts** configured
- [ ] All credentials stored in a password manager (not in plain text)
- [ ] At least one local backup exists in `~/Documents/LanasKitchenBackups/`
- [ ] GitHub repository is not accidentally set to Public if it should be Private (or vice versa)
- [ ] Reviewed who has access to GitHub repository

---

## 9. Quick Reference — Emergency Recovery

| Scenario | Action |
|----------|--------|
| Bad CSS/JS pushed to production | `git revert HEAD && git push origin main` |
| Need to go back 2 commits | `git revert HEAD~1 HEAD && git push origin main` |
| Site returns 404 | Check GitHub Pages settings → branch must be `main` |
| Worker returning 500 | Rollback via Cloudflare dashboard Deployments tab |
| API key compromised | Rotate in Google Cloud Console, update via `wrangler secret put GOOGLE_PLACES_KEY` |
| Telegram bot broken | Verify TELEGRAM_BOT_TOKEN in Cloudflare Worker secrets |
| Domain expired | Renew at domain registrar / Cloudflare Registrar |
