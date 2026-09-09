"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterItemProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function CounterItem({
  target,
  suffix = "+",
  label,
  duration = 2000,
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
    <div ref={elementRef} className="flex flex-col items-center justify-center text-center">
      {/* Running Number */}
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222] tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-10 h-[2px] bg-gray-400 my-4" />

      {/* Label */}
      <div className="text-sm sm:text-base font-normal text-gray-700">
        {label}
      </div>
    </div>
  );
}

export default function OurStrength() {
  return (
    <section id="our-strength" className="bg-white py-20 sm:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title with orange underline matching design */}
        <div className="mb-16 sm:mb-20">
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-4xl font-medium text-black">
            Our Strength
          </h2>
        </div>

        {/* 4 Stat Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          <CounterItem target={300} label="Exhibitors" />
          <CounterItem target={5000} label="Visitors" />
          <CounterItem target={20} label="Meetings" />
          <CounterItem target={20} label="Countries & Regions" />
        </div>
      </div>
    </section>
  );
}
