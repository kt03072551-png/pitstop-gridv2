"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { 
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
  Warehouse,
  CheckCircle2
} from "lucide-react";
import { VehicleSelectorBar } from "@/components/layout/VehicleSelectorBar";
import { FitmentBadge } from "@/components/ui/FitmentBadge";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useTranslations } from "next-intl";
import { formatTHB } from "@/lib/utils";

export default function HomePage() {
  const { activeVehicle, checkFitment } = useVehicleStore();
  const t = useTranslations("home");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Smart Vehicle Selector Bar Hero */}
      <VehicleSelectorBar />

      {/* 2. Main Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#DBE2EF]/60 via-[#F9F7F7] to-[#F9F7F7] dark:from-[#0F4C75]/80 dark:via-[#1B262C] dark:to-[#1B262C] border-b border-[#3F72AF]/20 dark:border-[#3282B8]/30 py-16 px-4 transition-colors duration-200">
        {/* Background metallic grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3F72AF15_1px,transparent_1px),linear-gradient(to_bottom,#3F72AF15_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3282B815_1px,transparent_1px),linear-gradient(to_bottom,#3282B815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3F72AF]/15 dark:bg-[#3282B8]/20 border border-[#3F72AF]/50 dark:border-[#3282B8]/50 text-[#3F72AF] dark:text-[#3282B8] font-mono text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("heroBadge")}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-mono font-black tracking-tight text-[#112D4E] dark:text-[#BBE1FA] uppercase leading-none">
              {t("heroTitle1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F72AF] via-[#112D4E] to-[#3F72AF] dark:from-[#3282B8] dark:via-[#BBE1FA] dark:to-[#85B5D9]">
                {t("heroTitle2")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#112D4E]/80 dark:text-[#BBE1FA]/80 font-normal max-w-2xl leading-relaxed">
              {t("heroDesc")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/catalog"
                className="px-6 py-3.5 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-[#3F72AF]/25 active:scale-95 min-h-[44px]"
              >
                <span>{t("exploreCatalog")}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/garage"
                className="px-6 py-3.5 rounded-xl bg-[#DBE2EF] dark:bg-[#0F4C75] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] border border-[#3F72AF]/30 dark:border-[#3282B8]/40 font-mono font-bold text-sm uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center"
              >
                {t("myGarage")} ({activeVehicle ? activeVehicle.model : "0"})
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#DBE2EF] dark:border-[#0F4C75] max-w-xl">
              <div>
                <span className="block text-2xl font-mono font-bold text-[#112D4E] dark:text-[#BBE1FA]">{t("statExactFit")}</span>
                <span className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] font-mono uppercase">{t("statExactFitDesc")}</span>
              </div>
              <div>
                <span className="block text-2xl font-mono font-bold text-[#3F72AF] dark:text-[#3282B8]">{t("statHub")}</span>
                <span className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] font-mono uppercase">{t("statHubDesc")}</span>
              </div>
              <div>
                <span className="block text-2xl font-mono font-bold text-[#112D4E] dark:text-[#BBE1FA]">{t("statOcr")}</span>
                <span className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] font-mono uppercase">{t("statOcrDesc")}</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3F72AF]/15 dark:bg-[#3282B8]/15 rounded-full blur-3xl group-hover:opacity-100 transition-all" />
              <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-4 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#3F72AF] dark:text-[#3282B8] font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> {t("featuredDrop")}
                </span>
                <span className="font-mono text-xs text-[#112D4E]/60 dark:text-[#85B5D9]">SKU: SPN-FL5-AERO-HD</span>
              </div>

              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#DBE2EF] dark:border-[#0F4C75] relative mb-4 bg-black/10">
                <Image
                  src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
                  alt="Spoon Sports Carbon Hood"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <FitmentBadge status={checkFitment(MOCK_PARTS_CATALOG[2])} />
                </div>
              </div>

              <h3 className="font-bold text-lg text-[#112D4E] dark:text-[#BBE1FA] mb-1">
                Spoon Sports Dry Carbon Vented Hood
              </h3>
              <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] mb-4 leading-relaxed font-medium">
                Autoclave cured pre-preg 3K twill carbon with NACA intake duct feeding K20C1 intake. Saves -6.4kg over factory hood.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#DBE2EF] dark:border-[#0F4C75]">
                <div>
                  <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase">Direct Price</span>
                  <span className="font-mono text-xl font-bold text-[#3F72AF] dark:text-[#3282B8]">{formatTHB(84500)}</span>
                </div>
                <Link
                  href={`/parts/${MOCK_PARTS_CATALOG[2].oemPartNumber}`}
                  className="px-4 py-2 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>{t("inspectDiagram")}</span>
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
            <span className="font-mono text-xs uppercase text-[#3F72AF] dark:text-[#3282B8] font-bold tracking-widest block mb-1">
              • {t("categoryNav")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
              {t("exploreCategory")}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-mono text-[#3F72AF] dark:text-[#3282B8] hover:underline flex items-center gap-1 font-bold"
          >
            {t("viewAllCategories")} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/catalog?category=${cat.slug}`}
                className="group p-5 rounded-xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF] dark:hover:border-[#3282B8] transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#3F72AF]/30 dark:border-[#3282B8]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" />
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75]">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="font-mono font-bold text-base text-[#112D4E] dark:text-[#BBE1FA] group-hover:text-[#3F72AF] dark:group-hover:text-[#3282B8] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] mt-1.5 leading-relaxed font-medium">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-between text-xs font-mono text-[#112D4E]/60 dark:text-[#85B5D9] group-hover:text-[#3F72AF] dark:group-hover:text-[#3282B8] transition-colors font-semibold">
                  <span>{t("viewAllParts")}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}

          {/* 6th box for Garage Quick Action */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#DBE2EF] via-[#DBE2EF]/80 to-[#F9F7F7] dark:from-[#0F4C75] dark:via-[#0F4C75]/80 dark:to-[#1B262C] border border-[#3F72AF] dark:border-[#3282B8] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] flex items-center justify-center shadow-sm">
                  <Warehouse className="w-5 h-5 text-white dark:text-[#1B262C]" />
                </div>
                <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[#112D4E] dark:bg-[#BBE1FA] text-white dark:text-[#1B262C] uppercase tracking-wide">
                  Active Filter
                </span>
              </div>
              <h3 className="font-mono font-bold text-base text-[#112D4E] dark:text-[#BBE1FA]">
                {currentActiveVehicle ? currentActiveVehicle.nickname || currentActiveVehicle.model : "No Active Vehicle"}
              </h3>
              <p className="text-xs text-[#112D4E]/80 dark:text-[#BBE1FA]/80 mt-1.5 leading-relaxed font-medium">
                {currentActiveVehicle 
                  ? `Currently filtering catalog for ${currentActiveVehicle.year} ${currentActiveVehicle.make} ${currentActiveVehicle.model} (${currentActiveVehicle.trim}).`
                  : "Save your vehicle make, model, and engine trim to automatically verify part compatibility across the store."}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#3F72AF]/30 dark:border-[#3282B8]/30 flex items-center justify-between">
              <Link
                href="/garage"
                className="text-xs font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] hover:underline flex items-center gap-1"
              >
                Manage My Garage & VINs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fitment-Verified Recommendations Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full border-t border-[#DBE2EF] dark:border-[#0F4C75]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs uppercase text-[#3F72AF] dark:text-[#3282B8] font-bold tracking-widest block mb-1">
              • Personalized Fitment Audit
            </span>
            <h2 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight flex items-center gap-2 flex-wrap">
              <span>Verified Parts & Performance Drops</span>
              {currentActiveVehicle && (
                <span className="text-sm font-normal text-[#112D4E] dark:text-[#BBE1FA] bg-[#DBE2EF] dark:bg-[#0F4C75] px-3 py-1 rounded-full border border-[#3F72AF]/30 dark:border-[#3282B8]/30">
                  For {currentActiveVehicle.year} {currentActiveVehicle.model}
                </span>
              )}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="px-4 py-2 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] text-xs font-mono font-bold transition-colors shrink-0 shadow-sm"
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
                className="group flex flex-col justify-between rounded-2xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF] dark:hover:border-[#3282B8] overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {/* Top Image & Fitment Badge */}
                <div className="relative aspect-[16/10] bg-[#F9F7F7] dark:bg-[#1B262C] overflow-hidden border-b border-[#DBE2EF] dark:border-[#0F4C75]">
                  <Image
                    src={part.images[0]?.imageUrl}
                    alt={part.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <FitmentBadge status={fitStatus} size="sm" />
                  </div>
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="px-2 py-0.5 rounded bg-[#F9F7F7]/90 dark:bg-[#1B262C]/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75]">
                      {part.brand}
                    </span>
                  </div>
                  {part.images.some((i) => i.isExplodedDiagram) && (
                    <div className="absolute bottom-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded bg-[#3F72AF] text-white text-[10px] font-mono flex items-center gap-1 shadow-sm font-bold">
                        📐 Exploded Diagram
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] mb-1 font-semibold">
                      <span>OEM: {part.oemPartNumber}</span>
                      <span className="text-[#3F72AF] dark:text-[#3282B8] font-bold">{part.warehouseBin}</span>
                    </div>
                    <Link
                      href={`/parts/${part.oemPartNumber}`}
                      className="font-bold text-sm text-[#112D4E] dark:text-[#BBE1FA] group-hover:text-[#3F72AF] dark:group-hover:text-[#3282B8] transition-colors line-clamp-2 leading-snug"
                    >
                      {part.title}
                    </Link>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase font-semibold">Price (Inc VAT)</span>
                      <span className="font-mono font-bold text-base text-[#3F72AF] dark:text-[#3282B8]">{formatTHB(part.price)}</span>
                    </div>
                    <Link
                      href={`/parts/${part.oemPartNumber}`}
                      className="px-3 py-1.5 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs transition-all shadow-sm"
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
      <section className="bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 border-t border-[#DBE2EF] dark:border-[#0F4C75] py-16 px-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="p-6 rounded-2xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#3F72AF]/20 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-center mb-3 mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" />
            </div>
            <h3 className="font-mono font-bold text-base text-[#112D4E] dark:text-[#BBE1FA] uppercase">Guaranteed Fitment Or Money Back</h3>
            <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] leading-relaxed font-medium">
              If our compatibility engine indicates <span className="inline-flex items-center mx-1"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Fits Your Vehicle</span> and the part does not mount cleanly to your factory points, we provide 100% full refund plus return pickup.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#3F72AF]/20 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-center mb-3 mx-auto sm:mx-0">
              <Warehouse className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" />
            </div>
            <h3 className="font-mono font-bold text-base text-[#112D4E] dark:text-[#BBE1FA] uppercase">2-Hour Warehouse Hub Pickup</h3>
            <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] leading-relaxed font-medium">
              Need parts immediately before a track weekend? Order online, select In-Store Pickup, and collect right from our Bangna or Laksi warehouse bins within 120 minutes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#3F72AF]/20 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-center mb-3 mx-auto sm:mx-0">
              <Zap className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" />
            </div>
            <h3 className="font-mono font-bold text-base text-[#112D4E] dark:text-[#BBE1FA] uppercase">AI Slip & PromptPay Verification</h3>
            <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] leading-relaxed font-medium">
              Scan our exact-satang dynamic PromptPay QR code and upload your transfer slip. Our automated OCR system verifies transaction timestamps and releases orders to warehouse pickers in seconds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
