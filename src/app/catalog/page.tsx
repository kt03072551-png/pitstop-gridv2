"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Filter, 
  Search, 
  Car, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  X, 
  SlidersHorizontal,
  Warehouse,
  Sparkles,
  Loader2
} from "lucide-react";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";
import { useVehicleStore } from "@/store/useVehicleStore";
import { FitmentBadge } from "@/components/ui/FitmentBadge";
import { formatTHB, cn } from "@/lib/utils";
import { PartGrade } from "@/types";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "ALL";

  const { activeVehicle, checkFitment, setActiveVehicle } = useVehicleStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [fitmentFilter, setFitmentFilter] = useState<"ALL" | "FITS_ONLY" | "UNIVERSAL">("ALL");
  const [selectedGrades, setSelectedGrades] = useState<PartGrade[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc">("featured");

  const categories = [
    "ALL",
    "Engine & Drivetrain",
    "Exhaust Systems",
    "Braking & Suspension",
    "Body & Aero",
    "Electrical & Tuning",
  ];

  const grades: { label: string; value: PartGrade }[] = [
    { label: "OEM Genuine", value: "OEM_GENUINE" },
    { label: "Performance Spec", value: "PERFORMANCE" },
    { label: "Aftermarket Grade A", value: "AFTERMARKET" },
  ];

  const toggleGrade = (grade: PartGrade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const filteredParts = useMemo(() => {
    return MOCK_PARTS_CATALOG.filter((part) => {
      // Category filter
      if (selectedCategory !== "ALL" && !part.category.includes(selectedCategory)) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = part.title.toLowerCase().includes(query);
        const matchSku = part.sku.toLowerCase().includes(query);
        const matchOem = part.oemPartNumber.toLowerCase().includes(query);
        const matchBrand = part.brand.toLowerCase().includes(query);
        if (!matchTitle && !matchSku && !matchOem && !matchBrand) return false;
      }

      // Fitment filter
      const fitStatus = checkFitment(part);
      if (fitmentFilter === "FITS_ONLY") {
        if (fitStatus !== "FITS" && fitStatus !== "UNIVERSAL") return false;
      } else if (fitmentFilter === "UNIVERSAL") {
        if (fitStatus !== "UNIVERSAL") return false;
      }

      // Grade filter
      if (selectedGrades.length > 0 && !selectedGrades.includes(part.grade)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, fitmentFilter, selectedGrades, sortBy, checkFitment]);

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-emerald-400 text-sm animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Loading Catalog & Fitment Engine...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col py-8 px-4">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* 1. Active Fitment Header Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <Car className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider">
                  Active Fitment Engine Filter
                </span>
                {activeVehicle && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                    100% Synced
                  </span>
                )}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                {activeVehicle 
                  ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model} (${activeVehicle.trim})`
                  : "No Vehicle Selected — Showing All Universal & Model-Specific Catalog Parts"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            {activeVehicle && (
              <button
                onClick={() => setFitmentFilter(fitmentFilter === "FITS_ONLY" ? "ALL" : "FITS_ONLY")}
                className={cn(
                  "px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wide transition-all border flex items-center gap-2",
                  fitmentFilter === "FITS_ONLY"
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{fitmentFilter === "FITS_ONLY" ? "Filtering Fits Only ✅" : "Filter: Fits My Vehicle Only"}</span>
              </button>
            )}
            <Link
              href="/garage"
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono font-semibold transition-colors"
            >
              Change Vehicle
            </Link>
          </div>
        </div>

        {/* 2. Search & Main Controls */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-6 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shrink-0">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" /> Catalog Filters
              </span>
              {(selectedCategory !== "ALL" || fitmentFilter !== "ALL" || selectedGrades.length > 0 || searchQuery !== "") && (
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setFitmentFilter("ALL");
                    setSelectedGrades([]);
                    setSearchQuery("");
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-mono underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Search Box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-slate-400">Search Part / SKU / OEM</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. 15400-RTA or Spoon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Fitment Status Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-400">Compatibility Verification</label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setFitmentFilter("ALL")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between border",
                    fitmentFilter === "ALL"
                      ? "bg-slate-800 border-slate-700 text-white font-semibold"
                      : "border-transparent text-slate-400 hover:bg-slate-900"
                  )}
                >
                  <span>Show All Parts</span>
                  <span className="font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-400">{MOCK_PARTS_CATALOG.length}</span>
                </button>
                <button
                  onClick={() => setFitmentFilter("FITS_ONLY")}
                  disabled={!activeVehicle}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between border",
                    fitmentFilter === "FITS_ONLY"
                      ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-semibold"
                      : !activeVehicle
                      ? "opacity-40 cursor-not-allowed border-transparent text-slate-600"
                      : "border-transparent text-slate-400 hover:bg-slate-900"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fits Active Vehicle
                  </span>
                </button>
                <button
                  onClick={() => setFitmentFilter("UNIVERSAL")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between border",
                    fitmentFilter === "UNIVERSAL"
                      ? "bg-sky-950/80 border-sky-500 text-sky-300 font-semibold"
                      : "border-transparent text-slate-400 hover:bg-slate-900"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-sky-400" /> Universal Fit Only
                  </span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-400">Technical Category</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between",
                      selectedCategory === cat
                        ? "bg-emerald-500 text-slate-950 font-bold"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    )}
                  >
                    <span>{cat === "ALL" ? "All Categories" : cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-mono uppercase text-slate-400">Part Grade / Condition</label>
              <div className="space-y-2">
                {grades.map((g) => {
                  const isChecked = selectedGrades.includes(g.value);
                  return (
                    <label
                      key={g.value}
                      className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleGrade(g.value)}
                        className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>{g.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Warehouse Stock Notice */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
                <Warehouse className="w-4 h-4" />
                <span>Immediate Bin Picking</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All listed parts display physical warehouse bin coordinates (`Bin A12`, `Row 4`) ready for 2-hour Express Pickup.
              </p>
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1 space-y-6">
            {/* Top Sort & Count Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="font-mono text-xs text-slate-300">
                Showing <strong className="text-emerald-400 font-bold text-sm">{filteredParts.length}</strong> parts for{" "}
                <span className="text-white font-semibold">{selectedCategory === "ALL" ? "All Categories" : selectedCategory}</span>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-mono text-slate-400">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="featured">Featured / Stock Status</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredParts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl p-8 bg-slate-900/20 space-y-3">
                <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="font-mono text-lg font-bold text-white uppercase">No Compatible Parts Found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  We could not find items matching your filters or vehicle compatibility criteria (`{fitmentFilter}`). Try adjusting your grade selections or selecting `Show All Parts`.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setFitmentFilter("ALL");
                    setSelectedGrades([]);
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wide"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredParts.map((part) => {
                  const fitStatus = checkFitment(part);
                  return (
                    <div
                      key={part.id}
                      className="group flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-lg transition-all hover:shadow-2xl"
                    >
                      {/* Thumbnail & Badges */}
                      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden border-b border-slate-800">
                        <img
                          src={part.images[0]?.imageUrl}
                          alt={part.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <FitmentBadge status={fitStatus} size="sm" />
                        </div>
                        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded bg-slate-950/90 text-[10px] font-mono font-bold text-slate-300 border border-slate-800">
                            {part.brand}
                          </span>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-mono font-bold border",
                            part.grade === "OEM_GENUINE" && "bg-emerald-950 text-emerald-300 border-emerald-500/50",
                            part.grade === "PERFORMANCE" && "bg-amber-950 text-amber-300 border-amber-500/50",
                            part.grade === "AFTERMARKET" && "bg-sky-950 text-sky-300 border-sky-500/50"
                          )}>
                            {part.grade.replace("_", " ")}
                          </span>
                        </div>

                        {part.images.some((i) => i.isExplodedDiagram) && (
                          <div className="absolute bottom-3 right-3 z-10">
                            <span className="px-2 py-1 rounded bg-slate-900/95 text-sky-300 border border-sky-500/60 text-[10px] font-mono flex items-center gap-1.5 shadow-md">
                              📐 Exploded Blueprint
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                            <span>OEM: <strong className="text-slate-300">{part.oemPartNumber}</strong></span>
                            <span className="text-emerald-400 font-semibold">{part.warehouseBin}</span>
                          </div>
                          <Link
                            href={`/parts/${part.oemPartNumber}`}
                            className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug"
                          >
                            {part.title}
                          </Link>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {part.description}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <div>
                            <span className="block text-[10px] font-mono text-slate-500 uppercase">Price (Inc 7% VAT)</span>
                            <span className="font-mono font-black text-xl text-emerald-400">{formatTHB(part.price)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3 text-emerald-400 font-mono text-sm">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Loading Catalog & Fitment Matrix...</span>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
