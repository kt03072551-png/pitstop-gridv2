"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  Check, 
  ArrowLeft,
  Share2
} from "lucide-react";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useCartStore } from "@/store/useCartStore";
import { FitmentBadge } from "@/components/ui/FitmentBadge";
import { formatTHB, cn } from "@/lib/utils";
import { ExplodedCallout, PartImage } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const partNumberParam = decodeURIComponent(params?.partNumber as string || "");

  const part = MOCK_PARTS_CATALOG.find(
    (p) => p.oemPartNumber.toLowerCase() === partNumberParam.toLowerCase() || p.sku.toLowerCase() === partNumberParam.toLowerCase()
  ) || MOCK_PARTS_CATALOG[0];

  const { activeVehicle, checkFitment } = useVehicleStore();
  const { addItem, fulfillmentType, setFulfillmentType, pickupBranch } = useCartStore();

  const [selectedImage, setSelectedImage] = useState<PartImage>(part.images[0] || { id: "0", imageUrl: "", isPrimary: true, isExplodedDiagram: false });
  const [activeCallout, setActiveCallout] = useState<ExplodedCallout | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const fitStatus = mounted ? checkFitment(part) : "UNSELECTED";
  const currentActiveVehicle = mounted ? activeVehicle : null;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-emerald-400 text-sm animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
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
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-emerald-400">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/catalog?category=${part.category}`} className="hover:text-emerald-400">{part.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-semibold truncate max-w-xs">{part.oemPartNumber}</span>
        </nav>

        {/* 1. Dynamic Vehicle Fitment Status Banner (Sticky alert below breadcrumbs) */}
        <div className={cn(
          "p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg transition-all",
          fitStatus === "FITS" && "bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-slate-900 border-emerald-500/80 text-emerald-200",
          fitStatus === "INCOMPATIBLE" && "bg-gradient-to-r from-rose-950/90 via-rose-950/70 to-slate-900 border-rose-500/80 text-rose-200 animate-pulse",
          fitStatus === "UNIVERSAL" && "bg-gradient-to-r from-sky-950/90 via-sky-950/70 to-slate-900 border-sky-500/80 text-sky-200",
          fitStatus === "UNSELECTED" && "bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-slate-700 text-slate-300"
        )}>
          <div className="flex items-center gap-3.5">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border shadow-inner font-mono font-bold text-lg",
              fitStatus === "FITS" && "bg-emerald-900/80 border-emerald-400 text-emerald-300",
              fitStatus === "INCOMPATIBLE" && "bg-rose-900/80 border-rose-400 text-rose-300",
              fitStatus === "UNIVERSAL" && "bg-sky-900/80 border-sky-400 text-sky-300",
              fitStatus === "UNSELECTED" && "bg-slate-800 border-slate-600 text-slate-400"
            )}>
              {fitStatus === "FITS" && "✅"}
              {fitStatus === "INCOMPATIBLE" && "⚠️"}
              {fitStatus === "UNIVERSAL" && "ℹ️"}
              {fitStatus === "UNSELECTED" && "🔍"}
            </div>
            <div>
              <h2 className="font-mono font-bold text-base uppercase tracking-tight text-white flex items-center gap-2">
                {fitStatus === "FITS" && `Guaranteed Fit for your ${currentActiveVehicle?.year} ${currentActiveVehicle?.model}`}
                {fitStatus === "INCOMPATIBLE" && `Does NOT fit your ${currentActiveVehicle?.year} ${currentActiveVehicle?.model}`}
                {fitStatus === "UNIVERSAL" && "Universal Fit Engine — Compatible with All Vehicles"}
                {fitStatus === "UNSELECTED" && "Select Your Vehicle in My Garage to Verify Exact Fitment"}
              </h2>
              <p className="text-xs opacity-90 mt-0.5">
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
                className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-mono font-bold text-xs uppercase transition-colors shrink-0"
              >
                View Compatible Parts &rarr;
              </Link>
            )}
            <Link
              href="/garage"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 font-mono text-xs font-semibold transition-colors shrink-0"
            >
              Change Vehicle
            </Link>
          </div>
        </div>

        {/* 2. Main Layout (8/12 Left Gallery & Specs, 4/12 Right Sticky Buy Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8/12 Span) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery & Exploded Diagram Viewer Container */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ZoomIn className="w-4 h-4" /> Technical Gallery & Interactive Schematics
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span>Mode:</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold uppercase",
                    selectedImage.isExplodedDiagram ? "bg-sky-950 text-sky-300 border border-sky-500" : "bg-slate-800 text-slate-200"
                  )}>
                    {selectedImage.isExplodedDiagram ? "Exploded Diagram Blueprint 📐" : "High-Res Photo 📸"}
                  </span>
                </div>
              </div>

              {/* Main Viewer Box */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                <img
                  src={selectedImage.imageUrl}
                  alt={part.title}
                  className="w-full h-full object-cover select-none transition-transform duration-500"
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
                          ? "bg-sky-500 text-slate-950 border-white scale-125 shadow-sky-500/60 ring-4 ring-sky-500/30"
                          : "bg-slate-900/90 text-sky-300 border-sky-400 hover:scale-110 hover:bg-sky-500 hover:text-slate-950 animate-bounce"
                      )}
                    >
                      {callout.calloutNumber}
                    </div>
                  );
                })}

                {/* Exploded Diagram Floating Tooltip Card */}
                {activeCallout && (
                  <div className="absolute top-4 left-4 z-30 max-w-sm p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-sky-500/60 shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-500 text-slate-950 uppercase">
                        Callout Pin {activeCallout.calloutNumber}
                      </span>
                      {activeCallout.subPartSku && (
                        <span className="font-mono text-xs text-sky-400">SKU: {activeCallout.subPartSku}</span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-white">{activeCallout.label}</h4>
                    {activeCallout.specs && (
                      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950/80 p-2.5 rounded border border-slate-800">
                        ⚙️ {activeCallout.specs}
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
                        "relative w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all shadow-md",
                        isSelected
                          ? img.isExplodedDiagram ? "border-sky-500 ring-2 ring-sky-500/40 scale-105" : "border-emerald-500 ring-2 ring-emerald-500/40 scale-105"
                          : "border-slate-800 opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                      {img.isExplodedDiagram && (
                        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-sky-950/90 text-sky-300 text-[9px] font-mono font-bold">
                          📐 Diagram
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Part Specifications Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Technical Specifications Table
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400 uppercase">OEM Part Number</span>
                  <span className="font-mono font-bold text-sm text-emerald-400">{part.oemPartNumber}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400 uppercase">Internal SKU</span>
                  <span className="font-mono font-bold text-sm text-slate-200">{part.sku}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400 uppercase">Manufacturer Brand</span>
                  <span className="font-semibold text-sm text-white">{part.brand}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400 uppercase">Part Grade / Condition</span>
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {part.grade.replace("_", " ")}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400 uppercase">Warehouse Bin Location</span>
                  <span className="font-mono font-bold text-sm text-sky-400">{part.warehouseBin} ({part.warehouseAisle})</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400 uppercase">Universal Fitment</span>
                  <span className="font-mono font-bold text-xs text-slate-300">{part.isUniversalFit ? "Yes (Universal)" : "No (Vehicle Specific)"}</span>
                </div>
              </div>

              {/* Dynamic Key-Value Specs */}
              {Object.keys(part.specifications).length > 0 && (
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wide">Detailed Engineering Specs</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(part.specifications).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400">{key}:</span>
                        <span className="font-mono font-semibold text-slate-200 text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Compatibility List Accordion */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden">
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-850 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Vehicle Compatibility Matrix
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                    {part.compatibilityList.length} Supported Platforms
                  </span>
                </div>
                {isAccordionOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {isAccordionOpen && (
                <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
                  <p className="text-xs text-slate-400">
                    This part SKU has been verified by factory service documentation to mount directly onto the following models without drilling or modification:
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-slate-200">
                    {part.compatibilityList.map((item, idx) => (
                      <li key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </span>
                        <span className="text-emerald-400 font-bold text-[11px]">Direct Bolt-On</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4/12 Sticky Buy Box) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
              {/* Brand & Title */}
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-slate-950 text-emerald-400 border border-slate-800 font-mono text-xs font-bold uppercase mb-2">
                  {part.brand}
                </span>
                <h1 className="text-xl font-bold text-white leading-snug">{part.title}</h1>
                <p className="text-xs font-mono text-slate-400 mt-2">OEM Reference: <strong className="text-slate-200">{part.oemPartNumber}</strong></p>
              </div>

              {/* Price & Stock */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">Total Price (Inc 7% VAT)</span>
                  <span className="font-mono font-black text-3xl text-emerald-400 tracking-tight">{formatTHB(part.price)}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/50">
                    ✅ In Stock ({part.stockQuantity})
                  </span>
                  <span className="block text-[11px] font-mono text-slate-400 mt-1">{part.warehouseBin} • {part.warehouseAisle}</span>
                </div>
              </div>

              {/* Fulfillment Selectors */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Select Fulfillment Method:</label>
                <div className="space-y-2.5">
                  <label
                    onClick={() => setFulfillmentType("EXPRESS_SHIPPING")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all",
                      fulfillmentType === "EXPRESS_SHIPPING"
                        ? "bg-slate-950 border-emerald-500 shadow-md ring-1 ring-emerald-500/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    )}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillmentType === "EXPRESS_SHIPPING"}
                      onChange={() => setFulfillmentType("EXPRESS_SHIPPING")}
                      className="mt-1 text-emerald-500 focus:ring-0 bg-slate-950 border-slate-700"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-emerald-400" /> Express Courier Shipping
                        </span>
                        <span className="font-mono text-emerald-400">+฿250.00</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Dispatched next morning via Kerry/DHL Express (1-2 Days).</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setFulfillmentType("INSTORE_PICKUP")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all",
                      fulfillmentType === "INSTORE_PICKUP"
                        ? "bg-slate-950 border-emerald-500 shadow-md ring-1 ring-emerald-500/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    )}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillmentType === "INSTORE_PICKUP"}
                      onChange={() => setFulfillmentType("INSTORE_PICKUP")}
                      className="mt-1 text-emerald-500 focus:ring-0 bg-slate-950 border-slate-700"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Warehouse className="w-4 h-4 text-sky-400" /> In-Store / Warehouse Hub Pickup
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">FREE (฿0.00)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Ready for collection at Bangna Hub within 120 minutes.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Quantity:</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(part.stockQuantity, quantity + 1))}
                      className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => handleAddToCart(false)}
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
                  >
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    <span>Add {quantity} to Cart</span>
                  </button>

                  <button
                    onClick={() => handleAddToCart(true)}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all"
                  >
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>Instant Checkout with PromptPay QR</span>
                  </button>
                </div>

                {isAddedToast && (
                  <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-mono text-center animate-in fade-in duration-200">
                    ✅ Part added to cart! Fitment verified against your garage.
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
