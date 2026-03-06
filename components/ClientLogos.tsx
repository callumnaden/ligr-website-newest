"use client";

const logos = [
  "Netball Australia",
  "Football Victoria",
  "Cricket NSW",
  "Netball NSW",
  "Netball Queensland",
  "Hockey Australia",
  "NRL",
  "AFL Victoria",
  "Rugby Australia",
  "Basketball Australia",
];

export default function ClientLogos() {
  return (
    <section className="py-10 border-y border-white/5 overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0b0d13] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0b0d13] to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden">
        <div className="ticker-track">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-8 shrink-0 text-[#5c6070] hover:text-[#9ea3b0] transition-colors"
            >
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" fill="currentColor" className="text-[#e63030]" />
              </svg>
              <span className="text-sm font-medium whitespace-nowrap">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
