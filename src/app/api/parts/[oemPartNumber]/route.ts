import { NextRequest, NextResponse } from "next/server";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ oemPartNumber: string }> }
) {
  try {
    const { oemPartNumber } = await params;
    const decoded = decodeURIComponent(oemPartNumber);

    const part = MOCK_PARTS_CATALOG.find(
      (p) =>
        p.oemPartNumber.toLowerCase() === decoded.toLowerCase() ||
        p.sku.toLowerCase() === decoded.toLowerCase() ||
        p.id === decoded
    );

    if (!part) {
      return NextResponse.json(
        { error: `Part not found with OEM part number or ID: ${decoded}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      part,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error retrieving part details", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ oemPartNumber: string }> }
) {
  try {
    const { oemPartNumber } = await params;
    const decoded = decodeURIComponent(oemPartNumber);
    const body = await req.json();

    const partIndex = MOCK_PARTS_CATALOG.findIndex(
      (p) =>
        p.oemPartNumber.toLowerCase() === decoded.toLowerCase() ||
        p.sku.toLowerCase() === decoded.toLowerCase() ||
        p.id === decoded
    );

    if (partIndex === -1) {
      return NextResponse.json(
        { error: `Part not found with identifier: ${decoded}` },
        { status: 404 }
      );
    }

    // Update fields
    const updated = {
      ...MOCK_PARTS_CATALOG[partIndex],
      ...body,
    };
    MOCK_PARTS_CATALOG[partIndex] = updated;

    return NextResponse.json({
      success: true,
      message: `Part ${updated.oemPartNumber} successfully updated in warehouse database.`,
      part: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update part inventory", details: error.message },
      { status: 500 }
    );
  }
}
