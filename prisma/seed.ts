import { PrismaClient, Role, VehicleType, PartGrade, FulfillmentType, OrderStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/pitstop_grid";

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding for Pitstop Grid v2...");

  // Hash passwords with bcrypt (cost factor 10)
  const adminHash = await bcrypt.hash("admin1234", 10);
  const sellerHash = await bcrypt.hash("seller1234", 10);
  const customerHash = await bcrypt.hash("customer1234", 10);

  // 1. Create Users
  const admin = await prisma.user.upsert({
    where: { email: "admin@pitstopgrid.co.th" },
    update: {},
    create: {
      email: "admin@pitstopgrid.co.th",
      name: "Master Warehouse Controller",
      passwordHash: adminHash,
      role: Role.ADMIN,
      phone: "02-889-1928",
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: "seller@pitstopgrid.co.th" },
    update: {},
    create: {
      email: "seller@pitstopgrid.co.th",
      name: "Spoon Sports Authorized Dealer",
      passwordHash: sellerHash,
      role: Role.SELLER,
      phone: "081-992-8812",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "somchai@gmail.com" },
    update: {},
    create: {
      email: "somchai@gmail.com",
      name: "Somchai Kiatikun",
      passwordHash: customerHash,
      role: Role.CUSTOMER,
      phone: "089-112-3344",
    },
  });

  console.log("✅ Users seeded:", { admin: admin.email, seller: seller.email, customer: customer.email });

  // 2. Create Vehicle Makes, Models & Trims
  const hondaMake = await prisma.vehicleMake.upsert({
    where: { name: "Honda" },
    update: {},
    create: { name: "Honda", type: VehicleType.CAR },
  });

  const yamahaMake = await prisma.vehicleMake.upsert({
    where: { name: "Yamaha" },
    update: {},
    create: { name: "Yamaha", type: VehicleType.MOTORBIKE },
  });

  const civicModel = await prisma.vehicleModel.upsert({
    where: { id: "model_civic_fl5" },
    update: {},
    create: {
      id: "model_civic_fl5",
      name: "Civic Type R (FL5)",
      generation: "11th Gen FL5",
      startYear: 2022,
      endYear: 2026,
      makeId: hondaMake.id,
    },
  });

  const r15Model = await prisma.vehicleModel.upsert({
    where: { id: "model_yzf_r15" },
    update: {},
    create: {
      id: "model_yzf_r15",
      name: "YZF-R15 V3/V4",
      generation: "V3/V4",
      startYear: 2019,
      endYear: 2026,
      makeId: yamahaMake.id,
    },
  });

  const fl5Trim = await prisma.vehicleTrim.upsert({
    where: { id: "trim_fl5_20t" },
    update: {},
    create: {
      id: "trim_fl5_20t",
      name: "2.0T VTEC Turbo Type R (315 HP)",
      engineCode: "K20C1",
      horsepower: 315,
      fuelType: "Petrol (95+ Octane)",
      modelId: civicModel.id,
    },
  });

  const r15Trim = await prisma.vehicleTrim.upsert({
    where: { id: "trim_r15_155vva" },
    update: {},
    create: {
      id: "trim_r15_155vva",
      name: "155cc VVA Liquid Cooled (18.4 HP)",
      engineCode: "G3J5E",
      horsepower: 18.4,
      fuelType: "Petrol",
      modelId: r15Model.id,
    },
  });

  console.log("✅ Vehicle Matrix seeded:", { fl5: fl5Trim.name, r15: r15Trim.name });

  // 3. Create Part Categories
  const aeroCat = await prisma.partCategory.upsert({
    where: { slug: "body-aero" },
    update: {},
    create: { name: "Body & Aero", slug: "body-aero", iconName: "Wind" },
  });

  const engineCat = await prisma.partCategory.upsert({
    where: { slug: "engine-drivetrain" },
    update: {},
    create: { name: "Engine & Drivetrain", slug: "engine-drivetrain", iconName: "Cpu" },
  });

  // 4. Create Parts with Exploded Diagram Schematics
  const spoonHood = await prisma.part.upsert({
    where: { sku: "SPN-FL5-AERO-HD" },
    update: {},
    create: {
      sku: "SPN-FL5-AERO-HD",
      oemPartNumber: "60100-FL5-000",
      title: "Spoon Sports Dry Carbon Fiber Vented Hood for FL5 Type R",
      brand: "Spoon Sports",
      categoryId: aeroCat.id,
      grade: PartGrade.PERFORMANCE,
      price: 84500,
      costPrice: 62000,
      stockQuantity: 4,
      warehouseBin: "Bin E01",
      warehouseAisle: "Aisle 8",
      isUniversalFit: false,
      description: "Authentic Spoon Sports Japan aerospace-grade autoclave dry carbon fiber hood designed specifically for the 11th-Gen Honda Civic Type R (FL5). Saves -6.4 kg over factory hood.",
      specifications: {
        "Material Composition": "Pre-preg 3K Twill Dry Carbon Fiber",
        "Weight": "6.8 kg (OEM Aluminum: 13.2 kg)",
        "Mounting Points": "Direct bolt-on utilizing factory hinges",
      },
      images: {
        create: [
          {
            s3Key: "catalog/spoon-hood-1.jpg",
            imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
            isPrimary: true,
            isExplodedDiagram: false,
          },
          {
            s3Key: "diagrams/spoon-hood-exploded.jpg",
            imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
            isPrimary: false,
            isExplodedDiagram: true,
          },
        ],
      },
    },
  });

  const diagramImg = await prisma.partImage.findFirst({
    where: { partId: spoonHood.id, isExplodedDiagram: true },
  });

  if (diagramImg) {
    await prisma.explodedDiagramCallout.createMany({
      data: [
        { partId: spoonHood.id, diagramImageId: diagramImg.id, calloutNumber: "#1", label: "NACA Air Box Duct Channel", subPartSku: "SPN-DUCT-FL5", xCoord: 30, yCoord: 40 },
        { partId: spoonHood.id, diagramImageId: diagramImg.id, calloutNumber: "#2", label: "Central Heat Extraction Louvers", subPartSku: "SPN-LOUV-FL5", xCoord: 50, yCoord: 48 },
      ],
    });
  }

  // Link Spoon Hood to FL5 Trim compatibility
  await prisma.partFitmentMapping.upsert({
    where: { id: "map-spoon-fl5" },
    update: {},
    create: {
      id: "map-spoon-fl5",
      partId: spoonHood.id,
      vehicleTrimId: fl5Trim.id,
      yearStart: 2022,
      yearEnd: 2026,
      fitmentNotes: "Direct Bolt-On OEM Spec without modification.",
      requiresModification: false,
    },
  });

  const motulOil = await prisma.part.upsert({
    where: { sku: "MTL-300V-5W30" },
    update: {},
    create: {
      sku: "MTL-300V-5W30",
      oemPartNumber: "MOTUL-300V-4L",
      title: "Motul 300V Power 5W-30 ESTER Core® Synthetic Engine Oil (4 Liter Can)",
      brand: "Motul",
      categoryId: engineCat.id,
      grade: PartGrade.PERFORMANCE,
      price: 3890,
      costPrice: 2800,
      stockQuantity: 68,
      warehouseBin: "Bin C04",
      warehouseAisle: "Row 1",
      isUniversalFit: true,
      description: "Motul 300V Power 5W-30 formulation using 100% Synthetic ESTER Core® Technology. Formulated exclusively for high-output turbocharged track builds and endurance racing.",
      images: {
        create: [
          {
            s3Key: "catalog/motul-300v.jpg",
            imageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1200&q=80",
            isPrimary: true,
            isExplodedDiagram: false,
          },
        ],
      },
    },
  });

  console.log("✅ Catalog & Compatibility Matrix seeded:", { spoonHood: spoonHood.sku, motulOil: motulOil.sku });

  // 5. Create Sample Order & Slip Audit Record
  const sampleOrder = await prisma.order.upsert({
    where: { orderNumber: "ORD-20260723-00992" },
    update: {},
    create: {
      orderNumber: "ORD-20260723-00992",
      userId: customer.id,
      subtotal: 84500,
      vatAmount: 5915,
      shippingFee: 0,
      totalAmount: 84500,
      status: OrderStatus.VERIFYING_SLIP,
      fulfillmentType: FulfillmentType.INSTORE_PICKUP,
      pickupBranchId: "Bangna Hub (Main)",
      paymentSlipUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
      promptPayRef: "0149823901239",
      ocrVerifiedAmount: 84500,
      items: {
        create: [
          {
            partId: spoonHood.id,
            quantity: 1,
            unitPrice: 84500,
            totalPrice: 84500,
          },
        ],
      },
    },
  });

  console.log("✅ Sample Order seeded:", { orderNumber: sampleOrder.orderNumber, status: sampleOrder.status });
  console.log("🌱 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
