'use client';

import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-8 my-8 text-[#1d1d1f]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#f5f5f7] text-[#0066cc] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-[28px] font-semibold text-[#1d1d1f] mb-2 font-display">
              Trade-In Request Received
            </h3>
            <p className="text-[17px] text-[#7a7a7a] max-w-md mx-auto mb-6">
              Thank you, {customerName}. Salem Group technicians will contact you at {customerPhone} to inspect your device and apply your{' '}
              <span className="text-[#1d1d1f] font-semibold">{estimatedValue.toLocaleString()} EGP</span> trade-in credit toward your {desiredUpgrade}.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-[9999px] bg-[#0066cc] text-white text-[14px] font-normal hover:bg-[#0071e3] apple-btn-active"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
              Apple Trade In
            </span>
            <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] leading-[1.2] mb-1 font-display">
              Trade in your current device.
            </h2>
            <p className="text-[17px] text-[#7a7a7a] leading-[1.47] mb-6">
              Get an estimated value towards a new Apple device from Salem Group.
            </p>

            {/* Category selection in pills */}
            <div className="flex gap-2 mb-6">
              {(['iPhone', 'Mac', 'iPad', 'Watch'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setModel(modelOptions[cat][0]);
                  }}
                  className={`flex-1 py-2 px-3 rounded-[9999px] text-[14px] font-normal border transition-all apple-btn-active ${
                    category === cat
                      ? 'border-2 border-[#0071e3] bg-[#ffffff] font-semibold text-[#1d1d1f]'
                      : 'border border-[#e0e0e0] bg-[#ffffff] text-[#7a7a7a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Config Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[12px] text-[#7a7a7a] block mb-1">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                >
                  {modelOptions[category].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[12px] text-[#7a7a7a] block mb-1">Capacity</label>
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                >
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[12px] text-[#7a7a7a] mb-1">
                  <span>Battery Health:</span>
                  <span className="font-semibold text-[#1d1d1f]">{batteryHealth}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={batteryHealth}
                  onChange={(e) => setBatteryHealth(Number(e.target.value))}
                  className="w-full accent-[#0066cc] h-1.5 bg-[#e0e0e0] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#7a7a7a] block mb-1">Cosmetic Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                >
                  <option value="Flawless">Flawless (No scratches)</option>
                  <option value="Light Scratches">Light Scratches (Normal wear)</option>
                  <option value="Dents / Scratches">Dents or chips</option>
                </select>
              </div>
            </div>

            {/* Estimated Value Display Card */}
            <div className="p-5 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] flex items-center justify-between mb-6">
              <div>
                <span className="text-[12px] text-[#7a7a7a] uppercase tracking-[0.2px] block">
                  Estimated Trade-In Credit
                </span>
                <span className="text-[28px] font-semibold text-[#1d1d1f]">
                  {currency === 'USD' ? `$${displayVal.toLocaleString()}` : `${displayVal.toLocaleString()} EGP`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRecalculate}
                className="px-4 py-2 rounded-[9999px] bg-[#ffffff] border border-[#e0e0e0] text-[14px] text-[#0066cc] hover:border-[#0066cc] apple-btn-active"
              >
                {isCalculating ? 'Updating...' : 'Recalculate'}
              </button>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleSubmitLead} className="space-y-3 border-t border-[#f0f0f0] pt-4">
              <span className="text-[14px] font-semibold text-[#1d1d1f] block">
                Lock in your trade-in offer:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Phone Number"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[17px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all mt-3"
              >
                {isSubmitting ? 'Submitting...' : 'Apply Trade-In'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
