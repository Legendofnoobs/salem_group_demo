'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function GlobalCartDrawer() {
  const router = useRouter();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    cartSubtotal,
    currency,
    usdRate,
  } = useCart();

  if (!isCartOpen) return null;

  const displaySubtotal = currency === 'USD'
    ? Math.round(cartSubtotal / usdRate)
    : cartSubtotal;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    router.push('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] border-l border-[#e0e0e0] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#f0f0f0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0066cc]" />
              <h2 className="text-[19px] font-semibold text-[#1d1d1f]">
                Shopping Bag ({cartItems.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#f5f5f7] text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-[#7a7a7a]">
                <ShoppingBag className="w-12 h-12 text-[#d2d2d7] mx-auto mb-3" />
                <p className="text-[16px] font-medium text-[#1d1d1f]">Your Bag is Empty</p>
                <p className="text-[13px] mt-1">Explore our in-stock hardware to get started.</p>
                <Link
                  href="/collections/all"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 inline-block px-5 py-2 rounded-full bg-[#0066cc] text-white text-[13px] font-medium hover:bg-[#0071e3] transition-colors"
                >
                  Shop In-Stock Devices
                </Link>
              </div>
            ) : (
              cartItems.map((item, idx) => {
                const itemPrice = currency === 'USD'
                  ? Math.round(item.price / usdRate)
                  : item.price;

                return (
                  <div
                    key={`${item.productId}-${item.variantId}-${idx}`}
                    className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0] flex gap-3.5 items-center"
                  >
                    <div className="w-16 h-16 bg-white rounded-xl border border-[#e0e0e0] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain apple-product-shadow"
                        />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-[#7a7a7a]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-semibold text-[#1d1d1f] truncate leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#7a7a7a] truncate mt-0.5">
                        {item.selectedColor || 'Standard'} {item.selectedStorage ? `• ${item.selectedStorage}` : ''}
                      </p>
                      <span className="text-[13px] font-semibold text-[#1d1d1f] block mt-1">
                        {currency === 'USD' ? `$${itemPrice.toLocaleString()}` : `${itemPrice.toLocaleString()} EGP`}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-[#7a7a7a] hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white border border-[#e0e0e0] rounded-full px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="text-[#7a7a7a] hover:text-[#1d1d1f] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[12px] font-semibold text-[#1d1d1f] min-w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="text-[#7a7a7a] hover:text-[#1d1d1f] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#f0f0f0] bg-[#ffffff] space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between text-[14px] text-[#7a7a7a]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1d1d1f]">
                    {currency === 'USD' ? `$${displaySubtotal.toLocaleString()}` : `${displaySubtotal.toLocaleString()} EGP`}
                  </span>
                </div>
                <div className="flex justify-between text-[12px] text-[#7a7a7a]">
                  <span>Cairo Express Delivery</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f5f5f7] border border-[#e0e0e0] text-[11px] text-[#1d1d1f]">
                <ShieldCheck className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>Cash On Delivery • Inspect device upon arrival before paying</span>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-medium transition-all apple-btn-active flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewCartClick}
                  className="w-full py-2.5 rounded-full border border-[#e0e0e0] hover:bg-[#f5f5f7] text-[#1d1d1f] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  View Full Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
