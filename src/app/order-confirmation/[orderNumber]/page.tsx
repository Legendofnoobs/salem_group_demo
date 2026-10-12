import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOrderByNumber } from '@/actions/orders';
import { CheckCircle2, MessageCircle, ShieldCheck, Truck, ArrowRight, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface OrderConfirmationPageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  const items = Array.isArray(order.items) ? order.items : [];
  const merchantWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '201002345678';

  const waText = encodeURIComponent(
    `*تأكيد طلب Salem Group*\n` +
    `رقم الطلب: #${order.orderNumber}\n` +
    `العميل: ${order.customerName}\n` +
    `العنوان: ${order.shippingAddress}, ${order.city}\n` +
    `المبلغ المطلوب للدفع عند الاستلام: ${order.totalAmount.toLocaleString()} EGP`
  );
  const whatsappUrl = `https://wa.me/${merchantWhatsapp}?text=${waText}`;

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-8 py-14 w-full flex-1 space-y-8">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[12px] font-bold text-[#0066cc] uppercase tracking-wider block">
          Order Successfully Placed
        </span>

        <h1 className="text-[34px] sm:text-[42px] font-semibold text-[#1d1d1f] tracking-tight font-display">
          Thank you, {order.customerName}!
        </h1>

        <p className="text-[16px] text-[#7a7a7a] max-w-lg mx-auto leading-relaxed">
          Your order has been registered in our Cairo logistics queue. We are preparing your devices for same-day inspection and dispatch.
        </p>
      </div>

      {/* Order Reference Card */}
      <div className="p-6 rounded-[22px] bg-[#f5f5f7] border border-[#e0e0e0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[12px] text-[#7a7a7a] uppercase font-semibold">Order Reference Number</span>
          <div className="text-[26px] font-bold text-[#1d1d1f] font-mono tracking-tight mt-0.5">
            #{order.orderNumber}
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[12px] text-[#7a7a7a] uppercase font-semibold">Estimated Delivery</span>
          <div className="text-[15px] font-semibold text-emerald-700 flex items-center gap-1.5 sm:justify-end mt-0.5">
            <Truck className="w-4 h-4" />
            <span>Within 24 to 48 Hours</span>
          </div>
        </div>
      </div>

      {/* Customer & Shipping Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-2">
          <h3 className="font-semibold text-[#1d1d1f] text-[15px]">Delivery Destination</h3>
          <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
            {order.shippingAddress}, {order.city}
          </p>
          <p className="text-[13px] text-[#1d1d1f] font-medium pt-1">
            Recipient: {order.customerName} ({order.customerPhone})
          </p>
        </div>

        <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-2">
          <h3 className="font-semibold text-[#1d1d1f] text-[15px]">Payment Summary</h3>
          <div className="text-[14px] text-[#7a7a7a]">
            Method: <strong className="text-[#1d1d1f]">Cash On Delivery (COD)</strong>
          </div>
          <div className="text-[18px] font-bold text-[#0066cc] pt-1">
            Total to Pay: {order.totalAmount.toLocaleString()} EGP
          </div>
        </div>
      </div>

      {/* Purchased Items List */}
      <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-4">
        <h3 className="font-semibold text-[#1d1d1f] text-[16px] pb-3 border-b border-[#f0f0f0]">
          Purchased Hardware ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h3>

        <div className="space-y-3 divide-y divide-[#f0f0f0]">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="pt-3 first:pt-0 flex justify-between items-center text-[14px]">
              <div>
                <span className="font-semibold text-[#1d1d1f] block">{item.title}</span>
                <span className="text-[12px] text-[#7a7a7a]">{item.variant || 'Standard'} • Qty {item.quantity}</span>
              </div>
              <span className="font-semibold text-[#1d1d1f]">
                {(item.price * item.quantity).toLocaleString()} EGP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Unboxing Reassurance Banner */}
      <div className="p-5 rounded-[20px] bg-[#f5f5f7] border border-[#e0e0e0] flex items-start gap-3.5 text-[13px] text-[#7a7a7a]">
        <ShieldCheck className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#1d1d1f] block mb-0.5">Important Courier Inspection Reminder:</strong>
          Our courier is instructed to wait while you inspect the device packaging and verify the authentic serial number before completing payment.
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-[15px] font-medium transition-all apple-btn-active flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Confirm on WhatsApp</span>
        </a>

        <Link
          href="/account"
          className="px-7 py-3.5 rounded-full bg-[#1d1d1f] hover:bg-[#333333] text-white text-[15px] font-medium transition-colors flex items-center justify-center gap-2"
        >
          <User className="w-4 h-4" />
          <span>Track in My Orders</span>
        </Link>

        <Link
          href="/collections/all"
          className="px-7 py-3.5 rounded-full border border-[#e0e0e0] hover:bg-[#f5f5f7] text-[#1d1d1f] text-[15px] font-medium transition-colors flex items-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
