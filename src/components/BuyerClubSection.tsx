"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";

export default function BuyerClubSection() {
  return (
    <section id="buyer-club" className="py-20 sm:py-28 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Expanded 50/50 Architectural Split Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-gray-200 shadow-2xl rounded-3xl overflow-hidden bg-white items-stretch">
          {/* Left Column: Mushroom Exchange Details (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f28822]/15 text-[#b85b06] text-xs font-bold uppercase tracking-wider mb-4">
                <span>Value-Chain Integration</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-[1.1] uppercase font-sans">
                Mushroom Exchange <br />
                <span className="font-serif italic font-normal text-gray-700 capitalize">
                  official trade partner
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                India&apos;s apex collaborative value-chain hub uniting commercial cultivators, spawn laboratories, and biotechnology innovators with institutional procurement directors from tier-1 supermarket chains, HoReCa distributors, and global export syndicates.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-1">
                Strategic Buyer Club Advantages:
              </span>
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#84c52c] mt-0.5 shrink-0" />
                  <span>Pre-scheduled 1-on-1 procurement meetings with vetted commercial growers</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#84c52c] mt-0.5 shrink-0" />
                  <span>Verified supply chains for certified spawn, substrate, and cold-chain logistics</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#84c52c] mt-0.5 shrink-0" />
                  <span>Bilateral export linkages to Middle East, European, and Southeast Asian markets</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/visitor-register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#84c52c] hover:bg-[#72ab24] shadow-md transition-all duration-200"
              >
                <Ticket className="w-4 h-4" />
                <span>Apply for Buyer Accreditation</span>
              </Link>
              <span className="text-xs text-gray-400 font-medium">
                Complimentary VIP lounge access included
              </span>
            </div>
          </motion.div>

          {/* Right Column: Branded Emblem (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 bg-gradient-to-br from-[#0c140f] via-[#14231a] to-[#080e0a] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center text-white relative overflow-hidden"
          >
            {/* Ambient Spore Pattern */}
            <div className="absolute inset-0 mycelium-pattern opacity-25 pointer-events-none" />

            {/* Circular Logo Container */}
            <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-6 bg-white p-6 flex items-center justify-center shrink-0">
              <img
                src="/mushroom-exchange.webp"
                alt="Mushroom Exchange Official Seal"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="relative z-10 max-w-xs space-y-2">
              <h3 className="text-lg font-bold text-white">Official Trade Partner</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Connecting growers, processors, and institutional buyers across India&apos;s edible fungi economy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
