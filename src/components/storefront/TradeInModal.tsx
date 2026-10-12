'use client';

import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Smartphone, Laptop, Tablet, Watch } from 'lucide-react';
import { calculateTradeInValue, submitTradeInLead } from '@/actions/tradeIns';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'EGP' | 'USD';
  usdRate: number;
}

export function TradeInModal({ isOpen, onClose, currency, usdRate }: TradeInModalProps) {
  if (!isOpen) return null;

  const [category, setCategory] = useState<'iPhone' | 'Mac' | 'iPad' | 'Watch'>('iPhone');
  const [model, setModel] = useState<string>('iPhone 14 Pro Max');
  const [storage, setStorage] = useState<string>('256GB');
  const [batteryHealth, setBatteryHealth] = useState<number>(88);
  const [condition, setCondition] = useState<'Flawless' | 'Light Scratches' | 'Dents / Scratches'>('Light Scratches');
  const [hasBox, setHasBox] = useState<boolean>(true);
  const [hasCharger, setHasCharger] = useState<boolean>(true);
  const [hasInvoice, setHasInvoice] = useState<boolean>(false);

  const [estimatedValue, setEstimatedValue] = useState<number>(27500);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Lead Submission
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [desiredUpgrade, setDesiredUpgrade] = useState<string>('iPhone 16 Pro');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const modelOptions: Record<string, string[]> = {
    iPhone: [
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15',
      'iPhone 14 Pro Max',
      'iPhone 14 Pro',
      'iPhone 14',
      'iPhone 13 Pro Max',
      'iPhone 13 Pro',
      'iPhone 13',
      'iPhone 12 Pro Max',
      'iPhone 12',
      'iPhone 11',
    ],
    Mac: [
      'MacBook Pro 16" M2 Pro',
      'MacBook Pro 14" M2 Pro',
      'MacBook Pro 14" M1 Pro',
      'MacBook Pro 13" M1',
      'MacBook Air 15" M2',
      'MacBook Air 13" M2',
      'MacBook Air 13" M1',
    ],
    iPad: [
      'iPad Pro 12.9" M2',
      'iPad Pro 11" M2',
      'iPad Air 5 M1',
      'iPad 10th Gen',
    ],
    Watch: [
      'Apple Watch Ultra 1',
      'Apple Watch Series 9',
      'Apple Watch Series 8',
    ],
  };

  const handleRecalculate = async () => {
    setIsCalculating(true);
    const val = await calculateTradeInValue({
      deviceCategory: category,
      deviceModel: model,
      storage,
      batteryHealth,
      physicalCondition: condition,
      hasBox,
      hasOriginalCharger: hasCharger,
      hasInvoice,
    });
    setEstimatedValue(val);
    setIsCalculating(false);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setIsSubmitting(true);
    const accessories = [];
    if (hasBox) accessories.push('Original Box');
    if (hasCharger) accessories.push('Original Charger');
    if (hasInvoice) accessories.push('Original Invoice');

    await submitTradeInLead({
      customerName,
      customerPhone,
      deviceCategory: category,
      deviceModel: `${model} (${storage})`,
      batteryHealth,
      physicalCondition: condition,
      accessoriesIncluded: accessories,
      estimatedTradeValue: estimatedValue,
      desiredUpgrade,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const displayVal = currency === 'USD'
    ? Math.round(estimatedValue / usdRate)
    : estimatedValue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Trade-In Request Received!</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Thank you, {customerName}. Salem Group technicians will contact you at{' '}
              <span className="text-white font-medium">{customerPhone}</span> to finalize your inspection and apply your{' '}
              <span className="text-emerald-400 font-bold">{estimatedValue.toLocaleString()} EGP</span> trade-in credit towards your {desiredUpgrade}.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <RefreshCw className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Salem Trade-In Engine
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Estimate Your Apple Device Value
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Upgrade to a new MacBook or iPhone. Get instant credit applied directly to your purchase.
            </p>

            {/* Category Switcher */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {(['iPhone', 'Mac', 'iPad', 'Watch'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setModel(modelOptions[cat][0]);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    category === cat
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {cat === 'iPhone' && <Smartphone className="w-3.5 h-3.5" />}
                  {cat === 'Mac' && <Laptop className="w-3.5 h-3.5" />}
                  {cat === 'iPad' && <Tablet className="w-3.5 h-3.5" />}
                  {cat === 'Watch' && <Watch className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            {/* Config Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Model */}
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1.5">
                  Device Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                >
                  {modelOptions[category].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Storage */}
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1.5">
                  Storage Capacity
                </label>
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                >
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                  <option value="16GB/512GB">16GB / 512GB (Mac)</option>
                  <option value="16GB/1TB">16GB / 1TB (Mac)</option>
                </select>
              </div>

              {/* Battery Health */}
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
                  <span>Battery Health:</span>
                  <span className="text-white font-semibold">{batteryHealth}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={batteryHealth}
                  onChange={(e) => setBatteryHealth(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Physical Condition */}
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1.5">
                  Cosmetic Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                >
                  <option value="Flawless">Flawless (No scratches)</option>
                  <option value="Light Scratches">Light Scratches (Normal use)</option>
                  <option value="Dents / Scratches">Dents or deep marks</option>
                </select>
              </div>
            </div>

            {/* Accessories Checkboxes */}
            <div className="flex flex-wrap gap-4 text-xs text-zinc-300 mb-6 p-3 rounded-xl bg-zinc-900/50 border border-white/5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBox}
                  onChange={(e) => setHasBox(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <span>Includes Original Box (+500 EGP)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCharger}
                  onChange={(e) => setHasCharger(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <span>Includes Original Charger (+800 EGP)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasInvoice}
                  onChange={(e) => setHasInvoice(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <span>Includes Purchase Invoice (+400 EGP)</span>
              </label>
            </div>

            {/* Estimated Value Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-zinc-900 border border-emerald-500/30 flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold tracking-wider block">
                  Estimated Trade-In Credit
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  {currency === 'USD' ? `$${displayVal.toLocaleString()}` : `${displayVal.toLocaleString()} EGP`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRecalculate}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition-colors"
              >
                {isCalculating ? 'Calculating...' : 'Recalculate'}
              </button>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleSubmitLead} className="space-y-3 border-t border-white/10 pt-4">
              <h4 className="text-xs font-semibold text-white">
                Claim this credit & lock in your quote:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp / Phone Number"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Desired Device to Buy (e.g. MacBook Pro 16 M3 Max, iPhone 16 Pro)"
                  value={desiredUpgrade}
                  onChange={(e) => setDesiredUpgrade(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Trade-In Request'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
