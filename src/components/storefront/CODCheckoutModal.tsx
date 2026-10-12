'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, MessageCircle, Truck, ArrowRight, AlertCircle } from 'lucide-react';
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
    // If user closes modal without completing order, log checkout abandonment!
    if (!completedOrder) {
      await trackEvent({
        eventType: 'CHECKOUT_ABANDONED',
        sessionId,
        trafficSource,
        metadata: {
          cartValue: totalAmount,
          itemsCount: items.length,
          droppedAt: shippingAddress ? 'address_entered' : 'initial_open',
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
      notes: notes || 'Cash on Delivery. Inspection requested upon delivery.',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Order Confirmed • Cash On Delivery
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">
              Order #{completedOrder.orderNumber}
            </h3>

            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
              Thank you, {completedOrder.customerName}. Your order is registered in our Salem Group delivery pipeline. Our express courier will reach you at{' '}
              <span className="text-white font-medium">{completedOrder.shippingAddress}, {completedOrder.city}</span>.
            </p>

            {/* Inspection reminder */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 max-w-md mx-auto mb-6 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Salem Inspection Guarantee</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Please verify your device, test the screen, and check the serial number before paying{' '}
                <span className="text-white font-bold">{completedOrder.totalAmount.toLocaleString()} EGP</span> in cash to the courier.
              </p>
            </div>

            {/* WhatsApp Direct Notification */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-emerald-600 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="py-3 px-6 rounded-full bg-zinc-900 text-zinc-300 font-medium text-xs sm:text-sm hover:bg-zinc-800 transition-colors border border-white/10"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Cash On Delivery (COD)
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Complete Your Delivery Details
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              No online card required. Inspect and test your Apple device upon delivery before paying.
            </p>

            {/* Order Items Preview */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-white/5 mb-6 space-y-2">
              <div className="flex justify-between items-center text-xs text-zinc-400 font-medium pb-2 border-b border-white/5">
                <span>Items in Order ({items.length})</span>
                <span className="text-white font-bold">
                  {currency === 'USD' ? `$${displayTotal.toLocaleString()}` : `${displayTotal.toLocaleString()} EGP`}
                </span>
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1 scrollbar-none">
                {items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-zinc-300">
                    <span className="truncate max-w-[280px]">
                      {i.title} ({i.selectedStorage || ''}) x{i.quantity}
                    </span>
                    <span className="text-zinc-400">
                      {(i.price * i.quantity).toLocaleString()} EGP
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmed Rashed"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0100 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    City / Governorate *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-500"
                  >
                    <option value="Cairo">Cairo (القاهرة)</option>
                    <option value="Giza">Giza (الجيزة)</option>
                    <option value="Alexandria">Alexandria (الإسكندرية)</option>
                    <option value="Mansoura">Mansoura (المنصورة)</option>
                    <option value="Tanta">Tanta (طنطا)</option>
                    <option value="Zagazig">Zagazig (الزقازيق)</option>
                    <option value="Other">Other Governorate (محافظة أخرى)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="For warranty invoice receipt"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">
                  Detailed Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street name, building number, apartment/office"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">
                  Special Notes for Courier (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before arrival, deliver after 3 PM"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* Trust Badge */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-zinc-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">
                    Cash on Delivery Policy:
                  </span>
                  <span>
                    No prepayment required. You have the right to inspect the product, check the serial number, and test power-on before paying the courier.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                <span>{isSubmitting ? 'Registering Order...' : `Confirm Order (${totalAmount.toLocaleString()} EGP COD)`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
