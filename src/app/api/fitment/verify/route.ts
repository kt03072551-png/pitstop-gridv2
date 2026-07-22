import { NextRequest, NextResponse } from "next/server";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";
import { FitmentStatus } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { partNumberOrId, vehicle } = body;

    if (!partNumberOrId) {
      return NextResponse.json(
        { error: "Missing required field: partNumberOrId" },
        { status: 400 }
      );
    }

    const part = MOCK_PARTS_CATALOG.find(
      (p) =>
        p.id === partNumberOrId ||
        p.oemPartNumber.toLowerCase() === partNumberOrId.toLowerCase() ||
        p.sku.toLowerCase() === partNumberOrId.toLowerCase()
    );

    if (!part) {
      return NextResponse.json(
        { error: `Part not found with identifier: ${partNumberOrId}` },
        { status: 404 }
      );
    }

    // Check universal fitment first
    if (part.isUniversalFit) {
      return NextResponse.json({
        partId: part.id,
        oemPartNumber: part.oemPartNumber,
        title: part.title,
        status: "UNIVERSAL" as FitmentStatus,
        boltOnVerified: true,
        fitmentNotes: "Universal Fit Engine — Engineered to operate across all car & motorbike platforms.",
        requiredHardware: ["Standard mounting washers", "Torque wrench (refer to OEM manual)"],
      });
    }

    if (!vehicle || !vehicle.trimId) {
      return NextResponse.json({
        partId: part.id,
        oemPartNumber: part.oemPartNumber,
        title: part.title,
        status: "UNSELECTED" as FitmentStatus,
        boltOnVerified: false,
        fitmentNotes: "No active vehicle trim specified. Please select vehicle in My Garage to verify exact fitment.",
        requiredHardware: [],
      });
    }

    // Check exact trimId alignment
    const isCompatible = part.compatibleTrimIds?.includes(vehicle.trimId);

    if (isCompatible) {
      return NextResponse.json({
        partId: part.id,
        oemPartNumber: part.oemPartNumber,
        title: part.title,
        status: "FITS" as FitmentStatus,
        boltOnVerified: true,
        fitmentNotes: `100% Guaranteed Bolt-On for ${vehicle.year || "Selected"} ${vehicle.make || ""} ${vehicle.model || ""} (${vehicle.trim || vehicle.trimId}). Factory OEM mounting points verified.`,
        requiredHardware: part.specifications["Included Hardware"] ? [part.specifications["Included Hardware"]] : ["Factory OEM Bolts"],
      });
    } else {
      return NextResponse.json({
        partId: part.id,
        oemPartNumber: part.oemPartNumber,
        title: part.title,
        status: "INCOMPATIBLE" as FitmentStatus,
        boltOnVerified: false,
        fitmentNotes: `Warning: ${part.oemPartNumber} mounting flanges or thread pitch differ from ${vehicle.trim || vehicle.trimId} factory schematic. Incompatible part.`,
        requiredHardware: [],
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Fitment Engine Verification Error", details: error.message },
      { status: 500 }
    );
  }
}
