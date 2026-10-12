import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/actions/products';
import { Tag, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { CollectionClientView } from '../collections/[handle]/CollectionClientView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Special Promotions & Tech Deals | Salem Group Egypt',
  description: 'Limited-time discounts, open box clearance units, and promotional bundles on authentic Apple hardware.',
};

export default async function PromotionsPage() {
  const allProducts = await getProducts();
  // Filter for products that either have a salePrice or are open box / certified pre-owned
  const promoProducts = allProducts.filter(
    (p) => Boolean(p.salePrice || p.condition !== 'NEW_SEALED')
  );

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 w-full flex-1 space-y-10">
      {/* Promotional Campaign Hero */}
      <section className="rounded-[24px] bg-[#272729] text-white p-8 sm:p-14 border border-[#333336] relative overflow-hidden">
        <div className="max-w-xl space-y-4 text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[12px] font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Seasonal Tech Offers • Cairo Stock</span>
          </div>

          <h1 className="text-[34px] sm:text-[46px] font-semibold tracking-tight leading-[1.08] font-display">
            Exclusive Deals on Premium Hardware.
          </h1>

          <p className="text-[16px] text-[#cccccc] leading-relaxed">
            Save on authentic Apple devices, verified open-box customs inspection units, and certified pre-owned inventory. All backed by our signature Cash on Delivery inspection rights.
          </p>

          <div className="pt-2 flex items-center gap-3 text-[13px] text-[#e0e0e0]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#2997ff]" /> Inspect Before Paying</span>
            <span>•</span>
            <span>Same-Day Cairo Courier</span>
          </div>
        </div>
      </section>

      {/* Promotional Grid with Filtering */}
      <div>
        <div className="mb-6">
          <h2 className="text-[26px] font-semibold text-[#1d1d1f] tracking-tight">
            Discounted Devices & Open Box Specials
          </h2>
          <p className="text-[14px] text-[#7a7a7a]">
            Showing {promoProducts.length} promotional devices currently available for immediate dispatch.
          </p>
        </div>

        <CollectionClientView
          initialProducts={promoProducts}
          handle="sale"
          meta={{ title: 'Promotions & Deals' }}
        />
      </div>
    </div>
  );
}
