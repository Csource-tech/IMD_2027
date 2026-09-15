"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import SectionDivider from "./SectionDivider";

export default function AboutEvent() {
  return (
    <section id="about" className="relative bg-white py-14 sm:py-20 overflow-hidden border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Section Header - Uniform with all other sections */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight uppercase"
          >
            About The Event
          </motion.h2>
        </div>

        {/* 2-Column Grid: Left Overlapping Images (Bigger & Refined) + Right Both Events Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          {/* Left Column: Overlapping Dual-Image Composition (6 Cols - Prominent & Big) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative pb-12 sm:pb-14 pl-1 sm:pl-2 pr-1 sm:pr-2"
          >
            {/* Ambient Radial Glows */}
            <div className="absolute -top-6 -right-4 w-48 h-48 bg-[#f28822]/15 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-6 -left-4 w-40 h-40 bg-[#004aab]/10 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Main Primary Image (Inauguration Ceremony & Lamp Lighting - Previously Used) */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] max-h-[460px] sm:max-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-gray-100 group">
              <img
                src="/imdgallery/imd-2024-002-inauguration.png"
                alt="Inauguration Ceremony and Lamp Lighting at Indian Mushroom Days"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>

            {/* Secondary Overlapping Image (Conference Delegates & Audience) */}
            <div className="absolute -bottom-2 left-0 sm:-bottom-4 sm:left-1 w-48 sm:w-64 lg:w-72 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-[6px] border-white bg-white group/sub z-20">
              <img
                src="/imdgallery/imd-2024-001.jpg"
                alt="Audience and Industry Delegates at Indian Mushroom Days"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/sub:scale-105"
              />
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: Both Events Details (IMD & Shroom Connect) + Action Row (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Event 1: Indian Mushroom Days 2027 (IMD) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f5] border border-gray-200 shadow-xs hover:border-[#004aab]/40 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#004aab] border border-blue-200/60">
                  Commercial Expo
                </span>
                <span className="text-[11px] font-semibold text-gray-500">
                  19–21 Feb 2027
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 font-sans leading-snug">
                Indian Mushroom Days 2027 (IMD)
              </h3>

              <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                The apex commercial exhibition showcasing Controlled Environment Agriculture (CEA) climate chambers, automated bulk composting plants, cutting-edge machinery, and certified spawn biotechnology.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 pt-2.5 border-t border-gray-200/70 text-xs text-gray-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#004aab] shrink-0" />
                  <span>100+ Technology Stalls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#004aab] shrink-0" />
                  <span>Automated Climate Demos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#004aab] shrink-0" />
                  <span>High-Yield Spawn Labs</span>
                </div>
              </div>
            </div>

            {/* Event 2: Shroom Connect 2027 */}
            <div
              id="about-shroomconnect"
              className="p-4 sm:p-5 rounded-2xl bg-orange-50/40 border border-orange-200/80 shadow-xs hover:border-[#f28822]/50 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-100/70 text-[#f28822] border border-orange-200/80">
                  B2B Trade Conclave
                </span>
                <span className="text-[11px] font-semibold text-gray-500">
                  Direct Buyer Linkages
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 font-sans leading-snug">
                Shroom Connect 2027
              </h3>

              <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                The premier deal-making summit uniting growers directly with supermarket procurement heads, HoReCa distributors, freeze-drying processors, and National Horticulture Board subsidy advisors.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 pt-2.5 border-t border-orange-200/70 text-xs text-gray-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#f28822] shrink-0" />
                  <span>Retail &amp; Supermarket Sourcing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#f28822] shrink-0" />
                  <span>Specialty &amp; Medicinal Markets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#f28822] shrink-0" />
                  <span>NHB Subsidy Clinic</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Row: Pill Button + Secretariat Call Widget */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-2">
              <Link
                href="/visitor-register"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#f28822] hover:bg-[#d97416] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200/80 text-[#f28822] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block leading-tight">
                    Call Secretariat
                  </span>
                  <a
                    href="tel:+919810726996"
                    className="text-xs sm:text-sm font-bold text-gray-900 hover:text-[#f28822] transition-colors leading-tight"
                  >
                    +91 98107 26996
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
