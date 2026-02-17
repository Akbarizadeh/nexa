import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "SATRAP - AI Powered Local Social Commerce",
  description:
    "Discover events, products, services, and offers near you powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="pb-20 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
