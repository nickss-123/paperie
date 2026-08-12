// ============================================================================
// HELPERS
// ============================================================================

// Generates a short unique id for products/orders (no external library needed)
export function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Turns an uploaded image file into a compressed base64 string so it's small
// enough to store in localStorage (which has a ~5-10MB total limit per
// browser). We resize to max 900px wide and re-encode as JPEG at 70% quality.
export function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 900;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Converts a YouTube "watch" or share URL into an embeddable URL.
// If the link doesn't look like YouTube, it's returned as-is (so you can
// also paste a direct video file URL or another platform's embed link).
export function toEmbedUrl(url) {
  if (!url) return "";
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return url;
}

// Currency formatter for Philippine Peso
export function formatPHP(amount) {
  return "₱" + Number(amount).toLocaleString("en-PH", { minimumFractionDigits: 0 });
}
