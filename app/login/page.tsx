"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, DEMO_USERS } from "@/lib/auth";
import { Car, Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = login(username, password);
    if (!u) { setError("Invalid credentials"); return; }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand to-brand-dark p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-brand text-white p-2 rounded-lg"><Car size={26} /></div>
          <div>
            <div className="font-bold text-lg">Hyundai Caile CRM</div>
            <div className="text-xs text-slate-500">Dealer &amp; Service Portal — Demo</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-600">Username</span>
            <div className="relative mt-1">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="input pl-9" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </label>
          <label className="block">
            <span className="text-sm text-slate-600">Password</span>
            <div className="relative mt-1">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" className="input pl-9" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </label>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button className="btn-primary w-full justify-center" type="submit">Sign in</button>
        </form>

        <div className="mt-6 border-t pt-4">
          <div className="text-xs font-medium text-slate-500 mb-2">Demo accounts (click to prefill)</div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_USERS.map((u) => (
              <button
                key={u.username}
                onClick={() => { setUsername(u.username); setPassword(u.password); }}
                className="text-left text-xs p-2 rounded border border-slate-200 hover:bg-brand-pale"
              >
                <div className="font-semibold">{u.name}</div>
                <div className="text-slate-500">{u.username} / {u.password}</div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-400">
            Each account gets its own persistent localStorage dataset — CRUD is scoped per user.
          </p>
        </div>
      </div>
    </div>
  );
}
