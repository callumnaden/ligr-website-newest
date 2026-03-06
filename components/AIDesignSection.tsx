"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DashboardMockup from "./DashboardMockup";

gsap.registerPlugin(ScrollTrigger);

const aiChecks = [
  "Reads your brand and generates on-brand graphics automatically",
  "Learns sport-specific layouts for AFL, rugby, netball, and 20+ sports",
  "Adapts to match context — scores, moments, milestones",
  "Suggests the best graphic for every moment in real time",
];

const fuseChecks = [
  "Drag and drop broadcast components onto a live canvas",
  "Bind live data sources — scores, clocks, player stats",
  "Preview your broadcast in real time before going live",
  "Export and deploy themes instantly across all your events",
];

export default function AIDesignSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ai-left > *", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ai-left", start: "top 78%", once: true },
      });
      gsap.fromTo(".ai-mockup", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".ai-mockup", start: "top 80%", once: true },
      });
      gsap.fromTo(".fuse-left > *", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".fuse-left", start: "top 78%", once: true },
      });
      gsap.fromTo(".fuse-mockup", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".fuse-mockup", start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col gap-16 md:gap-32">

        {/* Section 1: AI Graphics — mockup left, text right (text above mockup on mobile) */}
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
          {/* Left: Mockup */}
          <div className="ai-mockup flex-1 min-w-0">
            <DashboardMockup className="rounded-xl overflow-hidden" />
          </div>

          {/* Right: Text */}
          <div className="ai-left flex flex-col gap-5 lg:w-[480px] shrink-0">
            <p className="text-base font-semibold text-[#94979c]">Powered by Claude AI</p>
            <h2 className="text-[36px] font-bold leading-[44px] tracking-[-0.02em] gradient-text">
              AI Graphics that think like a designer.
            </h2>
            <p className="text-xl font-normal text-[#94979c] leading-[30px]">
              LIGR&apos;s AI doesn&apos;t just fill templates — it understands sport, brand, and context
              to generate graphics that look like they were made by a professional broadcast designer.
            </p>
            <ul className="flex flex-col gap-4 mt-2">
              {aiChecks.map((check, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center border border-[#9E77ED] mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#9E77ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-base font-normal text-[#94979c] leading-6">{check}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="inline-flex items-center gap-1.5 text-base font-semibold text-[#FF504E] hover:opacity-80 transition-opacity mt-2">
              Explore AI Graphics
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="#FF8A65" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Section 2: Meet Fuse — text left, mockup right */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Text */}
          <div className="fuse-left flex flex-col gap-5 lg:w-[480px] shrink-0">
            <p className="text-base font-semibold text-[#94979c]">AI Theme Builder</p>
            <h2 className="text-[36px] font-bold leading-[44px] tracking-[-0.02em] gradient-text">
              Meet Fuse. Design without limits.
            </h2>
            <p className="text-xl font-normal text-[#94979c] leading-[30px]">
              Fuse is LIGR&apos;s visual theme builder. Drag and drop broadcast components, bind live data,
              and preview everything in real time — no code required.
            </p>
            <ul className="flex flex-col gap-4 mt-2">
              {fuseChecks.map((check, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center border border-[#9E77ED] mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#9E77ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-base font-normal text-[#94979c] leading-6">{check}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="inline-flex items-center gap-1.5 text-base font-semibold text-[#FF504E] hover:opacity-80 transition-opacity mt-2">
              Explore Fuse
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="#FF8A65" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right: Mockup */}
          <div className="fuse-mockup flex-1 min-w-0">
            <DashboardMockup className="rounded-xl overflow-hidden" />
          </div>
        </div>

      </div>
    </section>
  );
}
