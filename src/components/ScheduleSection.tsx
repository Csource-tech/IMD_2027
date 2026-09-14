"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
} from "lucide-react";

interface ScheduleHighlight {
  time: string;
  title: string;
  category: string;
  hall: string;
  speakers?: string;
  desc: string;
}

interface DayPlan {
  id: string;
  slug: string;
  dayNumber: string;
  theme: string;
  date: string;
  tagline: string;
  overview: string;
  highlights: ScheduleHighlight[];
}

const PROGRAM_DAYS: DayPlan[] = [
  {
    id: "day-1",
    slug: "day-1",
    dayNumber: "DAY 01",
    tagline: "DISCOVER",
    theme: "Market Discovery, Spawn Biotechnology & Inauguration",
    date: "February 19, 2027",
    overview:
      "Grand Inaugural Ceremony with Ministry leaders, unveiling the national roadmap for 2030, followed by masterclasses on certified spawn genetics and bulk composting.",
    highlights: [
      {
        time: "09:00 AM – 10:30 AM",
        title: "Grand Inaugural Ceremony & Welcome Address",
        category: "Ceremony",
        hall: "Plenary Hall A",
        speakers: "Ministry of Agriculture Leaders & IMD Board",
        desc: "Official ribbon cutting and vision keynote charting the next decade of India's commercial mushroom cultivation.",
      },
      {
        time: "10:45 AM – 12:15 PM",
        title: "Global Edible Fungi Market: Trends, Demand & Export Trajectories",
        category: "Keynote",
        hall: "Plenary Hall A",
        speakers: "International Mycology Economists",
        desc: "Deep-dive into worldwide supply deficits, fresh & dried trade flows, and bilateral export agreements.",
      },
      {
        time: "12:30 PM – 01:45 PM",
        title: "Commercial Spawn Biotechnology & Contamination Control",
        category: "Masterclass",
        hall: "Symposium Hall B",
        speakers: "Spawn Scientists & Milkyway Technical Leads",
        desc: "Certified grain spawn propagation, strain genetic vigor, liquid culture biosecurity, and sterile cleanrooms.",
      },
      {
        time: "04:30 PM – 06:00 PM",
        title: "Shroom Connect: B2B Matchmaking Launch & Trade Floor Walk",
        category: "B2B Networking",
        hall: "Exhibition Hall 1 & 2",
        speakers: "Supermarket Retail Buyers & 100+ Exhibitors",
        desc: "Pre-scheduled 1-on-1 procurement discussions linking cultivators directly to institutional retail chains.",
      },
    ],
  },
  {
    id: "day-2",
    slug: "day-2",
    dayNumber: "DAY 02",
    tagline: "INNOVATE",
    theme: "CEA Farm Automation, Medicinal Mushrooms & Deep Processing",
    date: "February 20, 2027",
    overview:
      "Precision Controlled Environment Agriculture (CEA), smart climate rooms, high-margin medicinal fungi (Cordyceps, Reishi), and the National Horticulture Board (NHB) capital subsidy clinic.",
    highlights: [
      {
        time: "09:30 AM – 11:00 AM",
        title: "Controlled Environment Agriculture (CEA) & Smart Climate Chambers",
        category: "Agri-Tech Panel",
        hall: "Plenary Hall A",
        speakers: "CEA Automation Engineers & HVAC Leads",
        desc: "Precision chilling (16°C–18°C), 90% RH humidity control, sensor arrays, and multi-tier racking systems.",
      },
      {
        time: "11:15 AM – 12:45 PM",
        title: "Cultivation of High-Value Medicinal & Functional Fungi",
        category: "Masterclass",
        hall: "Symposium Hall B",
        speakers: "Specialist Mycologists & Nutraceutical Brands",
        desc: "Commercial growing protocols for Cordyceps militaris, Ganoderma (Reishi), and Lion's Mane.",
      },
      {
        time: "01:45 PM – 03:15 PM",
        title: "Deep Processing: Freeze-Drying, Powders & Value-Added Products",
        category: "Innovation Forum",
        hall: "Plenary Hall A",
        speakers: "Food Processing Technologists",
        desc: "Industrial freeze-drying (lyophilization), mushroom extract seasoning, instant soups, and vacuum-fried snacks.",
      },
      {
        time: "03:30 PM – 05:00 PM",
        title: "National Horticulture Board (NHB) Subsidies & Project Finance",
        category: "Financing Clinic",
        hall: "Conference Room C",
        speakers: "NHB Senior Officers & Agri-Bank Executives",
        desc: "Securing 35%–50% capital subsidies, preparing bankable Detailed Project Reports (DPR), and commercial term credit.",
      },
    ],
  },
  {
    id: "day-3",
    slug: "day-3",
    dayNumber: "DAY 03",
    tagline: "GROW",
    theme: "Cold-Chain Logistics, Export Linkages & Valedictory Awards",
    date: "February 21, 2027",
    overview:
      "Scaling regional distribution, Modified Atmosphere Packaging (MAP), meeting European/Middle Eastern export certifications, and honoring industry champions at the Valedictory Awards.",
    highlights: [
      {
        time: "09:30 AM – 11:00 AM",
        title: "Cold-Chain Logistics & Shelf-Life Extension Technologies",
        category: "Supply Chain",
        hall: "Plenary Hall A",
        speakers: "Cold-Chain Infrastructure Specialists",
        desc: "Mitigating post-harvest spoilage, rapid hydro/vacuum cooling, breathable barrier films, and refrigerated transport.",
      },
      {
        time: "11:15 AM – 12:45 PM",
        title: "Navigating Global Export Standards: APEDA & Phytosanitary Norms",
        category: "Export Symposium",
        hall: "Plenary Hall A",
        speakers: "APEDA Advisors & Quality Auditors",
        desc: "Complying with international residue limits, packaging requirements, and tapping lucrative export markets.",
      },
      {
        time: "01:45 PM – 03:15 PM",
        title: "The Next Decade of Indian Mushroom Farming: Open Dialogue",
        category: "Panel Discussion",
        hall: "Plenary Hall A",
        speakers: "Grower Associations, Scientists & Trade Leads",
        desc: "Collaborative recommendations on government policies, quality standardization, and consumer awareness campaigns.",
      },
      {
        time: "03:30 PM – 05:00 PM",
        title: "Industry Excellence Awards & Valedictory Ceremony",
        category: "Awards & Closing",
        hall: "Grand Auditorium",
        speakers: "Chief Guests & IMD Advisory Board",
        desc: "Honoring progressive growers, leading spawn innovators, cutting-edge tech exhibitors, and women entrepreneurs.",
      },
    ],
  },
];

export default function ScheduleSection() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeDay = PROGRAM_DAYS[activeDayIndex];

  return (
    <section
      id="program-agenda"
      className="relative py-20 sm:py-28 bg-white border-b border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84c52c]/15 border border-[#84c52c]/30 text-xs font-bold text-[#456b14] uppercase tracking-wider mb-4"
          >
            <span>3-Day Comprehensive Itinerary</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-gray-950 uppercase font-sans leading-[1.1]"
          >
            Schedule &amp; <br />
            <span className="font-serif italic font-normal text-gray-700 capitalize">
              Program Agenda
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal"
          >
            Three days of transformative keynotes, scientific masterclasses, commercial buyer roundtables, and high-tech exhibition floor demonstrations.
          </motion.p>
        </div>

        {/* 3 Days Tab Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {PROGRAM_DAYS.map((day, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveDayIndex(idx)}
                className={`p-5 rounded-3xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#0c140f] text-white border-[#0c140f] shadow-xl scale-[1.01]"
                    : "bg-[#faf9f5] text-gray-800 border-gray-200 hover:border-gray-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-black tracking-widest uppercase ${
                      isSelected ? "text-[#f28822]" : "text-gray-500"
                    }`}
                  >
                    {day.dayNumber} • {day.tagline}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-white/15 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {day.date.split(",")[0]}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-lg font-bold leading-tight ${
                      isSelected ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {day.theme}
                  </h3>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="active-day-line"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#f28822]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Day Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Day Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#faf9f5] border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f28822] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{activeDay.date} • New Delhi, India</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                  {activeDay.dayNumber}: {activeDay.theme}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                  {activeDay.overview}
                </p>
              </div>

              <Link
                href={`/schedule/${activeDay.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#0c140f] hover:bg-[#1a2b20] transition-colors shrink-0 shadow-md"
              >
                <span>View Full Day Agenda</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {activeDay.highlights.map((session, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Time & Category */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#f28822] border border-orange-200">
                        {session.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{session.time}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#f28822] transition-colors leading-snug mb-2">
                      {session.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      {session.desc}
                    </p>
                  </div>

                  {/* Hall and Speakers Footer */}
                  <div className="pt-3 border-t border-gray-100 flex flex-col gap-1 text-[11px] text-gray-500">
                    <div className="flex items-center gap-1.5 font-medium text-gray-700">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{session.hall}</span>
                    </div>
                    {session.speakers && (
                      <div className="flex items-center gap-1.5 text-gray-500 truncate">
                        <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{session.speakers}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
