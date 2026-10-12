import { PrismaClient } from '@prisma/client';

const DEFAULT_NEON_URL =
  'postgresql://neondb_owner:npg_28YzaBKeErCG@ep-late-cloud-b441qxop-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15';

const rawUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  DEFAULT_NEON_URL;

// Ensure pooled Neon connections work reliably with Prisma on serverless
const databaseUrl = rawUrl.includes('-pooler') && !rawUrl.includes('pgbouncer=true')
  ? `${rawUrl.replace('channel_binding=require&', '').replace('&channel_binding=require', '')}&pgbouncer=true&connect_timeout=15`
  : rawUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

globalForPrisma.prisma = prisma;

