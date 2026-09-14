"use client";

import { useEffect, useRef, useState } from "react";

/** Change this value to set the event date/time. Indian Mushroom Days: 19-20-21 February 2027 */
export const TARGET_DATE = "2027-02-19T09:00:00+05:30";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
const ZERO_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
// Keep just below one second so every seconds change completes before the next.
const FLIP_DURATION = 960;

function calculateTimeLeft(targetTimestamp: number): TimeLeft {
  const remainingSeconds = Math.max(0, Math.floor((targetTimestamp - Date.now()) / 1000));
  return {
    days: Math.floor(remainingSeconds / 86_400),
    hours: Math.floor((remainingSeconds % 86_400) / 3_600),
    minutes: Math.floor((remainingSeconds % 3_600) / 60),
    seconds: remainingSeconds % 60,
  };
}

interface DigitProps { digit: string }

/** A full four-face split-flap card, with stable faces behind each movement. */
export function Digit({ digit }: DigitProps) {
  const [displayedDigit, setDisplayedDigit] = useState(digit);
  const [nextDigit, setNextDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);
  const finishTimer = useRef<number | null>(null);

  useEffect(() => {
    if (digit === displayedDigit) return;
    if (finishTimer.current !== null) window.clearTimeout(finishTimer.current);

    const startTimer = window.setTimeout(() => {
      setNextDigit(digit);
      setIsFlipping(true);
      finishTimer.current = window.setTimeout(() => {
        setDisplayedDigit(digit);
        setIsFlipping(false);
        finishTimer.current = null;
      }, FLIP_DURATION);
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
      if (finishTimer.current !== null) {
        window.clearTimeout(finishTimer.current);
        finishTimer.current = null;
      }
    };
  }, [digit, displayedDigit]);

  return (
    <div className={`flip-digit${isFlipping ? " is-flipping" : ""}`} aria-label={digit}>
      <div className="flip-digit-half flip-digit-top" aria-hidden="true"><span>{isFlipping ? nextDigit : displayedDigit}</span></div>
      <div className="flip-digit-half flip-digit-bottom" aria-hidden="true"><span>{displayedDigit}</span></div>
      {isFlipping && (
        <div className="flip-animation" aria-hidden="true">
          <div className="flip-front"><span>{displayedDigit}</span></div>
          <div className="flip-back"><span>{nextDigit}</span></div>
        </div>
      )}
      <div className="flip-divider" aria-hidden="true" />
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const formatted = String(Math.max(0, value)).padStart(2, "0");
  return (
    <div className="countdown-unit">
      <div className="countdown-digits">{formatted.split("").map((digit, index) => <Digit digit={digit} key={index} />)}</div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

function Separator() {
  return <div className="countdown-separator" aria-hidden="true"><span /><span /></div>;
}

interface CountdownTimerProps { targetDate?: string; onComplete?: () => void; className?: string }

export default function CountdownTimer({ targetDate = TARGET_DATE, onComplete, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const targetTimestamp = new Date(targetDate).getTime();
    if (Number.isNaN(targetTimestamp)) {
      console.error("CountdownTimer: Invalid target date:", targetDate);
      const invalidDateTimer = window.setTimeout(() => setTimeLeft(ZERO_TIME), 0);
      return () => window.clearTimeout(invalidDateTimer);
    }

    let nextTick = 0;
    const updateCountdown = () => {
      window.clearTimeout(nextTick);
      const nextTime = calculateTimeLeft(targetTimestamp);
      setTimeLeft(nextTime);
      const complete = Object.values(nextTime).every((value) => value === 0);
      if (complete && !completedRef.current) onComplete?.();
      completedRef.current = complete;
      nextTick = window.setTimeout(updateCountdown, 1_000 - (Date.now() % 1_000) + 16);
    };

    updateCountdown();
    const refresh = () => { if (!document.hidden) updateCountdown(); };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearTimeout(nextTick);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [targetDate, onComplete]);

  if (!timeLeft) {
    return (
      <section className={`py-12 sm:py-16 bg-[#faf9f5] border-b border-gray-200/80 ${className}`} aria-hidden="true">
        <div className="max-w-5xl mx-auto px-4 flex justify-center">
          <div className="countdown-placeholder" />
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden relative ${className}`} aria-label="Event countdown">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Editorial Subtitle */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#f28822] mb-6 font-sans text-center">
          <span className="w-2 h-2 rounded-full bg-[#f28822] animate-pulse" />
          <span>OFFICIAL COUNTDOWN TO INAUGURATION • FEBRUARY 19, 2027</span>
        </div>

        <div className="countdown-container">
          <CountdownUnit value={timeLeft.days} label="DAYS" />
          <div className="days-hours-space" aria-hidden="true" />
          <CountdownUnit value={timeLeft.hours} label="HOURS" />
          <Separator />
          <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
          <Separator />
          <CountdownUnit value={timeLeft.seconds} label="SECONDS" />
        </div>
      </div>
    </section>
  );
}
