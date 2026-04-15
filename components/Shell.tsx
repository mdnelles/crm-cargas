"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home, MessageCircle, Briefcase, Car as CarIcon, Users, FileText,
  Plus, Volume2, List, Clock, Calendar, Search, Grid3x3, Bell, LogOut, RotateCcw,
} from "lucide-react";
import { currentUser, logout } from "@/lib/auth";
import { resetData } from "@/lib/store";

const NAV = [
  { href: "/dashboard",            icon: Home,          label: "Home" },
  { href: "/dashboard/messages",   icon: MessageCircle, label: "Messages" },
  { href: "/dashboard/accounting", icon: Briefcase,     label: "Accounts" },
  { href: "/dashboard/customer",   icon: CarIcon,       label: "Customer" },
  { href: "/dashboard/social",     icon: Users,         label: "Social" },
  { href: "/dashboard/reports",    icon: FileText,      label: "Reports" },
];

export default function Shell({ title, sidebar, children }: {
  title: string;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<ReturnType<typeof currentUser>>(null);

  useEffect(() => {
    const u = currentUser();
    if (!u) router.replace("/login");
    else setUser(u);
  }, [router]);

  if (!user) return null;

  return (
    <div className="h-screen w-full flex flex-col bg-slate-100">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-3 py-2 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand text-white grid place-items-center text-xs font-bold">HC</div>
          <Plus size={18} className="text-brand cursor-pointer" />
          <Volume2 size={18} className="text-brand cursor-pointer" />
          <List size={18} className="text-brand cursor-pointer" />
          <Clock size={18} className="text-brand cursor-pointer" />
          <Calendar size={18} className="text-brand cursor-pointer" />
        </div>
        <div className="flex-1 max-w-3xl mx-auto relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input placeholder="Search..." className="w-full pl-9 pr-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
        </div>
        <div className="flex items-center gap-3">
          <Grid3x3 size={18} className="text-slate-600 cursor-pointer" />
          <Bell size={18} className="text-slate-600 cursor-pointer" />
          <div className="relative group">
            <div className="w-8 h-8 rounded-full bg-brand text-white grid place-items-center text-xs font-bold cursor-pointer">
              {user.initials}
            </div>
            <div className="hidden group-hover:block absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-md shadow-lg z-20">
              <div className="px-3 py-2 text-xs text-slate-500 border-b">{user.name}</div>
              <button
                onClick={() => { resetData(user.username); location.reload(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50"
              >
                <RotateCcw size={14} /> Reset demo data
              </button>
              <button
                onClick={() => { logout(); router.push("/login"); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 text-red-600"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex min-h-0">
        {/* Icon rail */}
        <div className="w-12 bg-white border-r border-slate-200 flex flex-col items-center py-3 gap-2">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href;
            return (
              <Link
                key={n.href} href={n.href} title={n.label}
                className={`w-9 h-9 grid place-items-center rounded-md ${active ? "bg-brand-pale text-brand-dark" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <Icon size={18} />
              </Link>
            );
          })}
          <div className="mt-auto w-9 h-9 grid place-items-center rounded-md bg-brand text-white"><Plus size={18} /></div>
        </div>

        {/* Inner sidebar */}
        <aside className="w-60 bg-brand-pale border-r border-slate-200 flex flex-col min-h-0">
          <div className="panel-header rounded-none">
            <span className="font-semibold">{title}</span>
            <FileText size={16} />
          </div>
          <div className="flex-1 overflow-y-auto p-3 text-sm">{sidebar}</div>
          <div className="p-2 border-t border-brand/30 bg-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-200 grid place-items-center text-[10px] font-bold">H</div>
            <div className="text-xs">
              <div className="font-semibold">Hyundai Caile 50</div>
              <div className="text-[10px] text-emerald-600 font-semibold">OPEN</div>
            </div>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
