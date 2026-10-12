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
    <div className="max-w-3xl space-y-6">
      <div>
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
          Store Configuration
        </span>
        <h2 className="text-2xl font-bold text-white">Salem Group Store Settings</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Update contact details, WhatsApp dispatch number, Cash On Delivery guidelines, and warranty policies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400 font-medium block mb-1">
              Store / Merchant Name
            </label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium block mb-1">
              Store Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400 font-medium block mb-1">
              WhatsApp Dispatch Number (Format: 20100...)
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium block mb-1">
              Customer Support Phone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-zinc-400 font-medium block mb-1">
            Showroom / Store Address
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 font-medium block mb-1">
            Cash On Delivery (COD) Policy & Trust Notice
          </label>
          <textarea
            rows={2}
            value={settings.paymentPolicy}
            onChange={(e) => setSettings({ ...settings, paymentPolicy: e.target.value })}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 font-medium block mb-1">
            Warranty Coverage Terms
          </label>
          <input
            type="text"
            value={settings.warrantyTerms}
            onChange={(e) => setSettings({ ...settings, warrantyTerms: e.target.value })}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {savedSuccess ? (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Settings updated in PostgreSQL 18!
            </span>
          ) : (
            <span className="text-[11px] text-zinc-500">
              Changes apply instantly across storefront.
            </span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
