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

export default function ScheduleSection() {
  return (
    <section id="program-agenda" className="bg-white py-16 sm:py-24 border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Section Title matching website theme and style */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-4xl font-medium text-black">
            Schedule &amp; Program Agenda
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Three dynamic days of knowledge sharing, live masterclasses, and global collaboration at Bharat Mandapam, New Delhi.
          </p>
        </div>

        {/* 3 Day Buttons Bar matching website design, style, and feel */}
        <div className="max-w-4xl mx-auto bg-slate-50/80 border border-slate-200/90 rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-inner flex flex-col sm:flex-row items-stretch justify-between gap-2.5 sm:gap-3">
          {DAYS.map((day) => (
            <Link
              key={day.dayNumber}
              href={day.href}
              className="flex-1 py-3.5 sm:py-4 px-5 rounded-xl sm:rounded-full bg-white text-slate-900 border border-slate-200/90 shadow-xs hover:border-[#f28822] hover:text-[#f28822] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center group cursor-pointer"
            >
              <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-900 group-hover:text-[#f28822] transition-colors">
                <Calendar className="w-3.5 h-3.5 text-[#f28822]" />
                <span>{day.dayNumber} – {day.tagline}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 group-hover:text-slate-700 transition-colors">
                {day.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
