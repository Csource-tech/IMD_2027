"use client";

import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Building2, Users2, Award, Sparkles } from "lucide-react";

interface Testimonial {
  quote: string;
  meta: string;
  author: string;
  role: string;
  organization: string;
  badge: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "More than 5,000 delegates attended the summit, bringing together the absolute vanguard of the mushroom industry. Together, we created an unprecedented platform connecting government, research academia, and commercial enterprise with edible fungi at the center.",
    meta: "India's Most Trusted Edible Fungi Exhibition",
    author: "Dr. R. K. Sharma",
    role: "President",
    organization: "National Mushroom Growers & Agri-Tech Council",
    badge: "Official Delegation",
    rating: 5,
  },
  {
    quote:
      "Indian Mushroom Days 2027 delivers the complete end-to-end value chain—from climate-controlled growing rooms and substrate bagging lines to premium medicinal mushroom extracts. The scale and international networking exceeded all our expectations.",
    meta: "One-Stop Solutions for Edible Fungi Industry",
    author: "Sunil Patel",
    role: "Managing Director",
    organization: "Global Fungi Farm Innovations",
    badge: "Industry Partner",
    rating: 5,
  },
  {
    quote:
      "The pre-registration and VIP business matchmaking enabled our international purchasing team to meet vetted suppliers across automated growing equipment, casing soil, spawn technology, and freeze-dried mushroom extracts in one central venue.",
    meta: "International Buyer & Trade Delegations",
    author: "Elena Rostova",
    role: "Director of International Sourcing",
    organization: "Euro-Asia Fresh Produce Sourcing",
    badge: "VIP Buyer Club",
    rating: 5,
  },
  {
    quote:
      "A groundbreaking initiative that places India firmly on the global mushroom cultivation map. The summit conferences on energy-saving environmental control and high-yield compost preparation provided immense practical value for our operations.",
    meta: "Leading Agro-Tech Innovation Forum",
    author: "Amitabh Verma",
    role: "Chief Technology Officer",
    organization: "Vedic Fungi Agro-Industries",
    badge: "Agri-Tech Pioneer",
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

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative w-full min-h-[700px] sm:min-h-[740px] flex flex-col justify-between overflow-hidden bg-[#fafafa] py-20 sm:py-28 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/20 to-white pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Massive Background Quote Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/[0.025] pointer-events-none">
        <Quote className="w-[500px] h-[500px] lg:w-[650px] lg:h-[650px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">


        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our Highlights &amp; Reviews
        </h2>
        <div className="h-1 w-20 bg-[#f28822] mx-auto rounded-full mt-4" />
      </div>

      {/* Full-Width Main Carousel Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 my-auto py-10">
        <div className="flex flex-col items-center text-center">
          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1.5 mb-8 text-amber-400">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400 stroke-amber-400" />
            ))}
          </div>

          {/* Large Quote */}
          <blockquote className="text-lg sm:text-2xl md:text-3xl lg:text-[30px] font-medium text-gray-900 leading-[1.4] sm:leading-[1.45] font-serif italic max-w-4xl min-h-[160px] sm:min-h-[180px] flex items-center justify-center transition-all duration-300">
            &ldquo;{current.quote}&rdquo;
          </blockquote>



          {/* Author Details */}
          <div className="text-gray-900 pt-6">
            <div className="text-lg sm:text-xl font-bold">{current.author}</div>
            <div className="text-sm sm:text-base text-gray-600 font-normal">
              {current.role} &bull; <span className="text-gray-800 font-medium">{current.organization}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <Award className="w-3.5 h-3.5" />
              {current.badge}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Edge Navigation Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous testimonial"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#f28822] hover:scale-110 hover:border-[#f28822]/40 transition-all focus:outline-none"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next testimonial"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#f28822] hover:scale-110 hover:border-[#f28822]/40 transition-all focus:outline-none"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Full-Width Bottom Preview Strip & Indicators */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 mt-6">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === idx
                ? "w-10 bg-[#f28822]"
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>


      </div>
    </section>
  );
}
