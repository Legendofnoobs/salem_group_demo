import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, MapPin, CheckCircle2, ArrowRight, HeartHandshake, Eye } from 'lucide-react';

export const metadata = {
  title: 'About Us | Salem Group Premium Electronics Egypt',
  description: 'Learn about Salem Group, Egypt’s independent retailer for genuine sealed Apple hardware and certified pre-owned devices.',
};

export default function AboutPage() {
  return (
    <div className="max-w-[1040px] mx-auto px-4 sm:px-8 py-14 w-full flex-1 space-y-16">
      {/* 1. Header Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block">
          About Salem Group • Cairo, Egypt
        </span>
        <h1 className="text-[38px] sm:text-[48px] font-semibold text-[#1d1d1f] tracking-tight leading-[1.08] font-display">
          Building Trust in Egyptian Tech Retail.
        </h1>
        <p className="text-[17px] text-[#7a7a7a] leading-relaxed">
          We founded Salem Group with a singular conviction: Egyptian customers deserve authentic electronics, transparent grading, and the unconditional right to inspect before paying.
        </p>
      </div>

      {/* 2. Brand Story Narrative */}
      <div className="p-8 sm:p-12 rounded-[24px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-6 text-[#1d1d1f]">
        <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight">
          The Origin Story
        </h2>
        <div className="space-y-4 text-[15px] text-[#48484a] leading-relaxed">
          <p>
            For years, purchasing high-end Apple products in Egypt carried unnecessary anxiety. Customers frequently faced inflated gray-market prices, unsealed packaging misrepresented as brand new, or pre-owned units with degraded aftermarket batteries.
          </p>
          <p>
            In 2019, Salem Group opened its first physical showroom on Abbas El Akkad in Nasr City, Cairo. We introduced the <strong>Courier Inspection Guarantee</strong>: the policy that no customer should ever pay cash on delivery until they have physically unboxed the device, checked the Apple factory serial number online, and confirmed its condition with the delivery agent.
          </p>
          <p>
            Today, Salem Group serves thousands of creative professionals, software engineers, and businesses across Cairo, Alexandria, and all Egyptian governorates.
          </p>
        </div>
      </div>

      {/* 3. Three Core Commitments */}
      <div className="space-y-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight font-display">
            The Salem Standards
          </h2>
          <p className="text-[14px] text-[#7a7a7a] mt-1">
            Principles that guide every shipment and showroom interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1d1d1f]">
              Guaranteed Factory Seals
            </h3>
            <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
              Every unit marked as Brand New Sealed is 100% pristine, untouched, and unactivated with full official international warranty coverage.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1d1d1f]">
              Inspect Before Cash Payment
            </h3>
            <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
              Our express delivery couriers are trained to wait patiently while you unbox and examine the product before completing cash collection.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-white border border-[#e0e0e0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1d1d1f]">
              1-Year Local Warranty
            </h3>
            <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
              In addition to global coverage, Salem Group provides direct hardware replacement and maintenance at our Cairo technical center.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Showrooms Presentation */}
      <div className="p-8 sm:p-12 rounded-[24px] bg-white border border-[#e0e0e0] space-y-8">
        <div>
          <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block">
            Visit Our Showrooms
          </span>
          <h2 className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight font-display mt-1">
            Physical Showrooms in Greater Cairo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-2">
            <div className="flex items-center gap-2 text-[#0066cc] font-semibold text-[14px]">
              <MapPin className="w-4 h-4" />
              <span>Nasr City Flagship Showroom</span>
            </div>
            <h4 className="font-semibold text-[#1d1d1f] text-[16px]">Building 14, Abbas El Akkad</h4>
            <p className="text-[13px] text-[#7a7a7a]">
              Opposite International Park, Nasr City, Cairo. Open daily from 11:00 AM to 11:00 PM.
            </p>
          </div>

          <div className="p-6 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-2">
            <div className="flex items-center gap-2 text-[#0066cc] font-semibold text-[14px]">
              <MapPin className="w-4 h-4" />
              <span>New Cairo Logistics & Trade Hub</span>
            </div>
            <h4 className="font-semibold text-[#1d1d1f] text-[16px]">Street 90, 5th Settlement</h4>
            <p className="text-[13px] text-[#7a7a7a]">
              Commercial District, New Cairo. Open daily from 12:00 PM to 10:00 PM.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-[#e0e0e0]">
          <span className="text-[13px] text-[#7a7a7a]">
            Commercial Registration No. 109482 • Tax Card Verified in Egypt
          </span>

          <Link
            href="/pages/contact"
            className="px-6 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-[#333333] text-white text-[13px] font-medium transition-colors"
          >
            Contact Customer Support
          </Link>
        </div>
      </div>
    </div>
  );
}
