"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-6 pb-4 md:pb-6">
      <div className="max-w-[1920px] mx-auto">
        <div className="gradient-card rounded-2xl relative overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid pointer-events-none" />
          {/* Radial mask */}
          <div className="absolute inset-0 radial-mask pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-10 md:py-16">
            <div className="max-w-[768px]">
              <h2 className="cta-item text-[30px] md:text-[36px] font-bold leading-[38px] md:leading-[44px] tracking-[-0.02em] text-[#F7F7F7] mb-5">
                Ready to elevate your sports broadcast?
              </h2>
              <p className="cta-item text-lg md:text-xl font-normal text-[#F7F7F7]/80 leading-[28px] md:leading-[30px] mb-8">
                Join hundreds of sports organisations already using LIGR to
                deliver broadcast-quality productions — free for community
                sport, forever.
              </p>
              <div className="cta-item flex flex-col md:flex-row md:items-center gap-3">
                <button className="w-full md:w-auto bg-white text-[#FF504E] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/90 transition-colors shadow-[0_1px_2px_rgba(10,13,18,0.05),inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05)]">
                  Start for free
                </button>
                <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 border border-white text-[#F7F7F7] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/10 transition-colors shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]">
                  View pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
