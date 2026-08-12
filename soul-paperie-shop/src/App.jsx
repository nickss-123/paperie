import { useState, useEffect } from "react";
import { COLORS } from "./constants";
import { loadProducts, saveOrders, loadOrders } from "./lib/storage";
import Header from "./components/Header";
import ShopView from "./components/ShopView";
import ProductDetail from "./components/ProductDetail";
import CartView from "./components/CartView";
import CheckoutView from "./components/CheckoutView";
import AdminPanel from "./components/AdminPanel";

// ============================================================================
// APP — top-level component. Loads data on mount, switches between the
// customer-facing views and the admin panel.
// ============================================================================
export default function App() {
  const [view, setView] = useState("shop"); // "shop" | "cart" | "checkout" | "admin"
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]); // [{ productId, qty }]
  const [activeProduct, setActiveProduct] = useState(null); // product shown in the detail modal
  const [loading, setLoading] = useState(true);

  // Load products + orders from storage once, when the app first mounts
  useEffect(() => {
    (async () => {
      const [p, o] = await Promise.all([loadProducts(), loadOrders()]);
      setProducts(p);
      setOrders(o);
      setLoading(false);
    })();
  }, []);

  function addToCart(product, qty) {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === product.id);
      if (existing) {
        return prev.map((c) => (c.productId === product.id ? { ...c, qty: c.qty + qty } : c));
      }
      return [...prev, { productId: product.id, qty }];
    });
  }

  function updateQty(productId, qty) {
    if (qty <= 0) return removeFromCart(productId);
    setCart((prev) => prev.map((c) => (c.productId === productId ? { ...c, qty } : c)));
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  }

  async function placeOrder(order) {
    const updated = [...orders, order];
    setOrders(updated);
    await saveOrders(updated);
    setCart([]); // empty the cart after a successful order
  }

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  if (loading) {
    return <div className={`min-h-screen ${COLORS.bg} flex items-center justify-center ${COLORS.textSoft}`}>Loading…</div>;
  }

  return (
    <div className={`min-h-screen ${COLORS.bg} ${COLORS.text}`} style={{ fontFamily: "Georgia, serif" }}>
      <Header setView={setView} cartCount={cartCount} />

      {view === "shop" && <ShopView products={products} addToCart={addToCart} openProduct={setActiveProduct} />}
      {view === "cart" && <CartView cart={cart} products={products} updateQty={updateQty} removeFromCart={removeFromCart} setView={setView} />}
      {view === "checkout" && <CheckoutView cart={cart} products={products} placeOrder={placeOrder} setView={setView} />}
      {view === "admin" && <AdminPanel products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} setView={setView} />}

      {activeProduct && <ProductDetail product={activeProduct} onClose={() => setActiveProduct(null)} addToCart={addToCart} />}
    </div>
  );
}
