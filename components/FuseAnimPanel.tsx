"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BG = "#0c111d";
const BORDER = "#1f242f";
const BORDER2 = "#333741";
const TEXT1 = "#f5f5f6";
const TEXT2 = "#cecfd2";
const TEXT3 = "#94969c";
const BTN_BG = "#161b26";
const RED = "#d92d20";
const BLUE_BG = "#102a56";
const BLUE_BORDER = "#1849a9";
const BLUE_TEXT = "#84caff";
const EXPRESSION = "$v.breakPointToggle.value";

export default function FuseAnimPanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const exprCellRef = useRef<HTMLDivElement>(null);
  const exprTextRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cursorRef.current, { opacity: 0, x: 60, y: 80 });

      const reset = (tl: gsap.core.Timeline) => {
        tl.to(cursorRef.current, { opacity: 0, duration: 0.2 })
          .to(nextBtnRef.current, { borderColor: BORDER2, duration: 0.15 }, "<")
          .call(() => {
            if (exprTextRef.current) {
              exprTextRef.current.textContent = "Click to set expression...";
              exprTextRef.current.style.color = TEXT3;
              exprTextRef.current.style.fontStyle = "italic";
            }
            if (exprCellRef.current) exprCellRef.current.style.background = "transparent";
            if (progressRef.current) progressRef.current.style.width = "33%";
            if (stepRef.current) stepRef.current.textContent = "Step 1/3";
          });
      };

      const play = () => {
        let charIndex = 0;
        const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(0.8, play) });

        tl.to({}, { duration: 1.2 });

        // Cursor moves to expression cell
        tl.to(cursorRef.current, { opacity: 1, duration: 0.2 })
          .to(cursorRef.current, { x: 200, y: 148, duration: 0.5, ease: "power2.inOut" });

        // Click — row highlights, input appears
        tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 })
          .to(cursorRef.current, { scale: 1, duration: 0.1 })
          .call(() => {
            if (exprCellRef.current) exprCellRef.current.style.background = "rgba(46,144,250,0.06)";
            if (exprTextRef.current) {
              exprTextRef.current.textContent = "|";
              exprTextRef.current.style.color = BLUE_TEXT;
              exprTextRef.current.style.fontStyle = "normal";
            }
          })
          .to(cursorRef.current, { opacity: 0, duration: 0.15 })
          .to({}, { duration: 0.2 });

        // Type expression
        const typeChar = () => {
          if (!exprTextRef.current) return;
          charIndex++;
          exprTextRef.current.textContent =
            EXPRESSION.slice(0, charIndex) + (charIndex < EXPRESSION.length ? "|" : "");
        };
        for (let i = 0; i < EXPRESSION.length; i++) {
          tl.call(typeChar, [], ">0.045");
        }
        tl.to({}, { duration: 0.4 });

        // Confirm — expression turns blue
        tl.call(() => {
          if (exprTextRef.current) {
            exprTextRef.current.textContent = EXPRESSION;
            exprTextRef.current.style.color = "#2e90fa";
          }
          if (exprCellRef.current) exprCellRef.current.style.background = "transparent";
        }).to({}, { duration: 0.5 });

        // Cursor moves to NEXT button
        tl.set(cursorRef.current, { x: 340, y: 42 })
          .to(cursorRef.current, { opacity: 1, duration: 0.2 })
          .to(nextBtnRef.current, { borderColor: "#2e90fa", duration: 0.15 })
          .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
          .to(cursorRef.current, { scale: 1, duration: 0.1 });

        // Progress advances
        tl.to(progressRef.current, { width: "66%", duration: 0.5, ease: "power2.out" })
          .call(() => { if (stepRef.current) stepRef.current.textContent = "Step 2/3"; })
          .to(cursorRef.current, { opacity: 0, duration: 0.2 })
          .to({}, { duration: 1.4 });

        reset(tl);
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
      <div style={{
        height: 36, borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 12px", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="white" />
            <path d="M8 7l4 5-4 5M12 17h4" stroke="#0c111d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 800, color: TEXT1, letterSpacing: "0.08em", fontStyle: "italic" }}>FUSE</span>
          <span style={{ fontSize: 9, color: BORDER2, margin: "0 4px" }}>|</span>
          <span style={{ fontSize: 9, color: TEXT3 }}>match_id_(upcoming_match).riv</span>
          <span style={{ fontSize: 9, color: BORDER2, margin: "0 2px" }}>·</span>
          <span style={{ fontSize: 9, color: TEXT2, fontWeight: 600 }}>MatchID</span>
        </div>
        <button style={{
          fontSize: 9, fontWeight: 700, padding: "4px 10px", letterSpacing: "0.04em",
          background: RED, border: "none", borderRadius: 5, color: "#fff",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <svg width="9" height="9" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v10M5 7l5-5 5 5M3 14v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          PUBLISH VERSION
        </button>
      </div>

      {/* ── Two-column body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Left: State Machine Inputs table ── */}
        <div style={{ flex: "0 0 60%", display: "flex", flexDirection: "column", borderRight: `1px solid ${BORDER}`, overflow: "hidden" }}>

          {/* Section heading */}
          <div style={{ padding: "10px 12px 7px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT1, marginBottom: 2 }}>State Machine Inputs</div>
            <div style={{ fontSize: 8, color: TEXT3, lineHeight: 1.4 }}>
              Map inputs to expressions for dynamic behaviour.
            </div>
          </div>

          {/* Table header */}
          <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ flex: 1, padding: "5px 12px", fontSize: 9, color: TEXT3, fontWeight: 500 }}>Input</div>
            <div style={{ flex: 1, padding: "5px 12px", fontSize: 9, color: TEXT3, fontWeight: 500 }}>Expression</div>
            <div style={{ width: 28 }} />
          </div>

          {/* Table rows */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            {[
              { name: "Tie Break Takeover", expr: "$v.tieBreakToggleTest.value", hasExpr: true, isTarget: false },
              { name: "Break Point Takeover", expr: null, hasExpr: false, isTarget: true },
              { name: "Set Point Takeover", expr: null, hasExpr: false, isTarget: false },
              { name: "Server", expr: "$d.servingPlayerNumber", hasExpr: true, isTarget: false },
              { name: "Score Display", expr: "$d.awayTeam.score", hasExpr: true, isTarget: false },
            ].map((row, i) => (
              <div
                key={i}
                ref={row.isTarget ? exprCellRef : undefined}
                style={{
                  display: "flex", borderBottom: `1px solid ${BORDER}`,
                  transition: "background 0.2s",
                }}
              >
                <div style={{ flex: 1, padding: "7px 12px" }}>
                  <div style={{ fontSize: 10, color: TEXT1, fontWeight: 500 }}>{row.name}</div>
                  <div style={{ fontSize: 8, color: TEXT3, marginTop: 1 }}>Type: Boolean | State Machine</div>
                </div>
                <div style={{ flex: 1, padding: "7px 12px", display: "flex", alignItems: "center" }}>
                  {row.isTarget ? (
                    <span ref={exprTextRef} style={{ fontSize: 9, color: TEXT3, fontStyle: "italic" }}>
                      Click to set expression...
                    </span>
                  ) : (
                    <span style={{ fontSize: 9, color: row.hasExpr ? "#2e90fa" : TEXT3, fontStyle: row.hasExpr ? "normal" : "italic" }}>
                      {row.hasExpr ? row.expr : "Click to set expression..."}
                    </span>
                  )}
                </div>
                <div style={{ width: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                    <path d="M14 2l4 4-10 10H4v-4L14 2z" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: State Machine panel ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 12px 10px", gap: 10, overflow: "hidden" }}>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT1, marginBottom: 3 }}>State Machine</div>
            <div style={{ fontSize: 8, color: TEXT3, lineHeight: 1.5 }}>
              Control which animation states are active by selecting a scenario.
            </div>
          </div>

          {/* Scenario selector + PREV/NEXT */}
          <div>
            <div style={{ fontSize: 9, color: TEXT2, marginBottom: 5, fontWeight: 500 }}>Scenario</div>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <div style={{
                flex: 1, background: BG, border: `1px solid ${BORDER2}`,
                borderRadius: 5, padding: "5px 9px",
                display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 0,
              }}>
                <span style={{ fontSize: 8, color: TEXT3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  Combined Break Point, Set Po...
                </span>
                <svg width="9" height="9" viewBox="0 0 20 20" fill="none">
                  <path d="M5 8l5 5 5-5" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              {["PREV", "NEXT"].map((btn) => (
                <button
                  key={btn}
                  ref={btn === "NEXT" ? nextBtnRef : undefined}
                  style={{
                    fontSize: 9, fontWeight: 700, padding: "5px 8px",
                    background: BTN_BG, border: `1px solid ${BORDER2}`,
                    borderRadius: 5, color: TEXT2, flexShrink: 0,
                    cursor: "default", letterSpacing: "0.04em",
                    transition: "border-color 0.15s",
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 6, background: BORDER2, borderRadius: 3, overflow: "hidden" }}>
              <div ref={progressRef} style={{ height: "100%", width: "33%", background: RED, borderRadius: 3 }} />
            </div>
            <span ref={stepRef} style={{ fontSize: 9, color: TEXT2, whiteSpace: "nowrap" }}>Step 1/3</span>
          </div>

          <div style={{ height: 1, background: BORDER }} />

          {/* Available Data Fields */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", gap: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: TEXT1 }}>Available Data Fields</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
              {[
                { type: "var", name: "awayTeam.score", kind: "Boolean" },
                { type: "var", name: "homeTeam.score", kind: "Boolean" },
                { type: "var", name: "awayTeam.games", kind: "Number" },
                { type: "plain", name: "noneDoubleZeroGameScore" },
                { type: "var", name: "homeTeam.games", kind: "Number" },
              ].map((field, i) =>
                field.type === "var" ? (
                  <div key={i} style={{
                    background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`,
                    borderRadius: 5, padding: "4px 8px",
                    display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 8, color: BLUE_TEXT }}>(x)</span>
                      <span style={{ fontSize: 9, color: BLUE_TEXT, fontWeight: 500 }}>{field.name}</span>
                      <span style={{ fontSize: 8, color: TEXT3 }}>{field.kind}</span>
                    </div>
                    <div style={{ background: BTN_BG, border: `1px solid ${BORDER2}`, borderRadius: 3, padding: "1px 5px", fontSize: 8, color: TEXT2 }}>
                      Example
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{ background: BTN_BG, border: `1px solid ${BORDER2}`, borderRadius: 5, padding: "4px 8px", flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: TEXT2 }}>{field.name}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cursor ── */}
      <div
        ref={cursorRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 50, pointerEvents: "none", transformOrigin: "top left" }}
      >
        <svg width="14" height="16" viewBox="0 0 18 20" fill="none">
          <path d="M1 1l6.5 16.5 3-5.5 6 1.5L1 1z" fill={TEXT1} stroke={BG} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
