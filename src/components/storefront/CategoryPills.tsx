'use client';

import React from 'react';
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
  const categories: Array<{ id: ProductCategory; label: string }> = [
    { id: 'all', label: 'All Products' },
    { id: 'mac', label: 'Mac' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'ipad', label: 'iPad' },
    { id: 'watch', label: 'Apple Watch' },
    { id: 'airpods', label: 'AirPods' },
  ];

  const conditions: Array<{ id: ProductCondition | 'ALL'; label: string }> = [
    { id: 'ALL', label: 'All Models' },
    { id: 'NEW_SEALED', label: 'Brand New Sealed' },
    { id: 'OPEN_BOX', label: 'Open Box (100% Battery)' },
    { id: 'CERTIFIED_PRE_OWNED', label: 'Salem Certified Pre-Owned' },
  ];

  return (
    <div className="mb-10 space-y-6">
      {/* Category Navigation Bar (Quiet text row) */}
      <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-[17px] font-normal transition-colors pb-2 -mb-3 border-b-2 ${
                selectedCategory === cat.id
                  ? 'border-[#0066cc] text-[#1d1d1f] font-semibold'
                  : 'border-transparent text-[#7a7a7a] hover:text-[#1d1d1f]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-[14px] text-[#7a7a7a] font-normal hidden sm:inline whitespace-nowrap pl-4">
          {totalCount} products
        </span>
      </div>

      {/* Configurator Option Chips (rounded.pill 12px 16px per DESIGN.md) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {conditions.map((cond) => {
            const isSelected = selectedCondition === cond.id;
            return (
              <button
                key={cond.id}
                onClick={() => onSelectCondition(cond.id)}
                className={`px-4 py-2 rounded-[9999px] text-[14px] font-normal transition-all apple-btn-active ${
                  isSelected
                    ? 'bg-[#ffffff] text-[#1d1d1f] border-2 border-[#0071e3] font-semibold'
                    : 'bg-[#ffffff] text-[#1d1d1f] border border-[#e0e0e0] hover:border-[#7a7a7a]'
                }`}
              >
                {cond.label}
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#7a7a7a]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value as any)}
            className="bg-[#ffffff] border border-[#e0e0e0] text-[14px] text-[#1d1d1f] rounded-[9999px] px-3.5 py-1.5 focus:outline-none focus:border-[#0071e3]"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
