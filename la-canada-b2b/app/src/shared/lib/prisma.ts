import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma singleton to prevent multiple connections in development.
 * Updated for Prisma 7 with PostgreSQL Driver Adapter.
 * Designed to fall back to dummy credentials gracefully so frontend demo
 * runs flawlessly even without a database.
 */
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL || "postgresql://dummy_user:dummy_password@localhost:5432/dummy_db";

  if (!process.env.DATABASE_URL) {
    console.warn("[Prisma] DATABASE_URL is not defined. Using dummy client configuration for frontend-only preview mode.");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
