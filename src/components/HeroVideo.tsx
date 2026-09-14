"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Ticket, Store } from "lucide-react";

export default function HeroVideo() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-start overflow-hidden bg-[#0a120d] text-white pt-28 sm:pt-32 pb-16 sm:pb-20"
    >
      {/* 1. Background Video from public/bgvideo.mp4 */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>

        {/* Left-side subtle gradient only behind text; center and right remain completely clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* 2. Left-Aligned Hero Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-8 lg:px-12 w-full flex flex-col justify-center items-start text-left">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white uppercase font-sans drop-shadow-md"
          >
            Indian Mushroom <br />
            <span className="text-[#f28822]">
              Days 2027
            </span>
          </motion.h1>

          {/* Sleek Modern Connector Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 my-1"
          >
            <div className="flex items-center justify-center w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-base sm:text-xl font-sans shadow-md">
              &amp;
            </div>
            <span className="h-[2px] w-16 sm:w-[400px] bg-gradient-to-r from-white/30 to-transparent" />
          </motion.div>

          {/* Shroom Connect Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-[#84c52c] uppercase font-sans drop-shadow-md"
          >
            Shroom Connect
          </motion.h2>

          {/* Two Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="pt-4 sm:pt-6 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Visitor Registration Button */}
            <Link
              href="/visitor-register"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm md:text-base font-bold text-white bg-gradient-to-r from-[#84c52c] to-[#6da523] hover:from-[#90d930] hover:to-[#78b727] shadow-xl shadow-green-950/40 hover:shadow-green-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Ticket className="w-5 h-5 text-white" />
              <span>Visitor Registration</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Book Your Stall Button */}
            <Link
              href="/book-your-stall"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm md:text-base font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 shadow-xl hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Store className="w-5 h-5 text-[#f28822]" />
              <span>Book Your Stall</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#f28822]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
