"use client";

import { useState, useEffect } from "react";
import { DEFAULT_SPONSORS, SponsorItem } from "@/lib/sectionsCmsTypes";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionDivider from "./SectionDivider";

export default function PastSponsorsSection() {
  const t = useTranslations("partners");
  const [sponsors, setSponsors] = useState<SponsorItem[]>(DEFAULT_SPONSORS);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetch("/api/sections")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data?.sponsors) {
          if (Array.isArray(json.data.sponsors.items) && json.data.sponsors.items.length > 0) {
            setSponsors(json.data.sponsors.items);
          }
          if (json.data.sponsors.title) {
            setTitle(json.data.sponsors.title);
          }
        }
      })
      .catch(() => {
        // Fallback to static defaults
      });
  }, []);

  const activeSponsors = sponsors.filter((s) => s.active !== false);
  const displaySponsors = activeSponsors.length > 0 ? activeSponsors : DEFAULT_SPONSORS;

  return (
    <section
      id="past-sponsors"
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
            {title || t("title")}
          </motion.h2>
        </div>

        {/* Tiered Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
          {displaySponsors.map((s, idx) => (
            <motion.div
              key={s.id || s.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Logo Area */}
                <div className="h-44 sm:h-52 w-full flex items-center justify-center p-3 sm:p-4 bg-slate-50/70 rounded-2xl border border-slate-100 mb-6 group-hover:bg-white transition-colors">
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-full w-auto max-h-36 sm:max-h-44 object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-xs"
                    onError={(e) => {
                      e.currentTarget.src = "/reallogo.png";
                    }}
                  />
                </div>

                {/* Category & Title */}
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#ff9f43] mb-1.5 font-sans">
                  {s.category}
                </p>
                <h3 className="text-xl font-bold text-gray-950 leading-snug group-hover:text-[#ff9f43] transition-colors mb-3">
                  {s.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                <span>Official Partner</span>
                <span className="text-[#004aab]">IMD 2027</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
