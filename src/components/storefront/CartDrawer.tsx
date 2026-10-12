'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, MessageCircle } from 'lucide-react';
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
      `*طلب من متجر Salem Group*\n\n` +
      `*المنتجات:*\n${itemsText}\n\n` +
      `*الإجمالي:* ${subtotal.toLocaleString()} EGP\n` +
      `*طريقة الدفع:* الدفع عند الاستلام (COD) مع المعاينة\n` +
      `برجاء تأكيد الموعد والتوصيل.`
    );
    window.open(`https://wa.me/${merchantWhatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] border-l border-[#e0e0e0] flex flex-col text-[#1d1d1f]">
          {/* Header */}
          <div className="p-6 border-b border-[#e0e0e0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1d1d1f]" />
              <h2 className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">
                Review your Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#7a7a7a] hover:text-[#1d1d1f]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[17px] text-[#7a7a7a] mb-6">
                  Your bag is empty.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-[9999px] bg-[#0066cc] text-white text-[14px] font-normal hover:bg-[#0071e3] apple-btn-active"
                >
                  Continue Shopping
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
                    className="p-4 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] flex gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-[8px] bg-[#ffffff] p-1 flex items-center justify-center flex-shrink-0 border border-[#e0e0e0]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#1d1d1f] line-clamp-1">
                          {item.title}
                        </h4>
                        <span className="text-[12px] text-[#7a7a7a] block mt-0.5">
                          {item.selectedColor} • {item.selectedStorage}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e0e0e0]">
                        <div className="flex items-center gap-1.5 bg-[#ffffff] rounded-[9999px] px-1 py-0.5 border border-[#e0e0e0]">
                          <button
                            onClick={() => onUpdateQuantity(idx, -1)}
                            className="p-1 text-[#7a7a7a] hover:text-[#1d1d1f]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-[12px] font-semibold px-1 text-[#1d1d1f]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, 1)}
                            className="p-1 text-[#7a7a7a] hover:text-[#1d1d1f]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[14px] font-semibold text-[#1d1d1f]">
                            {currency === 'USD' ? `$${displayItemPrice.toLocaleString()}` : `${displayItemPrice.toLocaleString()} EGP`}
                          </span>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-[#7a7a7a] hover:text-[#ff3b30]"
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

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#e0e0e0] bg-[#f5f5f7] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[17px] font-normal text-[#1d1d1f]">Total (COD):</span>
                <span className="text-[21px] font-semibold text-[#1d1d1f]">
                  {currency === 'USD' ? `$${displaySubtotal.toLocaleString()}` : `${displaySubtotal.toLocaleString()} EGP`}
                </span>
              </div>

              <div className="text-[12px] text-[#7a7a7a]">
                Includes free express delivery. Pay only upon inspection.
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[17px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all"
              >
                Check Out with COD
              </button>

              <button
                onClick={handleWhatsAppQuickOrder}
                className="w-full py-2.5 rounded-[9999px] bg-transparent text-[#0066cc] border border-[#0066cc] text-[14px] font-normal hover:bg-[#0066cc]/5 apple-btn-active transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick Order via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
