"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Settings, CheckCircle2 } from "lucide-react";

export type TreeNode = {
  label: string;
  items: { label: string; key: string; active?: boolean }[];
};

export default function SidebarTree({
  groups, activeKey, onSelect,
}: { groups: TreeNode[]; activeKey?: string; onSelect?: (key: string) => void }) {
  return (
    <div className="space-y-3">
      {groups.map((g) => <Group key={g.label} node={g} activeKey={activeKey} onSelect={onSelect} />)}
    </div>
  );
}

function Group({ node, activeKey, onSelect }: { node: TreeNode; activeKey?: string; onSelect?: (k: string) => void }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-bold text-slate-800">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {node.label}
          <CheckCircle2 size={12} className="text-brand-dark" />
        </button>
        <Plus size={14} className="text-brand cursor-pointer" />
      </div>
      {open && (
        <div className="mt-1 pl-4 space-y-0.5">
          {node.items.map((it) => {
            const active = it.active || activeKey === it.key;
            return (
              <div
                key={it.key}
                className={`sidebar-link ${active ? "active" : ""}`}
                onClick={() => onSelect?.(it.key)}
              >
                <span className="text-slate-400 text-xs">#</span>
                <span className="flex-1">{it.label}</span>
                {active && <Settings size={12} className="text-brand" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
