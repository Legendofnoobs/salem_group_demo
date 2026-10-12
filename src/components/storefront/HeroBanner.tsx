'use client';

import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Award, ArrowRight } from 'lucide-react';
import realImages from '../../../prisma/real_images.json';

interface HeroBannerProps {
  onScrollToCatalog: () => void;
  onOpenTradeIn: () => void;
}

export function HeroBanner({ onScrollToCatalog, onOpenTradeIn }: HeroBannerProps) {
  return (
    <div className="w-full">
      {/* 1. Main Flagship Hero Showcase (Rich dark surface per DESIGN.md #272729) */}
      <section className="bg-[#272729] text-[#ffffff] py-12 sm:py-16 px-4 sm:px-8 border-b border-[#333336]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Retailer Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[12px] font-medium text-[#2997ff]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Salem Group • Cairo & Giza Express Dispatch</span>
            </div>

            <h1 className="text-[36px] sm:text-[50px] font-semibold tracking-[-0.35px] leading-[1.08] text-[#ffffff] font-display">
              Premium Apple Hardware.<br />
              <span className="text-[#a1a1a6]">Inspected Before You Pay.</span>
            </h1>

            <p className="text-[16px] sm:text-[18px] text-[#cccccc] leading-relaxed max-w-xl">
              Egypt&apos;s trusted destination for authentic sealed Apple devices and Salem Certified Pre-Owned. Every order includes unboxing inspection rights with express Cash on Delivery.
            </p>

            {/* Quick Guarantees Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[13px] text-[#e0e0e0]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2997ff] shrink-0" />
                <span>100% Sealed Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2997ff] shrink-0" />
                <span>1-Year Local Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2997ff] shrink-0" />
                <span>24h Fast Delivery</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3 rounded-full bg-[#0066cc] hover:bg-[#0077ed] text-white text-[15px] font-medium apple-btn-active transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Shop In-Stock Devices</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTradeIn}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-[#ffffff] border border-white/20 text-[15px] font-medium apple-btn-active transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#2997ff]" />
                <span>Estimate Trade-In</span>
              </button>
            </div>
          </div>

          {/* Right Column: Real Hardware Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-4/3 flex items-center justify-center">
              <img
                src={realImages.mbp16_spaceblack}
                alt="MacBook Pro M3 Max"
                className="w-full h-auto object-contain apple-product-shadow transition-transform hover:scale-105 duration-500"
              />
            </div>
            <div className="text-center mt-3">
              <span className="text-[12px] font-medium text-[#a1a1a6] block">
                Flagship In Stock • MacBook Pro 16&quot; M3 Max (Space Black)
              </span>
              <span className="text-[14px] font-semibold text-white">
                159,900 EGP <span className="text-[12px] text-emerald-400 font-normal">• Ready to Dispatch</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Retailer Guarantees Strip (Parchment surface #f5f5f7 per DESIGN.md) */}
      <section className="bg-[#f5f5f7] border-b border-[#e0e0e0] py-6 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e0e0e0]">
            <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f] leading-tight">
                Inspect Before Paying
              </h3>
              <p className="text-[12px] text-[#7a7a7a] mt-0.5 leading-snug">
                Unbox and test your device with the courier before handing over cash.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e0e0e0]">
            <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f] leading-tight">
                1-Year Egyptian Warranty
              </h3>
              <p className="text-[12px] text-[#7a7a7a] mt-0.5 leading-snug">
                Comprehensive local service and immediate hardware exchange.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e0e0e0]">
            <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f] leading-tight">
                Instant Trade-In Credit
              </h3>
              <p className="text-[12px] text-[#7a7a7a] mt-0.5 leading-snug">
                Trade your used device for immediate credit toward a new upgrade.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-[#e0e0e0]">
            <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f] leading-tight">
                24h Express Delivery
              </h3>
              <p className="text-[12px] text-[#7a7a7a] mt-0.5 leading-snug">
                Fast courier dispatch in Cairo, Giza, and all Egyptian governorates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
