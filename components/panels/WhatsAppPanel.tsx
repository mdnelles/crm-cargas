"use client";
import { useState, useRef, useEffect } from "react";
import { Panel } from "../Panel";
import { useData, uid, type Chat } from "@/lib/store";
import { Send, Phone, Video, Search } from "lucide-react";

export default function WhatsAppPanel({ onClose }: { onClose?: () => void }) {
  const { data, update } = useData();
  const [activeId, setActiveId] = useState<string>("ch1");
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const chats = data?.chats ?? [];
  const active: Chat | undefined = chats.find((c) => c.id === activeId) ?? chats[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999 });
  }, [active?.messages.length]);

  const send = () => {
    const t = text.trim();
    if (!t || !active) return;
    update((d) => ({
      ...d,
      chats: d.chats.map((c) => c.id === active.id
        ? { ...c, messages: [...c.messages, { id: uid(), from: "me", text: t, ts: Date.now() }] }
        : c),
    }));
    setText("");
  };

  return (
    <Panel title="WhatsApp" onClose={onClose} className="h-[380px]">
      <div className="grid grid-cols-[220px_1fr] h-full gap-0 -m-3">
        {/* Chat list */}
        <div className="border-r border-slate-200 flex flex-col">
          <div className="p-2 border-b border-slate-200">
            <div className="text-sm font-semibold mb-2">Chats</div>
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="w-full pl-7 pr-2 py-1 text-xs rounded border border-slate-200" placeholder="Search..." />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {chats.map((c) => {
              const last = c.messages[c.messages.length - 1];
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left px-2 py-2 border-b border-slate-100 flex items-center gap-2 hover:bg-slate-50 ${active?.id === c.id ? "bg-brand-pale" : ""}`}
                >
                  <div className="w-7 h-7 rounded-full bg-slate-300 grid place-items-center text-[10px] font-bold">{c.client.slice(0, 2)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold truncate">{c.client}</div>
                    <div className="text-[10px] text-slate-500 truncate">{last?.text ?? "No messages"}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thread */}
        <div className="flex flex-col bg-[#f7f5ee]">
          <div className="px-3 py-2 bg-white border-b flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-300 grid place-items-center text-[10px] font-bold">{active?.client.slice(0, 2)}</div>
            <div className="text-sm font-semibold flex-1">{active?.client}</div>
            <Phone size={14} className="text-slate-500" />
            <Video size={14} className="text-slate-500" />
          </div>
          <div ref={scrollRef} className="flex-1 overflow-auto p-3 space-y-2">
            {(active?.messages ?? []).map((m) => (
              <div key={m.id} className={`max-w-[75%] rounded-lg px-3 py-1.5 text-xs ${m.from === "me" ? "ml-auto bg-brand text-white" : "bg-white border border-slate-200"}`}>
                {m.text}
                <div className={`text-[9px] mt-0.5 ${m.from === "me" ? "text-white/80" : "text-slate-400"}`}>
                  {new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}
            {active?.messages.length === 0 && <div className="text-center text-xs text-slate-400 mt-4">Say hi to {active.client}</div>}
          </div>
          <div className="p-2 bg-white border-t flex gap-2">
            <input
              className="flex-1 px-3 py-1.5 text-xs rounded-full bg-slate-100 focus:outline-none"
              placeholder="Type a message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button className="btn-primary !py-1" onClick={send}><Send size={14} /></button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
