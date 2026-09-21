"use client";

import { useState, useEffect } from "react";
import { DEFAULT_MEDIA_PARTNERS, MediaPartnerItem } from "@/lib/sectionsCmsTypes";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionDivider from "./SectionDivider";

export default function MediaPartners() {
  const t = useTranslations("partners");
  const [partners, setPartners] = useState<MediaPartnerItem[]>(DEFAULT_MEDIA_PARTNERS);
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");

  useEffect(() => {
    fetch("/api/sections")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data?.mediaPartners) {
          if (Array.isArray(json.data.mediaPartners.items) && json.data.mediaPartners.items.length > 0) {
            setPartners(json.data.mediaPartners.items);
          }
          if (json.data.mediaPartners.title) {
            setTitle(json.data.mediaPartners.title);
          }
          if (json.data.mediaPartners.subtitle) {
            setSubtitle(json.data.mediaPartners.subtitle);
          }
        }
      })
      .catch(() => {
        // Fallback to static defaults
      });
  }, []);

  const activeItems = partners.filter((p) => p.active !== false);
  const displayItems = activeItems.length > 0 ? activeItems : DEFAULT_MEDIA_PARTNERS;

  return (
    <section
      id="media-partners"
      className="relative py-14 sm:py-20 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden"
    >
      {/* Ambient background blur circles to enhance glassmorphism refraction */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight capitalize"
          >
            {title || t("mediaPartnersTitle")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {subtitle || t("mediaPartnersSubtitle")}
          </motion.p>
        </div>

        {/* Media Partner White Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {displayItems.map((partner, idx) => (
            <motion.div
              key={partner.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${partner.name} Website`}
                className="group relative h-full rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.14)] hover:border-amber-400/50 hover:bg-white/90 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {/* Subtle Ambient Radial Accent in Card */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-2xl pointer-events-none group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-500" />

                {/* Top Logo Container */}
                <div>
                  <div
                    className="w-full aspect-[2.35/1] rounded-2xl overflow-hidden relative border border-gray-200/90 shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center justify-center p-2.5 sm:p-3"
                    style={{ backgroundColor: partner.bgColor || "#313E37" }}
                  >
                    <img
                      src={partner.image}
                      alt={`${partner.name} Official Logo`}
                      className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/media/image1.jpeg";
                      }}
                    />
                  </div>

                  {/* Partner Details */}
                  <div className="mt-5">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-950 group-hover:text-amber-600 transition-colors leading-snug flex items-center justify-between gap-2">
                      <span>{partner.name}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-600 shrink-0 transition-colors" />
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-600 leading-relaxed font-normal">
                      {partner.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Clickable Action Pill */}
                <div className="mt-6 pt-4 border-t border-gray-200/70 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-amber-800 bg-amber-50/90 border border-amber-200/70 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Official Media Partner
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 group-hover:text-amber-600 transition-colors">
                    Visit Website &rarr;
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
