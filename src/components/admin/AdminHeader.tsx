'use client';

import React from 'react';
import { LayoutDashboard, BarChart3, Package, ShoppingCart, RefreshCw, Settings, Store, ShieldCheck } from 'lucide-react';

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
  const tabs: Array<{ id: AdminTab; label: string; icon: React.ReactNode; badge?: number }> = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analytics', label: 'Product Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'orders', label: 'COD Orders', icon: <ShoppingCart className="w-4 h-4" />, badge: pendingOrdersCount },
    { id: 'inventory', label: 'Inventory & Stock', icon: <Package className="w-4 h-4" /> },
    { id: 'tradeins', label: 'Trade-In Leads', icon: <RefreshCw className="w-4 h-4" />, badge: newLeadsCount },
    { id: 'settings', label: 'Store Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Portal Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20">
              
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-wide">
                  {storeName}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950 text-blue-400 border border-blue-500/30">
                  Merchant Portal
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 block">
                Cash On Delivery & Analytics Operations
              </span>
            </div>
          </div>

          {/* Return to Public Store */}
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 border border-white/15 text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span>Customer View</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-t border-white/5 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {Boolean(tab.badge && tab.badge > 0) && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === tab.id ? 'bg-red-500 text-white' : 'bg-red-950 text-red-400 border border-red-500/30'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
