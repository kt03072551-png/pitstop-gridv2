"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Warehouse, 
  Car, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  AlertCircle,
  Hash
} from "lucide-react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { MOCK_VEHICLE_MAKES, MOCK_VEHICLE_MODELS, MOCK_VEHICLE_TRIMS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function GaragePage() {
  const { savedVehicles, activeVehicle, setActiveVehicle, setDefaultVehicle, addVehicle, removeVehicle } = useVehicleStore();

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
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-emerald-400 text-sm animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Loading Garage Profiles...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shadow-lg">
              <Warehouse className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase font-bold text-emerald-400 tracking-wider">
                • Personal Vehicle Master
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight mt-0.5">
                Customer Garage & Fitment Profiles
              </h1>
            </div>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Vehicle Profile</span>
          </button>
        </div>

        {/* Add New Vehicle Form Modal/Card */}
        {isAdding && (
          <form onSubmit={handleAddVehicle} className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/60 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-mono font-bold text-base text-white uppercase flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-400" /> Register New Vehicle & Exact Engine Specs
              </h3>
              <button type="button" onClick={() => setIsAdding(false)} className="text-xs font-mono text-slate-400 hover:text-white">
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Make *</label>
                <select
                  required
                  value={make}
                  onChange={(e) => { setMake(e.target.value); setModel(""); setTrimId(""); }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500"
                >
                  <option value="">Select Make</option>
                  {MOCK_VEHICLE_MAKES.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Model *</label>
                <select
                  required
                  disabled={!make}
                  value={model}
                  onChange={(e) => { setModel(e.target.value); setTrimId(""); }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500 disabled:opacity-40"
                >
                  <option value="">Select Model</option>
                  {availableModels.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Year *</label>
                <select
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Engine / Trim Variant *</label>
                <select
                  required
                  disabled={!model}
                  value={trimId}
                  onChange={(e) => setTrimId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500 disabled:opacity-40"
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
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Garage Nickname</label>
                <input
                  type="text"
                  placeholder='e.g. "Track Day FL5"'
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">VIN (Optional for OEM Lookup)</label>
                <input
                  type="text"
                  placeholder="e.g. JHMFL5880PS001..."
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-emerald-500 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Modification Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Installed downpipe & Brembos"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wide shadow-lg"
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
                  "rounded-2xl border p-6 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500 shadow-emerald-950/30 ring-1 ring-emerald-500/50"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                )}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                )}

                {/* Top header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-950 text-slate-200 border border-slate-800">
                        {v.year}
                      </span>
                      <h3 className="font-mono font-bold text-lg text-white">
                        {v.make} {v.model}
                      </h3>
                    </div>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-mono font-bold shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active Filter
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveVehicle(v);
                          setDefaultVehicle(v.id);
                        }}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 font-mono text-xs transition-colors border border-slate-700"
                      >
                        Set Active
                      </button>
                    )}
                  </div>

                  <p className="font-mono text-xs font-semibold text-emerald-400 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                    ⚙️ {v.trim}
                  </p>

                  {v.nickname && (
                    <p className="text-xs text-slate-300 italic flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Nickname: &quot;{v.nickname}&quot;
                    </p>
                  )}

                  {v.vin && (
                    <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-sky-400" /> VIN: <span className="text-slate-300 uppercase">{v.vin}</span>
                    </p>
                  )}
                </div>

                {/* Maintenance & Parts Quick Log */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Recommended Maintenance Log
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <Link
                      href={`/catalog?category=Engine`}
                      className="p-2 rounded bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800/80 flex items-center justify-between transition-colors"
                    >
                      <span>🛢️ Oil Filters</span>
                      <span className="text-emerald-400">&rarr;</span>
                    </Link>
                    <Link
                      href={`/catalog?category=Braking`}
                      className="p-2 rounded bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800/80 flex items-center justify-between transition-colors"
                    >
                      <span>🛑 Brake Pads</span>
                      <span className="text-emerald-400">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 flex items-center justify-between border-t border-slate-800/60">
                  <Link
                    href="/catalog"
                    onClick={() => {
                      setActiveVehicle(v);
                      setDefaultVehicle(v.id);
                    }}
                    className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    Browse Compatible Parts &rarr;
                  </Link>

                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="p-1.5 rounded text-slate-500 hover:text-rose-400 transition-colors"
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
