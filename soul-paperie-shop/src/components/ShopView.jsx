import { Package } from "lucide-react";
import { COLORS } from "../constants";
import { formatPHP } from "../lib/helpers";

export default function ShopView({ products, openProduct }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <Package className="mx-auto mb-3 text-stone-400" size={32} />
        <p className={COLORS.textSoft}>No products yet. Open the admin panel (lock icon, top right) to add your first one.</p>
      </div>
    );
  }
  return (
    <div className="p-4 grid grid-cols-2 gap-3 max-w-3xl mx-auto">
      {products.map((p) => (
        <div key={p.id} className={`${COLORS.card} border ${COLORS.border} rounded overflow-hidden cursor-pointer`} onClick={() => openProduct(p)}>
          <div className="aspect-square bg-stone-200 overflow-hidden">
            {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-400"><Package size={28} /></div>}
          </div>
          <div className="p-3">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">{p.category}</p>
            <h3 className="font-serif text-sm text-stone-800 leading-tight mb-1">{p.name}</h3>
            <p className={`text-sm font-semibold ${COLORS.accent}`}>{formatPHP(p.price)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
