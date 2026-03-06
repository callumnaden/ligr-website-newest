"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Design your broadcast",
    desc: "Upload your logo, pick your colours, and let LIGR's AI build your full graphic package in seconds.",
  },
  {
    number: "02",
    title: "Connect & automate",
    desc: "Link your scoring system or data feed. Graphics update live as the game progresses — hands-free.",
  },
  {
    number: "03",
    title: "Go live",
    desc: "Hit one button and stream to YouTube, Facebook, your website, or all three at once.",
  },
];

export default function Steps() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".step-item",
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(230,48,48,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="step-item text-xs font-semibold tracking-widest text-[#e63030] mb-3">How it works</p>
            <h2 className="step-item text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Live in 3 steps.
            </h2>
            <p className="step-item text-base text-[#9ea3b0] leading-relaxed max-w-md">
              From zero to broadcast in under 10 minutes. LIGR makes the complex simple.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="step-item flex gap-5 group">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl gradient-wave flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-white mb-1.5 group-hover:text-[#e63030] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#9ea3b0] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
