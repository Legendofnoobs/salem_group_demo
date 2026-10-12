'use client';

import React, { useState, useEffect } from 'react';
import { SearchX, BarChart3, TrendingUp, ShoppingCart, UserCheck, AlertOctagon, Share2, Eye, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { AnalyticsSummary } from '@/types';
import { getAnalyticsSummary } from '@/actions/analytics';

interface ProductAnalyticsDashboardProps {
  initialAnalytics?: AnalyticsSummary;
}

export function ProductAnalyticsDashboard({ initialAnalytics }: ProductAnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(initialAnalytics || null);
  const [loading, setLoading] = useState(!initialAnalytics);

  const fetchAnalytics = async () => {
    setLoading(true);
    const data = await getAnalyticsSummary();
    setAnalytics(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!initialAnalytics) {
      fetchAnalytics();
    }
  }, [initialAnalytics]);

  if (loading || !analytics) {
    return (
      <div className="p-12 text-center text-zinc-500">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-zinc-400" />
        <p className="text-xs">Loading analytics data from PostgreSQL 18...</p>
      </div>
    );
  }

  const { funnel, zeroResultSearches, productPerformance, trafficSourceConversions, recentAbandonedCheckouts } = analytics;

  return (
    <div className="space-y-8">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
            Product Intelligence & Conversion Funnel
          </span>
          <h2 className="text-2xl font-bold text-white">
            Product Analytics
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Tracking customer intent: unfulfilled searches, cart conversions, drop-offs, and social traffic sources.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-200 hover:text-white hover:border-zinc-500 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* 1. Funnel Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Views */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-medium">Product Views</span>
            <Eye className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <span className="text-xl font-bold text-white block">{funnel.totalViews}</span>
          <span className="text-[10px] text-zinc-500 mt-1 block">Catalog visits</span>
        </div>

        {/* Adds to Cart */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-medium">Add to Cart</span>
            <ShoppingCart className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="text-xl font-bold text-white block">{funnel.totalAddToCart}</span>
          <span className="text-[10px] text-purple-400 font-semibold mt-1 block">
            {funnel.addToCartRate}% Rate
          </span>
        </div>

        {/* Checkouts Initiated */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-medium">Checkout Started</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-xl font-bold text-white block">{funnel.checkoutsInitiated}</span>
          <span className="text-[10px] text-zinc-500 mt-1 block">Opened COD form</span>
        </div>

        {/* Abandoned Checkouts */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-medium">Abandonment</span>
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
          </div>
          <span className="text-xl font-bold text-white block">{funnel.checkoutsAbandoned}</span>
          <span className="text-[10px] text-red-400 font-semibold mt-1 block">
            {funnel.abandonmentRate}% Drop-off
          </span>
        </div>

        {/* Completed COD Orders */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-medium">COD Orders</span>
            <UserCheck className="w-3.5 h-3.5" />
          </div>
          <span className="text-xl font-bold text-white block">{funnel.checkoutsCompleted}</span>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
            {funnel.conversionRate}% Final Conv.
          </span>
        </div>
      </div>

      {/* 2. Zero-Result Searches (Demanded Products Not In Stock) */}
      <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <SearchX className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Searches with Zero Results (Unstocked Demand)
              </h3>
              <p className="text-[11px] text-zinc-400">
                Exact terms customers typed where 0 items matched. Stocking these devices unlocks instant revenue.
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 font-semibold">
            {zeroResultSearches.length} Unique Queries
          </span>
        </div>

        {zeroResultSearches.length === 0 ? (
          <div className="text-center py-8 text-xs text-zinc-500">
            No zero-result searches logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                  <th className="py-2.5 px-3">Search Query</th>
                  <th className="py-2.5 px-3">Frequency</th>
                  <th className="py-2.5 px-3">Traffic Sources</th>
                  <th className="py-2.5 px-3">Last Searched</th>
                  <th className="py-2.5 px-3 text-right">Action Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {zeroResultSearches.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                      <span className="text-amber-400">🔍</span>
                      <span>"{item.query}"</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-zinc-800 font-bold text-zinc-200">
                        {item.count} searches
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {item.trafficSources.map((s, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-zinc-400 text-[11px]">
                      {new Date(item.lastSearchedAt).toLocaleDateString()} {new Date(item.lastSearchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-500/20">
                        Stock Recommended
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Two Column Section: Traffic Source Conversions & Abandonment Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. Conversion by Traffic Source */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Conversion by Traffic Source</h3>
              <p className="text-[11px] text-zinc-400">Where buyers originate (WhatsApp campaigns, Instagram, Direct).</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                  <th className="py-2.5 px-2">Channel</th>
                  <th className="py-2.5 px-2">Visits</th>
                  <th className="py-2.5 px-2">COD Orders</th>
                  <th className="py-2.5 px-2">Revenue (EGP)</th>
                  <th className="py-2.5 px-2 text-right">Conv. Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {trafficSourceConversions.map((ch, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/40">
                    <td className="py-2.5 px-2 font-medium text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        ch.source === 'WhatsApp' ? 'bg-emerald-400' :
                        ch.source === 'Instagram' ? 'bg-pink-400' :
                        ch.source === 'TikTok' ? 'bg-cyan-400' :
                        ch.source === 'Google' ? 'bg-blue-400' : 'bg-zinc-400'
                      }`} />
                      <span>{ch.source}</span>
                    </td>
                    <td className="py-2.5 px-2 text-zinc-300">{ch.views}</td>
                    <td className="py-2.5 px-2 font-bold text-white">{ch.orders}</td>
                    <td className="py-2.5 px-2 text-zinc-300">{ch.revenue.toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-right">
                      <span className={`font-semibold ${ch.conversionRate > 20 ? 'text-emerald-400' : 'text-zinc-300'}`}>
                        {ch.conversionRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Checkout Abandonment Tracker */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Checkout Abandonment Log</h3>
                <p className="text-[11px] text-zinc-400">Sessions where customers opened COD checkout but left.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-red-400">
              {funnel.abandonmentRate}% Drop-Off
            </span>
          </div>

          {recentAbandonedCheckouts.length === 0 ? (
            <div className="text-center py-8 text-xs text-zinc-500">
              No recent abandoned checkouts logged.
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentAbandonedCheckouts.map((ab, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Cart: {ab.cartValue.toLocaleString()} EGP</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                        via {ab.trafficSource}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">
                      Stage: {ab.droppedAt} • {new Date(ab.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="text-[11px] text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/20 font-medium">
                    Unfinished COD
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Product Performance Table (Views to Add-to-Cart) */}
      <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Product Views & Add-To-Cart Rates</h3>
            <p className="text-[11px] text-zinc-400">Individual device demand metrics across the store.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                <th className="py-2.5 px-3">Product Name</th>
                <th className="py-2.5 px-3">Views</th>
                <th className="py-2.5 px-3">Adds to Cart</th>
                <th className="py-2.5 px-3 text-right">Add-to-Cart Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {productPerformance.map((item, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/40">
                  <td className="py-3 px-3 font-semibold text-white max-w-sm truncate">
                    {item.title}
                  </td>
                  <td className="py-3 px-3 text-zinc-300">{item.views}</td>
                  <td className="py-3 px-3 font-bold text-purple-400">{item.addsToCart}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`font-semibold ${item.addToCartRate > 40 ? 'text-emerald-400' : 'text-zinc-300'}`}>
                      {item.addToCartRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
