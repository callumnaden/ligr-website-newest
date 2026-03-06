"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ValueProp() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vp-item",
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
        <p className="vp-item text-xs font-semibold tracking-widest text-[#e63030] mb-3">Why LIGR</p>
        <h2 className="vp-item text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Set it. Forget it. Broadcast it.
        </h2>
        <p className="vp-item text-base lg:text-lg text-[#9ea3b0] max-w-2xl mx-auto leading-relaxed mb-16">
          LIGR automates the complex parts of sports broadcasting so you can focus on the game,
          not the technology. From setup to stream, we handle everything.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: "⚡",
              title: "Zero technical skill needed",
              desc: "If you can use a smartphone, you can run a LIGR broadcast. Our guided workflow takes you live in minutes.",
            },
            {
              icon: "🎨",
              title: "Automatic graphic design",
              desc: "AI generates broadcast-quality overlays, lower thirds, and scoreboards tailored to your brand automatically.",
            },
            {
              icon: "📡",
              title: "Stream anywhere",
              desc: "Push your broadcast directly to YouTube, Facebook, and your website simultaneously with one click.",
            },
            {
              icon: "📊",
              title: "Real-time statistics",
              desc: "Live stats automatically pull into your graphics, keeping your audience informed throughout the game.",
            },
            {
              icon: "🔧",
              title: "Works with any setup",
              desc: "Phone camera, webcam, or full broadcast rig — LIGR adapts to whatever equipment you have available.",
            },
            {
              icon: "💰",
              title: "Free for community sport",
              desc: "Community sports organisations get full access to core features forever at no cost. Scale up when you're ready.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="vp-item card-border rounded-xl p-6 text-left hover:border-white/15 hover:bg-white/5 transition-all group"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-white mb-2 group-hover:text-[#e63030] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#9ea3b0] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
