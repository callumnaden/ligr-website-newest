"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { prefix: "",  number: 100, suffix: "K+", label: "Hours Broadcast" },
  { prefix: "",  number: 20,  suffix: "+",  label: "Sports Supported" },
  { prefix: "$", number: 20,  suffix: "M+", label: "Sponsorship Revenue Driven" },
  { prefix: "",  number: 50,  suffix: "+",  label: "Countries" },
];

export default function Metrics() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".metric-wrap", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });

      document.querySelectorAll(".metric-num").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0");
        const obj = { val: 0 };
        gsap.fromTo(obj, { val: 0 }, {
          val: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="metric-wrap flex flex-col items-center gap-3">
              <div className="text-[48px] md:text-[60px] font-bold leading-[58px] md:leading-[72px] tracking-[-0.02em] text-center gradient-text">
                {m.prefix}<span className="metric-num" data-target={m.number}>0</span>{m.suffix}
              </div>
              <p className="text-[18px] font-semibold text-[#F7F7F7] text-center leading-7">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
