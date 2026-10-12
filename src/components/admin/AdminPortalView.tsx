'use client';

import React, { useState } from 'react';
import { AdminHeader, AdminTab } from './AdminHeader';
import { OverviewKPIs } from './OverviewKPIs';
import { ProductAnalyticsDashboard } from './ProductAnalyticsDashboard';
import { OrderPipeline } from './OrderPipeline';
import { InventoryManager } from './InventoryManager';
import { TradeInLeadsManager } from './TradeInLeadsManager';
import { StoreSettingsView } from './StoreSettingsView';
import { ProductType, OrderType, TradeInType, StoreSettingsType, AnalyticsSummary } from '@/types';

interface AdminPortalViewProps {
  initialProducts: ProductType[];
  initialOrders: OrderType[];
  initialLeads: TradeInType[];
  initialSettings: StoreSettingsType;
  initialAnalytics?: AnalyticsSummary;
  initialKPIs: {
    totalRevenue: number;
    totalOrders: number;
    activeOrders: number;
    deliveredOrders: number;
    totalProducts: number;
    pendingTradeIns: number;
    lowStockCount: number;
  };
  onBackToStore: () => void;
  onRefreshData?: () => void;
}

export function AdminPortalView({
  initialProducts,
  initialOrders,
  initialLeads,
  initialSettings,
  initialAnalytics,
  initialKPIs,
  onBackToStore,
  onRefreshData,
}: AdminPortalViewProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [kpis, setKpis] = useState(initialKPIs);
  const [settings, setSettings] = useState(initialSettings);

  const pendingOrdersCount = initialOrders.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING').length;
  const newLeadsCount = initialLeads.filter((l) => l.status === 'NEW_LEAD').length;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans">
      <AdminHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onBackToStore={onBackToStore}
        storeName={settings.storeName}
        pendingOrdersCount={pendingOrdersCount}
        newLeadsCount={newLeadsCount}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'overview' && (
          <OverviewKPIs kpis={kpis} onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'analytics' && (
          <ProductAnalyticsDashboard initialAnalytics={initialAnalytics} />
        )}

        {activeTab === 'orders' && (
          <OrderPipeline initialOrders={initialOrders} onOrderUpdated={onRefreshData} />
        )}

        {activeTab === 'inventory' && (
          <InventoryManager initialProducts={initialProducts} onProductsUpdated={onRefreshData} />
        )}

        {activeTab === 'tradeins' && (
          <TradeInLeadsManager initialLeads={initialLeads} />
        )}

        {activeTab === 'settings' && (
          <StoreSettingsView initialSettings={settings} onSettingsUpdated={setSettings} />
        )}
      </main>

      <footer className="border-t border-[#e0e0e0] bg-[#ffffff] py-6 px-4 text-center text-[12px] text-[#86868b]">
        <span> Salem Group Merchant Portal • Connected to Local PostgreSQL 18</span>
      </footer>
    </div>
  );
}
