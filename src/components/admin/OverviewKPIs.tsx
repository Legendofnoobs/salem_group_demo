'use client';

import React from 'react';
import { AdminTab } from './AdminHeader';

interface OverviewKPIsProps {
  kpis: {
    totalRevenue: number;
    totalOrders: number;
    activeOrders: number;
    deliveredOrders: number;
    totalProducts: number;
    pendingTradeIns: number;
    lowStockCount: number;
  };
  onNavigateTab: (tab: AdminTab) => void;
}

export function OverviewKPIs({ kpis, onNavigateTab }: OverviewKPIsProps) {
  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] font-display">
            Business Overview
          </h2>
          <p className="text-[17px] text-[#7a7a7a] mt-0.5">
            Real-time sales, cash on delivery dispatches, and inventory status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2 rounded-[9999px] bg-[#0066cc] text-white text-[14px] font-normal hover:bg-[#0071e3] apple-btn-active"
          >
            View Orders
          </button>
          <button
            onClick={() => onNavigateTab('analytics')}
            className="px-4 py-2 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] text-[14px] font-normal hover:bg-[#e0e0e0] apple-btn-active"
          >
            Product Analytics
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (store-utility-card: 18px radius, white, 1px hairline border, 24px padding) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gross Revenue */}
        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6 flex flex-col justify-between">
          <span className="text-[14px] text-[#7a7a7a] font-normal">
            Gross Revenue (COD)
          </span>
          <div className="mt-4">
            <span className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] block font-display">
              {kpis.totalRevenue.toLocaleString()} EGP
            </span>
            <span className="text-[12px] text-[#0066cc] font-medium block mt-1">
              Collected & In-Transit
            </span>
          </div>
        </div>

        {/* Active Deliveries */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6 flex flex-col justify-between cursor-pointer hover:border-[#b0b0b5] transition-colors"
        >
          <span className="text-[14px] text-[#7a7a7a] font-normal">
            Active Deliveries
          </span>
          <div className="mt-4">
            <span className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] block font-display">
              {kpis.activeOrders}
            </span>
            <span className="text-[12px] text-[#7a7a7a] block mt-1">
              Out for inspection & delivery
            </span>
          </div>
        </div>

        {/* Trade-In Leads */}
        <div
          onClick={() => onNavigateTab('tradeins')}
          className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6 flex flex-col justify-between cursor-pointer hover:border-[#b0b0b5] transition-colors"
        >
          <span className="text-[14px] text-[#7a7a7a] font-normal">
            Pending Trade-In Leads
          </span>
          <div className="mt-4">
            <span className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] block font-display">
              {kpis.pendingTradeIns}
            </span>
            <span className="text-[12px] text-[#7a7a7a] block mt-1">
              Customers awaiting call
            </span>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div
          onClick={() => onNavigateTab('inventory')}
          className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6 flex flex-col justify-between cursor-pointer hover:border-[#b0b0b5] transition-colors"
        >
          <span className="text-[14px] text-[#7a7a7a] font-normal">
            Low Stock Alerts
          </span>
          <div className="mt-4">
            <span className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] block font-display">
              {kpis.lowStockCount}
            </span>
            <span className="text-[12px] text-[#7a7a7a] block mt-1">
              ≤ 2 units in inventory
            </span>
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[18px] p-6">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            Delivered Orders
          </span>
          <span className="text-[21px] font-semibold text-[#1d1d1f]">
            {kpis.deliveredOrders} Completed
          </span>
        </div>

        <div className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[18px] p-6">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            Active Catalog
          </span>
          <span className="text-[21px] font-semibold text-[#1d1d1f]">
            {kpis.totalProducts} Apple Products
          </span>
        </div>

        <div className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[18px] p-6">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            Total Orders
          </span>
          <span className="text-[21px] font-semibold text-[#1d1d1f]">
            {kpis.totalOrders} Lifetime Orders
          </span>
        </div>
      </div>
    </div>
  );
}
