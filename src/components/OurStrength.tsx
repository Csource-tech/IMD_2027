"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

interface CounterItemProps {
  target: number;
  suffix?: string;
  label: string;
  sublabel: string;
  duration?: number;
  delayIndex?: number;
}

function CounterItem({
  target,
  suffix = "+",
  label,
  sublabel,
  duration = 2000,
  delayIndex = 0,
}: CounterItemProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: delayIndex * 0.1 }}
      className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
    >


      {/* Massive Display Number */}
      <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-sans">
        {count.toLocaleString()}
        <span className="text-[#ff9f43]">{suffix}</span>
      </div>

      {/* Primary Label */}
      <div className="text-sm sm:text-base font-bold text-gray-200 mt-2 tracking-wide uppercase font-sans">
        {label}
      </div>

      {/* Contextual Sub-label */}
      <div className="text-xs text-gray-400 mt-1 leading-snug max-w-[200px]">
        {sublabel}
      </div>
    </motion.div>
  );
}

export default function OurStrength() {
  return (
    <section
      id="our-strength"
      className="relative bg-[#0a120d] text-white py-14 sm:py-20 overflow-hidden border-b border-white/10"
    >
      {/* Ambient spore lighting accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#004aab]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#ff9f43]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-white tracking-tight uppercase"
          >
            Scale &amp; Impact
          </motion.h2>
        </div>

        {/* 4 Stat Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <CounterItem
            target={5000}
            label="Delegates"
            sublabel="Commercial cultivators & farm owners across India"
            delayIndex={0}
          />
          <CounterItem
            target={100}
            label="Exhibitors"
            sublabel="Machinery, spawn labs, and CEA tech corporations"
            delayIndex={1}
          />
          <CounterItem
            target={15}
            label="Countries"
            sublabel="International delegates and European equipment leaders"
            delayIndex={2}
          />
          <CounterItem
            target={50}
            label="Speakers"
            sublabel="Renowned mycology scientists & agribusiness economists"
            delayIndex={3}
          />
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
