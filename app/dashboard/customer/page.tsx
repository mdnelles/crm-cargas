"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import SidebarTree from "@/components/SidebarTree";
import CustomerInfoPanel from "@/components/panels/CustomerInfoPanel";
import VehicleInfoPanel from "@/components/panels/VehicleInfoPanel";

export default function CustomerPage() {
  const [panels, setPanels] = useState({ customer: true, vehicle: true });

  const sidebar = (
    <SidebarTree
      activeKey="customerinfo"
      groups={[
        { label: "Work Space", items: [
          { key: "schedule", label: "Mechanic-Schedule" },
          { key: "whatsapp", label: "Whatsapp-Chat" },
        ]},
        { label: "General Info", items: [
          { key: "customerinfo", label: "Customer-Info" },
          { key: "leads", label: "Leads-info" },
          { key: "complaint", label: "Complaint-info" },
          { key: "requests", label: "Requests-info" },
        ]},
        { label: "Vehicle Info", items: [
          { key: "vehicleinfo", label: "Vehicle-Info" },
          { key: "serviceinfo", label: "Service-Info" },
          { key: "partsinfo", label: "Parts-Info" },
        ]},
      ]}
    />
  );

  return (
    <Shell title="Customer" sidebar={sidebar}>
      <div className="bg-brand/80 text-white px-4 py-2 rounded-t-md font-semibold">Work Space</div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        {panels.customer && <CustomerInfoPanel onClose={() => setPanels({ ...panels, customer: false })} />}
        {panels.vehicle  && <VehicleInfoPanel  onClose={() => setPanels({ ...panels, vehicle: false })} />}
      </div>
    </Shell>
  );
}
