"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { 
  Warehouse, 
  Car, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Sparkles, 
  Hash,
  Settings,
  Droplets,
  Disc
} from "lucide-react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useTranslation } from "@/lib/i18n/translations";
import { MOCK_VEHICLE_MAKES, MOCK_VEHICLE_MODELS, MOCK_VEHICLE_TRIMS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function GaragePage() {
  const { savedVehicles, activeVehicle, setActiveVehicle, setDefaultVehicle, addVehicle, removeVehicle } = useVehicleStore();
  const { t } = useTranslation();

  const [isAdding, setIsAdding] = useState(false);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2023);
  const [trimId, setTrimId] = useState("");
  const [nickname, setNickname] = useState("");
  const [vin, setVin] = useState("");
  const [notes, setNotes] = useState("");

  const availableModels = MOCK_VEHICLE_MODELS.filter((m) => m.makeId === make);
  const availableTrims = MOCK_VEHICLE_TRIMS.filter((t) => t.modelId === model);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const makeObj = MOCK_VEHICLE_MAKES.find((m) => m.id === make);
    const modelObj = MOCK_VEHICLE_MODELS.find((m) => m.id === model);
    const trimObj = MOCK_VEHICLE_TRIMS.find((t) => t.id === trimId);

    if (makeObj && modelObj && trimObj) {
      addVehicle({
        make: makeObj.name,
        model: modelObj.name,
        year: Number(year),
        trim: trimObj.name,
        trimId: trimObj.id,
        nickname: nickname || `${makeObj.name} ${modelObj.name.split(" ")[0]}`,
        vin: vin || undefined,
      });
      setIsAdding(false);
      setMake("");
      setModel("");
      setTrimId("");
      setNickname("");
      setVin("");
      setNotes("");
    }
  };

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm animate-pulse flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-ping" />
          Loading Garage Profiles...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-10 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shadow-md">
              <Warehouse className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase font-bold text-[#3F72AF] dark:text-[#3282B8] tracking-wider">
                • Personal Vehicle Master
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight mt-0.5">
                {t.garage.title}
              </h1>
              <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] mt-0.5 font-medium">
                {t.garage.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="min-h-[44px] px-6 py-3 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t.garage.addVehicle}</span>
          </button>
        </div>

        {/* Add New Vehicle Form Modal/Card */}
        {isAdding && (
          <form onSubmit={handleAddVehicle} className="p-6 rounded-2xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#3F72AF] dark:border-[#3282B8] shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-3">
              <h3 className="font-mono font-bold text-base text-[#112D4E] dark:text-[#BBE1FA] uppercase flex items-center gap-2">
                <Car className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8]" /> Register New Vehicle & Exact Engine Specs
              </h3>
              <button type="button" onClick={() => setIsAdding(false)} className="text-xs font-mono font-bold text-[#112D4E]/70 dark:text-[#85B5D9] hover:text-rose-500 min-h-[36px] flex items-center">
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">Make *</label>
                <select
                  required
                  value={make}
                  onChange={(e) => { setMake(e.target.value); setModel(""); setTrimId(""); }}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-3 text-xs font-medium text-[#112D4E] dark:text-white focus:border-[#3F72AF] focus:outline-none"
                >
                  <option value="">Select Make</option>
                  {MOCK_VEHICLE_MAKES.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">Model *</label>
                <select
                  required
                  disabled={!make}
                  value={model}
                  onChange={(e) => { setModel(e.target.value); setTrimId(""); }}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-3 text-xs font-medium text-[#112D4E] dark:text-white focus:border-[#3F72AF] focus:outline-none disabled:opacity-40"
                >
                  <option value="">Select Model</option>
                  {availableModels.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">Year *</label>
                <select
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-3 text-xs font-medium text-[#112D4E] dark:text-white focus:border-[#3F72AF] focus:outline-none"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">Engine / Trim Variant *</label>
                <select
                  required
                  disabled={!model}
                  value={trimId}
                  onChange={(e) => setTrimId(e.target.value)}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-3 text-xs font-medium text-[#112D4E] dark:text-white focus:border-[#3F72AF] focus:outline-none disabled:opacity-40"
                >
                  <option value="">Select Exact Engine</option>
                  {availableTrims.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">Garage Nickname</label>
                <input
                  type="text"
                  placeholder='e.g. "Track Day FL5"'
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-3 text-xs font-medium text-[#112D4E] dark:text-white focus:border-[#3F72AF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">VIN (Optional for OEM Lookup)</label>
                <input
                  type="text"
                  placeholder="e.g. JHMFL5880PS001..."
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-3 text-xs font-mono uppercase font-medium text-[#112D4E] dark:text-white focus:border-[#3F72AF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">Modification Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Installed downpipe & Brembos"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full min-h-[44px] bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-3 text-xs font-medium text-[#112D4E] dark:text-white focus:border-[#3F72AF] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="min-h-[46px] px-6 py-3 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wide shadow-md transition-all"
              >
                Save Vehicle & Activate Fitment Matrix
              </button>
            </div>
          </form>
        )}

        {/* Saved Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVehicles.map((v) => {
            const isActive = activeVehicle?.id === v.id;
            return (
              <div
                key={v.id}
                className={cn(
                  "rounded-2xl border p-6 transition-all flex flex-col justify-between space-y-6 shadow-md relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-b from-[#3F72AF]/15 via-[#DBE2EF] to-[#DBE2EF] dark:from-[#3282B8]/25 dark:via-[#0F4C75] dark:to-[#0F4C75] border-[#3F72AF] dark:border-[#3282B8] ring-2 ring-[#3F72AF]/40 dark:ring-[#3282B8]/40"
                    : "bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF]"
                )}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#3F72AF]/10 dark:bg-[#3282B8]/10 rounded-full blur-3xl pointer-events-none" />
                )}

                {/* Top header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-white border border-[#DBE2EF] dark:border-[#0F4C75]">
                        {v.year}
                      </span>
                      <h3 className="font-mono font-bold text-lg text-[#112D4E] dark:text-[#BBE1FA]">
                        {v.make} {v.model}
                      </h3>
                    </div>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] text-xs font-mono font-bold shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.garage.activeBadge}
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveVehicle(v);
                          setDefaultVehicle(v.id);
                        }}
                        className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold text-xs transition-colors border border-[#DBE2EF] dark:border-[#0F4C75]"
                      >
                        {t.garage.activateBtn}
                      </button>
                    )}
                  </div>

                  <span className="font-mono text-sm text-[#112D4E] dark:text-[#BBE1FA] bg-[#F9F7F7] dark:bg-[#1B262C] px-2 py-0.5 rounded border border-[#DBE2EF] dark:border-[#0F4C75] flex items-center">
                    <Settings className="w-3.5 h-3.5 mr-1" /> {v.trim}
                  </span>

                  {v.nickname && (
                    <p className="text-xs text-[#112D4E]/80 dark:text-[#85B5D9] italic flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Nickname: &quot;{v.nickname}&quot;
                    </p>
                  )}

                  {v.vin && (
                    <p className="text-[11px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#3282B8]" /> VIN: <span className="text-[#112D4E] dark:text-white uppercase font-bold">{v.vin}</span>
                    </p>
                  )}
                </div>

                {/* Maintenance & Parts Quick Log */}
                <div className="space-y-3 pt-4 border-t border-[#DBE2EF] dark:border-[#0F4C75]">
                  <span className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#112D4E]/70 dark:text-[#85B5D9]">
                    Recommended Maintenance Log
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                    <Link
                      href={`/catalog?category=Engine`}
                      className="min-h-[40px] p-2.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center"><Droplets className="w-3.5 h-3.5 mr-1" /> Oil Filters</span>
                      <span className="text-[#3F72AF] dark:text-[#3282B8]">&rarr;</span>
                    </Link>
                    <Link
                      href={`/catalog?category=Braking`}
                      className="min-h-[40px] p-2.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] border border-[#DBE2EF] dark:border-[#0F4C75] flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center"><Disc className="w-3.5 h-3.5 mr-1" /> Brake Pads</span>
                      <span className="text-[#3F72AF] dark:text-[#3282B8]">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 flex items-center justify-between border-t border-[#DBE2EF] dark:border-[#0F4C75]">
                  <Link
                    href="/catalog"
                    onClick={() => {
                      setActiveVehicle(v);
                      setDefaultVehicle(v.id);
                    }}
                    className="min-h-[40px] flex items-center text-xs font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] hover:underline"
                  >
                    Browse Compatible Parts &rarr;
                  </Link>

                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:text-rose-500 transition-colors hover:bg-rose-500/10"
                    title="Delete vehicle profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
