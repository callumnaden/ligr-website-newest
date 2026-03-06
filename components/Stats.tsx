"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: "K+", label: "Events Streamed" },
  { value: 20, suffix: "+", label: "Sports Supported" },
  { value: 20, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  { value: 50, suffix: "+", label: "Countries" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      // Counter animation
      document.querySelectorAll(".stat-number").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0");
        const obj = { val: 0 };
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toString();
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 border-y border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card text-center lg:text-left"
            >
              <div className="text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight gradient-wave bg-clip-text text-transparent mb-2">
                {stat.prefix}
                <span className="stat-number" data-target={stat.value}>
                  {stat.value}
                </span>
                {stat.suffix}
              </div>
              <p className="text-sm text-[#9ea3b0] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
