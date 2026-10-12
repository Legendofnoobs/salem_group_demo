import React from 'react';
import { ContactForm } from './ContactForm';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Salem Group Cairo Showrooms',
  description: 'Reach Salem Group via WhatsApp, phone, email, or visit our Nasr City and New Cairo showrooms.',
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/201002345678?text=${encodeURIComponent('مرحباً، أود الاستفسار عن الأجهزة المتوفرة في متجر Salem Group.')}`;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 w-full flex-1 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block">
          Customer Service & Showrooms
        </span>
        <h1 className="text-[36px] sm:text-[44px] font-semibold text-[#1d1d1f] tracking-tight font-display">
          We&apos;re Here to Help.
        </h1>
        <p className="text-[16px] text-[#7a7a7a]">
          Connect with our Cairo sales and technical support specialists via WhatsApp, phone, or visit our showrooms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-[22px] border border-[#e0e0e0] p-8 sm:p-10 shadow-xs">
          <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-2">
            Send an Inquiry
          </h2>
          <p className="text-[14px] text-[#7a7a7a] mb-6">
            Our dispatch and technical team typically responds within 30 minutes during showroom hours.
          </p>

          <ContactForm />
        </div>

        {/* Right Column: Contact Channels & Showrooms */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Action Box */}
          <div className="p-6 rounded-[22px] bg-[#25D366]/10 border border-[#25D366]/20 space-y-3">
            <div className="flex items-center gap-2.5 text-[#128C7E] font-semibold text-[15px]">
              <MessageCircle className="w-5 h-5" />
              <span>Instant WhatsApp Desk</span>
            </div>
            <p className="text-[13px] text-[#48484a] leading-relaxed">
              For immediate questions about device availability, trade-in appraisals, or today&apos;s deliveries, message our Cairo dispatch desk directly.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-semibold transition-colors"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Showroom Direct Details */}
          <div className="p-6 rounded-[22px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-5">
            <h3 className="font-semibold text-[#1d1d1f] text-[16px]">Direct Contacts</h3>

            <div className="space-y-4 text-[14px]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0066cc] shrink-0 mt-1" />
                <div>
                  <span className="text-[#7a7a7a] text-[12px] block">Hotline & Customer Service</span>
                  <strong className="text-[#1d1d1f]">+20 100 234 5678</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0066cc] shrink-0 mt-1" />
                <div>
                  <span className="text-[#7a7a7a] text-[12px] block">Email Support</span>
                  <strong className="text-[#1d1d1f]">support@salemgroup.eg</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0066cc] shrink-0 mt-1" />
                <div>
                  <span className="text-[#7a7a7a] text-[12px] block">Working Hours</span>
                  <span className="text-[#1d1d1f]">Daily: 11:00 AM – 11:00 PM (Cairo Local Time)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Locations */}
          <div className="p-6 rounded-[22px] bg-white border border-[#e0e0e0] space-y-4">
            <h3 className="font-semibold text-[#1d1d1f] text-[16px]">Showroom Addresses</h3>

            <div className="space-y-3 text-[13px]">
              <div className="p-3.5 rounded-xl bg-[#f5f5f7] space-y-1">
                <div className="flex items-center gap-2 text-[#0066cc] font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Nasr City Flagship</span>
                </div>
                <p className="text-[#1d1d1f]">Building 14, Abbas El Akkad, Nasr City, Cairo</p>
                <p className="text-[#7a7a7a] text-[11px]">Opposite International Park</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f5f5f7] space-y-1">
                <div className="flex items-center gap-2 text-[#0066cc] font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>New Cairo Hub</span>
                </div>
                <p className="text-[#1d1d1f]">Street 90, 5th Settlement, New Cairo</p>
                <p className="text-[#7a7a7a] text-[11px]">Commercial District</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
