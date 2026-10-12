'use client';

import React from 'react';
import { Menu, Store, ExternalLink, Sparkles, Clock } from 'lucide-react';
import { AdminTab } from './AdminHeader';

interface AdminTopbarProps {
  activeTab: AdminTab;
  onOpenMobileSidebar: () => void;
  onBackToStore: () => void;
  storeName?: string;
}

export function AdminTopbar({
  activeTab,
  onOpenMobileSidebar,
  onBackToStore,
  storeName = 'Salem Group',
}: AdminTopbarProps) {
  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    overview: {
      title: 'Store Executive Overview',
      subtitle: 'Real-time sales revenue, inventory volume, and pipeline metrics',
    },
    analytics: {
      title: 'Product Analytics & Zero-Result Searches',
      subtitle: 'Customer demand tracking, funnel conversion, and checkout drop-offs',
    },
    orders: {
      title: 'Cash On Delivery Orders',
      subtitle: 'Manage delivery progression, payment collection, and WhatsApp dispatches',
    },
    inventory: {
      title: 'Inventory & Product Photos',
      subtitle: 'Direct PostgreSQL 18 catalog management with Base64 image converter',
    },
    tradeins: {
      title: 'Apple Trade-In Leads',
      subtitle: 'Customer device valuations, inspection inquiries, and upgrade pipeline',
    },
    settings: {
      title: 'Merchant Store Settings',
      subtitle: 'Configure contact info, WhatsApp dispatch, warranty rules, and COD policies',
    },
  };

  const current = tabTitles[activeTab] || tabTitles.overview;

  return (
    <header className="sticky top-0 z-20 bg-[#ffffff]/85 backdrop-blur-md border-b border-[#e0e0e0]">
      <div className="px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile hamburger + Breadcrumb & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 rounded-xl text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-[#86868b] uppercase tracking-wider hidden sm:inline">
                Admin
              </span>
              <span className="text-[12px] text-[#d2d2d7] hidden sm:inline">/</span>
              <h2 className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
                {current.title}
              </h2>
            </div>
            <p className="text-[12px] text-[#86868b] hidden lg:block leading-none mt-0.5">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick actions & status */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[12px] text-[#1d1d1f]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Showroom Online</span>
          </div>

          <button
            onClick={onBackToStore}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0066cc] hover:bg-[#0077ed] text-[#ffffff] text-[13px] font-normal transition-all active:scale-[0.95] cursor-pointer shadow-sm"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>
        </div>
      </div>
    </header>
  );
}
