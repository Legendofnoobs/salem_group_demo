'use client';

import React from 'react';
import { Store } from 'lucide-react';

export type AdminTab = 'overview' | 'analytics' | 'orders' | 'inventory' | 'tradeins' | 'settings';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onBackToStore: () => void;
  storeName?: string;
  pendingOrdersCount: number;
  newLeadsCount: number;
}

export function AdminHeader({
  activeTab,
  onSelectTab,
  onBackToStore,
  storeName = 'Salem Group',
  pendingOrdersCount,
  newLeadsCount,
}: AdminHeaderProps) {
  const tabs: Array<{ id: AdminTab; label: string; badge?: number }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Product Analytics' },
    { id: 'orders', label: 'Orders', badge: pendingOrdersCount },
    { id: 'inventory', label: 'Inventory' },
    { id: 'tradeins', label: 'Trade-In Leads', badge: newLeadsCount },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff] border-b border-[#e0e0e0]">
      {/* Top Bar */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-[52px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#1d1d1f]">
             {storeName} Merchant Portal
          </span>
          <span className="text-[12px] text-[#7a7a7a] font-normal hidden sm:inline border-l border-[#e0e0e0] pl-3">
            Local PostgreSQL 18
          </span>
        </div>

        <button
          onClick={onBackToStore}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[9999px] bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[12px] font-normal transition-colors"
        >
          <Store className="w-3.5 h-3.5" />
          <span>Customer View</span>
        </button>
      </div>

      {/* Navigation Tabs (Quiet underline tabs per Apple macOS / web guidelines) */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center gap-6 overflow-x-auto scrollbar-none border-t border-[#f0f0f0]">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`py-3 text-[14px] transition-colors relative whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'text-[#0066cc] font-semibold border-b-2 border-[#0066cc]'
                  : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
              }`}
            >
              <span>{tab.label}</span>
              {Boolean(tab.badge && tab.badge > 0) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#0066cc] text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
