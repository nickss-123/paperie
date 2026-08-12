import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { COLORS } from "../constants";
import { formatPHP } from "../lib/helpers";
import Button from "./Button";

export default function CartView({ cart, products, updateQty, removeFromCart, setView }) {
  const items = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((c) => c.product);
  const total = items.reduce((sum, c) => sum + c.product.price * c.qty, 0);

  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={() => setView("shop")} className={`flex items-center gap-1 text-sm ${COLORS.textSoft} mb-4`}>
        <ArrowLeft size={14} /> Continue shopping
      </button>
      <h2 className="font-serif text-xl mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className={COLORS.textSoft}>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {items.map((c) => (
              <div key={c.productId} className={`${COLORS.card} border ${COLORS.border} rounded p-3 flex gap-3`}>
                <div className="w-16 h-16 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                  {c.product.image && <img src={c.product.image} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.product.name}</p>
                  <p className={`text-sm ${COLORS.accent}`}>{formatPHP(c.product.price)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQty(c.productId, c.qty - 1)} className="w-6 h-6 border border-stone-300 rounded flex items-center justify-center"><Minus size={12} /></button>
                    <span className="text-sm w-4 text-center">{c.qty}</span>
                    <button onClick={() => updateQty(c.productId, c.qty + 1)} className="w-6 h-6 border border-stone-300 rounded flex items-center justify-center"><Plus size={12} /></button>
                    <button onClick={() => removeFromCart(c.productId)} className="ml-auto text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>{formatPHP(total)}</span>
          </div>
          <Button className="w-full" onClick={() => setView("checkout")}>Proceed to Checkout</Button>
        </>
      )}
    </div>
  );
}
