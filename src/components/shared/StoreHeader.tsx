'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, X, ShieldCheck, Truck, RefreshCw, User, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function StoreHeader() {
  const router = useRouter();
  const { cartCount, setIsCartOpen, currency, toggleCurrency } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* 1. Top eCommerce Utility Announcement Bar */}
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
            <Link
              href="/account"
              className="hidden sm:flex items-center gap-1 hover:text-[#0066cc] transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Orders</span>
            </Link>

            <Link
              href="/pages/about"
              className="hidden md:inline hover:text-[#0066cc] transition-colors"
            >
              About Salem
            </Link>

            <Link
              href="/pages/contact"
              className="hidden md:inline hover:text-[#0066cc] transition-colors"
            >
              Contact Us
            </Link>

            <button
              onClick={toggleCurrency}
              className="px-2 py-0.5 rounded bg-white border border-[#e0e0e0] font-medium text-[#1d1d1f] hover:border-[#0066cc] transition-colors cursor-pointer"
              title="Toggle Currency"
            >
              {currency}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Store Navigation Header */}
      <div className="bg-[#ffffff] border-b border-[#e0e0e0] px-4 sm:px-8 py-3.5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Logo */}
          <Link
            href="/"
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
          </Link>

          {/* Central Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[560px] relative">
            <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search MacBook Pro, iPhone 16, iPad, AirPods, pre-owned..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[40px] pl-10 pr-9 rounded-full bg-[#f5f5f7] border border-transparent focus:border-[#0066cc] focus:bg-white text-[14px] text-[#1d1d1f] placeholder-[#7a7a7a] outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7a7a] hover:text-[#1d1d1f]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Right Header CTAs: Account & Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/account"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#e0e0e0] hover:border-[#0066cc] text-[#1d1d1f] text-[13px] font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>Account</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] font-medium apple-btn-active transition-all shadow-sm cursor-pointer"
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
          {navCategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-1.5 rounded-full text-[13px] whitespace-nowrap transition-all ${
                item.isSale
                  ? 'bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 flex items-center gap-1'
                  : 'text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
              }`}
            >
              {item.isSale && <Tag className="w-3 h-3 text-rose-500" />}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
