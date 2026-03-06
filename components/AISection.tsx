"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AISection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ai-content",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const points = [
    "Reads your brand and generates on-brand graphics automatically",
    "Learns sport-specific layouts for AFL, rugby, netball, and 20+ sports",
    "Adapts to match context — scores, moments, milestones",
    "Suggests the best graphic for every moment in real time",
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(230,48,48,0.1)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(230,48,48,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />
            <div className="relative card-border rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
              <div className="bg-[#1a1e2a] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-[#5c6070] ml-2">AI Graphic Studio</span>
              </div>
              <div className="bg-[#13161f] p-6 min-h-[320px] flex flex-col gap-4">
                {/* AI prompt bar */}
                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-3 border border-white/8">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#e63030] shrink-0">
                    <path d="M7 1l1.5 4.5H13l-3.75 2.75L10.75 13 7 10.25 3.25 13l1.5-4.75L1 5.5h4.5L7 1z" fill="currentColor" />
                  </svg>
                  <span className="text-sm text-[#9ea3b0]">Generate AFL lower third for Michael Jordan…</span>
                  <div className="ml-auto w-1.5 h-4 bg-[#e63030] rounded-full animate-pulse" />
                </div>

                {/* Generated output preview */}
                <div className="flex-1 bg-gradient-to-br from-[#1a1e2a] to-[#0f1117] rounded-lg border border-white/8 overflow-hidden relative">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="gradient-wave rounded-lg p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 shrink-0" />
                      <div>
                        <div className="text-white font-bold text-sm">Michael Jordan</div>
                        <div className="text-white/70 text-xs">AFL Victoria · Forward</div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-white font-black text-xl">3</div>
                        <div className="text-white/70 text-[10px]">Goals</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-[10px] text-[#5c6070]">Video stream preview</div>
                </div>

                {/* Suggestions */}
                <div className="grid grid-cols-3 gap-2">
                  {["Player card", "Score bug", "Stat overlay"].map((s) => (
                    <div key={s} className="text-[11px] text-center bg-white/3 text-[#9ea3b0] py-2 rounded-lg border border-white/5 hover:border-[#e63030]/30 cursor-pointer transition-colors">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="ai-content inline-block text-xs font-semibold tracking-widest uppercase text-[#e63030] mb-3">
              AI Powered
            </span>
            <h2 className="ai-content text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-snug">
              AI Graphics that
              <br />
              <span className="gradient-wave bg-clip-text text-transparent">think like a designer.</span>
            </h2>
            <p className="ai-content text-base lg:text-lg text-[#9ea3b0] leading-relaxed mb-8">
              LIGR&apos;s AI doesn&apos;t just fill templates — it understands sport, brand, and context to generate
              graphics that look like they were made by a professional broadcast designer.
            </p>
            <ul className="space-y-4">
              {points.map((point, i) => (
                <li key={i} className="ai-content flex items-start gap-3 text-sm text-[#9ea3b0]">
                  <div className="mt-0.5 w-5 h-5 rounded-full gradient-wave flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {point}
                </li>
              ))}
            </ul>
            <a href="#" className="ai-content inline-flex items-center gap-2 mt-8 gradient-wave text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm">
              Try AI graphics free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
