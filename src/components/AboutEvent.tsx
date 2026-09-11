import { Building2, Handshake } from "lucide-react";

export default function AboutEvent() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      {/* Container aligned with Navbar and Hero (max-w-8xl) */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Exactly 40% width on desktop */}
          <div className="w-full lg:w-[40%] shrink-0 flex">
            <img
              src="/imdgallery/imd-2024-002-inauguration.png"
              alt="Inauguration Ceremony at Indian Mushroom Days"
              className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] object-cover object-center rounded-[20px] shadow-sm border border-gray-100"
            />
          </div>

          {/* Right Column: Exactly 60% width on desktop */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center min-w-0">
            {/* Section Title with authentic orange SVG arrow */}
            <div className="mb-3 flex items-start gap-1 text-[#f28822]">
              <span className="text-2xl font-bold sm:text-3xl">About The Events</span>
              <svg className="mt-1 h-12 w-28 shrink-0 text-[#ff4e25]" viewBox="0 0 120 52" fill="none" aria-hidden="true">
                <path d="M2 23C25-6 60-5 60 17c0 14-16 13-13 2 2-9 18-8 25 3 5 8 5 16 7 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="m72 46 8-2-2-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-bold leading-[1.18] tracking-tight text-slate-950 mb-6">
              Indian Mushroom Days 2027 <br />
              <span className="text-[#f28822]">&amp; Shroom Connect 2027</span>
            </h2>

            {/* Event 1 Box: Indian Mushroom Days 2027 */}
            <div className="rounded-2xl bg-slate-50/90 border border-slate-200/90 p-5 sm:p-6 mb-4">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#2c29e4]" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Indian Mushroom Days 2027 (IMD 2027)
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2c29e4] text-white">
                  Flagship Expo
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                India Mushroom Days is the nation&apos;s premier platform dedicated to exploring how mushrooms are changing
                the agricultural landscape. Bringing together thousands of commercial growers, researchers, spawn labs, and supply chain
                pioneers, IMD provides direct access to a targeted audience to solve cultivation challenges, enhance brand visibility,
                and unlock high-value agribusiness opportunities across India.
              </p>
            </div>

            {/* Event 2 Box: Shroom Connect 2027 */}
            <div
              id="about-shroomconnect"
              className="rounded-2xl bg-orange-50/70 border border-orange-200/90 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-[#f28822]" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Shroom Connect 2027 — National B2B Conclave
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f28822] text-white">
                  Co-Located Summit
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                <strong>Shroom Connect</strong> is the concurrent commercial deal-making conclave uniting high-volume
                growers directly with corporate retail buyers, food processing leaders, and pharmaceutical extractors.
                The summit highlights state-of-the-art Controlled Environment Agriculture (CEA), certified spawn biotechnology,
                freeze-drying processing, and National Horticulture Board (NHB) capital subsidy schemes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
