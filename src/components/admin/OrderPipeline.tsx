'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
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
    { id: 'SHIPPED', label: 'Out for Delivery' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    const res = await updateOrderStatus(orderId, newStatus);
    setUpdatingId(null);

    if (res.success && res.order) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? res.order : o)));
      if (res.customerWhatsAppUrl) {
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
    <div className="space-y-6 text-[#1d1d1f]">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] font-display">
            Orders
          </h2>
          <p className="text-[17px] text-[#7a7a7a] mt-0.5">
            Manage dispatch status and message customers via WhatsApp.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search order #, customer, phone..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full sm:w-64 bg-[#f5f5f7] border border-[#e0e0e0] rounded-[9999px] px-4 py-2 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
        />
      </div>

      {/* Status Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {statuses.map((st) => (
          <button
            key={st.id}
            onClick={() => setStatusFilter(st.id)}
            className={`px-4 py-1.5 rounded-[9999px] text-[14px] font-normal transition-all apple-btn-active ${
              statusFilter === st.id
                ? 'bg-[#ffffff] text-[#1d1d1f] border-2 border-[#0071e3] font-semibold'
                : 'bg-[#ffffff] text-[#7a7a7a] border border-[#e0e0e0] hover:border-[#b0b0b5]'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="p-16 text-center rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#7a7a7a] text-[14px]">
          No orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
            const waCustomerPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;

            return (
              <div
                key={order.id}
                className="p-6 rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] space-y-4 hover:border-[#b0b0b5] transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#f0f0f0]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[17px] text-[#1d1d1f]">
                        {order.customerName}
                      </span>
                      <span className="text-[12px] font-mono px-2 py-0.5 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#7a7a7a]">
                        #{order.orderNumber}
                      </span>
                    </div>
                    <span className="text-[14px] text-[#7a7a7a] block mt-0.5">
                      {order.shippingAddress}, {order.city} • Channel: {order.trafficSource || 'Direct'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold px-3 py-1 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
                      {order.status}
                    </span>
                    <span className="text-[21px] font-semibold text-[#1d1d1f]">
                      {order.totalAmount.toLocaleString()} EGP
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1.5 text-[14px]">
                  {(order.items as any[]).map((item, idx) => (
                    <div key={idx} className="flex justify-between py-1 px-3 rounded-[8px] bg-[#f5f5f7]">
                      <span>{item.title} {item.variant ? `(${item.variant})` : ''} x{item.quantity}</span>
                      <span className="font-semibold text-[#1d1d1f]">{(item.price * item.quantity).toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="text-[12px] text-[#7a7a7a] italic">
                    "{order.notes}"
                  </p>
                )}

                {/* Actions & WhatsApp Contact */}
                <div className="pt-3 border-t border-[#f0f0f0] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#7a7a7a] mr-1">Status:</span>
                    {order.status !== 'CONFIRMED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'CONFIRMED')}
                        disabled={updatingId === order.id}
                        className="px-3 py-1 rounded-[9999px] text-[12px] font-normal bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] hover:bg-[#e0e0e0] apple-btn-active"
                      >
                        Confirm
                      </button>
                    )}
                    {order.status !== 'SHIPPED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'SHIPPED')}
                        disabled={updatingId === order.id}
                        className="px-3 py-1 rounded-[9999px] text-[12px] font-normal bg-[#0066cc] text-white hover:bg-[#0071e3] apple-btn-active"
                      >
                        Dispatch Courier
                      </button>
                    )}
                    {order.status !== 'DELIVERED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                        disabled={updatingId === order.id}
                        className="px-3 py-1 rounded-[9999px] text-[12px] font-normal bg-[#f5f5f7] border border-[#e0e0e0] text-[#34c759] hover:bg-[#e0e0e0] apple-btn-active"
                      >
                        Delivered & Paid
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="px-3 py-1.5 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] text-[12px] hover:bg-[#e0e0e0] flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>{order.customerPhone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${waCustomerPhone}?text=${encodeURIComponent(
                        `أهلاً ${order.customerName}، بخصوص طلبك #${order.orderNumber} من متجر Salem Group بمبلغ ${order.totalAmount.toLocaleString()} EGP (الدفع عند الاستلام مع المعاينة)...`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-[9999px] bg-[#0066cc] text-white text-[12px] font-normal hover:bg-[#0071e3] flex items-center gap-1.5 apple-btn-active"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
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
