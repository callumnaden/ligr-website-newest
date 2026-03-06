"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface FeatureDetail {
  name: string;
  badge: string;
  tagline: string;
  body: string;
  color: string;
  checks: string[];
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0 mt-0.5">
      <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <path d="M8.5 14l3.5 3.5 7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FeatureDetailHero({ feature }: { feature: FeatureDetail }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".fdh-badge",   { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .fromTo(".fdh-heading", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2")
        .fromTo(".fdh-body",    { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".fdh-ctas",   { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.2")
        .fromTo(".fdh-checks",  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".fdh-video",   { y: 24, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.7 }, "-=0.2");
    }, ref);
    return () => ctx.revert();
  }, []);

  const col1 = feature.checks.slice(0, 3);
  const col2 = feature.checks.slice(3, 6);
  const col3 = feature.checks.slice(6, 9);

  return (
    <div ref={ref} className="pt-[72px] md:pt-20 px-4 md:px-6 pb-6 flex flex-col" style={{ minHeight: "100svh" }}>
      <div className="max-w-[1728px] mx-auto flex-1 flex flex-col w-full">
        <div
          className="relative overflow-hidden rounded-2xl flex-1 flex flex-col"
          style={{ background: '#2A2D3D' }}
        >
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
          <div className="absolute inset-0 pointer-events-none dot-grid" />

          {/* Content */}
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-16 flex flex-col gap-12 md:gap-16 flex-1">

            {/* Badge + Heading + Tagline + Body + CTAs */}
            <div className="flex flex-col gap-10 md:gap-12">

              {/* Text block */}
              <div className="flex flex-col gap-6 max-w-[768px]">
                {/* Badge */}
                <div className="fdh-badge inline-flex items-center gap-1.5 bg-white rounded-full pl-2.5 pr-3 py-1 w-fit"
                  style={{ border: `1px solid ${feature.color}50` }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 9V3M3 6l3-3 3 3" stroke={feature.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: feature.color }}>{feature.badge}</span>
                </div>

                {/* Heading */}
                <div className="flex flex-col gap-3">
                  <h1
                    className="fdh-heading text-[36px] md:text-[72px] font-extrabold italic uppercase leading-none text-[#F7F7F7] font-[family-name:var(--font-roboto-condensed)]"
                  >
                    {feature.name}
                  </h1>
                  <p className="text-base font-semibold text-[#F7F7F7]">{feature.tagline}</p>
                </div>

                {/* Body */}
                <p className="fdh-body text-lg md:text-xl font-normal leading-[1.65] text-[#F7F7F7]/80 max-w-[640px]">
                  {feature.body}
                </p>
              </div>

              {/* CTAs */}
              <div className="fdh-ctas flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 border border-white text-[#F7F7F7] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/10 transition-colors"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(12,14,18,0.18), inset 0 -2px 0 rgba(12,14,18,0.05)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#CECFD2" strokeWidth="1.5" />
                    <path d="M8.5 7.5l4 2.5-4 2.5V7.5z" fill="#CECFD2" />
                  </svg>
                  See it in action
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-[18px] py-3 rounded-lg text-base font-semibold bg-white hover:bg-white/90 transition-colors"
                  style={{ color: feature.color, boxShadow: "0 1px 2px rgba(10,13,18,0.05), inset 0 0 0 1px rgba(10,13,18,0.18), inset 0 -2px 0 rgba(10,13,18,0.05)" }}
                >
                  Get started with {feature.name}
                </a>
              </div>
            </div>

            {/* Check grid */}
            <div className="fdh-checks flex flex-wrap gap-y-5 gap-x-8">
              {[col1, col2, col3].map((col, ci) => (
                <ul key={ci} className="flex flex-col gap-5 flex-1 min-w-[200px]">
                  {col.map((check, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-lg font-normal text-[#F7F7F7] leading-7">{check}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            {/* Hero image */}
            <div className="fdh-video">
              <div
                className="rounded-xl md:rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0px 32px 64px -12px rgba(10,13,18,0.5), 0px 5px 5px -2.5px rgba(10,13,18,0.2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src="/heroimage.gif"
                  alt="LIGR platform in action"
                  className="w-full block"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
