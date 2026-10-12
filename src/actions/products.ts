'use server';

import { prisma } from '@/lib/prisma';
import { ProductType, ProductCategory, ProductCondition } from '@/types';
import { trackEvent } from './analytics';

export interface ProductFilters {
  category?: ProductCategory;
  condition?: ProductCondition | 'ALL';
  query?: string;
  sortBy?: 'featured' | 'price_asc' | 'price_desc' | 'newest';
  sessionId?: string;
  trafficSource?: string;
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductType[]> {
  try {
    const where: any = {};

    if (filters.category && filters.category !== 'all') {
      where.category = filters.category;
    }

    if (filters.condition && filters.condition !== 'ALL') {
      where.condition = filters.condition;
    }

    const searchQuery = filters.query?.trim();
    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { category: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = [{ isFeatured: 'desc' }, { createdAt: 'desc' }];
    if (filters.sortBy === 'price_asc') {
      orderBy = { basePrice: 'asc' };
    } else if (filters.sortBy === 'price_desc') {
      orderBy = { basePrice: 'desc' };
    } else if (filters.sortBy === 'newest') {
      orderBy = { createdAt: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: {
          orderBy: { priceDelta: 'asc' },
        },
      },
      orderBy,
    });

    // Zero-Result & Search Event Tracking
    if (searchQuery && filters.sessionId) {
      const hasResults = products.length > 0;
      await trackEvent({
        eventType: 'SEARCH',
        searchQuery,
        hasResults,
        sessionId: filters.sessionId,
        trafficSource: filters.trafficSource || 'Direct',
      });
    }

    return products as unknown as ProductType[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
  sessionId?: string,
  trafficSource?: string
): Promise<ProductType | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          orderBy: { priceDelta: 'asc' },
        },
      },
    });

    if (!product) return null;

    // Track product view
    if (sessionId) {
      await trackEvent({
        eventType: 'PRODUCT_VIEW',
        productId: product.id,
        productTitle: product.title,
        sessionId,
        trafficSource: trafficSource || 'Direct',
      });
    }

    return product as unknown as ProductType;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
}

export async function createProduct(formData: {
  title: string;
  category: string;
  basePrice: number;
  salePrice?: number | null;
  condition: ProductCondition;
  batteryHealth?: number | null;
  description: string;
  specs: Record<string, any>;
  warrantyInfo: string;
  images: string[];
  isFeatured?: boolean;
  stock?: number;
  variants?: Array<{
    colorName: string;
    colorHex: string;
    storageOption: string;
    ramOption?: string;
    priceDelta?: number;
    serialNumber?: string;
    stock?: number;
  }>;
}) {
  try {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);

    const product = await prisma.product.create({
      data: {
        title: formData.title,
        slug,
        category: formData.category,
        basePrice: formData.basePrice,
        salePrice: formData.salePrice || null,
        condition: formData.condition,
        batteryHealth: formData.batteryHealth || null,
        description: formData.description,
        specs: formData.specs,
        warrantyInfo: formData.warrantyInfo || '1-Year Salem Comprehensive Warranty',
        images: formData.images,
        isFeatured: formData.isFeatured || false,
        stock: formData.stock || 1,
        variants: {
          create: formData.variants?.map((v) => ({
            colorName: v.colorName,
            colorHex: v.colorHex,
            storageOption: v.storageOption,
            ramOption: v.ramOption || null,
            priceDelta: v.priceDelta || 0,
            serialNumber: v.serialNumber || null,
            stock: v.stock || 1,
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    return { success: true, product };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message || 'Failed to create product' };
  }
}

export async function updateProduct(
  id: string,
  data: Partial<{
    title: string;
    basePrice: number;
    salePrice: number | null;
    condition: ProductCondition;
    batteryHealth: number | null;
    stock: number;
    isFeatured: boolean;
  }>
) {
  try {
    const updated = await prisma.product.update({
      where: { id },
      data,
    });
    return { success: true, product: updated };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
}
