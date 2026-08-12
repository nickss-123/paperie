import { useState } from "react";
import { Lock } from "lucide-react";
import { COLORS, ADMIN_PASSCODE } from "../constants";
import Button from "./Button";

export default function AdminGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="p-6 max-w-xs mx-auto py-20 text-center">
      <Lock className="mx-auto mb-3 text-stone-400" size={28} />
      <h2 className="font-serif text-lg mb-4">Admin Access</h2>
      <input
        type="password"
        placeholder="Passcode"
        value={code}
        onChange={(e) => { setCode(e.target.value); setError(false); }}
        className={`w-full border ${error ? "border-red-400" : COLORS.border} rounded px-3 py-2 text-sm mb-2 text-center`}
      />
      {error && <p className="text-xs text-red-600 mb-2">Incorrect passcode.</p>}
      <Button className="w-full" onClick={() => (code === ADMIN_PASSCODE ? onUnlock() : setError(true))}>
        Unlock
      </Button>
    </div>
  );
}
