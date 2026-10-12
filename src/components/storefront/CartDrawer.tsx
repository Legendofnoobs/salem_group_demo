'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { CartItemType } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  currency: 'EGP' | 'USD';
  usdRate: number;
  onProceedToCheckout: () => void;
  merchantWhatsapp?: string;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  usdRate,
  onProceedToCheckout,
  merchantWhatsapp = '201002345678',
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const displaySubtotal = currency === 'USD'
    ? Math.round(subtotal / usdRate)
    : subtotal;

  const handleWhatsAppQuickOrder = () => {
    if (items.length === 0) return;
    const itemsText = items.map((i) => `• ${i.title} (${i.selectedColor || ''} / ${i.selectedStorage || ''}) x${i.quantity} = ${i.price.toLocaleString()} EGP`).join('\n');
    const msg = encodeURIComponent(
      `*طلب شراء من متجر Salem Group*\n\n` +
      `*المنتجات:*\n${itemsText}\n\n` +
      `*الإجمالي:* ${subtotal.toLocaleString()} EGP\n` +
      `*طريقة الدفع:* الدفع عند الاستلام (COD) مع المعاينة\n` +
      `برجاء تأكيد الموعد والتوصيل.`
    );
    window.open(`https://wa.me/${merchantWhatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-white/10 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-base font-semibold text-white">Your Shopping Bag</h2>
              <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-medium">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-zinc-900 text-zinc-600 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Your bag is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-6">
                  Explore our collection of MacBooks, iPhones, and Certified Pre-Owned devices.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const itemTotal = item.price * item.quantity;
                const displayItemPrice = currency === 'USD'
                  ? Math.round(itemTotal / usdRate)
                  : itemTotal;

                return (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-zinc-950 p-1 flex items-center justify-center flex-shrink-0 border border-white/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-white line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                          {item.selectedColor && <span>{item.selectedColor}</span>}
                          {item.selectedStorage && <span>• {item.selectedStorage}</span>}
                        </div>
                        {item.condition !== 'NEW_SEALED' && item.batteryHealth && (
                          <span className="text-[10px] text-purple-400 block mt-0.5">
                            {item.batteryHealth}% Battery Health
                          </span>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1.5 bg-zinc-950 rounded-lg p-0.5 border border-white/10">
                          <button
                            onClick={() => onUpdateQuantity(idx, -1)}
                            className="p-1 rounded text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1.5 text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, 1)}
                            className="p-1 rounded text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-white">
                            {currency === 'USD' ? `$${displayItemPrice.toLocaleString()}` : `${displayItemPrice.toLocaleString()} EGP`}
                          </span>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-3">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Shipping:</span>
                <span className="text-emerald-400 font-semibold">Free Express Courier</span>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-semibold text-white">Total (COD):</span>
                <span className="text-xl font-bold text-white">
                  {currency === 'USD' ? `$${displaySubtotal.toLocaleString()}` : `${displaySubtotal.toLocaleString()} EGP`}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Cash on Delivery. Pay only after inspecting device.</span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Checkout (Cash On Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppQuickOrder}
                className="w-full py-2.5 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium hover:bg-emerald-600/30 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Quick Order via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
