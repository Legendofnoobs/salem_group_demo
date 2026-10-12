'use client';

import React, { useState, useEffect } from 'react';
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
      <div className="py-24 text-center text-[#7a7a7a] text-[14px]">
        Loading analytics from PostgreSQL 18...
      </div>
    );
  }

  const { funnel, zeroResultSearches, productPerformance, trafficSourceConversions, recentAbandonedCheckouts } = analytics;

  return (
    <div className="space-y-8 text-[#1d1d1f]">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] font-display">
            Product Analytics & Intelligence
          </h2>
          <p className="text-[17px] text-[#7a7a7a] mt-0.5">
            Customer search demand, conversion funnel, drop-offs, and social traffic sources.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] text-[14px] font-normal hover:bg-[#e0e0e0] apple-btn-active"
        >
          Refresh Data
        </button>
      </div>

      {/* 1. Funnel Metrics (5 clean cards across) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-5">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            Product Views
          </span>
          <span className="text-[28px] font-semibold text-[#1d1d1f] block font-display">
            {funnel.totalViews}
          </span>
          <span className="text-[12px] text-[#7a7a7a] mt-1 block">Catalog views</span>
        </div>

        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-5">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            Added to Bag
          </span>
          <span className="text-[28px] font-semibold text-[#1d1d1f] block font-display">
            {funnel.totalAddToCart}
          </span>
          <span className="text-[12px] text-[#0066cc] font-semibold mt-1 block">
            {funnel.addToCartRate}% Rate
          </span>
        </div>

        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-5">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            Checkout Started
          </span>
          <span className="text-[28px] font-semibold text-[#1d1d1f] block font-display">
            {funnel.checkoutsInitiated}
          </span>
          <span className="text-[12px] text-[#7a7a7a] mt-1 block">Opened COD form</span>
        </div>

        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-5">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            Abandoned
          </span>
          <span className="text-[28px] font-semibold text-[#ff3b30] block font-display">
            {funnel.checkoutsAbandoned}
          </span>
          <span className="text-[12px] text-[#ff3b30] font-semibold mt-1 block">
            {funnel.abandonmentRate}% Drop-off
          </span>
        </div>

        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-5">
          <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
            COD Completed
          </span>
          <span className="text-[28px] font-semibold text-[#34c759] block font-display">
            {funnel.checkoutsCompleted}
          </span>
          <span className="text-[12px] text-[#34c759] font-semibold mt-1 block">
            {funnel.conversionRate}% Conv.
          </span>
        </div>
      </div>

      {/* 2. Zero-Result Searches (Demanded Products Not In Stock) */}
      <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h3 className="text-[21px] font-semibold text-[#1d1d1f] tracking-[0.231px]">
              Searches with Zero Results (Unstocked Demand)
            </h3>
            <p className="text-[14px] text-[#7a7a7a] mt-0.5">
              Exact terms typed by customers that returned 0 matching products.
            </p>
          </div>
          <span className="px-3 py-1 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] text-[12px] text-[#1d1d1f] font-semibold">
            {zeroResultSearches.length} Queries
          </span>
        </div>

        {zeroResultSearches.length === 0 ? (
          <div className="text-center py-12 text-[14px] text-[#7a7a7a]">
            No zero-result searches logged.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#e0e0e0] text-[#7a7a7a] text-[12px]">
                  <th className="py-3 px-3 font-semibold">Search Term</th>
                  <th className="py-3 px-3 font-semibold">Search Count</th>
                  <th className="py-3 px-3 font-semibold">Traffic Sources</th>
                  <th className="py-3 px-3 font-semibold">Last Searched</th>
                  <th className="py-3 px-3 font-semibold text-right">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {zeroResultSearches.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f5f5f7] transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-[#1d1d1f]">
                      "{item.query}"
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded-[9999px] bg-[#f5f5f7] border border-[#e0e0e0] font-semibold text-[12px]">
                        {item.count} searches
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {item.trafficSources.map((s, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded-[9999px] bg-[#f5f5f7] text-[#7a7a7a]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-[#7a7a7a] text-[12px]">
                      {new Date(item.lastSearchedAt).toLocaleDateString()} {new Date(item.lastSearchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="text-[12px] font-semibold text-[#0066cc]">
                        Stock Suggested
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Two Column Section: Traffic Source & Abandonment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Source Conversions */}
        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6">
          <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1">
            Conversion by Traffic Source
          </h3>
          <p className="text-[14px] text-[#7a7a7a] mb-4">
            Orders generated across social marketing channels.
          </p>

          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#e0e0e0] text-[#7a7a7a] text-[12px]">
                <th className="py-2.5 px-2 font-semibold">Channel</th>
                <th className="py-2.5 px-2 font-semibold">Visits</th>
                <th className="py-2.5 px-2 font-semibold">Orders</th>
                <th className="py-2.5 px-2 font-semibold">Revenue (EGP)</th>
                <th className="py-2.5 px-2 font-semibold text-right">Conv. %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {trafficSourceConversions.map((ch, idx) => (
                <tr key={idx} className="hover:bg-[#f5f5f7]">
                  <td className="py-3 px-2 font-medium text-[#1d1d1f]">{ch.source}</td>
                  <td className="py-3 px-2 text-[#7a7a7a]">{ch.views}</td>
                  <td className="py-3 px-2 font-semibold text-[#1d1d1f]">{ch.orders}</td>
                  <td className="py-3 px-2 text-[#7a7a7a]">{ch.revenue.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right font-semibold text-[#0066cc]">
                    {ch.conversionRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Abandonment Log */}
        <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-[17px] font-semibold text-[#1d1d1f]">
              Checkout Abandonment Log
            </h3>
            <span className="text-[14px] font-semibold text-[#ff3b30]">
              {funnel.abandonmentRate}% Drop-Off
            </span>
          </div>
          <p className="text-[14px] text-[#7a7a7a] mb-4">
            Sessions where customer opened COD form without ordering.
          </p>

          {recentAbandonedCheckouts.length === 0 ? (
            <p className="text-[14px] text-[#7a7a7a] py-6 text-center">
              No recent abandoned checkouts.
            </p>
          ) : (
            <div className="space-y-2.5">
              {recentAbandonedCheckouts.map((ab, idx) => (
                <div key={idx} className="p-3.5 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] flex justify-between items-center text-[14px]">
                  <div>
                    <span className="font-semibold text-[#1d1d1f] block">
                      Cart: {ab.cartValue.toLocaleString()} EGP
                    </span>
                    <span className="text-[12px] text-[#7a7a7a]">
                      via {ab.trafficSource} • {new Date(ab.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#ff3b30]">
                    Incomplete
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Performance Table */}
      <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6">
        <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1">
          Product Performance (Views to Add-to-Cart)
        </h3>
        <p className="text-[14px] text-[#7a7a7a] mb-4">
          Individual device demand across the catalog.
        </p>

        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-[#e0e0e0] text-[#7a7a7a] text-[12px]">
              <th className="py-2.5 px-3 font-semibold">Device</th>
              <th className="py-2.5 px-3 font-semibold">Views</th>
              <th className="py-2.5 px-3 font-semibold">Adds to Bag</th>
              <th className="py-2.5 px-3 font-semibold text-right">Add-to-Bag %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {productPerformance.map((p, idx) => (
              <tr key={idx} className="hover:bg-[#f5f5f7]">
                <td className="py-3 px-3 font-medium text-[#1d1d1f]">{p.title}</td>
                <td className="py-3 px-3 text-[#7a7a7a]">{p.views}</td>
                <td className="py-3 px-3 font-semibold text-[#1d1d1f]">{p.addsToCart}</td>
                <td className="py-3 px-3 text-right font-semibold text-[#0066cc]">
                  {p.addToCartRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
