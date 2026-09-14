"use client";

import { EXHIBITORS } from "../data/exhibitorsData";
import { motion } from "framer-motion";

export default function ExhibitorsSection() {
  const half = Math.ceil(EXHIBITORS.length / 2);
  const row1 = EXHIBITORS.slice(0, half);
  const row2 = EXHIBITORS.slice(half);

  return (
    <section id="exhibitors" className="py-20 sm:py-28 bg-white overflow-hidden border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-18 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84c52c]/15 border border-[#84c52c]/30 text-xs font-bold text-[#456b14] uppercase tracking-wider mb-4"
        >
          <span>Industry Participation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-gray-950 uppercase font-sans leading-[1.1]"
        >
          Exhibitors &amp; <br />
          <span className="font-serif italic font-normal text-gray-700 capitalize">
            Corporate Participants
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Representing cutting-edge European and domestic compost engineering, certified strain genetics, automated packaging, and value-added culinary brands.
        </motion.p>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        <div
          className="animate-marquee flex items-center space-x-6 sm:space-x-8 md:space-x-10"
          style={{ animationDuration: "60s" }}
        >
          {[...row1, ...row1, ...row1].map((exhibitor, idx) => (
            <div
              key={`r1-${idx}`}
              className="shrink-0 group cursor-pointer"
              title={exhibitor.name}
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain rounded-full border-2 border-gray-200/90 bg-white shadow-md group-hover:border-[#f28822] group-hover:shadow-xl group-hover:scale-108 transition-all duration-300"
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
              key={`r2-${idx}`}
              className="shrink-0 group cursor-pointer"
              title={exhibitor.name}
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain rounded-full border-2 border-gray-200/90 bg-white shadow-md group-hover:border-[#84c52c] group-hover:shadow-xl group-hover:scale-108 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
