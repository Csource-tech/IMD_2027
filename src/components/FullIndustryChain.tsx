"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Sprout,
  Flame,
  Utensils,
  Wheat,
  HeartPulse,
  Crown,
} from "lucide-react";

interface ShroomIndustry {
  id: number;
  title: string;
  scientificName: string;
  desc: string;
  tag: string;
  icon: React.ElementType;
}

const SHROOM_CONNECT_INDUSTRIES: ShroomIndustry[] = [
  {
    id: 1,
    title: "Oyster Mushrooms",
    scientificName: "Pleurotus ostreatus / florida",
    desc: "Rapid-substrate agro-waste cropping with low CAPEX and high culinary appeal for rural and urban micro-farms.",
    tag: "Agro-Waste Substrate Cropping",
    icon: Sprout,
  },
  {
    id: 2,
    title: "Milky Mushrooms",
    scientificName: "Calocybe indica",
    desc: "Tropical high-temperature resilience (30°C–38°C) offering extended post-harvest ambient shelf life.",
    tag: "Tropical High-Heat Tolerant",
    icon: Flame,
  },
  {
    id: 3,
    title: "Shiitake & Wood-Ear",
    scientificName: "Lentinula edodes / Auricularia",
    desc: "Hardwood sawdust block cultivation with high glutamate umami and premium market demand.",
    tag: "High-Value Gourmet & Dried",
    icon: Utensils,
  },
  {
    id: 4,
    title: "Paddy Straw Mushrooms",
    scientificName: "Volvariella volvacea",
    desc: "Fastest agricultural turnaround cropping utilizing harvested paddy straw beds across coastal states.",
    tag: "Rapid Agro-Cropping",
    icon: Wheat,
  },
  {
    id: 5,
    title: "Medicinal & Wellness Fungi",
    scientificName: "Cordyceps, Reishi & Lion's Mane",
    desc: "Sterile bioreactor cleanroom cultivation for nutraceutical extracts, wellness supplements, and health teas.",
    tag: "Nutraceutical Extracts",
    icon: HeartPulse,
  },
  {
    id: 6,
    title: "Exotic Gourmet & Specialty",
    scientificName: "Enoki, Shimeji, King Oyster & Morel",
    desc: "Automated bottle and cold fruiting chamber technology catering to tier-1 supermarkets and fine dining.",
    tag: "Modern Retail & Hospitality",
    icon: Crown,
  },
];

export default function FullIndustryChain() {
  return (
    <section
      id="industry-chain"
      className="py-12 sm:py-16 bg-white border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Section Heading matching website theme - FADES IN */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 text-center"
        >
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-3xl font-medium text-black">
            Participating Industries
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            India&apos;s commercial Button Mushroom backbone alongside the six high-growth specialty sectors of Shroom Connect.
          </p>
        </motion.div>

        {/* Two Separate Sections with Clean Partition in Between */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ========================================================================= */}
          {/* COLUMN 1: IMD INDUSTRIES (Button Mushrooms) - SLIDES IN FROM LEFT         */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-3.5 lg:border-r lg:border-slate-200 lg:pr-8"
          >
            {/* Header matching website typography */}
            <div className="pb-3 border-b-2 border-slate-900 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  IMD Industries
                </h3>
                <p className="text-xs text-slate-500">Commercial Core Segment</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                1 Core Industry
              </span>
            </div>

            {/* Clean Button Mushroom Card with Subtle Hover Lift */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-[#f28822] transition-all duration-200"
            >
              {/* Image */}
              <div className="rounded-lg overflow-hidden mb-3 border border-slate-100 relative group h-36">
                <img
                  src="/imdgallery/imd-2024-003.jpg"
                  alt="Button Mushroom Facility"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  75%+ National Volume
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 mb-1">
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  Button Mushrooms
                </h4>
                <span className="text-xs italic text-slate-500 font-medium">
                  Agaricus bisporus
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                India&apos;s primary commercial crop grown in automated CEA climate rooms for wholesale mandis, canning units, and modern retail.
              </p>

              {/* 4-Step Chain with downward steady arrows */}
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1 text-[11px] font-medium text-slate-700">
                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                    1
                  </span>
                  <span>Bulk Phase I–III Composting &amp; High-Yield Spawn</span>
                </div>

                <div className="flex justify-center py-0.5 text-[#f28822]">
                  <ArrowDown className="w-3 h-3" />
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                    2
                  </span>
                  <span>Automated CEA Climate Rooms (16°C–18°C, 90% RH)</span>
                </div>

                <div className="flex justify-center py-0.5 text-[#f28822]">
                  <ArrowDown className="w-3 h-3" />
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                    3
                  </span>
                  <span>Mechanical &amp; Precision Hand Harvesting</span>
                </div>

                <div className="flex justify-center py-0.5 text-[#f28822]">
                  <ArrowDown className="w-3 h-3" />
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                    4
                  </span>
                  <span>Pre-Cooling, Canning &amp; Cold-Chain Retail Supply</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================================================= */}
          {/* COLUMN 2: SHROOM CONNECT INDUSTRIES - SLIDES IN FROM RIGHT                */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-3.5"
          >
            {/* Header matching website typography */}
            <div className="pb-3 border-b-2 border-[#f28822] flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Shroom Connect Industries
                </h3>
                <p className="text-xs text-slate-500">Specialty &amp; Exotic Sectors</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-50 text-[#f28822] border border-orange-200">
                6 High-Growth Sectors
              </span>
            </div>

            {/* 2-Column Grid with Staggered Spring Pop-In Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {/* Row 1: Industries 1 & 2 */}
              {SHROOM_CONNECT_INDUSTRIES.slice(0, 2).map((industry, idx) => {
                const IconComponent = industry.icon;
                return (
                  <motion.div
                    key={industry.id}
                    initial={{ opacity: 0, scale: 0.88, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: idx * 0.08,
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#f28822] hover:shadow-xs transition-colors duration-200 flex flex-col justify-between h-full group cursor-default"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#f28822] border border-orange-100 flex items-center justify-center shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#f28822] transition-colors leading-tight">
                            {industry.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          0{industry.id}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic mb-1.5">
                        {industry.scientificName}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                        {industry.desc}
                      </p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200 w-fit">
                      {industry.tag}
                    </span>
                  </motion.div>
                );
              })}

              {/* Downward Chain Arrow Link between Row 1 and Row 2 */}
              <div className="col-span-1 sm:col-span-2 flex items-center justify-center gap-3 py-0.5">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#f28822] flex items-center justify-center shadow-2xs">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Row 2: Industries 3 & 4 */}
              {SHROOM_CONNECT_INDUSTRIES.slice(2, 4).map((industry, idx) => {
                const IconComponent = industry.icon;
                return (
                  <motion.div
                    key={industry.id}
                    initial={{ opacity: 0, scale: 0.88, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: idx * 0.08 + 0.1,
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#f28822] hover:shadow-xs transition-colors duration-200 flex flex-col justify-between h-full group cursor-default"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#f28822] border border-orange-100 flex items-center justify-center shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#f28822] transition-colors leading-tight">
                            {industry.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          0{industry.id}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic mb-1.5">
                        {industry.scientificName}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                        {industry.desc}
                      </p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200 w-fit">
                      {industry.tag}
                    </span>
                  </motion.div>
                );
              })}

              {/* Downward Chain Arrow Link between Row 2 and Row 3 */}
              <div className="col-span-1 sm:col-span-2 flex items-center justify-center gap-3 py-0.5">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#f28822] flex items-center justify-center shadow-2xs">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Row 3: Industries 5 & 6 */}
              {SHROOM_CONNECT_INDUSTRIES.slice(4, 6).map((industry, idx) => {
                const IconComponent = industry.icon;
                return (
                  <motion.div
                    key={industry.id}
                    initial={{ opacity: 0, scale: 0.88, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: idx * 0.08 + 0.2,
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#f28822] hover:shadow-xs transition-colors duration-200 flex flex-col justify-between h-full group cursor-default"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#f28822] border border-orange-100 flex items-center justify-center shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#f28822] transition-colors leading-tight">
                            {industry.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          0{industry.id}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic mb-1.5">
                        {industry.scientificName}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                        {industry.desc}
                      </p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200 w-fit">
                      {industry.tag}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
