import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  Building2,
  Ticket,
  Store,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

interface Session {
  time: string;
  title: string;
  category: string;
  hall: string;
  speakers?: string;
  desc: string;
}

interface DayData {
  slug: string;
  title: string;
  theme: string;
  date: string;
  subtitle: string;
  overview: string;
  sessions: Session[];
}

const DAYS_SCHEDULE: Record<string, DayData> = {
  "day-1": {
    slug: "day-1",
    title: "DAY 01 – DISCOVER",
    theme: "Market Discovery, Spawn Biotechnology & Inauguration",
    date: "February 19, 2027",
    subtitle: "Opening of India's largest mushroom gathering and global market outlook.",
    overview:
      "Day 1 kicks off Indian Mushroom Days 2027 with high-level inaugural addresses by government officials, followed by in-depth technical masterclasses on high-yield spawn production, strain breeding, and substrate innovations. The day also marks the official launch of the Shroom Connect B2B matchmaking lounge.",
    sessions: [
      {
        time: "09:00 AM – 10:30 AM",
        title: "Grand Inaugural Ceremony & Welcome Address",
        category: "Ceremony",
        hall: "Plenary Hall A, Bharat Mandapam",
        speakers: "Ministry of Agriculture Leaders & Organizing Committee Board",
        desc: "Official ribbon cutting, welcome speeches, and visionary roadmap unveiling for India's mushroom cultivation sector towards 2030.",
      },
      {
        time: "10:45 AM – 12:15 PM",
        title: "Global Edible Fungi Market: Trends, Demand & Export Trajectories",
        category: "Keynote",
        hall: "Plenary Hall A",
        speakers: "International Mycology Experts & Agro-Economists",
        desc: "Comprehensive insights into global supply shortages, high-demand fresh & dried mushroom varieties, and bilateral trade opportunities for Indian growers.",
      },
      {
        time: "12:30 PM – 01:45 PM",
        title: "Commercial Spawn Biotechnology & Contamination Control Protocols",
        category: "Masterclass",
        hall: "Symposium Hall B",
        speakers: "Spawn Laboratory Scientists & Milkyway Technical Leads",
        desc: "Practices for certified spawn production, genetic stability maintenance, liquid spawn optimization, and cleanroom bio-security.",
      },
      {
        time: "02:45 PM – 04:15 PM",
        title: "Substrate Formulation, Casing Soil & Composting Innovations",
        category: "Technical Workshop",
        hall: "Symposium Hall B",
        speakers: "Agri-Biotech Researchers & Substrate Manufacturers",
        desc: "Advanced Phase I, II, and III bulk composting systems, agro-waste utilization, casing soil substitutes, and automated substrate bagging lines.",
      },
      {
        time: "04:30 PM – 06:00 PM",
        title: "Shroom Connect: B2B Matchmaking Launch & Exhibition Floor Walk",
        category: "B2B Networking",
        hall: "Exhibition Hall 1 & 2",
        speakers: "VIP Retail Buyers, Supermarket Chains & 100+ Exhibitors",
        desc: "Pre-scheduled 1-on-1 supplier-buyer introductions and guided trade walkthrough across 100+ technology and equipment stalls.",
      },
    ],
  },
  "day-2": {
    slug: "day-2",
    title: "DAY 02 – INNOVATE",
    theme: "CEA Farm Automation, Medicinal Mushrooms & Deep Processing",
    date: "February 20, 2027",
    subtitle: "High-tech cultivation infrastructure, exotic varieties, and post-harvest value addition.",
    overview:
      "Day 2 focuses on technological transformation. Discover Controlled Environment Agriculture (CEA) climate systems, IoT sensor networks, and commercial cultivation of exotic and medicinal mushrooms (Cordyceps, Reishi, Lion's Mane). Explore freeze-drying, instant meals, and agro-venture financing.",
    sessions: [
      {
        time: "09:30 AM – 11:00 AM",
        title: "Controlled Environment Agriculture (CEA) & Smart Climate Chambers",
        category: "Agri-Tech Panel",
        hall: "Plenary Hall A, Bharat Mandapam",
        speakers: "CEA Automation Engineers & Climate Computer Specialists",
        desc: "Precision temperature, humidity (RH), and CO2 control systems. Energy-saving HVAC designs and automated shelving setups.",
      },
      {
        time: "11:15 AM – 12:45 PM",
        title: "Cultivation & Commercialization of Medicinal & Exotic Fungi",
        category: "Masterclass",
        hall: "Symposium Hall B",
        speakers: "Specialist Mycologists & Functional Food Brands",
        desc: "Protocols for Cordyceps militaris, Ganoderma (Reishi), and Hericium (Lion's Mane). Extraction standards for nutraceutical supplements.",
      },
      {
        time: "01:45 PM – 03:15 PM",
        title: "Deep Processing: Freeze-Drying, Ready-to-Cook & Value-Added Products",
        category: "Innovation Forum",
        hall: "Plenary Hall A",
        speakers: "Food Processing Technologists & Packaging Equipment Manufacturers",
        desc: "Industrial lyophilization (freeze-drying), mushroom powder seasonings, instant soups, and vacuum-fried snack manufacturing.",
      },
      {
        time: "03:30 PM – 05:00 PM",
        title: "National Horticulture Board (NHB) Subsidies & Project Finance Clinic",
        category: "Financing Clinic",
        hall: "Conference Room C",
        speakers: "NHB Senior Officers & Agri-Banking Executives",
        desc: "Step-by-step guidance on securing 35%-50% capital subsidies, preparing bankable Detailed Project Reports (DPR), and commercial term loans.",
      },
      {
        time: "05:15 PM – 06:30 PM",
        title: "Shroom Connect: Corporate Buyer Sourcing Roundtables",
        category: "B2B Deal-Making",
        hall: "VIP Buyer Lounge",
        speakers: "HoReCa Heads, Modern Retail Category Managers & Exporters",
        desc: "Confidential procurement discussions and contractual volume orders between large-scale commercial farm owners and retail chains.",
      },
    ],
  },
  "day-3": {
    slug: "day-3",
    title: "DAY 03 – GROW",
    theme: "Cold-Chain Logistics, Export Linkages & Valedictory Awards",
    date: "February 21, 2027",
    subtitle: "Scaling distribution channels, cross-border standards, and celebrating industry leaders.",
    overview:
      "Day 3 is dedicated to scaling and market execution. Learn how to navigate international food safety standards, temperature-controlled cold chains, and cross-border logistics. The summit culminates with the Indian Mushroom Industry Excellence Awards and the closing Valedictory ceremony.",
    sessions: [
      {
        time: "09:30 AM – 11:00 AM",
        title: "Cold-Chain Logistics, Modified Atmosphere Packaging (MAP) & Shelf-Life Extension",
        category: "Supply Chain",
        hall: "Plenary Hall A, Bharat Mandapam",
        speakers: "Cold-Chain Infrastructure Leads & Packaging Scientists",
        desc: "Mitigating post-harvest losses, optimal pre-cooling procedures, breathable barrier films, and reefer transportation management.",
      },
      {
        time: "11:15 AM – 12:45 PM",
        title: "Navigating Global Export Standards: APEDA, Codex & Organic Certifications",
        category: "Export Symposium",
        hall: "Plenary Hall A",
        speakers: "APEDA Export Advisors & Quality Certification Auditors",
        desc: "Compliance with international MRL (Maximum Residue Limits), phytosanitary paperwork, and accessing lucrative Middle East and European markets.",
      },
      {
        time: "01:45 PM – 03:15 PM",
        title: "The Next Decade of Indian Mushroom Farming: Open Policy Dialogue",
        category: "Panel Discussion",
        hall: "Plenary Hall A",
        speakers: "Grower Association Presidents, Scientists & Trade Representatives",
        desc: "A collaborative open-floor session charting policy recommendations, minimum support pricing, and national mushroom consumption campaigns.",
      },
      {
        time: "03:30 PM – 05:00 PM",
        title: "Indian Mushroom Industry Excellence Awards & Valedictory Ceremony",
        category: "Awards & Closing",
        hall: "Grand Auditorium",
        speakers: "Chief Guests & India Mushroom Days Board",
        desc: "Recognizing outstanding spawn innovators, progressive grower champions, best tech exhibitors, and women agri-entrepreneurs.",
      },
    ],
  },
};

export function generateStaticParams() {
  return [{ day: "day-1" }, { day: "day-2" }, { day: "day-3" }];
}

export default async function DaySchedulePage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const resolvedParams = await params;
  const dayKey = resolvedParams.day;
  const currentDay = DAYS_SCHEDULE[dayKey];

  if (!currentDay) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#103322] via-[#0d2a1b] to-[#091e13] text-white pt-36 pb-16 sm:pb-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
          <Link
            href="/#program-agenda"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Schedule</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f28822] mb-2">
            <Calendar className="w-4 h-4" />
            <span>{currentDay.date} • Bharat Mandapam, New Delhi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            {currentDay.title}
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-3xl leading-relaxed">
            {currentDay.subtitle}
          </p>

          {/* 3 Days Switcher Tab Bar */}
          <div className="mt-10 max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 flex items-center justify-between gap-2">
            {Object.values(DAYS_SCHEDULE).map((d) => {
              const isActive = d.slug === currentDay.slug;
              return (
                <Link
                  key={d.slug}
                  href={`/schedule/${d.slug}`}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full text-center transition-all duration-200 ${
                    isActive
                      ? "bg-[#f28822] text-white font-bold shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10 font-medium"
                  }`}
                >
                  <div className="text-[11px] sm:text-xs font-bold tracking-wider uppercase truncate">
                    {d.title}
                  </div>
                  <div className="text-[10px] opacity-80 hidden sm:block">
                    {d.date}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-20 bg-slate-50/50 flex-1">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Timeline of Sessions */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Detailed Session Schedule
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  All timings are in Indian Standard Time (IST).
                </p>
              </div>

              {currentDay.sessions.map((session, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200"
                >
                  {/* Category & Hall Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#f28822] border border-orange-200">
                      {session.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{session.hall}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2">
                    {session.title}
                  </h3>

                  {/* Time */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 mb-3">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{session.time}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {session.desc}
                  </p>

                  {/* Speakers if available */}
                  {session.speakers && (
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-700">Featuring:</span>
                      <span className="truncate">{session.speakers}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column: Day Highlights & Quick Actions */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Day Overview Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Day Focus &amp; Highlights
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#84c52c]">
                  Theme: {currentDay.theme}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentDay.overview}
                </p>
              </div>

              {/* Action Banner */}
              <div className="rounded-3xl bg-gradient-to-br from-[#103322] to-[#0a1e14] p-6 sm:p-7 text-white shadow-lg space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reserve Your Presence</span>
                </div>
                <h3 className="text-xl font-bold">
                  Attend India Mushroom Days 2027
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pre-register to receive fast-track entry to all conference halls, masterclasses, and exhibition booths.
                </p>

                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/visitor-register"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#84c52c] hover:bg-[#73ad24] shadow transition-transform hover:scale-[1.02]"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Visitor Registration</span>
                  </Link>
                  <Link
                    href="/book-your-stall"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#f28822] hover:bg-[#d97517] shadow transition-transform hover:scale-[1.02]"
                  >
                    <Store className="w-4 h-4" />
                    <span>Book Your Stall</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
