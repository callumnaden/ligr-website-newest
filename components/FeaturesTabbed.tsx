"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DashboardMockup from "./DashboardMockup";
import AutomationAnimPanel from "./AutomationAnimPanel";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { label: "Full Automation" },
  { label: "Cloud Streaming" },
  { label: "Fuse Theme Builder" },
  { label: "AI Graphics" },
  { label: "Revenue & Ads" },
  { label: "Rive Animations" },
];

const tabContent = [
  {
    heading: "Set it. Forget it. Broadcast it.",
    body: "Set it and forget it. LIGR connects to live data feeds and runs your entire production — graphics, scores, clocks — without a single operator.",
    cta: "Get started with Full Automation",
  },
  {
    heading: "Stream anywhere, instantly.",
    body: "Push your broadcast to YouTube, Facebook, Twitch, or any RTMP destination simultaneously — no encoder required.",
    cta: "Explore Cloud Streaming",
  },
  {
    heading: "Design your broadcast visually.",
    body: "Fuse is LIGR's visual theme builder. Drag and drop broadcast components, bind live data, and preview everything in real time.",
    cta: "Try Fuse Theme Builder",
  },
  {
    heading: "AI graphics in seconds.",
    body: "Describe your vision in plain English and watch LIGR generate broadcast-ready overlays in seconds — powered by Claude AI.",
    cta: "Explore AI Graphics",
  },
  {
    heading: "Turn broadcasts into revenue.",
    body: "Sell sponsorships, run pre-roll ads, and display sponsor overlays — all automated and integrated into your live stream.",
    cta: "Explore Revenue & Ads",
  },
  {
    heading: "Motion graphics that move.",
    body: "Embed Rive animations directly into your broadcast overlays for smooth, interactive, data-driven motion graphics.",
    cta: "See Rive Animations",
  },
];

export default function FeaturesTabbed() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ft-intro > *", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  }, [active]);

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto md:px-8">
        {/* Header */}
        <div className="ft-intro max-w-[768px] mb-8 flex flex-col gap-3">
          <p className="text-base font-semibold text-[#94979c]">Platform</p>
          <h2 className="text-[36px] font-bold tracking-[-0.02em] leading-[44px] gradient-text">
            Everything you need to go live.
          </h2>
          <p className="text-xl text-[#94979c] font-normal leading-[30px]">
            A complete cloud production suite — from AI-generated graphics to fully automated broadcasts.
          </p>
        </div>

        {/* Tab strip */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:w-full">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex flex-col pt-4 pb-3 md:pb-0 md:flex-1 transition-all text-left"
                style={{ borderTop: `4px solid ${active === i ? "#FF504E" : "#373A41"}` }}
              >
                <span className={`text-[15px] md:text-[18px] font-semibold leading-7 transition-colors ${active === i ? "text-[#CECFD2]" : "text-[#CECFD2]/40"}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard mockup / animated panel */}
        <div className="relative rounded-xl overflow-hidden mb-10 float shadow-[0_24px_48px_rgba(0,0,0,0.4)]" style={{ aspectRatio: "16/9", minHeight: 320 }}>
          <div className="absolute inset-0" style={{ opacity: active === 0 ? 1 : 0, transition: "opacity 0.3s", pointerEvents: active === 0 ? "auto" : "none" }}>
            <AutomationAnimPanel />
          </div>
          <div className="absolute inset-0" style={{ opacity: active !== 0 ? 1 : 0, transition: "opacity 0.3s", pointerEvents: active !== 0 ? "auto" : "none" }}>
            <DashboardMockup className="h-full" />
          </div>
        </div>

        {/* Content below mockup */}
        <div ref={contentRef} className="max-w-[768px]">
          <h3 className="text-[36px] font-bold leading-[44px] tracking-[-0.02em] text-[#F7F7F7] mb-5">
            {tabContent[active].heading}
          </h3>
          <p className="text-xl font-normal text-[#94979c] leading-[30px] mb-6">
            {tabContent[active].body}
          </p>
          <a href="#" className="inline-flex items-center gap-1.5 text-base font-semibold text-[#FF504E] hover:opacity-80 transition-opacity">
            {tabContent[active].cta}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="#FF8A65" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
