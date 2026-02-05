import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "./prisma/schema.prisma",

  // Prisma 7 migrate bắt buộc
  // TypeScript sẽ báo lỗi — kệ nó
  // @ts-ignore
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
