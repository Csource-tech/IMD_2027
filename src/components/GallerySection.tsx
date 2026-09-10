"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

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

  // Auto-slide every 5 seconds unless hovered
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
    <section id="gallery" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Gallery Heading with Orange Underline */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight inline-block border-b-4 border-[#f28822] pb-1">
            Gallery
          </h2>
        </div>

        {/* Main Featured Photo Display with Edge Nav Arrows */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[560px] overflow-hidden bg-gray-100 shadow-md group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Image */}
          <img
            src={activeItem.url}
            alt={activeItem.title}
            className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Expand Fullscreen Icon Button (Top Right on Hover) */}
          <button
            onClick={() => setLightboxOpen(true)}
            aria-label="View fullscreen"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Thumbnails Strip (All 10 Thumbnails Underneath) */}
        <div className="mt-2.5 sm:mt-3.5 grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {GALLERY_ITEMS.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-[16/10] overflow-hidden transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "opacity-100 ring-2 ring-[#f28822] shadow-sm scale-102"
                    : "opacity-40 hover:opacity-85"
                }`}
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

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-20">
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              Photo {currentIndex + 1} of {GALLERY_ITEMS.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="max-w-5xl max-h-[75vh] flex flex-col items-center justify-center">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl select-none"
              />
              <p className="mt-3 text-white text-center text-sm sm:text-base font-medium px-4">
                {activeItem.title}
              </p>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="max-w-3xl mx-auto w-full overflow-x-auto py-2 flex items-center justify-center gap-1.5">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-14 h-9 sm:w-16 sm:h-10 rounded overflow-hidden transition-all duration-200 cursor-pointer ${
                  currentIndex === idx
                    ? "ring-2 ring-[#f28822] opacity-100 scale-105"
                    : "opacity-40 hover:opacity-80"
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


