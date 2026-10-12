'use client';

import React from 'react';
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
      className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6 flex flex-col justify-between cursor-pointer hover:border-[#b0b0b5] transition-colors"
    >
      {/* Top: Product Image with Signature Apple Drop-Shadow */}
      <div>
        <div className="aspect-[4/3] w-full flex items-center justify-center p-2 mb-4">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-contain apple-product-shadow"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#7a7a7a] text-[14px]">
              No Image
            </div>
          )}
        </div>

        {/* Condition Tag */}
        <div className="mb-2">
          {product.condition === 'NEW_SEALED' && (
            <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-[0.2px]">
              Brand New Sealed
            </span>
          )}
          {product.condition === 'OPEN_BOX' && (
            <span className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.2px]">
              Open Box • 100% Battery
            </span>
          )}
          {product.condition === 'CERTIFIED_PRE_OWNED' && (
            <span className="text-[12px] font-semibold text-[#bf5af2] uppercase tracking-[0.2px]">
              Salem Certified • {product.batteryHealth}% Battery
            </span>
          )}
        </div>

        {/* Product Title (body-strong: 17px / 600 / line-height 1.24) */}
        <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px] leading-[1.24]">
          {product.title}
        </h3>

        {/* Description / Chip snippet (caption: 14px / 400) */}
        <p className="text-[14px] text-[#7a7a7a] font-normal leading-[1.43] mt-1.5 line-clamp-2">
          {product.description}
        </p>

        {/* Color variants hint */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mt-3">
            {product.variants.map((v) => (
              <span
                key={v.id}
                title={v.colorName}
                className="w-3 h-3 rounded-full border border-black/15 inline-block"
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom: Pricing & Action Blue Pill CTA */}
      <div className="pt-6 mt-4 border-t border-[#f0f0f0] flex items-end justify-between">
        <div>
          <div className="text-[17px] font-normal text-[#1d1d1f] tracking-[-0.374px]">
            {currency === 'USD' ? `$${displayPrice.toLocaleString()}` : `${displayPrice.toLocaleString()} EGP`}
            {displaySalePrice && (
              <span className="text-[14px] text-[#7a7a7a] line-through ml-2">
                {currency === 'USD' ? `$${displaySalePrice.toLocaleString()}` : `${displaySalePrice.toLocaleString()} EGP`}
              </span>
            )}
          </div>
          <span className="text-[12px] text-[#7a7a7a] font-normal block mt-0.5">
            Cash On Delivery (COD)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            className="px-4 py-2 rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[14px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
