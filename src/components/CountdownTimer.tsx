"use client";

import { useEffect, useState } from "react";

export const TARGET_DATE = "2027-02-19T09:00:00+05:30";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ZERO_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function calculateTimeLeft(targetTimestamp: number): TimeLeft {
  const remainingSeconds = Math.max(0, Math.floor((targetTimestamp - Date.now()) / 1000));
  return {
    days: Math.floor(remainingSeconds / 86_400),
    hours: Math.floor((remainingSeconds % 86_400) / 3_600),
    minutes: Math.floor((remainingSeconds % 3_600) / 60),
    seconds: remainingSeconds % 60,
  };
}

export default function CountdownTimer({ targetDate = TARGET_DATE }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const targetTimestamp = new Date(targetDate).getTime();
    if (Number.isNaN(targetTimestamp)) {
      setTimeLeft(ZERO_TIME);
      return;
    }

    const update = () => {
      setTimeLeft(calculateTimeLeft(targetTimestamp));
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  const days = timeLeft ? String(timeLeft.days).padStart(timeLeft.days >= 100 ? 3 : 2, "0") : "157";
  const hours = timeLeft ? String(timeLeft.hours).padStart(2, "0") : "14";
  const minutes = timeLeft ? String(timeLeft.minutes).padStart(2, "0") : "27";
  const seconds = timeLeft ? String(timeLeft.seconds).padStart(2, "0") : "41";

  const units = [
    { value: days, label: "DAY(S)" },
    { value: hours, label: "HOUR" },
    { value: minutes, label: "MINUTE" },
    { value: seconds, label: "SECOND" },
  ];

  if (!timeLeft) {
    return (
      <div className="rounded-3xl sm:rounded-[3rem] bg-[#0c141c]/95 border-2 border-white/25 px-10 py-8 shadow-2xl">
        <div className="h-28 w-96 bg-white/5 animate-pulse rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center rounded-3xl sm:rounded-[3rem] bg-[#0c141c]/95 backdrop-blur-2xl border-2 border-white/25 px-6 py-5 sm:px-12 sm:py-8 md:px-16 md:py-9 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.95),_0_0_45px_rgba(242,136,34,0.18)] select-none">
      {/* Top subtle amber glowing line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#f28822] to-transparent" />

      {/* 4 Large Circular Countdown Badges */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-11">
        {units.map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* Circular Dark Badge with proper border and background */}
            <div className="w-[82px] h-[82px] sm:w-[110px] sm:h-[110px] md:w-[132px] md:h-[132px] rounded-full bg-gradient-to-b from-[#1c2836] to-[#101820] border-[2.5px] sm:border-[3px] border-white/25 sm:border-white/30 shadow-[inset_0_3px_6px_rgba(255,255,255,0.12),_0_15px_30px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-[#f28822]">
              <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white font-sans tracking-tight leading-none drop-shadow-md">
                {unit.value}
              </span>
            </div>

            {/* Clean Uppercase Unit Label */}
            <span className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] text-gray-300 font-sans mt-3 sm:mt-4">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
