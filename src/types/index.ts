export type VehicleType = "CAR" | "MOTORBIKE";

export type PartGrade = "OEM_GENUINE" | "AFTERMARKET" | "PERFORMANCE";

export type FitmentStatus = "FITS" | "INCOMPATIBLE" | "UNIVERSAL" | "UNSELECTED";

export interface VehicleMake {
  id: string;
  name: string;
  type: VehicleType;
  logoUrl?: string;
}

export interface VehicleModel {
  id: string;
  makeId: string;
  name: string;
  generation?: string;
  startYear: number;
  endYear?: number;
}

export interface VehicleTrim {
  id: string;
  modelId: string;
  name: string; // e.g. "2.0T VTEC Turbo Type R"
  engineCode?: string; // e.g. "K20C1"
  horsepower?: number;
  fuelType?: string;
  fullDisplayName?: string; // e.g. "2023 Honda Civic Type R (FL5) 2.0T"
}

export interface SavedVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  trimId: string;
  nickname?: string;
  vin?: string;
  isDefault?: boolean;
}

export interface ExplodedCallout {
  calloutNumber: string; // e.g. "#2"
  label: string;
  subPartSku?: string;
  xCoord: number; // percentage 0-100
  yCoord: number; // percentage 0-100
  specs?: string;
}

export interface PartImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  isExplodedDiagram: boolean;
  callouts?: ExplodedCallout[];
}

export interface FitmentMapping {
  vehicleModelId?: string;
  vehicleTrimId?: string;
  yearStart: number;
  yearEnd?: number;
  fitmentNotes?: string;
  requiresModification?: boolean;
}

export interface PartItem {
  id: string;
  sku: string;
  oemPartNumber: string;
  title: string;
  brand: string;
  category: string;
  grade: PartGrade;
  price: number;
  costPrice?: number;
  stockQuantity: number;
  warehouseBin: string;
  warehouseAisle: string;
  isUniversalFit: boolean;
  description: string;
  specifications: Record<string, string>;
  compatibilityList: string[]; // Human readable models e.g. "Honda Civic (FL5, FK8)"
  compatibleTrimIds: string[]; // Exact trim IDs for fast matching
  images: PartImage[];
}

export interface CartItem {
  part: PartItem;
  quantity: number;
  selectedVehicleTrimId?: string;
  fitmentStatusAtAdd: FitmentStatus;
}

export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}
