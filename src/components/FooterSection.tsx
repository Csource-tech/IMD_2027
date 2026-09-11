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
    <footer id="contact" className="bg-[#14181c] text-slate-300 pt-16 pb-8 border-t border-white/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
            {/* Col 1: Brand Info & Single Logo (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <Link href="/#home" className="inline-flex items-center gap-3 group focus:outline-none">
                <img
                  src="/reallogo.png"
                  alt="Indian Mushroom Days 2027 Official Logo"
                  className="h-14 sm:h-16 w-auto object-contain rounded-full shadow-md group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                    Indian Mushroom Days <span className="text-[#f28822]">2027</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    &amp; Shroom Connect 2027 Conclave
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#84c52c]">
                <Calendar className="w-4 h-4 shrink-0 text-[#f28822]" />
                <span>February 19 – 21, 2027 • Bharat Mandapam, New Delhi</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                India&apos;s premier exhibition and conference platform connecting commercial mushroom growers, spawn laboratories, technology innovators, and institutional buyers across the globe.
              </p>

              {/* Fast Registration Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/visitor-register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#84c52c] hover:bg-[#73ad24] shadow-sm transition-all"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Visitor Registration</span>
                </Link>
                <Link
                  href="/book-your-stall"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#f28822] hover:bg-[#d97517] shadow-sm transition-all"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Book Your Stall</span>
                </Link>
              </div>
            </div>

            {/* Col 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h5 className="text-white text-sm sm:text-base font-bold uppercase tracking-wider border-b border-white/10 pb-2.5">
                Quick Links
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link href="/#about" className="hover:text-[#f28822] transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                    <span>About The Events</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#program-agenda" className="hover:text-[#f28822] transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                    <span>Schedule &amp; Program Agenda</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#why-join" className="hover:text-[#f28822] transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                    <span>Why Indian Mushroom Days</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#industry-chain" className="hover:text-[#f28822] transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                    <span>Participating Industries</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#past-sponsors" className="hover:text-[#f28822] transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                    <span>Our Sponsors &amp; Partners</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#gallery" className="hover:text-[#f28822] transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#f28822]" />
                    <span>Photo Gallery</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & Secretariat (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h5 className="text-white text-sm sm:text-base font-bold uppercase tracking-wider border-b border-white/10 pb-2.5">
                Contact Secretariat
              </h5>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#f28822] mt-0.5 shrink-0" />
                  <span>Bharat Mandapam, Pragati Maidan, New Delhi, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#f28822] shrink-0" />
                  <a href="tel:+919810726996" className="hover:text-white transition-colors">
                    +91 98107 26996 / +91 98117 75443
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#f28822] shrink-0" />
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
                  <Clock className="w-4 h-4 text-[#84c52c] shrink-0" />
                  <span>Mon - Sat: 09:00 AM – 06:00 PM IST</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-8 text-center text-xs text-slate-500">
            <p>
              &copy; 2027 Indian Mushroom Days (IMD 2027) &amp; Shroom Connect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}
