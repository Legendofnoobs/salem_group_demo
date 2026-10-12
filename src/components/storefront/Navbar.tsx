'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, X, ShieldCheck } from 'lucide-react';
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
  const [showSearch, setShowSearch] = useState(false);

  const categories: Array<{ id: ProductCategory; label: string }> = [
    { id: 'all', label: 'Store' },
    { id: 'mac', label: 'Mac' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'ipad', label: 'iPad' },
    { id: 'watch', label: 'Watch' },
    { id: 'airpods', label: 'AirPods' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* 1. Global Nav (44px true black #000000, 12px typography, quiet Apple style) */}
      <div className="bg-[#000000] text-[#ffffff] h-[44px] flex items-center px-4 sm:px-8 border-b border-[#333333]/40">
        <div className="max-w-[1024px] mx-auto w-full flex items-center justify-between text-[12px] font-normal tracking-[-0.12px]">
          {/* Apple Logo & Store Name */}
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
          >
            <span className="text-[15px] font-semibold leading-none"></span>
            <span className="font-semibold tracking-normal text-[13px]">Salem Group</span>
          </button>

          {/* Desktop Categories */}
          <nav className="hidden md:flex items-center gap-7">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`transition-opacity hover:opacity-100 ${
                  activeCategory === cat.id ? 'text-[#ffffff] font-semibold' : 'text-[#cccccc] opacity-80'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={onOpenTradeIn}
              className="text-[#cccccc] opacity-80 hover:opacity-100 hover:text-[#2997ff] transition-all"
            >
              Trade In
            </button>
            <button
              onClick={onOpenTracking}
              className="text-[#cccccc] opacity-80 hover:opacity-100 transition-opacity"
            >
              Support
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 text-[#cccccc]">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="hover:text-white transition-colors p-1"
              title="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Currency */}
            <button
              onClick={onToggleCurrency}
              className="text-[11px] font-medium text-[#cccccc] hover:text-white transition-colors"
            >
              {currency}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              className="relative hover:text-white transition-colors p-1"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0066cc] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Switcher */}
            <button
              onClick={onToggleAdmin}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-[9999px] bg-[#1d1d1f] hover:bg-[#333333] text-white transition-colors border border-[#333333]"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sub-Nav Frosted (52px, #f5f5f7 parchment with backdrop blur, 1px border) */}
      <div className="apple-frosted h-[52px] flex items-center px-4 sm:px-8">
        <div className="max-w-[1024px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[19px] sm:text-[21px] font-semibold text-[#1d1d1f] tracking-[0.231px]">
              Apple Authorized Reseller
            </span>
            <span className="hidden sm:inline-block text-[12px] text-[#7a7a7a] font-normal border-l border-[#e0e0e0] pl-3">
              Cairo, Egypt
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Cash on Delivery Notice */}
            <span className="hidden lg:flex items-center gap-1.5 text-[12px] text-[#1d1d1f] font-normal">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
              Cash On Delivery with Inspection
            </span>

            {/* Quick Buy CTA Button */}
            <button
              onClick={() => onSelectCategory('all')}
              className="px-4 py-1.5 rounded-[9999px] bg-[#0066cc] text-white text-[12px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Input (Pill Shaped per DESIGN.md search-input) */}
      {showSearch && (
        <div className="bg-[#f5f5f7] border-b border-[#e0e0e0] py-3 px-4 transition-all">
          <div className="max-w-[640px] mx-auto relative flex items-center">
            <Search className="w-4 h-4 text-[#7a7a7a] absolute left-4 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Search Mac, iPhone, iPad, Apple Watch..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-[44px] pl-11 pr-10 rounded-[9999px] bg-[#ffffff] border border-[#e0e0e0] text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] focus:outline-none focus:border-[#0071e3] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 text-[#7a7a7a] hover:text-[#1d1d1f]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
