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
const PURPLE = "#9E77ED";

const PROMPT = "Tennis lower third · live scores · dark theme";
const GEN_STEPS = [
  "Analysing sport context...",
  "Selecting layout template...",
  "Binding live data fields...",
  "Rendering graphic...",
];

export default function AIGraphicsAnimPanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [promptText, setPromptText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [p1Score, setP1Score] = useState(4);
  const [scoreFlash, setScoreFlash] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cursorRef.current, { opacity: 0, x: 120, y: 60 });

      const play = () => {
        let charIndex = 0;
        const tl = gsap.timeline({ onComplete: () => { gsap.delayedCall(1.0, play); } });

        // Reset
        tl.call(() => {
          charIndex = 0;
          setPromptText("");
          setGenerating(false);
          setProgress(0);
          setStepText("");
          setShowPreview(false);
          setP1Score(4);
          setScoreFlash(false);
        });
        tl.to({}, { duration: 0.8 });

        // Cursor appears, clicks into prompt field
        tl.to(cursorRef.current, { opacity: 1, duration: 0.2 });
        tl.to(cursorRef.current, { x: 155, y: 82, duration: 0.5, ease: "power2.inOut" });
        tl.to(cursorRef.current, { scale: 0.82, duration: 0.1 });
        tl.to(cursorRef.current, { scale: 1, duration: 0.12 });
        tl.to({}, { duration: 0.2 });

        // Type prompt char by char
        const typeChar = () => {
          charIndex++;
          setPromptText(PROMPT.slice(0, charIndex) + (charIndex < PROMPT.length ? "|" : ""));
        };
        for (let i = 0; i < PROMPT.length; i++) {
          tl.call(typeChar, [], ">0.045");
        }
        tl.call(() => setPromptText(PROMPT));
        tl.to({}, { duration: 0.35 });

        // Move to Generate button
        tl.to(cursorRef.current, { x: 232, y: 108, duration: 0.4, ease: "power2.inOut" });
        tl.to(cursorRef.current, { scale: 0.82, duration: 0.1 });
        tl.to(cursorRef.current, { scale: 1, duration: 0.12 });
        tl.call(() => { setGenerating(true); setProgress(5); setStepText(GEN_STEPS[0]); });
        tl.to(cursorRef.current, { opacity: 0, duration: 0.2 });

        // Animate through generation steps
        GEN_STEPS.forEach((step, i) => {
          tl.to({}, { duration: 0.45 });
          tl.call(() => {
            setProgress(Math.round((i + 1) / GEN_STEPS.length * 95));
            setStepText(step);
          });
        });

        // Complete + show preview
        tl.to({}, { duration: 0.35 });
        tl.call(() => { setProgress(100); setShowPreview(true); setGenerating(false); setStepText(""); });
        tl.to({}, { duration: 1.0 });

        // Score updates in preview
        tl.call(() => setScoreFlash(true));
        tl.to({}, { duration: 0.2 });
        tl.call(() => { setP1Score(5); });
        tl.to({}, { duration: 0.3 });
        tl.call(() => setScoreFlash(false));
        tl.to({}, { duration: 1.4 });
      };

      gsap.delayedCall(0.5, play);
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
          <div style={{ display: "flex", gap: 5 }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ fontSize: 9, color: TEXT3, marginLeft: 6 }}>LIGR AI Graphics</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${PURPLE}20`, border: `1px solid ${PURPLE}40`, borderRadius: 4, padding: "2px 8px" }}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M5 1l1 2.5H9L6.5 5l1 2.5L5 6 2.5 7.5l1-2.5L1 3.5h3z" fill={PURPLE} />
          </svg>
          <span style={{ fontSize: 8, color: PURPLE, fontWeight: 600 }}>Powered by Claude</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 12px", gap: 8, overflow: "hidden" }}>
        {/* Prompt input */}
        <div>
          <div style={{ fontSize: 8, color: TEXT3, marginBottom: 4, fontWeight: 500 }}>Describe your graphic</div>
          <div style={{
            background: BG_PANEL, border: `1px solid ${promptText ? PURPLE + "70" : BORDER}`,
            borderRadius: 6, padding: "6px 10px", minHeight: 30,
            fontSize: 9, color: promptText ? TEXT2 : BORDER2,
            fontStyle: promptText ? "normal" : "italic",
            transition: "border-color 0.2s",
            display: "flex", alignItems: "center",
          }}>
            {promptText || "e.g. \u201cBasketball scorebug \u00b7 dark theme \u00b7 home team left...\u201d"}
          </div>
        </div>

        {/* Generate button + progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={{
            fontSize: 9, fontWeight: 700, padding: "5px 14px", flexShrink: 0,
            background: generating ? BORDER : (showPreview ? "#22262F" : RED),
            border: "none", borderRadius: 5, color: generating ? TEXT3 : "#fff",
            letterSpacing: "0.04em", transition: "background 0.2s",
          }}>
            {generating ? "Generating..." : showPreview ? "Regenerate" : "✦ Generate"}
          </button>
          {generating && (
            <div style={{ flex: 1 }}>
              <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: `linear-gradient(90deg, ${PURPLE}, ${RED})`, borderRadius: 2, width: `${progress}%`, transition: "width 0.4s ease" }} />
              </div>
              <div style={{ fontSize: 7, color: TEXT3, marginTop: 3 }}>{stepText}</div>
            </div>
          )}
          {!generating && showPreview && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#28C840" }} />
              <span style={{ fontSize: 8, color: "#28C840", fontWeight: 600 }}>Ready to apply</span>
            </div>
          )}
        </div>

        {/* Preview area */}
        <div style={{ flex: 1, background: BG_PANEL, border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <span style={{ fontSize: 8, color: TEXT3 }}>Preview</span>
            {showPreview && (
              <div style={{ display: "flex", gap: 5 }}>
                {["Edit", "Export", "Apply"].map((b) => (
                  <span key={b} style={{ fontSize: 7, padding: "2px 7px", border: `1px solid ${BORDER2}`, borderRadius: 3, color: TEXT3 }}>{b}</span>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {/* Stadium bg */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #050505 0%, #0e0e0e 35%, #1a1a1a 60%, #080808 100%)" }} />
            {[12, 28, 50, 72, 88].map((x, i) => (
              <div key={i} style={{ position: "absolute", top: "3%", left: `${x}%`, width: "10%", height: "55%", background: `radial-gradient(ellipse at top, rgba(255,255,220,${0.13 + (i % 2) * 0.07}) 0%, transparent 80%)`, transform: "translateX(-50%)" }} />
            ))}

            {/* Generated graphic overlay */}
            {showPreview && (
              <div style={{ position: "absolute", bottom: "6%", left: "4%", right: "4%", animation: "aiSlideUp 0.55s cubic-bezier(0.22,1,0.36,1)" }}>
                <div style={{ background: "#16b364", color: "#fff", fontSize: "clamp(5px, 0.9vw, 7px)", fontWeight: 800, padding: "1px 8px", display: "inline-block", marginBottom: 2, letterSpacing: "0.07em" }}>QUARTERFINAL</div>
                <div style={{ background: "#0d2340", padding: "4px 10px 3px" }}>
                  <div style={{ color: "#fff", fontSize: "clamp(6px, 1.1vw, 9px)", fontWeight: 800, letterSpacing: "0.04em" }}>AUSTRALIAN CLAY COURT NATIONALS</div>
                  <div style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.8vw, 7px)", letterSpacing: "0.03em" }}>TENNIS WORLD CANBERRA</div>
                </div>
                <div style={{ background: "#0d2340", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", padding: "3px 10px", gap: 6 }}>
                    <div style={{ flex: 1, fontSize: "clamp(6px, 1.05vw, 8.5px)", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#60a5fa", fontSize: "0.85em" }}>●</span>
                      <span>JORDI</span><span style={{ fontWeight: 400 }}>PEREZ</span>
                      <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.75vw, 6px)" }}>ESP</span>
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.75vw, 6px)" }}>2*</span>
                      {[6, p1Score].map((s, idx) => (
                        <span key={idx} style={{ color: idx === 1 && scoreFlash ? "#fbbf24" : "#fff", fontSize: "clamp(5px, 1vw, 8px)", fontWeight: 800, background: idx === 1 && scoreFlash ? "rgba(251,191,36,0.25)" : "rgba(255,255,255,0.1)", padding: "0 4px", borderRadius: 2, transition: "all 0.15s", minWidth: 13, textAlign: "center" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", padding: "3px 10px", gap: 6 }}>
                    <div style={{ flex: 1, fontSize: "clamp(6px, 1.05vw, 8.5px)", color: "#cbd5e1", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ opacity: 0 }}>●</span>
                      <span style={{ fontWeight: 700 }}>JOHN</span><span>SMITH</span>
                      <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.75vw, 6px)" }}>GBR</span>
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.75vw, 6px)" }}>6*</span>
                      <span style={{ color: "#fff", fontSize: "clamp(5px, 1vw, 8px)", fontWeight: 800, background: "rgba(255,255,255,0.1)", padding: "0 4px", borderRadius: 2, minWidth: 13, textAlign: "center" }}>4</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", padding: "1px 10px 3px" }}>
                    <span style={{ color: "#7fa7c9", fontSize: "clamp(4px, 0.75vw, 6px)" }}>34&apos; | 22&apos;</span>
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!showPreview && !generating && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", color: BORDER2, fontSize: 9 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 6px" }}>
                    <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" stroke={BORDER2} strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  Preview will appear here
                </div>
              </div>
            )}

            {/* Generating state */}
            {generating && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: PURPLE, marginBottom: 4 }}>{stepText}</div>
                  <div style={{ fontSize: 8, color: BORDER2 }}>Claude AI</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Cursor ── */}
      <div ref={cursorRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 50, pointerEvents: "none", transformOrigin: "top left" }}>
        <svg width="14" height="16" viewBox="0 0 18 20" fill="none">
          <path d="M1 1l6.5 16.5 3-5.5 6 1.5L1 1z" fill={TEXT1} stroke={BG} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes aiSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
