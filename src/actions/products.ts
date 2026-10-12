'use server';

import { prisma, neonSql } from '@/lib/prisma';
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
    const [rawProducts, rawVariants] = await Promise.all([
      neonSql`SELECT * FROM "Product"`,
      neonSql`SELECT * FROM "ProductVariant" ORDER BY "priceDelta" ASC`,
    ]);

    let products = rawProducts.map((p: any) => ({
      ...p,
      variants: rawVariants.filter((v: any) => v.productId === p.id),
    }));

    if (filters.category && filters.category !== 'all') {
      products = products.filter(
        (p: any) => p.category?.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.condition && filters.condition !== 'ALL') {
      products = products.filter((p: any) => p.condition === filters.condition);
    }

    const searchQuery = filters.query?.trim().toLowerCase();
    if (searchQuery) {
      products = products.filter(
        (p: any) =>
          p.title?.toLowerCase().includes(searchQuery) ||
          p.description?.toLowerCase().includes(searchQuery) ||
          p.category?.toLowerCase().includes(searchQuery)
      );
    }

    if (filters.sortBy === 'price_asc') {
      products.sort((a: any, b: any) => a.basePrice - b.basePrice);
    } else if (filters.sortBy === 'price_desc') {
      products.sort((a: any, b: any) => b.basePrice - a.basePrice);
    } else if (filters.sortBy === 'newest') {
      products.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      products.sort((a: any, b: any) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    // Zero-Result & Search Event Tracking
    if (searchQuery && filters.sessionId) {
      const hasResults = products.length > 0;
      await trackEvent({
        eventType: 'SEARCH',
        searchQuery: filters.query?.trim(),
        hasResults,
        sessionId: filters.sessionId,
        trafficSource: filters.trafficSource || 'Direct',
      }).catch(() => {});
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
    const rows = await neonSql`SELECT * FROM "Product" WHERE slug = ${slug} LIMIT 1`;
    const product = rows[0];

    if (!product) return null;

    const variants = await neonSql`
      SELECT * FROM "ProductVariant"
      WHERE "productId" = ${product.id}
      ORDER BY "priceDelta" ASC
    `;

    // Track product view
    if (sessionId) {
      await trackEvent({
        eventType: 'PRODUCT_VIEW',
        productId: product.id,
        productTitle: product.title,
        sessionId,
        trafficSource: trafficSource || 'Direct',
      }).catch(() => {});
    }

    return {
      ...product,
      variants,
    } as unknown as ProductType;
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
