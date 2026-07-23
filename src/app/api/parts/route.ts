import { NextRequest, NextResponse } from "next/server";
import { MOCK_PARTS_CATALOG } from "@/lib/mock-data";
import { PartItem, PartGrade } from "@/types";

let inMemoryCatalog = [...MOCK_PARTS_CATALOG];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const grade = searchParams.get("grade") as PartGrade | null;
    const search = searchParams.get("search");
    const trimId = searchParams.get("trimId");

    let results = [...inMemoryCatalog];

    if (category && category !== "ALL") {
      results = results.filter((p) => p.category.includes(category));
    }

    if (grade) {
      results = results.filter((p) => p.grade === grade);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.oemPartNumber.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (trimId) {
      results = results.filter(
        (p) => p.isUniversalFit || p.compatibleTrimIds?.includes(trimId)
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      parts: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve parts catalog", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      oemPartNumber,
      sku,
      brand,
      title,
      description,
      descriptionTh,
      price,
      grade = "OEM_GENUINE",
      category,
      warehouseBin,
      warehouseAisle,
      stockQuantity = 10,
      isUniversalFit = false,
      compatibleTrimIds = [],
      specifications = {},
      images = [],
    } = body;

    if (!oemPartNumber || !title || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields: oemPartNumber, title, price, category" },
        { status: 400 }
      );
    }

    const newPart: PartItem = {
      id: `part_${Date.now()}`,
      oemPartNumber,
      sku: sku || `SKU-${oemPartNumber}`,
      brand: brand || "Genuine OEM",
      title,
      description: description || "Verified factory part with exact fitment.",
      descriptionTh,
      price: Number(price),
      grade: grade as PartGrade,
      category,
      warehouseBin: warehouseBin || "Bin A01-1",
      warehouseAisle: warehouseAisle || "Aisle A",
      stockQuantity: Number(stockQuantity),
      isUniversalFit: Boolean(isUniversalFit),
      compatibleTrimIds: Array.isArray(compatibleTrimIds) ? compatibleTrimIds : [],
      specifications,
      images: images.length > 0 ? images : [
        {
          id: `img_${Date.now()}`,
          imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
          isPrimary: true,
          isExplodedDiagram: false,
        }
      ],
      compatibilityList: isUniversalFit ? ["All Vehicles (Universal)"] : ["OEM Spec Compatible"],
    };

    inMemoryCatalog.push(newPart);

    return NextResponse.json(
      {
        success: true,
        message: `Part ${oemPartNumber} successfully listed and assigned to ${newPart.warehouseBin}`,
        part: newPart,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create part listing", details: error.message },
      { status: 500 }
    );
  }
}
