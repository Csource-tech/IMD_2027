"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionDivider from "./SectionDivider";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  meta: string;
  author: string;
  role: string;
  organization: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "More than 5,000 delegates convened across three intensive days. Indian Mushroom Days has established an unprecedented national benchmark, connecting government ministries, scientific research academia, and progressive commercial growers with mushrooms at the center.",
    meta: "India's Most Trusted Edible Mushroom Exhibition",
    author: "Dr. R. K. Sharma",
    role: "President",
    organization: "National Mushroom Growers & Agri-Tech Council",
    rating: 5,
  },
  {
    quote:
      "Indian Mushroom Days delivers the complete end-to-end industrial value chain—from climate-controlled growing rooms and substrate bagging lines to high-margin medicinal mushroom extracts. The scale and international networking exceeded all our expectations.",
    meta: "One-Stop Solutions for Edible Mushroom Industry",
    author: "Sunil Patel",
    role: "Managing Director",
    organization: "Global Mushroom Farm Innovations",
    rating: 5,
  },
  {
    quote:
      "The Shroom Connect B2B matchmaking enabled our international purchasing team to meet vetted suppliers across automated growing equipment, casing soil, spawn technology, and freeze-dried mushroom extracts in one central venue.",
    meta: "International Buyer & Trade Delegations",
    author: "Elena Rostova",
    role: "Director of International Sourcing",
    organization: "Euro-Asia Fresh Produce Sourcing",
    rating: 5,
  },
  {
    quote:
      "A groundbreaking initiative that places India firmly on the global mushroom cultivation map. The summit conferences on energy-saving environmental control and high-yield compost preparation provided immense practical value for our commercial farm expansion.",
    meta: "Leading Agro-Tech Innovation Forum",
    author: "Amitabh Verma",
    role: "Chief Technology Officer",
    organization: "Vedic Mushroom Agro-Industries",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7500);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative py-14 sm:py-20 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight uppercase"
          >
            Testimonials
          </motion.h2>
        </div>

        {/* Testimonial Editorial Card */}
        <div className="relative rounded-3xl bg-white border border-gray-200 shadow-xl p-8 sm:p-14 md:p-16 flex flex-col items-center text-center overflow-hidden">


          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center max-w-4xl"
            >


              {/* Editorial Quote */}
              <blockquote className="font-serif italic text-lg sm:text-2xl md:text-3xl text-gray-900 leading-[1.45] font-normal min-h-[140px] flex items-center justify-center">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="pt-8 mt-4 border-t border-gray-100 w-full">
                <div className="text-lg sm:text-xl font-black text-gray-950">
                  {current.author}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  {current.role} •{" "}
                  <span className="font-semibold text-gray-800">{current.organization}</span>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between w-full max-w-xs z-20">
            <button
              onClick={prevSlide}
              aria-label="Previous quote"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center hover:border-gray-900 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? "w-8 bg-[#f28822]" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next quote"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center hover:border-gray-900 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
