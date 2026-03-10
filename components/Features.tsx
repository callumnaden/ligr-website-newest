"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AIGraphicsPanel, StreamingPanel, RevenuePanel } from "./FeaturesSection";
import AutomationAnimPanel from "./AutomationAnimPanel";
import FuseAnimPanel from "./FuseAnimPanel";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    label: "Your Own Story",
    heading: "Make every game feel like a major event.",
    desc: "Customise your broadcast with your team colours, logos, and branding. LIGR makes community sport look like prime time television.",
    features: ["Custom branding per team", "Automated lower thirds", "Real-time stat overlays"],
    Panel: FuseAnimPanel,
  },
  {
    label: "Scoring Platform",
    heading: "One platform for every sport you run.",
    desc: "Manage scores, stats, and timing from a single dashboard — works across multiple sports and multiple events simultaneously.",
    features: ["Multi-sport support", "Live stat sync", "Referee & scorer tools"],
    Panel: AutomationAnimPanel,
  },
  {
    label: "Free Scoreboard",
    heading: "Beautiful scoreboards, zero cost.",
    desc: "Every LIGR customer gets a free embeddable scoreboard they can put on their website, social feeds, or venue screens.",
    features: ["Embeddable anywhere", "Auto-updating", "Custom colours"],
    Panel: StreamingPanel,
  },
  {
    label: "AI Enabled",
    heading: "Graphics that design themselves.",
    desc: "Our AI analyses your sport, your brand, and the match context to generate broadcast-quality graphics automatically.",
    features: ["Auto graphic generation", "Brand-aware AI", "Zero design skills needed"],
    Panel: AIGraphicsPanel,
  },
  {
    label: "Non-Athletes",
    heading: "Built for the people who run sport.",
    desc: "Volunteers, admins, and parents can run professional broadcasts — no technical experience required.",
    features: ["One-click setup", "Guided workflows", "24/7 support"],
    Panel: RevenuePanel,
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".features-title",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".features-title", start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        ".features-tabs",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".features-tabs", start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="features-title text-xs font-semibold tracking-widest text-[#e63030] mb-3">Features</p>
          <h2 className="features-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything you need to go live.
          </h2>
        </div>

        {/* Tabs */}
        <div className="features-tabs flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === i
                  ? "gradient-wave text-white shadow-lg"
                  : "bg-white/5 text-[#9ea3b0] border border-white/8 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug">
              {tabs[active].heading}
            </h3>
            <p className="text-[#9ea3b0] text-base lg:text-lg leading-relaxed mb-8">
              {tabs[active].desc}
            </p>
            <ul className="space-y-3">
              {tabs[active].features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#9ea3b0]">
                  <div className="w-5 h-5 rounded-full gradient-wave flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-white hover:text-[#e63030] transition-colors">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(230,48,48,0.15)_0%,transparent_65%)] blur-2xl" />
            <div className="relative border border-[#22262f] bg-[#0c0e12] rounded-[24px] p-1 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
              <div className="relative rounded-[18px] overflow-hidden" style={{ aspectRatio: "3/2" }}>
                {tabs.map((tab, i) => (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{ opacity: active === i ? 1 : 0, transition: "opacity 0.3s ease" }}
                  >
                    <tab.Panel />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
