import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PITSTOP GRID V2 — Smart Automotive Parts & Fitment Verification Platform",
  description: "High-performance e-commerce platform for Motorbike and Car Parts (OEM, Aftermarket, and Performance) featuring real-time vehicle fitment compatibility verification and warehouse hub pickup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-50 antialiased selection:bg-emerald-500 selection:text-slate-950" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
