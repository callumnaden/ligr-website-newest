"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
  FuseAnimPanel
  Animated mockup of the LIGR Fuse editor.
  Animation sequence (loops):
    1. Show initial state — Break Point Takeover row has no expression
    2. Cursor moves to the expression cell, clicks
    3. Text types in: "$v.breakPointToggle.value"
    4. Expression confirmed (turns blue)
    5. Cursor moves to NEXT button, clicks
    6. Progress bar advances Step 1/3 → Step 2/3
    7. Pause → reset
*/

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
      gsap.set(cursorRef.current, { opacity: 0, x: 60, y: 100 });

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

        const tl = gsap.timeline({
          onComplete: () => gsap.delayedCall(0.8, play),
        });

        // ── Step 1: hold on initial state ──
        tl.to({}, { duration: 1.4 });

        // ── Step 2: cursor appears, moves to expression cell ──
        tl.to(cursorRef.current, { opacity: 1, duration: 0.2 })
          .to(cursorRef.current, { x: 186, y: 220, duration: 0.55, ease: "power2.inOut" });

        // ── Step 3: click — row highlights, input appears ──
        tl.to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: "power2.in" })
          .to(cursorRef.current, { scale: 1, duration: 0.1, ease: "power2.out" })
          .call(() => {
            if (exprCellRef.current) exprCellRef.current.style.background = "rgba(46,144,250,0.06)";
            if (exprTextRef.current) {
              exprTextRef.current.textContent = "|";
              exprTextRef.current.style.color = BLUE_TEXT;
              exprTextRef.current.style.fontStyle = "normal";
            }
          })
          .to(cursorRef.current, { opacity: 0, duration: 0.15 })
          .to({}, { duration: 0.25 });

        // ── Step 4: type expression ──
        const typeChar = () => {
          if (!exprTextRef.current) return;
          charIndex++;
          exprTextRef.current.textContent =
            EXPRESSION.slice(0, charIndex) +
            (charIndex < EXPRESSION.length ? "|" : "");
        };
        for (let i = 0; i < EXPRESSION.length; i++) {
          tl.call(typeChar, [], ">0.045");
        }
        tl.to({}, { duration: 0.4 });

        // ── Step 5: confirm — expression turns blue ──
        tl.call(() => {
          if (exprTextRef.current) {
            exprTextRef.current.textContent = EXPRESSION;
            exprTextRef.current.style.color = "#2e90fa";
          }
          if (exprCellRef.current) exprCellRef.current.style.background = "transparent";
        })
          .to({}, { duration: 0.5 });

        // ── Step 6: cursor moves to NEXT, clicks ──
        tl.set(cursorRef.current, { x: 358, y: 88 })
          .to(cursorRef.current, { opacity: 1, duration: 0.2 })
          .to(nextBtnRef.current, { borderColor: "#2e90fa", duration: 0.15 })
          .to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: "power2.in" })
          .to(cursorRef.current, { scale: 1, duration: 0.1, ease: "power2.out" });

        // ── Step 7: progress advances ──
        tl.to(progressRef.current, { width: "66%", duration: 0.5, ease: "power2.out" })
          .call(() => {
            if (stepRef.current) stepRef.current.textContent = "Step 2/3";
          })
          .to(cursorRef.current, { opacity: 0, duration: 0.2 })
          .to({}, { duration: 1.4 });

        // ── Reset ──
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
      {/* ── Top nav ── */}
      <div style={{
        height: 32, borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 10px", flexShrink: 0, gap: 10,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="white" />
            <path d="M8 7l4 5-4 5M12 17h4" stroke="#0c111d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 800, color: TEXT1, letterSpacing: "0.08em", fontStyle: "italic" }}>FUSE</span>
        </div>
        {/* Metadata */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 8, color: TEXT3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Name: <span style={{ color: TEXT2, fontWeight: 600 }}>match_id_(upcoming_match).riv</span>
          </span>
          <span style={{ fontSize: 8, color: TEXT3, whiteSpace: "nowrap" }}>
            Graphic: <span style={{ color: TEXT2, fontWeight: 600 }}>MatchID</span>
          </span>
        </div>
        {/* Publish */}
        <button style={{
          fontSize: 8, fontWeight: 700, padding: "3px 8px", letterSpacing: "0.04em",
          background: RED, border: "none", borderRadius: 5, color: "#fff", flexShrink: 0,
          display: "flex", alignItems: "center", gap: 3,
        }}>
          <svg width="9" height="9" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v10M5 7l5-5 5 5M3 14v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          PUBLISH VERSION
        </button>
      </div>

      {/* ── Main two-column area ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Left: canvas + table ── */}
        <div style={{ flex: "0 0 58%", display: "flex", flexDirection: "column", borderRight: `1px solid ${BORDER}`, overflow: "hidden" }}>

          {/* Canvas */}
          <div style={{ padding: "8px 8px 4px", flexShrink: 0 }}>
            <div style={{
              border: `1px solid ${BORDER2}`, borderRadius: 5, overflow: "hidden",
              position: "relative",
              backgroundImage: "linear-gradient(45deg,#13161e 25%,#0f1219 25%,#0f1219 50%,#13161e 50%,#13161e 75%,#0f1219 75%,#0f1219 100%)",
              backgroundSize: "10px 10px",
              aspectRatio: "21/9",
            }}>
              {/* Faint central glow */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,80,78,0.04) 0%, transparent 80%)" }} />
            </div>
          </div>

          {/* Toolbar */}
          <div style={{
            height: 26, borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center",
            padding: "0 8px", gap: 6, flexShrink: 0,
          }}>
            {[
              { icon: "▶" }, { icon: "↺" }, { icon: "✋" },
            ].map((btn, i) => (
              <div key={i} style={{
                width: 20, height: 20, background: BTN_BG,
                border: `1px solid ${BORDER2}`, borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8, color: TEXT3,
              }}>
                {btn.icon}
              </div>
            ))}
            <span style={{ fontSize: 8, color: TEXT3, marginLeft: 2, letterSpacing: "0.06em" }}>GRAPHIC</span>
            <span style={{ fontSize: 8, color: TEXT3, letterSpacing: "0.06em" }}>CHECKBOARD</span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", border: `1px solid ${BORDER2}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ padding: "1px 4px", background: BTN_BG, fontSize: 8, color: TEXT3 }}>−</div>
              <div style={{ padding: "1px 7px", borderLeft: `1px solid ${BORDER2}`, borderRight: `1px solid ${BORDER2}`, fontSize: 8, color: TEXT2, background: BG }}>100%</div>
              <div style={{ padding: "1px 4px", background: BTN_BG, fontSize: 8, color: TEXT3 }}>+</div>
            </div>
            <span style={{ fontSize: 8, color: TEXT3, letterSpacing: "0.06em" }}>VIEW</span>
          </div>

          {/* Tabs bar */}
          <div style={{
            borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "5px 8px", flexShrink: 0,
          }}>
            <div style={{ display: "flex", border: `1px solid ${BORDER2}`, borderRadius: 5, overflow: "hidden" }}>
              {["Data Bindings", "Inputs", "Assets"].map((tab, i) => (
                <div key={tab} style={{
                  fontSize: 8, padding: "3px 7px",
                  background: i === 1 ? "#1f242f" : BG,
                  color: i === 1 ? TEXT2 : TEXT3,
                  borderRight: i < 2 ? `1px solid ${BORDER2}` : "none",
                }}>
                  {tab}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, background: BG, border: `1px solid ${BORDER2}`, borderRadius: 5, padding: "2px 7px" }}>
              <svg width="9" height="9" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke={TEXT3} strokeWidth="1.5" /><path d="M15 15l3 3" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" /></svg>
              <span style={{ fontSize: 8, color: TEXT3 }}>Search</span>
            </div>
          </div>

          {/* State Machine Inputs header */}
          <div style={{ padding: "7px 10px 5px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: TEXT1, marginBottom: 2 }}>State Machine Inputs</div>
            <div style={{ fontSize: 7.5, color: TEXT3, lineHeight: 1.4 }}>
              Control your GFX animation by setting inputs or triggering actions. Map inputs to expressions for dynamic behaviour.
            </div>
          </div>

          {/* Table header */}
          <div style={{
            display: "flex", borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
            background: BG,
          }}>
            <div style={{ flex: 1, padding: "4px 10px", fontSize: 8, color: TEXT3 }}>Input</div>
            <div style={{ flex: 1, padding: "4px 10px", fontSize: 8, color: TEXT3 }}>Expressions</div>
            <div style={{ width: 26 }} />
          </div>

          {/* Table rows */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            {[
              { name: "Tie Break Takeover", sub: "Type: 58 | State Machine", expr: "$v.tieBreakToggleTest.value", hasExpr: true, isTarget: false },
              { name: "Break Point Takeover", sub: "Type: 58 | State Machine", expr: null, hasExpr: false, isTarget: true },
              { name: "Set Point Takeover", sub: "Type: 58 | State Machine", expr: null, hasExpr: false, isTarget: false },
              { name: "Server", sub: "Type: 58 | State Machine", expr: "$d.servingPlayerNumber && !$v.hide", hasExpr: true, isTarget: false },
            ].map((row, i) => (
              <div
                key={i}
                ref={row.isTarget ? exprCellRef : undefined}
                style={{
                  display: "flex", borderBottom: `1px solid ${BORDER}`,
                  transition: "background 0.2s",
                }}
              >
                <div style={{ flex: 1, padding: "5px 10px" }}>
                  <div style={{ fontSize: 9, color: TEXT1, fontWeight: 500 }}>{row.name}</div>
                  <div style={{ fontSize: 7.5, color: TEXT3, marginTop: 1 }}>{row.sub}</div>
                </div>
                <div style={{ flex: 1, padding: "5px 10px", display: "flex", alignItems: "center" }}>
                  {row.isTarget ? (
                    <span ref={exprTextRef} style={{ fontSize: 8.5, color: TEXT3, fontStyle: "italic" }}>
                      Click to set expression...
                    </span>
                  ) : (
                    <span style={{ fontSize: 8.5, color: row.hasExpr ? "#2e90fa" : TEXT3, fontStyle: row.hasExpr ? "normal" : "italic" }}>
                      {row.hasExpr ? row.expr : "Click to set expression..."}
                    </span>
                  )}
                </div>
                <div style={{ width: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="9" height="9" viewBox="0 0 20 20" fill="none">
                    <path d="M14 2l4 4-10 10H4v-4L14 2z" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: State Machine panel ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 10px 8px", gap: 8, overflow: "hidden" }}>

          {/* Heading */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEXT1, marginBottom: 3 }}>State Machine</div>
            <div style={{ fontSize: 7.5, color: TEXT3, lineHeight: 1.5 }}>
              State machines control how your GFX animation responds to data bindings. Select a state machine to control which animation states are active.
            </div>
          </div>

          {/* Scenario / Match ID tabs */}
          <div style={{ borderBottom: `1px solid ${BORDER}`, display: "flex", gap: 8 }}>
            {["Scenario", "Match ID"].map((tab, i) => (
              <div key={tab} style={{
                fontSize: 9, fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? TEXT2 : TEXT3,
                paddingBottom: 5,
                borderBottom: i === 0 ? `2px solid ${TEXT2}` : "2px solid transparent",
              }}>
                {tab}
              </div>
            ))}
          </div>

          {/* Scenario selector + PREV/NEXT */}
          <div>
            <div style={{ fontSize: 8, color: TEXT2, marginBottom: 4 }}>Scenario</div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{
                flex: 1, background: BG, border: `1px solid ${BORDER2}`,
                borderRadius: 5, padding: "4px 8px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                minWidth: 0,
              }}>
                <span style={{ fontSize: 7.5, color: TEXT3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  Combined Break Point, Set Po...
                </span>
                <svg width="9" height="9" viewBox="0 0 20 20" fill="none">
                  <path d="M5 8l5 5 5-5" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              {["PREV", "NEXT"].map((btn, i) => (
                <button
                  key={btn}
                  ref={btn === "NEXT" ? nextBtnRef : undefined}
                  style={{
                    fontSize: 8, fontWeight: 700, padding: "4px 7px",
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
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1, height: 5, background: BORDER2, borderRadius: 3, overflow: "hidden" }}>
              <div
                ref={progressRef}
                style={{ height: "100%", width: "33%", background: RED, borderRadius: 3 }}
              />
            </div>
            <span ref={stepRef} style={{ fontSize: 8, color: TEXT2, whiteSpace: "nowrap" }}>Step 1/3</span>
          </div>

          {/* Match Data / Control Variables tabs */}
          <div style={{ borderBottom: `1px solid ${BORDER}`, display: "flex", gap: 8 }}>
            {["Match Data", "Control Variables"].map((tab, i) => (
              <div key={tab} style={{
                fontSize: 8.5, fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? TEXT2 : TEXT3,
                paddingBottom: 5,
                borderBottom: i === 0 ? `2px solid ${TEXT2}` : "2px solid transparent",
              }}>
                {tab}
              </div>
            ))}
          </div>

          {/* Available Data Fields */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", gap: 6 }}>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: TEXT1, marginBottom: 2 }}>Available Data Fields</div>
              <div style={{ fontSize: 7.5, color: TEXT3, lineHeight: 1.4, marginBottom: 5 }}>
                These fields can be used in expressions to drive your animation state.
              </div>
              {/* Search */}
              <div style={{
                background: BG, border: `1px solid ${BORDER2}`, borderRadius: 5,
                padding: "3px 7px", display: "flex", alignItems: "center", gap: 4, marginBottom: 5,
              }}>
                <svg width="9" height="9" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke={TEXT3} strokeWidth="1.5" /><path d="M15 15l3 3" stroke={TEXT3} strokeWidth="1.5" strokeLinecap="round" /></svg>
                <span style={{ fontSize: 8, color: TEXT3 }}>Search</span>
              </div>
            </div>

            {/* Field rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, overflow: "hidden" }}>
              {[
                { type: "var", name: "awayTeam.score", kind: "Boolean" },
                { type: "var", name: "homeTeam.score", kind: "Boolean" },
                { type: "var", name: "awayTeam.games", kind: "Number" },
                { type: "plain", name: "noneDoubleZeroGameScore" },
                { type: "plain", name: "noneDoubleZeroGameScore" },
                { type: "var", name: "awayTeam.score", kind: "Boolean" },
              ].map((field, i) =>
                field.type === "var" ? (
                  <div key={i} style={{
                    background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`,
                    borderRadius: 5, padding: "3px 7px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexShrink: 0,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 8, color: BLUE_TEXT }}>(x)</span>
                      <span style={{ fontSize: 8.5, color: BLUE_TEXT, fontWeight: 500 }}>{field.name}</span>
                      <span style={{ fontSize: 7.5, color: TEXT3 }}>{field.kind}</span>
                    </div>
                    <div style={{
                      background: BTN_BG, border: `1px solid ${BORDER2}`,
                      borderRadius: 3, padding: "1px 4px", fontSize: 7.5, color: TEXT2,
                    }}>
                      Example
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{
                    background: BTN_BG, border: `1px solid ${BORDER2}`,
                    borderRadius: 5, padding: "3px 7px", flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 8.5, color: TEXT2 }}>{field.name}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Animated cursor ── */}
      <div
        ref={cursorRef}
        style={{
          position: "absolute", top: 0, left: 0,
          zIndex: 50, pointerEvents: "none", transformOrigin: "top left",
        }}
      >
        <svg width="14" height="16" viewBox="0 0 18 20" fill="none">
          <path d="M1 1l6.5 16.5 3-5.5 6 1.5L1 1z" fill={TEXT1} stroke={BG} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
