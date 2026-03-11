"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AutomationAnimPanel from "./AutomationAnimPanel";
import FuseAnimPanel from "./FuseAnimPanel";
import AIGraphicsAnimPanel from "./AIGraphicsAnimPanel";
import { StreamingPanel, RevenuePanel, RivePanel } from "./FeaturesSection";

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
    slug: "full-automation",
  },
  {
    heading: "Stream anywhere, instantly.",
    body: "Push your broadcast to YouTube, Facebook, Twitch, or any RTMP destination simultaneously — no encoder required.",
    cta: "Explore Cloud Streaming",
    slug: "cloud-streaming",
  },
  {
    heading: "Design your broadcast visually.",
    body: "Fuse is LIGR's visual theme builder. Drag and drop broadcast components, bind live data, and preview everything in real time.",
    cta: "Try Fuse Theme Builder",
    slug: "fuse",
  },
  {
    heading: "AI graphics in seconds.",
    body: "Describe your vision in plain English and watch LIGR generate broadcast-ready overlays in seconds — powered by Claude AI.",
    cta: "Explore AI Graphics",
    slug: "ai-graphics",
  },
  {
    heading: "Turn broadcasts into revenue.",
    body: "Sell sponsorships, run pre-roll ads, and display sponsor overlays — all automated and integrated into your live stream.",
    cta: "Explore Revenue & Ads",
    slug: "revenue-ads",
  },
  {
    heading: "Motion graphics that move.",
    body: "Embed Rive animations directly into your broadcast overlays for smooth, interactive, data-driven motion graphics.",
    cta: "See Rive Animations",
    slug: "rive-animations",
  },
];

const panelComponents = [AutomationAnimPanel, StreamingPanel, FuseAnimPanel, AIGraphicsAnimPanel, RevenuePanel, RivePanel];

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10h12M12 6l4 4-4 4" stroke="#FF8A65" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">

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

        {/* Mobile: each feature stacked with its tab label above */}
        <div className="md:hidden flex flex-col gap-10">
          {tabs.map((tab, i) => {
            const Panel = panelComponents[i];
            return (
              <div key={i} className="flex flex-col gap-5">
                <div className="pt-3" style={{ borderTop: "4px solid #FF504E" }}>
                  <span className="text-[14px] font-semibold text-[#CECFD2]">{tab.label}</span>
                </div>
                <div
                  className="relative overflow-hidden rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
                  style={{ aspectRatio: "16/9", minHeight: 200 }}
                >
                  <Panel />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[28px] font-bold leading-[36px] tracking-[-0.02em] text-[#F7F7F7]">
                    {tabContent[i].heading}
                  </h3>
                  <p className="text-lg font-normal text-[#94979c] leading-[28px]">
                    {tabContent[i].body}
                  </p>
                  <a href={`/features/${tabContent[i].slug}`} className="inline-flex items-center gap-1.5 text-base font-semibold text-[#FF504E] hover:opacity-80 transition-opacity">
                    {tabContent[i].cta}
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: tabbed interface */}
        <div className="hidden md:block">
          {/* Tab strip */}
          <div className="mb-10">
            <div className="flex flex-row w-full">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex flex-col pt-4 pb-0 flex-1 transition-all text-left"
                  style={{ borderTop: `4px solid ${active === i ? "#FF504E" : "#373A41"}` }}
                >
                  <span className={`text-[18px] font-semibold leading-7 transition-colors ${active === i ? "text-[#CECFD2]" : "text-[#CECFD2]/40"}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Panel */}
          <div
            className="relative overflow-hidden mb-10 float shadow-[0_24px_48px_rgba(0,0,0,0.4)] rounded-xl"
            style={{ aspectRatio: "16/9" }}
          >
            {panelComponents.map((Panel, i) => (
              <div key={i} className="absolute inset-0" style={{ opacity: active === i ? 1 : 0, transition: "opacity 0.3s", pointerEvents: active === i ? "auto" : "none" }}>
                <Panel />
              </div>
            ))}
          </div>

          {/* Content */}
          <div ref={contentRef} className="max-w-[768px]">
            <h3 className="text-[36px] font-bold leading-[44px] tracking-[-0.02em] text-[#F7F7F7] mb-5">
              {tabContent[active].heading}
            </h3>
            <p className="text-xl font-normal text-[#94979c] leading-[30px] mb-6">
              {tabContent[active].body}
            </p>
            <a href={`/features/${tabContent[active].slug}`} className="inline-flex items-center gap-1.5 text-base font-semibold text-[#FF504E] hover:opacity-80 transition-opacity">
              {tabContent[active].cta}
              <ArrowIcon />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
