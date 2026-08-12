import { useState, useRef } from "react";
import { ArrowLeft, Upload, Video as VideoIcon, Plus, Trash2 } from "lucide-react";
import { COLORS, CATEGORIES, EMPTY_PRODUCT } from "../constants";
import { compressImage, formatPHP, makeId } from "../lib/helpers";
import { saveProducts } from "../lib/storage";
import Button from "./Button";

export default function ProductEditor({ products, setProducts }) {
  const [editing, setEditing] = useState(null); // null = not editing, else a product object
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const compressed = await compressImage(file);
    setEditing((p) => ({ ...p, image: compressed }));
    setUploading(false);
  }

  async function handleSave() {
    if (!editing.name || !editing.price) return;
    let updated;
    if (editing.id) {
      // editing an existing product
      updated = products.map((p) => (p.id === editing.id ? editing : p));
    } else {
      // creating a new product
      updated = [...products, { ...editing, id: makeId(), price: Number(editing.price) }];
    }
    setProducts(updated);
    await saveProducts(updated);
    setEditing(null);
  }

  async function handleDelete(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    await saveProducts(updated);
  }

  if (editing) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <button onClick={() => setEditing(null)} className={`flex items-center gap-1 text-sm ${COLORS.textSoft} mb-4`}>
          <ArrowLeft size={14} /> Back to products
        </button>
        <h3 className="font-serif text-lg mb-4">{editing.id ? "Edit Product" : "New Product"}</h3>

        <div className="space-y-3">
          {/* Image upload — compressed client-side, stored as base64 */}
          <div>
            <label className="text-xs text-stone-500 block mb-1">Photo</label>
            <div className="w-full aspect-square bg-stone-200 rounded overflow-hidden mb-2 flex items-center justify-center">
              {editing.image ? <img src={editing.image} className="w-full h-full object-cover" /> : <Upload className="text-stone-400" />}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
            {uploading && <p className="text-xs text-stone-500 mt-1">Compressing image…</p>}
          </div>

          {/* Video — pasted link (YouTube auto-converts to an embed) */}
          <div>
            <label className="text-xs text-stone-500 block mb-1 flex items-center gap-1"><VideoIcon size={12}/> Video URL (optional)</label>
            <input placeholder="https://youtube.com/watch?v=..." className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={editing.videoUrl} onChange={(e) => setEditing({ ...editing, videoUrl: e.target.value })} />
          </div>

          <input placeholder="Product name" className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          <input type="number" placeholder="Price (PHP)" className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
          <select className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea placeholder="Description" rows={3} className={`w-full border ${COLORS.border} rounded px-3 py-2 text-sm`} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />

          <Button className="w-full" onClick={handleSave}>Save Product</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif text-lg">Products ({products.length})</h3>
        <Button onClick={() => setEditing({ ...EMPTY_PRODUCT })}><Plus size={14} /> Add</Button>
      </div>
      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className={`${COLORS.card} border ${COLORS.border} rounded p-2 flex items-center gap-3`}>
            <div className="w-10 h-10 bg-stone-200 rounded overflow-hidden flex-shrink-0">
              {p.image && <img src={p.image} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{p.name}</p>
              <p className="text-xs text-stone-500">{formatPHP(p.price)}</p>
            </div>
            <button onClick={() => setEditing(p)} className="text-xs underline text-stone-600">Edit</button>
            <button onClick={() => handleDelete(p.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
