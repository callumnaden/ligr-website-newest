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
    <section ref={sectionRef} className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="rounded-2xl lg:rounded-3xl px-6 py-10 md:px-8 md:py-16 lg:py-20 text-center relative overflow-hidden" style={{ background: '#2A2D3D' }}>
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
          <div className="absolute inset-0 dot-grid pointer-events-none" />

          <div className="relative z-10">
            <p className="cta-content text-white/70 text-sm font-semibold tracking-widest mb-4">
              Get started today
            </p>
            <h2 className="cta-content text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
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
