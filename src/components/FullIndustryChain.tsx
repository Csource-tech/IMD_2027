"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Flame,
  Utensils,
  Wheat,
  HeartPulse,
  Crown,
  ArrowRight,
  Thermometer,
  Layers,
  TrendingUp,
} from "lucide-react";

interface SpeciesItem {
  id: string;
  title: string;
  scientificName: string;
  temp: string;
  substrate: string;
  commercialValue: string;
  desc: string;
  badge: string;
  icon: React.ElementType;
  image: string;
}

const SPECIALTY_SPECIES: SpeciesItem[] = [
  {
    id: "oyster",
    title: "Oyster Mushrooms",
    scientificName: "Pleurotus ostreatus / florida",
    temp: "20°C – 28°C",
    substrate: "Paddy straw & wheat agro-waste",
    commercialValue: "High consumer turnover",
    desc: "Low CAPEX rapid substrate cropping converting agricultural waste into protein-dense harvest in just 21 days for urban and rural micro-farms.",
    badge: "Agro-Waste Upcycling",
    icon: Sprout,
    image: "/species/oyster.jpg",
  },
  {
    id: "milky",
    title: "Milky Mushrooms",
    scientificName: "Calocybe indica",
    temp: "30°C – 38°C",
    substrate: "Sterilized straw beds",
    commercialValue: "Extended ambient shelf life",
    desc: "Indigenous tropical powerhouse thriving in Indian peak summer temperatures with remarkable 4–5 days ambient post-harvest shelf resilience.",
    badge: "Tropical Heat-Tolerant",
    icon: Flame,
    image: "/species/milky.jpg",
  },
  {
    id: "shiitake",
    title: "Shiitake & Wood-Ear",
    scientificName: "Lentinula edodes / Auricularia",
    temp: "15°C – 22°C",
    substrate: "Hardwood sawdust & wheat bran",
    commercialValue: "Premium HoReCa demand",
    desc: "Savory umami-dense gourmet variety cultivated on sterilized sawdust blocks, commanding top dollar in fine dining and dried export markets.",
    badge: "Gourmet & Umami Rich",
    icon: Utensils,
    image: "/species/shiitake.jpg",
  },
  {
    id: "paddy-straw",
    title: "Paddy Straw Mushrooms",
    scientificName: "Volvariella volvacea",
    temp: "28°C – 35°C",
    substrate: "Fresh harvested paddy straw",
    commercialValue: "Rapid cash turnaround",
    desc: "The fastest cropping cycle in agriculture (harvestable within 12–14 days), ideally suited for coastal and humid agrarian heartlands.",
    badge: "Fastest 14-Day Cycle",
    icon: Wheat,
    image: "/species/paddy-straw.jpg",
  },
  {
    id: "medicinal",
    title: "Medicinal & Wellness Fungi",
    scientificName: "Cordyceps militaris, Reishi & Lion's Mane",
    temp: "18°C – 24°C (HEPA Cleanroom)",
    substrate: "Sterile liquid & solid bioreactors",
    commercialValue: "Highest margin / gram",
    desc: "Pharmaceutical & nutraceutical superstars cultivated under ultra-pure sterile conditions for immune-boosting beta-glucans and neuroprotective cordycepin.",
    badge: "Nutraceutical Grade",
    icon: HeartPulse,
    image: "/species/medicinal.jpg",
  },
  {
    id: "exotic",
    title: "Exotic Supermarket Fungi",
    scientificName: "King Oyster, Enoki, Shimeji & Morel",
    temp: "12°C – 16°C (Cold Fruiting)",
    substrate: "Automated bottle & polypropylene bags",
    commercialValue: "Modern retail tier-1",
    desc: "High-density automated bottle cultivation catering to premium supermarket chains, organic grocery boutiques, and luxury hotels.",
    badge: "Tier-1 Modern Retail",
    icon: Crown,
    image: "/species/exotic.jpg",
  },
];

export default function FullIndustryChain() {
  const [activeSpecies, setActiveSpecies] = useState<string>("medicinal");

  const currentSpecialty = SPECIALTY_SPECIES.find((s) => s.id === activeSpecies) || SPECIALTY_SPECIES[4];

  return (
    <section
      id="industry-chain"
      className="relative py-20 sm:py-28 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f28822]/15 border border-[#f28822]/30 text-xs font-bold text-[#b85b06] uppercase tracking-wider mb-4"
          >
            <span>Mushroom First Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-gray-950 uppercase font-sans leading-[1.1]"
          >
            The Full Spectrum of <br />
            <span className="font-serif italic font-normal text-gray-700 capitalize">
              Edible &amp; Medicinal Fungi
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal"
          >
            From India&apos;s commercial high-volume Button Mushroom backbone to the six explosive specialty sectors driving new agribusiness fortunes.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* FEATURE 1: BUTTON MUSHROOM BACKBONE (PRIMARY COMMERCIAL EXPO)             */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20 rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Image & Volume Metric (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[440px] bg-slate-900 group overflow-hidden">
              <img
                src="/imdgallery/imd-2024-003.jpg"
                alt="High-Tech Button Mushroom Cultivation Facility"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-[#f28822] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Commercial Core Segment
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">75%+</div>
                <div className="text-xs sm:text-sm font-semibold text-amber-200">
                  Total National Mushroom Production Volume in India
                </div>
              </div>
            </div>

            {/* Right Details & 4-Stage Production Chain (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                    Button Mushrooms
                  </h3>
                  <span className="text-xs font-serif italic text-gray-500 font-semibold">
                    Agaricus bisporus
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  The commercial engine of India&apos;s edible fungi industry. Produced in precision Controlled Environment Agriculture (CEA) climate facilities for wholesale mandis, modern supermarkets, canning plants, and institutional catering.
                </p>
              </div>

              {/* 4-Stage Lifecycle Flow */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f28822] block mb-2">
                  Industrial Cultivation Cycle
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-gray-200/80">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#f28822] text-white flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <h4 className="text-xs font-bold text-gray-900">Phase I–III Bulk Compost</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      High-yield straw substrate with pasteurization tunnels and certified grain spawn.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-gray-200/80">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#f28822] text-white flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <h4 className="text-xs font-bold text-gray-900">Automated CEA Climate</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      Precision chilling (16°C–18°C), 90% RH humidity, and CO2 ventilation management.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-gray-200/80">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#f28822] text-white flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <h4 className="text-xs font-bold text-gray-900">Multi-Flush Harvesting</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      High-density tiered shelving with precision hand and semi-automated harvesting.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-gray-200/80">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#f28822] text-white flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <h4 className="text-xs font-bold text-gray-900">Vacuum Cooling &amp; Pack</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      Rapid core pre-cooling, punnet film sealing, and reefer logistics to retail hubs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* FEATURE 2: 6 SPECIALTY SECTORS (SHROOM CONNECT CONCLAVE)                 */}
        {/* ========================================================================= */}
        <div id="specialty-sectors" className="pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#84c52c]">
                Shroom Connect Sector Showcase
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
                6 High-Growth Specialty Fungi Sectors
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md">
              Specialized cultivation domains commanding premium retail prices, government capital subsidies, and expanding export demand.
            </p>
          </div>

          {/* Species Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {SPECIALTY_SPECIES.map((species) => {
              const IconComp = species.icon;
              const isSelected = activeSpecies === species.id;
              return (
                <button
                  key={species.id}
                  onClick={() => setActiveSpecies(species.id)}
                  type="button"
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                      : "bg-white text-gray-800 border-gray-200 hover:border-[#84c52c] hover:bg-green-50/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg overflow-hidden border shrink-0 transition-all ${
                          isSelected
                            ? "border-[#84c52c] ring-2 ring-[#84c52c]/30 shadow"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={species.image}
                          alt={species.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <IconComp
                        className={`w-4 h-4 ${isSelected ? "text-[#84c52c]" : "text-gray-400"}`}
                      />
                    </div>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isSelected ? "bg-white/15 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {species.id === "medicinal" ? "Top ROI" : "Specialty"}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{species.title}</div>
                    <div className={`text-[10px] truncate mt-0.5 ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                      {species.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Species Detail Spotlight Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpecialty.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual side (5 cols) */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 group">
                  <img
                    key={currentSpecialty.id}
                    src={currentSpecialty.image}
                    alt={`${currentSpecialty.title} - ${currentSpecialty.scientificName}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#84c52c]">
                      {currentSpecialty.badge}
                    </span>
                    <h4 className="text-xl font-bold">{currentSpecialty.title}</h4>
                    <p className="text-xs text-gray-300 italic font-serif">
                      {currentSpecialty.scientificName}
                    </p>
                  </div>
                </div>

                {/* Information side (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#d97416]">
                      Shroom Connect Feature
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      B2B Sourcing Category
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                    {currentSpecialty.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {currentSpecialty.desc}
                  </p>

                  {/* Biological & Market Specs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                        <Thermometer className="w-4 h-4 text-[#f28822]" />
                        <span>Growth Temp</span>
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        {currentSpecialty.temp}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                        <Layers className="w-4 h-4 text-[#84c52c]" />
                        <span>Substrate Medium</span>
                      </div>
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {currentSpecialty.substrate}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span>Market Advantage</span>
                      </div>
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {currentSpecialty.commercialValue}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
