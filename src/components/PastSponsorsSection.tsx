interface SponsorItem {
  name: string;
  category: string;
  desc: string;
  logo: string;
}

const SPONSORS: SponsorItem[] = [
  {
    name: "Milkyway Technologies Limited",
    category: "SPAWN & CULTIVATION PIONEER",
    desc: "Pioneering mushroom cultivation since 1994 with certified high-yield spawn production, turnkey farm consulting, and commercial grower training across India.",
    logo: "/milkyway.webp",
  },
  {
    name: "University of Agricultural Sciences, Bangalore",
    category: "ACADEMIC & RESEARCH PARTNER",
    desc: "Karnataka's premier farm university (ICAR & NAAC 'A+') leading breakthrough mycology research, sustainable farming education, and statewide agricultural development.",
    logo: "/uas.webp",
  },
  {
    name: "Mushroom Exchange",
    category: "GLOBAL INDUSTRY PLATFORM",
    desc: "India's collaborative value-chain hub connecting growers, biotech innovators, and institutional buyers through knowledge exchange and B2B market linkage.",
    logo: "/mushroom-exchange.webp",
  },
];

export default function PastSponsorsSection() {
  return (
    <section id="past-sponsors" className="relative bg-gradient-to-b from-white via-slate-50/70 to-white py-16 sm:py-24 border-b border-gray-100 overflow-hidden">
      {/* Soft ambient gradient orbs for glassmorphism refraction */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 text-center">
        {/* Title */}
        <div className="mb-12 sm:mb-16">
          <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-4xl font-medium text-black">
            Our Past Sponsors &amp; Partners
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Proudly supported by leading agro-enterprises, research universities, and global supply chain pioneers driving India&apos;s mushroom ecosystem.
          </p>
        </div>

        {/* 3 Modern Glassmorphism Cards with Big Frameless Logos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SPONSORS.map((s) => (
            <div
              key={s.name}
              className="bg-white/75 backdrop-blur-xl border border-white/80 shadow-lg shadow-slate-200/40 rounded-3xl p-8 sm:p-10 text-center hover:shadow-2xl hover:bg-white/95 hover:border-orange-200 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-start group"
            >
              {/* Direct Large Logo Display - No Square Container */}
              <div className="h-28 sm:h-32 w-full flex items-center justify-center mb-6">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="max-h-full max-w-[180px] sm:max-w-[200px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#f28822] transition-colors leading-snug tracking-tight">
                {s.name}
              </h3>

              {/* Category Subheading */}
              <p className="text-xs font-bold uppercase tracking-wider text-[#f28822] mt-2 mb-4">
                {s.category}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
