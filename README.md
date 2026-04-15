# Hyundai Caile CRM — Next.js Demo

Panel-based dealership CRM built from the Figma mocks. All state is in
`localStorage`, scoped per demo user — each account has its own persistent
dataset, so you can log in as different users and see independent CRUD.

## Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Demo accounts

Preseeded — anyone can log in. Pick from the login page or type any of:

| username | password |
|----------|----------|
| demo     | demo     |
| jane     | jane     |
| mike     | mike     |
| admin    | admin    |

## What's session-specific

Everything under `lib/store.ts` — customers, vehicles, mechanic jobs, and
WhatsApp chats — is namespaced by `crm.data.<username>` in `localStorage`.

Use the avatar menu (top-right) to **Reset demo data** or **Sign out**.

## Pages

- `/login` — preseeded credentials picker
- `/dashboard` — Home workspace (Mechanic Schedule, Customer Info, WhatsApp)
- `/dashboard/customer` — Customer + Vehicle info panels
- `/dashboard/accounting` — Quickbooks dashboard + schedule + customers
- `/dashboard/messages` and `/dashboard/social` — WhatsApp chat workspace
- `/dashboard/reports` — summary counts

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind · lucide-react
