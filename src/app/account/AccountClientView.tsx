'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OrderType } from '@/types';
import { Package, Truck, Clock, CheckCircle2, ShieldCheck, Search, MessageCircle, MapPin, Phone, User } from 'lucide-react';

interface AccountClientViewProps {
  initialOrders: OrderType[];
}

export function AccountClientView({ initialOrders }: AccountClientViewProps) {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [searchVal, setSearchVal] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'warranties'>('orders');

  const filteredOrders = searchVal.trim()
    ? orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchVal.toLowerCase()) ||
          o.customerPhone.includes(searchVal) ||
          o.customerName.toLowerCase().includes(searchVal.toLowerCase())
      )
    : orders;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Delivered & Paid</span>;
      case 'SHIPPED':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">Out for Delivery</span>;
      case 'PROCESSING':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">Preparing Shipment</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-bold">Pending Review</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Account Overview Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#e0e0e0]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[18px]">
            SG
          </div>
          <div>
            <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#1d1d1f] tracking-tight font-display">
              Customer Account
            </h1>
            <p className="text-[13px] text-[#7a7a7a]">
              Saved Profile & Live Cash on Delivery Order Status
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-[#f5f5f7] p-1 rounded-full border border-[#e0e0e0] text-[13px]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
            }`}
          >
            My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
            }`}
          >
            Saved Details
          </button>
          <button
            onClick={() => setActiveTab('warranties')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              activeTab === 'warranties' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
            }`}
          >
            Warranties
          </button>
        </div>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Order Search Filter */}
          <div className="flex items-center gap-3 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Lookup by order # (e.g. SLM-1042) or phone..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-full pl-9 pr-4 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
              />
            </div>
            {searchVal && (
              <button
                onClick={() => setSearchVal('')}
                className="text-[12px] text-[#7a7a7a] hover:text-[#1d1d1f]"
              >
                Reset
              </button>
            )}
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 rounded-[20px] bg-[#f5f5f7] border border-[#e0e0e0] text-center space-y-2">
              <Package className="w-10 h-10 text-[#7a7a7a] mx-auto" />
              <h3 className="font-semibold text-[#1d1d1f] text-[16px]">No Orders Found</h3>
              <p className="text-[13px] text-[#7a7a7a]">You have not placed any orders matching this criteria.</p>
              <Link
                href="/collections/all"
                className="mt-3 inline-block px-5 py-2 rounded-full bg-[#0066cc] text-white text-[13px] font-medium"
              >
                Browse In-Stock Devices
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((ord) => {
                const items = Array.isArray(ord.items) ? ord.items : [];
                return (
                  <div
                    key={ord.id}
                    className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-4 hover:border-[#b0b0b5] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-[#f0f0f0]">
                      <div>
                        <span className="font-mono font-bold text-[#1d1d1f] text-[16px]">
                          #{ord.orderNumber}
                        </span>
                        <span className="text-[12px] text-[#7a7a7a] ml-3">
                          {new Date(ord.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusBadge(ord.status)}
                        <span className="text-[16px] font-bold text-[#1d1d1f]">
                          {ord.totalAmount.toLocaleString()} EGP
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                      <div>
                        <span className="text-[#7a7a7a] text-[11px] uppercase font-semibold block mb-1">
                          Items in Order ({items.length})
                        </span>
                        <div className="space-y-1">
                          {items.map((i: any, idx: number) => (
                            <div key={idx} className="text-[#1d1d1f]">
                              • <strong className="font-medium">{i.title}</strong> ({i.variant || 'Standard'}) x{i.quantity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[#7a7a7a] text-[11px] uppercase font-semibold block mb-1">
                          Delivery Address & Contact
                        </span>
                        <p className="text-[#1d1d1f]">{ord.shippingAddress}, {ord.city}</p>
                        <p className="text-[#7a7a7a]">{ord.customerName} • {ord.customerPhone}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-[12px]">
                      <span className="text-[#7a7a7a] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
                        Cash on Delivery • Inspection upon arrival
                      </span>

                      <a
                        href={`https://wa.me/201002345678?text=${encodeURIComponent(`مرحباً، أستفسر عن حالة طلبي رقم #${ord.orderNumber}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0066cc] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat about this order</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Profile */}
      {activeTab === 'profile' && (
        <div className="max-w-xl p-8 rounded-[20px] bg-white border border-[#e0e0e0] space-y-5 text-[14px]">
          <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Saved Customer Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f5f5f7]">
              <User className="w-4 h-4 text-[#0066cc]" />
              <div>
                <span className="text-[11px] text-[#7a7a7a] block">Primary Name</span>
                <strong className="text-[#1d1d1f]">Mohamed Tarek</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f5f5f7]">
              <Phone className="w-4 h-4 text-[#0066cc]" />
              <div>
                <span className="text-[11px] text-[#7a7a7a] block">Verified Egyptian Mobile</span>
                <strong className="text-[#1d1d1f]">+20 111 456 7890</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f5f5f7]">
              <MapPin className="w-4 h-4 text-[#0066cc]" />
              <div>
                <span className="text-[11px] text-[#7a7a7a] block">Default Shipping Address</span>
                <strong className="text-[#1d1d1f]">Villa 12, District 5, New Cairo, Egypt</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Warranties */}
      {activeTab === 'warranties' && (
        <div className="max-w-2xl p-8 rounded-[20px] bg-white border border-[#e0e0e0] space-y-4">
          <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Salem Active Warranty Certificates</h3>
          <p className="text-[13px] text-[#7a7a7a]">
            All hardware registered to your account is tracked with official local service coverage at our Cairo technical labs.
          </p>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[13px] text-emerald-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>MacBook Pro 16&quot; M3 Max — Active (Expires Oct 2027)</span>
            </div>
            <p className="text-[12px] text-emerald-800">
              Serial Number: C02H890MD6P • Full Cairo hardware replacement coverage active.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
