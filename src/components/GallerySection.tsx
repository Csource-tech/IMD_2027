"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionDivider from "./SectionDivider";
import galleryData from "./galleryData.json";

interface GalleryItem {
  id: number;
  url: string;
  thumbUrl?: string;
  title: string;
}

const GALLERY_ITEMS: GalleryItem[] = galleryData;

export default function GallerySection() {
  const t = useTranslations("gallery");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbnailStripRef = React.useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setPrevIndex(currentIndex);
    setCurrentIndex((curr) => (curr === GALLERY_ITEMS.length - 1 ? 0 : curr + 1));
  }, [currentIndex]);

  const prevSlide = useCallback(() => {
    setPrevIndex(currentIndex);
    setCurrentIndex((curr) => (curr === 0 ? GALLERY_ITEMS.length - 1 : curr - 1));
  }, [currentIndex]);

  const goToSlide = useCallback(
    (idx: number) => {
      if (idx === currentIndex) return;
      setPrevIndex(currentIndex);
      setCurrentIndex(idx);
    },
    [currentIndex]
  );

  // Continuous auto-slide every 3 seconds (pauses on hover or when lightbox is open)
  useEffect(() => {
    if (lightboxOpen || isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [lightboxOpen, isHovered, nextSlide]);

  // Keep the active thumbnail centered in the scrollable tray without scrolling the browser window
  useEffect(() => {
    const container = thumbnailStripRef.current;
    if (!container) return;
    const activeThumb = container.children[currentIndex] as HTMLElement | undefined;
    if (activeThumb) {
      const scrollLeft =
        activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [currentIndex]);

  // Preload upcoming slides to eliminate decode lag
  useEffect(() => {
    const next1 = (currentIndex + 1) % GALLERY_ITEMS.length;
    const next2 = (currentIndex + 2) % GALLERY_ITEMS.length;
    const prev = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;

    [next1, next2, prev].forEach((idx) => {
      const img = new window.Image();
      img.src = GALLERY_ITEMS[idx].url;
    });
  }, [currentIndex]);

  // Background preload for thumbnails and initial web images
  useEffect(() => {
    GALLERY_ITEMS.forEach((item) => {
      if (item.thumbUrl) {
        const thumb = new window.Image();
        thumb.src = item.thumbUrl;
      }
    });

    for (let i = 0; i < Math.min(8, GALLERY_ITEMS.length); i++) {
      const full = new window.Image();
      full.src = GALLERY_ITEMS[i].url;
    }
  }, []);

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
    <section id="gallery" className="py-14 sm:py-20 bg-white border-b border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight capitalize"
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* Main Featured Photo Display */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0c140f] border border-gray-200 shadow-xl shadow-black/5 group select-none"
        >
          {/* Solid Previous Image Layer underneath (eliminates any black flash) */}
          <img
            src={GALLERY_ITEMS[prevIndex].url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Animated Current Image Layer with Smooth Crossfade */}
          <AnimatePresence initial={false}>
            <motion.img
              key={activeItem.id}
              src={activeItem.url}
              alt={activeItem.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer select-none"
              onClick={() => setLightboxOpen(true)}
            />
          </AnimatePresence>

          {/* Bottom Gradient Overlay with Title & Slide Counter */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-x-0 bottom-0 pt-16 pb-4 sm:pb-5 px-4 sm:px-7 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between cursor-pointer z-10"
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
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0c140f]/60 hover:bg-[#0c140f] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0c140f]/60 hover:bg-[#0c140f] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Expand Fullscreen Icon Button (Top Right) */}
          <button
            onClick={() => setLightboxOpen(true)}
            aria-label="View fullscreen"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 rounded-full bg-[#0c140f]/60 hover:bg-[#0c140f] text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Thumbnails Strip (Scrollable tray for all gallery images) */}
        <div
          ref={thumbnailStripRef}
          className="mt-3 sm:mt-4 flex items-center gap-2 overflow-x-auto pb-2.5 pt-1 px-1 scroll-smooth"
        >
          {GALLERY_ITEMS.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => goToSlide(idx)}
                className={`relative shrink-0 w-16 h-11 sm:w-20 sm:h-13 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "ring-2 ring-[#ff9f43] ring-offset-2 ring-offset-white border-[#ff9f43] opacity-100 scale-105 shadow-sm"
                    : "border-gray-200/90 opacity-45 hover:opacity-90 hover:scale-102"
                }`}
                aria-label={`Select photo ${idx + 1}`}
              >
                <img
                  src={item.thumbUrl || item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
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
          <div className="max-w-4xl mx-auto w-full overflow-x-auto py-2 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 px-3">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => goToSlide(idx)}
                className={`relative shrink-0 w-14 h-9 sm:w-16 sm:h-10 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer border ${
                  currentIndex === idx
                    ? "ring-2 ring-[#ff9f43] border-[#ff9f43] opacity-100 scale-105 shadow-md"
                    : "border-white/10 opacity-40 hover:opacity-85"
                }`}
              >
                <img
                  src={item.thumbUrl || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
