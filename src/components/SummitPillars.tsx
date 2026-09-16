"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionDivider from "./SectionDivider";

interface PillarCard {
  id: string;
  number: string;
  acronym: string;
  badge: string;
  title: string;
  tags: string;
  date: string;
  place: string;
  bgImage: string;
  href: string;
  badgeStyle: string;
  acronymStyle: string;
  btnStyle: string;
  hoverShadow: string;
}

const PILLARS: PillarCard[] = [
  {
    id: "imd",
    number: "01",
    acronym: "IMD 2027",
    badge: "COMMERCIAL EXPO",
    title: "Indian Mushroom Days",
    tags: "Technology  •  Farming  •  Trade",
    date: "19–21 Feb 2027",
    place: "New Delhi, India",
    bgImage: "/pillars/commercial-expo.jpg",
    href: "/book-your-stall",
    badgeStyle: "border-amber-500/60 bg-black/55 text-amber-300",
    acronymStyle: "text-[#ff9f43]",
    btnStyle:
      "bg-amber-950/80 border-amber-500/50 text-[#ff9f43] group-hover:bg-[#ff9f43] group-hover:text-white",
    hoverShadow:
      "hover:shadow-[0_20px_50px_rgba(255,159,67,0.28)] hover:border-amber-500/50",
  },
  {
    id: "shroom-connect",
    number: "02",
    acronym: "SHROOM CONNECT",
    badge: "B2B BUYER CONCLAVE",
    title: "Shroom Connect",
    tags: "Buyers  •  Brands  •  Partnerships",
    date: "19–21 Feb 2027",
    place: "New Delhi, India",
    bgImage: "/pillars/shroom-connect.jpg",
    href: "/#buyer-club",
    badgeStyle: "border-purple-400/60 bg-black/55 text-purple-200",
    acronymStyle: "text-purple-400",
    btnStyle:
      "bg-purple-950/80 border-purple-500/50 text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
    hoverShadow:
      "hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)] hover:border-purple-500/40",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 95,
      damping: 15,
      mass: 0.8,
    },
  },
};

export default function SummitPillars() {
  return (
    <section
      id="pillars"
      className="relative bg-[#f8f6f0] text-gray-900 pt-16 sm:pt-20 md:pt-36 pb-14 sm:pb-20 border-b border-[#e7e1d5] overflow-hidden"
    >
      {/* Warm Organic Ambient Wave Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-radial from-[#ebe3d3]/80 via-[#f3ede1]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-radial from-[#eadecc]/70 via-[#f4eee3]/40 to-transparent rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      {/* Subtle Botanical Corner Shadows */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-900/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-900/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Main Editorial Serif Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1a231e] tracking-tight leading-tight"
          >
            One ecosystem. Two powerful platforms
          </motion.h2>
        </div>

        {/* 2 High-End Rectangular Pillar Cards Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Curved Connector between Card 01 and Card 02 */}
          <div className="hidden md:flex absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 pointer-events-none z-20 items-center justify-center">
            <svg viewBox="0 0 80 40" fill="none" className="w-full h-8 overflow-visible">
              <path
                d="M 0 20 C 25 10, 55 30, 80 20"
                stroke="#a89a84"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="40" cy="20" r="4.5" fill="#ff9f43" />
            </svg>
          </div>

          {/* Cards Grid: 2 Rectangular Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch"
          >
            {PILLARS.map((pillar) => {
              return (
                <motion.div
                  key={pillar.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="h-full"
                >
                  <Link
                    href={pillar.href}
                    className={`group relative h-full min-h-[300px] sm:min-h-[330px] md:min-h-[340px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-black/10 p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all duration-300 ${pillar.hoverShadow}`}
                  >
                    {/* Card Background: Crisp Photography */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={pillar.bgImage}
                        alt={pillar.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Cinematic Multi-Stop Contrast Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 group-hover:via-black/45 transition-colors duration-300" />
                    </div>

                    {/* Top Header: Badge on left, Big Number on right */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-md ${pillar.badgeStyle}`}
                      >
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                          {pillar.badge}
                        </span>
                      </div>

                      {/* Number Watermark (01, 02) */}
                      <span className="text-5xl sm:text-6xl font-sans font-black text-white/20 select-none -mt-1 -mr-1 tracking-tighter">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Lower Card Content */}
                    <div className="relative z-10 pt-10 sm:pt-14">
                      <div
                        className={`text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-1 ${pillar.acronymStyle}`}
                      >
                        {pillar.acronym}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug mb-1.5 drop-shadow-md">
                        {pillar.title}
                      </h3>

                      <div className="text-xs sm:text-[13px] text-white/80 font-medium tracking-wide mb-3">
                        {pillar.tags}
                      </div>

                      {/* Thin Divider Line & Card Footer */}
                      <div className="border-t border-white/15 pt-3.5 flex items-center justify-between text-xs text-white/75 font-medium">
                        <span className="font-mono text-[11px] sm:text-xs text-white/70">
                          {pillar.date} &bull; {pillar.place}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-white group-hover:translate-x-1 transition-transform">
                          Explore <span className="text-sm">&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
