"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface SponsorItem {
  name: string;
  category: string;
  desc: string;
  logo: string;
  badge: string;
}

const SPONSORS: SponsorItem[] = [
  {
    name: "Milkyway Technologies Limited",
    category: "SPAWN & CULTIVATION PIONEER",
    desc: "Pioneering commercial spawn production and turn-key farm setup consulting since 1994, empowering thousands of high-yield growers across India.",
    logo: "/milkyway.webp",
    badge: "Foundation Sponsor",
  },
  {
    name: "University of Agricultural Sciences, Bangalore",
    category: "ACADEMIC & SCIENTIFIC RESEARCH PARTNER",
    desc: "Karnataka's premier farm university (ICAR & NAAC 'A+') leading scientific mycology breakthroughs, farmer training, and statewide cultivation development.",
    logo: "/uas.webp",
    badge: "Knowledge Partner",
  },
  {
    name: "Mushroom Exchange",
    category: "GLOBAL INDUSTRY VALUE-CHAIN PLATFORM",
    desc: "India's collaborative trade hub connecting commercial cultivators directly with certified biotech spawn labs, cold chains, and national retail buyers.",
    logo: "/mushroom-exchange.webp",
    badge: "Industry Platform",
  },
];

export default function PastSponsorsSection() {
  return (
    <section
      id="past-sponsors"
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
            <span>Institutional Alliances</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-gray-950 uppercase font-sans leading-[1.1]"
          >
            Our Strategic &amp; <br />
            <span className="font-serif italic font-normal text-gray-700 capitalize">
              Industry Partners
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal"
          >
            Supported by leading farm universities, biotechnology innovators, and value-chain leaders driving the national mushroom ecosystem forward.
          </motion.p>
        </div>

        {/* 3 Tiered Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SPONSORS.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#d97416] border border-orange-200">
                    {s.badge}
                  </span>
                  <Award className="w-4 h-4 text-[#84c52c]" />
                </div>

                {/* Logo Area */}
                <div className="h-44 sm:h-52 w-full flex items-center justify-center p-3 sm:p-4 bg-slate-50/70 rounded-2xl border border-slate-100 mb-6 group-hover:bg-white transition-colors">
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-full w-auto max-h-36 sm:max-h-44 object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-xs"
                  />
                </div>

                {/* Category & Title */}
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#f28822] mb-1.5 font-sans">
                  {s.category}
                </p>
                <h3 className="text-xl font-bold text-gray-950 leading-snug group-hover:text-[#f28822] transition-colors mb-3">
                  {s.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                <span>Official Partner</span>
                <span className="text-[#84c52c]">IMD 2027</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
