"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import SidebarTree from "@/components/SidebarTree";
import WhatsAppPanel from "@/components/panels/WhatsAppPanel";
import MechanicSchedulePanel from "@/components/panels/MechanicSchedulePanel";

export default function MessagesPage() {
  const [panels, setPanels] = useState({ schedule: true, whatsapp: true });

  const sidebar = (
    <SidebarTree
      activeKey="whatsapp-chat"
      groups={[
        { label: "Work Space", items: [{ key: "schedule", label: "Mechanic-Schedule" }] },
        { label: "Telegram", items: [
          { key: "tg-chat", label: "Telegram-Chat" },
          { key: "tg-settings", label: "Telegram-Settings" },
          { key: "tg-bot", label: "Telegram-bot" },
          { key: "tg-feedback", label: "Telegram Feedback" },
        ]},
        { label: "Messages", items: [
          { key: "messages", label: "Messages" },
          { key: "customer-msg", label: "Customer-Messages" },
          { key: "staff-msg", label: "Staff-Messages" },
          { key: "msg-settings", label: "Message-Settings" },
        ]},
        { label: "Whatsapp", items: [
          { key: "whatsapp-chat", label: "Whatsapp-Chat" },
          { key: "whatsapp-group", label: "Whatsapp-Group" },
          { key: "whatsapp-bot", label: "Whatsapp-Bot" },
          { key: "whatsapp-call", label: "Whatsapp-Call" },
        ]},
      ]}
    />
  );

  return (
    <Shell title="Social" sidebar={sidebar}>
      <div className="bg-brand/80 text-white px-4 py-2 rounded-t-md font-semibold">Work Space</div>
      <div className="grid grid-cols-1 gap-4 mt-3">
        {panels.schedule && <MechanicSchedulePanel onClose={() => setPanels({ ...panels, schedule: false })} />}
        {panels.whatsapp && <WhatsAppPanel onClose={() => setPanels({ ...panels, whatsapp: false })} />}
      </div>
    </Shell>
  );
}
