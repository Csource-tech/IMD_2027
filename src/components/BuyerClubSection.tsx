import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function BuyerClubSection() {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Compact 50/50 Split Box Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 shadow-md overflow-hidden">
          {/* Left Column: Clean White Minimalist Info */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-center space-y-4">
            <span className="text-xs sm:text-sm text-gray-500">
              2027 must-attend mushroom industry gathering
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug">
              India Mushroom Days <br />
              2027 (IMD 2027)
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Designed for decision-makers and sourcing professionals, this program helps you navigate the exhibition efficiently—especially if you are attending for the first time or returning after several years.
            </p>

            <div className="pt-2 space-y-2">
              <strong className="block text-xs sm:text-sm font-bold text-gray-900">
                Buyer Club members receive:
              </strong>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-[#2546e5] font-bold">✔</span>
                  <span>Guided sourcing tour tailored to your business needs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2546e5] font-bold">✔</span>
                  <span>Access to the International Buyer Lounge</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2546e5] font-bold">✔</span>
                  <span>VIP Pass and pre-show and on-site support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Fresh Green with Circular Photo */}
          <div className="md:col-span-5 bg-[#84c52c] p-6 sm:p-14 flex flex-col items-center justify-center text-center text-white">
            {/* Circular Delegation Photo */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-3 border-white/60 shadow-md mb-4 bg-white/20 shrink-0">
              <img
                src="https://oss.matchpages.cn/matchpages/common/2026/0703/6818/6a47292765ddd/FTZI1368_1370672142-3571477328.png"
                alt="Buyer Club Delegation"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug max-w-xs">
              Make your visit more efficient, comfortable, and productive.
            </p>

            <div className="mt-3 text-xs sm:text-sm font-semibold text-white leading-tight">
              Are you ready to join <br />
              <span className="text-[#ff5522] font-black text-sm sm:text-base">
                India Mushroom Days 2027
              </span>{" "}
              <br />
              as a Buyer Club member?
            </div>

            <Link
              href="#register"
              className="mt-4 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#f28822] hover:bg-[#d97416] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all"
            >
              <span>Apply as Buyer Member</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


