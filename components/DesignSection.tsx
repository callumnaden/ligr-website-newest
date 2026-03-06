"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DesignSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ds-item",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const benefits = [
    { title: "Hundreds of templates", desc: "Sport-specific layouts for every major Australian and international sport." },
    { title: "Full brand control", desc: "Every colour, font, and element matches your club's identity." },
    { title: "Export anywhere", desc: "Use in LIGR or export to OBS, vMix, or any broadcast software." },
    { title: "Seasonal updates", desc: "New templates added every season so your look stays fresh." },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(230,48,48,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="ds-item inline-block text-xs font-semibold tracking-widest uppercase text-[#e63030] mb-3">
              Design Studio
            </span>
            <h2 className="ds-item text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-snug">
              Design without limits.
            </h2>
            <p className="ds-item text-base lg:text-lg text-[#9ea3b0] leading-relaxed mb-10">
              Professional broadcast design tools, purpose-built for sports. No Photoshop, no After Effects,
              no design degree required. Just beautiful graphics, instantly.
            </p>
            <div className="space-y-5">
              {benefits.map((b, i) => (
                <div key={i} className="ds-item flex gap-4">
                  <div className="w-1 rounded-full gradient-wave shrink-0 self-stretch" />
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{b.title}</h4>
                    <p className="text-sm text-[#9ea3b0]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template grid mockup */}
          <div className="ds-item relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(230,48,48,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none" />
            <div className="relative card-border rounded-2xl overflow-hidden">
              <div className="bg-[#1a1e2a] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-[#5c6070] ml-2">Template Library</span>
              </div>
              <div className="bg-[#13161f] p-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Lower Third", sport: "AFL" },
                    { name: "Score Bug", sport: "Netball" },
                    { name: "Player Card", sport: "Cricket" },
                    { name: "Full Scoreboard", sport: "Rugby" },
                    { name: "Transition", sport: "Hockey" },
                    { name: "Highlight Reel", sport: "Basketball" },
                  ].map((t, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border overflow-hidden cursor-pointer hover:border-[#e63030]/50 transition-colors ${
                        i === 0 ? "border-[#e63030]/40" : "border-white/8"
                      }`}
                    >
                      <div className={`h-16 ${i === 0 ? "gradient-wave" : "bg-white/3"} flex items-end p-2.5`}>
                        {i === 0 && (
                          <div className="text-white text-[10px] font-semibold">Selected</div>
                        )}
                      </div>
                      <div className="p-2.5 bg-[#1a1e2a]">
                        <div className="text-[11px] font-medium text-white">{t.name}</div>
                        <div className="text-[10px] text-[#5c6070]">{t.sport}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
