"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Microscope,
  Sprout,
  Handshake,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
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
  icon: React.ElementType;
  href: string;
  badgeStyle: string;
  iconStyle: string;
  acronymStyle: string;
  btnStyle: string;
  hoverShadow: string;
}

const PILLARS: PillarCard[] = [
  {
    id: "ims",
    number: "01",
    acronym: "IMS 2027",
    badge: "SCIENTIFIC SUMMIT",
    title: "Indian Mushroom Summit",
    tags: "Research  •  Science  •  Innovation",
    date: "19–21 Feb 2027",
    place: "New Delhi, India",
    bgImage: "/pillars/scientific-summit.jpg",
    icon: Microscope,
    href: "/#program-agenda",
    badgeStyle: "border-emerald-500/50 bg-black/45 text-emerald-300",
    iconStyle: "bg-emerald-500/20 text-emerald-400",
    acronymStyle: "text-emerald-400",
    btnStyle:
      "bg-emerald-950/80 border-emerald-500/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white",
    hoverShadow:
      "hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)] hover:border-emerald-500/40",
  },
  {
    id: "imd",
    number: "02",
    acronym: "IMD 2027",
    badge: "COMMERCIAL EXPO",
    title: "Indian Mushroom Days",
    tags: "Technology  •  Farming  •  Trade",
    date: "19–21 Feb 2027",
    place: "New Delhi, India",
    bgImage: "/pillars/commercial-expo.jpg",
    icon: Sprout,
    href: "/book-your-stall",
    badgeStyle: "border-amber-500/60 bg-black/45 text-amber-300",
    iconStyle: "bg-amber-500/20 text-amber-400",
    acronymStyle: "text-amber-400",
    btnStyle:
      "bg-amber-950/80 border-amber-500/50 text-amber-400 group-hover:bg-[#f28822] group-hover:text-white",
    hoverShadow:
      "hover:shadow-[0_20px_50px_rgba(242,136,34,0.28)] hover:border-amber-500/50",
  },
  {
    id: "shroom-connect",
    number: "03",
    acronym: "SHROOM CONNECT",
    badge: "B2B BUYER CONCLAVE",
    title: "Shroom Connect",
    tags: "Buyers  •  Brands  •  Partnerships",
    date: "19–21 Feb 2027",
    place: "New Delhi, India",
    bgImage: "/pillars/shroom-connect.jpg",
    icon: Handshake,
    href: "/#buyer-club",
    badgeStyle: "border-purple-400/60 bg-black/45 text-purple-200",
    iconStyle: "bg-purple-500/20 text-purple-300",
    acronymStyle: "text-purple-400",
    btnStyle:
      "bg-purple-950/80 border-purple-500/50 text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
    hoverShadow:
      "hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)] hover:border-purple-500/40",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
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
      className="relative bg-[#f8f6f0] text-gray-900 pt-16 sm:pt-20 md:pt-40 pb-14 sm:pb-20 border-b border-[#e7e1d5] overflow-hidden"
    >
      {/* Warm Organic Ambient Wave Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-radial from-[#ebe3d3]/80 via-[#f3ede1]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-radial from-[#eadecc]/70 via-[#f4eee3]/40 to-transparent rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      {/* Subtle Botanical Corner Shadows */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-900/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-900/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Top Divider Kicker */}

          {/* Main Editorial Serif Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1a231e] tracking-tight leading-tight"
          >
            One ecosystem. Three powerful platforms
          </motion.h2>


        </div>

        {/* 3 High-End Pillar Cards Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Curved Connector 1: Card 01 to Card 02 */}
          <div className="hidden md:flex absolute top-[48%] left-[30.8%] -translate-y-1/2 w-[5.5%] pointer-events-none z-20 items-center justify-center">
            <svg viewBox="0 0 80 40" fill="none" className="w-full h-8 overflow-visible">
              <path
                d="M 0 20 C 25 10, 55 30, 80 20"
                stroke="#a89a84"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="40" cy="20" r="4.5" fill="#f28822" />
            </svg>
          </div>

          {/* Curved Connector 2: Card 02 to Card 03 */}
          <div className="hidden md:flex absolute top-[48%] left-[64%] -translate-y-1/2 w-[5.5%] pointer-events-none z-20 items-center justify-center">
            <svg viewBox="0 0 80 40" fill="none" className="w-full h-8 overflow-visible">
              <path
                d="M 0 20 C 25 10, 55 30, 80 20"
                stroke="#a89a84"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="40" cy="20" r="4.5" fill="#8b5cf6" />
            </svg>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="h-full"
                >
                  <Link
                    href={pillar.href}
                    className={`group relative h-full min-h-[440px] sm:min-h-[460px] rounded-[28px] sm:rounded-[32px] overflow-hidden border border-black/10 p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all duration-300 ${pillar.hoverShadow}`}
                  >
                    {/* Card Background: Crisp Photography */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={pillar.bgImage}
                        alt={pillar.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      {/* Cinematic Multi-Stop Contrast Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25 group-hover:via-black/40 transition-colors duration-300" />
                    </div>

                    {/* Top Header: Badge on left, Big Number on right */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-md ${pillar.badgeStyle}`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center p-0.5 ${pillar.iconStyle}`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                          {pillar.badge}
                        </span>
                      </div>

                      {/* Number Watermark (01, 02, 03) */}
                      <span className="text-5xl sm:text-6xl font-sans font-black text-white/20 select-none -mt-1 -mr-1 tracking-tighter">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Lower Card Content */}
                    <div className="relative z-10 pt-16">
                      <div
                        className={`text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-1 ${pillar.acronymStyle}`}
                      >
                        {pillar.acronym}
                      </div>

                      <h3 className="text-2xl sm:text-[28px] font-serif font-bold text-white tracking-tight leading-snug mb-1.5 drop-shadow-md">
                        {pillar.title}
                      </h3>

                      <div className="text-xs sm:text-[13px] text-white/75 font-medium tracking-wide mb-4">
                        {pillar.tags}
                      </div>

                      {/* Thin Divider Line */}
                      <div className="border-t border-white/15 my-3.5" />

                      {/* Footer: Date, Location & Circular Arrow Button */}
                      <div className="flex items-center justify-between gap-2 text-xs text-white/90">
                        <div className="flex items-center gap-3.5 flex-wrap">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-white/80 shrink-0" />
                            <span>{pillar.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0" />
                            <span>{pillar.place}</span>
                          </div>
                        </div>

                        {/* Circular Action Button */}
                        <div
                          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 shadow-md ${pillar.btnStyle}`}
                        >
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
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
