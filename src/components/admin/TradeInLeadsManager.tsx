'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
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
    <div className="space-y-6 text-[#1d1d1f]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] font-display">
            Apple Trade-In Leads
          </h2>
          <p className="text-[17px] text-[#7a7a7a] mt-0.5">
            Valuation leads submitted by customers on the public storefront.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['ALL', 'NEW_LEAD', 'CONTACTED', 'INSPECTING', 'ACCEPTED', 'DECLINED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-[9999px] text-[12px] font-normal transition-all apple-btn-active ${
                statusFilter === st
                  ? 'bg-[#ffffff] text-[#1d1d1f] border-2 border-[#0071e3] font-semibold'
                  : 'bg-[#ffffff] text-[#7a7a7a] border border-[#e0e0e0] hover:border-[#b0b0b5]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-16 text-center rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#7a7a7a] text-[14px]">
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
                className="p-6 rounded-[18px] bg-[#ffffff] border border-[#e0e0e0] space-y-4 hover:border-[#b0b0b5] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[17px] font-semibold text-[#1d1d1f]">{lead.customerName}</h4>
                    <span className="text-[14px] text-[#7a7a7a] block">{lead.customerPhone}</span>
                  </div>

                  <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc]">
                    {lead.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3.5 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-1.5 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-[#7a7a7a]">Trade-In Device:</span>
                    <span className="font-semibold text-[#1d1d1f]">{lead.deviceModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7a7a7a]">Battery Health:</span>
                    <span className="font-semibold text-[#1d1d1f]">{lead.batteryHealth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7a7a7a]">Condition:</span>
                    <span className="text-[#1d1d1f]">{lead.physicalCondition}</span>
                  </div>
                  {lead.desiredUpgrade && (
                    <div className="flex justify-between pt-1 border-t border-[#e0e0e0]">
                      <span className="text-[#7a7a7a]">Upgrade target:</span>
                      <span className="text-[#0066cc] font-medium">{lead.desiredUpgrade}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[12px] text-[#7a7a7a] block">Estimated Value</span>
                    <span className="text-[21px] font-semibold text-[#1d1d1f]">
                      {lead.estimatedTradeValue.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.customerPhone}`}
                      className="p-2 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] hover:bg-[#e0e0e0]"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                    </a>

                    <a
                      href={`https://wa.me/${waCustomerPhone}?text=${encodeURIComponent(
                        `أهلاً ${lead.customerName}، بخصوص طلب استبدال جهازك (${lead.deviceModel}) في متجر Salem Group بمبلغ تقديري ${lead.estimatedTradeValue.toLocaleString()} EGP...`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-[9999px] bg-[#0066cc] text-white text-[12px] font-normal hover:bg-[#0071e3] flex items-center gap-1.5 apple-btn-active"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f0f0f0] flex items-center gap-1.5 text-[12px]">
                  <span className="text-[#7a7a7a] mr-1">Status:</span>
                  <button
                    onClick={() => handleStatusChange(lead.id, 'CONTACTED')}
                    className="px-2.5 py-0.5 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] hover:bg-[#e0e0e0]"
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleStatusChange(lead.id, 'ACCEPTED')}
                    className="px-2.5 py-0.5 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#34c759] hover:bg-[#e0e0e0]"
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
