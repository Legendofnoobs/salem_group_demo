'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/types';
import { useCart } from '@/context/CartContext';
import {
  ShieldCheck,
  Check,
  Truck,
  Award,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: ProductType;
  relatedProducts: ProductType[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart, currency, usdRate } = useCart();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'inspection' | 'warranty'>('specs');

  const selectedVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0];

  const effectiveBasePrice = (product.salePrice || product.basePrice) + (selectedVariant?.priceDelta || 0);
  const displayPrice = currency === 'USD'
    ? Math.round(effectiveBasePrice / usdRate)
    : effectiveBasePrice;

  const originalPrice = product.salePrice
    ? (product.basePrice + (selectedVariant?.priceDelta || 0))
    : null;
  const originalDisplayPrice = originalPrice
    ? currency === 'USD' ? Math.round(originalPrice / usdRate) : originalPrice
    : null;

  const images = product.images.length > 0 ? product.images : [''];
  const activeImage = images[selectedImageIndex] || images[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant?.id,
      slug: product.slug,
      title: product.title,
      category: product.category,
      selectedColor: selectedVariant?.colorName || 'Standard',
      selectedStorage: selectedVariant?.storageOption || 'Standard',
      selectedRam: selectedVariant?.ramOption || undefined,
      price: effectiveBasePrice,
      quantity,
      image: activeImage,
      condition: product.condition,
      batteryHealth: product.batteryHealth,
      serialNumber: selectedVariant?.serialNumber || undefined,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="space-y-16">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[12px] text-[#7a7a7a]">
        <Link href="/" className="hover:text-[#0066cc]">Home</Link>
        <span>/</span>
        <Link href={`/collections/${product.category}`} className="hover:text-[#0066cc] capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#1d1d1f] font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* 2. Main Product Showcase Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery with Real Photos */}
        <div className="lg:col-span-7 space-y-4">
          <div className="w-full aspect-4/3 rounded-[24px] bg-[#f5f5f7] border border-[#e0e0e0] flex items-center justify-center p-8 overflow-hidden">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-contain apple-product-shadow transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Image Thumbnails if multiple images exist */}
          {images.length > 1 && (
            <div className="flex items-center gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl bg-[#f5f5f7] border p-2 flex items-center justify-center cursor-pointer transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#0066cc] ring-2 ring-[#0066cc]/20 bg-white'
                      : 'border-[#e0e0e0] hover:border-[#b0b0b5]'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Value Props Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 text-center">
            <div className="p-3.5 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
              <ShieldCheck className="w-5 h-5 text-[#0066cc] mx-auto mb-1.5" />
              <span className="text-[12px] font-semibold text-[#1d1d1f] block">Inspect Before Paying</span>
              <span className="text-[11px] text-[#7a7a7a]">Full courier test rights</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
              <Award className="w-5 h-5 text-[#0066cc] mx-auto mb-1.5" />
              <span className="text-[12px] font-semibold text-[#1d1d1f] block">1-Year Warranty</span>
              <span className="text-[11px] text-[#7a7a7a]">Salem Cairo coverage</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0]">
              <Truck className="w-5 h-5 text-[#0066cc] mx-auto mb-1.5" />
              <span className="text-[12px] font-semibold text-[#1d1d1f] block">24h Express</span>
              <span className="text-[11px] text-[#7a7a7a]">Cairo, Giza & Alex</span>
            </div>
          </div>
        </div>

        {/* Right Column: Configurator & Purchase Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Condition badge */}
            <div className="mb-2 flex items-center gap-2">
              {product.condition === 'NEW_SEALED' && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-[11px] font-bold uppercase tracking-wider">
                  Brand New Sealed
                </span>
              )}
              {product.condition === 'OPEN_BOX' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                  Open Box • 100% Battery
                </span>
              )}
              {product.condition === 'CERTIFIED_PRE_OWNED' && (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold uppercase tracking-wider">
                  Salem Certified • {product.batteryHealth}% Battery
                </span>
              )}
            </div>

            <h1 className="text-[28px] sm:text-[34px] font-semibold text-[#1d1d1f] leading-tight tracking-tight font-display">
              {product.title}
            </h1>

            {/* Price section */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-[28px] font-bold text-[#1d1d1f]">
                {currency === 'USD' ? `$${displayPrice.toLocaleString()}` : `${displayPrice.toLocaleString()} EGP`}
              </span>
              {originalDisplayPrice && (
                <span className="text-[18px] text-[#7a7a7a] line-through">
                  {currency === 'USD' ? `$${originalDisplayPrice.toLocaleString()}` : `${originalDisplayPrice.toLocaleString()} EGP`}
                </span>
              )}
            </div>

            <p className="text-[14px] text-[#7a7a7a] mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#f0f0f0]">
              {/* Color Swatch Selection */}
              <div>
                <span className="text-[12px] font-semibold text-[#1d1d1f] block mb-2">
                  Finish: <strong className="font-bold text-[#0066cc]">{selectedVariant?.colorName}</strong>
                </span>

                <div className="flex items-center gap-2.5">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      title={v.colorName}
                      className={`relative w-8 h-8 rounded-full border p-0.5 transition-all cursor-pointer ${
                        selectedVariantIndex === idx
                          ? 'border-[#0066cc] ring-2 ring-[#0066cc]/30 scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                    >
                      <span
                        className="w-full h-full rounded-full block border border-black/10"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage / Configuration Option Chips */}
              <div>
                <span className="text-[12px] font-semibold text-[#1d1d1f] block mb-2">
                  Configuration & Storage
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v, idx) => {
                    const isSelected = selectedVariantIndex === idx;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0066cc] bg-[#0066cc]/5 text-[#1d1d1f] ring-1 ring-[#0066cc]'
                            : 'border-[#e0e0e0] bg-white hover:border-[#b0b0b5] text-[#1d1d1f]'
                        }`}
                      >
                        <div className="text-[13px] font-semibold leading-tight">
                          {v.storageOption} {v.ramOption ? `• ${v.ramOption}` : ''}
                        </div>
                        <div className="text-[11px] text-[#7a7a7a] mt-0.5">
                          {v.priceDelta > 0 ? `+${v.priceDelta.toLocaleString()} EGP` : 'Included'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Stock & Delivery Reassurance */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">
              In Stock at Nasr City Showroom • Ready for same-day dispatch
            </span>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#e0e0e0] rounded-full bg-white px-3 py-2 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-[#7a7a7a] hover:text-[#1d1d1f] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-semibold text-[14px] text-[#1d1d1f]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-[#7a7a7a] hover:text-[#1d1d1f] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-full bg-[#1d1d1f] hover:bg-[#333333] text-white text-[15px] font-medium transition-all apple-btn-active flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

            {/* Direct Cash On Delivery Order Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-medium transition-all apple-btn-active flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Order Now with Cash On Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Inspection Notice Box */}
          <div className="p-4 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0] text-[12px] space-y-1">
            <span className="font-semibold text-[#1d1d1f] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
              The Salem Unboxing Guarantee:
            </span>
            <p className="text-[#7a7a7a] leading-relaxed">
              When the courier arrives, you have the full right to open the packaging, inspect serial numbers, and verify hardware condition prior to completing your cash payment.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Specifications & Guarantee Tabs */}
      <div className="border-t border-[#e0e0e0] pt-12">
        <div className="flex items-center gap-6 border-b border-[#f0f0f0] pb-3 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-[15px] pb-3 -mb-3 transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'font-semibold text-[#0066cc] border-b-2 border-[#0066cc]'
                : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
            }`}
          >
            Technical Specifications
          </button>

          <button
            onClick={() => setActiveTab('inspection')}
            className={`text-[15px] pb-3 -mb-3 transition-colors cursor-pointer ${
              activeTab === 'inspection'
                ? 'font-semibold text-[#0066cc] border-b-2 border-[#0066cc]'
                : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
            }`}
          >
            36-Point Inspection Checklist
          </button>

          <button
            onClick={() => setActiveTab('warranty')}
            className={`text-[15px] pb-3 -mb-3 transition-colors cursor-pointer ${
              activeTab === 'warranty'
                ? 'font-semibold text-[#0066cc] border-b-2 border-[#0066cc]'
                : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
            }`}
          >
            Egyptian Warranty Policy
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl text-[14px]">
            {product.specs && Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="p-3.5 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0] flex justify-between items-center">
                <span className="text-[#7a7a7a] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-semibold text-[#1d1d1f] text-right">{String(val)}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inspection' && (
          <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0] max-w-4xl space-y-4">
            <h4 className="font-semibold text-[#1d1d1f] text-[15px]">Salem Group Certified Hardware Standards</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-[#1d1d1f]">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Factory Serial Number Verification</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Battery Health Verification (100% or declared %)</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> True Tone & ProMotion Screen Testing</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> MagSafe & Thunderbolt Port Diagnostics</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Logic Board & Apple Silicon Stress Test</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> iCloud Clean & Factory Reset Certified</div>
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="p-6 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0] max-w-4xl space-y-3 text-[14px] text-[#1d1d1f]">
            <h4 className="font-semibold text-[#1d1d1f] text-[15px]">1-Year Salem Comprehensive Warranty</h4>
            <p className="text-[#7a7a7a] leading-relaxed text-[13px]">
              Every sealed product sold through Salem Group comes with full official manufacturer coverage alongside our direct on-site warranty in Cairo. If any manufacturing defect is discovered, our technical center handles immediate repair or unit replacement.
            </p>
            <p className="text-[#7a7a7a] leading-relaxed text-[13px]">
              Certified Pre-Owned devices include a 6-month full hardware warranty covering logic board, battery, and display components.
            </p>
          </div>
        )}
      </div>

      {/* 4. Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#e0e0e0] pt-16">
          <div className="mb-8">
            <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block mb-1">
              Complete Your Setup
            </span>
            <h2 className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight font-display">
              Related Devices in Cairo Stock
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="p-5 rounded-[18px] bg-white border border-[#e0e0e0] flex flex-col justify-between">
                <div>
                  <div className="w-full aspect-4/3 flex items-center justify-center p-2 mb-3">
                    <img src={rel.images[0]} alt={rel.title} className="w-full h-full object-contain apple-product-shadow" />
                  </div>
                  <h4 className="font-semibold text-[#1d1d1f] text-[15px]">{rel.title}</h4>
                  <p className="text-[12px] text-[#7a7a7a] mt-1 line-clamp-1">{rel.description}</p>
                </div>
                <div className="pt-4 mt-3 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="font-bold text-[#1d1d1f] text-[15px]">
                    {(rel.salePrice || rel.basePrice).toLocaleString()} EGP
                  </span>
                  <Link
                    href={`/products/${rel.slug}`}
                    className="px-3.5 py-1.5 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[12px] font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
