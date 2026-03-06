"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

const orgs = [
  "Basketball Australia",
  "Football Victoria",
  "Cricket NSW",
  "Netball Queensland",
  "Hockey Australia",
  "NRL",
  "NBL1",
];

const doubled = [...orgs, ...orgs];

export default function SocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    gsap.to(trackRef.current, {
      x: -halfWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="py-12 md:py-24 px-4 md:px-6">
      <p className="text-base font-medium text-[#94979c] text-center mb-8 md:mb-10">
        Trusted by leading organisations
      </p>

      {/* Mobile: stacked column */}
      <div className="md:hidden flex flex-col gap-6 items-center">
        {orgs.map((org, i) => (
          <span key={i} className="text-[24px] font-bold text-[#F7F7F7] text-center">
            {org}
          </span>
        ))}
      </div>

      {/* Desktop: ticker */}
      <div className="hidden md:block overflow-hidden px-6">
        <div
          ref={trackRef}
          style={{ display: "flex", gap: "24px", width: "max-content" }}
        >
          {doubled.map((org, i) => (
            <span key={i} className="text-[30px] font-bold text-[#F7F7F7] whitespace-nowrap">
              {org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
