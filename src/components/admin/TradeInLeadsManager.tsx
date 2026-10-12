'use client';

import React, { useState } from 'react';
import { RefreshCw, Phone, MessageCircle, CheckCircle2, Clock, XCircle, ShieldCheck } from 'lucide-react';
import { TradeInType, TradeInStatus } from '@/types';
import { updateTradeInStatus } from '@/actions/tradeIns';

interface TradeInLeadsManagerProps {
  initialLeads: TradeInType[];
}

export function TradeInLeadsManager({ initialLeads }: TradeInLeadsManagerProps) {
  const [leads, setLeads] = useState<TradeInType[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<TradeInStatus | 'ALL'>('ALL');

  const handleStatusChange = async (id: string, newStatus: TradeInStatus) => {
    const res = await updateTradeInStatus(id, newStatus);
    if (res.success && res.lead) {
      setLeads((prev) => prev.map((l) => (l.id === id ? res.lead : l)));
    }
  };

  const filtered = leads.filter((l) => (statusFilter === 'ALL' ? true : l.status === statusFilter));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
            Customer Device Valuations & Trade-Ins
          </span>
          <h2 className="text-2xl font-bold text-white">Apple Trade-In Leads Inbox</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Leads generated from the public storefront calculator. Contact customers to finalize valuation and close upgrade orders.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['ALL', 'NEW_LEAD', 'CONTACTED', 'INSPECTING', 'ACCEPTED', 'DECLINED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-white text-black shadow-md'
                  : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-zinc-900/40 border border-white/10 text-zinc-500 text-xs">
          No trade-in leads currently matching this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((lead) => {
            const cleanPhone = lead.customerPhone.replace(/[^0-9]/g, '');
            const waCustomerPhone = cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone;

            return (
              <div
                key={lead.id}
                className="p-5 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-4 hover:border-zinc-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{lead.customerName}</h4>
                    <span className="text-xs text-zinc-400 block mt-0.5">{lead.customerPhone}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    lead.status === 'NEW_LEAD'
                      ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                      : lead.status === 'ACCEPTED'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {lead.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Trade-In Device:</span>
                    <span className="font-semibold text-white">{lead.deviceModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Battery Health:</span>
                    <span className="font-semibold text-emerald-400">{lead.batteryHealth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Cosmetic Condition:</span>
                    <span className="text-zinc-300">{lead.physicalCondition}</span>
                  </div>
                  {lead.desiredUpgrade && (
                    <div className="flex justify-between pt-1 border-t border-white/5">
                      <span className="text-zinc-400">Wants to buy:</span>
                      <span className="text-blue-400 font-medium">{lead.desiredUpgrade}</span>
                    </div>
                  )}
                </div>

                {/* Estimated Value & Action */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Estimated Credit</span>
                    <span className="text-lg font-bold text-emerald-400">
                      {lead.estimatedTradeValue.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.customerPhone}`}
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                    </a>

                    <a
                      href={`https://wa.me/${waCustomerPhone}?text=${encodeURIComponent(
                        `أهلاً ${lead.customerName}، بخصوص طلب استبدال جهازك (${lead.deviceModel}) في متجر Salem Group بمبلغ تقديري ${lead.estimatedTradeValue.toLocaleString()} EGP...`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-600/40 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Status Switcher buttons */}
                <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px]">
                  <span className="text-zinc-500 mr-1">Status:</span>
                  <button
                    onClick={() => handleStatusChange(lead.id, 'CONTACTED')}
                    className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleStatusChange(lead.id, 'INSPECTING')}
                    className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  >
                    Inspecting
                  </button>
                  <button
                    onClick={() => handleStatusChange(lead.id, 'ACCEPTED')}
                    className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 hover:bg-emerald-900"
                  >
                    Accepted
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
