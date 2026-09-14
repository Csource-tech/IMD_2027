"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: number;
  url: string;
  title: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    url: "/imdgallery/imd-2024-002-inauguration.png",
    title: "Inauguration Ceremony & Lamp Lighting",
  },
  {
    id: 2,
    url: "/imdgallery/imd-2024-001.jpg",
    title: "Main Exhibition Pavilion & Commercial Stalls",
  },
  {
    id: 3,
    url: "/imdgallery/imd-2024-005.jpg",
    title: "B2B Buyer Networking & Business Stalls",
  },
  {
    id: 4,
    url: "/imdgallery/imd-2024-006.jpg",
    title: "Advanced Substrate & Cultivation Technology",
  },
  {
    id: 5,
    url: "/imdgallery/imd-2024-007.jpg",
    title: "Commercial Spawn & Farm Infrastructure Showcase",
  },
  {
    id: 6,
    url: "/imdgallery/imd-2024-010.jpg",
    title: "Global Delegates & Technical Presentation",
  },
  {
    id: 7,
    url: "/imdgallery/imd-2024-011.jpg",
    title: "Industry Conference & Scientific Summit Dialogues",
  },
  {
    id: 8,
    url: "/imdgallery/imd-2024-012.jpg",
    title: "Exhibitor & Sourcing Buyer Matchmaking",
  },
  {
    id: 9,
    url: "/imdgallery/imd-2024-013.jpg",
    title: "High-Yield Fungi Cultivation Equipment",
  },
  {
    id: 10,
    url: "/imdgallery/imd-2024-015.jpg",
    title: "Distinguished Industry Guests & VIP Delegations",
  },
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-slide every 5 seconds unless paused or modal open
  useEffect(() => {
    if (isPaused || lightboxOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, lightboxOpen, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const activeItem = GALLERY_ITEMS[currentIndex];

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching all other sections */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f28822]/15 border border-[#f28822]/30 text-xs font-bold text-[#b85b06] uppercase tracking-wider mb-4"
          >
            <span>Event Highlights</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-gray-950 uppercase font-sans leading-[1.1]"
          >
            Glimpses of <br />
            <span className="font-serif italic font-normal text-gray-700 capitalize">
              Indian Mushroom Days
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            A curated visual chronicle capturing the vibrant delegations, technology pavilions, and commercial deal-making from previous editions.
          </motion.p>
        </div>

        {/* Main Featured Photo Display with Finished Elevation & Controls */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0c140f] border border-gray-200 shadow-xl shadow-black/5 group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Animated Main Image with Smooth Crossfade */}
          <AnimatePresence mode="wait">
            <motion.img
              key={activeItem.id}
              src={activeItem.url}
              alt={activeItem.title}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.85 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-[1.02]"
              onClick={() => setLightboxOpen(true)}
            />
          </AnimatePresence>

          {/* Bottom Gradient Overlay with Title & Slide Counter */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-x-0 bottom-0 pt-16 pb-4 sm:pb-5 px-4 sm:px-7 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between cursor-pointer"
          >
            <p className="text-white text-sm sm:text-lg font-semibold tracking-tight leading-snug drop-shadow-sm pr-4 line-clamp-2">
              {activeItem.title}
            </p>
            <span className="shrink-0 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono font-medium">
              {currentIndex + 1} / {GALLERY_ITEMS.length}
            </span>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0c140f]/60 hover:bg-[#0c140f] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0c140f]/60 hover:bg-[#0c140f] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Expand Fullscreen Icon Button (Top Right) */}
          <button
            onClick={() => setLightboxOpen(true)}
            aria-label="View fullscreen"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 rounded-full bg-[#0c140f]/60 hover:bg-[#0c140f] text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Thumbnails Strip (10 Thumbnails Grid with Finished Polish) */}
        <div className="mt-3 sm:mt-4 grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {GALLERY_ITEMS.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "ring-2 ring-[#f28822] ring-offset-2 ring-offset-white border-[#f28822] opacity-100 scale-102 shadow-sm"
                    : "border-gray-200/90 opacity-45 hover:opacity-90 hover:scale-102"
                }`}
                aria-label={`Select photo ${idx + 1}`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Finished Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0c140f]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-20 pb-2">
            <span className="text-xs sm:text-sm text-gray-300 font-medium">
              Photo {currentIndex + 1} of {GALLERY_ITEMS.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen"
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Image View with Left/Right Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-3 sm:my-5 overflow-hidden">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95 border border-white/15"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="max-w-5xl max-h-[72vh] flex flex-col items-center justify-center">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="max-w-full max-h-[66vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 select-none"
              />
              <p className="mt-3.5 text-white text-center text-sm sm:text-base font-medium px-4 max-w-2xl drop-shadow-md">
                {activeItem.title}
              </p>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95 border border-white/15"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip inside Frosted Tray */}
          <div className="max-w-3xl mx-auto w-full overflow-x-auto py-2 flex items-center justify-center gap-1.5 sm:gap-2">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-14 h-9 sm:w-16 sm:h-10 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer border ${
                  currentIndex === idx
                    ? "ring-2 ring-[#f28822] border-[#f28822] opacity-100 scale-105 shadow-md"
                    : "border-white/10 opacity-40 hover:opacity-85"
                }`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
