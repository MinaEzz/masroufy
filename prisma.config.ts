/**
 * prisma.config.ts
 * مصروفي — Prisma 7 configuration file.
 * في Prisma 7، يجب تعريف مسار الـ Schema وعنوان الاتصال هنا.
 */
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
});
