"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[750px] sm:min-h-[840px] md:min-h-[900px] lg:min-h-[94vh] flex items-center justify-start overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/imdgallery/imd-2024-002-inauguration.png"
        >
          <source
            src="https://oss.matchpages.cn/matchpages/common/2026/0612/4687/6a2baf1fd483e/%E5%B1%95%E4%BD%8D_x264.mp4"
            type="video/mp4"
          />
        </video>
        {/* Soft Vignette / Contrast Mask matching live site */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />
      </div>

      {/* Hero Content - Width aligned exactly with Navbar */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 w-full pt-36 pb-24">
        <div className="max-w-6xl text-left">
          {/* Main Title - FADES & SLIDES UP */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-bold text-white tracking-tight leading-snug drop-shadow-md mb-6"
          >
            Indian Mushroom <br /> Days 2027 <br />
            <span className="text-[#0084ff]">&amp; Shroom Connect</span>
          </motion.h1>

          {/* Two Rounded Glassmorphism Buttons - SPRING POP-IN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/visitor-register"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Visitor Registration
            </Link>
            <Link
              href="/book-your-stall"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Book Your Stall
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
