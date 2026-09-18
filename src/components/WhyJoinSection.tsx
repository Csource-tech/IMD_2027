"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionDivider from "./SectionDivider";

interface WhyReason {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  tag: string;
}

export default function WhyJoinSection() {
  const t = useTranslations("whyJoin");
  const tCommon = useTranslations("common");
  const [activeReason, setActiveReason] = useState(0);

  const REASONS: WhyReason[] = [
    {
      number: "01",
      title: t("r1Title"),
      subtitle: t("r1Subtitle"),
      desc: t("r1Desc"),
      image: "/imdgallery/imd-2024-001.jpg",
      tag: "Market Expansion",
    },
    {
      number: "02",
      title: t("r2Title"),
      subtitle: t("r2Subtitle"),
      desc: t("r2Desc"),
      image: "/imdgallery/imd-2024-004.jpg",
      tag: "Agri-Tech & Hardware",
    },
    {
      number: "03",
      title: t("r3Title"),
      subtitle: t("r3Subtitle"),
      desc: t("r3Desc"),
      image: "/imdgallery/imd-2024-015.jpg",
      tag: "Global Trade",
    },
    {
      number: "04",
      title: t("r4Title"),
      subtitle: t("r4Subtitle"),
      desc: t("r4Desc"),
      image: "/imdgallery/imd-2024-011.jpg",
      tag: "Scientific Masterclasses",
    },
    {
      number: "05",
      title: t("r5Title"),
      subtitle: t("r5Subtitle"),
      desc: t("r5Desc"),
      image: "/imdgallery/imd-2024-008.jpg",
      tag: "Commercial Sourcing",
    },
    {
      number: "06",
      title: t("r6Title"),
      subtitle: t("r6Subtitle"),
      desc: t("r6Desc"),
      image: "/imdgallery/imd-2024-014.jpg",
      tag: "Government Financing",
    },
  ];

  const current = REASONS[activeReason];

  return (
    <section id="why-join" className="relative py-14 sm:py-20 bg-white border-b border-gray-200/80 overflow-hidden">
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

        {/* Asymmetrical 2-Column Chapter Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 6 Interactive Chapter Triggers (6 Cols) */}
          <div className="lg:col-span-6 space-y-2">
            {REASONS.map((reason, index) => {
              const isSelected = activeReason === index;
              return (
                <button
                  key={reason.number}
                  type="button"
                  onClick={() => setActiveReason(index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? "bg-[#0c140f] text-white border-[#0c140f] shadow-xl scale-[1.01]"
                      : "bg-[#faf9f5] text-gray-800 border-gray-200/80 hover:bg-white hover:border-gray-300"
                  }`}
                >
                  {/* Number Box */}
                  <span
                    className={`font-sans text-xs font-black px-2.5 py-1 rounded-lg shrink-0 ${
                      isSelected ? "bg-[#ff9f43] text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {reason.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-sm sm:text-base font-bold tracking-tight leading-snug ${
                          isSelected ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {reason.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                          isSelected ? "text-[#004aab]" : "text-gray-400"
                        }`}
                      >
                        {reason.tag}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 leading-relaxed line-clamp-2 ${
                        isSelected ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {reason.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Reason Feature Card (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white flex flex-col h-full justify-between"
              >
                {/* Photo with Overlay */}
                <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover object-center brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
                    Chapter {current.number} • {current.tag}
                  </div>

                  <div className="absolute bottom-5 left-6 right-6 text-white">
                    <h4 className="text-xl sm:text-2xl font-black leading-tight">
                      {current.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-200 mt-1 font-medium">
                      {current.subtitle}
                    </p>
                  </div>
                </div>

                {/* Narrative Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {current.desc}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs font-semibold text-gray-500">
                    <span>{tCommon("brandTitle")} • {tCommon("eventLocation")}</span>
                    <span className="text-[#ff9f43] font-bold">Priority Attendance</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
