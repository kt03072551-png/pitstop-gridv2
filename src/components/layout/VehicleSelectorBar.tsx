"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { Car, Check, ChevronRight, ShieldCheck, Sparkles, Filter } from "lucide-react";
import { MOCK_VEHICLE_MAKES, MOCK_VEHICLE_MODELS, MOCK_VEHICLE_TRIMS } from "@/lib/mock-data";
import { useVehicleStore } from "@/store/useVehicleStore";
import { cn } from "@/lib/utils";

export const VehicleSelectorBar: React.FC = () => {
  const router = useRouter();
  const { activeVehicle, setActiveVehicle, addVehicle, setDefaultVehicle } = useVehicleStore();

  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedTrim, setSelectedTrim] = useState<string>("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (activeVehicle) {
      setSelectedMake(activeVehicle.make.toLowerCase() || "");
      const modelObj = MOCK_VEHICLE_MODELS.find((m) => m.name === activeVehicle.model);
      if (modelObj) setSelectedModel(modelObj.id);
      if (activeVehicle.year) setSelectedYear(activeVehicle.year);
      if (activeVehicle.trimId) setSelectedTrim(activeVehicle.trimId);
    }
  }, [activeVehicle]);

  const availableModels = MOCK_VEHICLE_MODELS.filter((m) => m.makeId === selectedMake);
  const availableTrims = MOCK_VEHICLE_TRIMS.filter((t) => t.modelId === selectedModel);

  const yearsList = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

  const handleApplyFilter = () => {
    const makeObj = MOCK_VEHICLE_MAKES.find((m) => m.id === selectedMake);
    const modelObj = MOCK_VEHICLE_MODELS.find((m) => m.id === selectedModel);
    const trimObj = MOCK_VEHICLE_TRIMS.find((t) => t.id === selectedTrim);

    if (makeObj && modelObj && trimObj) {
      const newVehicle = {
        make: makeObj.name,
        model: modelObj.name,
        year: selectedYear,
        trim: trimObj.name,
        trimId: trimObj.id,
        nickname: `${makeObj.name} ${modelObj.name.split(" ")[0]}`,
      };

      addVehicle(newVehicle);
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 3000);
      router.push("/catalog");
    }
  };

  return (
    <div className="w-full bg-[#DBE2EF]/70 dark:bg-[#0F4C75]/70 border-y border-[#3F72AF]/20 dark:border-[#3282B8]/30 shadow-md py-4 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Title / Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#3F72AF]/40 dark:border-[#3282B8]/40 flex items-center justify-center shrink-0 shadow-inner">
            <Car className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#3F72AF] dark:text-[#3282B8] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Smart Fitment Selector
              </span>
              <span className="text-[10px] bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] px-1.5 py-0.5 rounded font-mono border border-[#DBE2EF] dark:border-[#0F4C75]">
                OEM Verified
              </span>
            </div>
            <p className="text-xs text-[#112D4E]/80 dark:text-[#BBE1FA]/80 mt-0.5 font-medium">
              Filter 10,000+ parts guaranteed to bolt-on to your exact vehicle
            </p>
          </div>
        </div>

        {/* 4-Step Dropdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full lg:w-auto flex-1 max-w-4xl">
          {/* Step 1: Make */}
          <div className="relative">
            <label className="block text-[10px] font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] mb-1 font-semibold">
              1. Make
            </label>
            <select
              value={selectedMake}
              onChange={(e) => {
                setSelectedMake(e.target.value);
                setSelectedModel("");
                setSelectedTrim("");
              }}
              className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl px-3 py-2 text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] focus:outline-none focus:border-[#3F72AF] dark:focus:border-[#3282B8] transition-colors cursor-pointer shadow-sm"
            >
              <option value="">Select Make</option>
              {MOCK_VEHICLE_MAKES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.type})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Model */}
          <div className="relative">
            <label className="block text-[10px] font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] mb-1 font-semibold">
              2. Model
            </label>
            <select
              value={selectedModel}
              disabled={!selectedMake}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSelectedTrim("");
              }}
              className={cn(
                "w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl px-3 py-2 text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] focus:outline-none focus:border-[#3F72AF] dark:focus:border-[#3282B8] transition-colors cursor-pointer shadow-sm",
                !selectedMake && "opacity-50 cursor-not-allowed"
              )}
            >
              <option value="">Select Model</option>
              {availableModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Year */}
          <div className="relative">
            <label className="block text-[10px] font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] mb-1 font-semibold">
              3. Year
            </label>
            <select
              value={selectedYear}
              disabled={!selectedModel}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className={cn(
                "w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl px-3 py-2 text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] focus:outline-none focus:border-[#3F72AF] dark:focus:border-[#3282B8] transition-colors cursor-pointer shadow-sm",
                !selectedModel && "opacity-50 cursor-not-allowed"
              )}
            >
              {yearsList.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Engine / Trim */}
          <div className="relative">
            <label className="block text-[10px] font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] mb-1 font-semibold">
              4. Engine / Trim
            </label>
            <select
              value={selectedTrim}
              disabled={!selectedModel}
              onChange={(e) => setSelectedTrim(e.target.value)}
              className={cn(
                "w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl px-3 py-2 text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] focus:outline-none focus:border-[#3F72AF] dark:focus:border-[#3282B8] transition-colors cursor-pointer shadow-sm",
                !selectedModel && "opacity-50 cursor-not-allowed"
              )}
            >
              <option value="">Select Engine/Trim</option>
              {availableTrims.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check Fitment & Save CTA */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
          <button
            onClick={handleApplyFilter}
            disabled={!selectedTrim}
            className={cn(
              "w-full lg:w-auto min-h-[44px] px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md",
              selectedTrim
                ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] hover:opacity-90 shadow-[#3F72AF]/20 dark:shadow-[#3282B8]/20 active:scale-[0.98]"
                : "bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E]/40 dark:text-[#BBE1FA]/40 cursor-not-allowed border border-[#DBE2EF] dark:border-[#0F4C75]"
            )}
          >
            {isSavedNotice ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Fitment Active!</span>
              </>
            ) : (
              <>
                <Filter className="w-4 h-4" />
                <span>Verify Parts Fitment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
