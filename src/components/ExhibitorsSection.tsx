"use client";

import { EXHIBITORS } from "../data/exhibitorsData";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function ExhibitorsSection() {
  const half = Math.ceil(EXHIBITORS.length / 2);
  const row1 = EXHIBITORS.slice(0, half);
  const row2 = EXHIBITORS.slice(half);

  return (
    <section id="exhibitors" className="py-14 sm:py-20 bg-white overflow-hidden border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight uppercase"
        >
          Exhibitors
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
              key={`r1-${idx}`}
              className="shrink-0 group cursor-pointer"
              title={exhibitor.name}
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain rounded-full border-2 border-gray-200/90 bg-white shadow-md group-hover:border-[#ff9f43] group-hover:shadow-xl group-hover:scale-108 transition-all duration-300"
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
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain rounded-full border-2 border-gray-200/90 bg-white shadow-md group-hover:border-[#004aab] group-hover:shadow-xl group-hover:scale-108 transition-all duration-300"
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
