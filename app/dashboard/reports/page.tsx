"use client";
import Shell from "@/components/Shell";
import SidebarTree from "@/components/SidebarTree";
import { Panel } from "@/components/Panel";
import { useData } from "@/lib/store";

export default function ReportsPage() {
  const { data } = useData();
  const sidebar = (
    <SidebarTree
      activeKey="summary"
      groups={[
        { label: "Reports", items: [
          { key: "summary", label: "Summary" },
          { key: "vehicles", label: "Vehicles" },
          { key: "customers", label: "Customers" },
          { key: "jobs", label: "Jobs" },
        ]},
      ]}
    />
  );
  return (
    <Shell title="Reports" sidebar={sidebar}>
      <div className="bg-brand/80 text-white px-4 py-2 rounded-t-md font-semibold">Work Space</div>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <Panel title="Customers"><div className="text-3xl font-bold">{data?.customers.length ?? 0}</div><div className="text-xs text-slate-500">total in your workspace</div></Panel>
        <Panel title="Vehicles"><div className="text-3xl font-bold">{data?.vehicles.length ?? 0}</div><div className="text-xs text-slate-500">being tracked</div></Panel>
        <Panel title="Scheduled Jobs"><div className="text-3xl font-bold">{data?.jobs.length ?? 0}</div><div className="text-xs text-slate-500">on the calendar</div></Panel>
      </div>
    </Shell>
  );
}
