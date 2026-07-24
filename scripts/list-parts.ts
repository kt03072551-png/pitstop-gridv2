import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL || "";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const parts = await prisma.part.findMany({
    select: { id: true, sku: true, oemPartNumber: true, title: true },
  });
  console.log("Parts in DB:", JSON.stringify(parts, null, 2));
  console.log("Total parts:", parts.length);
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
