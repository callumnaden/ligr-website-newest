"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-6 px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="gradient-wave rounded-2xl lg:rounded-3xl px-8 py-16 lg:py-20 text-center relative overflow-hidden">
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Glow spots */}
          <div className="absolute top-0 left-1/4 w-[300px] h-[200px] bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-black/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <p className="cta-content text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">
              Get started today
            </p>
            <h2 className="cta-content text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to elevate your
              <br />
              sports broadcast?
            </h2>
            <p className="cta-content text-white/70 text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of sports organisations already using LIGR to deliver
              broadcast-quality productions — free for community sport.
            </p>
            <div className="cta-content flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#"
                className="bg-white text-[#e63030] font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors text-sm w-full sm:w-auto text-center"
              >
                Get started for free
              </a>
              <a
                href="#"
                className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm w-full sm:w-auto text-center"
              >
                Book a demo
              </a>
            </div>
            <p className="cta-content mt-5 text-white/50 text-xs">
              No credit card required · Free forever for community sport
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
