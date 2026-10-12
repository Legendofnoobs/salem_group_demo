'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { CartItemType, OrderType } from '@/types';
import { createCODOrder } from '@/actions/orders';
import { trackEvent } from '@/actions/analytics';

interface CODCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onOrderSuccess: (order: OrderType) => void;
  currency: 'EGP' | 'USD';
  usdRate: number;
  sessionId: string;
  trafficSource: string;
}

export function CODCheckoutModal({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  currency,
  usdRate,
  sessionId,
  trafficSource,
}: CODCheckoutModalProps) {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [city, setCity] = useState('Cairo');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderType | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = subtotal;

  const handleClose = async () => {
    if (!completedOrder) {
      await trackEvent({
        eventType: 'CHECKOUT_ABANDONED',
        sessionId,
        trafficSource,
        metadata: {
          cartValue: totalAmount,
          itemsCount: items.length,
          droppedAt: shippingAddress ? 'address_entered' : 'checkout_open',
        },
      });
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !shippingAddress) return;

    setIsSubmitting(true);

    const payload = {
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      shippingAddress,
      city,
      items: items.map((i) => ({
        title: i.title,
        variant: `${i.selectedColor || ''} / ${i.selectedStorage || ''}`,
        price: i.price,
        quantity: i.quantity,
        serialNumber: i.serialNumber || undefined,
      })),
      subtotal,
      shippingCost: 0,
      totalAmount,
      trafficSource,
      sessionId,
      notes: notes || 'Cash on Delivery. Inspection upon delivery requested.',
    };

    const res = await createCODOrder(payload);

    setIsSubmitting(false);

    if (res.success && res.order) {
      setCompletedOrder(res.order);
      setWhatsappUrl(res.whatsappUrl);
      onOrderSuccess(res.order);
    }
  };

  const displayTotal = currency === 'USD'
    ? Math.round(totalAmount / usdRate)
    : totalAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-8 my-8 text-[#1d1d1f]">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {completedOrder ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#f5f5f7] text-[#0066cc] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-[0.2px] block mb-1">
              Order Confirmed • Cash On Delivery
            </span>
            <h3 className="text-[34px] font-semibold text-[#1d1d1f] mb-2 font-display">
              #{completedOrder.orderNumber}
            </h3>

            <p className="text-[17px] text-[#7a7a7a] max-w-md mx-auto mb-6">
              Thank you, {completedOrder.customerName}. Your order is registered in our Salem Group delivery queue for dispatch to{' '}
              <span className="text-[#1d1d1f] font-medium">{completedOrder.shippingAddress}, {completedOrder.city}</span>.
            </p>

            <div className="p-4 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] max-w-md mx-auto mb-6 text-left text-[14px]">
              <div className="flex items-center gap-2 font-semibold text-[#1d1d1f] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
                Inspection Policy
              </div>
              <p className="text-[12px] text-[#7a7a7a]">
                You have the right to inspect the product, check the serial number, and test it before paying{' '}
                <span className="text-[#1d1d1f] font-bold">{completedOrder.totalAmount.toLocaleString()} EGP</span> in cash to the courier.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-6 rounded-[9999px] bg-[#0066cc] text-[#ffffff] font-normal text-[17px] hover:bg-[#0071e3] apple-btn-active transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="py-3 px-6 rounded-[9999px] bg-[#f5f5f7] text-[#1d1d1f] font-normal text-[14px] hover:bg-[#e0e0e0] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
              Checkout
            </span>
            <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] leading-[1.2] mb-1 font-display">
              Where should we send your order?
            </h2>
            <p className="text-[17px] text-[#7a7a7a] leading-[1.47] mb-6">
              Cash on delivery. Inspect your device before payment.
            </p>

            {/* Items summary */}
            <div className="p-4 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] mb-6 space-y-1.5 text-[14px]">
              <div className="flex justify-between font-semibold pb-2 border-b border-[#e0e0e0]">
                <span>Total ({items.length} items):</span>
                <span>
                  {currency === 'USD' ? `$${displayTotal.toLocaleString()}` : `${displayTotal.toLocaleString()} EGP`}
                </span>
              </div>
              {items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-[12px] text-[#7a7a7a]">
                  <span>{i.title} ({i.selectedStorage || ''}) x{i.quantity}</span>
                  <span>{(i.price * i.quantity).toLocaleString()} EGP</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ahmed Rashed"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0100 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">City / Governorate</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  >
                    <option value="Cairo">Cairo (القاهرة)</option>
                    <option value="Giza">Giza (الجيزة)</option>
                    <option value="Alexandria">Alexandria (الإسكندرية)</option>
                    <option value="Mansoura">Mansoura (المنصورة)</option>
                    <option value="Other">Other Governorate</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="ahmed@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] text-[#7a7a7a] block mb-1">Detailed Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street, building number, apartment"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#7a7a7a] block mb-1">Delivery Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="Preferred delivery time, notes for courier"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[17px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all mt-4"
              >
                {isSubmitting ? 'Registering Order...' : `Confirm Order (${totalAmount.toLocaleString()} EGP COD)`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
