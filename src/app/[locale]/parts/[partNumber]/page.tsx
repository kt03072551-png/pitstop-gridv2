"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShoppingCart, 
  Warehouse, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ZoomIn, 
  Settings,
  Search
} from "lucide-react";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useCartStore } from "@/store/useCartStore";
import { formatTHB, cn } from "@/lib/utils";
import { ExplodedCallout, PartImage } from "@/types";
import { useTranslation } from "@/lib/i18n/translations";

export default function ProductDetailPage() {
  const { t, lang } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const partNumberParam = decodeURIComponent(params?.partNumber as string || "");

  const part = MOCK_PARTS_CATALOG.find(
    (p) => p.oemPartNumber.toLowerCase() === partNumberParam.toLowerCase() || p.sku.toLowerCase() === partNumberParam.toLowerCase()
  ) || MOCK_PARTS_CATALOG[0];

  const { activeVehicle, checkFitment } = useVehicleStore();
  const { addItem, fulfillmentType, setFulfillmentType } = useCartStore();

  const [selectedImage, setSelectedImage] = useState<PartImage>(part.images[0] || { id: "0", imageUrl: "", isPrimary: true, isExplodedDiagram: false });
  const [activeCallout, setActiveCallout] = useState<ExplodedCallout | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const fitStatus = mounted ? checkFitment(part) : "UNSELECTED";
  const currentActiveVehicle = mounted ? activeVehicle : null;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm animate-pulse flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-ping" />
          Loading Product Schematics & Fitment Matrix...
        </div>
      </div>
    );
  }

  const handleAddToCart = (redirectCheckout = false) => {
    addItem(part, quantity, fitStatus, activeVehicle?.trimId);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 3000);
    if (redirectCheckout) {
      router.push("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-8 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9]">
          <Link href="/" className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] font-semibold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] font-semibold">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/catalog?category=${part.category}`} className="hover:text-[#3F72AF] dark:hover:text-[#3282B8] font-semibold">{part.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#112D4E] dark:text-white font-bold truncate max-w-xs">{part.oemPartNumber}</span>
        </nav>

        {/* 1. Dynamic Vehicle Fitment Status Banner */}
        <div className={cn(
          "p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md transition-all",
          fitStatus === "FITS" && "bg-gradient-to-r from-[#3F72AF]/20 via-[#DBE2EF] to-[#DBE2EF] dark:from-[#3282B8]/30 dark:via-[#0F4C75] dark:to-[#0F4C75] border-[#3F72AF] dark:border-[#3282B8] text-[#112D4E] dark:text-[#BBE1FA]",
          fitStatus === "INCOMPATIBLE" && "bg-gradient-to-r from-rose-500/20 via-[#DBE2EF] to-[#DBE2EF] dark:from-rose-950 dark:via-[#0F4C75] dark:to-[#0F4C75] border-rose-500 text-rose-800 dark:text-rose-200 animate-pulse",
          fitStatus === "UNIVERSAL" && "bg-gradient-to-r from-[#3F72AF]/20 via-[#DBE2EF] to-[#DBE2EF] dark:from-[#3282B8]/30 dark:via-[#0F4C75] dark:to-[#0F4C75] border-[#3F72AF] text-[#112D4E] dark:text-[#BBE1FA]",
          fitStatus === "UNSELECTED" && "bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E]/80 dark:text-[#BBE1FA]/80"
        )}>
          <div className="flex items-center gap-3.5">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-inner font-mono font-bold text-lg",
              fitStatus === "FITS" && "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] border-[#3F72AF]",
              fitStatus === "INCOMPATIBLE" && "bg-rose-600 text-white border-rose-400",
              fitStatus === "UNIVERSAL" && "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] border-[#3F72AF]",
              fitStatus === "UNSELECTED" && "bg-[#F9F7F7] dark:bg-[#1B262C] border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E]/60 dark:text-[#85B5D9]"
            )}>
              {fitStatus === "FITS" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {fitStatus === "INCOMPATIBLE" && <AlertTriangle className="w-5 h-5 text-rose-200" />}
              {fitStatus === "UNIVERSAL" && <Info className="w-5 h-5 text-sky-400" />}
              {fitStatus === "UNSELECTED" && <Search className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <h2 className="font-mono font-bold text-base uppercase tracking-tight text-[#112D4E] dark:text-[#BBE1FA] flex items-center gap-2">
                {fitStatus === "FITS" && `Guaranteed Fit for your ${currentActiveVehicle?.year} ${currentActiveVehicle?.model}`}
                {fitStatus === "INCOMPATIBLE" && `Does NOT fit your ${currentActiveVehicle?.year} ${currentActiveVehicle?.model}`}
                {fitStatus === "UNIVERSAL" && "Universal Fit Engine — Compatible with All Vehicles"}
                {fitStatus === "UNSELECTED" && "Select Your Vehicle in My Garage to Verify Exact Fitment"}
              </h2>
              <p className="text-xs opacity-90 mt-0.5 font-medium">
                {fitStatus === "FITS" && `Exact OEM direct bolt-on verification for ${currentActiveVehicle?.trim}. No modifications required.`}
                {fitStatus === "INCOMPATIBLE" && "Warning: This part thread size or mounting flanges differ from your active trim specifications."}
                {fitStatus === "UNIVERSAL" && "Engineered to operate seamlessly across gasoline turbo, NA, and motorcycle engines."}
                {fitStatus === "UNSELECTED" && "Cross-referencing against 10,000+ factory OEM schematic data points."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {fitStatus === "INCOMPATIBLE" && (
              <Link
                href={`/catalog?category=${part.category}`}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-mono font-bold text-xs uppercase transition-colors shrink-0 min-h-[40px] flex items-center"
              >
                View Compatible Parts &rarr;
              </Link>
            )}
            <Link
              href="/garage"
              className="px-4 py-2 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75] font-mono text-xs font-bold transition-colors shrink-0 min-h-[40px] flex items-center"
            >
              Change Vehicle
            </Link>
          </div>
        </div>

        {/* 2. Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8/12 Span) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery & Exploded Diagram Viewer Container */}
            <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#3F72AF] dark:text-[#3282B8] uppercase tracking-wider flex items-center gap-1.5">
                    <ZoomIn className="w-4 h-4" /> {t.partDetail.techGalleryTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#112D4E]/70 dark:text-[#85B5D9]">
                  <span>Mode:</span>
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg font-bold uppercase",
                    selectedImage.isExplodedDiagram ? "bg-[#3F72AF] text-white dark:text-[#1B262C]" : "bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75]"
                  )}>
                    {selectedImage.isExplodedDiagram ? `${t.partDetail.calloutDiagram} 📐` : "High-Res Photo 📸"}
                  </span>
                </div>
              </div>

              {/* Main Viewer Box */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-center group shadow-inner">
                <Image
                  src={selectedImage.imageUrl}
                  alt={part.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover select-none transition-transform duration-500"
                />

                {/* Exploded Diagram Interactive Callout Pins */}
                {selectedImage.isExplodedDiagram && selectedImage.callouts && selectedImage.callouts.map((callout) => {
                  const isActive = activeCallout?.calloutNumber === callout.calloutNumber;
                  return (
                    <div
                      key={callout.calloutNumber}
                      style={{ left: `${callout.xCoord}%`, top: `${callout.yCoord}%` }}
                      onMouseEnter={() => setActiveCallout(callout)}
                      onMouseLeave={() => setActiveCallout(null)}
                      onClick={() => setActiveCallout(isActive ? null : callout)}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-lg transition-all border-2",
                        isActive
                          ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] border-white scale-125 shadow-[#3F72AF]/60 ring-4 ring-[#3F72AF]/30"
                          : "bg-[#112D4E]/90 dark:bg-[#1B262C]/90 text-[#BBE1FA] border-[#3F72AF] hover:scale-110 hover:bg-[#3F72AF] hover:text-white animate-bounce"
                      )}
                    >
                      {callout.calloutNumber}
                    </div>
                  );
                })}

                {/* Exploded Diagram Floating Tooltip Card */}
                {activeCallout && (
                  <div className="absolute top-4 left-4 z-30 max-w-sm p-4 rounded-xl bg-[#112D4E]/95 dark:bg-[#1B262C]/95 backdrop-blur-md border border-[#3F72AF] shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                    <div className="flex items-center justify-between border-b border-[#3F72AF]/40 pb-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] uppercase">
                        {t.partDetail.calloutPin} {activeCallout.calloutNumber}
                      </span>
                      {activeCallout.subPartSku && (
                        <span className="font-mono text-xs text-[#BBE1FA]">SKU: {activeCallout.subPartSku}</span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-white">
                      {lang === "th" && activeCallout.labelTh ? activeCallout.labelTh : activeCallout.label}
                    </h4>
                    {activeCallout.specs && (
                      <p className="text-xs font-mono text-[#BBE1FA] leading-relaxed bg-black/40 p-2.5 rounded border border-[#3F72AF]/30">
                        <Settings className="w-3.5 h-3.5 inline mr-1" /> {lang === "th" && activeCallout.specsTh ? activeCallout.specsTh : activeCallout.specs}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {part.images.map((img, idx) => {
                  const isSelected = selectedImage.id === img.id;
                  return (
                    <button
                      key={img.id || idx}
                      onClick={() => setSelectedImage(img)}
                      className={cn(
                        "relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all shadow-sm",
                        isSelected
                          ? "border-[#3F72AF] dark:border-[#3282B8] ring-2 ring-[#3F72AF]/40 scale-105"
                          : "border-[#DBE2EF] dark:border-[#0F4C75] opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image src={img.imageUrl} alt="" fill sizes="96px" className="object-cover" />
                      {img.isExplodedDiagram && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#3F72AF] text-white text-[9px] font-mono font-bold">
                          📐 Diagram
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Part Specifications Table */}
            <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-md space-y-4">
              <h3 className="font-mono text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wider flex items-center gap-2 border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-3">
                <Sparkles className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> {t.partDetail.techSpecsTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center shadow-sm">
                  <span className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] uppercase font-semibold">{t.partDetail.specOemPartNumber}</span>
                  <span className="font-mono font-bold text-sm text-[#3F72AF] dark:text-[#3282B8]">{part.oemPartNumber}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center shadow-sm">
                  <span className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] uppercase font-semibold">{t.partDetail.specInternalSku}</span>
                  <span className="font-mono font-bold text-sm text-[#112D4E] dark:text-[#BBE1FA]">{part.sku}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center shadow-sm">
                  <span className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] uppercase font-semibold">{t.partDetail.specManufacturerBrand}</span>
                  <span className="font-bold text-sm text-[#112D4E] dark:text-white">{part.brand}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center shadow-sm">
                  <span className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] uppercase font-semibold">{t.partDetail.specPartGrade}</span>
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-[#3F72AF]/20 dark:bg-[#3282B8]/30 text-[#3F72AF] dark:text-[#3282B8] border border-[#3F72AF]/50">
                    {part.grade.replace("_", " ")}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center shadow-sm">
                  <span className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] uppercase font-semibold">{t.partDetail.specWarehouseBin}</span>
                  <span className="font-mono font-bold text-sm text-[#3F72AF] dark:text-[#3282B8]">{part.warehouseBin} ({part.warehouseAisle})</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center shadow-sm">
                  <span className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] uppercase font-semibold">{t.partDetail.specUniversalFitment}</span>
                  <span className="font-mono font-bold text-xs text-[#112D4E] dark:text-[#BBE1FA]">{part.isUniversalFit ? t.partDetail.specUniversalYes : t.partDetail.specUniversalNo}</span>
                </div>
              </div>

              {/* Dynamic Key-Value Specs */}
              {Object.keys(part.specifications).length > 0 && (
                <div className="pt-4 border-t border-[#DBE2EF] dark:border-[#0F4C75] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] tracking-wide font-bold">{t.partDetail.specDetailedEngineering}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(lang === "th" && part.specificationsTh ? part.specificationsTh : part.specifications).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center text-xs shadow-sm">
                        <span className="text-[#112D4E]/70 dark:text-[#85B5D9] font-semibold">{key}:</span>
                        <span className="font-mono font-bold text-[#112D4E] dark:text-[#BBE1FA] text-right max-w-[60%]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Compatibility List Accordion */}
            <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 shadow-md overflow-hidden">
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="w-full p-5 flex items-center justify-between text-left hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#3F72AF] dark:text-[#3282B8]">
                    Vehicle Compatibility Matrix
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75] text-xs font-mono font-bold">
                    {part.compatibilityList.length} Supported Platforms
                  </span>
                </div>
                {isAccordionOpen ? <ChevronUp className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" /> : <ChevronDown className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" />}
              </button>

              {isAccordionOpen && (
                <div className="p-5 border-t border-[#DBE2EF] dark:border-[#0F4C75] bg-[#F9F7F7] dark:bg-[#1B262C] space-y-3">
                  <p className="text-xs text-[#112D4E]/80 dark:text-[#BBE1FA]/80 font-medium">
                    {t.partDetail.fitmentDescription}
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-[#112D4E] dark:text-[#BBE1FA]">
                    {part.compatibilityList.map((item, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 border border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-between font-semibold">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shadow-sm">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wide">
                            {t.partDetail.fitmentAuditTitle}
                          </span>
                        </div>
                        <span className="text-[#3F72AF] dark:text-[#3282B8] font-bold text-[11px]">{t.partDetail.directBoltOn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4/12 Sticky Buy Box) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-xl space-y-6">
              {/* Brand & Title */}
              <div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-[#F9F7F7] dark:bg-[#1B262C] text-[#3F72AF] dark:text-[#3282B8] border border-[#DBE2EF] dark:border-[#0F4C75] font-mono text-xs font-bold uppercase mb-2 shadow-sm">
                  {part.brand}
                </span>
                <h1 className="text-xl font-bold text-[#112D4E] dark:text-[#BBE1FA] leading-snug">{part.title}</h1>
                <p className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] mt-2 font-medium">{t.partDetail.oemRef}: <strong className="text-[#112D4E] dark:text-white font-bold">{part.oemPartNumber}</strong></p>
                <p className="text-sm text-[#112D4E]/80 dark:text-[#BBE1FA]/80 mt-4 leading-relaxed font-medium">
                  {lang === "th" && part.descriptionTh ? part.descriptionTh : part.description}
                </p>
              </div>

              {/* Price & Stock */}
              <div className="p-4 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-between shadow-sm">
                <div>
                  <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase font-semibold">{t.partDetail.totalPrice}</span>
                  <span className="font-mono font-black text-3xl text-[#3F72AF] dark:text-[#3282B8] tracking-tight">{formatTHB(part.price)}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] bg-[#DBE2EF]/80 dark:bg-[#0F4C75]/80 px-2.5 py-1 rounded-lg border border-[#3F72AF]/40">
                    <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> {t.partDetail.inStock} ({part.stockQuantity})
                  </span>
                  <span className="block text-[11px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] mt-1 font-semibold">{part.warehouseBin} • {part.warehouseAisle}</span>
                </div>
              </div>

              {/* Fulfillment Selectors */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.partDetail.selectFulfillment}:</label>
                <div className="space-y-2.5">
                  <label
                    onClick={() => setFulfillmentType("EXPRESS_SHIPPING")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all shadow-sm",
                      fulfillmentType === "EXPRESS_SHIPPING"
                        ? "bg-[#F9F7F7] dark:bg-[#1B262C] border-[#3F72AF] ring-2 ring-[#3F72AF]/40"
                        : "bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF]"
                    )}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillmentType === "EXPRESS_SHIPPING"}
                      onChange={() => setFulfillmentType("EXPRESS_SHIPPING")}
                      className="mt-1 w-4 h-4 text-[#3F72AF] focus:ring-0 bg-[#F9F7F7] dark:bg-[#1B262C] border-[#DBE2EF] dark:border-[#0F4C75]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#112D4E] dark:text-[#BBE1FA]">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> {t.partDetail.expressShipping}
                        </span>
                        <span className="font-mono text-[#3F72AF] dark:text-[#3282B8]">+฿250.00</span>
                      </div>
                      <p className="text-[11px] text-[#112D4E]/70 dark:text-[#85B5D9] mt-1 font-medium">{t.partDetail.expressShippingDesc}</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setFulfillmentType("INSTORE_PICKUP")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all shadow-sm",
                      fulfillmentType === "INSTORE_PICKUP"
                        ? "bg-[#F9F7F7] dark:bg-[#1B262C] border-[#3F72AF] ring-2 ring-[#3F72AF]/40"
                        : "bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF]"
                    )}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillmentType === "INSTORE_PICKUP"}
                      onChange={() => setFulfillmentType("INSTORE_PICKUP")}
                      className="mt-1 w-4 h-4 text-[#3F72AF] focus:ring-0 bg-[#F9F7F7] dark:bg-[#1B262C] border-[#DBE2EF] dark:border-[#0F4C75]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#112D4E] dark:text-[#BBE1FA]">
                        <span className="flex items-center gap-1.5">
                          <Warehouse className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> {t.partDetail.inStorePickup}
                        </span>
                        <span className="font-mono text-[#3F72AF] dark:text-[#3282B8] font-bold">{t.partDetail.free}</span>
                      </div>
                      <p className="text-[11px] text-[#112D4E]/70 dark:text-[#85B5D9] mt-1 font-medium">{t.partDetail.inStorePickupDesc}</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-4 pt-2 border-t border-[#DBE2EF] dark:border-[#0F4C75]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.partDetail.quantity}:</label>
                  <div className="flex items-center gap-2 bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-1 shadow-inner">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-[#DBE2EF] dark:bg-[#0F4C75] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold flex items-center justify-center transition-all"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-[#112D4E] dark:text-[#BBE1FA]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(part.stockQuantity, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-[#DBE2EF] dark:bg-[#0F4C75] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold flex items-center justify-center transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => handleAddToCart(false)}
                    className="w-full flex-1 flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wider shadow-md shadow-[#3F72AF]/25 transition-all active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t.partDetail.addToCart}</span>
                  </button>

                  <button
                    onClick={() => handleAddToCart(true)}
                    className="w-full min-h-[46px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#112D4E] via-[#3F72AF] to-[#112D4E] dark:from-[#BBE1FA] dark:via-[#3282B8] dark:to-[#BBE1FA] text-white dark:text-[#1B262C] font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-[0.98] transition-all"
                  >
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>{t.partDetail.instantCheckout}</span>
                  </button>
                </div>

                {isAddedToast && (
                  <div className="p-3.5 rounded-xl bg-[#3F72AF]/20 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] text-[#112D4E] dark:text-[#BBE1FA] text-xs font-mono font-bold text-center shadow-md animate-in fade-in duration-200">
                    {t.partDetail.addedToCart}
                  </div>
                )}
                
                {fitStatus === "UNSELECTED" && (
                  <div className="py-8 px-4 text-center">
                    <AlertTriangle className="w-10 h-10 text-[#3F72AF] dark:text-[#3282B8] mx-auto mb-3" />
                    <h4 className="font-mono font-bold text-sm text-[#112D4E] dark:text-[#BBE1FA] uppercase mb-1">{t.partDetail.vehicleUnselected}</h4>
                    <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] max-w-xs mx-auto leading-relaxed">
                      {t.partDetail.fitmentUnknownDesc}
                    </p>
                    <Link
                      href="/garage"
                      className="inline-flex mt-4 min-h-[38px] px-4 py-2 rounded-xl bg-[#3F72AF] hover:opacity-90 text-white font-mono font-bold text-xs shadow-md transition-all"
                    >
                      {t.partDetail.configureGarage}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
