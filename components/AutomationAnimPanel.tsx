"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────────────────────
   AutomationAnimPanel — dark theme
   5-step loop:
     1. Collapsed playlist cards
     2. Expand "Pre Game Playlist" card (cursor clicks chevron)
     3. Click Scorebug row → right panel slides in
     4. Cursor at block right-edge → tooltip shows
     5. Block drags wider → tooltip updates → reset
───────────────────────────────────────────────────────────── */

const BG = "#13161B";
const BG_PANEL = "#1A1D26";
const BG_CANVAS = "#0C0E12";
const BORDER = "#22262F";
const BORDER2 = "#373A41";
const TEXT1 = "#F7F7F7";
const TEXT2 = "#CECFD2";
const TEXT3 = "#94979C";
const RED = "#FF504E";

export default function AutomationAnimPanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlBodyRef = useRef<HTMLDivElement>(null);
  const scoreRowRef = useRef<HTMLDivElement>(null);
  const scoreBlockRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(tlBodyRef.current, { height: 0, overflow: "hidden" });
      gsap.set(rightPanelRef.current, { x: "100%" });
      gsap.set(tooltipRef.current, { opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0, x: 42, y: 146 });

      const resetAll = (tl: gsap.core.Timeline) => {
        tl.to(cursorRef.current, { opacity: 0, duration: 0.2 }, "+=0")
          .to(tooltipRef.current, { opacity: 0, duration: 0.2 }, "<")
          .to(rightPanelRef.current, { x: "100%", duration: 0.3, ease: "power2.in" }, "<")
          .call(() => {
            if (scoreRowRef.current) scoreRowRef.current.style.backgroundColor = "";
            if (scoreBlockRef.current) {
              scoreBlockRef.current.style.outline = "";
              scoreBlockRef.current.style.width = "128px";
            }
            if (tooltipTextRef.current) tooltipTextRef.current.textContent = "17 secs  00:00 - 00:17";
          })
          .to(tlBodyRef.current, { height: 0, duration: 0.4, ease: "power2.in" });
      };

      const play = () => {
        const tl = gsap.timeline({ onComplete: () => { gsap.delayedCall(0.8, play); } });

        tl.addLabel("step1")
          .set(cursorRef.current, { x: 42, y: 146 })
          .to({}, { duration: 1.2 });

        tl.addLabel("step2")
          .to(cursorRef.current, { opacity: 1, duration: 0.25 })
          .to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: "power2.in" })
          .to(cursorRef.current, { scale: 1, duration: 0.1, ease: "power2.out" })
          .to(tlBodyRef.current, { height: 182, duration: 0.5, ease: "power3.out" })
          .to({}, { duration: 0.8 })
          .to(cursorRef.current, { opacity: 0, duration: 0.2 });

        tl.addLabel("step3")
          .set(cursorRef.current, { x: 220, y: 216 })
          .to(cursorRef.current, { opacity: 1, duration: 0.25 })
          .to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: "power2.in" })
          .to(cursorRef.current, { scale: 1, duration: 0.1, ease: "power2.out" })
          .call(() => {
            if (scoreRowRef.current) scoreRowRef.current.style.backgroundColor = "rgba(46,144,250,0.08)";
            if (scoreBlockRef.current) scoreBlockRef.current.style.outline = "1.5px solid #2e90fa";
          })
          .to(rightPanelRef.current, { x: "0%", duration: 0.4, ease: "power3.out" })
          .to({}, { duration: 0.9 })
          .to(cursorRef.current, { opacity: 0, duration: 0.2 });

        tl.addLabel("step4")
          .set(cursorRef.current, { x: 293, y: 210 })
          .to(cursorRef.current, { opacity: 1, duration: 0.25 })
          .to(tooltipRef.current, { opacity: 1, duration: 0.2 })
          .to({}, { duration: 0.5 });

        tl.addLabel("step5")
          .to(scoreBlockRef.current, { width: 212, duration: 0.8, ease: "power1.inOut" })
          .to(cursorRef.current, { x: 377, duration: 0.8, ease: "power1.inOut" }, "<")
          .call(() => {
            if (tooltipTextRef.current) tooltipTextRef.current.textContent = "30 secs  00:00 - 00:30";
          }, [], "-=0.4")
          .to({}, { duration: 1.5 });

        resetAll(tl);
      };

      gsap.delayedCall(0.5, play);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      style={{ background: BG, fontFamily: "system-ui, -apple-system, sans-serif", color: TEXT1, fontSize: 12 }}
      className="relative w-full h-full overflow-hidden select-none"
    >
      {/* ── Top nav bar ── */}
      <div style={{ height: 40, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", background: BG_PANEL, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: TEXT1, marginLeft: 6 }}>
            AUTOMATION TEMPLATE
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", border: `1px solid ${BORDER2}`, borderRadius: 6, background: BG, color: TEXT2 }}>Cancel</button>
          <button style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", border: "none", borderRadius: 6, background: RED, color: "#fff" }}>Save</button>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{ height: 36, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 12px", background: BG_PANEL, flexShrink: 0 }}>
        {[
          { label: "Pre / Post Match & Breaks", active: true },
          { label: "In Game (Live)", active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{ padding: "0 12px", height: "100%", display: "flex", alignItems: "center", fontSize: 10, fontWeight: active ? 600 : 400, color: active ? RED : TEXT3, borderBottom: active ? `2px solid ${RED}` : "2px solid transparent", cursor: "default" }}>
            {label}
          </div>
        ))}
      </div>

      {/* ── Main area ── */}
      <div style={{ height: "calc(100% - 76px)", display: "flex", overflow: "hidden", position: "relative", background: BG }}>
        {/* ── Left: playlist list ── */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Section header */}
          <div style={{ height: 40, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", flexShrink: 0, background: BG_PANEL }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: TEXT3 }}>PRE / POST MATCH &amp; BREAKS</span>
            <div style={{ display: "flex", gap: 4 }}>
              {["Search", "Filter", "Create Playlist"].map((btn) => (
                <button key={btn} style={{ fontSize: 9, fontWeight: 500, padding: "2px 7px", border: `1px solid ${BORDER2}`, borderRadius: 5, background: BG, color: TEXT2 }}>{btn}</button>
              ))}
            </div>
          </div>

          {/* ── Card 1: Pre Game Playlist (expandable) ── */}
          <div style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 12px", gap: 8, cursor: "default", background: BG }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 4l4 3-4 3" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: TEXT1 }}>Pre Game Playlist</span>
              <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 500, color: TEXT3, border: `1px solid ${BORDER2}`, borderRadius: 4, padding: "1px 5px" }}>4 items</span>
            </div>

            {/* Timeline body */}
            <div ref={tlBodyRef} style={{ overflow: "hidden" }}>
              {/* Ruler */}
              <div style={{ height: 26, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", background: BG_CANVAS, paddingLeft: 148 + 16 }}>
                {Array.from({ length: 9 }, (_, i) => i * 15).map((sec) => (
                  <div key={sec} style={{ position: "relative", width: sec === 0 ? 0 : 64, flexShrink: 0, fontSize: 8, color: BORDER2 }}>
                    <span style={{ position: "absolute", left: sec === 0 ? 0 : -10 }}>{sec === 0 ? "0s" : `${sec}s`}</span>
                  </div>
                ))}
              </div>

              {/* Scorebug row */}
              <div ref={scoreRowRef} style={{ height: 44, display: "flex", alignItems: "center", borderBottom: `1px solid ${BORDER}`, transition: "background-color 0.2s", background: BG }}>
                <div style={{ width: 148, paddingLeft: 16, flexShrink: 0, fontSize: 10, fontWeight: 600, color: TEXT2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Scorebug</div>
                <div style={{ flex: 1, position: "relative", height: "100%", overflow: "visible" }}>
                  <div style={{ position: "absolute", inset: "7px 0", paddingLeft: 4 }}>
                    <div ref={scoreBlockRef} style={{ width: 128, height: "100%", background: "rgba(46,144,250,0.1)", border: "1px solid #1849a9", borderRadius: 5, display: "flex", alignItems: "center", paddingLeft: 6, fontSize: 9, fontWeight: 600, color: "#84caff", overflow: "hidden", position: "relative", cursor: "default" }}>
                      SCOREBUG
                      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 6, cursor: "ew-resize", background: "rgba(46,144,250,0.15)", borderRadius: "0 4px 4px 0" }} />
                    </div>
                    <div ref={tooltipRef} style={{ position: "absolute", top: -26, left: 120, background: BG_PANEL, border: `1px solid ${BORDER2}`, color: TEXT1, fontSize: 9, fontWeight: 500, padding: "3px 7px", borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 10 }}>
                      <span ref={tooltipTextRef}>17 secs  00:00 - 00:17</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multimedia row */}
              <div style={{ height: 40, display: "flex", alignItems: "center", borderBottom: `1px solid ${BORDER}`, background: BG }}>
                <div style={{ width: 148, paddingLeft: 16, flexShrink: 0, fontSize: 10, fontWeight: 500, color: TEXT3 }}>Multimedia</div>
                <div style={{ flex: 1, position: "relative", height: "100%" }}>
                  <div style={{ position: "absolute", inset: "7px 0", paddingLeft: 4 }}>
                    <div style={{ width: 200, height: "100%", background: "rgba(255,80,78,0.1)", border: "1px solid rgba(255,80,78,0.3)", borderRadius: 5, display: "flex", alignItems: "center", paddingLeft: 6, fontSize: 9, fontWeight: 600, color: "#FF8A65" }}>
                      NOVEMBER GOAL HIGHLIGHTS
                    </div>
                  </div>
                </div>
              </div>

              {/* Multimedia Audio row */}
              <div style={{ height: 40, display: "flex", alignItems: "center", borderBottom: `1px solid ${BORDER}`, background: BG }}>
                <div style={{ width: 148, paddingLeft: 16, flexShrink: 0, fontSize: 10, fontWeight: 500, color: TEXT3 }}>Multimedia Audio</div>
                <div style={{ flex: 1, position: "relative", height: "100%" }}>
                  <div style={{ position: "absolute", inset: "7px 0", paddingLeft: 4 }}>
                    <div style={{ width: 200, height: "100%", background: "rgba(255,80,78,0.1)", border: "1px solid rgba(255,80,78,0.3)", borderRadius: 5, display: "flex", alignItems: "center", paddingLeft: 6, fontSize: 9, fontWeight: 600, color: "#FF8A65" }}>
                      NOVEMBER GOAL HIGHLIGHTS
                    </div>
                  </div>
                </div>
              </div>

              {/* Add item row */}
              <div style={{ height: 30, display: "flex", alignItems: "center", paddingLeft: 16, background: BG }}>
                <button style={{ fontSize: 9, fontWeight: 600, color: TEXT3, border: "none", background: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 14, lineHeight: 1 }}>+</span> Add item
                </button>
              </div>
            </div>
          </div>

          {/* ── Card 2: Pre Game Players Entering ── */}
          <div style={{ borderBottom: `1px solid ${BORDER}`, background: BG }}>
            <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 4l4 3-4 3" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: TEXT1 }}>Pre Game Players Entering</span>
              <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 500, color: TEXT3, border: `1px solid ${BORDER2}`, borderRadius: 4, padding: "1px 5px" }}>2 items</span>
            </div>
          </div>

          {/* ── Card 3: Post Game ── */}
          <div style={{ borderBottom: `1px solid ${BORDER}`, background: BG }}>
            <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 4l4 3-4 3" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: TEXT1 }}>Post Game</span>
              <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 500, color: TEXT3, border: `1px solid ${BORDER2}`, borderRadius: 4, padding: "1px 5px" }}>3 items</span>
            </div>
          </div>
        </div>

        {/* ── Right panel (slides in) ── */}
        <div ref={rightPanelRef} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 220, background: BG_PANEL, borderLeft: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", zIndex: 20, overflow: "hidden" }}>
          <div style={{ height: 40, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: TEXT1 }}>SCOREBUG</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Graphic Name", value: "Scorebug Default" },
              { label: "Duration", value: "17s" },
              { label: "Start Time", value: "00:00" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label style={{ fontSize: 9, fontWeight: 600, color: TEXT3, display: "block", marginBottom: 3 }}>{label}</label>
                <div style={{ height: 28, border: `1px solid ${BORDER2}`, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 10, color: TEXT2, background: BG }}>{value}</div>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ fontSize: 9, fontWeight: 600, color: TEXT3 }}>Loop</label>
              <div style={{ width: 32, height: 18, borderRadius: 9, background: RED, display: "flex", alignItems: "center", paddingRight: 2, justifyContent: "flex-end" }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff" }} />
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${BORDER}`, padding: "8px 12px", display: "flex", gap: 6, flexShrink: 0 }}>
            <button style={{ flex: 1, fontSize: 10, fontWeight: 600, padding: "5px 0", border: `1px solid ${BORDER2}`, borderRadius: 6, background: BG, color: TEXT2 }}>Cancel</button>
            <button style={{ flex: 1, fontSize: 10, fontWeight: 600, padding: "5px 0", border: "none", borderRadius: 6, background: RED, color: "#fff" }}>Apply</button>
          </div>
        </div>
      </div>

      {/* ── Animated cursor ── */}
      <div ref={cursorRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 50, pointerEvents: "none", transformOrigin: "top left" }}>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path d="M1 1l6.5 16.5 3-5.5 6 1.5L1 1z" fill={TEXT1} stroke={BG} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
