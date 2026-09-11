"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

interface DayPlan {
  dayNumber: string;
  tagline: string;
  date: string;
  href: string;
}

const DAYS: DayPlan[] = [
  {
    dayNumber: "DAY 01",
    tagline: "DISCOVER",
    date: "February 19, 2027",
    href: "/schedule/day-1",
  },
  {
    dayNumber: "DAY 02",
    tagline: "INNOVATE",
    date: "February 20, 2027",
    href: "/schedule/day-2",
  },
  {
    dayNumber: "DAY 03",
    tagline: "GROW",
    date: "February 21, 2027",
    href: "/schedule/day-3",
  },
];

interface Point {
  x: number;
  y: number;
}

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = [
    useRef<HTMLAnchorElement>(null),
    useRef<HTMLAnchorElement>(null),
    useRef<HTMLAnchorElement>(null),
  ];

  // Hidden path refs to measure actual SVG length and coordinates
  const trunkRef = useRef<SVGPathElement>(null);
  const branch1Ref = useRef<SVGPathElement>(null);
  const branch2Ref = useRef<SVGPathElement>(null);
  const branch3Ref = useRef<SVGPathElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Path data strings
  const [paths, setPaths] = useState({
    trunk: "",
    branch1: "",
    branch2: "",
    branch3: "",
  });

  // Endpoints for dots and arrows
  const [endpoints, setEndpoints] = useState<{
    top: Point;
    card1: Point;
    card2: Point;
    card3: Point;
  }>({
    top: { x: 0, y: 0 },
    card1: { x: 0, y: 0 },
    card2: { x: 0, y: 0 },
    card3: { x: 0, y: 0 },
  });

  // Measured path lengths for stroke-dashoffset animation
  const [lengths, setLengths] = useState({
    trunk: 120,
    branch1: 180,
    branch2: 150,
    branch3: 180,
  });

  // Scroll progress through the section [0, 1]
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Moving dot coordinates
  const [movingDots, setMovingDots] = useState<{
    trunk?: Point;
    branch1?: Point;
    branch2?: Point;
    branch3?: Point;
  }>({});

  const idPrefix = useId().replace(/:/g, "_");

  // Check reduced motion
  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Recalculate coordinates based on real card positions
  const updateGeometry = () => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    if (cRect.width === 0) return;

    const mobile = window.innerWidth < 768; // md breakpoint
    setIsMobile(mobile);

    const c1El = cardRefs[0].current;
    const c2El = cardRefs[1].current;
    const c3El = cardRefs[2].current;

    if (!c1El || !c2El || !c3El) return;

    const r1 = c1El.getBoundingClientRect();
    const r2 = c2El.getBoundingClientRect();
    const r3 = c3El.getBoundingClientRect();

    if (!mobile) {
      // ----------------------------------------------------
      // DESKTOP: Generous vertical distance above cards
      // Top center dot -> Trunk -> 3 branches with arrows
      // ----------------------------------------------------
      const startX = cRect.width / 2;
      const startY = 18; // top dot position

      const card1X = r1.left - cRect.left + r1.width / 2;
      const card1Y = r1.top - cRect.top;

      const card2X = r2.left - cRect.left + r2.width / 2;
      const card2Y = r2.top - cRect.top;

      const card3X = r3.left - cRect.left + r3.width / 2;
      const card3Y = r3.top - cRect.top;

      const minCardY = Math.min(card1Y, card2Y, card3Y);

      // Junction point (approx 40% of the vertical drop)
      const forkX = startX;
      const forkY = startY + (minCardY - startY) * 0.40;

      // Arrow target offset: terminate the dotted line 12px before card so arrow fits cleanly
      const target1Y = card1Y - 12;
      const target2Y = card2Y - 12;
      const target3Y = card3Y - 12;

      // 1. Trunk path from top dot to junction
      const trunkD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} L ${forkX.toFixed(1)} ${forkY.toFixed(1)}`;

      // 2. Branch 1: Curves smoothly left into Day 1
      const cp1_1_X = forkX - (forkX - card1X) * 0.15;
      const cp1_1_Y = forkY + (target1Y - forkY) * 0.50;
      const cp1_2_X = card1X + (forkX - card1X) * 0.08;
      const cp1_2_Y = forkY + (target1Y - forkY) * 0.75;
      const branch1D = `M ${forkX.toFixed(1)} ${forkY.toFixed(1)} C ${cp1_1_X.toFixed(1)} ${cp1_1_Y.toFixed(1)}, ${cp1_2_X.toFixed(1)} ${cp1_2_Y.toFixed(1)}, ${card1X.toFixed(1)} ${target1Y.toFixed(1)}`;

      // 3. Branch 2: Center branch straight down into Day 2
      const branch2D = `M ${forkX.toFixed(1)} ${forkY.toFixed(1)} L ${card2X.toFixed(1)} ${target2Y.toFixed(1)}`;

      // 4. Branch 3: Curves smoothly right into Day 3
      const cp3_1_X = forkX + (card3X - forkX) * 0.15;
      const cp3_1_Y = forkY + (target3Y - forkY) * 0.50;
      const cp3_2_X = card3X - (card3X - forkX) * 0.08;
      const cp3_2_Y = forkY + (target3Y - forkY) * 0.75;
      const branch3D = `M ${forkX.toFixed(1)} ${forkY.toFixed(1)} C ${cp3_1_X.toFixed(1)} ${cp3_1_Y.toFixed(1)}, ${cp3_2_X.toFixed(1)} ${cp3_2_Y.toFixed(1)}, ${card3X.toFixed(1)} ${target3Y.toFixed(1)}`;

      setPaths({
        trunk: trunkD,
        branch1: branch1D,
        branch2: branch2D,
        branch3: branch3D,
      });

      setEndpoints({
        top: { x: startX, y: startY },
        card1: { x: card1X, y: card1Y },
        card2: { x: card2X, y: card2Y },
        card3: { x: card3X, y: card3Y },
      });
    } else {
      // ----------------------------------------------------
      // MOBILE: Left-side vertical spine branching horizontally
      // into each vertically stacked card
      // ----------------------------------------------------
      const spineX = 18;
      const startY = 12;

      const card1X = r1.left - cRect.left;
      const card1Y = r1.top - cRect.top + r1.height / 2;

      const card2X = r2.left - cRect.left;
      const card2Y = r2.top - cRect.top + r2.height / 2;

      const card3X = r3.left - cRect.left;
      const card3Y = r3.top - cRect.top + r3.height / 2;

      // Target offset: terminate 10px before card for horizontal arrow
      const target1X = card1X - 10;
      const target2X = card2X - 10;
      const target3X = card3X - 10;

      const trunkD = `M ${spineX} ${startY} L ${spineX} ${(card1Y - 14).toFixed(1)}`;
      const branch1D = `M ${spineX} ${(card1Y - 14).toFixed(1)} Q ${spineX} ${card1Y.toFixed(1)} ${(spineX + 14).toFixed(1)} ${card1Y.toFixed(1)} L ${target1X.toFixed(1)} ${card1Y.toFixed(1)}`;
      const branch2D = `M ${spineX} ${(card1Y - 14).toFixed(1)} L ${spineX} ${(card2Y - 14).toFixed(1)} Q ${spineX} ${card2Y.toFixed(1)} ${(spineX + 14).toFixed(1)} ${card2Y.toFixed(1)} L ${target2X.toFixed(1)} ${card2Y.toFixed(1)}`;
      const branch3D = `M ${spineX} ${(card2Y - 14).toFixed(1)} L ${spineX} ${(card3Y - 14).toFixed(1)} Q ${spineX} ${card3Y.toFixed(1)} ${(spineX + 14).toFixed(1)} ${card3Y.toFixed(1)} L ${target3X.toFixed(1)} ${card3Y.toFixed(1)}`;

      setPaths({
        trunk: trunkD,
        branch1: branch1D,
        branch2: branch2D,
        branch3: branch3D,
      });

      setEndpoints({
        top: { x: spineX, y: startY },
        card1: { x: card1X, y: card1Y },
        card2: { x: card2X, y: card2Y },
        card3: { x: card3X, y: card3Y },
      });
    }
  };

  // Measure path lengths on path updates
  useEffect(() => {
    if (!mounted) return;
    const tLen = trunkRef.current?.getTotalLength() || 120;
    const b1Len = branch1Ref.current?.getTotalLength() || 180;
    const b2Len = branch2Ref.current?.getTotalLength() || 150;
    const b3Len = branch3Ref.current?.getTotalLength() || 180;

    setLengths({
      trunk: Math.max(1, tLen),
      branch1: Math.max(1, b1Len),
      branch2: Math.max(1, b2Len),
      branch3: Math.max(1, b3Len),
    });
  }, [paths, mounted]);

  // Resize & Orientation Observers
  useEffect(() => {
    updateGeometry();
    const handleResize = () => updateGeometry();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateGeometry());
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (ro) ro.disconnect();
    };
  }, [mounted]);

  // Scroll Progress Tracking tied strictly to section position
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!sectionRef.current) return;

        if (prefersReducedMotion) {
          setScrollProgress(1);
          return;
        }

        const rect = sectionRef.current.getBoundingClientRect();
        const winH = window.innerHeight;

        // Start when section top enters into view
        const startPoint = winH * 0.75;
        const endPoint = winH * 0.20;

        const totalScrollable = startPoint - endPoint + rect.height * 0.35;
        const currentProgress = (startPoint - rect.top) / totalScrollable;

        const clamped = Math.max(0, Math.min(1, currentProgress));
        setScrollProgress(clamped);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, mounted]);

  // Sequential Stagger Calculations
  // Trunk: [0.00 -> 0.25]
  // Branches 1, 2, 3 start smoothly from junction together with subtle stagger:
  // Branch 1 (left):   [0.22 -> 0.72]
  // Branch 2 (center): [0.22 -> 0.68]
  // Branch 3 (right):  [0.22 -> 0.75]
  const effectiveProgress = prefersReducedMotion ? 1 : scrollProgress;

  const trunkProgress = Math.max(0, Math.min(1, effectiveProgress / 0.25));
  const branch1Progress = Math.max(0, Math.min(1, (effectiveProgress - 0.22) / 0.50));
  const branch2Progress = Math.max(0, Math.min(1, (effectiveProgress - 0.22) / 0.46));
  const branch3Progress = Math.max(0, Math.min(1, (effectiveProgress - 0.22) / 0.53));

  // Compute positions of the active moving glowing dots
  useEffect(() => {
    if (prefersReducedMotion || !mounted) {
      setMovingDots({});
      return;
    }

    const dots: {
      trunk?: Point;
      branch1?: Point;
      branch2?: Point;
      branch3?: Point;
    } = {};

    try {
      if (trunkRef.current && trunkProgress > 0.05 && trunkProgress < 0.98) {
        const pt = trunkRef.current.getPointAtLength(trunkProgress * lengths.trunk);
        dots.trunk = { x: pt.x, y: pt.y };
      }
      if (branch1Ref.current && branch1Progress > 0.05 && branch1Progress < 0.98) {
        const pt = branch1Ref.current.getPointAtLength(branch1Progress * lengths.branch1);
        dots.branch1 = { x: pt.x, y: pt.y };
      }
      if (branch2Ref.current && branch2Progress > 0.05 && branch2Progress < 0.98) {
        const pt = branch2Ref.current.getPointAtLength(branch2Progress * lengths.branch2);
        dots.branch2 = { x: pt.x, y: pt.y };
      }
      if (branch3Ref.current && branch3Progress > 0.05 && branch3Progress < 0.98) {
        const pt = branch3Ref.current.getPointAtLength(branch3Progress * lengths.branch3);
        dots.branch3 = { x: pt.x, y: pt.y };
      }
    } catch {
      // Ignore calculation errors during unmount or transition
    }

    setMovingDots(dots);
  }, [
    trunkProgress,
    branch1Progress,
    branch2Progress,
    branch3Progress,
    lengths,
    prefersReducedMotion,
    mounted,
  ]);

  const maskIdTrunk = `${idPrefix}_mask_trunk`;
  const maskIdB1 = `${idPrefix}_mask_b1`;
  const maskIdB2 = `${idPrefix}_mask_b2`;
  const maskIdB3 = `${idPrefix}_mask_b3`;
  const glowFilterId = `${idPrefix}_glow`;

  return (
    <section
      ref={sectionRef}
      id="program-agenda"
      className="bg-white py-16 sm:py-24 border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Section Title matching website theme and style */}
        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-4xl font-medium text-black">
            Schedule &amp; Program Agenda
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Three dynamic days of knowledge sharing, live masterclasses, and global collaboration at Bharat Mandapam, New Delhi.
          </p>
        </div>

        {/* ==================================================================== */}
        {/* TIMELINE CONTAINER WITH EXPANDED VERTICAL DISTANCE (~180px - 220px)   */}
        {/* ==================================================================== */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto pt-40 sm:pt-48 md:pt-56 pl-10 md:pl-0"
        >
          {/* SVG DOTTED TIMELINE CANVAS */}
          {paths.trunk && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                {/* Subtle warm orange/gold glow filter */}
                <filter id={glowFilterId} x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Progressive SVG Masks: maskUnits="userSpaceOnUse" fixes vertical line rendering bug */}
                <mask
                  id={maskIdTrunk}
                  maskUnits="userSpaceOnUse"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <path
                    d={paths.trunk}
                    stroke="white"
                    strokeWidth="14"
                    strokeDasharray={lengths.trunk}
                    strokeDashoffset={lengths.trunk * (1 - trunkProgress)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </mask>
                <mask
                  id={maskIdB1}
                  maskUnits="userSpaceOnUse"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <path
                    d={paths.branch1}
                    stroke="white"
                    strokeWidth="14"
                    strokeDasharray={lengths.branch1}
                    strokeDashoffset={lengths.branch1 * (1 - branch1Progress)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </mask>
                <mask
                  id={maskIdB2}
                  maskUnits="userSpaceOnUse"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <path
                    d={paths.branch2}
                    stroke="white"
                    strokeWidth="14"
                    strokeDasharray={lengths.branch2}
                    strokeDashoffset={lengths.branch2 * (1 - branch2Progress)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </mask>
                <mask
                  id={maskIdB3}
                  maskUnits="userSpaceOnUse"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <path
                    d={paths.branch3}
                    stroke="white"
                    strokeWidth="14"
                    strokeDasharray={lengths.branch3}
                    strokeDashoffset={lengths.branch3 * (1 - branch3Progress)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </mask>
              </defs>

              {/* Hidden reference paths solely for geometry calculations */}
              <path ref={trunkRef} d={paths.trunk} fill="none" stroke="none" />
              <path ref={branch1Ref} d={paths.branch1} fill="none" stroke="none" />
              <path ref={branch2Ref} d={paths.branch2} fill="none" stroke="none" />
              <path ref={branch3Ref} d={paths.branch3} fill="none" stroke="none" />

              {/* Dotted Lines with true circular dots and consistent spacing */}
              <path
                d={paths.trunk}
                stroke="#f28822"
                strokeWidth="2.5"
                strokeDasharray="1 8"
                strokeLinecap="round"
                fill="none"
                mask={`url(#${maskIdTrunk})`}
                opacity="0.9"
              />
              <path
                d={paths.branch1}
                stroke="#f28822"
                strokeWidth="2.5"
                strokeDasharray="1 8"
                strokeLinecap="round"
                fill="none"
                mask={`url(#${maskIdB1})`}
                opacity="0.9"
              />
              <path
                d={paths.branch2}
                stroke="#f28822"
                strokeWidth="2.5"
                strokeDasharray="1 8"
                strokeLinecap="round"
                fill="none"
                mask={`url(#${maskIdB2})`}
                opacity="0.9"
              />
              <path
                d={paths.branch3}
                stroke="#f28822"
                strokeWidth="2.5"
                strokeDasharray="1 8"
                strokeLinecap="round"
                fill="none"
                mask={`url(#${maskIdB3})`}
                opacity="0.9"
              />

              {/* 1. TOP CENTER GLOWING ORANGE/GOLD DOT */}
              <circle
                cx={endpoints.top.x}
                cy={endpoints.top.y}
                r={4.5}
                fill="#f28822"
                filter={`url(#${glowFilterId})`}
              />
              <circle
                cx={endpoints.top.x}
                cy={endpoints.top.y}
                r={8.5}
                fill="none"
                stroke="#f28822"
                strokeWidth="1.2"
                opacity="0.5"
                className="animate-pulse"
              />

              {/* 2. ACTIVE TRAVELING GLOWING DOTS */}
              {movingDots.trunk && (
                <circle
                  cx={movingDots.trunk.x}
                  cy={movingDots.trunk.y}
                  r={3.8}
                  fill="#f28822"
                  filter={`url(#${glowFilterId})`}
                />
              )}
              {movingDots.branch1 && (
                <circle
                  cx={movingDots.branch1.x}
                  cy={movingDots.branch1.y}
                  r={3.8}
                  fill="#f28822"
                  filter={`url(#${glowFilterId})`}
                />
              )}
              {movingDots.branch2 && (
                <circle
                  cx={movingDots.branch2.x}
                  cy={movingDots.branch2.y}
                  r={3.8}
                  fill="#f28822"
                  filter={`url(#${glowFilterId})`}
                />
              )}
              {movingDots.branch3 && (
                <circle
                  cx={movingDots.branch3.x}
                  cy={movingDots.branch3.y}
                  r={3.8}
                  fill="#f28822"
                  filter={`url(#${glowFilterId})`}
                />
              )}

              {/* 3. CARD ENDPOINTS & DOWNWARD ARROWS (Stationary & cleanly connected) */}
              {branch1Progress >= 0.90 && (
                <g className="transition-opacity duration-300">
                  {/* Glowing terminal node */}
                  <circle
                    cx={isMobile ? endpoints.card1.x - 10 : endpoints.card1.x}
                    cy={isMobile ? endpoints.card1.y : endpoints.card1.y - 12}
                    r={3.5}
                    fill="#f28822"
                    filter={`url(#${glowFilterId})`}
                  />
                  {/* Stationary downward pointing arrow directly into card */}
                  {!isMobile ? (
                    <path
                      d={`M ${endpoints.card1.x - 4.5} ${endpoints.card1.y - 8} L ${endpoints.card1.x} ${endpoints.card1.y - 3} L ${endpoints.card1.x + 4.5} ${endpoints.card1.y - 8}`}
                      stroke="#f28822"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  ) : (
                    <path
                      d={`M ${endpoints.card1.x - 8} ${endpoints.card1.y - 4.5} L ${endpoints.card1.x - 3} ${endpoints.card1.y} L ${endpoints.card1.x - 8} ${endpoints.card1.y + 4.5}`}
                      stroke="#f28822"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  )}
                </g>
              )}

              {branch2Progress >= 0.90 && (
                <g className="transition-opacity duration-300">
                  <circle
                    cx={isMobile ? endpoints.card2.x - 10 : endpoints.card2.x}
                    cy={isMobile ? endpoints.card2.y : endpoints.card2.y - 12}
                    r={3.5}
                    fill="#f28822"
                    filter={`url(#${glowFilterId})`}
                  />
                  {!isMobile ? (
                    <path
                      d={`M ${endpoints.card2.x - 4.5} ${endpoints.card2.y - 8} L ${endpoints.card2.x} ${endpoints.card2.y - 3} L ${endpoints.card2.x + 4.5} ${endpoints.card2.y - 8}`}
                      stroke="#f28822"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  ) : (
                    <path
                      d={`M ${endpoints.card2.x - 8} ${endpoints.card2.y - 4.5} L ${endpoints.card2.x - 3} ${endpoints.card2.y} L ${endpoints.card2.x - 8} ${endpoints.card2.y + 4.5}`}
                      stroke="#f28822"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  )}
                </g>
              )}

              {branch3Progress >= 0.90 && (
                <g className="transition-opacity duration-300">
                  <circle
                    cx={isMobile ? endpoints.card3.x - 10 : endpoints.card3.x}
                    cy={isMobile ? endpoints.card3.y : endpoints.card3.y - 12}
                    r={3.5}
                    fill="#f28822"
                    filter={`url(#${glowFilterId})`}
                  />
                  {!isMobile ? (
                    <path
                      d={`M ${endpoints.card3.x - 4.5} ${endpoints.card3.y - 8} L ${endpoints.card3.x} ${endpoints.card3.y - 3} L ${endpoints.card3.x + 4.5} ${endpoints.card3.y - 8}`}
                      stroke="#f28822"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  ) : (
                    <path
                      d={`M ${endpoints.card3.x - 8} ${endpoints.card3.y - 4.5} L ${endpoints.card3.x - 3} ${endpoints.card3.y} L ${endpoints.card3.x - 8} ${endpoints.card3.y + 4.5}`}
                      stroke="#f28822"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  )}
                </g>
              )}
            </svg>
          )}

          {/* ==================================================================== */}
          {/* 3 DAY BUTTON CARDS (Horizontal on Desktop, Vertical Stack on Mobile) */}
          {/* ==================================================================== */}
          <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between gap-4 sm:gap-5">
            {DAYS.map((day, idx) => {
              const isReached =
                idx === 0
                  ? branch1Progress >= 0.90
                  : idx === 1
                  ? branch2Progress >= 0.90
                  : branch3Progress >= 0.90;

              return (
                <Link
                  key={day.dayNumber}
                  ref={cardRefs[idx]}
                  href={day.href}
                  style={{
                    opacity: prefersReducedMotion ? 1 : isReached ? 1 : 0.88,
                  }}
                  className={`flex-1 py-3.5 sm:py-4 px-5 rounded-xl md:rounded-full bg-white text-slate-900 border shadow-xs hover:border-[#f28822] hover:text-[#f28822] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center group cursor-pointer ${
                    isReached ? "border-[#f28822]/70 shadow-sm" : "border-slate-200/90"
                  }`}
                >
                  <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-900 group-hover:text-[#f28822] transition-colors">
                    <Calendar className="w-3.5 h-3.5 text-[#f28822]" />
                    <span>
                      {day.dayNumber} – {day.tagline}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5 group-hover:text-slate-700 transition-colors">
                    {day.date}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
