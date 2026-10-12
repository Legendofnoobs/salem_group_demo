'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import { ProductType, CartItemType } from '@/types';

interface ProductModalProps {
  product: ProductType | null;
  onClose: () => void;
  currency: 'EGP' | 'USD';
  usdRate: number;
  onAddToCart: (item: CartItemType) => void;
  onDirectOrder: (item: CartItemType) => void;
}

export function ProductModal({
  product,
  onClose,
  currency,
  usdRate,
  onAddToCart,
  onDirectOrder,
}: ProductModalProps) {
  if (!product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0];

  const effectiveBasePrice = (product.salePrice || product.basePrice) + (selectedVariant?.priceDelta || 0);
  const displayPrice = currency === 'USD'
    ? Math.round(effectiveBasePrice / usdRate)
    : effectiveBasePrice;

  const mainImage = product.images?.[0] || '';

  const getCartItem = (): CartItemType => ({
    productId: product.id,
    variantId: selectedVariant?.id,
    title: product.title,
    category: product.category,
    selectedColor: selectedVariant?.colorName || 'Standard',
    selectedStorage: selectedVariant?.storageOption || 'Standard',
    selectedRam: selectedVariant?.ramOption || undefined,
    price: effectiveBasePrice,
    quantity: 1,
    image: mainImage,
    condition: product.condition,
    batteryHealth: product.batteryHealth,
    serialNumber: selectedVariant?.serialNumber || undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] overflow-hidden my-8 text-[#1d1d1f]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-[#f5f5f7] text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Product Imagery resting on canvas */}
          <div className="p-8 sm:p-12 bg-[#f5f5f7] border-b lg:border-b-0 lg:border-r border-[#e0e0e0] flex flex-col justify-between items-center text-center">
            <div className="w-full">
              {/* Condition Tag */}
              <div className="mb-6">
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

              {/* Product render with signature shadow */}
              <div className="aspect-[4/3] flex items-center justify-center p-4">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="max-h-[300px] w-auto object-contain apple-product-shadow"
                />
              </div>
            </div>

            {/* Inspection badge for pre-owned */}
            {product.condition !== 'NEW_SEALED' && (
              <div className="w-full mt-6 p-4 rounded-[11px] bg-[#ffffff] border border-[#e0e0e0] text-left text-[14px]">
                <h4 className="font-semibold text-[#1d1d1f] mb-2 flex items-center gap-1.5 text-[14px]">
                  <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
                  Salem 36-Point Hardware Verification
                </h4>
                <div className="grid grid-cols-2 gap-1.5 text-[12px] text-[#7a7a7a]">
                  <div>✓ Original Battery ({product.batteryHealth}%)</div>
                  <div>✓ True Tone Display Verified</div>
                  <div>✓ Grade A+ Body Condition</div>
                  <div>✓ Clean iCloud & Factory Reset</div>
                </div>
                {selectedVariant?.serialNumber && (
                  <div className="mt-2.5 pt-2 border-t border-[#f0f0f0] flex justify-between text-[11px] font-mono text-[#7a7a7a]">
                    <span>Serial Number:</span>
                    <span className="font-semibold text-[#1d1d1f]">{selectedVariant.serialNumber}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Configurator & Actions */}
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.2px]">
                Apple • {product.category}
              </span>

              {/* Title (display-md: 34px / 600 / line-height 1.47 / letter-spacing -0.374px) */}
              <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] leading-[1.2] mt-1 font-display">
                {product.title}
              </h2>

              {/* Price */}
              <div className="mt-3 text-[21px] font-semibold text-[#1d1d1f] tracking-[0.231px]">
                {currency === 'USD' ? `$${displayPrice.toLocaleString()}` : `${displayPrice.toLocaleString()} EGP`}
              </div>

              {/* Description */}
              <p className="text-[14px] text-[#7a7a7a] font-normal leading-[1.43] mt-3">
                {product.description}
              </p>

              {/* Finish Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-[14px] font-semibold text-[#1d1d1f] block mb-2">
                      Finish: <span className="font-normal text-[#7a7a7a]">{selectedVariant?.colorName}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, idx) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-[9999px] text-[14px] font-normal border transition-all apple-btn-active ${
                            selectedVariantIndex === idx
                              ? 'border-2 border-[#0071e3] bg-[#ffffff] font-semibold'
                              : 'border border-[#e0e0e0] bg-[#ffffff] text-[#1d1d1f]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15"
                            style={{ backgroundColor: v.colorHex }}
                          />
                          <span>{v.colorName}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage / Specs Chips */}
                  <div>
                    <label className="text-[14px] font-semibold text-[#1d1d1f] block mb-2">
                      Storage:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, idx) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`px-4 py-2 rounded-[9999px] text-[14px] font-normal border transition-all apple-btn-active ${
                            selectedVariantIndex === idx
                              ? 'border-2 border-[#0071e3] bg-[#ffffff] font-semibold text-[#1d1d1f]'
                              : 'border border-[#e0e0e0] bg-[#ffffff] text-[#7a7a7a]'
                          }`}
                        >
                          {v.storageOption} {v.ramOption ? `• ${v.ramOption}` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Hardware Specifications table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mt-6 border-t border-[#f0f0f0] pt-4 space-y-1.5 text-[14px]">
                  <h4 className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.2px] mb-2">
                    Specifications
                  </h4>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-[#f0f0f0] text-[12px]">
                      <span className="text-[#7a7a7a] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-[#1d1d1f] font-medium text-right">{String(val)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#e0e0e0] space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onAddToCart(getCartItem());
                    onClose();
                  }}
                  className="flex-1 py-3 px-6 rounded-[9999px] border border-[#0066cc] text-[#0066cc] font-normal text-[17px] hover:bg-[#0066cc]/5 apple-btn-active transition-all"
                >
                  Add to Bag
                </button>

                <button
                  onClick={() => {
                    onDirectOrder(getCartItem());
                    onClose();
                  }}
                  className="flex-1 py-3 px-6 rounded-[9999px] bg-[#0066cc] text-[#ffffff] font-normal text-[17px] hover:bg-[#0071e3] apple-btn-active transition-all"
                >
                  Order with COD
                </button>
              </div>

              <p className="text-[12px] text-[#7a7a7a] text-center">
                Cash On Delivery (COD) • Inspect device upon arrival before paying courier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
