"use client";
import { useMemo, useState } from "react";
import { Panel } from "../Panel";
import { useData, uid, type MechanicJob } from "@/lib/store";
import { Plus, Bell, Clock, Trash2 } from "lucide-react";

const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }

export default function MechanicSchedulePanel({ onClose }: { onClose?: () => void }) {
  const { data, update } = useData();
  const [cursor] = useState(new Date(2025, 7, 1)); // August 2025 to match mock
  const [selected, setSelected] = useState<string>("2025-08-14");

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthName = cursor.toLocaleString("en-US", { month: "long" });
  const firstDow = new Date(year, month, 1).getDay();
  const total = daysInMonth(year, month);
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);

  const jobsByDate = useMemo(() => {
    const map: Record<string, MechanicJob[]> = {};
    (data?.jobs ?? []).forEach((j) => { (map[j.date] ||= []).push(j); });
    return map;
  }, [data]);

  const addJob = () => {
    const mech = `Mechanic ${((data?.jobs.length ?? 0) % 5) + 1}`;
    const j: MechanicJob = { id: uid(), mechanic: mech, date: selected, time: "9:00", title: "Meeting" };
    update((d) => ({ ...d, jobs: [...d.jobs, j] }));
  };
  const removeJob = (id: string) => update((d) => ({ ...d, jobs: d.jobs.filter((j) => j.id !== id) }));

  const selectedJobs = jobsByDate[selected] ?? [];

  // Group mechanics 1..5 for display like the mock
  const mechanicCards = ["Mechanic 1","Mechanic 2","Mechanic 3","Mechanic 4","Mechanic 5"];

  return (
    <Panel title="Mechanic-Schedule" onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-sm">{monthName} {year}</div>
            <div className="text-[10px] text-slate-500">selected: {selected}</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 mb-1">
            {DAYS.map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const has = (jobsByDate[iso]?.length ?? 0) > 0;
              const isSel = iso === selected;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(iso)}
                  className={`aspect-square text-xs rounded-full grid place-items-center border transition
                    ${isSel ? "bg-brand text-white border-brand" : has ? "bg-brand-pale border-brand/30 text-brand-dark" : "bg-white border-slate-200 text-slate-600 hover:border-brand/40"}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button className="btn-primary" onClick={addJob}><Plus size={14} /> Add</button>
            <button className="btn-ghost"><Clock size={14} /></button>
            <button className="btn-ghost"><Bell size={14} /></button>
          </div>
        </div>

        {/* Mechanics grid */}
        <div className="grid grid-cols-2 gap-2 content-start">
          {mechanicCards.map((m, i) => {
            const mine = selectedJobs.filter((j) => j.mechanic === m);
            return (
              <div key={m} className="p-2 rounded-md border border-slate-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold">{m}</div>
                  <div className={`w-2 h-2 rounded-full ${i === 3 ? "bg-red-500" : "bg-emerald-500"}`} />
                </div>
                <div className="text-[10px] text-slate-500 mb-1">Jobs to do:</div>
                {mine.length === 0 ? (
                  <div className="text-[10px] text-slate-400">—</div>
                ) : mine.map((j) => (
                  <div key={j.id} className="flex items-center justify-between text-[10px] bg-brand-pale px-1.5 py-0.5 rounded mb-1">
                    <span className="text-brand-dark">{j.time} {j.title}</span>
                    <button onClick={() => removeJob(j.id)} className="text-red-500 hover:text-red-700"><Trash2 size={10} /></button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
