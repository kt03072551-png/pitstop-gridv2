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
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

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
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm animate-pulse flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-ping" />
          Loading Catalog & Fitment Engine...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex flex-col py-8 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* 1. Active Fitment Header Banner */}
        <div className="p-5 rounded-2xl bg-[#DBE2EF]/70 dark:bg-[#0F4C75]/70 border border-[#3F72AF]/20 dark:border-[#3282B8]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors duration-200">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-center shrink-0 shadow-inner">
              <Car className="w-6 h-6 text-[#3F72AF] dark:text-[#3282B8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase text-[#3F72AF] dark:text-[#3282B8] font-bold tracking-wider">
                  Active Fitment Engine Filter
                </span>
                {activeVehicle && (
                  <span className="text-[10px] bg-[#112D4E] dark:bg-[#BBE1FA] text-white dark:text-[#1B262C] border border-[#3F72AF] dark:border-[#3282B8] px-2.5 py-0.5 rounded font-mono font-bold">
                    100% Synced
                  </span>
                )}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#112D4E] dark:text-[#BBE1FA] tracking-tight mt-0.5">
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
                  "px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wide transition-all border flex items-center gap-2 min-h-[44px]",
                  fitmentFilter === "FITS_ONLY"
                    ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] border-[#3F72AF] shadow-md shadow-[#3F72AF]/20"
                    : "bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF]"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{fitmentFilter === "FITS_ONLY" ? "Filtering Fits Only ✅" : "Filter: Fits My Vehicle Only"}</span>
              </button>
            )}
            <Link
              href="/garage"
              className="px-4 py-2 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] hover:border-[#3F72AF] dark:hover:border-[#3282B8] border border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E] dark:text-[#BBE1FA] text-xs font-mono font-bold transition-colors min-h-[44px] flex items-center justify-center"
            >
              Change Vehicle
            </Link>
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-3">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold text-xs"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
              {isMobileFiltersOpen ? "Hide Filters" : "Show Filters & Search"}
            </span>
            <span>{isMobileFiltersOpen ? "▲" : "▼"}</span>
          </button>
        </div>

        {/* 2. Search & Main Controls */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar Filters */}
          <aside className={cn(
            "w-full lg:w-72 space-y-6 bg-[#DBE2EF]/50 dark:bg-[#0F4C75]/50 border border-[#DBE2EF] dark:border-[#0F4C75] p-5 rounded-2xl shrink-0 transition-all",
            !isMobileFiltersOpen && "hidden lg:block"
          )}>
            <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-3">
              <span className="font-mono text-xs font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> Catalog Filters
              </span>
              {(selectedCategory !== "ALL" || fitmentFilter !== "ALL" || selectedGrades.length > 0 || searchQuery !== "") && (
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setFitmentFilter("ALL");
                    setSelectedGrades([]);
                    setSearchQuery("");
                  }}
                  className="text-xs text-rose-500 hover:text-rose-400 font-mono underline font-bold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Search Box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">Search Part / SKU / OEM</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8] absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. 15400-RTA or Spoon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] placeholder:text-[#112D4E]/40 dark:placeholder:text-[#85B5D9]/50 focus:outline-none focus:border-[#3F72AF] dark:focus:border-[#3282B8] transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Fitment Status Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">Compatibility Verification</label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setFitmentFilter("ALL")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border min-h-[40px]",
                    fitmentFilter === "ALL"
                      ? "bg-[#3F72AF] dark:bg-[#3282B8] border-[#3F72AF] text-white dark:text-[#1B262C] font-bold shadow-sm"
                      : "border-transparent text-[#112D4E]/80 dark:text-[#BBE1FA]/80 hover:bg-[#F9F7F7] dark:hover:bg-[#1B262C]"
                  )}
                >
                  <span>Show All Parts</span>
                  <span className="font-mono text-[10px] bg-[#F9F7F7] dark:bg-[#1B262C] px-1.5 py-0.5 rounded text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75] font-bold">{MOCK_PARTS_CATALOG.length}</span>
                </button>
                <button
                  onClick={() => setFitmentFilter("FITS_ONLY")}
                  disabled={!activeVehicle}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border min-h-[40px]",
                    fitmentFilter === "FITS_ONLY"
                      ? "bg-[#3F72AF]/20 dark:bg-[#3282B8]/30 border-[#3F72AF] dark:border-[#3282B8] text-[#3F72AF] dark:text-[#3282B8] font-bold shadow-sm"
                      : !activeVehicle
                      ? "opacity-50 cursor-not-allowed border-transparent text-[#112D4E]/40 dark:text-[#85B5D9]/40"
                      : "border-transparent text-[#112D4E]/80 dark:text-[#BBE1FA]/80 hover:bg-[#F9F7F7] dark:hover:bg-[#1B262C]"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#3282B8]" /> Fits Active Vehicle
                  </span>
                </button>
                <button
                  onClick={() => setFitmentFilter("UNIVERSAL")}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border min-h-[40px]",
                    fitmentFilter === "UNIVERSAL"
                      ? "bg-[#3F72AF]/20 dark:bg-[#3282B8]/30 border-[#3F72AF] dark:border-[#3282B8] text-[#3F72AF] dark:text-[#3282B8] font-bold shadow-sm"
                      : "border-transparent text-[#112D4E]/80 dark:text-[#BBE1FA]/80 hover:bg-[#F9F7F7] dark:hover:bg-[#1B262C]"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#3282B8]" /> Universal Fit Only
                  </span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">Technical Category</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between min-h-[38px]",
                      selectedCategory === cat
                        ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] font-bold shadow-sm"
                        : "text-[#112D4E]/80 dark:text-[#BBE1FA]/80 hover:bg-[#F9F7F7] dark:hover:bg-[#1B262C]"
                    )}
                  >
                    <span>{cat === "ALL" ? "All Categories" : cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-[#DBE2EF] dark:border-[#0F4C75]">
              <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">Part Grade / Condition</label>
              <div className="space-y-2.5">
                {grades.map((g) => {
                  const isChecked = selectedGrades.includes(g.value);
                  return (
                    <label
                      key={g.value}
                      className="flex items-center gap-2.5 text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] cursor-pointer select-none min-h-[28px]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleGrade(g.value)}
                        className="w-4 h-4 rounded border-[#DBE2EF] dark:border-[#0F4C75] bg-[#F9F7F7] dark:bg-[#1B262C] text-[#3F72AF] dark:text-[#3282B8] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>{g.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Warehouse Stock Notice */}
            <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] space-y-1.5 text-xs text-[#112D4E]/70 dark:text-[#85B5D9] shadow-inner">
              <div className="flex items-center gap-1.5 text-[#3F72AF] dark:text-[#3282B8] font-mono font-bold">
                <Warehouse className="w-4 h-4" />
                <span>Immediate Bin Picking</span>
              </div>
              <p className="text-[11px] leading-relaxed font-medium">
                All listed parts display physical warehouse bin coordinates (`Bin A12`, `Row 4`) ready for 2-hour Express Pickup.
              </p>
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1 space-y-6">
            {/* Top Sort & Count Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#DBE2EF] dark:border-[#0F4C75]">
              <div className="font-mono text-xs text-[#112D4E]/80 dark:text-[#BBE1FA]/80">
                Showing <strong className="text-[#3F72AF] dark:text-[#3282B8] font-bold text-sm">{filteredParts.length}</strong> parts for{" "}
                <span className="text-[#112D4E] dark:text-white font-bold">{selectedCategory === "ALL" ? "All Categories" : selectedCategory}</span>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] font-semibold">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="min-h-[40px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] focus:outline-none focus:border-[#3F72AF] dark:focus:border-[#3282B8] cursor-pointer shadow-sm"
                >
                  <option value="featured">Featured / Stock Status</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredParts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[#DBE2EF] dark:border-[#0F4C75] rounded-2xl p-8 bg-[#DBE2EF]/30 dark:bg-[#0F4C75]/30 space-y-3">
                <AlertTriangle className="w-12 h-12 text-[#3F72AF] dark:text-[#3282B8] mx-auto" />
                <h3 className="font-mono text-lg font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase">No Compatible Parts Found</h3>
                <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] max-w-md mx-auto font-medium">
                  We could not find items matching your filters or vehicle compatibility criteria (`{fitmentFilter}`). Try adjusting your grade selections or selecting `Show All Parts`.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setFitmentFilter("ALL");
                    setSelectedGrades([]);
                    setSearchQuery("");
                  }}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wide shadow-md hover:opacity-90 transition-all"
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
                      className="group flex flex-col justify-between rounded-2xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF] dark:hover:border-[#3282B8] overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5"
                    >
                      {/* Thumbnail & Badges */}
                      <div className="relative aspect-[16/10] bg-[#F9F7F7] dark:bg-[#1B262C] overflow-hidden border-b border-[#DBE2EF] dark:border-[#0F4C75]">
                        <img
                          src={part.images[0]?.imageUrl}
                          alt={part.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <FitmentBadge status={fitStatus} size="sm" />
                        </div>
                        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded bg-[#F9F7F7]/90 dark:bg-[#1B262C]/90 text-[10px] font-mono font-bold text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75]">
                            {part.brand}
                          </span>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-mono font-bold border shadow-sm",
                            part.grade === "OEM_GENUINE" && "bg-[#3F72AF] text-white border-[#3F72AF]",
                            part.grade === "PERFORMANCE" && "bg-amber-500 text-slate-950 border-amber-400",
                            part.grade === "AFTERMARKET" && "bg-sky-600 text-white border-sky-500"
                          )}>
                            {part.grade.replace("_", " ")}
                          </span>
                        </div>

                        {part.images.some((i) => i.isExplodedDiagram) && (
                          <div className="absolute bottom-3 right-3 z-10">
                            <span className="px-2 py-1 rounded bg-[#3F72AF] text-white text-[10px] font-mono flex items-center gap-1.5 shadow-md font-bold">
                              📐 Exploded Blueprint
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-[#112D4E]/60 dark:text-[#85B5D9] font-semibold">
                            <span>OEM: <strong className="text-[#112D4E] dark:text-white">{part.oemPartNumber}</strong></span>
                            <span className="text-[#3F72AF] dark:text-[#3282B8] font-bold">{part.warehouseBin}</span>
                          </div>
                          <Link
                            href={`/parts/${part.oemPartNumber}`}
                            className="font-bold text-base text-[#112D4E] dark:text-[#BBE1FA] group-hover:text-[#3F72AF] dark:group-hover:text-[#3282B8] transition-colors line-clamp-2 leading-snug"
                          >
                            {part.title}
                          </Link>
                          <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] line-clamp-2 leading-relaxed font-medium">
                            {part.description}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-4 border-t border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-between">
                          <div>
                            <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase font-semibold">Price (Inc 7% VAT)</span>
                            <span className="font-mono font-black text-xl text-[#3F72AF] dark:text-[#3282B8]">{formatTHB(part.price)}</span>
                          </div>
                          <Link
                            href={`/parts/${part.oemPartNumber}`}
                            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs flex items-center justify-center shadow-sm transition-all"
                          >
                            Inspect Part
                          </Link>
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
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3 text-[#3F72AF] dark:text-[#3282B8] font-mono text-sm font-bold">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Loading Catalog & Fitment Matrix...</span>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
