"use client";

import { motion } from "framer-motion";

export default function SloganBanner() {
  return (
    <section id="manifesto" className="relative bg-[#0c140f] text-white py-12 sm:py-16 overflow-hidden shadow-inner">
      {/* Background mycelium texture accent */}
      <div className="absolute inset-0 mycelium-pattern opacity-30 pointer-events-none" />

      {/* Ribbon 1: Fast Editorial Marquee */}
      <div className="relative w-full overflow-hidden pb-4 opacity-40">
        <div className="animate-marquee flex items-center space-x-8 text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-gray-300 font-sans">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="text-[#84c52c]">MUSHROOMS FIRST</span>
              <span>•</span>
              <span>CULTIVATION</span>
              <span>•</span>
              <span>SCIENCE</span>
              <span>•</span>
              <span className="text-[#f28822]">SPAWN BIOTECHNOLOGY</span>
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#84c52c] uppercase tracking-wider mb-4"
        >
          <span>The National Movement</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-relaxed max-w-4xl mx-auto"
        >
          &ldquo;India&apos;s apex commercial platform bridging the complete edible &amp; medicinal fungi value chain — from spore genetics to cold-chain supermarket aisles.&rdquo;
        </motion.h2>
      </div>

      {/* Ribbon 2: Reverse Marquee */}
      <div className="relative w-full overflow-hidden pt-4 opacity-40">
        <div className="animate-marquee-reverse flex items-center space-x-8 text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-gray-300 font-sans">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="text-[#f28822]">INDIAN MUSHROOM DAYS</span>
              <span>•</span>
              <span>NEW DELHI, INDIA</span>
              <span>•</span>
              <span className="text-[#84c52c]">SHROOM CONNECT 2027</span>
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
    </section>
  );
}
