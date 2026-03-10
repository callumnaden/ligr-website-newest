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
  const [elSelected, setElSelected] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const ctx = gsap.context(() => {
      const loop = () => {
        setGfxLive(false);
        setOverlayVisible(false);
        setP1Score(4);
        setScoreFlash(false);
        setElSelected(false);

        const tl = gsap.timeline({ onComplete: () => setTimeout(loop, 600) });

        tl.set(cursor, { left: "30%", top: "12%", opacity: 0, scale: 1 });
        tl.to(cursor, { opacity: 1, duration: 0.3 });
        tl.to({}, { duration: 0.6 });

        // Move to GFX OUT button
        tl.to(cursor, { left: "4%", top: "12%", duration: 0.6, ease: "power2.inOut" });
        tl.to({}, { duration: 0.3 });

        // Click GFX OUT → GFX IN + overlay slides up
        tl.to(cursor, { scale: 0.82, duration: 0.1 });
        tl.to(cursor, { scale: 1, duration: 0.12 });
        tl.call(() => { setGfxLive(true); setOverlayVisible(true); });
        tl.to({}, { duration: 1.2 });

        // Move cursor to score area — score updates
        tl.to(cursor, { left: "55%", top: "78%", duration: 0.8, ease: "power2.inOut" });
        tl.to({}, { duration: 0.3 });
        tl.call(() => setScoreFlash(true));
        tl.to({}, { duration: 0.2 });
        tl.call(() => setP1Score(5));
        tl.to({}, { duration: 0.3 });
        tl.call(() => setScoreFlash(false));
        tl.to({}, { duration: 0.8 });

        // Click player name element → selection box
        tl.to(cursor, { left: "28%", top: "83%", duration: 0.6, ease: "power2.inOut" });
        tl.to(cursor, { scale: 0.82, duration: 0.1 });
        tl.to(cursor, { scale: 1, duration: 0.12 });
        tl.call(() => setElSelected(true));
        tl.to({}, { duration: 1.8 });

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
      style={{ background: "#0c111d", fontFamily: "system-ui,-apple-system,sans-serif" }}
    >
      {/* ── Toolbar strip ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "14%",
        background: "#13161e", borderBottom: "1px solid #1f242f",
        display: "flex", alignItems: "center", padding: "0 3%", gap: "3%", zIndex: 10,
      }}>
        {/* GFX button */}
        <div style={{
          padding: "3px 10px", borderRadius: 6,
          fontSize: "clamp(7px, 1.3vw, 10px)", fontWeight: 700,
          border: gfxLive ? "1px solid #6ce9a6" : "1px solid #fda29b",
          color: gfxLive ? "#027a48" : "#b42318",
          background: gfxLive ? "#d1fadf" : "#1a1212",
          display: "flex", alignItems: "center", gap: 5,
          transition: "all 0.3s ease", whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {gfxLive
            ? <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 5a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm3-1.5 2.5 1.5L4 6.5V3.5z" fill="#027a48" /></svg>
            : <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 3.5h1.5V2h3v1.5H8a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" stroke="#b42318" strokeWidth="0.9" fill="none" /></svg>
          }
          {gfxLive ? "GFX IN" : "GFX OUT"}
        </div>

        <div style={{ width: 1, height: "50%", background: "#1f242f", flexShrink: 0 }} />

        <span style={{ fontSize: "clamp(6px, 1.1vw, 9px)", color: "#94969c" }}>
          Selected: <span style={{ color: "#cecfd2" }}>player-name</span>
        </span>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "2%", fontSize: "clamp(6px, 1vw, 8px)", color: "#94969c" }}>
          <span>100%</span>
          <span style={{ color: "#333741" }}>|</span>
          <span style={{ color: "#cecfd2", fontWeight: 700 }}>VIEW</span>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div style={{ position: "absolute", inset: 0, top: "14%" }}>
        {/* Stadium background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #050505 0%, #0e0e0e 25%, #1a1a1a 55%, #080808 100%)",
        }}>
          {[12, 28, 50, 72, 88].map((x, i) => (
            <div key={i} style={{
              position: "absolute", top: "5%", left: `${x}%`, width: "9%", height: "45%",
              background: `radial-gradient(ellipse at top, rgba(255,255,220,${0.16 + (i % 2) * 0.08}) 0%, transparent 80%)`,
              transform: "translateX(-50%)",
            }} />
          ))}
          <div style={{ position: "absolute", bottom: "30%", left: "10%", right: "10%", height: 1, background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: "30%", left: "50%", width: 1, height: "12%", background: "rgba(255,255,255,0.06)", transform: "translateX(-50%)" }} />
        </div>

        {/* Selection box */}
        {elSelected && overlayVisible && (
          <div style={{
            position: "absolute", bottom: "24%", left: "4%", right: "18%", height: "11%",
            border: "1.5px solid #2e90fa", borderRadius: 2,
            pointerEvents: "none", animation: "ai-sel 1.2s ease-in-out infinite",
            zIndex: 10,
          }} />
        )}

        {/* Lower-third overlay */}
        <div style={{
          position: "absolute", bottom: "5%", left: "4%", right: "18%",
          opacity: overlayVisible ? 1 : 0,
          transform: overlayVisible ? "translateY(0)" : "translateY(110%)",
          transition: "all 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 5,
        }}>
          {/* QUARTERFINAL badge */}
          <div style={{
            background: "#16b364", color: "#fff",
            fontSize: "clamp(5px, 1vw, 8px)", fontWeight: 800,
            padding: "1px 8px", display: "inline-block",
            marginBottom: 2, letterSpacing: "0.07em",
          }}>
            QUARTERFINAL
          </div>

          {/* Title bar */}
          <div style={{ background: "#0d2340", padding: "4px 10px 3px" }}>
            <div style={{ color: "#fff", fontSize: "clamp(6px, 1.2vw, 9.5px)", fontWeight: 800, letterSpacing: "0.04em" }}>
              AUSTRALIAN CLAY COURT NATIONALS
            </div>
            <div style={{ color: "#7fa7c9", fontSize: "clamp(5px, 0.9vw, 7.5px)", letterSpacing: "0.03em" }}>
              TENNIS WORLD CANBERRA
            </div>
          </div>

          {/* Players */}
          <div style={{ background: "#0d2340", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Player 1 */}
            <div style={{ display: "flex", alignItems: "center", padding: "3px 10px", gap: 6 }}>
              <div style={{ flex: 1, fontSize: "clamp(6px, 1.1vw, 9px)", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
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
                    fontSize: "clamp(6px, 1.1vw, 9px)", fontWeight: 800,
                    background: idx === 1 && scoreFlash ? "rgba(251,191,36,0.25)" : "rgba(255,255,255,0.1)",
                    padding: "0 4px", borderRadius: 2,
                    transition: "all 0.15s", minWidth: 14, textAlign: "center",
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Player 2 */}
            <div style={{ display: "flex", alignItems: "center", padding: "3px 10px", gap: 6 }}>
              <div style={{ flex: 1, fontSize: "clamp(6px, 1.1vw, 9px)", color: "#cbd5e1", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ opacity: 0 }}>●</span>
                <span style={{ fontWeight: 700 }}>JOHN</span>
                <span>SMITH</span>
                <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.85vw, 7px)" }}>GBR</span>
              </div>
              <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.85vw, 7px)" }}>6*</span>
                <span style={{ color: "#fff", fontSize: "clamp(6px, 1.1vw, 9px)", fontWeight: 800, background: "rgba(255,255,255,0.1)", padding: "0 4px", borderRadius: 2, minWidth: 14, textAlign: "center" }}>4</span>
              </div>
            </div>

            {/* Timer */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "1px 10px 4px" }}>
              <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.8vw, 7px)" }}>34&apos; | 22&apos;</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cursor ── */}
      <div ref={cursorRef} style={{ position: "absolute", pointerEvents: "none", zIndex: 100, opacity: 0 }}>
        <svg width="14" height="16" viewBox="0 0 18 20" fill="none">
          <path d="M1 1l6.5 16.5 3-5.5 6 1.5L1 1z" fill="white" stroke="#0c111d" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes ai-sel {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
