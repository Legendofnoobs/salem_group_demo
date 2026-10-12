'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, RefreshCw, LayoutDashboard, X, Smartphone, Laptop } from 'lucide-react';
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
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: Array<{ id: ProductCategory; label: string }> = [
    { id: 'all', label: 'All Products' },
    { id: 'mac', label: 'MacBook' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'ipad', label: 'iPad' },
    { id: 'watch', label: 'Apple Watch' },
    { id: 'airpods', label: 'AirPods' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full apple-glass border-b border-white/10 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-white/5 py-1.5 px-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> Cash on Delivery (COD)
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Inspect & test device before paying</span>
        <span>•</span>
        <span className="text-zinc-300">1-Year Salem Warranty</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/15 flex items-center justify-center group-hover:border-zinc-500 transition-colors">
              <span className="text-white font-bold text-sm tracking-tight"></span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wider text-white block uppercase">
                Salem Group
              </span>
              <span className="text-[10px] text-zinc-400 tracking-wide block -mt-0.5">
                Apple Reseller
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Search */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-3 py-1 w-48 sm:w-64 transition-all">
                <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search Mac, iPhone..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-zinc-400 hover:text-white ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Search Apple Products"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
            title="Toggle Currency"
          >
            {currency}
          </button>

          {/* Trade-In Estimator Button */}
          <button
            onClick={onOpenTradeIn}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-emerald-400" />
            <span>Apple Trade-In</span>
          </button>

          {/* Order Tracking */}
          <button
            onClick={onOpenTracking}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>Track Order</span>
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-200 hover:text-white hover:border-zinc-600 transition-colors"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Switch to Admin Mode */}
          <button
            onClick={onToggleAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-zinc-800 to-zinc-900 border border-white/20 text-white hover:border-zinc-400 transition-all shadow-sm"
            title="Open Merchant Admin Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
