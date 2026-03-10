"use client";
import { useEffect, useState } from "react";

const BG = "#13161B";
const BG_PANEL = "#1A1D26";
const BG_CANVAS = "#0C0E12";
const BORDER = "#22262F";
const BORDER2 = "#373A41";
const TEXT1 = "#F7F7F7";
const TEXT2 = "#CECFD2";
const TEXT3 = "#94979C";
const RED = "#FF504E";
const GREEN = "#28C840";
const YELLOW = "#FEBC2E";
const PURPLE = "#9C88FF";

type LogEntry = { time: string; event: string; action: string; color: string };

const EVENT_POOL: LogEntry[] = [
  { time: "18:42", event: "Goal scored — Home", action: "Score Bug + celebration overlay", color: RED },
  { time: "18:39", event: "Score update received", action: "Scorebug updated automatically", color: GREEN },
  { time: "18:35", event: "Foul — Away player", action: "Foul graphic displayed", color: YELLOW },
  { time: "18:31", event: "Timeout called", action: "Break sequence started", color: YELLOW },
  { time: "18:28", event: "Quarter end detected", action: "Quarter summary generated", color: PURPLE },
  { time: "18:24", event: "Player substitution", action: "Player card queued + displayed", color: GREEN },
  { time: "18:20", event: "Data feed heartbeat", action: "SportsRadar API · 12ms latency", color: BORDER2 },
  { time: "18:17", event: "Goal scored — Away", action: "Score Bug + away team theme", color: RED },
  { time: "18:12", event: "Clock sync", action: "Game clock synced to feed", color: GREEN },
  { time: "18:08", event: "Automation rule fired", action: "Half time sequence triggered", color: PURPLE },
];

const RULES = [
  { trigger: "Goal scored", action: "Score overlay → 8s", status: "armed", color: GREEN },
  { trigger: "Quarter end", action: "Summary graphic → 12s", status: "armed", color: GREEN },
  { trigger: "Player sub", action: "Player card → 6s", status: "armed", color: GREEN },
  { trigger: "Timeout", action: "Break sequence → 30s", status: "armed", color: YELLOW },
];

export default function AutomationAnimPanel() {
  const [log, setLog] = useState<LogEntry[]>(EVENT_POOL.slice(0, 5));
  const [eventsCount, setEventsCount] = useState(47);
  const [matchTime, setMatchTime] = useState(1122); // 18:42 in seconds
  const [activeRule, setActiveRule] = useState(-1);
  const [newEntryKey, setNewEntryKey] = useState(0);
  const poolIndexRef = { current: 5 };

  useEffect(() => {
    // Clock ticks
    const clockTimer = setInterval(() => {
      setMatchTime((t) => t + 1);
    }, 1000);

    // New events fire every ~2.8s
    let ruleFlashTimeout: ReturnType<typeof setTimeout>;
    const eventTimer = setInterval(() => {
      const next = EVENT_POOL[poolIndexRef.current % EVENT_POOL.length];
      poolIndexRef.current++;
      setEventsCount((c) => c + 1);
      setNewEntryKey((k) => k + 1);
      setLog((prev) => [next, ...prev.slice(0, 4)]);

      // Flash the relevant rule
      const ruleIdx = Math.floor(Math.random() * RULES.length);
      setActiveRule(ruleIdx);
      ruleFlashTimeout = setTimeout(() => setActiveRule(-1), 900);
    }, 2800);

    return () => {
      clearInterval(clockTimer);
      clearInterval(eventTimer);
      clearTimeout(ruleFlashTimeout);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60) % 60;
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      style={{ background: BG, fontFamily: "system-ui,-apple-system,sans-serif", color: TEXT1, fontSize: 11 }}
      className="relative w-full h-full overflow-hidden select-none flex flex-col"
    >
      {/* ── Header ── */}
      <div style={{ height: 36, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", background: BG_PANEL, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ fontSize: 9, color: TEXT3, marginLeft: 6 }}>LIGR — Full Automation</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(40,200,64,0.1)", border: "1px solid rgba(40,200,64,0.25)", borderRadius: 4, padding: "2px 8px" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: GREEN }} />
            <span style={{ fontSize: 8, color: GREEN, fontWeight: 700 }}>RUNNING</span>
          </div>
          <span style={{ fontSize: 8, color: TEXT3, fontFamily: "monospace" }}>{formatTime(matchTime)}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left: automation rules */}
        <div style={{ width: "42%", borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "8px 12px 6px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ fontSize: 7, color: TEXT3, textTransform: "uppercase", letterSpacing: 1, marginBottom: 1 }}>Automation Rules</div>
            <div style={{ fontSize: 7, color: BORDER2 }}>Firing automatically — no operator needed</div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            {[
              { label: "Events fired", value: eventsCount },
              { label: "Active rules", value: RULES.length },
              { label: "Errors", value: 0 },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: "6px 10px", borderRight: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEXT1 }}>{s.value}</div>
                <div style={{ fontSize: 7, color: TEXT3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Rules list */}
          <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
            {RULES.map((rule, i) => (
              <div
                key={i}
                style={{
                  background: activeRule === i ? `${rule.color}18` : BG_PANEL,
                  border: `1px solid ${activeRule === i ? rule.color + "50" : BORDER}`,
                  borderRadius: 5, padding: "6px 8px",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: rule.color, flexShrink: 0 }} />
                    <div style={{ fontSize: 8, color: TEXT2, fontWeight: 600 }}>IF: {rule.trigger}</div>
                  </div>
                  <div style={{ fontSize: 7, color: rule.color, background: `${rule.color}15`, padding: "1px 5px", borderRadius: 3, fontWeight: 600 }}>
                    {activeRule === i ? "FIRED" : rule.status.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontSize: 7, color: TEXT3, paddingLeft: 10 }}>→ {rule.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: live event log */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "8px 12px 6px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ fontSize: 7, color: TEXT3, textTransform: "uppercase", letterSpacing: 1 }}>Live Event Log</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: RED }} />
              <span style={{ fontSize: 7, color: RED, fontWeight: 600 }}>Live</span>
            </div>
          </div>

          <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
            {log.map((ev, i) => (
              <div
                key={`${newEntryKey}-${i}`}
                style={{
                  display: "flex", gap: 8, alignItems: "flex-start",
                  padding: "5px 8px", background: BG_PANEL, borderRadius: 4,
                  borderLeft: `2px solid ${ev.color}`,
                  animation: i === 0 ? "autoLogIn 0.4s ease-out" : undefined,
                }}
              >
                <div style={{ fontSize: 7, color: TEXT3, flexShrink: 0, marginTop: 1, fontFamily: "monospace" }}>{ev.time}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 8, color: TEXT2, fontWeight: 600, marginBottom: 1 }}>{ev.event}</div>
                  <div style={{ fontSize: 7, color: TEXT3 }}>→ {ev.action}</div>
                </div>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: i === 0 ? ev.color : BORDER, flexShrink: 0, marginTop: 2, transition: "background 0.3s" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes autoLogIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
