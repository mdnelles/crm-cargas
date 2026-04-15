// Preseeded demo credentials. Anyone can log in.
export const DEMO_USERS = [
  { username: "demo",  password: "demo",  name: "Demo User",     initials: "DU" },
  { username: "jane",  password: "jane",  name: "Jane Dealer",   initials: "JD" },
  { username: "mike",  password: "mike",  name: "Mike Service",  initials: "MS" },
  { username: "admin", password: "admin", name: "Admin",         initials: "A"  },
];

export type DemoUser = (typeof DEMO_USERS)[number];

const SESSION_KEY = "crm.session";

export function login(username: string, password: string): DemoUser | null {
  const u = DEMO_USERS.find(
    (x) => x.username.toLowerCase() === username.toLowerCase() && x.password === password
  );
  if (!u) return null;
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ username: u.username, ts: Date.now() }));
  }
  return u;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY);
}

export function currentUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const { username } = JSON.parse(raw);
    return DEMO_USERS.find((u) => u.username === username) ?? null;
  } catch {
    return null;
  }
}
