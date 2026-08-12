import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { COLORS } from "../constants";
import { formatPHP, toEmbedUrl } from "../lib/helpers";
import Button from "./Button";

export default function ProductDetail({ product, onClose, addToCart }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">
      <div className={`${COLORS.bg} w-full sm:max-w-md sm:rounded rounded-t-2xl max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-end p-3">
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="px-5 pb-6">
          {product.image && <img src={product.image} alt={product.name} className="w-full rounded mb-4 object-cover" />}
          {product.videoUrl && (
            <div className="aspect-video mb-4 rounded overflow-hidden bg-black">
              <iframe src={toEmbedUrl(product.videoUrl)} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen title="Product video" />
            </div>
          )}
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">{product.category}</p>
          <h2 className="font-serif text-xl text-stone-800 mb-2">{product.name}</h2>
          <p className={`text-lg font-semibold ${COLORS.accent} mb-3`}>{formatPHP(product.price)}</p>
          <p className={`${COLORS.textSoft} text-sm mb-5`}>{product.description}</p>

          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className={`w-8 h-8 border ${COLORS.border} rounded flex items-center justify-center`}><Minus size={14} /></button>
            <span className="w-6 text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className={`w-8 h-8 border ${COLORS.border} rounded flex items-center justify-center`}><Plus size={14} /></button>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              addToCart(product, qty);
              onClose();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
