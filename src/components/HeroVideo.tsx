"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/CountdownTimer";

const CAROUSEL_IMAGES = [
  "/carousel/3U3A5155.JPG",
  "/carousel/3U3A5379.JPG",
  "/carousel/3U3A6154.JPG",
  "/carousel/3U3A5175.JPG",
  "/carousel/3U3A5098.JPG",
  "/carousel/3U3A5002.JPG",
  "/carousel/3U3A5077.JPG",
  "/carousel/3U3A5264.JPG",
  "/carousel/3U3A5523.JPG",
];

export default function HeroVideo() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full text-white pt-16 sm:pt-24 pb-14 sm:pb-20 flex flex-col justify-between"
    >
      {/* 1. Full Page Background Image Carousel with Light Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {CAROUSEL_IMAGES.map((src, index) => (
          <motion.div
            key={src}
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1.05 : 1.0,
            }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: 5.5, ease: "easeOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={src}
              alt={`Indian Mushroom Days Showcase ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        ))}
      </div>

      {/* 2. Centered Persistent Hero Content */}
      <div className="relative z-20 py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center">
        {/* Kicker Headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.8)" }}
          className="text-xs sm:text-sm font-serif italic text-amber-200/95 tracking-wide uppercase mb-3 sm:mb-4"
        >
          Asia&apos;s Premier Commercial Mushroom Gathering &amp; B2B Conclave
        </motion.p>

        {/* Main Centered Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.9), 0 8px 30px rgba(0,0,0,0.8)",
            wordSpacing: "0.1em",
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-normal leading-[1.08] text-white uppercase font-sans [word-spacing:0.1em]"
        >
          India Mushroom{" "}
          <span className="text-[#ff9f43]">Days 2027</span>
        </motion.h1>

        {/* Elegant Ampersand Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3"
        >
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-white/40" />
          <span
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
            className="text-lg sm:text-2xl font-serif italic text-white/85"
          >
            &amp;
          </span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Shroom Connect Sub-Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.9), 0 8px 30px rgba(0,0,0,0.8)",
            wordSpacing: "0.1em",
          }}
          className="text-2xl sm:text-4xl md:text-5xl font-black tracking-normal leading-[1.1] text-[#004aab] uppercase font-sans [word-spacing:0.1em]"
        >
          Shroom Connect
        </motion.h2>

        {/* Core Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 4px 16px rgba(0,0,0,0.9)" }}
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-semibold text-gray-100 max-w-2xl mx-auto leading-relaxed tracking-wide"
        >
          India’s Biggest Mushroom Event On : <br /> Cultivation | Machinery | Value Addition
        </motion.p>

        {/* Two Centered Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
        >
          {/* Visitor Registration Button */}
          <Link
            href="/visitor-register"
            className="group inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold text-white bg-[#ff9f43] hover:bg-[#f28822] shadow-xl shadow-black/50 hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-wider"
          >
            <span>Visitor Registration</span>
          </Link>

          {/* Book Your Booth Button */}
          <Link
            href="/book-your-stall"
            className="group inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold text-white bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/40 shadow-xl shadow-black/40 hover:border-white/60 hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-wider"
          >
            <span>Book Your Booth</span>
          </Link>
        </motion.div>
      </div>

      {/* 3. Circular Countdown Timer Overlapping Hero Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative z-30 max-w-6xl mx-auto px-4 -mb-18 sm:-mb-26 md:-mb-48 mt-10 sm:mt-14 flex justify-center w-full"
      >
        <CountdownTimer />
      </motion.div>
    </section>
  );
}
