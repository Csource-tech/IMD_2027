import { EXHIBITORS } from "../data/exhibitorsData";

export default function ExhibitorsSection() {
  return (
    <section id="exhibitors" className="py-16 sm:py-24 bg-gray-50/50 overflow-hidden border-b border-gray-100">
      {/* Title matching website theme and style */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 mb-12 sm:mb-16 text-center">
        <h2 className="inline-block border-b-[3px] border-[#f28822] pb-1 text-2xl sm:text-4xl font-medium text-black">
          Part of Exhibitors
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Trusted by leading national &amp; international fungi cultivation, machinery, and trade corporations.
        </p>
      </div>

      {/* Single Line Marquee with Bigger Logos, Borders, and Slower Moving Speed */}
      <div className="relative w-full overflow-hidden py-4">
        <div 
          className="animate-marquee flex items-center space-x-4 sm:space-x-6"
          style={{ animationDuration: "110s" }}
        >
          {[...EXHIBITORS, ...EXHIBITORS].map((exhibitor, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full bg-white border-2 border-slate-200 shadow-xs hover:border-[#f28822] hover:shadow-md transition-all duration-300 p-2 sm:p-2.5 flex items-center justify-center overflow-hidden group cursor-pointer"
            >
              <img
                src={exhibitor.logo}
                alt={exhibitor.name}
                className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                title={exhibitor.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
