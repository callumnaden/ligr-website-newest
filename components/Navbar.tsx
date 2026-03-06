"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LigrLogo from "./LigrLogo";

const mobileNavCards = [
  { label: "Home", href: "/", gradient: true },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Sports", href: "/sports" },
];

const desktopLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Sports", href: "/sports" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Entrance animation — clear transform after so fixed children work correctly
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "all" }
    );
  }, []);

  // Animate menu items in on open
  useEffect(() => {
    if (mobileOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current.querySelectorAll(".mob-item"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power3.out" }
      );
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1D202A]"
      style={mobileOpen ? { bottom: 0 } : undefined}
    >
      {/* ── Header bar ── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-[72px] md:h-20 flex items-center justify-between">
        <LigrLogo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {desktopLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-base font-semibold text-[#cecfd2] hover:text-white transition-colors rounded-lg"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#"
          className="hidden md:inline-flex ml-6 gradient-wave text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]"
        >
          Get started
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#CECFD2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="#CECFD2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          ref={menuRef}
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="px-4 pt-6 pb-12 flex flex-col gap-6">
            {/* Nav cards */}
            <div className="flex flex-col gap-4">
              {mobileNavCards.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="mob-item w-full px-6 py-6 rounded-2xl block relative overflow-hidden"
                  style={
                    link.gradient
                      ? { background: "linear-gradient(135deg, #FF504E 0%, #2A2D3D 100%)" }
                      : { border: "1px solid #FF504E" }
                  }
                >
                  {link.gradient && (
                    <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
                  )}
                  <span className="relative text-[30px] font-bold leading-[44px] tracking-[-0.02em] text-[#F7F7F7]">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Buttons */}
            <div className="mob-item flex flex-col gap-4">
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center py-3 px-[18px] rounded-lg border border-white text-[#F7F7F7] font-semibold text-base hover:bg-white/10 transition-colors shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]"
              >
                Contact
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center py-3 px-[18px] rounded-lg bg-[#FF504E] text-white font-semibold text-base hover:bg-[#e04040] transition-colors shadow-[0_1px_2px_rgba(10,13,18,0.05),inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05)]"
              >
                Get started
              </a>
            </div>

            {/* Divider */}
            <div className="mob-item h-px bg-[#22262F]" />
          </div>
        </div>
      )}
    </nav>
  );
}
