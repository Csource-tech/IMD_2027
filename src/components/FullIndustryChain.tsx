"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Sprout,
  Flame,
  Utensils,
  Wheat,
  HeartPulse,
  Crown,
} from "lucide-react";

// Scroll reveal card wrapper
function ScrollRevealItem({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}

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
    scientificName: "Pleurotus spp. (Dhingri)",
    desc: "Commercial cultivation on pasteurized wheat and paddy straw with fast 20–25 day incubation cycles.",
    tag: "Agro-Waste Substrate",
    icon: Sprout,
  },
  {
    id: 2,
    title: "Milky Mushrooms",
    scientificName: "Calocybe indica (Dudh Chhata)",
    desc: "Indigenous tropical variety thriving in warm summers (30°–38°C) with extended 5–7 day ambient shelf life.",
    tag: "Tropical Warm Climate",
    icon: Flame,
  },
  {
    id: 3,
    title: "Shiitake Mushrooms",
    scientificName: "Lentinula edodes (Xianggu)",
    desc: "Global gourmet favorite grown on hardwood sawdust blocks with rich umami flavor and export demand.",
    tag: "Premium HoReCa & Export",
    icon: Utensils,
  },
  {
    id: 4,
    title: "Paddy Straw Mushrooms",
    scientificName: "Volvariella volvacea",
    desc: "Fastest-growing edible mushroom worldwide, transforming paddy stubble into tender protein-rich food.",
    tag: "10–14 Day Rapid Cycle",
    icon: Wheat,
  },
  {
    id: 5,
    title: "Medicinal & Functional Fungi",
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
        {/* Section Heading matching website theme */}
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-3xl font-medium text-black">
            Participating Industries
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            India&apos;s commercial Button Mushroom backbone alongside the six high-growth specialty sectors of Shroom Connect.
          </p>
        </div>

        {/* Two Separate Sections with Clean Partition in Between */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ========================================================================= */}
          {/* COLUMN 1: IMD INDUSTRIES (Button Mushrooms) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-3.5 lg:border-r lg:border-slate-200 lg:pr-8">
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

            {/* Clean Button Mushroom Card */}
            <ScrollRevealItem delay={50}>
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-[#f28822] transition-all duration-200">
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

                {/* 4-Step Chain with downward animated arrows */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1 text-[11px] font-medium text-slate-700">
                  <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                      1
                    </span>
                    <span>Bulk Phase I–III Composting &amp; High-Yield Spawn</span>
                  </div>

                  <div className="flex justify-center py-0.5 text-[#f28822] animate-bounce">
                    <ArrowDown className="w-3 h-3" />
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                      2
                    </span>
                    <span>Automated CEA Climate Rooms (16°C–18°C, 90% RH)</span>
                  </div>

                  <div className="flex justify-center py-0.5 text-[#f28822] animate-bounce">
                    <ArrowDown className="w-3 h-3" />
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                      3
                    </span>
                    <span>Mechanical &amp; Precision Hand Harvesting</span>
                  </div>

                  <div className="flex justify-center py-0.5 text-[#f28822] animate-bounce">
                    <ArrowDown className="w-3 h-3" />
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0 border border-slate-200">
                      4
                    </span>
                    <span>Pre-Cooling, Canning &amp; Cold-Chain Retail Supply</span>
                  </div>
                </div>
              </div>
            </ScrollRevealItem>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2: SHROOM CONNECT INDUSTRIES (6 Industries in 2-Col Grid) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-3.5">
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

            {/* 2-Column Grid with Unified Theme Styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {/* Row 1: Industries 1 & 2 */}
              {SHROOM_CONNECT_INDUSTRIES.slice(0, 2).map((industry, idx) => {
                const IconComponent = industry.icon;
                return (
                  <ScrollRevealItem key={industry.id} delay={idx * 50}>
                    <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#f28822] hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full group">
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
                    </div>
                  </ScrollRevealItem>
                );
              })}

              {/* Downward Chain Arrow Link between Row 1 and Row 2 */}
              <div className="col-span-1 sm:col-span-2 flex items-center justify-center gap-3 py-0.5">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#f28822] flex items-center justify-center shadow-2xs animate-bounce">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Row 2: Industries 3 & 4 */}
              {SHROOM_CONNECT_INDUSTRIES.slice(2, 4).map((industry, idx) => {
                const IconComponent = industry.icon;
                return (
                  <ScrollRevealItem key={industry.id} delay={idx * 50 + 50}>
                    <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#f28822] hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full group">
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
                    </div>
                  </ScrollRevealItem>
                );
              })}

              {/* Downward Chain Arrow Link between Row 2 and Row 3 */}
              <div className="col-span-1 sm:col-span-2 flex items-center justify-center gap-3 py-0.5">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#f28822] flex items-center justify-center shadow-2xs animate-bounce">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Row 3: Industries 5 & 6 */}
              {SHROOM_CONNECT_INDUSTRIES.slice(4, 6).map((industry, idx) => {
                const IconComponent = industry.icon;
                return (
                  <ScrollRevealItem key={industry.id} delay={idx * 50 + 100}>
                    <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#f28822] hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full group">
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
                    </div>
                  </ScrollRevealItem>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
