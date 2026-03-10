"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const BG = "#0c111d";
const BG_PANEL = "#13161e";
const BORDER = "#1f242f";
const BORDER2 = "#333741";
const TEXT1 = "#f5f5f6";
const TEXT2 = "#cecfd2";
const TEXT3 = "#94969c";
const RED = "#FF504E";

const COMPONENTS = ["Score Bug", "Lower Third", "Ticker", "Clock", "Logo Bug", "Full Screen"];

export default function FuseAnimPanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeComponent, setActiveComponent] = useState(-1);
  const [dragging, setDragging] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [selected, setSelected] = useState(false);
  const [score, setScore] = useState(26);
  const [scoreFlash, setScoreFlash] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cursorRef.current, { opacity: 0, x: 50, y: 80 });

      const play = () => {
        const tl = gsap.timeline({ onComplete: () => { gsap.delayedCall(0.8, play); } });

        // Reset
        tl.call(() => {
          setActiveComponent(-1);
          setDragging(false);
          setPlaced(false);
          setSelected(false);
          setScore(26);
          setScoreFlash(false);
        });
        tl.to({}, { duration: 0.8 });

        // Cursor appears, hovers over "Score Bug" in sidebar
        tl.to(cursorRef.current, { opacity: 1, duration: 0.2 });
        tl.to(cursorRef.current, { x: 28, y: 78, duration: 0.5, ease: "power2.inOut" });
        tl.to({}, { duration: 0.35 });

        // Click → highlight component
        tl.to(cursorRef.current, { scale: 0.82, duration: 0.1 });
        tl.to(cursorRef.current, { scale: 1, duration: 0.12 });
        tl.call(() => setActiveComponent(0));
        tl.to({}, { duration: 0.3 });

        // Drag to canvas
        tl.call(() => setDragging(true));
        tl.to(cursorRef.current, { x: 190, y: 135, duration: 0.65, ease: "power2.inOut" });

        // Drop
        tl.to(cursorRef.current, { scale: 0.82, duration: 0.1 });
        tl.to(cursorRef.current, { scale: 1, duration: 0.12 });
        tl.call(() => { setDragging(false); setPlaced(true); });
        tl.to({}, { duration: 0.4 });

        // Click to select
        tl.to(cursorRef.current, { scale: 0.82, duration: 0.1 });
        tl.to(cursorRef.current, { scale: 1, duration: 0.12 });
        tl.call(() => setSelected(true));
        tl.to({}, { duration: 0.9 });

        // Cursor moves over score → live data update
        tl.to(cursorRef.current, { x: 215, y: 155, duration: 0.45, ease: "power2.inOut" });
        tl.call(() => setScoreFlash(true));
        tl.to({}, { duration: 0.2 });
        tl.call(() => { setScore(27); });
        tl.to({}, { duration: 0.35 });
        tl.call(() => setScoreFlash(false));
        tl.to({}, { duration: 1.0 });

        // Fade out
        tl.to(cursorRef.current, { opacity: 0, duration: 0.4 });
        tl.to({}, { duration: 0.3 });
      };

      gsap.delayedCall(0.4, play);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      style={{ background: BG, fontFamily: "system-ui,-apple-system,sans-serif", color: TEXT1, fontSize: 11 }}
      className="relative w-full h-full overflow-hidden select-none flex flex-col"
    >
      {/* ── Header ── */}
      <div style={{ height: 36, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", background: BG_PANEL, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="white" />
            <path d="M8 7l4 5-4 5M12 17h4" stroke="#0c111d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 800, color: TEXT1, letterSpacing: "0.08em", fontStyle: "italic" }}>FUSE</span>
          <span style={{ fontSize: 9, color: BORDER2, margin: "0 4px" }}>|</span>
          <span style={{ fontSize: 9, color: TEXT3 }}>NBA_Scorebug_v2.fuse</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ fontSize: 8, background: "#22262F", color: TEXT3, padding: "2px 8px", borderRadius: 4 }}>Preview</div>
          <div style={{ fontSize: 8, background: RED, color: "white", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>Publish</div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left: component library */}
        <div style={{ width: "19%", borderRight: `1px solid ${BORDER}`, background: BG_PANEL, display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "7px 10px 5px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ fontSize: 7, color: TEXT3, textTransform: "uppercase", letterSpacing: 1 }}>Components</div>
          </div>
          <div style={{ flex: 1, padding: "5px 6px", display: "flex", flexDirection: "column", gap: 2 }}>
            {COMPONENTS.map((c, i) => (
              <div
                key={i}
                style={{
                  fontSize: 8, padding: "4px 8px", borderRadius: 4, cursor: "default",
                  background: activeComponent === i ? "rgba(255,80,78,0.15)" : "transparent",
                  border: `1px solid ${activeComponent === i ? "rgba(255,80,78,0.3)" : "transparent"}`,
                  color: activeComponent === i ? RED : TEXT3,
                  transition: "all 0.2s",
                }}
              >{c}</div>
            ))}
          </div>
        </div>

        {/* Main: canvas */}
        <div style={{ flex: 1, background: "#0C0E12", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

          {/* Empty state hint */}
          {!placed && !dragging && (
            <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: BORDER2, fontSize: 9 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 6px" }}>
                <rect x="3" y="3" width="18" height="18" rx="3" stroke={BORDER2} strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M12 8v8M8 12h8" stroke={BORDER2} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Drag components here
            </div>
          )}

          {/* Drag ghost */}
          {dragging && (
            <div style={{ position: "absolute", top: "28%", left: "36%", background: "rgba(255,80,78,0.2)", border: `1.5px dashed ${RED}`, borderRadius: 6, padding: "8px 14px", fontSize: 9, color: RED, pointerEvents: "none", zIndex: 10 }}>
              Score Bug
            </div>
          )}

          {/* Placed score bug */}
          {placed && (
            <div style={{ position: "relative", zIndex: 10 }}>
              <div style={{
                background: RED, borderRadius: 6, padding: "8px 14px",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: selected ? `0 0 0 1.5px ${RED}, 0 8px 24px rgba(0,0,0,0.5)` : "0 8px 24px rgba(0,0,0,0.5)",
                transition: "box-shadow 0.2s",
              }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <div style={{ fontSize: 7, color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Lakers</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: scoreFlash ? "#FEBC2E" : "white", lineHeight: 1, transition: "color 0.15s" }}>{score}</div>
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
              {selected && (
                <div style={{ position: "absolute", inset: -5, border: `1.5px dashed ${RED}`, borderRadius: 9, pointerEvents: "none" }}>
                  {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([x, y], i) => (
                    <div key={i} style={{ position: "absolute", width: 6, height: 6, background: "white", border: `1.5px solid ${RED}`, borderRadius: 2, top: y < 0 ? -4 : "auto", bottom: y > 0 ? -4 : "auto", left: x < 0 ? -4 : "auto", right: x > 0 ? -4 : "auto" }} />
                  ))}
                </div>
              )}

              {/* Live data badge */}
              {selected && (
                <div style={{ position: "absolute", top: -22, right: 0, fontSize: 7, color: "#28C840", fontWeight: 600, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 3 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#28C840" }} />
                  Live data connected
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: properties panel */}
        <div style={{ width: "22%", borderLeft: `1px solid ${BORDER}`, background: BG_PANEL, display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "7px 10px 5px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ fontSize: 7, color: TEXT3, textTransform: "uppercase", letterSpacing: 1 }}>Properties</div>
          </div>
          {selected ? (
            <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
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
                    <div style={{ fontSize: 8, color: TEXT2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "auto", fontSize: 8, background: "rgba(255,80,78,0.1)", border: "1px solid rgba(255,80,78,0.25)", borderRadius: 4, padding: "5px 8px", color: "#FF8A65", textAlign: "center" }}>
                ✦ AI-generated template
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
              <div style={{ fontSize: 8, color: BORDER2, textAlign: "center", lineHeight: 1.5 }}>Select a component<br />to edit properties</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Cursor ── */}
      <div ref={cursorRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 50, pointerEvents: "none", transformOrigin: "top left" }}>
        <svg width="14" height="16" viewBox="0 0 18 20" fill="none">
          <path d="M1 1l6.5 16.5 3-5.5 6 1.5L1 1z" fill={TEXT1} stroke={BG} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
