"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionDivider from "./SectionDivider";

interface SpeciesItem {
  id: string;
  title: string;
  scientificName: string;
  temp: string;
  substrate: string;
  commercialValue: string;
  desc: string;
  badge: string;
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
    image: "/species/paddy-straw.jpg",
  },
  {
    id: "medicinal",
    title: "Medicinal & Wellness Mushrooms",
    scientificName: "Cordyceps militaris, Reishi & Lion's Mane",
    temp: "18°C – 24°C (HEPA Cleanroom)",
    substrate: "Sterile liquid & solid bioreactors",
    commercialValue: "Highest margin / gram",
    desc: "Pharmaceutical & nutraceutical superstars cultivated under ultra-pure sterile conditions for immune-boosting beta-glucans and neuroprotective cordycepin.",
    badge: "Nutraceutical Grade",
    image: "/species/medicinal.jpg",
  },
  {
    id: "exotic",
    title: "Exotic Supermarket Mushrooms",
    scientificName: "King Oyster, Enoki, Shimeji & Morel",
    temp: "12°C – 16°C (Cold Fruiting)",
    substrate: "Automated bottle & polypropylene bags",
    commercialValue: "Modern retail tier-1",
    desc: "High-density automated bottle cultivation catering to premium supermarket chains, organic grocery boutiques, and luxury hotels.",
    badge: "Tier-1 Modern Retail",
    image: "/species/exotic.jpg",
  },
];

export default function FullIndustryChain() {
  const t = useTranslations("industryChain");
  const [activeSpecies, setActiveSpecies] = useState<string>("oyster");

  const currentSpecialty = SPECIALTY_SPECIES.find((s) => s.id === activeSpecies) || SPECIALTY_SPECIES[0];

  return (
    <section
      id="industry-chain"
      className="relative py-14 sm:py-20 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight capitalize"
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* ========================================================================= */}
        {/* FEATURE 1: BUTTON MUSHROOM BACKBONE (PRIMARY COMMERCIAL EXPO)             */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 rounded-3xl bg-white border border-gray-200 shadow-md overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Image & Volume Metric (4 cols) */}
            <div className="lg:col-span-4 relative min-h-[220px] sm:min-h-[240px] lg:min-h-0 bg-slate-900 group overflow-hidden">
              <img
                src="/species/button-mushrooms.jpg"
                alt="Fresh Button Mushrooms (Agaricus bisporus)"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#ff9f43] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                {t("buttonBadge")}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-2xl sm:text-3xl font-black text-white leading-none">{t("buttonVolume")}</div>
                <div className="text-[11px] sm:text-xs font-semibold text-amber-200 mt-1">
                  {t("buttonVolumeDesc")}
                </div>
              </div>
            </div>

            {/* Right Details & 4-Stage Production Chain (8 cols) */}
            <div className="lg:col-span-8 p-5 sm:p-7 flex flex-col justify-center gap-3.5">
              <div>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
                    {t("buttonHeading")}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
                  {t("buttonSubheading")}
                </p>
              </div>

              {/* 4-Stage Lifecycle Flow */}
              <div className="pt-3 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff9f43] block mb-2">
                  Industrial Cultivation Cycle
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-gray-200/80 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#ff9f43] text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">Bulk Compost</h4>
                      <p className="text-[10px] text-gray-500 truncate">Phase I–III Substrate</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-gray-200/80 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#004aab] text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">Controlled Cropping</h4>
                      <p className="text-[10px] text-gray-500 truncate">16°C–18°C Range</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-gray-200/80 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#004aab] text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">Harvesting</h4>
                      <p className="text-[10px] text-gray-500 truncate">Multi-Flush Yield</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-gray-200/80 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">Cold Chain</h4>
                      <p className="text-[10px] text-gray-500 truncate">Pre-Cool &amp; Pack</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* FEATURE 2: 6 SPECIALTY SECTORS (SHROOM CONNECT CONCLAVE)                 */}
        {/* ========================================================================= */}
        <div id="specialty-sectors" className="pt-2">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-sans text-gray-950 tracking-tight capitalize">
              {t("specialtyHeading")}
            </h3>
          </div>

          {/* Master-Detail Layout: Left Selector Sidebar & Right Active Spotlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            {/* Left: Species Selector List (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-2 h-full min-h-[350px]">
              {SPECIALTY_SPECIES.map((species) => {
                const isSelected = activeSpecies === species.id;
                return (
                  <button
                    key={species.id}
                    onClick={() => setActiveSpecies(species.id)}
                    type="button"
                    className={`w-full h-[52px] px-3.5 rounded-xl text-left transition-all duration-150 cursor-pointer flex items-center justify-between border group shrink-0 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-gray-800 border-gray-200 hover:border-[#004aab] hover:bg-blue-50/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold leading-tight tracking-tight truncate">
                          {species.title}
                        </div>
                        <div
                          className={`text-[11px] mt-0.5 truncate font-medium ${
                            isSelected ? "text-amber-300" : "text-gray-500"
                          }`}
                        >
                          {species.badge}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Active Species Spotlight Card (8 cols) */}
            <div className="lg:col-span-8 h-full min-h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpecialty.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden h-full min-h-[350px]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[350px] items-stretch">
                    {/* Visual side: 50% of the card */}
                    <div className="relative h-56 md:h-full min-h-[220px] md:min-h-[350px] w-full bg-slate-900 group overflow-hidden">
                      <img
                        key={currentSpecialty.id}
                        src={currentSpecialty.image}
                        alt={`${currentSpecialty.title} - ${currentSpecialty.scientificName}`}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ff9f43] text-white shadow">
                          {currentSpecialty.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                        <h4 className="text-base sm:text-lg font-black leading-tight truncate">
                          {currentSpecialty.title}
                        </h4>
                        <p className="text-[11px] text-amber-200 italic font-serif truncate">
                          {currentSpecialty.scientificName}
                        </p>
                      </div>
                    </div>

                    {/* Information side: 50% of the card */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between h-full min-h-[350px] overflow-hidden">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#d97416]">
                            Shroom Connect
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            B2B Sourcing
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black text-gray-950 tracking-tight leading-snug truncate">
                          {currentSpecialty.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 italic font-serif truncate mb-1.5">
                          {currentSpecialty.scientificName}
                        </p>

                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                          {currentSpecialty.desc}
                        </p>
                      </div>

                      {/* Biological & Market Specs Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 mt-2">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                          <div className="flex items-center gap-1 text-slate-500 text-[10px] font-semibold">
                            <span>{t("temp")}</span>
                          </div>
                          <div className="text-[11px] font-bold text-gray-900 mt-0.5 truncate">
                            {currentSpecialty.temp}
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                          <div className="flex items-center gap-1 text-slate-500 text-[10px] font-semibold">
                            <span>{t("substrate")}</span>
                          </div>
                          <div className="text-[11px] font-bold text-gray-900 truncate mt-0.5">
                            {currentSpecialty.substrate}
                          </div>
                        </div>

                        <div className="col-span-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                          <div className="flex items-center gap-1 text-slate-500 text-[10px] font-semibold">
                            <span>{t("commercialValue")}</span>
                          </div>
                          <div className="text-[11px] font-bold text-gray-900 mt-0.5 truncate">
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
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
