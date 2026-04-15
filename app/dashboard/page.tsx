"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import SidebarTree from "@/components/SidebarTree";
import MechanicSchedulePanel from "@/components/panels/MechanicSchedulePanel";
import CustomerInfoPanel from "@/components/panels/CustomerInfoPanel";
import WhatsAppPanel from "@/components/panels/WhatsAppPanel";

export default function HomePage() {
  const [panels, setPanels] = useState({ schedule: true, customers: true, whatsapp: true });

  const sidebar = (
    <SidebarTree
      activeKey="schedules"
      groups={[
        { label: "Recent", items: [
          { key: "whatsapp", label: "WhatsApp" },
          { key: "calendar", label: "Calender" },
          { key: "mywork", label: "My Work" },
        ]},
        { label: "Mechanics", items: [
          { key: "chat", label: "Mechanic-Chat" },
          { key: "schedules", label: "Mechanic-Schedules" },
          { key: "assign", label: "Mechanic-Assign" },
          { key: "meeting", label: "Mechanic-Meeting" },
        ]},
        { label: "Customers", items: [
          { key: "complaints", label: "Customer-Complaints" },
          { key: "inquiries", label: "Customer-Inquiries" },
          { key: "questions", label: "Customer-Questions" },
          { key: "info", label: "Customer-Info" },
        ]},
      ]}
    />
  );

  return (
    <Shell title="Home" sidebar={sidebar}>
      <div className="bg-brand/80 text-white px-4 py-2 rounded-t-md font-semibold">Work Space</div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        {panels.schedule  && <MechanicSchedulePanel onClose={() => setPanels({ ...panels, schedule: false })} />}
        {panels.customers && <CustomerInfoPanel     onClose={() => setPanels({ ...panels, customers: false })} />}
        {panels.whatsapp  && <div className="col-span-2"><WhatsAppPanel onClose={() => setPanels({ ...panels, whatsapp: false })} /></div>}
      </div>
    </Shell>
  );
}
