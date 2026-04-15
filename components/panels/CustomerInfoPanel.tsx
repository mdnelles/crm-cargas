"use client";
import { useMemo, useState } from "react";
import { Panel } from "../Panel";
import { useData, uid, type Customer } from "@/lib/store";
import { Search, Plus, Trash2, Pencil, Check } from "lucide-react";

export default function CustomerInfoPanel({ onClose }: { onClose?: () => void }) {
  const { data, update } = useData();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Customer>>({});

  const list = useMemo(
    () => (data?.customers ?? []).filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.vehicle.toLowerCase().includes(q.toLowerCase())),
    [data, q]
  );

  const addCustomer = () => {
    const c: Customer = { id: uid(), name: "New Client", vehicle: "Hyundai ?", phone: "", email: "" };
    update((d) => ({ ...d, customers: [c, ...d.customers] }));
    setEditing(c.id);
    setForm(c);
  };

  const saveEdit = () => {
    if (!editing) return;
    update((d) => ({ ...d, customers: d.customers.map((c) => (c.id === editing ? { ...c, ...form } as Customer : c)) }));
    setEditing(null);
    setForm({});
  };

  const remove = (id: string) => update((d) => ({ ...d, customers: d.customers.filter((c) => c.id !== id) }));

  return (
    <Panel title="Customer-Info" icon="list" onClose={onClose}>
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-8 py-1.5 text-sm" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={addCustomer}><Plus size={14} /> Add</button>
      </div>

      <div className="space-y-2">
        {list.map((c) => (
          <div key={c.id} className="flex items-center gap-3 p-2 rounded-md border border-slate-200 hover:border-brand/40">
            <div className="w-9 h-9 rounded-full bg-slate-200 grid place-items-center text-xs font-bold">{c.name.slice(0, 2).toUpperCase()}</div>
            {editing === c.id ? (
              <div className="flex-1 grid grid-cols-2 gap-1">
                <input className="input py-1 text-sm" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
                <input className="input py-1 text-sm" value={form.vehicle ?? ""} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} placeholder="Vehicle" />
                <input className="input py-1 text-sm" value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
                <input className="input py-1 text-sm" value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{c.name}</div>
                <div className="text-xs text-slate-500 truncate">Vehicle: {c.vehicle}</div>
              </div>
            )}
            <div className="flex items-center gap-1">
              {editing === c.id ? (
                <button className="btn-ghost !py-1" onClick={saveEdit}><Check size={14} /></button>
              ) : (
                <>
                  <button className="btn-ghost !py-1" onClick={() => { setEditing(c.id); setForm(c); }}><Pencil size={14} /></button>
                  <button className="btn-ghost !py-1 text-red-600" onClick={() => remove(c.id)}><Trash2 size={14} /></button>
                </>
              )}
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="text-center text-xs text-slate-500 py-6">No customers yet.</div>}
      </div>
    </Panel>
  );
}
