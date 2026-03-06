"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: "Step 1: Design / Generate" },
  { label: "Step 2: Connect & Automate" },
  { label: "Step 3: Go Live" },
];

// ── Coded Illustrations ──────────────────────────────────────────────────────

function DesignIllustration() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-[#22262F]"
      style={{ aspectRatio: "16/9", background: "#13161B", display: "flex", flexDirection: "column" }}
    >
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid #22262F", background: "#1A1D26", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "#94979C", marginLeft: 6 }}>Fuse Theme Builder — NBA_Scorebug_v2.fuse</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <div style={{ fontSize: 8, background: "rgba(255,80,78,0.15)", color: "#FF504E", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>✦ AI Generate</div>
          <div style={{ fontSize: 8, background: "#22262F", color: "#94979C", padding: "2px 8px", borderRadius: 4 }}>Preview</div>
          <div style={{ fontSize: 8, background: "#FF504E", color: "white", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>Publish</div>
        </div>
      </div>
      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left: component panel */}
        <div style={{ width: "19%", borderRight: "1px solid #22262F", background: "#1A1D26", padding: 8, display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
          <div style={{ fontSize: 7, color: "#94979C", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Components</div>
          {["Score Bug", "Lower Third", "Ticker", "Clock", "Logo Bug", "Full Screen", "Coming Up"].map((c, i) => (
            <div key={i} style={{ fontSize: 8, padding: "4px 8px", borderRadius: 4, background: i === 0 ? "rgba(255,80,78,0.15)" : "transparent", color: i === 0 ? "#FF504E" : "#94979C" }}>{c}</div>
          ))}
        </div>
        {/* Canvas */}
        <div style={{ flex: 1, background: "#0C0E12", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
          {/* Score bug */}
          <div style={{ position: "relative", zIndex: 10, background: "#FF504E", borderRadius: 6, padding: "8px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Lakers</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1 }}>26</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.6)" }}>Q3</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>7:15</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Celtics</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1 }}>17</div>
            </div>
          </div>
          {/* Selection handles */}
          <div style={{ position: "absolute", zIndex: 20, border: "1.5px solid #FF504E", borderRadius: 8, pointerEvents: "none", width: 210, height: 60, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([x, y], i) => (
              <div key={i} style={{ position: "absolute", width: 6, height: 6, background: "white", border: "1.5px solid #FF504E", borderRadius: 2, top: y < 0 ? -4 : "auto", bottom: y > 0 ? -4 : "auto", left: x < 0 ? -4 : "auto", right: x > 0 ? -4 : "auto" }} />
            ))}
          </div>
        </div>
        {/* Right: properties panel */}
        <div style={{ width: "21%", borderLeft: "1px solid #22262F", background: "#1A1D26", padding: 8, display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
          <div style={{ fontSize: 7, color: "#94979C", textTransform: "uppercase", letterSpacing: 1 }}>Properties</div>
          {[
            { label: "Background", value: "#FF504E", isColor: true },
            { label: "Font", value: "Inter Bold" },
            { label: "Padding", value: "8px 16px" },
            { label: "Border Radius", value: "6px" },
            { label: "Data Source", value: "Live Feed ✓" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 7, color: "rgba(148,151,156,0.6)" }}>{p.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#22262F", borderRadius: 3, padding: "3px 6px" }}>
                {p.isColor && <div style={{ width: 8, height: 8, borderRadius: 2, background: p.value, flexShrink: 0 }} />}
                <div style={{ fontSize: 8, color: "#CECFD2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.value}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "auto", fontSize: 8, background: "rgba(255,80,78,0.1)", border: "1px solid rgba(255,80,78,0.25)", borderRadius: 4, padding: "5px 8px", color: "#FF8A65", textAlign: "center" }}>
            ✦ AI-generated template
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectIllustration() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-[#22262F]"
      style={{ aspectRatio: "16/9", background: "#13161B", display: "flex", flexDirection: "column" }}
    >
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid #22262F", background: "#1A1D26", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "#94979C", marginLeft: 6 }}>LIGR — Data & Automation</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28C840" }} />
          <span style={{ fontSize: 8, color: "#28C840", fontWeight: 600 }}>All feeds active</span>
        </div>
      </div>
      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left: data sources + field mappings */}
        <div style={{ width: "45%", borderRight: "1px solid #22262F", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 7, color: "#94979C", textTransform: "uppercase", letterSpacing: 1 }}>Data Sources</div>
          {[
            { name: "SportsRadar API", status: "Connected", color: "#28C840", fields: 3 },
            { name: "ESPN Feed", status: "Connected", color: "#28C840", fields: 5 },
            { name: "Team Logos CDN", status: "Synced", color: "#28C840", fields: 2 },
            { name: "Custom Scoring", status: "Manual", color: "#FEBC2E", fields: 4 },
          ].map((src, i) => (
            <div key={i} style={{ background: "#1A1D26", border: "1px solid #22262F", borderRadius: 5, padding: "5px 8px", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: src.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8, color: "#CECFD2", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{src.name}</div>
                <div style={{ fontSize: 7, color: src.color, marginTop: 1 }}>{src.status} · {src.fields} fields mapped</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 4 }}>
            <div style={{ fontSize: 7, color: "#94979C", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>Field Mappings</div>
            {[
              ["Team Name", "team.name"],
              ["Home Score", "score.home"],
              ["Game Clock", "game.clock"],
              ["Quarter", "game.period"],
            ].map(([label, value], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{ fontSize: 8, color: "#94979C", width: 64, flexShrink: 0 }}>{label}</div>
                <div style={{ flex: 1, height: 1, background: "#373A41", position: "relative" }}>
                  <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 4, height: 4, borderRadius: "50%", background: "#FF504E" }} />
                </div>
                <div style={{ fontSize: 8, color: "#FF504E", fontFamily: "monospace", flexShrink: 0 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: live event log */}
        <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 7, color: "#94979C", textTransform: "uppercase", letterSpacing: 1 }}>Live Event Log</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF504E" }} />
              <span style={{ fontSize: 7, color: "#FF504E", fontWeight: 600 }}>Live</span>
            </div>
          </div>
          {[
            { time: "14:32:01", event: "Score updated", detail: "Lakers 24 → 26", color: "#FF504E" },
            { time: "14:31:55", event: "Graphic triggered", detail: "Score Bug displayed", color: "#FF8A65" },
            { time: "14:31:48", event: "Team logo loaded", detail: "CelticsPrimary.png", color: "#94979C" },
            { time: "14:31:44", event: "Clock synced", detail: "Q3 · 7:15 remaining", color: "#28C840" },
            { time: "14:31:38", event: "Feed heartbeat", detail: "SportsRadar API OK", color: "#373A41" },
            { time: "14:31:30", event: "Automation rule fired", detail: "Quarter change → banner", color: "#9C88FF" },
          ].map((ev, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "5px 8px", background: "#1A1D26", borderRadius: 4, borderLeft: `2px solid ${ev.color}` }}>
              <div style={{ fontSize: 7, color: "#94979C", flexShrink: 0, marginTop: 1, fontFamily: "monospace" }}>{ev.time}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8, color: "#CECFD2", fontWeight: 600 }}>{ev.event}</div>
                <div style={{ fontSize: 7, color: "#94979C", marginTop: 1 }}>{ev.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GoLiveIllustration() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-[#22262F]"
      style={{ aspectRatio: "16/9", background: "#13161B", display: "flex", flexDirection: "column" }}
    >
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid #22262F", background: "#1A1D26", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "#94979C", marginLeft: 6 }}>LIGR — Broadcast Control</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,80,78,0.12)", border: "1px solid rgba(255,80,78,0.3)", borderRadius: 4, padding: "2px 8px" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF504E" }} />
            <span style={{ fontSize: 8, color: "#FF504E", fontWeight: 700 }}>LIVE</span>
          </div>
          <span style={{ fontSize: 8, color: "#94979C", fontFamily: "monospace" }}>02:14:33</span>
        </div>
      </div>
      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Preview */}
        <div style={{ flex: 1, position: "relative", background: "#0C0E12", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ width: "80%", aspectRatio: "16/9", background: "linear-gradient(135deg, #1A1D26 0%, #0C0E12 100%)", borderRadius: 6, position: "relative", overflow: "hidden", border: "1px solid #22262F" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 60% 40%, rgba(255,80,78,0.06) 0%, transparent 60%)" }} />
            {/* Score bug overlay */}
            <div style={{ position: "absolute", bottom: 8, left: 8, background: "#FF504E", borderRadius: 3, padding: "3px 8px", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 7, color: "white", fontWeight: 700 }}>LAK 26</div>
              <div style={{ fontSize: 6, color: "rgba(255,255,255,0.7)", borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: 6 }}>Q3 · 7:15</div>
              <div style={{ fontSize: 7, color: "white", fontWeight: 700, borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: 6 }}>CEL 17</div>
            </div>
            {/* Signal bars */}
            <div style={{ position: "absolute", top: 6, right: 6, display: "flex", gap: 2, alignItems: "flex-end" }}>
              {[5, 9, 13, 17, 21].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: i < 4 ? "#28C840" : "#373A41", borderRadius: 1 }} />
              ))}
            </div>
          </div>
        </div>
        {/* Right: destinations */}
        <div style={{ width: "38%", borderLeft: "1px solid #22262F", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 7, color: "#94979C", textTransform: "uppercase", letterSpacing: 1 }}>Destinations</div>
          {[
            { name: "YouTube Live", viewers: "1,284", status: "Live", color: "#FF504E", quality: "1080p" },
            { name: "Facebook Live", viewers: "847", status: "Live", color: "#28C840", quality: "720p" },
            { name: "Twitch", viewers: "392", status: "Live", color: "#28C840", quality: "720p" },
            { name: "Custom RTMP", viewers: "—", status: "Standby", color: "#FEBC2E", quality: "1080p" },
          ].map((dest, i) => (
            <div key={i} style={{ background: "#1A1D26", border: "1px solid #22262F", borderRadius: 5, padding: "6px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: dest.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 8, color: "#CECFD2", fontWeight: 600 }}>{dest.name}</div>
                </div>
                <div style={{ fontSize: 7, color: dest.color, background: `${dest.color}1A`, padding: "1px 5px", borderRadius: 3, fontWeight: 600 }}>{dest.status}</div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 7, color: "#94979C" }}>Viewers</div>
                  <div style={{ fontSize: 9, color: "#F7F7F7", fontWeight: 600 }}>{dest.viewers}</div>
                </div>
                <div>
                  <div style={{ fontSize: 7, color: "#94979C" }}>Quality</div>
                  <div style={{ fontSize: 9, color: "#F7F7F7", fontWeight: 600 }}>{dest.quality}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "auto", padding: "7px 10px", background: "rgba(255,80,78,0.08)", border: "1px solid rgba(255,80,78,0.2)", borderRadius: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 8, color: "#94979C" }}>Total Viewers</div>
            <div style={{ fontSize: 14, color: "#F7F7F7", fontWeight: 700 }}>2,523</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Feature data ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: (
      // Magic wand + sparkle — design & AI generation
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 4l5 5-10.5 10.5L4 20l1.5-5.5L15 4z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.9z" fill="white" />
        <path d="M21.5 10l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1z" fill="white" opacity="0.6" />
      </svg>
    ),
    heading: "Design / Generate",
    body: "Use Fuse to build a theme visually — or let AI Graphics create one from a text prompt. Pick from 20+ sports templates or start blank.",
    cta: "See it in action",
    Illustration: DesignIllustration,
  },
  {
    icon: (
      // Network nodes — data connections & automation
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="2.5" stroke="white" strokeWidth="1.5" />
        <circle cx="19" cy="6" r="2.5" stroke="white" strokeWidth="1.5" />
        <circle cx="19" cy="18" r="2.5" stroke="white" strokeWidth="1.5" />
        <path d="M7.5 11L16.5 7M7.5 13l9 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    heading: "Connect & Automate",
    body: "Link your data feeds, scoring systems, or manual inputs. LIGR auto-populates team names, logos, scores, and clocks in real time.",
    cta: "See it in action",
    Illustration: ConnectIllustration,
  },
  {
    icon: (
      // Broadcast signal waves — streaming live
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="16" r="2" fill="white" />
        <path d="M8 12.5C9 11.3 10.4 10.5 12 10.5s3 .8 4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4.9 9.5C6.9 7 9.3 5.5 12 5.5s5.1 1.5 7.1 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    heading: "Go Live",
    body: "Hit broadcast. Your production streams with broadcast-grade overlays to YouTube, Facebook, Twitch, or any RTMP destination.",
    cta: "See it in action",
    Illustration: GoLiveIllustration,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FeatureRows() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCard = useCallback((i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".fr-header > *", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.fromTo(".fr-card", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".fr-cards", start: "top 78%", once: true },
      });
    }, ref);

    const cards = document.querySelectorAll(".fr-card");
    const triggers = Array.from(cards).map((card, i) =>
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        onEnter: () => setActiveStep(i),
        onLeaveBack: () => setActiveStep(Math.max(0, i - 1)),
      })
    );

    return () => {
      ctx.revert();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="fr-header max-w-[768px] mb-12 md:mb-16 flex flex-col gap-3">
          <p className="text-base font-semibold text-[#94979c]">How it works</p>
          <h2 className="text-[36px] font-bold tracking-[-0.02em] leading-[44px] gradient-text">
            Live in 3 steps
          </h2>
          <p className="text-xl text-[#94979c] font-normal leading-[30px]">
            A complete cloud production suite — from AI-generated graphics to fully automated broadcasts.
          </p>
        </div>

        {/* Mobile: step nav (clickable, scroll-triggered active state) */}
        <div className="md:hidden flex flex-col gap-0 mb-10">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className="flex flex-col pt-4 pb-3 transition-all text-left"
              style={{ borderTop: `4px solid ${activeStep === i ? "#FF504E" : "#373A41"}` }}
            >
              <span className={`text-base font-semibold transition-colors ${activeStep === i ? "text-[#CECFD2]" : "text-[#CECFD2]/40"}`}>
                {step.label}
              </span>
            </button>
          ))}
        </div>

        {/* Two column layout */}
        <div className="flex gap-16 xl:gap-24 items-start">
          {/* Left: vertical step nav — desktop only */}
          <div className="hidden md:flex flex-col gap-6 w-[320px] xl:w-[395px] shrink-0 sticky top-24">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className="flex flex-col pt-4 text-left cursor-pointer"
                style={{ borderTop: `4px solid ${activeStep === i ? "#FF504E" : "#373A41"}` }}
              >
                <span className={`text-[16px] xl:text-[18px] font-semibold leading-7 transition-colors ${activeStep === i ? "text-[#CECFD2]" : "text-[#CECFD2]/40"}`}>
                  {step.label}
                </span>
              </button>
            ))}
          </div>

          {/* Right: stacked feature cards */}
          <div className="fr-cards flex-1 min-w-0 flex flex-col gap-16 md:gap-24">
            {features.map((feat, i) => {
              const { Illustration } = feat;
              return (
                <div
                  key={i}
                  className="fr-card flex flex-col gap-6 md:gap-8 scroll-mt-24"
                  ref={(el) => { cardRefs.current[i] = el; }}
                >
                  <Illustration />
                  <div className="flex flex-col gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center shrink-0"
                      style={{ background: "#0C0E12", border: "1px solid #373A41", borderRadius: 10, boxShadow: "inset 0 0 0 1px rgba(12,14,18,0.18), inset 0 -2px 0 rgba(12,14,18,0.05)" }}
                    >
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="text-[20px] md:text-[30px] font-semibold leading-[28px] md:leading-[38px] text-[#F7F7F7] mb-2 md:mb-3">
                        {feat.heading}
                      </h3>
                      <p className="text-base md:text-[18px] font-normal text-[#94979c] leading-6 md:leading-7">
                        {feat.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
