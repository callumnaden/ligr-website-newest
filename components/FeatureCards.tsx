"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    tag: "Step 01",
    title: "Design / Generate",
    desc: "Upload your assets and let LIGR's AI generate a complete broadcast graphic package tailored to your brand — lower thirds, scoreboards, transitions, and more.",
    cta: "See design tools",
    mockupRows: ["Team Logo", "Primary Colour", "Secondary Colour", "Typography"],
  },
  {
    tag: "Step 02",
    title: "Connect & Automate",
    desc: "Plug in your data source and every graphic updates automatically. Scoring, stats, player info — all driven by live data with zero manual input during the game.",
    cta: "Explore integrations",
    mockupRows: ["YouTube", "Facebook", "Custom RTMP", "Website Embed"],
  },
  {
    tag: "Step 03",
    title: "Score",
    desc: "Use LIGR's scoring interface to track the game in real time. Update the score with a tap and watch graphics reflect changes instantly across all your streams.",
    cta: "Try the scorer",
    mockupRows: ["Home 2 — Away 1", "Half Time", "Quarter 3", "Full Time"],
  },
];

export default function FeatureCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fc-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`fc-card grid lg:grid-cols-2 gap-10 items-center card-border rounded-2xl p-8 lg:p-12 hover:border-white/15 transition-all ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Text */}
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-[#e63030] mb-3">
                {card.tag}
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug">{card.title}</h3>
              <p className="text-[#9ea3b0] text-base leading-relaxed mb-8">{card.desc}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/10 bg-white/5 px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                {card.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(230,48,48,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none" />
              <div className="relative bg-[#13161f] rounded-xl border border-white/8 overflow-hidden">
                <div className="border-b border-white/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="text-[11px] text-[#5c6070] ml-2">LIGR Platform</div>
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="text-xs font-semibold text-[#9ea3b0] mb-3">{card.title}</div>
                  {card.mockupRows.map((row, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between bg-white/3 rounded-lg px-3.5 py-3 border border-white/5 group hover:border-white/10 transition-all cursor-pointer"
                    >
                      <span className="text-sm text-[#9ea3b0] group-hover:text-white transition-colors">{row}</span>
                      <div className={`w-2 h-2 rounded-full ${j === 0 ? "gradient-wave" : "bg-white/10"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
