"use client";

import { useState, useEffect } from "react";
import { DEFAULT_EXHIBITORS, ExhibitorItem } from "@/lib/sectionsCmsTypes";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import SectionDivider from "./SectionDivider";

export default function ExhibitorsSection() {
  const t = useTranslations("partners");
  const locale = useLocale();
  const isEnglish = locale === "en";
  const [exhibitors, setExhibitors] = useState<ExhibitorItem[]>(DEFAULT_EXHIBITORS);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetch("/api/sections")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data?.exhibitors) {
          if (Array.isArray(json.data.exhibitors.items) && json.data.exhibitors.items.length > 0) {
            setExhibitors(json.data.exhibitors.items);
          }
          if (json.data.exhibitors.title) {
            setTitle(json.data.exhibitors.title);
          }
        }
      })
      .catch(() => {
        // Fallback to static defaults
      });
  }, []);

  const activeItems = exhibitors.filter((e) => e.active !== false);
  const displayItems = activeItems.length > 0 ? activeItems : DEFAULT_EXHIBITORS;

  const half = Math.ceil(displayItems.length / 2);
  const row1 = displayItems.slice(0, half);
  const row2 = displayItems.slice(half);

  return (
    <section id="exhibitors" className="py-14 sm:py-20 bg-white overflow-hidden border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight capitalize"
        >
          {isEnglish && title ? title : t("exhibitorsTitle")}
        </motion.h2>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        <div
          className="animate-marquee flex items-center space-x-6 sm:space-x-8 md:space-x-10"
          style={{ animationDuration: "60s" }}
        >
          {[...row1, ...row1, ...row1].map((exhibitor, idx) => (
            <div
              key={`r1-${exhibitor.id || idx}-${idx}`}
              className="shrink-0 group cursor-pointer"
              title={exhibitor.name}
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain rounded-full border-2 border-gray-200/90 bg-white shadow-md group-hover:border-[#ff9f43] group-hover:shadow-xl group-hover:scale-108 transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/reallogo.png";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        <div
          className="animate-marquee-reverse flex items-center space-x-6 sm:space-x-8 md:space-x-10"
          style={{ animationDuration: "65s" }}
        >
          {[...row2, ...row2, ...row2].map((exhibitor, idx) => (
            <div
              key={`r2-${exhibitor.id || idx}-${idx}`}
              className="shrink-0 group cursor-pointer"
              title={exhibitor.name}
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain rounded-full border-2 border-gray-200/90 bg-white shadow-md group-hover:border-[#004aab] group-hover:shadow-xl group-hover:scale-108 transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/reallogo.png";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Center Bottom Mushroom Emblem */}
      <SectionDivider className="mt-10 sm:mt-14" />
    </section>
  );
}
