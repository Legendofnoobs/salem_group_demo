'use client';

import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
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

  const getStepStatus = (step: string, currentStatus: string) => {
    const steps = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const currentIndex = steps.indexOf(currentStatus);
    const stepIndex = steps.indexOf(step);

    if (currentIndex >= stepIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <PackageCheck className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Salem Order Tracking
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Track Your Order & Warranty
        </h2>
        <p className="text-xs text-zinc-400 mb-6">
          Enter your Order Number (e.g. SLM-1042) or Phone Number to check dispatch and inspection status.
        </p>

        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="e.g. SLM-1042 or 0111..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
          >
            {isSearching ? 'Searching...' : 'Track'}
          </button>
        </form>

        {searched && (
          <div>
            {order ? (
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono font-bold text-white">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-0.5">
                      {order.customerName} • {order.city}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : order.status === 'SHIPPED'
                      ? 'bg-blue-950 text-blue-400 border border-blue-500/40 animate-pulse'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {order.status}
                  </span>
                </div>

                {/* Tracking Progress */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className={`p-2 rounded-lg border ${getStepStatus('PENDING', order.status) === 'completed' ? 'bg-blue-950/40 border-blue-500/30 text-blue-300' : 'bg-zinc-900/40 border-white/5 text-zinc-600'}`}>
                    <span>Registered</span>
                  </div>
                  <div className={`p-2 rounded-lg border ${getStepStatus('PROCESSING', order.status) === 'completed' ? 'bg-blue-950/40 border-blue-500/30 text-blue-300' : 'bg-zinc-900/40 border-white/5 text-zinc-600'}`}>
                    <span>Tested</span>
                  </div>
                  <div className={`p-2 rounded-lg border ${getStepStatus('SHIPPED', order.status) === 'completed' ? 'bg-blue-950/40 border-blue-500/30 text-blue-300' : 'bg-zinc-900/40 border-white/5 text-zinc-600'}`}>
                    <span>Out for Delivery</span>
                  </div>
                  <div className={`p-2 rounded-lg border ${getStepStatus('DELIVERED', order.status) === 'completed' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-zinc-900/40 border-white/5 text-zinc-600'}`}>
                    <span>Delivered</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-zinc-400 block">Items:</span>
                  {(order.items as any[]).map((i, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-zinc-300">
                      <span>{i.title} {i.variant ? `(${i.variant})` : ''} x{i.quantity}</span>
                      <span className="font-semibold text-white">{(i.price * i.quantity).toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>

                {/* COD & Warranty notes */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>COD Amount: {order.totalAmount.toLocaleString()} EGP</span>
                  </div>
                  <span className="text-zinc-500 text-[11px]">Salem 1-Yr Warranty Active</span>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center rounded-2xl bg-zinc-900/40 border border-white/5 text-xs text-zinc-400">
                No active order found matching <span className="text-white font-mono font-medium">"{searchVal}"</span>. Please double-check your order number or phone.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
