"use client";
import { useEffect, useState, useCallback } from "react";
import { currentUser } from "./auth";

/**
 * Per-user localStorage store. All CRUD is namespaced by username so each
 * demo user has their own persistent dataset.
 */

export type Customer = {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  email: string;
  notes?: string;
};

export type Vehicle = {
  id: string;
  model: string;
  client: string;
  status: "In-shop" | "Incoming" | "Pick-up" | "Other";
  tags: string[];
};

export type MechanicJob = {
  id: string;
  mechanic: string;      // e.g. "Mechanic 1"
  date: string;          // ISO yyyy-mm-dd
  time: string;          // e.g. "8:00"
  title: string;         // e.g. "Meeting"
};

export type ChatMessage = {
  id: string;
  from: string;          // client name or "me"
  text: string;
  ts: number;
};

export type Chat = {
  id: string;
  client: string;
  avatar?: string;
  messages: ChatMessage[];
};

export type DataShape = {
  customers: Customer[];
  vehicles: Vehicle[];
  jobs: MechanicJob[];
  chats: Chat[];
};

const SEED = (): DataShape => ({
  customers: [
    { id: "c1", name: "Client 1", vehicle: "Hyundai Creta",   phone: "555-0101", email: "c1@example.com" },
    { id: "c2", name: "Client 2", vehicle: "Hyundai Tucson",  phone: "555-0102", email: "c2@example.com" },
    { id: "c3", name: "Client 3", vehicle: "Hyundai Santa Fe", phone: "555-0103", email: "c3@example.com" },
  ],
  vehicles: [
    { id: "v1", model: "Hyundai Santa Fe", client: "Client 3", status: "In-shop",  tags: ["Repairs", "Needs Signature", "Software Update"] },
    { id: "v2", model: "Hyundai Tucson",   client: "Client 2", status: "Incoming", tags: ["Repairs", "Paint Job"] },
    { id: "v3", model: "Hyundai Creta",    client: "Client 1", status: "Pick-up",  tags: ["Inspection"] },
  ],
  jobs: [
    { id: "j1", mechanic: "Mechanic 1", date: "2025-08-14", time: "8:00",  title: "Meeting" },
    { id: "j2", mechanic: "Mechanic 2", date: "2025-08-14", time: "9:00",  title: "Inspection" },
    { id: "j3", mechanic: "Mechanic 3", date: "2025-08-15", time: "8:30",  title: "Meeting" },
    { id: "j4", mechanic: "Mechanic 4", date: "2025-08-15", time: "10:00", title: "Repair" },
    { id: "j5", mechanic: "Mechanic 5", date: "2025-08-16", time: "9:00",  title: "Meeting" },
  ],
  chats: [
    { id: "ch1", client: "Client 1", messages: [
      { id: "m1", from: "Client 1", text: "Hi, is my car ready?", ts: Date.now() - 3600_000 },
      { id: "m2", from: "me",       text: "Almost — final inspection today.", ts: Date.now() - 1800_000 },
    ]},
    { id: "ch2", client: "Client 2", messages: [
      { id: "m3", from: "Client 2", text: "Can I reschedule my appointment?", ts: Date.now() - 7200_000 },
    ]},
    { id: "ch3", client: "Client 3", messages: [] },
    { id: "ch4", client: "Client 4", messages: [] },
    { id: "ch5", client: "Client 5", messages: [] },
  ],
});

const keyFor = (username: string) => `crm.data.${username}`;

export function loadData(username: string): DataShape {
  if (typeof window === "undefined") return SEED();
  const raw = localStorage.getItem(keyFor(username));
  if (!raw) {
    const seeded = SEED();
    localStorage.setItem(keyFor(username), JSON.stringify(seeded));
    return seeded;
  }
  try { return JSON.parse(raw) as DataShape; } catch { return SEED(); }
}

export function saveData(username: string, data: DataShape) {
  if (typeof window === "undefined") return;
  localStorage.setItem(keyFor(username), JSON.stringify(data));
}

export function resetData(username: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(keyFor(username));
}

/** React hook for per-user data CRUD. */
export function useData() {
  const [data, setData] = useState<DataShape | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const u = currentUser();
    if (u) {
      setUsername(u.username);
      setData(loadData(u.username));
    }
  }, []);

  const update = useCallback((updater: (d: DataShape) => DataShape) => {
    setData((prev) => {
      if (!prev || !username) return prev;
      const next = updater(prev);
      saveData(username, next);
      return next;
    });
  }, [username]);

  const reset = useCallback(() => {
    if (!username) return;
    resetData(username);
    setData(loadData(username));
  }, [username]);

  return { data, update, reset, username };
}

export const uid = () => Math.random().toString(36).slice(2, 10);
