"use client";

import React from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/i18n/translations";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border-t border-[#3F72AF]/20 dark:border-[#3282B8]/30 text-[#112D4E]/80 dark:text-[#BBE1FA]/80 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3F72AF] to-[#112D4E] dark:from-[#3282B8] dark:to-[#0F4C75] flex items-center justify-center shadow-sm">
              <Wrench className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            <span className="font-mono text-base font-black tracking-tight text-[#112D4E] dark:text-[#BBE1FA] uppercase">
              PITSTOP <span className="text-[#3F72AF] dark:text-[#3282B8]">GRID</span>
            </span>
          </div>
          <p className="text-[#112D4E]/70 dark:text-[#85B5D9] leading-relaxed">
            {t.footer.aboutText}
          </p>
          <div className="pt-1 flex items-center gap-2 text-[#3F72AF] dark:text-[#3282B8] font-mono text-[11px] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.navbar.guarantee}</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wider">
            {t.footer.quickLinks}
          </h4>
          <ul className="space-y-2 font-semibold">
            <li><Link href="/catalog?category=Engine" className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors">Engine & Drivetrain</Link></li>
            <li><Link href="/catalog?category=Exhaust" className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors">Exhaust Systems & Downpipes</Link></li>
            <li><Link href="/catalog?category=Braking" className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors">Braking & Suspension Kits</Link></li>
            <li><Link href="/catalog?category=Body" className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors">Dry Carbon Aero & Body</Link></li>
            <li><Link href="/catalog?category=Electrical" className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors">Electrical & ECU Tuning</Link></li>
          </ul>
        </div>

        {/* Col 3: Warehouse & Pickup Hubs */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wider">
            {t.footer.warehouseLocations}
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#112D4E] dark:text-[#BBE1FA] font-bold block">Bangna Logistics Hub (Main)</span>
                <span className="text-[#112D4E]/60 dark:text-[#85B5D9] text-[11px]">Km. 8 Bangna-Trad Road, Bangkok</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#112D4E] dark:text-[#BBE1FA] font-bold block">Laksi Express Pickup Center</span>
                <span className="text-[#112D4E]/60 dark:text-[#85B5D9] text-[11px]">Vibhavadi Rangsit Road, Bangkok</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 4: Contact & Portal */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wider">
            {t.footer.customerSupport}
          </h4>
          <div className="space-y-2 font-medium">
            <p className="flex items-center gap-2 text-[#112D4E] dark:text-[#BBE1FA]">
              <Phone className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#3282B8]" />
              <span>02-889-1928 / 081-992-8812</span>
            </p>
            <p className="flex items-center gap-2 text-[#112D4E] dark:text-[#BBE1FA]">
              <Mail className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#3282B8]" />
              <span>fitment@pitstopgrid.co.th</span>
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] text-[#3F72AF] dark:text-[#3282B8] hover:border-[#3F72AF] dark:hover:border-[#3282B8] transition-colors font-mono font-bold"
            >
              <span>{t.navbar.sellerPortal}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#3F72AF]/10 dark:border-[#3282B8]/20 bg-[#F9F7F7] dark:bg-[#1B262C] py-4 px-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#112D4E]/60 dark:text-[#85B5D9] font-mono font-semibold">
          <p>© 2026 PITSTOP GRID CO., LTD. ALL RIGHTS RESERVED.</p>
          <p>BUILT ON NEXT.JS 15 • PRISMA ORM • ZUSTAND FITMENT ENGINE</p>
        </div>
      </div>
    </footer>
  );
};
