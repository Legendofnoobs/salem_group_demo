'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Availability & Pricing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0] text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Message Received</h3>
        <p className="text-[14px] text-[#7a7a7a] max-w-sm mx-auto">
          Thank you, {name}. Our Cairo showroom team will review your message and contact you at {phone}.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setName('');
            setPhone('');
            setMessage('');
          }}
          className="mt-3 px-5 py-2 rounded-full border border-[#0066cc] text-[#0066cc] text-[13px] font-medium hover:bg-[#0066cc]/5 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Mohamed Tarek"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none"
          />
        </div>

        <div>
          <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1">
            Phone / WhatsApp <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="0100 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1">
          Subject of Inquiry
        </label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none cursor-pointer"
        >
          <option value="Product Availability & Pricing">Product Availability & Pricing</option>
          <option value="Order Status & Dispatch Tracking">Order Status & Dispatch Tracking</option>
          <option value="Device Trade-In Appraisal">Device Trade-In Appraisal</option>
          <option value="Corporate / Fleet Procurement">Corporate / Fleet Procurement</option>
          <option value="Warranty & Technical Support">Warranty & Technical Support</option>
        </select>
      </div>

      <div>
        <label className="text-[13px] font-medium text-[#7a7a7a] block mb-1">
          Message Details <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          required
          placeholder="Please specify the device model, configuration, or order number..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[15px] font-medium transition-all apple-btn-active flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
      </button>
    </form>
  );
}
