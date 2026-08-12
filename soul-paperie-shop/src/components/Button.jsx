import { COLORS } from "../constants";

export default function Button({ children, onClick, variant = "solid", className = "", type = "button", disabled }) {
  const base = "px-5 py-2.5 rounded text-sm tracking-wide transition-colors inline-flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "solid"
      ? `${COLORS.accentBg} text-orange-50 ${COLORS.accentBgHover}`
      : variant === "outline"
      ? `border ${COLORS.border} ${COLORS.text} hover:bg-orange-100`
      : "text-stone-500 hover:text-stone-800";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
