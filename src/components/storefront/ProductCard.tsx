'use client';

import React from 'react';
import { ShieldCheck, BatteryCharging, Sparkles, Check, Plus } from 'lucide-react';
import { ProductType, CartItemType } from '@/types';

interface ProductCardProps {
  product: ProductType;
  currency: 'EGP' | 'USD';
  usdRate: number;
  onSelectProduct: (p: ProductType) => void;
  onQuickAddToCart: (item: CartItemType) => void;
}

export function ProductCard({
  product,
  currency,
  usdRate,
  onSelectProduct,
  onQuickAddToCart,
}: ProductCardProps) {
  const displayPrice = currency === 'USD'
    ? Math.round(product.basePrice / usdRate)
    : product.basePrice;

  const displaySalePrice = product.salePrice
    ? currency === 'USD'
      ? Math.round(product.salePrice / usdRate)
      : product.salePrice
    : null;

  const defaultVariant = product.variants?.[0];
  const mainImage = product.images?.[0] || '';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart({
      productId: product.id,
      variantId: defaultVariant?.id,
      title: product.title,
      category: product.category,
      selectedColor: defaultVariant?.colorName || 'Default',
      selectedStorage: defaultVariant?.storageOption || 'Standard',
      selectedRam: defaultVariant?.ramOption || undefined,
      price: product.salePrice || product.basePrice,
      quantity: 1,
      image: mainImage,
      condition: product.condition,
      batteryHealth: product.batteryHealth,
      serialNumber: defaultVariant?.serialNumber || undefined,
    });
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="apple-glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Top Image Preview & Badges */}
      <div className="relative aspect-[4/3] w-full bg-zinc-950 overflow-hidden flex items-center justify-center p-4">
        {/* Condition Badge */}
        <div className="absolute top-3 left-3 z-10">
          {product.condition === 'NEW_SEALED' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
              <Sparkles className="w-3 h-3" /> Sealed Box
            </span>
          )}
          {product.condition === 'OPEN_BOX' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              <BatteryCharging className="w-3 h-3" /> Open Box • 100% Battery
            </span>
          )}
          {product.condition === 'CERTIFIED_PRE_OWNED' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/40 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3" /> Pre-Owned • {product.batteryHealth}% Battery
            </span>
          )}
        </div>

        {/* Stock Badge */}
        {product.stock <= 2 && (
          <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-red-950/80 text-red-400 border border-red-500/30">
            Only {product.stock} left
          </span>
        )}

        {/* Product Image (Base64) */}
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            No Image
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Chip tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
              {product.category}
            </span>
            {product.specs?.chip && (
              <span className="text-[10px] font-medium text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded-full border border-blue-500/20">
                {product.specs.chip.split('(')[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.title}
          </h3>

          {/* Key Specs snippet */}
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Available Variants hint */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[10px] text-zinc-400 font-medium">Colors:</span>
              <div className="flex items-center gap-1">
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    title={v.colorName}
                    className="w-3 h-3 rounded-full border border-white/20 inline-block"
                    style={{ backgroundColor: v.colorHex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white">
                {currency === 'USD' ? `$${displayPrice.toLocaleString()}` : `${displayPrice.toLocaleString()} EGP`}
              </span>
              {displaySalePrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {currency === 'USD' ? `$${displaySalePrice.toLocaleString()}` : `${displaySalePrice.toLocaleString()} EGP`}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium block">
              COD • Inspect upon delivery
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2.5 rounded-full bg-zinc-800 text-white hover:bg-white hover:text-black transition-colors"
            title="Add to Bag"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
