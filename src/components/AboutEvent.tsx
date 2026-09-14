"use client";

import { motion } from "framer-motion";
import { Building2, Handshake, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutEvent() {
  return (
    <section id="about" className="relative bg-[#faf9f5] py-20 sm:py-28 overflow-hidden border-b border-gray-200/80">
      {/* Background organic mycelium line accents */}
      <div className="absolute inset-0 mycelium-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84c52c]/15 border border-[#84c52c]/30 text-xs font-bold text-[#456b14] uppercase tracking-wider mb-4"
          >
            <span>Dual Gathering Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-gray-950 uppercase font-sans leading-[1.1]"
          >
            One Ecosystem. <br />
            <span className="font-serif italic font-normal text-gray-700 capitalize">
              Two Powerhouse Gatherings.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal"
          >
            Indian Mushroom Days (IMD 2027) bridges industrial-scale commercial cultivation with the specialized trade networks of Shroom Connect — creating a unified, seamless platform for the national and global fungi economy.
          </motion.p>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column (5 Cols): Editorial Photography & Historical Legacy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/90 h-full min-h-[420px] lg:min-h-[540px] group">
              <img
                src="/imdgallery/imd-2024-002-inauguration.png"
                alt="Inauguration Ceremony of Indian Mushroom Days"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Floating Bottom Caption Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f28822] block mb-1">
                  Established Industry Leadership
                </span>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                  Uniting government ministries, agricultural scientists, progressive commercial farm owners, and global technology exhibitors under one roof.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols): The Two Interconnected Event Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* PILLAR 1: INDIAN MUSHROOM DAYS (PRIMARY EXPO) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Header with Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f28822]/15 text-[#f28822] flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#f28822]">
                      Primary Gathering
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-950 leading-tight">
                      Indian Mushroom Days 2027 (IMD)
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-900 text-white shadow-xs">
                  Flagship Expo
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                India&apos;s apex commercial platform bringing together thousands of high-capacity button mushroom growers, certified spawn laboratories, Phase I–III bulk composting plants, and Controlled Environment Agriculture (CEA) climate systems.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84c52c] shrink-0" />
                  <span>100+ Tech &amp; Machinery Stalls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84c52c] shrink-0" />
                  <span>Automated Climate Computer Demos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84c52c] shrink-0" />
                  <span>Certified High-Yield Spawn Genetics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#84c52c] shrink-0" />
                  <span>National Grower Delegations</span>
                </div>
              </div>
            </motion.div>

            {/* Connecting Mycelium Filament Node */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-[#faf9f5] px-3 py-0.5 rounded-full border border-gray-200">
                Co-Located Knowledge &amp; Deal-Making
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {/* PILLAR 2: SHROOM CONNECT (SECONDARY CONCLAVE) */}
            <motion.div
              id="about-shroomconnect"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/20 to-white border border-orange-200/80 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Header with Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#84c52c]/20 text-[#68a01f] flex items-center justify-center font-bold">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#84c52c]">
                      Concurrent B2B Summit
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-950 leading-tight">
                      Shroom Connect 2027
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#f28822] text-white shadow-xs">
                  National Conclave
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                The high-level commercial deal-making conclave uniting specialty growers directly with supermarket procurement heads, HoReCa distributors, freeze-drying processors, and pharmaceutical nutraceutical extractors.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-orange-100 text-xs sm:text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f28822] shrink-0" />
                  <span>6 High-Growth Specialty Fungi Sectors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f28822] shrink-0" />
                  <span>Retail Supermarket Sourcing Roundtables</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f28822] shrink-0" />
                  <span>NHB 35%–50% Subsidy Financing Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f28822] shrink-0" />
                  <span>Nutraceutical Cordyceps &amp; Reishi Extraction</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
