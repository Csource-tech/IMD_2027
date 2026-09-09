import { EXHIBITORS } from "../data/exhibitorsData";

export default function ExhibitorsSection() {
  const row1 = EXHIBITORS.slice(0, Math.ceil(EXHIBITORS.length / 2));
  const row2 = EXHIBITORS.slice(Math.ceil(EXHIBITORS.length / 2));

  return (
    <section className="py-16 sm:py-20 bg-gray-50/50 overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-block relative">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight pb-3">
            Part of Exhibitors
          </h2>
          <div className="h-1 w-24 bg-[#f28822] rounded-full mx-auto" />
        </div>
        <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Trusted by leading national &amp; international fungi cultivation, machinery, and trade corporations.
        </p>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full overflow-hidden mb-6 sm:mb-8">
        <div className="animate-marquee flex items-center space-x-3 sm:space-x-5">
          {[...row1, ...row1].map((exhibitor, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-36 sm:w-44 h-24 sm:h-28 flex items-center justify-center px-1 group"
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="max-h-20 sm:max-h-24 max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300 drop-shadow-xs"
                title={exhibitor.name}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-reverse flex items-center space-x-3 sm:space-x-5">
          {[...row2, ...row2].map((exhibitor, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-36 sm:w-44 h-24 sm:h-28 flex items-center justify-center px-1 group"
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="max-h-20 sm:max-h-24 max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300 drop-shadow-xs"
                title={exhibitor.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
