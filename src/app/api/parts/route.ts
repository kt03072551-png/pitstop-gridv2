import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PartGrade } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryName = searchParams.get("category");
    const grade = searchParams.get("grade") as PartGrade | null;
    const search = searchParams.get("search");
    const trimId = searchParams.get("trimId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    if (categoryName && categoryName !== "ALL") {
      whereClause.category = { name: categoryName };
    }

    if (grade) {
      whereClause.grade = grade;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { oemPartNumber: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (trimId) {
      whereClause.OR = [
        ...(whereClause.OR || []),
        { isUniversalFit: true },
        { compatibilityMappings: { some: { vehicleTrimId: trimId } } }
      ];
    }

    const parts = await prisma.part.findMany({
      where: whereClause,
      include: {
        category: true,
        images: {
          orderBy: { displayOrder: 'asc' }
        },
        compatibilityMappings: true
      }
    });

    // Format parts to match the frontend expectations (PartItem interface)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedParts = parts.map((p: any) => ({
      id: p.id,
      sku: p.sku,
      oemPartNumber: p.oemPartNumber,
      title: p.title,
      brand: p.brand,
      category: p.category.name,
      grade: p.grade,
      price: Number(p.price),
      stockQuantity: p.stockQuantity,
      warehouseBin: p.warehouseBin || "",
      warehouseAisle: p.warehouseAisle || "",
      isUniversalFit: p.isUniversalFit,
      description: p.description || "",
      descriptionTh: "",
      specifications: p.specifications || {},
      images: p.images.length > 0 ? p.images : [{
        id: `img_fallback_${p.id}`,
        imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
        isPrimary: true,
        isExplodedDiagram: false
      }],
      compatibilityList: p.isUniversalFit ? ["All Vehicles (Universal)"] : ["OEM Spec Compatible"],
      compatibleTrimIds: p.compatibilityMappings.map((m: { vehicleTrimId: string }) => m.vehicleTrimId).filter(Boolean)
    }));

    return NextResponse.json({
      success: true,
      count: formattedParts.length,
      parts: formattedParts,
    });
  } catch (error: unknown) {
    console.error("GET Parts Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve parts catalog", details: error instanceof Error ? error.message : "Unknown error" },
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
      price,
      grade = "OEM_GENUINE",
      category, // e.g. "Engine & Drivetrain"
      warehouseBin,
      warehouseAisle,
      stockQuantity = 10,
      isUniversalFit = false,
      specifications = {},
      image = "",
    } = body;

    if (!oemPartNumber || !title || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields: oemPartNumber, title, price, category" },
        { status: 400 }
      );
    }

    // Find or create the category based on the name from the frontend
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let partCategory = await prisma.partCategory.findUnique({ where: { slug } });
    
    if (!partCategory) {
      partCategory = await prisma.partCategory.create({
        data: {
          name: category,
          slug,
        }
      });
    }

    const newPart = await prisma.part.create({
      data: {
        oemPartNumber,
        sku: sku || `SKU-${oemPartNumber}`,
        brand: brand || "Genuine OEM",
        title,
        description: description || "Verified factory part with exact fitment.",
        price: Number(price),
        grade: grade as PartGrade,
        categoryId: partCategory.id,
        warehouseBin: warehouseBin || "Bin A01-1",
        warehouseAisle: warehouseAisle || "Aisle A",
        stockQuantity: Number(stockQuantity),
        isUniversalFit: Boolean(isUniversalFit),
        specifications: specifications,
        images: {
          create: [{
            s3Key: `catalog/${oemPartNumber}.jpg`,
            imageUrl: image || "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
            isPrimary: true,
          }]
        }
      },
      include: {
        category: true,
        images: true
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: `Part ${oemPartNumber} successfully listed and assigned to ${newPart.warehouseBin}`,
        part: newPart,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST Parts Error:", error);
    return NextResponse.json(
      { error: "Failed to create part listing", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
