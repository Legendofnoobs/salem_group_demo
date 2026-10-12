'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductType, ProductCondition } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CollectionClientViewProps {
  initialProducts: ProductType[];
  handle: string;
  meta: { title: string };
}

export function CollectionClientView({ initialProducts, handle, meta }: CollectionClientViewProps) {
  const { addToCart, currency, usdRate } = useCart();
  const [selectedCondition, setSelectedCondition] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCondition !== 'ALL') {
      result = result.filter((p) => p.condition === selectedCondition);
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice));
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice));
    }

    return result;
  }, [initialProducts, selectedCondition, sortBy]);

  const handleQuickAdd = (p: ProductType) => {
    const defaultVariant = p.variants?.[0];
    addToCart({
      productId: p.id,
      variantId: defaultVariant?.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      selectedColor: defaultVariant?.colorName || 'Standard',
      selectedStorage: defaultVariant?.storageOption || 'Standard',
      selectedRam: defaultVariant?.ramOption || undefined,
      price: p.salePrice || p.basePrice,
      quantity: 1,
      image: p.images[0] || '',
      condition: p.condition,
      batteryHealth: p.batteryHealth,
      serialNumber: defaultVariant?.serialNumber || undefined,
    });
  };

  return (
    <div className="space-y-8">
      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0f0f0]">
        {/* Condition Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          <span className="text-[12px] text-[#7a7a7a] mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Condition:
          </span>

          {[
            { id: 'ALL', label: 'All Units' },
            { id: 'NEW_SEALED', label: 'Brand New Sealed' },
            { id: 'OPEN_BOX', label: 'Open Box (100% Battery)' },
            { id: 'CERTIFIED_PRE_OWNED', label: 'Salem Certified Pre-Owned' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCondition(tab.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all cursor-pointer ${
                selectedCondition === tab.id
                  ? 'bg-[#1d1d1f] text-white font-medium'
                  : 'bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[13px] text-[#7a7a7a]">
            <strong className="text-[#1d1d1f] font-semibold">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-1 bg-[#f5f5f7] rounded-full px-3 py-1 text-[12px] border border-[#e0e0e0]">
            <ArrowUpDown className="w-3 h-3 text-[#7a7a7a]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#1d1d1f] font-medium outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0]">
          <h3 className="text-[22px] font-semibold text-[#1d1d1f]">No matching devices found</h3>
          <p className="text-[14px] text-[#7a7a7a] mt-1 max-w-md mx-auto">
            Try resetting your condition filters or browse another collection.
          </p>
          <button
            onClick={() => setSelectedCondition('ALL')}
            className="mt-4 px-5 py-2 rounded-full bg-[#0066cc] text-white text-[13px] font-medium hover:bg-[#0071e3]"
          >
            Show All In-Stock Units
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const rawPrice = product.salePrice || product.basePrice;
            const displayPrice = currency === 'USD'
              ? Math.round(rawPrice / usdRate)
              : rawPrice;

            const originalDisplayPrice = product.salePrice
              ? currency === 'USD'
                ? Math.round(product.basePrice / usdRate)
                : product.basePrice
              : null;

            return (
              <div
                key={product.id}
                className="group rounded-[18px] bg-white border border-[#e0e0e0] p-6 flex flex-col justify-between hover:border-[#b0b0b5] transition-all"
              >
                <div>
                  {/* Image with signature drop shadow */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="aspect-4/3 w-full flex items-center justify-center p-3 mb-4 block"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain apple-product-shadow group-hover:scale-104 transition-transform duration-300"
                    />
                  </Link>

                  {/* Condition & Sale Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    {product.condition === 'NEW_SEALED' && (
                      <span className="text-[11px] font-semibold text-[#0066cc] uppercase tracking-wider">
                        Brand New Sealed
                      </span>
                    )}
                    {product.condition === 'OPEN_BOX' && (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Open Box • 100% Battery
                      </span>
                    )}
                    {product.condition === 'CERTIFIED_PRE_OWNED' && (
                      <span className="text-[11px] font-semibold text-[#bf5af2] bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Salem Certified • {product.batteryHealth}% Battery
                      </span>
                    )}

                    {product.salePrice && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Save {((product.basePrice - product.salePrice)).toLocaleString()} EGP
                      </span>
                    )}
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-[17px] font-semibold text-[#1d1d1f] leading-snug group-hover:text-[#0066cc] transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-[13px] text-[#7a7a7a] mt-1.5 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#f0f0f0] flex items-end justify-between">
                  <div>
                    <div className="text-[17px] font-semibold text-[#1d1d1f]">
                      {currency === 'USD' ? `$${displayPrice.toLocaleString()}` : `${displayPrice.toLocaleString()} EGP`}
                      {originalDisplayPrice && (
                        <span className="text-[13px] text-[#7a7a7a] line-through ml-2 font-normal">
                          {currency === 'USD' ? `$${originalDisplayPrice.toLocaleString()}` : `${originalDisplayPrice.toLocaleString()} EGP`}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#7a7a7a] block mt-0.5">
                      Cash On Delivery (COD)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="px-3.5 py-1.5 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] font-medium apple-btn-active transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-3 py-1.5 rounded-full border border-[#e0e0e0] hover:bg-[#f5f5f7] text-[#1d1d1f] text-[13px] font-medium transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
