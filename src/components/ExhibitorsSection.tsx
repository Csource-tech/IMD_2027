import { EXHIBITORS } from "../data/exhibitorsData";

export default function ExhibitorsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50/50 overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
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

      {/* Single Line Marquee with Big Logos */}
      <div className="relative w-full overflow-hidden py-4">
        <div 
          className="animate-marquee flex items-center space-x-3 sm:space-x-5"
          style={{ animationDuration: "50s" }}
        >
          {[...EXHIBITORS, ...EXHIBITORS].map((exhibitor, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-44 sm:w-56 md:w-64 h-32 sm:h-40 md:h-44 flex items-center justify-center px-2 group"
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="max-h-28 sm:max-h-36 md:max-h-40 max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300 drop-shadow-xs"
                title={exhibitor.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
