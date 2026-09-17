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
            {/* Dual Brand Logos & Titles */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4">
              <div className="flex items-center gap-3">
                <Link href="/#home" className="group focus:outline-none" aria-label="India Mushroom Days 2027 Homepage">
                  <img
                    src="/reallogo.png"
                    alt="India Mushroom Days 2027 Official Logo"
                    className="h-14 sm:h-16 w-auto object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform ring-2 ring-white/10"
                  />
                </Link>
                <div className="h-9 sm:h-10 w-px bg-white/20" />
                <Link href="/#about-shroomconnect" className="group focus:outline-none" aria-label="Shroom Connect Conclave">
                  <img
                    src="/shroomlogo.jpeg"
                    alt="Shroom Connect Official Logo"
                    className="h-14 sm:h-16 w-auto object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform ring-2 ring-white/10"
                  />
                </Link>
              </div>
              <div>
                <h4 className="text-white text-lg sm:text-xl font-black uppercase tracking-tight font-sans">
                  India Mushroom Days <span className="text-[#ff9f43]">2027</span>
                </h4>
                <p className="text-lg font-bold text-[#004aab] tracking-wide">
                  &amp; Shroom Connect Conclave
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-200 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <Calendar className="w-3.5 h-3.5 text-[#ff9f43]" />
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#ffaa5b] hover:bg-[#ff9f43] shadow-md transition-all duration-200"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Book Your Booth</span>
              </Link>
            </div>

            {/* Official Social Media Links */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Connect:</span>
              <a
                href="https://www.instagram.com/indiamushroomdays?stkn=bWU4bjd5N3d5YzNs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#ff9f43] hover:text-[#ff9f43] text-slate-300 flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a
                href="https://x.com/IMD2027"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white hover:text-white text-slate-300 flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@MushroomExchange"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-red-500 hover:text-red-500 text-slate-300 flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest border-b border-white/10 pb-3 font-sans">
              Navigation
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/#about" className="hover:text-[#ff9f43] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff9f43]" />
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
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff9f43]" />
                  <span>Button &amp; Specialty Mushrooms</span>
                </Link>
              </li>
              <li>
                <Link href="/#why-join" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff9f43]" />
                  <span>Why India Mushroom Days</span>
                </Link>
              </li>
              <li>
                <Link href="/#program-agenda" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff9f43]" />
                  <span>3-Day Program Agenda</span>
                </Link>
              </li>
              <li>
                <Link href="/#organising-committee" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff9f43]" />
                  <span>Organising Committee</span>
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff9f43]" />
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
                <MapPin className="w-4 h-4 text-[#ff9f43] mt-0.5 shrink-0" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ff9f43] shrink-0" />
                <a href="tel:+918860115588" className="hover:text-white transition-colors">
                  +91 88601 15588
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff9f43] shrink-0" />
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
            &copy; 2027 India Mushroom Days (IMD 2027) &amp; Shroom Connect Conclave. All rights reserved.
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
