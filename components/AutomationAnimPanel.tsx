"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────────────────────
   AutomationAnimPanel
   Animated product mockup of the Automation Template editor.
   5-step loop:
     1. Collapsed playlist cards
     2. Expand "Pre Game Playlist" card (cursor clicks chevron)
     3. Click Scorebug row → right panel slides in
     4. Cursor appears at block right-edge → tooltip shows
     5. Block drags wider → tooltip updates → reset
───────────────────────────────────────────────────────────── */

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
      // Initial state
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
        const tl = gsap.timeline({
          onComplete: () => gsap.delayedCall(0.8, play),
        });

        // ── Step 1: show collapsed view ──
        tl.addLabel("step1")
          .set(cursorRef.current, { x: 42, y: 146 })
          .to({}, { duration: 1.2 }); // pause

        // ── Step 2: cursor appears, clicks chevron to expand card ──
        tl.addLabel("step2")
          .to(cursorRef.current, { opacity: 1, duration: 0.25 })
          .to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: "power2.in" })
          .to(cursorRef.current, { scale: 1, duration: 0.1, ease: "power2.out" })
          .to(tlBodyRef.current, { height: 182, duration: 0.5, ease: "power3.out" })
          .to({}, { duration: 0.8 }) // pause on expanded view
          .to(cursorRef.current, { opacity: 0, duration: 0.2 });

        // ── Step 3: cursor appears at scorebug row, clicks ──
        tl.addLabel("step3")
          .set(cursorRef.current, { x: 220, y: 216 })
          .to(cursorRef.current, { opacity: 1, duration: 0.25 })
          .to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: "power2.in" })
          .to(cursorRef.current, { scale: 1, duration: 0.1, ease: "power2.out" })
          .call(() => {
            if (scoreRowRef.current) scoreRowRef.current.style.backgroundColor = "#eff8ff";
            if (scoreBlockRef.current) scoreBlockRef.current.style.outline = "1.5px solid #2e90fa";
          })
          .to(rightPanelRef.current, { x: "0%", duration: 0.4, ease: "power3.out" })
          .to({}, { duration: 0.9 }) // pause on step 3
          .to(cursorRef.current, { opacity: 0, duration: 0.2 });

        // ── Step 4: cursor at right edge of block, tooltip appears ──
        tl.addLabel("step4")
          .set(cursorRef.current, { x: 293, y: 210 })
          .to(cursorRef.current, { opacity: 1, duration: 0.25 })
          .to(tooltipRef.current, { opacity: 1, duration: 0.2 })
          .to({}, { duration: 0.5 }); // pause

        // ── Step 5: block expands, cursor follows, tooltip updates ──
        tl.addLabel("step5")
          .to(scoreBlockRef.current, { width: 212, duration: 0.8, ease: "power1.inOut" })
          .to(cursorRef.current, { x: 377, duration: 0.8, ease: "power1.inOut" }, "<")
          .call(() => {
            if (tooltipTextRef.current) tooltipTextRef.current.textContent = "30 secs  00:00 - 00:30";
          }, [], "-=0.4")
          .to({}, { duration: 1.5 }) // pause on final state

        // ── Reset ──
        resetAll(tl);
      };

      gsap.delayedCall(0.5, play);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        background: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#101828",
        fontSize: 12,
      }}
      className="relative w-full h-full overflow-hidden select-none"
    >
      {/* ── Top nav bar ── */}
      <div style={{
        height: 40,
        borderBottom: "1px solid #eaecf0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        background: "#fff",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#101828" }}>
          AUTOMATION TEMPLATE
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{
            fontSize: 10, fontWeight: 600, padding: "3px 10px",
            border: "1px solid #d0d5dd", borderRadius: 6, background: "#fff", color: "#344054",
          }}>Cancel</button>
          <button style={{
            fontSize: 10, fontWeight: 600, padding: "3px 10px",
            border: "none", borderRadius: 6, background: "#FF504E", color: "#fff",
          }}>Save</button>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{
        height: 36,
        borderBottom: "1px solid #eaecf0",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 0,
        background: "#fff",
        flexShrink: 0,
      }}>
        {[
          { label: "Pre / Post Match & Breaks", active: true },
          { label: "In Game (Live)", active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{
            padding: "0 12px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            fontSize: 10,
            fontWeight: active ? 600 : 400,
            color: active ? "#FF504E" : "#667085",
            borderBottom: active ? "2px solid #FF504E" : "2px solid transparent",
            cursor: "default",
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* ── Main area ── */}
      <div style={{
        height: "calc(100% - 76px)",
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* ── Left: playlist list ── */}
        <div style={{
          flex: 1,
          overflow: "hidden",
          padding: "0 0",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Section header */}
          <div style={{
            height: 40,
            borderBottom: "1px solid #eaecf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: "#667085" }}>
              PRE / POST MATCH &amp; BREAKS
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {["Search", "Filter", "Create Playlist"].map((btn) => (
                <button key={btn} style={{
                  fontSize: 9, fontWeight: 500, padding: "2px 7px",
                  border: "1px solid #d0d5dd", borderRadius: 5, background: "#fff", color: "#344054",
                }}>
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* ── Card 1: Pre Game Playlist (expandable) ── */}
          <div style={{ borderBottom: "1px solid #eaecf0" }}>
            {/* Card header */}
            <div style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 8,
              cursor: "default",
            }}>
              {/* Chevron */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 4l4 3-4 3" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#101828" }}>Pre Game Playlist</span>
              <span style={{
                marginLeft: "auto",
                fontSize: 9, fontWeight: 500, color: "#667085",
                border: "1px solid #eaecf0", borderRadius: 4, padding: "1px 5px",
              }}>4 items</span>
            </div>

            {/* Timeline body (animated height) */}
            <div ref={tlBodyRef} style={{ overflow: "hidden" }}>
              {/* Ruler */}
              <div style={{
                height: 26,
                borderBottom: "1px solid #eaecf0",
                display: "flex",
                alignItems: "center",
                background: "#f9fafb",
                paddingLeft: 148 + 16,
              }}>
                {Array.from({ length: 9 }, (_, i) => i * 15).map((sec) => (
                  <div key={sec} style={{
                    position: "relative",
                    width: sec === 0 ? 0 : 64,
                    flexShrink: 0,
                    fontSize: 8,
                    color: "#9ca3af",
                  }}>
                    <span style={{ position: "absolute", left: sec === 0 ? 0 : -10 }}>
                      {sec === 0 ? "0s" : `${sec}s`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Scorebug row */}
              <div
                ref={scoreRowRef}
                style={{
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #eaecf0",
                  transition: "background-color 0.2s",
                }}
              >
                {/* Label */}
                <div style={{
                  width: 148,
                  paddingLeft: 16,
                  flexShrink: 0,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#344054",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  Scorebug
                </div>
                {/* Track */}
                <div style={{ flex: 1, position: "relative", height: "100%", overflow: "visible" }}>
                  <div style={{ position: "absolute", inset: "7px 0", paddingLeft: 4 }}>
                    {/* Scorebug block */}
                    <div
                      ref={scoreBlockRef}
                      style={{
                        width: 128,
                        height: "100%",
                        background: "#eff8ff",
                        border: "1px solid #b2ddff",
                        borderRadius: 5,
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 6,
                        fontSize: 9,
                        fontWeight: 600,
                        color: "#1570ef",
                        overflow: "hidden",
                        position: "relative",
                        cursor: "default",
                      }}
                    >
                      SCOREBUG
                      {/* Right resize handle */}
                      <div style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 6,
                        cursor: "ew-resize",
                        background: "rgba(46,144,250,0.15)",
                        borderRadius: "0 4px 4px 0",
                      }} />
                    </div>
                    {/* Tooltip */}
                    <div
                      ref={tooltipRef}
                      style={{
                        position: "absolute",
                        top: -26,
                        left: 120,
                        background: "#101828",
                        color: "#fff",
                        fontSize: 9,
                        fontWeight: 500,
                        padding: "3px 7px",
                        borderRadius: 4,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      <span ref={tooltipTextRef}>17 secs  00:00 - 00:17</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multimedia row */}
              <div style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eaecf0",
              }}>
                <div style={{
                  width: 148, paddingLeft: 16, flexShrink: 0,
                  fontSize: 10, fontWeight: 500, color: "#667085",
                }}>
                  Multimedia
                </div>
                <div style={{ flex: 1, position: "relative", height: "100%" }}>
                  <div style={{ position: "absolute", inset: "7px 0", paddingLeft: 4 }}>
                    <div style={{
                      width: 200, height: "100%",
                      background: "#fef3f2", border: "1px solid #fecdca",
                      borderRadius: 5, display: "flex", alignItems: "center",
                      paddingLeft: 6, fontSize: 9, fontWeight: 600, color: "#b42318",
                    }}>
                      NOVEMBER GOAL HIGHLIGHTS
                    </div>
                  </div>
                </div>
              </div>

              {/* Multimedia Audio row */}
              <div style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eaecf0",
              }}>
                <div style={{
                  width: 148, paddingLeft: 16, flexShrink: 0,
                  fontSize: 10, fontWeight: 500, color: "#667085",
                }}>
                  Multimedia Audio
                </div>
                <div style={{ flex: 1, position: "relative", height: "100%" }}>
                  <div style={{ position: "absolute", inset: "7px 0", paddingLeft: 4 }}>
                    <div style={{
                      width: 200, height: "100%",
                      background: "#fef3f2", border: "1px solid #fecdca",
                      borderRadius: 5, display: "flex", alignItems: "center",
                      paddingLeft: 6, fontSize: 9, fontWeight: 600, color: "#b42318",
                    }}>
                      NOVEMBER GOAL HIGHLIGHTS
                    </div>
                  </div>
                </div>
              </div>

              {/* Add item row */}
              <div style={{
                height: 30,
                display: "flex",
                alignItems: "center",
                paddingLeft: 16,
              }}>
                <button style={{
                  fontSize: 9, fontWeight: 600, color: "#667085",
                  border: "none", background: "none", display: "flex", alignItems: "center", gap: 4,
                }}>
                  <span style={{ fontSize: 14, lineHeight: 1 }}>+</span> Add item
                </button>
              </div>
            </div>
          </div>

          {/* ── Card 2: Pre Game Players Entering (collapsed) ── */}
          <div style={{ borderBottom: "1px solid #eaecf0" }}>
            <div style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 4l4 3-4 3" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#101828" }}>Pre Game Players Entering</span>
              <span style={{
                marginLeft: "auto",
                fontSize: 9, fontWeight: 500, color: "#667085",
                border: "1px solid #eaecf0", borderRadius: 4, padding: "1px 5px",
              }}>2 items</span>
            </div>
          </div>

          {/* ── Card 3: Post Game (collapsed) ── */}
          <div style={{ borderBottom: "1px solid #eaecf0" }}>
            <div style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 4l4 3-4 3" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#101828" }}>Post Game</span>
              <span style={{
                marginLeft: "auto",
                fontSize: 9, fontWeight: 500, color: "#667085",
                border: "1px solid #eaecf0", borderRadius: 4, padding: "1px 5px",
              }}>3 items</span>
            </div>
          </div>
        </div>

        {/* ── Right panel (slides in) ── */}
        <div
          ref={rightPanelRef}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 220,
            background: "#fff",
            borderLeft: "1px solid #eaecf0",
            display: "flex",
            flexDirection: "column",
            zIndex: 20,
            overflow: "hidden",
          }}
        >
          {/* Panel header */}
          <div style={{
            height: 40,
            borderBottom: "1px solid #eaecf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#101828" }}>
              SCOREBUG
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Panel body */}
          <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Graphic Name */}
            <div>
              <label style={{ fontSize: 9, fontWeight: 600, color: "#667085", display: "block", marginBottom: 3 }}>
                Graphic Name
              </label>
              <div style={{
                height: 28, border: "1px solid #d0d5dd", borderRadius: 6,
                display: "flex", alignItems: "center", paddingLeft: 8,
                fontSize: 10, color: "#344054", background: "#fff",
              }}>
                Scorebug Default
              </div>
            </div>

            {/* Duration */}
            <div>
              <label style={{ fontSize: 9, fontWeight: 600, color: "#667085", display: "block", marginBottom: 3 }}>
                Duration
              </label>
              <div style={{
                height: 28, border: "1px solid #d0d5dd", borderRadius: 6,
                display: "flex", alignItems: "center", paddingLeft: 8,
                fontSize: 10, color: "#344054", background: "#fff",
              }}>
                17s
              </div>
            </div>

            {/* Start Time */}
            <div>
              <label style={{ fontSize: 9, fontWeight: 600, color: "#667085", display: "block", marginBottom: 3 }}>
                Start Time
              </label>
              <div style={{
                height: 28, border: "1px solid #d0d5dd", borderRadius: 6,
                display: "flex", alignItems: "center", paddingLeft: 8,
                fontSize: 10, color: "#344054", background: "#fff",
              }}>
                00:00
              </div>
            </div>

            {/* Loop toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ fontSize: 9, fontWeight: 600, color: "#667085" }}>Loop</label>
              <div style={{
                width: 32, height: 18, borderRadius: 9, background: "#FF504E",
                display: "flex", alignItems: "center", paddingRight: 2,
                justifyContent: "flex-end",
              }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff" }} />
              </div>
            </div>
          </div>

          {/* Panel footer */}
          <div style={{
            borderTop: "1px solid #eaecf0",
            padding: "8px 12px",
            display: "flex",
            gap: 6,
            flexShrink: 0,
          }}>
            <button style={{
              flex: 1, fontSize: 10, fontWeight: 600, padding: "5px 0",
              border: "1px solid #d0d5dd", borderRadius: 6, background: "#fff", color: "#344054",
            }}>
              Cancel
            </button>
            <button style={{
              flex: 1, fontSize: 10, fontWeight: 600, padding: "5px 0",
              border: "none", borderRadius: 6, background: "#FF504E", color: "#fff",
            }}>
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* ── Animated cursor ── */}
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 50,
          pointerEvents: "none",
          transformOrigin: "top left",
        }}
      >
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path
            d="M1 1l6.5 16.5 3-5.5 6 1.5L1 1z"
            fill="#101828"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
