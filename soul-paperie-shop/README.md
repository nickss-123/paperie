# Soul Paperie Co. — Shop

A React + Vite + Tailwind storefront, split into separate files (see "Project structure" below).

## ⚠️ Read this first

The original version of this shop ran inside Claude.ai's Artifacts feature and used
`window.storage`, a save/load API that **only exists inside Claude.ai**. This project
replaces it with the browser's built-in `localStorage` (see `src/lib/storage.js`), so it
runs as a normal, independent website.

**The trade-off:** `localStorage` is per-browser, per-device. Products you add in the
admin panel only show up in the browser you added them from — a customer on their own
phone won't see them, and won't share data with other customers either. This is fine to
build, test, and demo, but for a real live shop where everyone sees the same catalog and
orders reach you from anywhere, you eventually need a real backend + database (e.g.
Supabase, Firebase). Only `src/lib/storage.js` would need to change — the rest of the app
is already written to work through those four functions.

## Project structure

```
soul-paperie-shop/
├── index.html              # HTML entry point
├── package.json            # dependencies + scripts
├── vite.config.js          # build tool config
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # required by Tailwind
└── src/
    ├── main.jsx             # mounts the app
    ├── App.jsx               # top-level app, switches between views
    ├── index.css             # Tailwind imports
    ├── constants.js          # admin passcode, categories, colors, product shape
    ├── lib/
    │   ├── helpers.js         # id generator, image compression, currency formatter
    │   └── storage.js         # save/load products & orders (localStorage)
    └── components/
        ├── Button.jsx
        ├── Header.jsx
        ├── ShopView.jsx        # product grid
        ├── ProductDetail.jsx   # product modal
        ├── CartView.jsx
        ├── CheckoutView.jsx
        ├── AdminGate.jsx       # passcode screen
        ├── ProductEditor.jsx   # add/edit/delete products
        ├── OrdersList.jsx
        └── AdminPanel.jsx      # wraps AdminGate + ProductEditor + OrdersList
```

Things you'll most likely want to edit:
- **Colors** — `src/constants.js`, the `COLORS` object.
- **Admin passcode** — `src/constants.js`, `ADMIN_PASSCODE` (default: `paperie2026`).
- **What happens at checkout** — `handlePlaceOrder` in `src/components/CheckoutView.jsx`.
- **Product fields** (e.g. add "material" or "stock count") — start at `EMPTY_PRODUCT` in
  `src/constants.js`, then add a matching input in `src/components/ProductEditor.jsx`.

---

## 1. Opening and editing in VS Code

1. **Unzip** `soul-paperie-shop.zip` anywhere on your computer.
2. Open **VS Code**. Go to `File → Open Folder…` and select the unzipped
   `soul-paperie-shop` folder.
3. Open a terminal inside VS Code: `Terminal → New Terminal`.
4. Install [Node.js](https://nodejs.org) (LTS version) if you don't already have it —
   VS Code's terminal needs `node` and `npm` available. Check with:
   ```
   node -v
   npm -v
   ```
5. Install the project's dependencies:
   ```
   npm install
   ```
6. Start the local dev server:
   ```
   npm run dev
   ```
   Vite will print a local URL (usually `http://localhost:5173`) — open it in your
   browser to see the shop live. Any file you save in VS Code will instantly refresh
   the browser.
7. Edit files under `src/` as needed (see "Things you'll most likely want to edit" above).
   A useful VS Code extension: **ES7+ React/Redux/React-Native snippets** (optional, for
   autocomplete).

---

## 2. Deploying for free

Either host works well for a static Vite app; pick one.

### Option A — Vercel (recommended, simplest for Vite)

1. Push this project to a GitHub repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
   Create a new empty repo on [github.com](https://github.com/new), then:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/soul-paperie-shop.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account
   (free "Hobby" plan).
3. Click **Add New → Project**, select your `soul-paperie-shop` repo.
4. Vercel auto-detects Vite. Leave the defaults:
   - Build command: `npm run build` (or `vite build`)
   - Output directory: `dist`
5. Click **Deploy**. In under a minute you'll get a live URL like
   `soul-paperie-shop.vercel.app`.
6. Every future `git push` to `main` automatically redeploys the site.

### Option B — Render

1. Push the project to GitHub the same way as steps 1 above.
2. Go to [render.com](https://render.com) and sign up/log in with GitHub (free plan).
3. Click **New → Static Site**, connect your `soul-paperie-shop` repo.
4. Fill in:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
5. Click **Create Static Site**. Render builds and gives you a live URL like
   `soul-paperie-shop.onrender.com`.
6. Every future `git push` automatically redeploys the site.

### After deploying

- Visit your live URL, open the lock icon top-right, and log in with the admin
  passcode (`paperie2026` by default — change it in `src/constants.js` before
  deploying, and redeploy).
- Remember the `localStorage` limitation above: whatever products you add from your
  own browser after deploying will only appear in that browser, not for other
  visitors, until you swap `src/lib/storage.js` for a real backend.
