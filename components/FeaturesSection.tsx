"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AutomationAnimPanel from "./AutomationAnimPanel";

gsap.registerPlugin(ScrollTrigger);

/* ── Panel components (light-mode app mockups) ──────────────── */

function AppShell({ children, color, label }: { children: React.ReactNode; color: string; label: string }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-4 py-2 shrink-0" style={{ background: color + "12", borderBottom: `1px solid ${color}25` }}>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color }}>{label}</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#f5f5f5] border-b border-gray-200 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 h-5 bg-white border border-gray-200 rounded flex items-center px-2">
          <span className="text-[10px] text-gray-400">app.ligr.tv</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-white">{children}</div>
    </div>
  );
}

function FusePanel() {
  const color = "#FF504E";
  return (
    <AppShell color={color} label="Fuse">
      <div className="flex h-full">
        <div className="w-36 border-r border-gray-100 bg-[#fafafa] flex flex-col shrink-0">
          <div className="px-3 py-2.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">Components</div>
          {["Scoreboard", "Clock", "L-Third", "Ticker", "Bug", "Player Card"].map((c) => (
            <div key={c} className="mx-2 my-1 flex items-center gap-2 bg-white border border-gray-200 rounded px-2 py-1.5 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: color + "55" }} />
              <span className="text-[9px] text-gray-600 font-medium">{c}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 relative bg-[#f8f8f8] overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
          <div className="absolute top-8 left-6 right-6 bg-white border-2 rounded-xl p-3 shadow-lg" style={{ borderColor: color }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: color + "20" }}>
                  <div className="w-2 h-2 rounded-sm" style={{ background: color }} />
                </div>
                <span className="text-[10px] font-semibold text-gray-800">Scoreboard</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: color + "15", color }}>Selected</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200" />
                <span className="text-xs font-bold text-gray-800">HOME</span>
              </div>
              <span className="text-lg font-black" style={{ color }}>2 – 1</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-800">AWAY</span>
                <div className="w-5 h-5 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex gap-2">
            {["Team Names", "Score", "Clock", "Period"].map((b) => (
              <div key={b} className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] text-gray-500 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-32 border-l border-gray-100 bg-[#fafafa] flex flex-col shrink-0">
          <div className="px-2 py-2.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">Properties</div>
          {[["Width", "1920px"], ["Height", "80px"], ["X", "0"], ["Y", "0"], ["Opacity", "100%"], ["Radius", "8px"]].map(([k, v]) => (
            <div key={k} className="px-2 py-1.5 flex items-center justify-between">
              <span className="text-[9px] text-gray-400">{k}</span>
              <div className="bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm">
                <span className="text-[9px] text-gray-700 font-medium">{v}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function AIGraphicsPanel() {
  const color = "#9E77ED";
  return (
    <AppShell color={color} label="AI Graphics">
      <div className="flex flex-col h-full p-4 gap-3 bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: color + "20" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1l1 2.5H9L6.5 5l1 2.5L5 6 2.5 7.5l1-2.5L1 3.5h3z" fill={color} /></svg>
            </div>
            <span className="text-[10px] font-semibold" style={{ color }}>AI Graphics — Powered by Claude</span>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 mb-2.5 text-[10px] text-gray-500 leading-relaxed">
            &ldquo;Create a broadcast scoreboard for an AFL match. Dark theme with team colours, live score, quarter clock and possession stats.&rdquo;
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 rounded-full" style={{ background: color }} />
            </div>
            <span className="text-[9px] font-medium" style={{ color }}>Generating…</span>
          </div>
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100">
            <span className="text-[9px] font-medium text-gray-500">Preview — AFL Scoreboard</span>
            <div className="flex gap-1">
              {["Edit", "Export", "Apply"].map((btn) => (
                <span key={btn} className="text-[8px] px-1.5 py-0.5 rounded border border-gray-200 text-gray-500">{btn}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-xs bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl px-4 py-3 shadow-lg">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] text-gray-400 uppercase tracking-widest">Q3 · 18:42</span>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /><span className="text-[8px] text-red-400 font-medium">LIVE</span></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-blue-800" /><span className="text-xs font-black text-white">CARLTON</span></div>
                <span className="text-xl font-black text-white">84 · 72</span>
                <div className="flex items-center gap-2"><span className="text-xs font-black text-white">HAWKS</span><div className="w-6 h-6 rounded-full bg-yellow-800" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {["Adjust contrast", "Add animations", "Export theme"].map((s) => (
            <div key={s} className="flex-1 text-center bg-white border border-gray-200 rounded-lg py-1.5 shadow-sm">
              <span className="text-[9px] text-gray-500 font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function AutomationPanel() {
  const color = "#16B364";
  const events = [
    { time: "18:42", event: "Goal scored — Home", action: "Score overlay triggered", done: true },
    { time: "18:39", event: "Foul — Away player", action: "Foul graphic displayed", done: true },
    { time: "18:31", event: "Timeout called", action: "Break sequence started", done: true },
    { time: "18:28", event: "Quarter end", action: "Quarter summary generated", live: true },
    { time: "18:20", event: "Player sub", action: "Player card queued", done: false },
  ];
  return (
    <AppShell color={color} label="Full Automation">
      <div className="flex flex-col h-full p-3 gap-3 bg-gray-50">
        <div className="grid grid-cols-3 gap-2">
          {[["Data Feed", "Connected"], ["Automation", "Active"], ["Overlays", "Running"]].map(([label, val]) => (
            <div key={label} className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
              <div className="flex items-center gap-1 mb-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} /><span className="text-[9px] font-semibold" style={{ color }}>{val}</span></div>
              <span className="text-[9px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[9px] text-gray-400 mb-0.5">Live Match Clock</div>
            <div className="text-2xl font-black text-gray-900 tabular-nums">18:42</div>
            <div className="text-[9px] font-semibold" style={{ color }}>Q3 — In Progress</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-gray-400 mb-0.5">Events fired</div>
            <div className="text-xl font-black text-gray-900">47</div>
            <div className="text-[9px] text-gray-400">this match</div>
          </div>
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="text-[9px] font-semibold text-gray-600">Automation Event Log</span>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} /><span className="text-[9px] font-medium" style={{ color }}>Live</span></div>
          </div>
          <div className="flex-1 overflow-hidden divide-y divide-gray-50">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2">
                <span className="text-[8px] text-gray-300 shrink-0 tabular-nums mt-0.5 font-medium">{e.time}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] text-gray-700 font-medium truncate">{e.event}</div>
                  <div className="text-[8px] text-gray-400 truncate">{e.action}</div>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${"live" in e && e.live ? "animate-pulse" : ""}`}
                  style={{ background: e.done ? color : "live" in e && e.live ? "#F79009" : "#d1d5db" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StreamingPanel() {
  const color = "#0BA5EC";
  const destinations = [
    { name: "YouTube", viewers: "1,842", health: 98, active: true },
    { name: "Facebook", viewers: "634", health: 97, active: true },
    { name: "Twitch", viewers: "291", health: 99, active: true },
    { name: "RTMP Custom", viewers: "—", health: 0, active: false },
  ];
  return (
    <AppShell color={color} label="Cloud Streaming">
      <div className="flex flex-col h-full p-3 gap-3 bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} /><span className="text-[10px] font-bold text-gray-900">LIVE · 01:24:37</span></div>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: color + "15", color }}>HD 1080p60</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[["2,767", "Total Viewers"], ["4.2 Mbps", "Bitrate"], ["99.8%", "Uptime"]].map(([v, l]) => (
              <div key={l}><div className="text-sm font-black text-gray-900">{v}</div><div className="text-[9px] text-gray-400">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Destinations</span>
          {destinations.map((d) => (
            <div key={d.name} className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-3 shadow-sm">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: d.active ? color + "18" : "#f3f4f6" }}>
                <div className="w-3 h-3 rounded-sm" style={{ background: d.active ? color : "#d1d5db" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-gray-700">{d.name}</span>
                  {d.active ? <span className="text-[9px] font-medium" style={{ color }}>{d.viewers} viewers</span> : <span className="text-[9px] text-gray-300">Not connected</span>}
                </div>
                {d.active && (<div className="h-1 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${d.health}%`, background: color }} /></div>)}
              </div>
              <div className={`w-2 h-2 rounded-full shrink-0 ${d.active ? "animate-pulse" : ""}`} style={{ background: d.active ? color : "#e5e7eb" }} />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function RevenuePanel() {
  const color = "#F79009";
  return (
    <AppShell color={color} label="Revenue & Ads">
      <div className="flex flex-col h-full p-3 gap-3 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          {[{ label: "Sponsorship Revenue", value: "$4,820", change: "+18%" }, { label: "Ad Impressions", value: "182K", change: "+12%" }].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
              <div className="text-[9px] text-gray-400 mb-1">{s.label}</div>
              <div className="text-lg font-black text-gray-900">{s.value}</div>
              <div className="text-[9px] font-semibold" style={{ color }}>{s.change} this match</div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex-1 shadow-sm">
          <div className="text-[9px] font-semibold text-gray-400 mb-3">Sponsor Exposure (seconds on-screen)</div>
          <div className="flex items-end gap-1 h-20">
            {[65, 88, 42, 94, 78, 55, 82, 90, 48, 71, 85, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 9 ? color : color + "30" }} />
            ))}
          </div>
          <div className="flex justify-between mt-2">{["Q1", "Q2", "Q3", "Q4"].map((q) => <span key={q} className="text-[8px] text-gray-300">{q}</span>)}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Active Sponsors</div>
          <div className="grid grid-cols-4 gap-1.5">
            {["SPONSOR", "PARTNER", "BRAND", "CO."].map((s) => (
              <div key={s} className="border border-gray-200 rounded-lg h-9 flex items-center justify-center bg-gray-50">
                <span className="text-[8px] font-bold text-gray-300">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function RivePanel() {
  const color = "#EE46BC";
  const states = ["Idle", "Goal Scored", "Foul", "Timeout", "Half Time", "Full Time"];
  return (
    <AppShell color={color} label="Rive Animations">
      <div className="flex h-full">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-gray-50 flex items-center justify-center relative overflow-hidden border-b border-gray-100">
            <div className="relative">
              <div className="w-44 h-24 rounded-xl bg-white border border-gray-200 shadow-lg flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 1, 2, 3].map((ring) => (<div key={ring} className="absolute rounded-full border" style={{ width: 20 + ring * 24, height: 20 + ring * 24, borderColor: color + "30", opacity: 1 - ring * 0.2 }} />))}
                </div>
                <div className="relative z-10 text-center"><div className="text-xl font-black" style={{ color }}>GOAL!</div><div className="text-[9px] text-gray-400">celebration.riv</div></div>
              </div>
              <div className="absolute -top-2 -right-2 text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: color }}>RIVE</div>
            </div>
          </div>
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="text-[8px] text-gray-400 mb-1.5 font-medium">Timeline — Goal Scored · 1.8s</div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 18 }).map((_, i) => (<div key={i} className="flex-1 h-4 rounded-sm" style={{ background: i < 12 ? color + (i < 9 ? "cc" : "55") : "#f3f4f6" }} />))}
            </div>
          </div>
        </div>
        <div className="w-36 border-l border-gray-100 bg-[#fafafa] flex flex-col shrink-0">
          <div className="px-2 py-2.5 text-[8px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">State Machine</div>
          {states.map((state, i) => (
            <div key={state} className="mx-1.5 my-0.5 flex items-center gap-1.5 px-2 py-1.5 rounded-lg border" style={{ background: i === 1 ? color + "12" : "transparent", borderColor: i === 1 ? color + "40" : "#f3f4f6" }}>
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: i === 1 ? color : "#e5e7eb" }} />
              <span className="text-[9px] font-medium" style={{ color: i === 1 ? color : "#9ca3af" }}>{state}</span>
              {i === 1 && <span className="ml-auto text-[7px]" style={{ color }}>●</span>}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

const PANELS = [FusePanel, AIGraphicsPanel, AutomationAnimPanel, StreamingPanel, RevenuePanel, RivePanel];

/* ── Feature data ────────────────────────────────────────── */
const features = [
  {
    name: "Fuse",
    slug: "fuse",
    tagline: "Design broadcast overlays without code.",
    body: "Fuse is LIGR's advanced visual theme builder. Craft pixel-perfect broadcast graphics with a drag-and-drop interface, bind live match data, and publish directly to your production pipeline — all in real time.",
    checks: [
      "Visual drag-and-drop canvas with snap-to-grid alignment",
      "200+ pre-built broadcast components (scoreboards, tickers, L-thirds)",
      "Real-time data binding — scores, clocks, team names, stats auto-populate",
    ],
    cta: "Explore Fuse Theme Builder",
  },
  {
    name: "AI Graphics",
    slug: "ai-graphics",
    tagline: "Describe it. Generate it. Broadcast it.",
    body: "Powered by Anthropic's Claude, AI Graphics transforms natural language prompts into broadcast-ready overlays. Describe what you want — including sport, style, and brand preferences — and watch professional graphics materialise in seconds.",
    checks: [
      "Text-to-overlay generation powered by Claude AI",
      "Understands sport-specific layouts, rules, and data structures",
      "Generates data-bound components, not just static images",
    ],
    cta: "Explore AI Graphics",
  },
  {
    name: "Full Automation",
    slug: "full-automation",
    tagline: "Set it. Forget it. Broadcast it.",
    body: "LIGR's automation engine connects to live data feeds and runs your entire broadcast production without a single operator. Scores update, clocks tick, graphics trigger — all automatically, all in real time.",
    checks: [
      "Connect to scoring APIs, timing systems, and stat providers",
      "Auto-trigger graphics based on match events (goals, fouls, timeouts)",
      "Smart clock management with period tracking and overtime",
    ],
    cta: "Explore Full Automation",
  },
  {
    name: "Cloud Streaming",
    slug: "cloud-streaming",
    tagline: "Broadcast from anywhere to everywhere.",
    body: "LIGR's cloud-native streaming pipeline delivers sub-second latency with built-in CDN distribution. Stream to YouTube, Facebook, Twitch, or any RTMP destination — with broadcast-grade overlays composited in the cloud.",
    checks: [
      "Sub-second glass-to-glass latency",
      "Multi-destination streaming (YouTube, Facebook, Twitch, RTMP)",
      "Cloud-composited overlays — no local hardware needed",
    ],
    cta: "Explore Cloud Streaming",
  },
  {
    name: "Revenue & Ads",
    slug: "revenue-ads",
    tagline: "Turn every broadcast into a revenue stream.",
    body: "Transform your broadcasts into revenue generators with automated sponsor placements, dynamic ad rotations, and detailed exposure analytics that prove ROI to your partners.",
    checks: [
      "Automated sponsor logo placement across all overlay elements",
      "Dynamic ad roll scheduling — pre, mid, and post-match",
      "Sponsor exposure tracking with second-by-second analytics",
    ],
    cta: "Explore Revenue & Ads",
  },
  {
    name: "Rive Animations",
    slug: "rive-animations",
    tagline: "Next-gen motion, powered by interactivity.",
    body: "LIGR integrates Rive — the industry-leading interactive animation platform — to deliver buttery-smooth motion graphics that respond to live match events. Transitions, celebrations, and data reveals that feel alive.",
    checks: [
      "Rive-powered animations with 60fps smoothness",
      "Event-driven triggers — goal scored = custom celebration animation",
      "State machine support for complex multi-state overlays",
    ],
    cta: "Explore Rive Animations",
  },
];

/* ── Icons ───────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0 mt-0.5">
      <circle cx="14" cy="14" r="12" stroke="#FF504E" strokeWidth="2" />
      <path d="M8.5 14l4 4 7-8" stroke="#FF504E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function FeaturesSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevActive = useRef(0);

  // Animate height + crossfade when active changes
  useEffect(() => {
    const prev = prevActive.current;
    const curr = active;
    if (prev === curr) return;

    gsap.killTweensOf([panelRefs.current[prev], panelRefs.current[curr]]);
    gsap.to(panelRefs.current[prev], { opacity: 0, duration: 0.2, ease: "power2.in" });
    gsap.fromTo(panelRefs.current[curr], { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out", delay: 0.1 });

    prevActive.current = curr;
  }, [active]);

  useEffect(() => {

    const ctx = gsap.context(() => {
      gsap.fromTo(".fs-card", { y: 32, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);

    const cards = ref.current?.querySelectorAll(".fs-card") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Array.from(cards).indexOf(entry.target as Element);
            if (i !== -1) setActive(i);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    cards.forEach((card) => observer.observe(card));

    return () => { ctx.revert(); observer.disconnect(); };
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-24" style={{ overflow: "clip" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Desktop: scrolling left column + sticky right panel that matches active card height */}
        <div className="hidden md:flex gap-24 items-start">

          {/* Left: scrolling feature cards */}
          <div className="w-[400px] shrink-0 flex flex-col gap-24">
            {features.map((feat, i) => (
              <div
                key={i}
                className="fs-card flex flex-col gap-8 pt-8"
                style={{
                  borderTop: `4px solid ${active === i ? "#FF504E" : "#373A41"}`,
                  opacity: active === i ? 1 : 0.4,
                  transition: "border-color 0.3s ease, opacity 0.3s ease",
                }}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[30px] font-semibold leading-[38px] text-[#F7F7F7]">{feat.name}</h2>
                    <p className="text-base font-semibold text-[#CECFD2]">{feat.tagline}</p>
                  </div>
                  <p className="text-lg font-normal text-[#94979C] leading-7">{feat.body}</p>
                </div>
                <ul className="flex flex-col gap-5 pl-4">
                  {feat.checks.map((check, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-lg font-normal text-[#94979C] leading-7">{check}</span>
                    </li>
                  ))}
                </ul>
                <a href={`/features/${feat.slug}`} className="inline-flex items-center gap-1.5 text-base font-semibold text-[#CECFD2] hover:text-white transition-colors">
                  {feat.cta}
                  <ArrowIcon />
                </a>
              </div>
            ))}
          </div>

          {/* Right: sticky, height tracks active left card, crossfades panel content */}
          <div className="flex-1 sticky" style={{ top: "calc(50vh - 300px)" }}>
            <div
              ref={stickyRef}
              className="relative rounded-2xl overflow-hidden flex items-center justify-center p-8"
              style={{ height: "600px" }}
            >
              <div className="absolute inset-0 dot-grid pointer-events-none" />
              <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "3/2" }}>
                {PANELS.map((Panel, i) => (
                  <div
                    key={i}
                    ref={(el) => { panelRefs.current[i] = el; }}
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <Panel />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-12 px-6">
          {features.map((feat, i) => {
            const Panel = PANELS[i];
            return (
              <div key={i} className="fs-card flex flex-col gap-6">
                <div className="flex flex-col gap-5 pt-5" style={{ borderTop: "4px solid #FF504E" }}>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] font-bold leading-[32px] text-[#F7F7F7]">{feat.name}</h2>
                    <p className="text-sm font-semibold text-[#CECFD2]">{feat.tagline}</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "3/2", border: "2px solid #373A41", background: "#0C0E12" }}>
                  <div className="absolute inset-0 dot-grid pointer-events-none" />
                  <div className="absolute inset-0">
                    <Panel />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-normal text-[#94979C] leading-7">{feat.body}</p>
                  <ul className="flex flex-col gap-4 pl-4">
                    {feat.checks.map((check, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-base font-normal text-[#94979C] leading-7">{check}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`/features/${feat.slug}`} className="inline-flex items-center gap-1.5 text-base font-semibold text-[#CECFD2] hover:text-white transition-colors">
                    {feat.cta} <ArrowIcon />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
