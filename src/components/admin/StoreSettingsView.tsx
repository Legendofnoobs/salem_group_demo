'use client';

import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StoreSettingsType } from '@/types';
import { updateStoreSettings } from '@/actions/settings';

interface StoreSettingsViewProps {
  initialSettings: StoreSettingsType;
  onSettingsUpdated?: (s: StoreSettingsType) => void;
}

export function StoreSettingsView({ initialSettings, onSettingsUpdated }: StoreSettingsViewProps) {
  const [settings, setSettings] = useState<StoreSettingsType>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateStoreSettings(settings);
    setIsSaving(false);
    if (res.success && res.settings) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onSettingsUpdated?.(res.settings as StoreSettingsType);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <span className="text-[12px] font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
          Store Configuration
        </span>
        <h2 className="text-[32px] font-semibold tracking-[-0.32px] text-[#1d1d1f]">Salem Group Store Settings</h2>
        <p className="text-[15px] text-[#86868b] mt-1">
          Update contact details, WhatsApp dispatch number, Cash On Delivery guidelines, and warranty policies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-[18px] bg-white border border-[#e0e0e0] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-[13px] font-normal text-[#86868b] block mb-1.5">
              Store / Merchant Name
            </label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[15px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-normal text-[#86868b] block mb-1.5">
              Store Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[15px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-[13px] font-normal text-[#86868b] block mb-1.5">
              WhatsApp Dispatch Number (Format: 20100...)
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[15px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] focus:bg-white font-mono transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-normal text-[#86868b] block mb-1.5">
              Customer Support Phone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[15px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-[13px] font-normal text-[#86868b] block mb-1.5">
            Showroom / Store Address
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[15px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label className="text-[13px] font-normal text-[#86868b] block mb-1.5">
            Cash On Delivery (COD) Policy & Trust Notice
          </label>
          <textarea
            rows={2}
            value={settings.paymentPolicy}
            onChange={(e) => setSettings({ ...settings, paymentPolicy: e.target.value })}
            className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[15px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors resize-none"
          />
        </div>

        <div>
          <label className="text-[13px] font-normal text-[#86868b] block mb-1.5">
            Warranty Coverage Terms
          </label>
          <input
            type="text"
            value={settings.warrantyTerms}
            onChange={(e) => setSettings({ ...settings, warrantyTerms: e.target.value })}
            className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[15px] text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[#e0e0e0]">
          {savedSuccess ? (
            <span className="text-[14px] font-medium text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Settings updated in PostgreSQL 18!
            </span>
          ) : (
            <span className="text-[13px] text-[#86868b]">
              Changes apply instantly across storefront.
            </span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full bg-[#0066cc] text-white font-normal text-[15px] hover:bg-[#0077ed] active:scale-[0.95] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
