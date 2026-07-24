"use client";

import React from "react";
import { Warehouse, CheckCircle2, Plus, Trash2, ShieldCheck, X, Car, Tag } from "lucide-react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Link } from "@/i18n/routing";
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
      <div className="relative w-full max-w-md bg-[#F9F7F7] dark:bg-[#1B262C] border-l border-[#DBE2EF] dark:border-[#0F4C75] shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/80 dark:bg-[#0F4C75]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3F72AF]/20 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-center">
              <Warehouse className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
            </div>
            <div>
              <h2 className="font-mono text-base font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
                Smart Vehicle Garage
              </h2>
              <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9]">
                Switch vehicles to instantly filter 100% compatible parts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#F9F7F7]/80 dark:bg-[#1B262C]/80 text-[#112D4E] dark:text-[#BBE1FA] hover:bg-[#3F72AF] hover:text-white dark:hover:bg-[#3282B8] dark:hover:text-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vehicles List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-[#112D4E]/70 dark:text-[#85B5D9] uppercase tracking-wider">
              Saved Vehicles ({savedVehicles.length})
            </span>
            <span className="text-xs text-[#3F72AF] dark:text-[#3282B8] flex items-center gap-1 font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Fitment Synced
            </span>
          </div>

          {savedVehicles.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-6 bg-[#DBE2EF]/30 dark:bg-[#0F4C75]/30">
              <Car className="w-10 h-10 text-[#3F72AF] dark:text-[#3282B8] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA]">Your Garage is empty</p>
              <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] mt-1">
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
                      ? "bg-[#DBE2EF] dark:bg-[#0F4C75] border-[#3F72AF] dark:border-[#3282B8] shadow-lg shadow-[#3F72AF]/10"
                      : "bg-[#F9F7F7]/80 dark:bg-[#1B262C]/80 border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF] dark:hover:border-[#3282B8]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#3F72AF]/10 dark:bg-[#3282B8]/20 text-[#3F72AF] dark:text-[#3282B8] border border-[#3F72AF]/30 dark:border-[#3282B8]/30">
                          {v.year}
                        </span>
                        <span className="font-bold text-sm text-[#112D4E] dark:text-[#BBE1FA]">{v.make} {v.model}</span>
                      </div>
                      <p className="text-xs font-mono text-[#3F72AF] dark:text-[#3282B8] mt-1 truncate font-semibold">
                        {v.trim}
                      </p>
                      {v.nickname && (
                        <p className="text-[11px] text-[#112D4E]/60 dark:text-[#85B5D9] italic mt-1.5 flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 mr-1" /> &quot;{v.nickname}&quot; {v.vin && <span className="text-[#112D4E]/50 dark:text-[#85B5D9]/70">| VIN: {v.vin.slice(0, 9)}...</span>}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-between gap-3">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3F72AF]/20 dark:bg-[#3282B8]/30 border border-[#3F72AF] dark:border-[#3282B8] text-[#3F72AF] dark:text-[#3282B8] text-xs font-mono font-bold shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-xs text-[#112D4E]/60 dark:text-[#85B5D9] font-mono group-hover:text-[#3F72AF] dark:group-hover:text-[#3282B8] transition-colors font-medium">
                          Click to activate &rarr;
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeVehicle(v.id);
                        }}
                        className="p-1.5 rounded bg-[#DBE2EF] dark:bg-[#0F4C75] hover:bg-rose-500 hover:text-white text-[#112D4E]/60 dark:text-[#85B5D9] border border-transparent hover:border-rose-500 transition-all opacity-80 group-hover:opacity-100"
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
        <div className="p-5 border-t border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/80 dark:bg-[#0F4C75]/80 space-y-3">
          <Link
            href="/garage"
            onClick={onClose}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-sm tracking-wide shadow-md transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Manage Full Garage & VIN Lookup
          </Link>
          <p className="text-center text-[11px] text-[#112D4E]/70 dark:text-[#85B5D9]">
            Fitment compatibility verified by Pitstop OEM Matrix
          </p>
        </div>
      </div>
    </div>
  );
};
