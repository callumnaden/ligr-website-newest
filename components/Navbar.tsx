"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LigrLogo from "./LigrLogo";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Sports", href: "/sports" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1D202A]"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-[72px] md:h-20 flex items-center">
        {/* Logo */}
        <LigrLogo />

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-base font-semibold text-[#cecfd2] hover:text-white transition-colors rounded-lg"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="hidden md:inline-flex ml-6 gradient-wave text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]"
        >
          Get started
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className="space-y-1.5 w-5">
            <span className={`block h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0b0d13] border-t border-white/5 px-6 py-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="block py-2.5 text-base font-semibold text-[#cecfd2]">
              {link.label}
            </a>
          ))}
          <a href="#" className="mt-3 gradient-wave text-white font-semibold text-sm px-4 py-2.5 rounded-lg block text-center">
            Get started
          </a>
        </div>
      )}
    </nav>
  );
}
