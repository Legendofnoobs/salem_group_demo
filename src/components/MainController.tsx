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
    <div className="relative min-h-screen bg-black">
      {/* Floating Demo Mode Switcher Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 shadow-2xl flex items-center gap-2">
        <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider pl-1 hidden sm:inline">
          Demo Mode:
        </span>

        <button
          onClick={() => setViewMode('storefront')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'storefront'
              ? 'bg-white text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Store className="w-3.5 h-3.5 text-emerald-500" />
          <span>Customer Store</span>
        </button>

        <button
          onClick={() => setViewMode('admin')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'admin'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-blue-300" />
          <span>Merchant Admin & Analytics</span>
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
