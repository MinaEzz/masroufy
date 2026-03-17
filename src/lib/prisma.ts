/**
 * lib/prisma.ts
 * Singleton PrismaClient instance for Next.js.
 *
 * في بيئة التطوير، يمنع إعادة إنشاء PrismaClient مع كل Hot Reload.
 * في بيئة الإنتاج، يوجد instance واحد طوال دورة حياة التطبيق.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
