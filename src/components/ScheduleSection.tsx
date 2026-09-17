"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import SectionDivider from "./SectionDivider";

export default function ScheduleSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.play().catch(() => {
      // Browser autoplay policy requires muted
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section
      id="program-agenda"
      className="relative py-14 sm:py-20 bg-white border-b border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight uppercase"
          >
            2nd Edition of India Mushroom Days 2027
          </motion.h2>
        </div>

        {/* Video Feature Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-gray-200 group"
        >
          {/* Background Video Element */}
          <div className="relative aspect-[16/9] max-h-[620px] w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/imdvideo.mp4" type="video/mp4" />
              <source src="/bgvideo.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

            {/* Top Video Header Tag */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2.5 z-20">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-[#ff9f43] text-white shadow-lg">
                Live Conclave Showcase
              </span>
              <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                19–21 February 2027 • New Delhi
              </span>
            </div>

            {/* Video Player Floating Controls */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center gap-2.5 z-20">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* In-Video Hero Callout at Bottom */}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-16 sm:right-36 z-20">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff9f43] mb-1.5">
                The Epicenter of Commercial Mushroom Farming
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight font-sans">
                Where India&apos;s Growers, Tech Innovators &amp; Institutional Buyers Meet
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
