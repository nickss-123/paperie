import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { COLORS } from "../constants";
import AdminGate from "./AdminGate";
import ProductEditor from "./ProductEditor";
import OrdersList from "./OrdersList";

export default function AdminPanel({ products, setProducts, orders, setOrders, setView }) {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("products"); // "products" | "orders"

  if (!unlocked) return <AdminGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-4 max-w-md mx-auto">
        <button onClick={() => setView("shop")} className={`flex items-center gap-1 text-sm ${COLORS.textSoft}`}>
          <ArrowLeft size={14} /> Exit admin
        </button>
        <div className="flex gap-1 bg-stone-200 rounded-full p-1">
          <button onClick={() => setTab("products")} className={`text-xs px-3 py-1 rounded-full ${tab === "products" ? COLORS.accentBg + " text-white" : "text-stone-600"}`}>Products</button>
          <button onClick={() => setTab("orders")} className={`text-xs px-3 py-1 rounded-full ${tab === "orders" ? COLORS.accentBg + " text-white" : "text-stone-600"}`}>Orders</button>
        </div>
      </div>
      {tab === "products" ? <ProductEditor products={products} setProducts={setProducts} /> : <OrdersList orders={orders} setOrders={setOrders} />}
    </div>
  );
}
