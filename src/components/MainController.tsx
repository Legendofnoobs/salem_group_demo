'use client';

import React, { useState } from 'react';
import { StorefrontView } from './storefront/StorefrontView';
import { AdminPortalView } from './admin/AdminPortalView';
import { ProductType, OrderType, TradeInType, StoreSettingsType, AnalyticsSummary } from '@/types';
import { LayoutDashboard, Store, Sparkles } from 'lucide-react';

interface MainControllerProps {
  initialProducts: ProductType[];
  initialOrders: OrderType[];
  initialLeads: TradeInType[];
  initialSettings: StoreSettingsType;
  initialAnalytics: AnalyticsSummary;
  initialKPIs: {
    totalRevenue: number;
    totalOrders: number;
    activeOrders: number;
    deliveredOrders: number;
    totalProducts: number;
    pendingTradeIns: number;
    lowStockCount: number;
  };
}

export function MainController({
  initialProducts,
  initialOrders,
  initialLeads,
  initialSettings,
  initialAnalytics,
  initialKPIs,
}: MainControllerProps) {
  const [viewMode, setViewMode] = useState<'storefront' | 'admin'>('storefront');

  return (
    <div className="relative min-h-screen bg-[#ffffff] text-[#1d1d1f]">
      {/* Floating Demo Mode Switcher Bar */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#1d1d1f]/90 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center gap-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <span className="text-[11px] text-[#86868b] font-medium uppercase tracking-wider px-2 hidden sm:inline">
          Demo View:
        </span>

        <button
          onClick={() => setViewMode('storefront')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-normal transition-all active:scale-[0.95] cursor-pointer ${
            viewMode === 'storefront'
              ? 'bg-[#ffffff] text-[#1d1d1f]'
              : 'text-[#a1a1a6] hover:text-[#ffffff]'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Customer Storefront</span>
        </button>

        <button
          onClick={() => setViewMode('admin')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-normal transition-all active:scale-[0.95] cursor-pointer ${
            viewMode === 'admin'
              ? 'bg-[#0066cc] text-[#ffffff]'
              : 'text-[#a1a1a6] hover:text-[#ffffff]'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Merchant Dashboard</span>
        </button>
      </div>

      {/* Active View Render */}
      {viewMode === 'storefront' ? (
        <StorefrontView
          initialProducts={initialProducts}
          usdRate={initialSettings.usdRate || 49.5}
          onToggleAdmin={() => setViewMode('admin')}
        />
      ) : (
        <AdminPortalView
          initialProducts={initialProducts}
          initialOrders={initialOrders}
          initialLeads={initialLeads}
          initialSettings={initialSettings}
          initialAnalytics={initialAnalytics}
          initialKPIs={initialKPIs}
          onBackToStore={() => setViewMode('storefront')}
        />
      )}
    </div>
  );
}
