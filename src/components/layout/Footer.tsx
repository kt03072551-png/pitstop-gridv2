import React from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-mono text-base font-bold tracking-tight text-white uppercase">
              PITSTOP <span className="text-emerald-400">GRID</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            High-performance automotive parts marketplace with precise OEM fitment matrix verification for motorbikes and cars.
          </p>
          <div className="pt-1 flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Genuine OEM Guarantee</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            Parts Categories
          </h4>
          <ul className="space-y-2 font-medium">
            <li><Link href="/catalog?category=Engine" className="hover:text-emerald-400 transition-colors">Engine & Drivetrain</Link></li>
            <li><Link href="/catalog?category=Exhaust" className="hover:text-emerald-400 transition-colors">Exhaust Systems & Downpipes</Link></li>
            <li><Link href="/catalog?category=Braking" className="hover:text-emerald-400 transition-colors">Braking & Suspension Kits</Link></li>
            <li><Link href="/catalog?category=Body" className="hover:text-emerald-400 transition-colors">Dry Carbon Aero & Body</Link></li>
            <li><Link href="/catalog?category=Electrical" className="hover:text-emerald-400 transition-colors">Electrical & ECU Tuning</Link></li>
          </ul>
        </div>

        {/* Col 3: Warehouse & Pickup Hubs */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            Warehouse Hubs (Ready in 2 Hours)
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-200 font-semibold block">Bangna Logistics Hub (Main)</span>
                <span className="text-slate-400 text-[11px]">Km. 8 Bangna-Trad Road, Bangkok</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-200 font-semibold block">Laksi Express Pickup Center</span>
                <span className="text-slate-400 text-[11px]">Vibhavadi Rangsit Road, Bangkok</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 4: Contact & Portal */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            Customer Support
          </h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>02-889-1928 / 081-992-8812</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>fitment@pitstopgrid.co.th</span>
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-amber-400 hover:border-amber-500/50 transition-colors font-mono font-semibold"
            >
              <span>Seller/Admin Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 bg-slate-950/80 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
          <p>© 2026 PITSTOP GRID CO., LTD. ALL RIGHTS RESERVED.</p>
          <p>BUILT ON NEXT.JS 15 • PRISMA ORM • ZUSTAND FITMENT ENGINE</p>
        </div>
      </div>
    </footer>
  );
};
