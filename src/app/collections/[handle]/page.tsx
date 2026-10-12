import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts } from '@/actions/products';
import { ProductCategory, ProductCondition } from '@/types';
import { CollectionClientView } from './CollectionClientView';

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{
    condition?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

const collectionMeta: Record<string, { title: string; category?: ProductCategory; condition?: ProductCondition; isSale?: boolean; description: string }> = {
  all: {
    title: 'All In-Stock Hardware',
    category: 'all',
    description: 'Explore our complete catalog of authentic Apple hardware and certified pre-owned devices in Egypt.',
  },
  mac: {
    title: 'Mac & MacBooks',
    category: 'mac',
    description: 'MacBook Pro M3 Max, M3 Pro, and MacBook Air. High-performance Apple Silicon laptops with Egyptian warranty.',
  },
  iphone: {
    title: 'iPhone Collection',
    category: 'iphone',
    description: 'iPhone 16 Pro, 16 Pro Max, and certified pre-owned models. Factory sealed boxes with full Cash on Delivery inspection.',
  },
  ipad: {
    title: 'iPad Pro & iPad Air',
    category: 'ipad',
    description: 'Ultra-thin Tandem OLED iPad Pro M4 and versatile iPad Air. Ready for express same-day dispatch.',
  },
  watch: {
    title: 'Apple Watch & Ultra',
    category: 'watch',
    description: 'Apple Watch Ultra 2 in aerospace titanium and Series 10. Adventure-grade performance with Egyptian warranty.',
  },
  airpods: {
    title: 'AirPods & Audio',
    category: 'airpods',
    description: 'AirPods Pro 2 with USB-C MagSafe charging case and Active Noise Cancellation.',
  },
  'pre-owned': {
    title: 'Salem Certified Pre-Owned',
    condition: 'CERTIFIED_PRE_OWNED',
    description: 'Rigorous 36-point hardware diagnostics. Grade A+ chassis, verified battery health %, and 6-month full replacement warranty.',
  },
  sale: {
    title: 'Special Promotions & Deals',
    isSale: true,
    description: 'Limited-time discounts, open box customs inspection units, and promotional bundles on authentic Apple gear.',
  },
  macbook: {
    title: 'Mac & MacBooks',
    category: 'mac',
    description: 'MacBook Pro M3 Max, M3 Pro, and MacBook Air. High-performance Apple Silicon laptops with Egyptian warranty.',
  },
  iphones: {
    title: 'iPhone Collection',
    category: 'iphone',
    description: 'iPhone 16 Pro, 16 Pro Max, and certified pre-owned models. Factory sealed boxes with full Cash on Delivery inspection.',
  },
  ipads: {
    title: 'iPad Pro & iPad Air',
    category: 'ipad',
    description: 'Ultra-thin Tandem OLED iPad Pro M4 and versatile iPad Air. Ready for express same-day dispatch.',
  },
  watches: {
    title: 'Apple Watch & Ultra',
    category: 'watch',
    description: 'Apple Watch Ultra 2 in aerospace titanium and Series 10. Adventure-grade performance with Egyptian warranty.',
  },
};

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { handle } = await params;
  const sParams = await searchParams;

  const meta = collectionMeta[handle.toLowerCase()];
  if (!meta) {
    // If not found in static list, fallback to all or 404
    notFound();
  }

  // Fetch products
  let categoryFilter: ProductCategory | undefined = meta.category;
  let conditionFilter: ProductCondition | 'ALL' | undefined = (sParams.condition as any) || meta.condition || 'ALL';

  const products = await getProducts({
    category: categoryFilter,
    condition: conditionFilter,
    sortBy: (sParams.sort as any) || 'featured',
  });

  // If sale collection, prioritize products with salePrice or open box
  const displayProducts = meta.isSale
    ? products.filter((p) => Boolean(p.salePrice || p.condition !== 'NEW_SEALED'))
    : products;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 w-full flex-1">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-[12px] text-[#7a7a7a] mb-6">
        <Link href="/" className="hover:text-[#0066cc]">Home</Link>
        <span>/</span>
        <Link href="/collections/all" className="hover:text-[#0066cc]">Collections</Link>
        <span>/</span>
        <span className="text-[#1d1d1f] font-medium">{meta.title}</span>
      </nav>

      {/* Collection Header */}
      <div className="mb-10 pb-6 border-b border-[#e0e0e0]">
        <div className="flex items-center gap-2 mb-2">
          {meta.isSale && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
              Limited Time Deals
            </span>
          )}
          <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider">
            Salem Group Collection
          </span>
        </div>

        <h1 className="text-[36px] sm:text-[44px] font-semibold text-[#1d1d1f] tracking-tight leading-tight font-display">
          {meta.title}
        </h1>

        <p className="text-[16px] text-[#7a7a7a] mt-2 max-w-2xl">
          {meta.description}
        </p>
      </div>

      {/* Client Filter & Products Grid Component */}
      <CollectionClientView
        initialProducts={displayProducts}
        handle={handle}
        meta={meta}
      />
    </div>
  );
}
