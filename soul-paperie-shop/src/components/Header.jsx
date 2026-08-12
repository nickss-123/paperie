import { ShoppingBag, Lock } from "lucide-react";
import { COLORS } from "../constants";

export default function Header({ setView, cartCount }) {
  return (
    <header className={`sticky top-0 z-40 ${COLORS.bg} border-b ${COLORS.border} px-4 py-3 flex items-center justify-between`}>
      <button onClick={() => setView("shop")} className="font-serif text-lg italic text-stone-800">
        Soul Paperie Co.
      </button>
      <div className="flex items-center gap-3">
        <button onClick={() => setView("admin")} className={`${COLORS.textSoft} hover:${COLORS.accent}`} title="Admin">
          <Lock size={18} />
        </button>
        <button onClick={() => setView("cart")} className={`relative ${COLORS.textSoft} hover:${COLORS.accent}`} title="Cart">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className={`absolute -top-2 -right-2 ${COLORS.accentBg} text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center`}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
