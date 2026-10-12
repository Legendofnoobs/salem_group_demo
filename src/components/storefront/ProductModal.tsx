'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, BatteryCharging, Check, ShoppingBag, Truck, Sparkles, AlertCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image & Condition Specs */}
          <div className="p-6 sm:p-8 bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
            <div>
              {/* Condition Tag */}
              <div className="mb-4">
                {product.condition === 'NEW_SEALED' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    <Sparkles className="w-3.5 h-3.5" /> Brand New Sealed Box
                  </span>
                )}
                {product.condition === 'OPEN_BOX' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-500/40">
                    <BatteryCharging className="w-3.5 h-3.5" /> Open Box • 100% Battery Health
                  </span>
                )}
                {product.condition === 'CERTIFIED_PRE_OWNED' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-500/40">
                    <ShieldCheck className="w-3.5 h-3.5" /> Salem Certified • {product.batteryHealth}% Battery
                  </span>
                )}
              </div>

              {/* Base64 Product Image */}
              <div className="aspect-[4/3] rounded-2xl bg-zinc-950/80 border border-white/5 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Refurbished / Condition Checklist Card */}
            {product.condition !== 'NEW_SEALED' && (
              <div className="mt-6 p-4 rounded-xl bg-zinc-900/70 border border-white/10 text-xs">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Salem 36-Point Hardware Verification
                </h4>
                <div className="grid grid-cols-2 gap-2 text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Original Battery ({product.batteryHealth}%)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> True Tone & ProMotion OK
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Grade A+ Flawless Body
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> iCloud Unlocked & Clean
                  </div>
                </div>
                {selectedVariant?.serialNumber && (
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 font-mono">Serial / IMEI:</span>
                    <span className="text-zinc-300 font-mono font-medium">{selectedVariant.serialNumber}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Product Details, Configurator, Checkout */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category */}
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Apple • {product.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mt-1">
                {product.title}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white">
                  {currency === 'USD' ? `$${displayPrice.toLocaleString()}` : `${displayPrice.toLocaleString()} EGP`}
                </span>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Free Express Delivery Included
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-6 space-y-4">
                  {/* Color Selection */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2">
                      Finish: <span className="text-white font-normal">{selectedVariant?.colorName}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, idx) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            selectedVariantIndex === idx
                              ? 'bg-zinc-800 border-white text-white'
                              : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-600'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <span>{variant.colorName}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage / Specs pill */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-2">
                      Configuration:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, idx) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            selectedVariantIndex === idx
                              ? 'bg-blue-600/20 border-blue-400 text-blue-300'
                              : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-600'
                          }`}
                        >
                          {variant.storageOption} {variant.ramOption ? `• ${variant.ramOption}` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Hardware Specs table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mt-6 p-4 rounded-xl bg-zinc-900/40 border border-white/5 space-y-2 text-xs">
                  <h4 className="font-semibold text-zinc-300 text-[11px] uppercase tracking-wider mb-2">
                    Key Specifications
                  </h4>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-white/5 last:border-0">
                      <span className="text-zinc-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[200px] truncate">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions: Add to Cart & COD Order */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onAddToCart(getCartItem());
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-zinc-900 border border-white/20 text-white font-medium text-xs sm:text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => {
                    onDirectOrder(getCartItem());
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Order Now (COD)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Cash On Delivery
                </span>
                <span>•</span>
                <span>Inspect before payment</span>
                <span>•</span>
                <span>{product.warrantyInfo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
