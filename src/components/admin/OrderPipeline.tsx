'use client';

import React, { useState } from 'react';
import { ShoppingCart, Truck, ShieldCheck, MessageCircle, Phone, CheckCircle2, Clock, XCircle, Search } from 'lucide-react';
import { OrderType, OrderStatus } from '@/types';
import { updateOrderStatus } from '@/actions/orders';

interface OrderPipelineProps {
  initialOrders: OrderType[];
  onOrderUpdated?: () => void;
}

export function OrderPipeline({ initialOrders, onOrderUpdated }: OrderPipelineProps) {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [searchVal, setSearchVal] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const statuses: Array<{ id: OrderStatus | 'ALL'; label: string }> = [
    { id: 'ALL', label: 'All Orders' },
    { id: 'PENDING', label: 'Pending Review' },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'SHIPPED', label: 'Out for Delivery (Collecting Cash)' },
    { id: 'DELIVERED', label: 'Delivered & Paid' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    const res = await updateOrderStatus(orderId, newStatus);
    setUpdatingId(null);

    if (res.success && res.order) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? res.order : o)));
      if (res.customerWhatsAppUrl) {
        // Open WhatsApp update link in new tab for merchant convenience!
        window.open(res.customerWhatsAppUrl, '_blank');
      }
      onOrderUpdated?.();
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        o.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Cash On Delivery Fulfillment Pipeline
          </span>
          <h2 className="text-2xl font-bold text-white">COD Orders & Deliveries</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Track customer shipments, trigger courier status, and send instant WhatsApp dispatch updates.
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search order #, customer, phone..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {statuses.map((st) => (
          <button
            key={st.id}
            onClick={() => setStatusFilter(st.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === st.id
                ? 'bg-white text-black shadow-md'
                : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-zinc-900/40 border border-white/10 text-zinc-500 text-xs">
          No orders matching current filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
            const waCustomerPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;

            return (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-4 hover:border-zinc-500 transition-colors"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-white">
                      #{order.orderNumber.replace('SLM-', '')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{order.customerName}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">
                          {order.orderNumber}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 block mt-0.5">
                        {order.shippingAddress}, {order.city} • via {order.trafficSource || 'Direct'}
                      </span>
                    </div>
                  </div>

                  {/* Right Status Badge & Total */}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'DELIVERED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : order.status === 'SHIPPED'
                        ? 'bg-blue-950 text-blue-400 border border-blue-500/40'
                        : order.status === 'CONFIRMED'
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                        : order.status === 'CANCELLED'
                        ? 'bg-red-950 text-red-400 border border-red-500/30'
                        : 'bg-zinc-800 text-zinc-300 border border-white/10'
                    }`}>
                      {order.status}
                    </span>

                    <span className="text-base font-bold text-white">
                      {order.totalAmount.toLocaleString()} EGP
                    </span>
                  </div>
                </div>

                {/* Items Row */}
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Ordered Devices:
                  </span>
                  {(order.items as any[]).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 px-3 rounded-lg bg-zinc-950/60 border border-white/5">
                      <span>{item.title} {item.variant ? `(${item.variant})` : ''} x{item.quantity}</span>
                      <span className="font-semibold text-white">{(item.price * item.quantity).toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="text-xs text-zinc-400 italic bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                    "{order.notes}"
                  </p>
                )}

                {/* Actions & WhatsApp Contact */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  {/* Status buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 mr-1">Update Status:</span>
                    {order.status !== 'CONFIRMED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'CONFIRMED')}
                        disabled={updatingId === order.id}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:bg-purple-900/60"
                      >
                        Confirm Order
                      </button>
                    )}
                    {order.status !== 'SHIPPED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'SHIPPED')}
                        disabled={updatingId === order.id}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-950/60 border border-blue-500/30 text-blue-300 hover:bg-blue-900/60"
                      >
                        Dispatch Courier
                      </button>
                    )}
                    {order.status !== 'DELIVERED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                        disabled={updatingId === order.id}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60"
                      >
                        Mark Delivered & Paid
                      </button>
                    )}
                    {order.status !== 'CANCELLED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                        disabled={updatingId === order.id}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-950/40 text-red-400 hover:bg-red-900/40"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Direct Contact Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">{order.customerPhone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${waCustomerPhone}?text=${encodeURIComponent(
                        `أهلاً ${order.customerName}، بخصوص طلبك #${order.orderNumber} من متجر Salem Group بمبلغ ${order.totalAmount.toLocaleString()} EGP (الدفع عند الاستلام مع المعاينة)...`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/40 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
