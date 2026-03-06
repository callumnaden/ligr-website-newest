"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import DashboardMockup from "./DashboardMockup";

export default function FeaturesHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".fh-label", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .fromTo(".fh-heading", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2")
        .fromTo(".fh-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".fh-mockup", { y: 32, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.9 }, "-=0.4");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="pt-[72px] md:pt-20 px-4 md:px-6 pb-6">
      <div className="rounded-2xl relative overflow-hidden">

        {/* Text content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-10 md:pb-12">
          <div className="max-w-[1024px] flex flex-col gap-4">
            <p className="fh-label text-base font-semibold text-[#CECFD2]">Features</p>
            <h1
              className="fh-heading text-[36px] md:text-[72px] font-extrabold italic uppercase leading-none font-[family-name:var(--font-roboto-condensed)]"
              style={{ background: "linear-gradient(135deg, #FF504E 0%, #FF8A65 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Built for the future of sports production
            </h1>
            <p className="fh-sub text-lg md:text-xl font-normal text-[#F7F7F7] leading-[28px] md:leading-[30px] max-w-[768px]">
              From AI-generated graphics to fully automated broadcasts — explore every tool in the LIGR platform.
            </p>
          </div>
        </div>

        {/* Full-width mockup */}
        <div className="fh-mockup relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 pb-0">
          <div className="border border-[#22262f] bg-[#0c0e12] rounded-[24px] md:rounded-[32px] p-1 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
            <div className="rounded-[20px] md:rounded-[28px] bg-[#13161B] border-2 border-[#373A41] overflow-hidden">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
