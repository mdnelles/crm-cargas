"use client";
import { Panel } from "../Panel";

export default function QuickbooksDashboardPanel({ onClose }: { onClose?: () => void }) {
  return (
    <Panel title="Quickbooks-Dashboard" onClose={onClose}>
      <div className="rounded-md overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between bg-slate-800 text-white px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold">intuit <span className="text-emerald-400">quickbooks</span></div>
          </div>
          <div className="flex items-center gap-3 text-xs opacity-80">+ Help</div>
        </div>
        <div className="grid grid-cols-[120px_1fr]">
          <div className="bg-emerald-50 text-xs p-2 space-y-1 border-r">
            {["Dashboard","Banking","Sales","Expenses","Workers","Reports","Taxes","Accounting","My Accountant","Apps","Card Reader"].map((x,i) => (
              <div key={x} className={`px-2 py-1 rounded ${i === 0 ? "bg-emerald-200 font-semibold" : "hover:bg-emerald-100"}`}>{x}</div>
            ))}
          </div>
          <div className="p-3">
            <div className="font-semibold text-sm mb-2">Hyundai Caile 50</div>
            <div className="grid grid-cols-3 gap-2">
              <Card title="Invoices" value="$1,525.51" sub="OVERDUE" extra="$3,756.02 NOT DUE YET" bar />
              <Card title="Expenses" value="$467,121" sub="LAST MONTH" />
              <Card title="Bank accounts" value="$2,435.65" sub="Checking" extra="In Quickbooks $16,867.43" />
              <Card title="Profit and Loss" value="$23,876" sub="NET INCOME FOR APRIL" bar />
              <Card title="Sales" value="$467,121" sub="THIS QUARTER" />
              <Card title="Discover" value="Payroll" sub="Is Quickbooks Payroll For You?" />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Card({ title, value, sub, extra, bar }: { title: string; value: string; sub: string; extra?: string; bar?: boolean }) {
  return (
    <div className="border border-slate-200 rounded p-2">
      <div className="text-[10px] font-semibold text-slate-500 uppercase">{title}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[10px] text-slate-500">{sub}</div>
      {extra && <div className="text-[10px] text-slate-500">{extra}</div>}
      {bar && <div className="mt-1 h-1.5 bg-slate-100 rounded overflow-hidden"><div className="h-full bg-orange-400" style={{ width: "45%" }} /></div>}
    </div>
  );
}
