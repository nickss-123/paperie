import { COLORS } from "../constants";
import { formatPHP } from "../lib/helpers";
import { saveOrders } from "../lib/storage";

export default function OrdersList({ orders, setOrders }) {
  async function toggleStatus(id) {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: o.status === "pending" ? "fulfilled" : "pending" } : o));
    setOrders(updated);
    await saveOrders(updated);
  }

  if (orders.length === 0) {
    return <p className={`${COLORS.textSoft} text-sm p-4`}>No orders yet.</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <h3 className="font-serif text-lg mb-2">Orders ({orders.length})</h3>
      {[...orders].reverse().map((o) => (
        <div key={o.id} className={`${COLORS.card} border ${COLORS.border} rounded p-3 text-sm`}>
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium">{o.customer.name}</span>
            <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${o.status === "pending" ? "bg-amber-200 text-amber-900" : "bg-green-200 text-green-900"}`}>{o.status}</span>
          </div>
          <p className="text-xs text-stone-500 mb-2">{o.customer.contact} · {new Date(o.createdAt).toLocaleString()}</p>
          {o.items.map((it, i) => (
            <p key={i} className="text-xs">{it.name} × {it.qty} — {formatPHP(it.price * it.qty)}</p>
          ))}
          {o.customer.notes && <p className="text-xs italic text-stone-500 mt-1">Note: {o.customer.notes}</p>}
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-orange-200">
            <span className="font-semibold">{formatPHP(o.total)}</span>
            <button onClick={() => toggleStatus(o.id)} className="text-xs underline text-stone-600">
              Mark as {o.status === "pending" ? "fulfilled" : "pending"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
