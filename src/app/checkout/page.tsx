'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createCODOrder } from '@/actions/orders';
import { getClientSessionId, detectTrafficSource } from '@/lib/session';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, clearCart, currency, usdRate } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [city, setCity] = useState('Cairo');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const egyptianCities = [
    'Cairo - Nasr City',
    'Cairo - New Cairo (5th Settlement)',
    'Cairo - Heliopolis',
    'Cairo - Maadi',
    'Cairo - Zamalek & Downtown',
    'Giza - Sheikh Zayed',
    'Giza - 6th of October',
    'Giza - Mohandessin & Dokki',
    'Alexandria',
    'Mansoura',
    'Tanta',
    'Port Said',
    'Ismailia',
  ];

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim()) {
      setErrorMsg('Please enter your full name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const sessionId = getClientSessionId();
      const trafficSource = detectTrafficSource();

      const payload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        shippingAddress: shippingAddress.trim(),
        city,
        items: cartItems.map((i) => ({
          title: i.title,
          variant: `${i.selectedColor || ''} / ${i.selectedStorage || ''}`,
          price: i.price,
          quantity: i.quantity,
          serialNumber: i.serialNumber || undefined,
        })),
        subtotal: cartSubtotal,
        shippingCost: 0,
        totalAmount: cartSubtotal,
        trafficSource,
        sessionId,
        notes: notes.trim() || 'Cash on delivery requested with hardware inspection.',
      };

      const res = await createCODOrder(payload);

      if (res.success && res.orderNumber) {
        clearCart();
        router.push(`/order-confirmation/${res.orderNumber}`);
      } else {
        setErrorMsg(res.error || 'Failed to complete order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during checkout.');
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <h2 className="text-[26px] font-semibold text-[#1d1d1f]">Your Bag is Empty</h2>
        <p className="text-[15px] text-[#7a7a7a] mt-2 mb-6">
          Add items to your bag before proceeding to checkout.
        </p>
        <Link
          href="/collections/all"
          className="px-6 py-2.5 rounded-full bg-[#0066cc] text-white text-[14px] font-medium"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 w-full flex-1">
      {/* Checkout Top Bar */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#e0e0e0]">
        <div className="flex items-center gap-3">
          <Link href="/cart" className="p-2 rounded-full hover:bg-[#f5f5f7] text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block">
              Salem Checkout Experience
            </span>
            <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#1d1d1f] tracking-tight font-display">
              Delivery & Payment
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>Encrypted COD Order</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Column */}
        <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[13px]">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-4">
            <h2 className="text-[17px] font-semibold text-[#1d1d1f] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-[12px] flex items-center justify-center font-bold">1</span>
              Customer Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmed Mahmoud"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1.5">
                  Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0100 123 4567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1.5">
                Email Address (Optional for e-Receipt)
              </label>
              <input
                type="email"
                placeholder="ahmed@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none transition-all"
              />
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-4">
            <h2 className="text-[17px] font-semibold text-[#1d1d1f] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-[12px] flex items-center justify-center font-bold">2</span>
              Delivery Address in Egypt
            </h2>

            <div>
              <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1.5">
                City / Region
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none transition-all cursor-pointer"
              >
                {egyptianCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1.5">
                Street, Building, Apartment, & Landmark <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Building 12, Street 9, Apt 4B, Near Citystars, Nasr City"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Section 3: Delivery & Payment Options */}
          <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-4">
            <h2 className="text-[17px] font-semibold text-[#1d1d1f] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-[12px] flex items-center justify-center font-bold">3</span>
              Delivery & Payment Method
            </h2>

            {/* Delivery option */}
            <div className="p-4 rounded-xl border-2 border-[#0066cc] bg-[#0066cc]/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#0066cc]" />
                <div>
                  <span className="text-[14px] font-semibold text-[#1d1d1f] block">
                    Salem Express Courier Delivery (24-48 Hours)
                  </span>
                  <span className="text-[12px] text-[#7a7a7a]">
                    Hand-delivered with unboxing inspection rights
                  </span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold text-[13px]">FREE</span>
            </div>

            {/* Payment Option: Cash On Delivery */}
            <div className="p-4 rounded-xl border-2 border-[#0066cc] bg-[#0066cc]/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-[14px] text-[#1d1d1f]">
                  <CheckCircle2 className="w-5 h-5 text-[#0066cc]" />
                  <span>Cash On Delivery (COD)</span>
                </div>
                <span className="text-[12px] font-bold text-[#0066cc]">Standard in Egypt</span>
              </div>
              <p className="text-[12px] text-[#7a7a7a] pl-7 leading-relaxed">
                Pay in cash directly to our courier upon arrival. You have the full right to inspect device exterior and verify serial numbers before payment.
              </p>
            </div>

            <div>
              <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1.5">
                Special Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Call before arrival, leave with security, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[16px] font-medium transition-all apple-btn-active flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Registering Order...' : 'Confirm Order with Cash On Delivery'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Right Rail: Order Summary */}
        <div className="lg:col-span-5 rounded-[20px] bg-[#f5f5f7] border border-[#e0e0e0] p-6 space-y-6">
          <h2 className="text-[18px] font-semibold text-[#1d1d1f]">
            Order Review ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
          </h2>

          <div className="space-y-3 divide-y divide-[#e0e0e0] max-h-[380px] overflow-y-auto pr-1">
            {cartItems.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white border border-[#e0e0e0] flex items-center justify-center p-1 shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain apple-product-shadow" />
                </div>
                <div className="flex-1 min-w-0 text-[13px]">
                  <h4 className="font-semibold text-[#1d1d1f] truncate">{item.title}</h4>
                  <p className="text-[#7a7a7a] text-[11px] truncate">{item.selectedColor} • {item.selectedStorage} • Qty {item.quantity}</p>
                  <span className="font-bold text-[#1d1d1f] mt-0.5 block">
                    {(item.price * item.quantity).toLocaleString()} EGP
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-[#e0e0e0] text-[14px]">
            <div className="flex justify-between text-[#7a7a7a]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1d1d1f]">{cartSubtotal.toLocaleString()} EGP</span>
            </div>
            <div className="flex justify-between text-[#7a7a7a]">
              <span>Cairo Delivery</span>
              <span className="text-emerald-600 font-semibold">Free Express</span>
            </div>
            <div className="flex justify-between text-[#7a7a7a]">
              <span>Payment Type</span>
              <span>Cash On Delivery</span>
            </div>

            <div className="pt-3 border-t border-[#e0e0e0] flex justify-between items-baseline text-[18px]">
              <span className="font-bold text-[#1d1d1f]">Amount Due</span>
              <span className="text-[22px] font-bold text-[#0066cc]">
                {cartSubtotal.toLocaleString()} EGP
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#e0e0e0] text-[12px] text-[#7a7a7a] space-y-1">
            <span className="font-semibold text-[#1d1d1f] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
              Inspection Guarantee
            </span>
            <p>Our courier is instructed to wait while you inspect the device box, check serial numbers, and verify hardware condition.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
