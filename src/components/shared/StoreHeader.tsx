'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, X, ShieldCheck, Truck, User, Tag, HelpCircle, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function StoreHeader() {
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navCategories = [
    { label: 'Shop All', href: '/collections/all' },
    { label: 'Mac & MacBooks', href: '/collections/mac' },
    { label: 'iPhone', href: '/collections/iphone' },
    { label: 'iPad', href: '/collections/ipad' },
    { label: 'Apple Watch', href: '/collections/watch' },
    { label: 'AirPods & Audio', href: '/collections/airpods' },
    { label: 'Certified Pre-Owned', href: '/collections/pre-owned' },
    { label: 'Sale & Offers', href: '/collections/sale', isSale: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs bg-white">
      {/* ROW 1: Main Header (Branding, Global Search, Utility Links & Bag) */}
      <div className="border-b border-[#e5e5ea] px-4 sm:px-8 py-3 bg-white">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-left shrink-0 hover:opacity-85 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[15px] tracking-tight shadow-sm">
              SG
            </div>
            <div>
              <span className="text-[17px] sm:text-[19px] font-bold text-[#1d1d1f] tracking-tight leading-none block">
                SALEM GROUP
              </span>
              <span className="text-[10px] text-[#86868b] font-medium tracking-wide uppercase block mt-0.5">
                Apple Specialists &amp; Importers
              </span>
            </div>
          </Link>

          {/* Central Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-[520px] relative hidden md:block"
          >
            <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search MacBook Pro, iPhone 16, iPad, AirPods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[38px] pl-10 pr-9 rounded-full bg-[#f5f5f7] border border-transparent focus:border-[#0066cc] focus:bg-white text-[13px] text-[#1d1d1f] placeholder-[#86868b] outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Utility Links (Preserved from old bar) */}
            <Link
              href="/account"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-[#424245] hover:text-[#0066cc] transition-colors"
              title="Track existing order status"
            >
              <Truck className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>Track Orders</span>
            </Link>

            <Link
              href="/pages/about"
              className="hidden xl:inline text-[12px] font-medium text-[#424245] hover:text-[#0066cc] transition-colors px-2 py-1"
            >
              About
            </Link>

            <Link
              href="/pages/contact"
              className="hidden xl:inline text-[12px] font-medium text-[#424245] hover:text-[#0066cc] transition-colors px-2 py-1"
            >
              Contact
            </Link>

            <span className="hidden lg:inline text-[#d2d2d7]">•</span>

            {/* Account Link */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d2d2d7] hover:border-[#0066cc] text-[#1d1d1f] text-[12px] font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#0066cc]" />
              <span className="hidden sm:inline">Account</span>
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] font-medium apple-btn-active transition-all shadow-sm cursor-pointer"
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
              <span className="font-semibold">
                {cartCount > 0 ? `Bag (${cartCount})` : 'Bag'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar below brand on mobile only */}
        <div className="mt-2.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-[#86868b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search MacBook, iPhone, iPad, AirPods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] pl-9 pr-8 rounded-full bg-[#f5f5f7] border border-transparent focus:border-[#0066cc] text-[13px] text-[#1d1d1f] outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868b]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* ROW 2: Category Navigation & Reassurance Subheader */}
      <div className="bg-[#fafafc] border-b border-[#e5e5ea] px-4 sm:px-8 py-2">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
          {/* Scrollable Category Navigation */}
          <nav className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none py-0.5">
            {navCategories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 rounded-full text-[12.5px] whitespace-nowrap transition-all ${
                  item.isSale
                    ? 'bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 flex items-center gap-1 border border-rose-200/60'
                    : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-white border border-transparent hover:border-[#d2d2d7]'
                }`}
              >
                {item.isSale && <Tag className="w-3 h-3 text-rose-500" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Reassurance Tag (Preserving COD trust guarantee) */}
          <div className="hidden lg:flex items-center gap-2 text-[12px] text-[#424245] shrink-0 font-medium pl-4 border-l border-[#d2d2d7]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>Cash On Delivery • Inspect Before Paying</span>
          </div>
        </div>
      </div>
    </header>
  );
}
