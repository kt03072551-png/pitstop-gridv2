import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL || "";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// These are the mock parts that are NOT yet in the database.
// We need their oemPartNumber and sku to match the mock-data.ts so the order
// resolution logic works correctly.

const MISSING_PARTS = [
  {
    sku: "HND-OF-003",
    oemPartNumber: "15400-RTA-003",
    title: "Honda Genuine OEM Engine Oil Filter Cartridge & O-Ring",
    brand: "Honda Genuine",
    categorySlug: "engine-drivetrain",
    categoryName: "Engine & Drivetrain",
    grade: "OEM_GENUINE" as const,
    price: 380,
    costPrice: 210,
    stockQuantity: 142,
    warehouseBin: "Bin A12",
    warehouseAisle: "Row 4",
    isUniversalFit: false,
    description:
      "Direct replacement OEM high-efficiency oil filter designed specifically for Honda K-Series, L-Series, and R-Series engines.",
    imageUrl:
      "https://images.unsplash.com/photo-1635843105058-2514ffc84433?auto=format&fit=crop&w=1200&q=80",
  },
  {
    sku: "BRM-GT-FL5-RED",
    oemPartNumber: "1N1.9032A",
    title: "Brembo GT 6-Piston Monoblock Big Brake Kit (380x34mm Slotted Rotors)",
    brand: "Brembo",
    categorySlug: "braking-suspension",
    categoryName: "Braking & Suspension",
    grade: "PERFORMANCE" as const,
    price: 139000,
    costPrice: 105000,
    stockQuantity: 6,
    warehouseBin: "Bin D14",
    warehouseAisle: "Row 3",
    isUniversalFit: false,
    description:
      "The ultimate track brake upgrade for the FL5 and FK8 Civic Type R.",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    sku: "AKR-TITAN-FL5",
    oemPartNumber: "S-H2R2-HAPT",
    title: "Akrapovič Evolution Line Full Titanium Cat-Back Exhaust with Carbon Tips",
    brand: "Akrapovič",
    categorySlug: "exhaust-systems",
    categoryName: "Exhaust Systems",
    grade: "PERFORMANCE" as const,
    price: 168000,
    costPrice: 129000,
    stockQuantity: 3,
    warehouseBin: "Bin B08",
    warehouseAisle: "Row 5",
    isUniversalFit: false,
    description:
      "Crafted in Slovenia from proprietary ultra-lightweight titanium alloys.",
    imageUrl:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    sku: "YAM-OIL-R15-V4",
    oemPartNumber: "5D7-E3440-00",
    title: "Yamaha Genuine OEM Engine Oil Filter Element for YZF-R15 & MT-15",
    brand: "Yamaha Genuine",
    categorySlug: "engine-drivetrain",
    categoryName: "Engine & Drivetrain",
    grade: "OEM_GENUINE" as const,
    price: 150,
    costPrice: 75,
    stockQuantity: 310,
    warehouseBin: "Bin A02",
    warehouseAisle: "Row 2",
    isUniversalFit: false,
    description:
      "Original Yamaha Genuine Parts (YGP) pleated paper cartridge oil filter.",
    imageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
  },
  {
    sku: "TYT-OIL-HILUX-1GD",
    oemPartNumber: "90915-YZZD2",
    title: "Toyota Genuine OEM Spin-On Oil Filter for 1GD / 2GD Diesel Engines",
    brand: "Toyota Genuine",
    categorySlug: "engine-drivetrain",
    categoryName: "Engine & Drivetrain",
    grade: "OEM_GENUINE" as const,
    price: 290,
    costPrice: 160,
    stockQuantity: 420,
    warehouseBin: "Bin A18",
    warehouseAisle: "Row 4",
    isUniversalFit: false,
    description:
      "Official Toyota Genuine Parts spin-on oil filter for 2.8L 1GD-FTV and 2.4L 2GD-FTV engines.",
    imageUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
  },
];

async function main() {
  for (const part of MISSING_PARTS) {
    // Check if it already exists
    const existing = await prisma.part.findFirst({
      where: {
        OR: [{ sku: part.sku }, { oemPartNumber: part.oemPartNumber }],
      },
    });

    if (existing) {
      console.log(`✓ Already exists: ${part.sku} (${part.title})`);
      continue;
    }

    // Ensure category exists
    let category = await prisma.partCategory.findFirst({
      where: { slug: part.categorySlug },
    });

    if (!category) {
      category = await prisma.partCategory.create({
        data: {
          name: part.categoryName,
          slug: part.categorySlug,
        },
      });
      console.log(`  Created category: ${part.categoryName}`);
    }

    // Create the part
    const created = await prisma.part.create({
      data: {
        sku: part.sku,
        oemPartNumber: part.oemPartNumber,
        title: part.title,
        brand: part.brand,
        categoryId: category.id,
        grade: part.grade,
        price: part.price,
        costPrice: part.costPrice,
        stockQuantity: part.stockQuantity,
        warehouseBin: part.warehouseBin,
        warehouseAisle: part.warehouseAisle,
        isUniversalFit: part.isUniversalFit,
        description: part.description,
        images: {
          create: {
            s3Key: `parts/${part.sku.toLowerCase()}.jpg`,
            imageUrl: part.imageUrl,
            isPrimary: true,
            isExplodedDiagram: false,
          },
        },
      },
    });

    console.log(`✓ Seeded: ${created.sku} → ${created.id}`);
  }

  console.log("\nDone! All mock parts are now in the database.");
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
