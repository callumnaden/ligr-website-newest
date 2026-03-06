"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────────────────
   Topographic contour generator
   Two Gaussian peaks → iso-curve tracing → SVG paths
───────────────────────────────────────────────────────── */

const VW = 1920, VH = 2200;

// Two-peak height field (normalised coords 0-1)
function hfn(x: number, y: number): number {
  const nx = x / VW, ny = y / VH;
  const dx1 = nx - 0.295, dy1 = ny - 0.205;
  const dx2 = nx - 0.630, dy2 = ny - 0.128;
  return (
    Math.exp(-(dx1 * dx1 / 0.052 + dy1 * dy1 / 0.024)) +
    0.78 * Math.exp(-(dx2 * dx2 / 0.030 + dy2 * dy2 / 0.017))
  );
}

// Find the first edge-crossing point for a given iso-level
function findStart(level: number): [number, number] | null {
  function edgeCrossing(pts: [number, number][]): [number, number] | null {
    for (let i = 0; i < pts.length - 1; i++) {
      const h0 = hfn(pts[i][0], pts[i][1]);
      const h1 = hfn(pts[i + 1][0], pts[i + 1][1]);
      if ((h0 - level) * (h1 - level) < 0) {
        const t = (level - h0) / (h1 - h0);
        return [
          pts[i][0] + t * (pts[i + 1][0] - pts[i][0]),
          pts[i][1] + t * (pts[i + 1][1] - pts[i][1]),
        ];
      }
    }
    return null;
  }

  const step = 12;
  // Left edge ↓
  const left: [number, number][] = Array.from({ length: Math.ceil(VH / step) }, (_, i) => [0, i * step]);
  const p1 = edgeCrossing(left);
  if (p1) return p1;

  // Top edge →
  const top: [number, number][] = Array.from({ length: Math.ceil(VW / step) }, (_, i) => [i * step, 0]);
  const p2 = edgeCrossing(top);
  if (p2) return p2;

  // Right edge ↓
  const right: [number, number][] = Array.from({ length: Math.ceil(VH / step) }, (_, i) => [VW, i * step]);
  const p3 = edgeCrossing(right);
  if (p3) return p3;

  // Bottom edge →
  const bottom: [number, number][] = Array.from({ length: Math.ceil(VW / step) }, (_, i) => [i * step, VH]);
  const p4 = edgeCrossing(bottom);
  if (p4) return p4;

  // Radial scan around each peak (for inner closed contours)
  const PEAKS: [number, number][] = [
    [0.295 * VW, 0.205 * VH],
    [0.630 * VW, 0.128 * VH],
  ];
  for (const [px, py] of PEAKS) {
    if (hfn(px, py) < level) continue;
    for (let r = 20; r < 900; r += 20) {
      const ring: [number, number][] = Array.from({ length: 32 }, (_, i) => {
        const a = (i / 32) * 2 * Math.PI;
        return [px + Math.cos(a) * r, py + Math.sin(a) * r] as [number, number];
      });
      ring.push(ring[0]); // close ring
      const p = edgeCrossing(ring);
      if (p) return p;
    }
  }

  return null;
}

// Trace an iso-contour from (sx, sy) by following the gradient perpendicularly
function traceContour(
  level: number,
  sx: number,
  sy: number,
  maxSteps = 600,
  stepSize = 5,
): [number, number][] {
  const pts: [number, number][] = [[sx, sy]];
  let x = sx, y = sy;
  const EPS = 1.5;

  for (let i = 0; i < maxSteps; i++) {
    const dhdx = (hfn(x + EPS, y) - hfn(x - EPS, y)) / (2 * EPS);
    const dhdy = (hfn(x, y + EPS) - hfn(x, y - EPS)) / (2 * EPS);
    const len = Math.hypot(dhdx, dhdy) + 1e-8;

    // Move perpendicular to gradient
    x += (-dhdy / len) * stepSize;
    y += (dhdx / len) * stepSize;

    // Out of canvas — stop
    if (x < -350 || x > VW + 350 || y < -350 || y > VH + 350) break;

    // Loop closed — stop
    if (i > 40 && Math.hypot(x - sx, y - sy) < stepSize * 2.5) {
      pts.push([sx, sy]);
      break;
    }

    pts.push([x, y]);
  }
  return pts;
}

// Catmull-Rom → cubic bezier path string (smooth interpolation)
function pts2path(pts: [number, number][]): string {
  if (pts.length < 3) return "";
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[Math.max(0, i - 2)];
    const p1 = pts[i - 1];
    const p2 = pts[i];
    const p3 = pts[Math.min(pts.length - 1, i + 1)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

// Generate all contour paths at module level (computed once on load)
const LEVELS = Array.from({ length: 25 }, (_, i) => 0.045 + i * 0.052);

const PATHS: { id: string; d: string; dur: number }[] = LEVELS.flatMap((level, i) => {
  const start = findStart(level);
  if (!start) return [];
  const pts = traceContour(level, start[0], start[1]);
  if (pts.length < 8) return [];
  return [{ id: `tp${i}`, d: pts2path(pts), dur: 12 + (i % 8) * 2.2 }];
});

// Every other path gets an animated bead
const ANIM = PATHS.filter((_, i) => i % 2 === 0);

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */

export default function ContactLineBg() {
  useEffect(() => {
    const kills: gsap.core.Tween[] = [];

    ANIM.forEach(({ id, dur }) => {
      const core = document.getElementById(`cl-core-${id}`) as SVGPathElement | null;
      const halo = document.getElementById(`cl-halo-${id}`) as SVGPathElement | null;
      if (!core) return;

      const len = core.getTotalLength();
      if (!len) return;

      const seg = Math.min(110, Math.max(35, len * 0.055));
      const gap = Math.max(0, len - seg);
      const startOff = -(Math.random() * len);

      // Core streak
      gsap.set(core, { strokeDasharray: `${seg} ${gap}`, strokeDashoffset: startOff });
      kills.push(
        gsap.fromTo(core,
          { strokeDashoffset: startOff },
          { strokeDashoffset: startOff - len, duration: dur, repeat: -1, ease: "none" },
        ),
      );

      // Halo (wider, same timing)
      if (halo) {
        const hSeg = seg * 2.4;
        const hGap = Math.max(0, len - hSeg);
        gsap.set(halo, { strokeDasharray: `${hSeg} ${hGap}`, strokeDashoffset: startOff });
        kills.push(
          gsap.fromTo(halo,
            { strokeDashoffset: startOff },
            { strokeDashoffset: startOff - len, duration: dur, repeat: -1, ease: "none" },
          ),
        );
      }
    });

    return () => kills.forEach((t) => t.kill());
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2"
        width={VW}
        height={VH}
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ opacity: 0.20 }}
      >
        <defs>
          <filter id="cl-tight" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cl-halo" x="-900%" y="-900%" width="1900%" height="1900%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="13" />
          </filter>
        </defs>

        {/* Static dim contour lines */}
        {PATHS.map(({ id, d }) => (
          <path key={id} d={d} fill="none" stroke="rgba(255,255,255,1)" strokeWidth="1" />
        ))}

        {/* Bead — outer halo */}
        {ANIM.map(({ id, d }) => (
          <path
            key={`h-${id}`} id={`cl-halo-${id}`}
            d={d} fill="none"
            stroke="#FF504E" strokeWidth="8" strokeLinecap="round"
            filter="url(#cl-halo)" style={{ opacity: 0.5 }}
          />
        ))}

        {/* Bead — bright core */}
        {ANIM.map(({ id, d }) => (
          <path
            key={`c-${id}`} id={`cl-core-${id}`}
            d={d} fill="none"
            stroke="rgba(255,225,210,1)" strokeWidth="2" strokeLinecap="round"
            filter="url(#cl-tight)"
          />
        ))}
      </svg>
    </div>
  );
}
