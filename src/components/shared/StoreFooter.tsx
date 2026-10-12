'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';

export function StoreFooter() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-[#e0e0e0] pt-14 pb-10 px-4 sm:px-8 text-[#7a7a7a] text-[13px] mt-auto">
      <div className="max-w-[1240px] mx-auto space-y-10">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#e0e0e0]">
          {/* Col 1: Salem Group Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[14px]">
                SG
              </div>
              <span className="font-bold text-[16px] text-[#1d1d1f] tracking-tight">
                SALEM GROUP
              </span>
            </div>
            <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
              Egypt&apos;s premier independent retailer for authentic Apple hardware and certified pre-owned devices.
            </p>
            <div className="space-y-2 pt-1 text-[13px]">
              <div className="flex items-center gap-2 text-[#1d1d1f]">
                <MapPin className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>Building 14, Abbas El Akkad, Nasr City, Cairo</span>
              </div>
              <div className="flex items-center gap-2 text-[#1d1d1f]">
                <Phone className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>+20 100 234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-[#1d1d1f]">
                <Mail className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>support@salemgroup.eg</span>
              </div>
            </div>
          </div>

          {/* Col 2: Customer Guarantees & Orders */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[14px]">Customer Care</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link href="/account" className="hover:text-[#0066cc] transition-colors">
                  Order Tracking & Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#0066cc] transition-colors">
                  Shopping Bag & Checkout
                </Link>
              </li>
              <li>Cash On Delivery (All Egypt)</li>
              <li>Inspect Before Paying Courier</li>
              <li>1-Year Local Replacement Warranty</li>
              <li>Same-Day Cairo & Giza Dispatch</li>
            </ul>
          </div>

          {/* Col 3: Hardware Collections */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[14px]">Collections</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link href="/collections/mac" className="hover:text-[#0066cc] transition-colors">
                  MacBook Pro & MacBook Air
                </Link>
              </li>
              <li>
                <Link href="/collections/iphone" className="hover:text-[#0066cc] transition-colors">
                  iPhone 16 Pro & iPhone 15
                </Link>
              </li>
              <li>
                <Link href="/collections/ipad" className="hover:text-[#0066cc] transition-colors">
                  iPad Pro M4 & iPad Air
                </Link>
              </li>
              <li>
                <Link href="/collections/watch" className="hover:text-[#0066cc] transition-colors">
                  Apple Watch Ultra 2
                </Link>
              </li>
              <li>
                <Link href="/collections/airpods" className="hover:text-[#0066cc] transition-colors">
                  AirPods Pro 2 (USB-C)
                </Link>
              </li>
              <li>
                <Link href="/collections/pre-owned" className="hover:text-[#0066cc] transition-colors">
                  Certified Pre-Owned
                </Link>
              </li>
              <li>
                <Link href="/collections/sale" className="text-rose-600 font-medium hover:underline">
                  Special Promotions & Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[14px]">Company & Store</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link href="/pages/about" className="hover:text-[#0066cc] transition-colors">
                  About Salem Group
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-[#0066cc] transition-colors">
                  Showroom Locations & Contact
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#0066cc] transition-colors">
                  Catalog Search Engine
                </Link>
              </li>
              <li>Corporate & Fleet Procurement</li>
              <li>WhatsApp Dispatch Hotline</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright Notice */}
        <div className="space-y-3 text-[11px] leading-relaxed text-[#86868b]">
          <p>
            <strong>Notice:</strong> Cash On Delivery is supported across Cairo, Giza, Alexandria, and all Egyptian governorates. All customers possess the explicit right to inspect device exterior packaging and verify authentic serial numbers prior to payment completion.
          </p>
          <p>
            <strong>Trademark Disclaimer:</strong> Salem Group is an independent Egyptian retailer of consumer electronics. Apple, MacBook, MacBook Pro, MacBook Air, iPhone, iPad, Apple Watch, and AirPods are registered trademarks of Apple Inc., registered in the United States and other countries. Salem Group is an independent business and is not affiliated with, sponsored by, or officially endorsed by Apple Inc.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-[#e0e0e0]">
            <span>© 2026 Salem Group Egypt. All rights reserved. Commercial Registration #109482.</span>
            <div className="flex items-center gap-4">
              <span>Nasr City Showroom</span>
              <span>•</span>
              <span>New Cairo Showroom</span>
              <span>•</span>
              <span>Alexandria Logistics Hub</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
