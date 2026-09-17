"use client";

import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function SloganBanner() {
  return (
    <section id="manifesto" className="relative bg-[#0c140f]/95 text-white py-14 sm:py-18 overflow-hidden shadow-inner">
      {/* Background mycelium texture accent */}
      <div className="absolute inset-0 mycelium-pattern opacity-30 pointer-events-none" />

      {/* Ribbon 1: Fast Editorial Marquee */}
      <div className="relative w-full overflow-hidden pb-4 opacity-40">
        <div className="animate-marquee flex items-center space-x-8 text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-gray-300 font-sans">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="text-[#004aab]">MUSHROOMS FIRST</span>
              <span>•</span>
              <span>CULTIVATION</span>
              <span>•</span>
              <span>SCIENCE</span>
              <span>•</span>
              <span className="text-[#ff9f43]">SPAWN BIOTECHNOLOGY</span>
              <span>•</span>
              <span>BUSINESS</span>
              <span>•</span>
              <span>INNOVATION</span>
              <span>•</span>
              <span>COMMUNITY</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Editorial Core Message */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-4 sm:my-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-relaxed max-w-4xl mx-auto"
        >
          &ldquo;India’s Biggest Mushroom Event On Cultivation | Machinery | Value Addition&rdquo;
        </motion.h2>
      </div>

      {/* Ribbon 2: Reverse Marquee */}
      <div className="relative w-full overflow-hidden pt-4 opacity-40">
        <div className="animate-marquee-reverse flex items-center space-x-8 text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-gray-300 font-sans">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="text-[#ff9f43]">INDIA MUSHROOM DAYS</span>
              <span>•</span>
              <span>NEW DELHI, INDIA</span>
              <span>•</span>
              <span className="text-[#004aab]">SHROOM CONNECT 2027</span>
              <span>•</span>
              <span>CEA CLIMATE CHAMBERS</span>
              <span>•</span>
              <span>NHB SUBSIDIES</span>
              <span>•</span>
              <span>GLOBAL EXPORT LINKAGES</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Center Bottom Mushroom Emblem */}
      <SectionDivider
        className="mt-8 sm:mt-10 relative z-10"
        lineColor="bg-white/20"
        iconColor="text-white/40"
      />
    </section>
  );
}
