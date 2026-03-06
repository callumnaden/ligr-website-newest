"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const justExpandedRef = useRef(false);
  const firstRectRef = useRef<DOMRect | null>(null);

  // Entrance animation (runs once on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".h-badge", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(".h-heading", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2")
        .fromTo(".h-ctas", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".h-sub", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(".h-video", { y: 24, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, "-=0.5");
    }, ref);
    return () => ctx.revert();
  }, []);

  // FLIP animation — runs synchronously after DOM updates when expanded
  useLayoutEffect(() => {
    if (!justExpandedRef.current || !videoRef.current || !firstRectRef.current) return;
    justExpandedRef.current = false;

    const first = firstRectRef.current;
    const last = videoRef.current.getBoundingClientRect();

    // FLIP the video from its old position to the new full-width position
    gsap.fromTo(
      videoRef.current,
      {
        x: first.left - last.left,
        y: first.top - last.top,
        scaleX: first.width / last.width,
        scaleY: first.height / last.height,
        transformOrigin: "top left",
      },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.7, ease: "power3.inOut" },
    );

    // Fade in the non-video expanded elements
    const textEls = ref.current?.querySelectorAll(".hero-expand-text") ?? [];
    gsap.fromTo(
      textEls,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.15, stagger: 0.08, ease: "power2.out" },
    );

    // Smooth scroll so the video is centered in the viewport
    const videoCenterY = window.scrollY + last.top + last.height / 2;
    const scrollTarget = Math.max(0, videoCenterY - window.innerHeight / 2);
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  }, [expanded]);

  const handleExpand = () => {
    if (expanded || !videoRef.current) return;
    firstRectRef.current = videoRef.current.getBoundingClientRect();
    justExpandedRef.current = true;
    setExpanded(true);
  };

  return (
    <section
      ref={ref}
      className={`pt-[72px] md:pt-20 px-4 md:px-6 pb-6 flex flex-col${expanded ? "" : " md:h-screen md:min-h-[720px]"}`}
    >
      <div className="max-w-[1920px] mx-auto w-full flex-1 flex flex-col">
        {/* Gradient card */}
        <div className="rounded-2xl relative overflow-hidden flex flex-col flex-1" style={{ background: '#2A2D3D' }}>
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
          <div className="absolute inset-0 dot-grid pointer-events-none" />

          <div className="relative z-10 flex-1 max-w-[1280px] w-full mx-auto px-6 md:px-8 pt-10 md:pt-16 pb-10 md:pb-16 flex flex-col">
            {expanded ? (
              /* ── Expanded layout ── */
              <div className="flex flex-col gap-12">
                {/* Badge + heading + CTAs */}
                <div className="max-w-[740px] flex flex-col gap-12 hero-expand-text">
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2 bg-[#FEF3F2] border border-[#FECDCA] rounded-full pl-1 pr-3 py-1 w-fit">
                      <span className="bg-white border border-[#FECDCA] rounded-full px-2.5 py-0.5 text-xs font-medium text-[#B42318]">
                        New!
                      </span>
                      <span className="text-sm font-medium text-[#B42318] flex items-center gap-1.5">
                        Now with AI Graphics &amp; Fuse
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7h9M8 3l4 4-4 4" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <h1 className="text-[36px] md:text-[72px] font-extrabold italic uppercase leading-none text-[#F7F7F7] font-[family-name:var(--font-roboto-condensed)]">
                      Broadcast-quality sports production for everyone.
                    </h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 border border-white text-[#F7F7F7] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/10 transition-colors shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8" stroke="#CECFD2" strokeWidth="1.5" />
                        <path d="M8.5 7.5l4 2.5-4 2.5V7.5z" fill="#CECFD2" />
                      </svg>
                      See it in action
                    </button>
                    <button className="bg-white text-[#FF504E] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/90 transition-colors shadow-[0_1px_2px_rgba(10,13,18,0.05),inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05)]">
                      Get started
                    </button>
                  </div>
                </div>

                {/* Supporting text */}
                <p className="hero-expand-text text-[18px] md:text-xl font-normal text-[#F7F7F7] leading-[28px] md:leading-[30px] max-w-[540px]">
                  From grassroots to elite — LIGR gives you AI-powered graphics,
                  automated overlays, and cloud streaming that make every game look like prime time.
                </p>

                {/* Full-width video */}
                <div
                  ref={videoRef}
                  className="w-full aspect-video relative overflow-hidden rounded-xl border border-[rgba(0,0,0,0.1)] shadow-[0_32px_64px_-12px_rgba(10,13,18,0.5),0_5px_5px_-2.5px_rgba(10,13,18,0.1)]"
                >
                  <img
                    src="/heroimage.gif"
                    alt="LIGR platform in action"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>
            ) : (
              /* ── Collapsed layout ── */
              <div className="flex flex-col gap-8 md:justify-between md:gap-0 md:flex-1">
                {/* Top: badge + heading + desktop CTAs */}
                <div className="max-w-[740px] flex flex-col gap-8 md:gap-12">
                  <div className="flex flex-col gap-4">
                    <div className="h-badge inline-flex items-center gap-2 bg-[#FEF3F2] border border-[#FECDCA] rounded-full pl-1 pr-3 py-1 w-fit">
                      <span className="bg-white border border-[#FECDCA] rounded-full px-2.5 py-0.5 text-xs font-medium text-[#B42318]">
                        New!
                      </span>
                      <span className="text-sm font-medium text-[#B42318] flex items-center gap-1.5">
                        Now with AI Graphics &amp; Fuse
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7h9M8 3l4 4-4 4" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <h1 className="h-heading text-[36px] md:text-[72px] font-extrabold italic uppercase leading-none text-[#F7F7F7] font-[family-name:var(--font-roboto-condensed)]">
                      Broadcast-quality sports production for everyone.
                    </h1>
                  </div>
                  <div className="h-ctas hidden md:flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 border border-white text-[#F7F7F7] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/10 transition-colors shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8" stroke="#CECFD2" strokeWidth="1.5" />
                        <path d="M8.5 7.5l4 2.5-4 2.5V7.5z" fill="#CECFD2" />
                      </svg>
                      See it in action
                    </button>
                    <button className="bg-white text-[#FF504E] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/90 transition-colors shadow-[0_1px_2px_rgba(10,13,18,0.05),inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05)]">
                      Get started
                    </button>
                  </div>
                </div>

                {/* Bottom: supporting text + video */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12">
                  <p className="h-sub text-[18px] md:text-xl font-normal text-[#F7F7F7] leading-[28px] md:leading-[30px] max-w-[540px]">
                    From grassroots to elite — LIGR gives you AI-powered graphics,
                    automated overlays, and cloud streaming that make every game
                    look like prime time.
                  </p>

                  {/* Video thumbnail */}
                  <div
                    ref={videoRef}
                    className="h-video w-full md:max-w-[400px] md:shrink-0 float group relative cursor-pointer"
                    onClick={handleExpand}
                    role="button"
                    aria-label="Expand video"
                  >
                    <img
                      src="/heroimage.gif"
                      alt="LIGR platform in action"
                      className="w-full block rounded-xl shadow-[0_32px_64px_-12px_rgba(10,13,18,0.5),0_5px_5px_-2.5px_rgba(10,13,18,0.1)]"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl transition-colors duration-200 bg-black/0 group-hover:bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M5.5 4L14 9l-8.5 5V4z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile CTAs */}
                <div className="h-ctas md:hidden flex flex-col gap-3">
                  <button className="w-full bg-white text-[#FF504E] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/90 transition-colors shadow-[0_1px_2px_rgba(10,13,18,0.05),inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05)]">
                    Get started
                  </button>
                  <button className="w-full inline-flex items-center justify-center gap-2 border border-white text-[#F7F7F7] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/10 transition-colors shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#CECFD2" strokeWidth="1.5" />
                      <path d="M8.5 7.5l4 2.5-4 2.5V7.5z" fill="#CECFD2" />
                    </svg>
                    See it in action
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
