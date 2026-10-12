'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onScrollToCatalog: () => void;
  onOpenTradeIn: () => void;
}

export function HeroBanner({ onScrollToCatalog, onOpenTradeIn }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-white/10 bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-xs text-zinc-300 mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Salem Group Exclusive Apple Inventory</span>
          <span className="text-zinc-500">•</span>
          <span className="text-emerald-400 font-medium">New Sealed & Certified Pre-Owned</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          The Pro Apple Experience. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            Delivered to Your Door.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 mb-8 leading-relaxed font-normal">
          Genuine Apple devices with Salem Group inspection guarantee. Choose from Brand New Sealed units or Certified Pre-Owned with 90%+ battery health and serial number verification.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={onScrollToCatalog}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenTradeIn}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-zinc-900 border border-white/20 text-white font-medium text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 hover:border-zinc-500"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>Estimate Trade-In Value</span>
          </button>
        </div>

        {/* Trust Guarantees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10 text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Cash On Delivery (COD)</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Inspect serial number and unbox before paying courier.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Express Egypt Delivery</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Cairo & Giza in 24 hours. Alexandria & governorates in 48 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">1-Year Salem Warranty</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Direct store warranty and genuine replacement guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
