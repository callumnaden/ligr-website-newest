"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function AIGraphicsAnimPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [gfxLive, setGfxLive] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [p1Score, setP1Score] = useState(4);
  const [scoreFlash, setScoreFlash] = useState(false);
  const [selectedEl, setSelectedEl] = useState("player-name");
  const [elSelected, setElSelected] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const ctx = gsap.context(() => {
      const loop = () => {
        // Reset
        setGfxLive(false);
        setOverlayVisible(false);
        setP1Score(4);
        setScoreFlash(false);
        setSelectedEl("player-name");
        setElSelected(false);

        const tl = gsap.timeline({ onComplete: () => setTimeout(loop, 600) });

        // Start — cursor hidden near GFX button
        tl.set(cursor, { left: "28%", top: "30%", opacity: 0, scale: 1 });
        tl.to(cursor, { opacity: 1, duration: 0.3 });
        tl.to({}, { duration: 0.8 });

        // Move to GFX OUT button
        tl.to(cursor, { left: "10%", top: "30%", duration: 0.7, ease: "power2.inOut" });
        tl.to({}, { duration: 0.4 });

        // Click GFX OUT → GFX IN
        tl.to(cursor, { scale: 0.82, duration: 0.1 });
        tl.to(cursor, { scale: 1, duration: 0.12 });
        tl.call(() => { setGfxLive(true); setOverlayVisible(true); });
        tl.to({}, { duration: 1.0 });

        // Move cursor to canvas score area
        tl.to(cursor, { left: "52%", top: "68%", duration: 0.9, ease: "power2.inOut" });
        tl.to({}, { duration: 0.4 });

        // Score update flash
        tl.call(() => setScoreFlash(true));
        tl.to({}, { duration: 0.25 });
        tl.call(() => setP1Score(5));
        tl.to({}, { duration: 0.35 });
        tl.call(() => setScoreFlash(false));
        tl.to({}, { duration: 0.7 });

        // Move cursor to player name element on overlay
        tl.to(cursor, { left: "27%", top: "73%", duration: 0.65, ease: "power2.inOut" });
        tl.to(cursor, { scale: 0.82, duration: 0.1 });
        tl.to(cursor, { scale: 1, duration: 0.12 });
        tl.call(() => { setSelectedEl("score-value"); setElSelected(true); });
        tl.to({}, { duration: 1.6 });

        // Move cursor to right panel
        tl.to(cursor, { left: "78%", top: "48%", duration: 0.8, ease: "power2.inOut" });
        tl.to({}, { duration: 0.9 });

        // Fade out
        tl.to(cursor, { opacity: 0, duration: 0.4 });
        tl.to({}, { duration: 0.3 });
      };

      loop();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: "#0c111d", fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* ── Left sidebar ── */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "7%",
        background: "#0c111d", borderRight: "1px solid #1f242f",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "4%", gap: "4%",
      }}>
        {/* LIGR logo glyph */}
        <div style={{
          width: "55%", aspectRatio: "1", background: "#d92d20",
          borderRadius: "20%", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg viewBox="0 0 14 14" fill="none" style={{ width: "70%", height: "70%" }}>
            <path d="M3 3h2.5v8H3V3zm4.5 0h3L8 11H5.5l3-8z" fill="white" />
          </svg>
        </div>
        {/* Nav icons */}
        {[false, false, false, true, false, false, false].map((active, i) => (
          <div key={i} style={{
            width: "55%", aspectRatio: "1",
            background: active ? "#1f242f" : "transparent",
            borderRadius: "16%",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg viewBox="0 0 16 16" fill="none" style={{ width: "65%", height: "65%" }}>
              {i === 0 && <><rect x="2" y="2" width="5" height="5" rx="1" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" /><rect x="9" y="2" width="5" height="5" rx="1" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" /><rect x="2" y="9" width="5" height="5" rx="1" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" /><rect x="9" y="9" width="5" height="5" rx="1" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" /></>}
              {i === 1 && <><path d="M2 4h12M2 8h12M2 12h8" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" strokeLinecap="round" /></>}
              {i === 2 && <><rect x="2" y="3" width="12" height="10" rx="1.5" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" /><path d="M6 7l3 2V5l-3 2z" fill={active ? "#fff" : "#4e5462"} /></>}
              {i === 3 && <><circle cx="8" cy="8" r="4" stroke="#fff" strokeWidth="1.2" /><path d="M12 12l2 2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" /></>}
              {i === 4 && <path d="M2 12c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" strokeLinecap="round" />}
              {i === 5 && <><circle cx="8" cy="8" r="5" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" /><path d="M8 5v3l2 2" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" strokeLinecap="round" /></>}
              {i === 6 && <path d="M2 8l4-4 4 4 4-4" stroke={active ? "#fff" : "#4e5462"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
          </div>
        ))}
      </div>

      {/* ── Top navigation bar ── */}
      <div style={{
        position: "absolute", left: "7%", right: "27%", top: 0, height: "9%",
        background: "#fff", borderBottom: "1px solid #eaecf0",
        display: "flex", alignItems: "center", padding: "0 3%", gap: 6,
        fontSize: "clamp(7px, 1.3vw, 11px)", color: "#475467",
      }}>
        <span style={{ fontSize: "clamp(7px, 1.3vw, 11px)" }}>🎨</span>
        <span>Themes</span>
        <span style={{ color: "#d0d5dd" }}>›</span>
        <span>Theme Management</span>
        <span style={{ color: "#d0d5dd" }}>›</span>
        <span style={{ color: "#344054", fontWeight: 600 }}>Tennis Graphics</span>
      </div>

      {/* ── Main content (below nav) ── */}
      <div style={{
        position: "absolute", left: "7%", right: "27%", top: "9%", bottom: 0,
        background: "#f9fafb", display: "flex", flexDirection: "column",
      }}>
        {/* Page header */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #eaecf0",
          padding: "2.5% 4%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 22, height: 22, border: "1px solid #d0d5dd", borderRadius: 5,
              display: "flex", alignItems: "center", justifyContent: "center", background: "#fff",
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M7 2L3 5.5 7 9" stroke="#344054" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{
              fontSize: "clamp(8px, 1.8vw, 13px)", fontWeight: 800, color: "#101828",
              fontStyle: "italic", textTransform: "uppercase", letterSpacing: "0.02em",
            }}>
              GRAPHIC NAME EXAMPLE
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{
              padding: "3px 8px", border: "1px solid #d0d5dd", borderRadius: 6,
              fontSize: "clamp(6px, 1.2vw, 9px)", fontWeight: 600, color: "#344054", background: "#fff",
            }}>CANCEL</div>
            <div style={{
              padding: "3px 8px", background: "#d92d20", border: "1px solid #d92d20", borderRadius: 6,
              fontSize: "clamp(6px, 1.2vw, 9px)", fontWeight: 600, color: "#fff",
            }}>SAVE CHANGES</div>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #eaecf0",
          padding: "1.8% 4%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* GFX button */}
            <div style={{
              padding: "3px 8px", borderRadius: 6, fontSize: "clamp(6px, 1.2vw, 9px)", fontWeight: 600,
              border: gfxLive ? "1px solid #6ce9a6" : "1px solid #fda29b",
              color: gfxLive ? "#027a48" : "#b42318",
              background: gfxLive ? "#d1fadf" : "#fff",
              display: "flex", alignItems: "center", gap: 4,
              transition: "all 0.3s ease",
            }}>
              {gfxLive
                ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm3-1.5 2.5 1.5L4 6.5V3.5z" fill="#027a48" /></svg>
                : <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5h1.5V2h3v1.5H8a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" stroke="#b42318" strokeWidth="0.9" fill="none" /></svg>
              }
              {gfxLive ? "GFX IN" : "GFX OUT"}
            </div>
            <div style={{
              width: 24, height: 24, border: "1px solid #d0d5dd", borderRadius: 5,
              display: "flex", alignItems: "center", justifyContent: "center", background: "#fff",
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M9 5.5A3.5 3.5 0 1 1 5.5 2" stroke="#667085" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M5.5 2l1.5-1.5M5.5 2l1.5 1.5" stroke="#667085" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div style={{ fontSize: "clamp(6px, 1.1vw, 9px)", color: "#101828", fontWeight: 500 }}>
            Selected: <span style={{ color: "#475467" }}>{selectedEl}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "clamp(6px, 1.1vw, 9px)", color: "#344054" }}>
            <span>100%</span>
            <span style={{ color: "#d0d5dd" }}>|</span>
            <span style={{ fontWeight: 700, letterSpacing: "0.03em" }}>VIEW</span>
          </div>
        </div>

        {/* Canvas area */}
        <div style={{ flex: 1, padding: "2% 4%", minHeight: 0 }}>
          <div style={{
            position: "relative", width: "100%", height: "100%",
            borderRadius: 8, overflow: "hidden", border: "1px solid #d0d5dd",
          }}>
            {/* Stadium background */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #060606 0%, #111 25%, #1c1c1c 55%, #0a0a0a 100%)",
            }}>
              {/* Stadium light beams */}
              {[12, 28, 50, 72, 88].map((x, i) => (
                <div key={i} style={{
                  position: "absolute", top: "5%", left: `${x}%`,
                  width: "8%", height: "40%",
                  background: `radial-gradient(ellipse at top, rgba(255,255,220,${0.18 + (i % 2) * 0.08}) 0%, transparent 80%)`,
                  transform: "translateX(-50%)",
                }} />
              ))}
              {/* Court floor hint */}
              <div style={{
                position: "absolute", bottom: "28%", left: "10%", right: "10%",
                height: 1, background: "rgba(255,255,255,0.06)",
              }} />
              <div style={{
                position: "absolute", bottom: "28%", left: "50%", width: 1, height: "15%",
                background: "rgba(255,255,255,0.07)", transform: "translateX(-50%)",
              }} />
            </div>

            {/* Selection highlight on overlay */}
            {elSelected && overlayVisible && (
              <div style={{
                position: "absolute", bottom: "26%", left: "4%", right: "18%",
                height: "10%", border: "1.5px solid #2e90fa", borderRadius: 2,
                pointerEvents: "none", animation: "ai-pulse 1.2s ease-in-out infinite",
                zIndex: 10,
              }} />
            )}

            {/* Lower-third overlay */}
            <div style={{
              position: "absolute", bottom: "4%", left: "4%", right: "18%",
              opacity: overlayVisible ? 1 : 0,
              transform: overlayVisible ? "translateY(0)" : "translateY(110%)",
              transition: "all 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
              zIndex: 5,
            }}>
              {/* QUARTERFINAL badge */}
              <div style={{
                background: "#16b364", color: "#fff",
                fontSize: "clamp(5px, 1vw, 7.5px)", fontWeight: 800,
                padding: "1px 7px", display: "inline-block",
                marginBottom: 2, letterSpacing: "0.07em",
              }}>
                QUARTERFINAL
              </div>

              {/* Title bar */}
              <div style={{ background: "#0d2340", padding: "3px 8px 2px" }}>
                <div style={{
                  color: "#fff", fontSize: "clamp(5.5px, 1.1vw, 8.5px)",
                  fontWeight: 800, letterSpacing: "0.04em",
                }}>
                  AUSTRALIAN CLAY COURT NATIONALS
                </div>
                <div style={{
                  color: "#7fa7c9", fontSize: "clamp(4.5px, 0.9vw, 7px)",
                  letterSpacing: "0.03em",
                }}>
                  TENNIS WORLD CANBERRA
                </div>
              </div>

              {/* Players */}
              <div style={{ background: "#0d2340", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {/* Player 1 */}
                <div style={{
                  display: "flex", alignItems: "center",
                  padding: "2px 8px", gap: 6,
                }}>
                  <div style={{
                    flex: 1, fontSize: "clamp(5.5px, 1.1vw, 8.5px)", color: "#fff", fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <span style={{ color: "#60a5fa", fontSize: "0.8em" }}>●</span>
                    <span>JORDI</span>
                    <span style={{ fontWeight: 400 }}>PEREZ</span>
                    <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.85vw, 7px)" }}>ESP</span>
                  </div>
                  <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.85vw, 7px)" }}>2*</span>
                    {[6, p1Score].map((s, idx) => (
                      <span key={idx} style={{
                        color: idx === 1 && scoreFlash ? "#fbbf24" : "#fff",
                        fontSize: "clamp(5.5px, 1.1vw, 8.5px)", fontWeight: 800,
                        background: idx === 1 && scoreFlash
                          ? "rgba(251,191,36,0.25)"
                          : "rgba(255,255,255,0.1)",
                        padding: "0 4px", borderRadius: 2,
                        transition: "all 0.15s",
                        minWidth: 14, textAlign: "center",
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Player 2 */}
                <div style={{
                  display: "flex", alignItems: "center",
                  padding: "2px 8px", gap: 6,
                }}>
                  <div style={{
                    flex: 1, fontSize: "clamp(5.5px, 1.1vw, 8.5px)", color: "#cbd5e1",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <span style={{ opacity: 0 }}>●</span>
                    <span style={{ fontWeight: 700 }}>JOHN</span>
                    <span>SMITH</span>
                    <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.85vw, 7px)" }}>GBR</span>
                  </div>
                  <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.85vw, 7px)" }}>6*</span>
                    {[4].map((s, idx) => (
                      <span key={idx} style={{
                        color: "#fff", fontSize: "clamp(5.5px, 1.1vw, 8.5px)", fontWeight: 800,
                        background: "rgba(255,255,255,0.1)", padding: "0 4px", borderRadius: 2,
                        minWidth: 14, textAlign: "center",
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Timer */}
                <div style={{
                  display: "flex", justifyContent: "flex-end",
                  padding: "1px 8px 3px",
                }}>
                  <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.8vw, 6.5px)" }}>34&apos; | 22&apos;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — Control Panel ── */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "27%",
        background: "#fff", borderLeft: "1px solid #eaecf0",
        display: "flex", flexDirection: "column",
      }}>
        {/* Panel header */}
        <div style={{ padding: "4% 6% 2%", borderBottom: "1px solid #eaecf0", flexShrink: 0 }}>
          <div style={{ fontSize: "clamp(8px, 1.7vw, 12px)", fontWeight: 600, color: "#101828" }}>Control Panel</div>
          <div style={{ fontSize: "clamp(6px, 1.2vw, 9px)", color: "#475467", marginTop: 2 }}>Configure graphic elements and data</div>
        </div>

        {/* Tabs */}
        <div style={{ padding: "3% 5%", borderBottom: "1px solid #eaecf0", flexShrink: 0 }}>
          <div style={{
            display: "flex", gap: 2, background: "#f9fafb",
            border: "1px solid #eaecf0", borderRadius: 8, padding: 3,
          }}>
            {["Details", "Mapping", "Data", "Live"].map((tab) => (
              <div key={tab} style={{
                flex: 1, textAlign: "center", padding: "3px 0",
                fontSize: "clamp(5px, 1vw, 8px)", fontWeight: tab === "Details" ? 600 : 400,
                color: tab === "Details" ? "#344054" : "#667085",
                background: tab === "Details" ? "#fff" : "transparent",
                borderRadius: 5,
                boxShadow: tab === "Details" ? "0 1px 2px rgba(16,24,40,0.06)" : "none",
              }}>
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Details content */}
        <div style={{ padding: "3% 5% 0", flex: 1, overflow: "hidden" }}>
          <div style={{ fontSize: "clamp(7px, 1.4vw, 11px)", fontWeight: 600, color: "#101828", marginBottom: "5%" }}>Details</div>

          {/* Graphic Name */}
          <div style={{ marginBottom: "5%" }}>
            <div style={{ fontSize: "clamp(5.5px, 1.1vw, 9px)", fontWeight: 500, color: "#344054", marginBottom: "3%" }}>Graphic Name</div>
            <div style={{
              border: "1px solid #d0d5dd", borderRadius: 6, padding: "4px 8px",
              fontSize: "clamp(5.5px, 1.1vw, 9px)", color: "#101828", background: "#fff",
            }}>
              Tennis Lower Third
            </div>
          </div>

          <div style={{ height: 1, background: "#eaecf0", margin: "4% 0" }} />

          {/* Ads */}
          <div style={{ marginTop: "3%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4%" }}>
              <span style={{ fontSize: "clamp(7px, 1.4vw, 11px)", fontWeight: 600, color: "#101828" }}>Ads</span>
              <div style={{
                width: 26, height: 15, background: "#d92d20",
                borderRadius: 8, display: "flex", alignItems: "center",
                justifyContent: "flex-end", padding: "2px 2px",
              }}>
                <div style={{ width: 11, height: 11, background: "#fff", borderRadius: "50%", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
              </div>
            </div>

            {/* Ad Set */}
            <div style={{ marginBottom: "4%" }}>
              <div style={{ fontSize: "clamp(5.5px, 1.1vw, 9px)", color: "#344054", fontWeight: 500, marginBottom: "3%" }}>Ad Set</div>
              <div style={{
                border: "1px solid #d0d5dd", borderRadius: 6, padding: "4px 8px",
                fontSize: "clamp(5.5px, 1.1vw, 9px)", color: "#667085", background: "#fff",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span>Placeholder</span><span>▾</span>
              </div>
            </div>

            {/* Ad Size */}
            <div style={{ marginBottom: "5%" }}>
              <div style={{ fontSize: "clamp(5.5px, 1.1vw, 9px)", color: "#344054", fontWeight: 500, marginBottom: "3%" }}>Ad Size</div>
              <div style={{
                border: "1px solid #d0d5dd", borderRadius: 6, padding: "4px 8px",
                fontSize: "clamp(5.5px, 1.1vw, 9px)", color: "#667085", background: "#fff",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span>None</span><span>▾</span>
              </div>
            </div>

            <div style={{ height: 1, background: "#eaecf0", margin: "4% 0" }} />

            {/* Delete Graphic */}
            <div style={{
              border: "1px solid #fda29b", borderRadius: 6, padding: "5px",
              textAlign: "center", fontSize: "clamp(5.5px, 1.1vw, 9px)",
              fontWeight: 500, color: "#b42318", background: "#fff",
            }}>
              Delete Graphic
            </div>
          </div>
        </div>
      </div>

      {/* ── Cursor ── */}
      <div
        ref={cursorRef}
        style={{ position: "absolute", pointerEvents: "none", zIndex: 100, opacity: 0 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2.5 1.5L2.5 12.5L5.5 9.5L8 14.5L10 13.5L7.5 8.5L12.5 8.5L2.5 1.5Z"
            fill="white" stroke="#1a1a1a" strokeWidth="0.8" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes ai-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
