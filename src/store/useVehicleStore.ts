import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FitmentStatus, PartItem, SavedVehicle } from "@/types";
import { MOCK_SAVED_VEHICLES } from "@/lib/mock-data";

interface VehicleStore {
  savedVehicles: SavedVehicle[];
  activeVehicle: SavedVehicle | null;
  setActiveVehicle: (vehicle: SavedVehicle | null) => void;
  addVehicle: (vehicle: Omit<SavedVehicle, "id">) => void;
  removeVehicle: (id: string) => void;
  setDefaultVehicle: (id: string) => void;
  checkFitment: (part: PartItem) => FitmentStatus;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get) => ({
      savedVehicles: MOCK_SAVED_VEHICLES,
      activeVehicle: MOCK_SAVED_VEHICLES.find((v) => v.isDefault) || MOCK_SAVED_VEHICLES[0] || null,

      setActiveVehicle: (vehicle) => set({ activeVehicle: vehicle }),

      addVehicle: (newVehicle) => {
        const id = `garage-${Date.now()}`;
        const created: SavedVehicle = { ...newVehicle, id, isDefault: false };
        set((state) => ({
          savedVehicles: [...state.savedVehicles, created],
          activeVehicle: state.activeVehicle || created,
        }));
      },

      removeVehicle: (id) =>
        set((state) => {
          const filtered = state.savedVehicles.filter((v) => v.id !== id);
          return {
            savedVehicles: filtered,
            activeVehicle: state.activeVehicle?.id === id ? filtered[0] || null : state.activeVehicle,
          };
        }),

      setDefaultVehicle: (id) =>
        set((state) => {
          const updated = state.savedVehicles.map((v) => ({
            ...v,
            isDefault: v.id === id,
          }));
          const newDefault = updated.find((v) => v.isDefault) || null;
          return {
            savedVehicles: updated,
            activeVehicle: newDefault,
          };
        }),

      checkFitment: (part: PartItem): FitmentStatus => {
        if (part.isUniversalFit) return "UNIVERSAL";
        const { activeVehicle } = get();
        if (!activeVehicle) return "UNSELECTED";
        if (part.compatibleTrimIds.includes(activeVehicle.trimId)) {
          return "FITS";
        }
        return "INCOMPATIBLE";
      },
    }),
    {
      name: "pitstop-garage-storage",
    }
  )
);
