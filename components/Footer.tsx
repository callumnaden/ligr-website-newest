"use client";
import LigrLogo from "./LigrLogo";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features" },
      { label: "Pricing" },
      { label: "Sports" },
      { label: "FUSE", badge: "New" },
      { label: "AI Graphics" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About" },
      { label: "Contact" },
      { label: "Careers" },
      { label: "Blog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation" },
      { label: "API Reference" },
      { label: "Status" },
      { label: "Support" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy" },
      { label: "Terms of Service" },
      { label: "Cookie Policy" },
    ],
  },
];

const socials = [
  {
    label: "X (Twitter)",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM10 15l5-3-5-3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="pt-12 md:pt-16 pb-12 px-4 md:px-6" style={{ borderTop: "1px solid #22262f" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Main footer grid */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <LigrLogo />
            <p className="text-sm font-normal text-[#61656c] max-w-[220px] leading-5">
              Broadcast-quality sports production for everyone.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 md:flex md:flex-wrap md:gap-12">
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4 min-w-[120px]">
                <h4 className="text-sm font-bold text-[#94979c]">{col.heading}</h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#94979c] hover:text-[#F7F7F7] transition-colors"
                      >
                        {link.label}
                        {"badge" in link && link.badge && (
                          <span className="text-[10px] font-semibold bg-[#FF504E]/10 text-[#FF504E] border border-[#FF504E]/20 rounded-full px-1.5 py-0.5 leading-none">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap justify-between items-center gap-6 pt-8"
          style={{ borderTop: "1px solid #22262f" }}
        >
          <p className="text-sm font-normal text-[#61656c]">
            © 2026 LIGR Systems Pty Ltd. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="text-[#61656c] hover:text-[#94979c] transition-colors"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
