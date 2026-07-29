"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "@/i18n/routing";
import { Car, Check, Sparkles, Filter } from "lucide-react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/translations";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface MakeType { id: string; name: string; type: string; }
interface ModelType { id: string; makeId: string; name: string; generation: string | null; startYear: number; endYear: number | null; }
interface TrimType { id: string; modelId: string; name: string; engineCode: string | null; horsepower: number | null; fuelType: string | null; }

export const VehicleSelectorBar: React.FC = () => {
  const router = useRouter();
  const { activeVehicle, addVehicle } = useVehicleStore();
  const { t } = useTranslation();
  
  const { data, isLoading } = useSWR("/api/vehicles", fetcher);

  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedTrim, setSelectedTrim] = useState<string>("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const makes: MakeType[] = useMemo(() => data?.makes || [], [data?.makes]);
  const models: ModelType[] = useMemo(() => data?.models || [], [data?.models]);
  const trims: TrimType[] = useMemo(() => data?.trims || [], [data?.trims]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (activeVehicle && makes.length > 0) {
      // Find matching make in dynamic data
      const makeObj = makes.find((m) => m.name.toLowerCase() === activeVehicle.make.toLowerCase());
      if (makeObj) setSelectedMake(makeObj.id);
      
      const modelObj = models.find((m) => m.name === activeVehicle.model);
      if (modelObj) setSelectedModel(modelObj.id);
      
      if (activeVehicle.year) setSelectedYear(activeVehicle.year);
      if (activeVehicle.trimId) setSelectedTrim(activeVehicle.trimId);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [activeVehicle, makes, models]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const availableModels = models.filter((m: any) => m.makeId === selectedMake);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const availableTrims = trims.filter((tr: any) => tr.modelId === selectedModel);

  const yearsList = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

  const handleApplyFilter = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const makeObj = makes.find((m: any) => m.id === selectedMake);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelObj = models.find((m: any) => m.id === selectedModel);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const trimObj = trims.find((tr: any) => tr.id === selectedTrim);

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

  if (isLoading) return null;

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
                <Sparkles className="w-3.5 h-3.5" /> {t.vehicleSelector.title}
              </span>
              <span className="text-[10px] bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] px-1.5 py-0.5 rounded font-mono border border-[#DBE2EF] dark:border-[#0F4C75]">
                {t.vehicleSelector.oemVerified}
              </span>
            </div>
            <p className="text-xs text-[#112D4E]/80 dark:text-[#BBE1FA]/80 mt-0.5 font-medium hidden sm:block">
              {t.vehicleSelector.description}
            </p>
          </div>
        </div>

        {/* 4-Step Dropdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 w-full lg:w-auto flex-1 max-w-4xl">
          {/* Step 1: Make */}
          <div className="relative">
            <label className="block text-[10px] font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] mb-1 font-semibold">
              {t.vehicleSelector.stepMake}
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
              <option value="">{t.vehicleSelector.selectMake}</option>
              {makes.map((m: MakeType) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.type})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Model */}
          <div className="relative">
            <label className="block text-[10px] font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] mb-1 font-semibold">
              {t.vehicleSelector.stepModel}
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
              <option value="">{t.vehicleSelector.selectModel}</option>
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
              {t.vehicleSelector.stepYear}
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
              {t.vehicleSelector.stepTrim}
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
              <option value="">{t.vehicleSelector.selectTrim}</option>
              {availableTrims.map((trim) => (
                <option key={trim.id} value={trim.id}>
                  {trim.name}
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
                <span>{t.vehicleSelector.fitmentActive}</span>
              </>
            ) : (
              <>
                <Filter className="w-4 h-4" />
                <span>{t.vehicleSelector.verifyFitment}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
