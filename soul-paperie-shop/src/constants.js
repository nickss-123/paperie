// ============================================================================
// CONSTANTS — edit these to configure the shop.
// ============================================================================

// Change this to whatever passcode you want to gate the admin screen with.
// NOTE: this is NOT real security, just a UI gate so random visitors don't
// stumble into the admin panel. Anyone who opens devtools can read this file.
export const ADMIN_PASSCODE = "paperie2026";

// Soul Paperie's real product categories, taken from their price list.
export const CATEGORIES = ["Ivory Paper", "Colored Paper", "Abaca/Cotton Mix", "Envelopes", "Wedding Suites", "Other"];

// COLOR TOKENS — these Tailwind classes are reused everywhere in the app.
// Change them here and the whole site's palette updates.
export const COLORS = {
  bg: "bg-stone-100",
  card: "bg-orange-50",
  text: "text-stone-800",
  textSoft: "text-stone-600",
  accent: "text-orange-800",
  accentBg: "bg-orange-800",
  accentBgHover: "hover:bg-orange-900",
  border: "border-orange-200",
};

// PRODUCT SHAPE — this is the one place that defines what fields a product
// has. If you want to add a new field (e.g. "material"), add it here, add
// an input for it in ProductEditor.jsx, and it'll flow through everywhere
// else automatically (cart, checkout, storage).
export const EMPTY_PRODUCT = { id: "", name: "", price: "", category: CATEGORIES[0], image: "", videoUrl: "", description: "" };
