import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ oemPartNumber: string }> }
) {
  try {
    const { oemPartNumber } = await params;
    const decoded = decodeURIComponent(oemPartNumber);

    const part = await prisma.part.findFirst({
      where: {
        OR: [
          { oemPartNumber: { equals: decoded, mode: 'insensitive' } },
          { sku: { equals: decoded, mode: 'insensitive' } },
          { id: decoded }
        ]
      },
      include: {
        category: true,
        images: {
          orderBy: { displayOrder: 'asc' }
        },
        compatibilityMappings: true,
        diagramCallouts: true
      }
    });

    if (!part) {
      return NextResponse.json(
        { error: `Part not found with OEM part number or ID: ${decoded}` },
        { status: 404 }
      );
    }


    const formattedPart = {
      id: part.id,
      sku: part.sku,
      oemPartNumber: part.oemPartNumber,
      title: part.title,
      brand: part.brand,
      category: part.category.name,
      grade: part.grade,
      price: Number(part.price),
      stockQuantity: part.stockQuantity,
      warehouseBin: part.warehouseBin || "",
      warehouseAisle: part.warehouseAisle || "",
      isUniversalFit: part.isUniversalFit,
      description: part.description || "",
      descriptionTh: "",
      specifications: part.specifications || {},
      images: part.images.length > 0 ? part.images : [{
        id: `img_fallback_${part.id}`,
        imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
        isPrimary: true,
        isExplodedDiagram: false
      }],
      compatibilityList: part.isUniversalFit ? ["All Vehicles (Universal)"] : ["OEM Spec Compatible"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      compatibleTrimIds: part.compatibilityMappings.map((m: any) => m.vehicleTrimId).filter(Boolean)
    };

    return NextResponse.json({
      success: true,
      part: formattedPart,
    });
  } catch (error: unknown) {
    console.error("GET Single Part Error:", error);
    return NextResponse.json(
      { error: "Error retrieving part details", details: error instanceof Error ? error.message : "Unknown error" },
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

    const part = await prisma.part.findFirst({
      where: {
        OR: [
          { oemPartNumber: { equals: decoded, mode: 'insensitive' } },
          { sku: { equals: decoded, mode: 'insensitive' } },
          { id: decoded }
        ]
      }
    });

    if (!part) {
      return NextResponse.json(
        { error: `Part not found with identifier: ${decoded}` },
        { status: 404 }
      );
    }

    const updatedPart = await prisma.part.update({
      where: { id: part.id },
      data: {
        stockQuantity: body.stockQuantity !== undefined ? Number(body.stockQuantity) : part.stockQuantity,
        price: body.price !== undefined ? Number(body.price) : part.price,
      }
    });

    return NextResponse.json({
      success: true,
      message: `Part ${decoded} updated`,
      part: updatedPart,
    });
  } catch (error: unknown) {
    console.error("PATCH Single Part Error:", error);
    return NextResponse.json(
      { error: "Failed to update part", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
