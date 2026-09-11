"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CounterItemProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
  delayIndex?: number;
}

function CounterItem({
  target,
  suffix = "+",
  label,
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
    if (el) {
      observer.observe(el);
    }

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

      // Ease out cubic for natural deceleration
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
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
        delay: delayIndex * 0.12,
      }}
      whileHover={{ scale: 1.06, transition: { type: "spring", stiffness: 400, damping: 15 } }}
      className="flex flex-col items-center justify-center text-center p-4 rounded-2xl transition-colors cursor-default"
    >
      {/* Running Number */}
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222] tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </div>

      {/* Horizontal Divider Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delayIndex * 0.12 + 0.2 }}
        className="h-[2.5px] bg-[#f28822] my-4 rounded-full"
      />

      {/* Label */}
      <div className="text-sm sm:text-base font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export default function OurStrength() {
  return (
    <section id="our-strength" className="bg-white py-20 sm:py-28 border-b border-gray-100 overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 text-center">
        {/* Title with orange underline matching design - FADES IN */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-4xl font-medium text-black">
            Our Strength
          </h2>
        </motion.div>

        {/* 4 Stat Columns with Spring Popping Entrance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          <CounterItem target={5000} label="Delegates" delayIndex={0} />
          <CounterItem target={100} label="Exhibitors" delayIndex={1} />
          <CounterItem target={15} label="Countries" delayIndex={2} />
          <CounterItem target={50} label="Speakers" delayIndex={3} />
        </div>
      </div>
    </section>
  );
}
