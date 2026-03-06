"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DashboardMockup from "./DashboardMockup";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: "Step 1: Design / Generate" },
  { label: "Step 2: Connect & Automate" },
  { label: "Step 3: Go Live" },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l1.5 4.5H18l-3.75 2.75 1.5 4.75L12 12.25 8.25 15l1.5-4.75L6 7.5h4.5L12 3z" fill="white" />
      </svg>
    ),
    heading: "Design / Generate",
    body: "Use Fuse to build a theme visually — or let AI Graphics create one from a text prompt. Pick from 20+ sports templates or start blank.",
    cta: "See it in action",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
      </svg>
    ),
    heading: "Connect & Automate",
    body: "Link your data feeds, scoring systems, or manual inputs. LIGR auto-populates team names, logos, scores, and clocks in real time.",
    cta: "See it in action",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="white" />
        <rect x="3" y="13" width="7" height="8" rx="1" fill="white" />
        <rect x="14" y="3" width="7" height="11" rx="1" fill="white" />
        <rect x="14" y="17" width="7" height="4" rx="1" fill="white" />
      </svg>
    ),
    heading: "Go Live",
    body: "Hit broadcast. Your production streams with broadcast-grade overlays to YouTube, Facebook, Twitch, or any RTMP destination.",
    cta: "See it in action",
  },
];

export default function FeatureRows() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".fr-header > *", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.fromTo(".fr-card", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".fr-cards", start: "top 78%", once: true },
      });
    }, ref);

    const cards = document.querySelectorAll(".fr-card");
    const triggers = Array.from(cards).map((card, i) =>
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        onEnter: () => setActiveStep(i),
        onLeaveBack: () => setActiveStep(Math.max(0, i - 1)),
      })
    );

    return () => {
      ctx.revert();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto md:px-8">
        {/* Header */}
        <div className="fr-header max-w-[768px] mb-12 md:mb-16 flex flex-col gap-3">
          <p className="text-base font-semibold text-[#94979c]">How it works</p>
          <h2 className="text-[36px] font-bold tracking-[-0.02em] leading-[44px] gradient-text">
            Live in 3 steps
          </h2>
          <p className="text-xl text-[#94979c] font-normal leading-[30px]">
            A complete cloud production suite — from AI-generated graphics to fully automated broadcasts.
          </p>
        </div>

        {/* Mobile: step nav above cards (scroll-triggered) */}
        <div className="md:hidden flex flex-col gap-5 mb-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col pt-4 transition-colors"
              style={{ borderTop: `4px solid ${activeStep === i ? "#FF504E" : "#373A41"}` }}
            >
              <span className={`text-base font-semibold transition-colors ${activeStep === i ? "text-[#CECFD2]" : "text-[#CECFD2]/40"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="flex gap-24 items-start">
          {/* Left: vertical step nav — desktop only */}
          <div className="hidden md:flex flex-col gap-6 w-[395px] shrink-0 sticky top-24">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="flex flex-col pt-4 text-left"
                style={{ borderTop: `4px solid ${activeStep === i ? "#FF504E" : "#373A41"}` }}
              >
                <span className={`text-[18px] font-semibold leading-7 transition-colors ${activeStep === i ? "text-[#CECFD2]" : "text-[#CECFD2]/40"}`}>
                  {step.label}
                </span>
              </button>
            ))}
          </div>

          {/* Right: stacked feature cards */}
          <div className="fr-cards flex-1 flex flex-col gap-16 md:gap-24">
            {features.map((feat, i) => (
              <div key={i} className="fr-card flex flex-col gap-6 md:gap-8">
                {/* Dashboard mockup */}
                <DashboardMockup className="rounded-xl overflow-hidden" />

                {/* Content */}
                <div className="flex flex-col gap-4">
                  {/* Icon — dark square (Figma design) */}
                  <div className="w-12 h-12 flex items-center justify-center shrink-0"
                    style={{ background: "#0C0E12", border: "1px solid #373A41", borderRadius: 10, boxShadow: "inset 0 0 0 1px rgba(12,14,18,0.18), inset 0 -2px 0 rgba(12,14,18,0.05)" }}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-[18px] md:text-[30px] font-semibold leading-[28px] md:leading-[38px] text-[#F7F7F7] mb-1 md:mb-3">
                      {feat.heading}
                    </h3>
                    <p className="text-base md:text-[18px] font-normal text-[#94979c] leading-6 md:leading-7 mb-5">
                      {feat.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
