// ============================================================================
// DATA LAYER
// ============================================================================
// The original artifact version of this shop used `window.storage`, a
// save/load API that only exists inside Claude.ai's Artifacts feature. It
// won't exist once this app is deployed on its own (Vercel, Render, etc.),
// so this version uses the browser's built-in `localStorage` instead.
//
// IMPORTANT — READ THIS:
// localStorage is PER BROWSER, PER DEVICE. That means:
//   - Products you add in the admin panel are only saved on the device/
//     browser you added them from.
//   - A customer on their own phone will NOT see products added from your
//     laptop, and will NOT see each other's orders.
// This is fine for trying the app out or demoing it locally, but it is NOT
// a real shared catalog. For every visitor to see the same products and for
// orders to reach you from anywhere, you need a real backend + database
// (e.g. Supabase, Firebase, or a small Node/Express API with Postgres) and
// you'd swap the four functions below to call that API instead of
// localStorage. Everything else in the app (components, cart, checkout UI)
// stays exactly the same either way — they just call these four functions.
// ============================================================================

const PRODUCTS_KEY = "soul-paperie:products";
const ORDERS_KEY = "soul-paperie:orders";

export async function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export async function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
