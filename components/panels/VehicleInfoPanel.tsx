"use client";
import { useMemo, useState } from "react";
import { Panel } from "../Panel";
import { useData, uid, type Vehicle } from "@/lib/store";
import { Search, Plus, Trash2, Car } from "lucide-react";

const STATUSES: Vehicle["status"][] = ["In-shop", "Incoming", "Pick-up", "Other"];

export default function VehicleInfoPanel({ onClose }: { onClose?: () => void }) {
  const { data, update } = useData();
  const [filter, setFilter] = useState<Vehicle["status"] | "All">("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let v = data?.vehicles ?? [];
    if (filter !== "All") v = v.filter((x) => x.status === filter);
    if (q) v = v.filter((x) => (x.model + x.client).toLowerCase().includes(q.toLowerCase()));
    return v;
  }, [data, filter, q]);

  const addVehicle = () => {
    const v: Vehicle = { id: uid(), model: "Hyundai —", client: "Client ?", status: "Incoming", tags: ["New"] };
    update((d) => ({ ...d, vehicles: [v, ...d.vehicles] }));
  };
  const setStatus = (id: string, s: Vehicle["status"]) =>
    update((d) => ({ ...d, vehicles: d.vehicles.map((v) => v.id === id ? { ...v, status: s } : v) }));
  const remove = (id: string) => update((d) => ({ ...d, vehicles: d.vehicles.filter((v) => v.id !== id) }));

  return (
    <Panel title="Vehicle-Info" icon="list" onClose={onClose}>
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-8 py-1.5 text-sm" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={addVehicle}><Plus size={14} /> Add</button>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {(["All", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s as any)}
            className={`px-2.5 py-1 rounded-full text-xs border ${filter === s ? "bg-brand text-white border-brand" : "bg-white text-slate-700 border-slate-200 hover:border-brand/40"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {list.map((v) => (
          <div key={v.id} className="flex gap-3 p-2 rounded-md border border-slate-200 hover:border-brand/40">
            <div className="w-16 h-12 rounded bg-slate-100 grid place-items-center text-slate-400"><Car size={22} /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-medium text-sm">{v.model}</div>
                <span className="text-[10px] text-slate-500">· {v.client}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {v.tags.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <select
                value={v.status}
                onChange={(e) => setStatus(v.id, e.target.value as Vehicle["status"])}
                className="text-[10px] border border-slate-200 rounded px-1 py-0.5"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button className="text-red-500 hover:text-red-700" onClick={() => remove(v.id)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="text-center text-xs text-slate-500 py-6">No vehicles.</div>}
      </div>
    </Panel>
  );
}
