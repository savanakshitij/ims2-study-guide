# IMS2 Study Guide — sync setup (phone ↔ laptop, anywhere)

The page works **right now** in local-only mode (progress saves on each device
separately). To make checkboxes sync across phone + laptop over the internet,
do the two parts below. ~10 minutes, all free.

---

## Part 1 — Free cloud store (Supabase)

1. Go to <https://supabase.com> → **Start your project** → sign in with GitHub or email.
2. **New project**. Give it any name, pick a region near you, set a database
   password (you won't need it again). Wait ~2 min for it to provision.
3. In the left sidebar open **SQL Editor** → **New query**, paste this, click **Run**:

   ```sql
   create table if not exists progress (
     id text primary key,
     data jsonb,
     updated_at bigint
   );
   alter table progress enable row level security;
   create policy "anon read/write" on progress
     for all to anon using (true) with check (true);
   ```

   > This lets the page read and write progress with the public "anon" key.
   > It's a personal study tracker, so open access to this one table is fine —
   > the worst anyone could do is tick your checkboxes.

4. Left sidebar → **Project Settings** (gear) → **API**. Copy two things:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon public** key — a long string starting with `eyJ...`

5. Open `index.html` and paste them into the CONFIG block near the bottom:

   ```js
   const SUPABASE_URL='https://abcdefgh.supabase.co';
   const SUPABASE_ANON_KEY='eyJhbGciOi...';   // the anon public key
   ```

   Save. That's the sync wired up. The little dot under the progress bar will
   read **● synced** once it connects.

---

## Part 2 — Put the page on the internet (so the phone can open it)

Pick **one** host. All free, no card.

### Option A — Netlify Drop (easiest, no account needed to start)
1. Go to <https://app.netlify.com/drop>.
2. Drag the **`study-guide` folder** onto the page.
3. It gives you a URL like `https://something.netlify.app` — open that on your phone.
   (Create a free account when prompted if you want to keep the URL permanent.)

### Option B — GitHub Pages
1. Create a free GitHub account, make a new **public** repo.
2. Upload `index.html` (and this folder's files) to it.
3. Repo **Settings → Pages** → Source: `main` branch, `/root` → Save.
4. Your site appears at `https://<user>.github.io/<repo>/` in a minute or two.

> You only need to re-deploy if you change the page itself. Checkbox progress
> lives in Supabase, so it syncs without re-uploading anything.

---

## How the sync behaves
- Tick a topic on your laptop → it pushes to Supabase within ~½ second.
- Your phone pulls every 8 seconds, so it catches up on its own (or instantly on reload).
- No internet? It keeps saving locally and re-syncs when you're back online
  (status dot shows **● offline (saved locally)**).
- Last change wins if you somehow edit both at the exact same time.

## Local testing on the laptop
- Double-click `start-study-guide.bat`, or run `node server.mjs`, then open
  <http://localhost:8080>.
