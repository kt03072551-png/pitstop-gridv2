"use client";

import React from "react";
import Link from "next/link";
import { 
  Wrench, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ChevronRight, 
  Sparkles, 
  Gauge, 
  Box, 
  Cpu, 
  Disc, 
  Activity,
  ArrowRight,
  Warehouse
} from "lucide-react";
import { VehicleSelectorBar } from "@/components/layout/VehicleSelectorBar";
import { FitmentBadge } from "@/components/ui/FitmentBadge";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";
import { useVehicleStore } from "@/store/useVehicleStore";
import { formatTHB } from "@/lib/utils";

export default function HomePage() {
  const { activeVehicle, checkFitment } = useVehicleStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentActiveVehicle = mounted ? activeVehicle : null;

  const categories = [
    { name: "Engine & Drivetrain", slug: "Engine", icon: Gauge, count: "3,420 SKUs", desc: "Oil filters, gaskets, forged internals, and timing components." },
    { name: "Exhaust Systems", slug: "Exhaust", icon: Flame, count: "890 SKUs", desc: "Full titanium headers, downpipes, and cat-back systems." },
    { name: "Braking & Suspension", slug: "Braking", icon: Disc, count: "1,650 SKUs", desc: "Monoblock big brake kits, slotted rotors, and coilovers." },
    { name: "Body & Carbon Aero", slug: "Body", icon: Box, count: "1,120 SKUs", desc: "Autoclave dry carbon hoods, wings, and diffuser lips." },
    { name: "Electrical & Tuning", slug: "Electrical", icon: Cpu, count: "740 SKUs", desc: "Standalone ECUs, wiring harnesses, and high-output coils." },
  ];

  const featuredParts = MOCK_PARTS_CATALOG.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Smart Vehicle Selector Bar Hero */}
      <VehicleSelectorBar />

      {/* 2. Main Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 py-16 px-4">
        {/* Background metallic grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-xs font-semibold shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OEM MASTER FITMENT MATRIX VERIFIED</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-mono font-black tracking-tight text-white uppercase leading-none">
              PRECISION AUTOMOTIVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300">
                PARTS & FITMENT
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed">
              Industrial-grade marketplace tailored for high-performance motorbikes and track cars. 
              Instantly cross-reference over <strong className="text-white font-semibold">10,000+ OEM & Aftermarket SKUs</strong> against our multi-tier vehicle compatibility engine before you order.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/catalog"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/garage"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-mono font-semibold text-sm uppercase tracking-wider transition-all"
              >
                Manage Saved Garage ({activeVehicle ? "Active: " + activeVehicle.model : "0"})
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-xl">
              <div>
                <span className="block text-2xl font-mono font-bold text-white">100%</span>
                <span className="text-xs text-slate-400 font-mono uppercase">Exact Bolt-On Fit</span>
              </div>
              <div>
                <span className="block text-2xl font-mono font-bold text-emerald-400">2 HRS</span>
                <span className="text-xs text-slate-400 font-mono uppercase">Warehouse Hub Pickup</span>
              </div>
              <div>
                <span className="block text-2xl font-mono font-bold text-sky-400">OCR + QR</span>
                <span className="text-xs text-slate-400 font-mono uppercase">Instant Slip Approval</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Featured Track Spec Drop
                </span>
                <span className="font-mono text-xs text-slate-500">SKU: SPN-FL5-AERO-HD</span>
              </div>

              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 relative mb-4">
                <img
                  src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
                  alt="Spoon Sports Carbon Hood"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <FitmentBadge status={checkFitment(MOCK_PARTS_CATALOG[2])} />
                </div>
              </div>

              <h3 className="font-semibold text-lg text-white mb-1">
                Spoon Sports Dry Carbon Vented Hood
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Autoclave cured pre-preg 3K twill carbon with NACA intake duct feeding K20C1 intake. Saves -6.4kg over factory hood.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">Direct Price</span>
                  <span className="font-mono text-xl font-bold text-emerald-400">{formatTHB(84500)}</span>
                </div>
                <Link
                  href={`/parts/${MOCK_PARTS_CATALOG[2].oemPartNumber}`}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-white font-mono font-semibold text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
                >
                  <span>Inspect Exploded Diagram</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-widest block mb-1">
              • Catalog Navigation
            </span>
            <h2 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
              Explore By Technical Category
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors font-medium"
          >
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/catalog?category=${cat.slug}`}
                className="group p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-slate-800 transition-colors">
                      <IconComponent className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="font-mono font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-emerald-400 transition-colors">
                  <span>Filter by active fitment</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}

          {/* 6th box for Garage Quick Action */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-lg bg-emerald-900/60 border border-emerald-500 flex items-center justify-center">
                  <Warehouse className="w-5 h-5 text-emerald-300" />
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  Active Filter
                </span>
              </div>
              <h3 className="font-mono font-bold text-base text-white">
                {currentActiveVehicle ? currentActiveVehicle.nickname || currentActiveVehicle.model : "No Active Vehicle"}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {currentActiveVehicle 
                  ? `Currently filtering catalog for ${currentActiveVehicle.year} ${currentActiveVehicle.make} ${currentActiveVehicle.model} (${currentActiveVehicle.trim}).`
                  : "Save your vehicle make, model, and engine trim to automatically verify part compatibility across the store."}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-emerald-500/30 flex items-center justify-between">
              <Link
                href="/garage"
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                Manage My Garage & VINs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fitment-Verified Recommendations Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full border-t border-slate-850">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-widest block mb-1">
              • Personalized Fitment Audit
            </span>
            <h2 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span>Verified Parts & Performance Drops</span>
              {currentActiveVehicle && (
                <span className="text-sm font-normal text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  For {currentActiveVehicle.year} {currentActiveVehicle.model}
                </span>
              )}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono font-semibold transition-colors shrink-0"
          >
            View All 10,000+ Parts &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PARTS_CATALOG.map((part) => {
            const fitStatus = mounted ? checkFitment(part) : "UNSELECTED";
            return (
              <div
                key={part.id}
                className="group flex flex-col justify-between rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {/* Top Image & Fitment Badge */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden border-b border-slate-800/80">
                  <img
                    src={part.images[0]?.imageUrl}
                    alt={part.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <FitmentBadge status={fitStatus} size="sm" />
                  </div>
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="px-2 py-0.5 rounded bg-slate-950/90 backdrop-blur-md text-[10px] font-mono font-bold text-slate-300 border border-slate-800">
                      {part.brand}
                    </span>
                  </div>
                  {part.images.some((i) => i.isExplodedDiagram) && (
                    <div className="absolute bottom-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded bg-sky-950/90 text-sky-300 border border-sky-500/50 text-[10px] font-mono flex items-center gap-1 shadow-sm">
                        📐 Exploded Diagram
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>OEM: {part.oemPartNumber}</span>
                      <span className="text-emerald-400">{part.warehouseBin}</span>
                    </div>
                    <Link
                      href={`/parts/${part.oemPartNumber}`}
                      className="font-semibold text-sm text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug"
                    >
                      {part.title}
                    </Link>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-mono text-slate-500 uppercase">Price (Inc VAT)</span>
                      <span className="font-mono font-bold text-base text-white">{formatTHB(part.price)}</span>
                    </div>
                    <Link
                      href={`/parts/${part.oemPartNumber}`}
                      className="px-3 py-1.5 rounded bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-mono font-semibold text-xs transition-all border border-slate-700 hover:border-emerald-400"
                    >
                      Inspect Spec
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Industrial Feature Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-mono font-bold text-base text-white uppercase">Guaranteed Fitment Or Money Back</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If our compatibility engine indicates `[ ✅ Fits Your Vehicle ]` and the part does not mount cleanly to your factory points, we provide 100% full refund plus return pickup.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-500/50 flex items-center justify-center mb-3">
              <Warehouse className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="font-mono font-bold text-base text-white uppercase">2-Hour Warehouse Hub Pickup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Need parts immediately before a track weekend? Order online, select In-Store Pickup, and collect right from our Bangna or Laksi warehouse bins within 120 minutes.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-500/50 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-mono font-bold text-base text-white uppercase">AI Slip & PromptPay Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scan our exact-satang dynamic PromptPay QR code and upload your transfer slip. Our automated OCR system verifies transaction timestamps and releases orders to warehouse pickers in seconds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
