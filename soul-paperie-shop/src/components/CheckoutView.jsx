import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { COLORS } from "../constants";
import { formatPHP, makeId } from "../lib/helpers";
import Button from "./Button";

export default function CheckoutView({ cart, products, placeOrder, setView }) {
  const [form, setForm] = useState({ name: "", contact: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(null); // holds the order once placed

  const items = cart.map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) })).filter((c) => c.product);
  const total = items.reduce((sum, c) => sum + c.product.price * c.qty, 0);

  // ---- handlePlaceOrder: this is what runs when the customer submits the
  // checkout form. Edit here if you want to add fields, validation, or
  // change what happens after an order is placed (e.g. redirect somewhere).
  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (!form.name || !form.contact) return;
    const order = {
      id: makeId(),
      items: items.map((c) => ({ name: c.product.name, price: c.product.price, qty: c.qty })),
      total,
      customer: form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await placeOrder(order);
    setSubmitted(order);
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-md mx-auto text-center py-16">
        <Check className="mx-auto mb-3 text-green-700" size={36} />
        <h2 className="font-serif text-xl mb-2">Order received!</h2>
        <p className={`${COLORS.textSoft} text-sm mb-1`}>Order reference: <span className="font-mono">{submitted.id}</span></p>
        <p className={`${COLORS.textSoft} text-sm mb-6`}>Soul Paperie will reach out to {submitted.customer.contact} to confirm payment and delivery details.</p>
        <Button onClick={() => setView("shop")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={() => setView("cart")} className={`flex items-center gap-1 text-sm ${COLORS.textSoft} mb-4`}>
        <ArrowLeft size={14} /> Back to cart
      </button>
      <h2 className="font-serif text-xl mb-4">Checkout</h2>

      <div className={`${COLORS.card} border ${COLORS.border} rounded p-3 mb-5 text-sm`}>
        {items.map((c) => (
          <div key={c.productId} className="flex justify-between py-1">
            <span>{c.product.name} × {c.qty}</span>
            <span>{formatPHP(c.product.price * c.qty)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 mt-2 border-t border-orange-200 font-semibold">
          <span>Total</span>
          <span>{formatPHP(total)}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="space-y-3">
        <input required placeholder="Full name" className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Phone or email" className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        <input placeholder="Delivery address (optional)" className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <textarea placeholder="Notes (custom colors, event date, etc.)" rows={3} className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <p className="text-xs text-stone-500">This places an order request — Soul Paperie will contact you to arrange payment (GCash / bank transfer) and confirm details. No payment is collected on this page.</p>
        <Button type="submit" className="w-full">Place Order</Button>
      </form>
    </div>
  );
}
