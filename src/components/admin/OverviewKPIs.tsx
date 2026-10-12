'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Truck, Package, RefreshCw, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
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
      {/* Top Banner Overview */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Store Performance • PostgreSQL 18
          </span>
          <h2 className="text-2xl font-bold text-white">
            Salem Group Sales & Operations
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Managing cash on delivery dispatches, Apple inventory, customer trade-ins, and analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-md"
          >
            Manage COD Orders
          </button>
          <button
            onClick={() => onNavigateTab('analytics')}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 border border-white/10 text-white font-medium text-xs hover:bg-zinc-700 transition-colors"
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium">Gross Revenue (COD)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {kpis.totalRevenue.toLocaleString()} EGP
            </span>
            <span className="text-[11px] text-emerald-400 block mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Collected & In-Transit COD
            </span>
          </div>
        </div>

        {/* Active Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between cursor-pointer hover:border-zinc-500 transition-colors"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium">Active Dispatch Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {kpis.activeOrders}
            </span>
            <span className="text-[11px] text-blue-400 block mt-1 font-medium">
              Out for inspection & delivery
            </span>
          </div>
        </div>

        {/* Trade-In Leads */}
        <div
          onClick={() => onNavigateTab('tradeins')}
          className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between cursor-pointer hover:border-zinc-500 transition-colors"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium">Pending Trade-In Leads</span>
            <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {kpis.pendingTradeIns}
            </span>
            <span className="text-[11px] text-purple-400 block mt-1 font-medium">
              Customers waiting for valuation call
            </span>
          </div>
        </div>

        {/* Low Stock Warning */}
        <div
          onClick={() => onNavigateTab('inventory')}
          className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between cursor-pointer hover:border-zinc-500 transition-colors"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium">Low Stock Alerts</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {kpis.lowStockCount}
            </span>
            <span className="text-[11px] text-amber-400 block mt-1 font-medium">
              ≤ 2 units in stock (Needs re-order)
            </span>
          </div>
        </div>
      </div>

      {/* Quick Status Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-400">Delivered & Collected:</span>
            <span className="text-sm font-bold text-white block">{kpis.deliveredOrders} Orders</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-400">Total Live Catalog:</span>
            <span className="text-sm font-bold text-white block">{kpis.totalProducts} Apple Products</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-400">Total Lifetime Orders:</span>
            <span className="text-sm font-bold text-white block">{kpis.totalOrders} Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
}
