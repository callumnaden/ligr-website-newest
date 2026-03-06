"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".ch-label", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .fromTo(".ch-heading", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2")
        .fromTo(".ch-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pt-[72px] md:pt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-8 md:pb-12">
        <p className="ch-label text-sm md:text-base font-semibold text-[#94979c] mb-4">Contact</p>
        <h1
          className="ch-heading text-[36px] md:text-[56px] lg:text-[60px] font-bold leading-[44px] md:leading-[64px] lg:leading-[72px] tracking-[-0.02em] mb-5"
          style={{ background: "linear-gradient(175deg, #FF504E 0%, #FF8A65 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          Let&apos;s talk sports production
        </h1>
        <p className="ch-sub text-lg md:text-xl font-normal text-[#F7F7F7] leading-[28px] md:leading-[30px] max-w-[768px]">
          Whether you&apos;re a local club or a national federation — we&apos;d love to hear from you.
        </p>
      </div>
    </div>
  );
}
