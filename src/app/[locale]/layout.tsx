import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/common/ThemeProvider";

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navbar' });
  return {
    title: `PITSTOP GRID V2 — ${t('home')}`,
    description: "High-performance e-commerce platform for Motorbike and Car Parts (OEM, Aftermarket, and Performance) featuring real-time vehicle fitment compatibility verification and warehouse hub pickup.",
  };
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from "next/navigation";
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] antialiased selection:bg-[#3F72AF] dark:selection:bg-[#3282B8] selection:text-white dark:selection:text-[#1B262C] transition-colors duration-200"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navbar />
            <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
