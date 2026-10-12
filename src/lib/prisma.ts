import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';

const DEFAULT_NEON_URL =
  'postgresql://neondb_owner:npg_28YzaBKeErCG@ep-late-cloud-b441qxop-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

const rawUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  DEFAULT_NEON_URL;

const cleanNeonUrl = rawUrl
  .replace('channel_binding=require&', '')
  .replace('&channel_binding=require', '');

export const neonSql = neon(cleanNeonUrl);

const databaseUrl =
  cleanNeonUrl.includes('-pooler') && !cleanNeonUrl.includes('pgbouncer=true')
    ? `${cleanNeonUrl}&pgbouncer=true&connect_timeout=15`
    : cleanNeonUrl;

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


