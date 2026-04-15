"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import SidebarTree from "@/components/SidebarTree";
import MechanicSchedulePanel from "@/components/panels/MechanicSchedulePanel";
import CustomerInfoPanel from "@/components/panels/CustomerInfoPanel";
import QuickbooksDashboardPanel from "@/components/panels/QuickbooksDashboardPanel";

export default function AccountingPage() {
  const [panels, setPanels] = useState({ schedule: true, customers: true, qb: true });

  const sidebar = (
    <SidebarTree
      activeKey="qb-dashboard"
      groups={[
        { label: "Work Space", items: [
          { key: "schedule", label: "Mechanic-Schedule" },
          { key: "customers", label: "Customer-Info" },
          { key: "whatsapp", label: "Whatsapp-Chat" },
        ]},
        { label: "Quickbooks", items: [
          { key: "qb-dashboard", label: "Quickbooks-Dashboard" },
          { key: "qb-banking", label: "Quickbooks-Banking" },
          { key: "qb-taxes", label: "Quickbooks-Taxes" },
          { key: "qb-report", label: "Quickbooks-report" },
        ]},
        { label: "Calculators", items: [
          { key: "calc", label: "Calculator" },
          { key: "loan", label: "Loan-Calculator" },
        ]},
      ]}
    />
  );

  return (
    <Shell title="Accounts" sidebar={sidebar}>
      <div className="bg-brand/80 text-white px-4 py-2 rounded-t-md font-semibold">Work Space</div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        {panels.schedule  && <MechanicSchedulePanel onClose={() => setPanels({ ...panels, schedule: false })} />}
        {panels.customers && <CustomerInfoPanel     onClose={() => setPanels({ ...panels, customers: false })} />}
        {panels.qb        && <div className="col-span-2"><QuickbooksDashboardPanel onClose={() => setPanels({ ...panels, qb: false })} /></div>}
      </div>
    </Shell>
  );
}
