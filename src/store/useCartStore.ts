import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, FitmentStatus, PartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  fulfillmentType: "EXPRESS_SHIPPING" | "INSTORE_PICKUP";
  pickupBranch: string;
  setFulfillmentType: (type: "EXPRESS_SHIPPING" | "INSTORE_PICKUP") => void;
  setPickupBranch: (branch: string) => void;
  addItem: (part: PartItem, quantity: number, fitmentStatus: FitmentStatus, vehicleTrimId?: string) => void;
  removeItem: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getVatAmount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          part: {
            id: "part-1",
            sku: "HND-OF-003",
            oemPartNumber: "15400-RTA-003",
            title: "Honda Genuine OEM Engine Oil Filter Cartridge & O-Ring",
            brand: "Honda Genuine",
            category: "Engine & Drivetrain",
            grade: "OEM_GENUINE",
            price: 380,
            stockQuantity: 142,
            warehouseBin: "Bin A12",
            warehouseAisle: "Row 4",
            isUniversalFit: false,
            description: "Direct replacement OEM high-efficiency oil filter.",
            specifications: {},
            compatibilityList: [],
            compatibleTrimIds: ["trim-fl5-20t"],
            images: [{ id: "1", imageUrl: "https://images.unsplash.com/photo-1635843105058-2514ffc84433?auto=format&fit=crop&w=1200&q=80", isPrimary: true, isExplodedDiagram: false }],
          },
          quantity: 1,
          selectedVehicleTrimId: "trim-fl5-20t",
          fitmentStatusAtAdd: "FITS",
        },
      ],
      fulfillmentType: "EXPRESS_SHIPPING",
      pickupBranch: "Bangna Hub Warehouse (Ready in 2 Hours)",

      setFulfillmentType: (type) => set({ fulfillmentType: type }),
      setPickupBranch: (branch) => set({ pickupBranch: branch }),

      addItem: (part, quantity, fitmentStatus, vehicleTrimId) =>
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.part.id === part.id);
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated };
          }
          return {
            items: [...state.items, { part, quantity, fitmentStatusAtAdd: fitmentStatus, selectedVehicleTrimId: vehicleTrimId }],
          };
        }),

      removeItem: (partId) =>
        set((state) => ({
          items: state.items.filter((item) => item.part.id !== partId),
        })),

      updateQuantity: (partId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.part.id !== partId) };
          }
          return {
            items: state.items.map((item) =>
              item.part.id === partId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.part.price * item.quantity, 0);
      },

      getShippingFee: () => {
        const { items, fulfillmentType } = get();
        if (items.length === 0) return 0;
        if (fulfillmentType === "INSTORE_PICKUP") return 0;
        return 250; // Express Courier Flat Rate
      },

      getVatAmount: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.07; // 7% Thai VAT included in calculations
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingFee();
      },
    }),
    {
      name: "pitstop-shopping-cart",
    }
  )
);
