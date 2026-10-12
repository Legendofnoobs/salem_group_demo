import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/actions/products';
import { ProductCard } from '@/components/storefront/ProductCard';
import { ShieldCheck, Award, Truck, RefreshCw, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import realImages from '../../prisma/real_images.json';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const allProducts = await getProducts({ sortBy: 'featured' });
  const bestSellers = allProducts.slice(0, 6);

  const collections = [
    {
      title: 'MacBook & Mac',
      handle: 'mac',
      desc: 'M3 Max, M3 Pro, MacBook Air',
      image: realImages.mbp16_spaceblack,
      badge: 'In Stock',
    },
    {
      title: 'iPhone 16 Series',
      handle: 'iphone',
      desc: '16 Pro, 16 Pro Max, 15 Pro',
      image: realImages.iphone16pro_desert,
      badge: 'Flagship',
    },
    {
      title: 'iPad Pro & Air',
      handle: 'ipad',
      desc: 'M4 Tandem OLED, iPad Air',
      image: realImages.ipadpro13_spaceblack,
      badge: 'Ultra Thin',
    },
    {
      title: 'Apple Watch',
      handle: 'watch',
      desc: 'Ultra 2, Series 10 Titanium',
      image: realImages.watchultra2,
      badge: 'Adventure',
    },
    {
      title: 'AirPods & Audio',
      handle: 'airpods',
      desc: 'AirPods Pro 2 USB-C, Max',
      image: realImages.airpodspro2,
      badge: 'Active ANC',
    },
    {
      title: 'Certified Pre-Owned',
      handle: 'pre-owned',
      desc: '36-Point Inspected with Warranty',
      image: realImages.mbp14_preowned_spacegray,
      badge: 'Best Value',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Flagship Hero Banner */}
      <section className="bg-[#272729] text-[#ffffff] py-14 sm:py-20 px-4 sm:px-8 border-b border-[#333336]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-[38px] sm:text-[54px] font-semibold tracking-[-0.35px] leading-[1.06] text-[#ffffff] font-display">
              Premium Apple Hardware.<br />
              <span className="text-[#a1a1a6]">Inspected Before You Pay.</span>
            </h1>

            <p className="text-[16px] sm:text-[18px] text-[#cccccc] leading-relaxed max-w-xl">
              Egypt&apos;s premier destination for genuine sealed Apple devices and certified pre-owned hardware. Full unboxing inspection rights with express Cash on Delivery.
            </p>

            {/* 4 Core Value Guarantees directly under subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-2xl">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-[#2997ff]/15 text-[#2997ff] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-white">Inspect Before Paying</h3>
                  <p className="text-[12px] text-[#a1a1a6] mt-0.5 leading-snug">
                    Unbox and test your device with the courier before paying cash.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-[#2997ff]/15 text-[#2997ff] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-white">1-Year Egyptian Warranty</h3>
                  <p className="text-[12px] text-[#a1a1a6] mt-0.5 leading-snug">
                    Comprehensive local coverage &amp; immediate exchange on factory defects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-[#2997ff]/15 text-[#2997ff] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-white">Instant Trade-In Credit</h3>
                  <p className="text-[12px] text-[#a1a1a6] mt-0.5 leading-snug">
                    Trade your existing phone or laptop for immediate store discount.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-[#2997ff]/15 text-[#2997ff] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-white">24h Express Delivery</h3>
                  <p className="text-[12px] text-[#a1a1a6] mt-0.5 leading-snug">
                    Rapid dispatch across Cairo, Giza, Alexandria &amp; all governorates.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <Link
                href="/collections/all"
                className="px-7 py-3.5 rounded-full bg-[#0066cc] hover:bg-[#0077ed] text-white text-[15px] font-medium apple-btn-active transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/collections/sale"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-[#ffffff] border border-white/20 text-[15px] font-medium apple-btn-active transition-all"
              >
                View Promotions
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[480px] flex items-center justify-center">
              <img
                src="/images/hero_macbook.png"
                alt="MacBook Pro M3 Max"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
            <div className="text-center mt-4">
              <span className="text-[12px] font-medium text-[#a1a1a6] block">
                Flagship In Stock • MacBook Pro 16&quot; M3 Max
              </span>
              <span className="text-[15px] font-semibold text-white">
                159,900 EGP <span className="text-[12px] text-emerald-400 font-normal">• Ready to Dispatch</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Collections Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-[1240px] mx-auto w-full">
        <div className="mb-10 text-left">
          <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block mb-1">
            Browse By Category
          </span>
          <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight font-display">
            Featured Collections
          </h2>
          <p className="text-[16px] text-[#7a7a7a] mt-1">
            Explore our curated inventory of genuine Apple laptops, phones, tablets, and audio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.handle}
              href={`/collections/${col.handle}`}
              className="group relative rounded-[20px] bg-[#f5f5f7] border border-[#e0e0e0] p-6 flex flex-col justify-between overflow-hidden hover:border-[#b0b0b5] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0066cc] block">
                    {col.badge}
                  </span>
                  <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight mt-0.5 group-hover:text-[#0066cc] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-[13px] text-[#7a7a7a] mt-1">
                    {col.desc}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#0066cc] group-hover:text-white transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="w-full aspect-4/3 flex items-center justify-center p-3 mt-2">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-contain apple-product-shadow group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers Showcase */}
      <section className="bg-[#f5f5f7] border-y border-[#e0e0e0] py-16 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10">
            <div>
              <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block mb-1">
                Most In-Demand
              </span>
              <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight font-display">
                Best Sellers in Cairo
              </h2>
              <p className="text-[16px] text-[#7a7a7a] mt-1">
                Our highest-converting flagship products ready for same-day delivery.
              </p>
            </div>

            <Link
              href="/collections/all"
              className="text-[14px] font-medium text-[#0066cc] hover:underline flex items-center gap-1.5 shrink-0"
            >
              <span>View All Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-white rounded-[18px] border border-[#e0e0e0] p-6 flex flex-col justify-between">
                <div>
                  <div className="w-full aspect-4/3 flex items-center justify-center p-2 mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain apple-product-shadow"
                    />
                  </div>

                  <span className="text-[11px] font-semibold text-[#0066cc] uppercase tracking-wider block mb-1">
                    {product.condition === 'NEW_SEALED' ? 'Brand New Sealed' : 'Certified Pre-Owned'}
                  </span>

                  <h3 className="text-[17px] font-semibold text-[#1d1d1f] leading-tight">
                    {product.title}
                  </h3>

                  <p className="text-[13px] text-[#7a7a7a] mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                  <div>
                    <span className="text-[17px] font-semibold text-[#1d1d1f]">
                      {(product.salePrice || product.basePrice).toLocaleString()} EGP
                    </span>
                    <span className="text-[11px] text-[#7a7a7a] block">
                      Cash on Delivery (COD)
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Brand Story & Trust Section */}
      <section className="py-20 px-4 sm:px-8 max-w-[1240px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block">
              The Salem Standard
            </span>

            <h2 className="text-[34px] sm:text-[42px] font-semibold text-[#1d1d1f] tracking-tight leading-[1.12] font-display">
              Why Egyptian Customers Trust Salem Group.
            </h2>

            <p className="text-[16px] text-[#7a7a7a] leading-relaxed">
              Founded to eliminate the uncertainty in consumer electronics retail, Salem Group provides Egypt with 100% genuine sealed Apple hardware alongside thoroughly certified pre-owned equipment.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-semibold text-[#1d1d1f]">Guaranteed Unboxing Inspection</h4>
                  <p className="text-[13px] text-[#7a7a7a]">You examine the serial number, box seal, and physical condition with our courier before handing over a single pound.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-semibold text-[#1d1d1f]">36-Point Hardware Diagnostic</h4>
                  <p className="text-[13px] text-[#7a7a7a]">Every pre-owned device undergoes comprehensive battery health, display true-tone, and logic board testing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-semibold text-[#1d1d1f]">Permanent Showrooms in Cairo</h4>
                  <p className="text-[13px] text-[#7a7a7a]">Visit our physical showroom on Abbas El Akkad in Nasr City or our logistics hub in New Cairo anytime.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/pages/about"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0066cc] hover:underline"
              >
                <span>Read our full brand story & showroom guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#f5f5f7] border border-[#e0e0e0] p-8 sm:p-12 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[24px] mx-auto shadow-md">
              SG
            </div>

            <h3 className="text-[26px] font-semibold text-[#1d1d1f]">
              Ready to Upgrade?
            </h3>

            <p className="text-[15px] text-[#7a7a7a] max-w-md mx-auto">
              Calculate your trade-in credit or speak directly with our Cairo procurement specialists via WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/pages/contact"
                className="px-6 py-3 rounded-full bg-[#1d1d1f] text-white text-[14px] font-medium hover:bg-[#333333] transition-colors"
              >
                Contact Showroom
              </Link>

              <Link
                href="/collections/all"
                className="px-6 py-3 rounded-full bg-[#0066cc] text-white text-[14px] font-medium hover:bg-[#0071e3] transition-colors"
              >
                Shop Full Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
