'use client';

import React, { useState } from 'react';
import { X, Search, ShieldCheck } from 'lucide-react';
import { getOrders } from '@/actions/orders';
import { OrderType } from '@/types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderTrackingModal({ isOpen, onClose }: OrderTrackingModalProps) {
  if (!isOpen) return null;

  const [searchVal, setSearchVal] = useState('');
  const [order, setOrder] = useState<OrderType | null>(null);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    setIsSearching(true);
    setSearched(true);

    const allOrders = await getOrders('ALL');
    const q = searchVal.trim().toUpperCase();
    const found = allOrders.find(
      (o) => o.orderNumber.toUpperCase() === q || o.customerPhone.includes(searchVal.trim())
    );

    setOrder(found || null);
    setIsSearching(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-8 my-8 text-[#1d1d1f]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
          Support & Delivery
        </span>
        <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] leading-[1.2] mb-1 font-display">
          Track Your Order
        </h2>
        <p className="text-[17px] text-[#7a7a7a] leading-[1.47] mb-6">
          Enter your order number or phone number to check dispatch status.
        </p>

        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="e.g. SLM-1042 or 0100..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="flex-1 bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-4 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[14px] font-normal hover:bg-[#0071e3] apple-btn-active"
          >
            {isSearching ? 'Checking...' : 'Track'}
          </button>
        </form>

        {searched && (
          <div>
            {order ? (
              <div className="p-5 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-3">
                <div className="flex justify-between items-center border-b border-[#e0e0e0] pb-2">
                  <div>
                    <span className="font-semibold text-[17px] text-[#1d1d1f]">
                      #{order.orderNumber}
                    </span>
                    <span className="text-[12px] text-[#7a7a7a] block">
                      {order.customerName} • {order.city}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-[9999px] text-[12px] font-semibold bg-[#ffffff] border border-[#e0e0e0] text-[#0066cc]">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-1 text-[14px]">
                  {(order.items as any[]).map((i, idx) => (
                    <div key={idx} className="flex justify-between text-[#1d1d1f]">
                      <span>{i.title} x{i.quantity}</span>
                      <span>{(i.price * i.quantity).toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#e0e0e0] flex justify-between text-[12px] text-[#7a7a7a]">
                  <span>Total COD: {order.totalAmount.toLocaleString()} EGP</span>
                  <span>Salem 1-Year Warranty</span>
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-[#7a7a7a] text-center py-4">
                No order found matching "{searchVal}". Please check your details.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
