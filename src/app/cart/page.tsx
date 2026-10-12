'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeItem, clearCart, cartSubtotal, currency, usdRate } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SALEM500') {
      setDiscount(500);
      setPromoMessage({ text: '500 EGP discount applied successfully!' });
    } else if (code === 'WELCOME') {
      const disc = Math.round(cartSubtotal * 0.03); // 3%
      setDiscount(disc);
      setPromoMessage({ text: `3% discount applied (${disc.toLocaleString()} EGP off)!` });
    } else {
      setDiscount(0);
      setPromoMessage({ text: 'Invalid promo code. Try SALEM500 or WELCOME.', error: true });
    }
  };

  const finalSubtotal = Math.max(0, cartSubtotal - discount);
  const displaySubtotal = currency === 'USD'
    ? Math.round(finalSubtotal / usdRate)
    : finalSubtotal;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#7a7a7a] mb-4">
          <ShoppingBag className="w-10 h-10 text-[#d2d2d7]" />
        </div>
        <h1 className="text-[30px] font-semibold text-[#1d1d1f] tracking-tight font-display">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-[15px] text-[#7a7a7a] max-w-md mx-auto mt-2 mb-8">
          Browse our verified in-stock Apple MacBooks, iPhones, iPads, and certified pre-owned devices.
        </p>
        <Link
          href="/collections/all"
          className="px-7 py-3.5 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-medium transition-colors"
        >
          Explore In-Stock Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 w-full flex-1">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-[#7a7a7a] mb-6">
        <Link href="/" className="hover:text-[#0066cc]">Home</Link>
        <span>/</span>
        <span className="text-[#1d1d1f] font-medium">Shopping Bag</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pb-6 border-b border-[#e0e0e0] mb-8">
        <div>
          <h1 className="text-[34px] sm:text-[40px] font-semibold text-[#1d1d1f] tracking-tight font-display">
            Shopping Bag
          </h1>
          <p className="text-[15px] text-[#7a7a7a] mt-1">
            Review your devices before completing your Cash on Delivery order.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-[13px] text-rose-600 hover:underline cursor-pointer"
        >
          Clear all items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-4">
            {cartItems.map((item, idx) => {
              const itemPrice = currency === 'USD'
                ? Math.round(item.price / usdRate)
                : item.price;
              const lineTotal = itemPrice * item.quantity;

              return (
                <div
                  key={`${item.productId}-${idx}`}
                  className="p-5 rounded-[18px] bg-white border border-[#e0e0e0] flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-20 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0] flex items-center justify-center p-2 shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain apple-product-shadow" />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-[#7a7a7a]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <Link href={item.slug ? `/products/${item.slug}` : '#'}>
                        <h3 className="font-semibold text-[#1d1d1f] text-[16px] hover:text-[#0066cc] transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-[13px] text-[#7a7a7a] mt-1">
                        {item.selectedColor || 'Standard'} {item.selectedStorage ? `• ${item.selectedStorage}` : ''}
                      </p>
                      <span className="text-[12px] font-semibold text-[#0066cc] block mt-1">
                        {item.condition === 'NEW_SEALED' ? 'Brand New Sealed' : 'Certified Pre-Owned'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#f0f0f0]">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#e0e0e0] rounded-full bg-white px-3 py-1">
                      <button
                        onClick={() => updateQuantity(idx, -1)}
                        className="text-[#7a7a7a] hover:text-[#1d1d1f] cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-semibold text-[13px] text-[#1d1d1f]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(idx, 1)}
                        className="text-[#7a7a7a] hover:text-[#1d1d1f] cursor-pointer"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price & Delete */}
                    <div className="text-right min-w-[100px]">
                      <span className="text-[16px] font-bold text-[#1d1d1f] block">
                        {currency === 'USD' ? `$${lineTotal.toLocaleString()}` : `${lineTotal.toLocaleString()} EGP`}
                      </span>
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-[12px] text-rose-600 hover:underline mt-0.5 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 text-[14px] text-[#0066cc] hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 rounded-[20px] bg-[#f5f5f7] border border-[#e0e0e0] p-6 space-y-6">
          <h2 className="text-[19px] font-semibold text-[#1d1d1f]">
            Order Summary
          </h2>

          <div className="space-y-3 text-[14px]">
            <div className="flex justify-between text-[#7a7a7a]">
              <span>Cart Subtotal</span>
              <span className="text-[#1d1d1f] font-semibold">
                {currency === 'USD' ? `$${Math.round(cartSubtotal / usdRate).toLocaleString()}` : `${cartSubtotal.toLocaleString()} EGP`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promo Discount</span>
                <span>-{discount.toLocaleString()} EGP</span>
              </div>
            )}

            <div className="flex justify-between text-[#7a7a7a]">
              <span>Cairo & Giza Delivery</span>
              <span className="text-emerald-600 font-semibold">Free Express</span>
            </div>

            <div className="flex justify-between text-[#7a7a7a]">
              <span>Payment Processing</span>
              <span className="text-[#1d1d1f]">Cash On Delivery (0 EGP)</span>
            </div>

            <div className="pt-3 border-t border-[#e0e0e0] flex justify-between items-baseline text-[16px]">
              <span className="font-semibold text-[#1d1d1f]">Total Amount</span>
              <span className="text-[22px] font-bold text-[#1d1d1f]">
                {currency === 'USD' ? `$${displaySubtotal.toLocaleString()}` : `${displaySubtotal.toLocaleString()} EGP`}
              </span>
            </div>
          </div>

          {/* Promo Code Form */}
          <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-[#e0e0e0]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. SALEM500)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-white border border-[#e0e0e0] rounded-full px-3.5 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium hover:bg-[#333333] cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-[12px] ${promoMessage.error ? 'text-rose-600' : 'text-emerald-600'}`}>
                {promoMessage.text}
              </p>
            )}
          </form>

          {/* Inspection Guarantee */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e0e0e0] text-[12px] text-[#7a7a7a] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
            <span>Unbox, verify the serial number, and test your device before handing cash to the courier.</span>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-3.5 px-6 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-medium transition-all apple-btn-active flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
