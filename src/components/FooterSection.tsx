import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Ticket,
  Store,
  ChevronRight,
} from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative bg-[#070e0a] text-slate-300 pt-20 pb-10 border-t border-white/10 overflow-hidden">
      {/* Background mycelium texture */}
      <div className="absolute inset-0 mycelium-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand Wordmark & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/#home" className="inline-flex items-center gap-3.5 group focus:outline-none">
              <div className="relative">
                <img
                  src="/reallogo.png"
                  alt="Indian Mushroom Days 2027 Official Logo"
                  className="h-14 sm:h-16 w-auto object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform ring-2 ring-white/10"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#004aab] ring-2 ring-[#070e0a]" />
              </div>
              <div>
                <h4 className="text-white text-lg sm:text-xl font-black uppercase tracking-tight font-sans">
                  Indian Mushroom Days <span className="text-[#f28822]">2027</span>
                </h4>
                <p className="text-xs text-[#004aab] font-medium tracking-wide">
                  &amp; Shroom Connect Conclave
                </p>
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-200 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <Calendar className="w-3.5 h-3.5 text-[#f28822]" />
              <span>February 19 – 21, 2027 • New Delhi, India</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md font-normal">
              India&apos;s premier exhibition and conference platform connecting commercial mushroom growers, spawn laboratories, CEA technology innovators, and institutional buyers across the globe.
            </p>

            {/* Fast Registration Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/visitor-register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#004aab] hover:bg-[#003c8c] shadow-md transition-all duration-200"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Visitor Registration</span>
              </Link>
              <Link
                href="/book-your-stall"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#f28822] hover:bg-[#d97517] shadow-md transition-all duration-200"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Book Your Stall</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest border-b border-white/10 pb-3 font-sans">
              Navigation
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/#about" className="hover:text-[#f28822] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                  <span>About The Movement</span>
                </Link>
              </li>
              <li>
                <Link href="/#about-shroomconnect" className="hover:text-[#004aab] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#004aab]" />
                  <span>Shroom Connect Conclave</span>
                </Link>
              </li>
              <li>
                <Link href="/#industry-chain" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                  <span>Button &amp; Specialty Mushrooms</span>
                </Link>
              </li>
              <li>
                <Link href="/#why-join" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                  <span>Why Indian Mushroom Days</span>
                </Link>
              </li>
              <li>
                <Link href="/#program-agenda" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                  <span>3-Day Program Agenda</span>
                </Link>
              </li>
              <li>
                <Link href="/#organising-committee" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                  <span>Organising Committee</span>
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                  <span>Visual Chronicle (Gallery)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Secretariat (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest border-b border-white/10 pb-3 font-sans">
              Secretariat Helpdesk
            </h5>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#f28822] mt-0.5 shrink-0" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#f28822] shrink-0" />
                <a href="tel:+919810726996" className="hover:text-white transition-colors">
                  +91 98107 26996 / +91 98117 75443
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#004aab] shrink-0" />
                <a href="tel:+918860115588" className="hover:text-white transition-colors">
                  +91 88601 15588 (Exhibition Helpline)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#f28822] shrink-0" />
                <a href="mailto:reachout@mushex.in" className="hover:text-white transition-colors">
                  reachout@mushex.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#004aab] shrink-0" />
                <span>Mon – Sat: 09:00 AM – 06:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2027 Indian Mushroom Days (IMD 2027) &amp; Shroom Connect Conclave. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>New Delhi, India</span>
            <span>•</span>
            <span>19–20–21 February 2027</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
