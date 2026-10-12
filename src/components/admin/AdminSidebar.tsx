'use client';

import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  PackageCheck,
  Boxes,
  ArrowLeftRight,
  Settings,
  Store,
  Database,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { AdminTab } from './AdminHeader';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onBackToStore: () => void;
  storeName?: string;
  pendingOrdersCount: number;
  newLeadsCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  activeTab,
  onSelectTab,
  onBackToStore,
  storeName = 'Salem Group',
  pendingOrdersCount,
  newLeadsCount,
  isOpenMobile,
  onCloseMobile,
}: AdminSidebarProps) {
  const navItems: Array<{
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
  }> = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'analytics',
      label: 'Product Analytics',
      icon: TrendingUp,
    },
    {
      id: 'orders',
      label: 'COD Orders',
      icon: PackageCheck,
      badge: pendingOrdersCount,
      badgeColor: 'bg-[#0066cc] text-white',
    },
    {
      id: 'inventory',
      label: 'Inventory & Photos',
      icon: Boxes,
    },
    {
      id: 'tradeins',
      label: 'Trade-In Leads',
      icon: ArrowLeftRight,
      badge: newLeadsCount,
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'settings',
      label: 'Store Settings',
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#ffffff] border-r border-[#e0e0e0]">
      {/* Brand & Workspace Header */}
      <div className="p-6 border-b border-[#f0f0f0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[14px] shadow-xs">
              SG
            </span>
            <div>
              <h1 className="text-[15px] font-bold text-[#1d1d1f] leading-tight tracking-[-0.2px]">
                {storeName}
              </h1>
              <p className="text-[12px] text-[#86868b] leading-tight">
                Operations Center
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f5f5f7] flex items-center justify-between text-[11px] text-[#86868b]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            PostgreSQL 18 Connected
          </span>
          <span className="font-mono bg-[#f5f5f7] px-2 py-0.5 rounded text-[10px] text-[#1d1d1f]">
            v2.0 PRO
          </span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#86868b] block mb-2">
            Store Management
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all text-left ${
                    isSelected
                      ? 'bg-[#0066cc] text-[#ffffff] font-medium shadow-sm'
                      : 'text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0066cc]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#ffffff]' : 'text-[#86868b]'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {Boolean(item.badge && item.badge > 0) && (
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <ChevronRight className="w-3.5 h-3.5 text-white/80" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Insights Card */}
        <div className="p-4 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-2">
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#1d1d1f]">
            <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
            <span>Inspection Policy Active</span>
          </div>
          <p className="text-[11px] text-[#86868b] leading-relaxed">
            Customers have 100% right to unbox & inspect hardware before COD courier collection.
          </p>
        </div>
      </div>

      {/* Footer / Storefront Switcher */}
      <div className="p-4 border-t border-[#f0f0f0] space-y-2">
        <button
          onClick={onBackToStore}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-[13px] font-medium transition-colors cursor-pointer"
        >
          <Store className="w-4 h-4 text-[#0066cc]" />
          <span>View Public Storefront</span>
        </button>

        <div className="text-center pt-1 text-[11px] text-[#86868b]">
          <span>Nasr City Showroom • Cairo</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
