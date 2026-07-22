import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/common/ThemeProvider";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] antialiased selection:bg-[#3F72AF] dark:selection:bg-[#3282B8] selection:text-white dark:selection:text-[#1B262C] transition-colors duration-200"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
