"use client";

import React from "react";
import { Warehouse, CheckCircle2, Plus, Trash2, ShieldCheck, X, Car } from "lucide-react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { cn } from "@/lib/utils";

interface MyGarageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyGarageDrawer: React.FC<MyGarageDrawerProps> = ({ isOpen, onClose }) => {
  const { savedVehicles, activeVehicle, setActiveVehicle, setDefaultVehicle, removeVehicle } = useVehicleStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center">
              <Warehouse className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-mono text-base font-bold text-white uppercase tracking-tight">
                Smart Vehicle Garage
              </h2>
              <p className="text-xs text-slate-400">
                Switch vehicles to instantly filter 100% compatible parts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vehicles List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Saved Vehicles ({savedVehicles.length})
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> Fitment Synced
            </span>
          </div>

          {savedVehicles.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <Car className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-300">Your Garage is empty</p>
              <p className="text-xs text-slate-500 mt-1">
                Select your vehicle make, model, and year above to start verifying guaranteed fitment.
              </p>
            </div>
          ) : (
            savedVehicles.map((v) => {
              const isActive = activeVehicle?.id === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    setActiveVehicle(v);
                    setDefaultVehicle(v.id);
                  }}
                  className={cn(
                    "group relative p-4 rounded-xl border transition-all cursor-pointer shadow-md",
                    isActive
                      ? "bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500 shadow-emerald-950/40"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {v.year}
                        </span>
                        <span className="font-semibold text-sm text-white">{v.make} {v.model}</span>
                      </div>
                      <p className="text-xs font-mono text-emerald-400/90 mt-1 truncate font-medium">
                        {v.trim}
                      </p>
                      {v.nickname && (
                        <p className="text-[11px] text-slate-400 italic mt-1.5 flex items-center gap-1">
                          🏷️ &quot;{v.nickname}&quot; {v.vin && <span className="text-slate-500">| VIN: {v.vin.slice(0, 9)}...</span>}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-between gap-3">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-mono font-bold shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition-colors">
                          Click to activate &rarr;
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeVehicle(v.id);
                        }}
                        className="p-1.5 rounded bg-slate-800/80 hover:bg-rose-950 hover:text-rose-400 text-slate-500 border border-transparent hover:border-rose-500/50 transition-all opacity-80 group-hover:opacity-100"
                        title="Remove from garage"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/90 space-y-3">
          <a
            href="/garage"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-mono font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Manage Full Garage & VIN Lookup
          </a>
          <p className="text-center text-[11px] text-slate-500">
            Fitment compatibility verified by Pitstop OEM Matrix
          </p>
        </div>
      </div>
    </div>
  );
};
