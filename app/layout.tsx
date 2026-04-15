import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyundai Caile CRM",
  description: "Dealer CRM demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
