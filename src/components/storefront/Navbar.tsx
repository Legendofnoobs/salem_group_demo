'use client';

import React from 'react';
import { ShoppingBag, Search, X, ShieldCheck, Truck, RefreshCw, PhoneCall } from 'lucide-react';
import { ProductCategory } from '@/types';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTradeIn: () => void;
  onOpenTracking: () => void;
  onToggleAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: 'EGP' | 'USD';
  onToggleCurrency: () => void;
}

export function Navbar({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenTradeIn,
  onOpenTracking,
  onToggleAdmin,
  searchQuery,
  onSearchChange,
  currency,
  onToggleCurrency,
}: NavbarProps) {
  const categories: Array<{ id: ProductCategory; label: string }> = [
    { id: 'all', label: 'All Products' },
    { id: 'mac', label: 'Mac & MacBooks' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'ipad', label: 'iPad' },
    { id: 'watch', label: 'Apple Watch' },
    { id: 'airpods', label: 'AirPods & Audio' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* 1. Top eCommerce Utility Bar */}
      <div className="bg-[#f5f5f7] border-b border-[#e0e0e0] text-[12px] text-[#7a7a7a] py-1.5 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#1d1d1f] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
              Cash On Delivery
            </span>
            <span className="hidden sm:inline text-[#d2d2d7]">•</span>
            <span className="hidden sm:inline">Inspect & Unbox Device Before Paying</span>
            <span className="hidden md:inline text-[#d2d2d7]">•</span>
            <span className="hidden md:inline">Express 24h Delivery Across Egypt</span>
          </div>

          <div className="flex items-center gap-4 text-[12px]">
            <button
              onClick={onOpenTracking}
              className="hidden sm:flex items-center gap-1 hover:text-[#0066cc] transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>

            <button
              onClick={onOpenTradeIn}
              className="hidden md:flex items-center gap-1 hover:text-[#0066cc] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trade-In Estimator</span>
            </button>

            <button
              onClick={onToggleCurrency}
              className="px-2 py-0.5 rounded bg-white border border-[#e0e0e0] font-medium text-[#1d1d1f] hover:border-[#0066cc] transition-colors"
              title="Toggle Currency"
            >
              {currency}
            </button>

            <button
              onClick={onToggleAdmin}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#1d1d1f] hover:bg-[#333333] text-white transition-colors"
            >
              Merchant Admin
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Navigation */}
      <div className="bg-[#ffffff] border-b border-[#e0e0e0] px-4 sm:px-8 py-3.5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 sm:gap-8">
          {/* Salem Group Brand Monogram & Name */}
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-3 text-left shrink-0 hover:opacity-85 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[16px] tracking-tight shadow-sm">
              SG
            </div>
            <div>
              <span className="text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] tracking-tight leading-none block">
                SALEM GROUP
              </span>
              <span className="text-[10px] text-[#7a7a7a] font-semibold tracking-wider uppercase block mt-0.5">
                Premium Electronics & Apple Specialists
              </span>
            </div>
          </button>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-[560px] relative">
            <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search MacBook Pro, iPhone 16, iPad, AirPods, Apple Watch..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-[40px] pl-10 pr-9 rounded-full bg-[#f5f5f7] border border-transparent focus:border-[#0066cc] focus:bg-white text-[14px] text-[#1d1d1f] placeholder-[#7a7a7a] outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7a7a] hover:text-[#1d1d1f]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Header CTAs: Trade-In & Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenTradeIn}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#e0e0e0] hover:border-[#0066cc] text-[#1d1d1f] text-[13px] font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>Sell & Trade-In</span>
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] font-medium apple-btn-active transition-all shadow-sm"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-white text-[#0066cc] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                {cartCount > 0 ? `Bag (${cartCount})` : 'Bag'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Departments Bar */}
      <div className="bg-[#ffffff] border-b border-[#e0e0e0] px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none py-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#1d1d1f] text-white font-medium shadow-xs'
                    : 'text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
