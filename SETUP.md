# IMS2 Study Guide — GitHub + Netlify (auto-deploy, syncs everywhere)

The plan: your code lives in a **GitHub** repo. **Netlify** is connected to that
repo, so every `git push` rebuilds and redeploys the site automatically. Progress
is stored by a small Netlify function (Netlify Blobs) — **no database, no keys,
no SQL** to set up. Phone and laptop sync over the internet.

Everything's already built and committed locally. Three one-time steps:

---

## Step 1 — Put the repo on GitHub

GitHub CLI (`gh`) is installed. In a **normal terminal** (PowerShell), run:

```powershell
cd "C:\Users\savan\Documents\claue\study-guide"
gh auth login
```

For `gh auth login`, choose: **GitHub.com → HTTPS → Yes (authenticate Git) →
Login with a web browser**. It shows a one-time code; press Enter, paste the code
in the browser, done.

Then create the repo and push in one command:

```powershell
gh repo create ims2-study-guide --public --source . --remote origin --push
```

(Use `--private` instead of `--public` if you'd rather keep it private — Netlify
works with either.)

---

## Step 2 — Connect Netlify to the repo (this is the "auto" part)

1. Go to <https://app.netlify.com> → sign up / log in (use your GitHub account —
   one click).
2. **Add new site → Import an existing project → Deploy with GitHub**.
3. Authorize Netlify, then pick the **`ims2-study-guide`** repo.
4. Build settings: leave them as detected (Netlify reads `netlify.toml` —
   publish `.`, functions `netlify/functions`, no build command). Click **Deploy**.

After ~1 minute you get a URL like `https://ims2-study-guide.netlify.app`.
Open it on your laptop and your phone — ticking topics on one shows up on the
other within a few seconds. The dot under the progress bar reads **● synced**.

> From now on it's automatic: any change you push to GitHub redeploys the site.
> No re-uploading, ever.

---

## Making changes later

```powershell
cd "C:\Users\savan\Documents\claue\study-guide"
git add -A
git commit -m "describe the change"
git push
```

Netlify sees the push and redeploys in about a minute.

---

## How the sync behaves
- Tick a topic → it POSTs to the Netlify function within ~½ second.
- Other devices pull every 8 seconds (or instantly on reload) and catch up.
- Offline? It keeps saving locally and re-syncs when you're back online
  (status dot shows **● offline (saved locally)**).
- Last change wins if you somehow edit both devices at the same instant.

## Local preview (optional, no sync)
Double-click `start-study-guide.bat` (or `node server.mjs`) and open
<http://localhost:8080>. The plain local server can't run the sync function, so
it just previews the page and saves locally — that's expected.
