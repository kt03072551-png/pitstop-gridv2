import { defineConfig } from "@prisma/config";
import "dotenv/config"; // เพื่อให้แน่ใจว่าอ่านไฟล์ .env ได้แน่นอน

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});