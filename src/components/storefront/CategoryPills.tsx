'use client';

import React from 'react';
import { Laptop, Smartphone, Tablet, Watch, Headphones, Sparkles, Filter } from 'lucide-react';
import { ProductCategory, ProductCondition } from '@/types';

interface CategoryPillsProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedCondition: ProductCondition | 'ALL';
  onSelectCondition: (cond: ProductCondition | 'ALL') => void;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'newest';
  onSelectSort: (sort: 'featured' | 'price_asc' | 'price_desc' | 'newest') => void;
  totalCount: number;
}

export function CategoryPills({
  selectedCategory,
  onSelectCategory,
  selectedCondition,
  onSelectCondition,
  sortBy,
  onSelectSort,
  totalCount,
}: CategoryPillsProps) {
  const categoryItems: Array<{ id: ProductCategory; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'All Products', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'mac', label: 'MacBook', icon: <Laptop className="w-3.5 h-3.5" /> },
    { id: 'iphone', label: 'iPhone', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'ipad', label: 'iPad', icon: <Tablet className="w-3.5 h-3.5" /> },
    { id: 'watch', label: 'Apple Watch', icon: <Watch className="w-3.5 h-3.5" /> },
    { id: 'airpods', label: 'AirPods', icon: <Headphones className="w-3.5 h-3.5" /> },
  ];

  const conditionItems: Array<{ id: ProductCondition | 'ALL'; label: string }> = [
    { id: 'ALL', label: 'All Conditions' },
    { id: 'NEW_SEALED', label: 'Brand New Sealed' },
    { id: 'OPEN_BOX', label: 'Open Box (100% Battery)' },
    { id: 'CERTIFIED_PRE_OWNED', label: 'Certified Pre-Owned' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryItems.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-white text-black shadow-md scale-[1.02]'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10 hover:border-zinc-600'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Sub-Filters: Condition & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-zinc-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {conditionItems.map((cond) => (
            <button
              key={cond.id}
              onClick={() => onSelectCondition(cond.id)}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                selectedCondition === cond.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span>{totalCount} devices in stock</span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value as any)}
            className="bg-zinc-900 border border-white/10 text-xs text-zinc-300 rounded-lg px-2.5 py-1 focus:outline-none focus:border-zinc-500"
          >
            <option value="featured">Featured First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>
    </div>
  );
}
