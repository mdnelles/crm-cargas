"use client";
import { X, Hash, List } from "lucide-react";

export function Panel({ title, icon = "hash", onClose, children, className = "" }: {
  title: string;
  icon?: "hash" | "list";
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = icon === "list" ? List : Hash;
  return (
    <div className={`panel overflow-hidden flex flex-col ${className}`}>
      <div className="panel-header">
        <div className="flex items-center gap-2 font-medium">
          <Icon size={16} /> {title}
        </div>
        {onClose && (
          <button onClick={onClose} className="opacity-80 hover:opacity-100"><X size={16} /></button>
        )}
      </div>
      <div className="p-3 flex-1 overflow-auto">{children}</div>
    </div>
  );
}
