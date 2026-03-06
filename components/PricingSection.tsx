"use client";
import { useState } from "react";

/* ── Icons ───────────────────────────────────────────────────────────────── */
function CardCheck() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="rgba(255,80,78,0.5)"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="#FF504E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GreenCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="9" stroke="#17B26A" strokeWidth="1.5" />
      <path
        d="M5.5 10l3 3 5.5-6"
        stroke="#17B26A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GrayMinus() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="9" stroke="#85888E" strokeWidth="1.5" />
      <path
        d="M6.5 10h7"
        stroke="#85888E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────────────────────── */
const TOP_TIERS = [
  {
    key: "free",
    name: "Free plan",
    monthly: 0,
    annual: 0,
    desc: "Get started with basic overlays and see what LIGR can do.",
    upSellLabel: "What's included",
    upSellSub: "",
    features: [
      "1 sport",
      "Basic scoreboard overlay",
      "LIGR watermark",
      "720p streaming",
      "Community support",
    ],
  },
  {
    key: "starter",
    name: "Starter plan",
    monthly: 29,
    annual: 23,
    desc: "For clubs and leagues getting started with live production.",
    upSellLabel: "What's included",
    upSellSub: "Everything in our Free plan plus...",
    features: [
      "3 sports",
      "Standard overlay pack",
      "No watermark",
      "1080p streaming",
      "Plus even more...",
    ],
  },
  {
    key: "growth",
    name: "Growth plan",
    monthly: 49,
    annual: 39,
    desc: "For growing organisations with multiple competitions.",
    upSellLabel: "What's included",
    upSellSub: "Everything in our Starter plan plus...",
    features: [
      "Advanced custom fields",
      "Audit log and data history",
      "Unlimited individual users",
      "Unlimited individual data",
      "Plus even more...",
    ],
  },
] as const;

const PRO_FEATURES_LEFT = [
  "20+ sports",
  "AI Graphics (Claude-powered)",
  "Rive animations",
  "Full automation engine",
  "4K streaming",
];
const PRO_FEATURES_RIGHT = [
  "Priority support",
  "Multi-destination streaming",
  "Cloud recording",
  "Sponsor placements",
  "Plus even more...",
];

const ENT_FEATURES_LEFT = [
  "200+ integrations",
  "Advanced reporting & analytics",
  "Up to 20 individual users",
  "40 GB individual data",
  "Priority chat and email support",
];
const ENT_FEATURES_RIGHT = [
  "White-label platform",
  "REST API + Webhooks",
  "Custom sport configuration",
  "Dedicated account manager",
  "SLA guarantee",
];

type CellVal = boolean | string | number;

const TABLE = [
  {
    label: "Production",
    rows: [
      {
        feature: "Sports supported",
        vals: [1, 3, 10, "20+", "Unlimited"] as CellVal[],
      },
      {
        feature: "Overlay library",
        vals: ["Basic", "Standard", "Full", "Full + AI", "Custom"] as CellVal[],
      },
      {
        feature: "Fuse theme builder",
        vals: [false, "Basic", "Advanced", "Advanced", "Custom"] as CellVal[],
      },
      {
        feature: "AI Graphics",
        vals: [false, false, false, true, true] as CellVal[],
      },
      {
        feature: "Rive animations",
        vals: [false, false, false, true, true] as CellVal[],
      },
      {
        feature: "Full automation",
        vals: [false, false, false, true, true] as CellVal[],
      },
    ],
  },
  {
    label: "Streaming",
    rows: [
      {
        feature: "Max resolution",
        vals: ["720p", "1080p", "1080p60", "4K", "4K+"] as CellVal[],
      },
      {
        feature: "Simultaneous streams",
        vals: [1, 1, 3, 10, "Unlimited"] as CellVal[],
      },
      {
        feature: "Multi-destination",
        vals: [false, true, true, true, true] as CellVal[],
      },
      {
        feature: "Cloud recording",
        vals: [false, false, true, true, true] as CellVal[],
      },
    ],
  },
  {
    label: "Monetisation",
    rows: [
      {
        feature: "Sponsor placements",
        vals: [false, false, true, true, true] as CellVal[],
      },
      {
        feature: "Dynamic ad rolls",
        vals: [false, false, true, true, true] as CellVal[],
      },
      {
        feature: "Exposure analytics",
        vals: [false, false, true, true, true] as CellVal[],
      },
      {
        feature: "Sponsor portal",
        vals: [false, false, false, true, true] as CellVal[],
      },
    ],
  },
  {
    label: "Support",
    rows: [
      {
        feature: "Community forum",
        vals: [true, true, true, true, true] as CellVal[],
      },
      {
        feature: "Email support",
        vals: [false, true, true, true, true] as CellVal[],
      },
      {
        feature: "Priority support",
        vals: [false, false, true, true, true] as CellVal[],
      },
      {
        feature: "Dedicated manager",
        vals: [false, false, false, false, true] as CellVal[],
      },
      {
        feature: "SLA guarantee",
        vals: [false, false, false, false, true] as CellVal[],
      },
    ],
  },
];

const TABLE_COLS = [
  { label: "Free", cta: "Start Free", href: "#", primary: false },
  { label: "Starter", cta: "Get Starter", href: "#", primary: false },
  { label: "Growth", cta: "Get Growth", href: "#", primary: false },
  { label: "Pro", cta: "Get Pro", href: "#", primary: true, badge: "Popular" },
  {
    label: "Enterprise",
    cta: "Get Enterprise",
    href: "/contact",
    primary: false,
  },
];

type MobilePlan = {
  label: string;
  colIdx: number;
  monthly: number | null;
  annual: number | null;
  desc: string;
  cta: string;
  href: string;
  badge: string | null;
};

const MOBILE_PLANS: MobilePlan[] = [
  { label: "Free", colIdx: 0, monthly: 0, annual: 0, desc: "Get started with basic overlays and see what LIGR can do.", cta: "Get started free", href: "#", badge: null },
  { label: "Starter", colIdx: 1, monthly: 29, annual: 23, desc: "For clubs and leagues getting started with live production.", cta: "Get started", href: "#", badge: null },
  { label: "Growth", colIdx: 2, monthly: 49, annual: 39, desc: "For growing organisations with multiple competitions.", cta: "Get started", href: "#", badge: null },
  { label: "Pro", colIdx: 3, monthly: 79, annual: 63, desc: "Our plan for serious sports organisations.", cta: "Get started", href: "#", badge: "Popular" },
  { label: "Enterprise", colIdx: 4, monthly: null, annual: null, desc: "For national federations and professional broadcasters.", cta: "Contact us", href: "/contact", badge: null },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function renderCell(val: CellVal, rowIndex: number) {
  const bg = rowIndex % 2 === 0 ? "bg-[#13161B]" : "";
  if (val === true)
    return (
      <div className={`flex h-16 items-center justify-center ${bg}`}>
        <GreenCheck />
      </div>
    );
  if (val === false)
    return (
      <div className={`flex h-16 items-center justify-center ${bg}`}>
        <GrayMinus />
      </div>
    );
  return (
    <div className={`flex h-16 items-center justify-center ${bg}`}>
      <span className="text-sm font-normal text-[#94979C] text-center">
        {val}
      </span>
    </div>
  );
}

function renderMobileCell(val: CellVal) {
  if (val === true) return <GreenCheck />;
  if (val === false) return <GrayMinus />;
  return <span className="text-sm font-normal text-[#94979C]">{val}</span>;
}

/* ── Mobile plan card ────────────────────────────────────────────────────── */
function MobilePlanCard({ plan, annual }: { plan: MobilePlan; annual: boolean }) {
  const price =
    plan.monthly === null
      ? "Custom"
      : plan.monthly === 0
      ? "$0"
      : annual && plan.annual !== null
      ? `$${plan.annual}`
      : `$${plan.monthly}`;
  const perMonth =
    plan.monthly === null
      ? "/ mo"
      : annual && plan.monthly > 0
      ? "/ mo, billed annually"
      : "/ mo";

  return (
    <div className="border border-[#FF504E] rounded-2xl bg-[#13161B] overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <p className="text-base font-semibold text-[#94979C]">{plan.label}</p>
          {plan.badge && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#55160C] border border-[#912018] text-[#FDA29B]">
              {plan.badge}
            </span>
          )}
        </div>
        <div className="flex items-end gap-1.5">
          <span className="text-[48px] font-semibold text-[#F7F7F7] leading-none tracking-[-0.02em]">
            {price}
          </span>
          <span className="text-sm font-medium text-[#94979C] pb-1.5">{perMonth}</span>
        </div>
        <p className="text-sm font-normal text-[#94979C] leading-5">{plan.desc}</p>
        <a
          href={plan.href}
          className="flex items-center justify-center w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#FF504E] shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:opacity-90 transition-opacity"
        >
          {plan.cta}
        </a>
      </div>
      {/* Feature table */}
      <div className="border-t border-[#22262F]">
        {TABLE.map((section) => (
          <div key={section.label}>
            <div className="px-6 py-3 border-b border-[#22262F]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#CECFD2]">
                {section.label}
              </span>
            </div>
            {section.rows.map((row, ri) => (
              <div
                key={row.feature}
                className={`flex items-center justify-between px-6 h-12 border-b border-[#22262F] last:border-b-0 ${ri % 2 === 0 ? "bg-[#0C0E12]" : ""}`}
              >
                <span className="text-sm text-[#F7F7F7]">{row.feature}</span>
                {renderMobileCell(row.vals[plan.colIdx])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  function getPrice(monthly: number, ann: number) {
    return annual ? ann : monthly;
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-[72px] md:pt-20 px-4 md:px-6 pb-0">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24 flex flex-col gap-8 md:gap-12">
          {/* Heading group */}
          <div className="flex flex-col gap-4 max-w-[768px]">
            <p className="text-base font-semibold text-[#CECFD2]">Pricing</p>
            <div className="flex flex-col gap-6">
              <h1
                className="text-[36px] md:text-[72px] font-extrabold italic uppercase leading-none font-[family-name:var(--font-roboto-condensed)]"
                style={{
                  background:
                    "linear-gradient(135deg, #FF504E 0%, #FF8A65 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Simple, transparent pricing.
              </h1>
              <p className="text-lg md:text-xl font-normal text-[#F7F7F7] leading-[1.6] max-w-[600px]">
                Start free. Scale as you grow. No hidden fees, no long-term
                contracts.
              </p>
            </div>
          </div>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-[#0C0E12] border border-[#22262F] rounded-xl p-1.5 gap-1 w-fit">
            {(["Monthly billing", "Annual billing"] as const).map((label) => {
              const active = label === "Monthly billing" ? !annual : annual;
              return (
                <button
                  key={label}
                  onClick={() => setAnnual(label === "Annual billing")}
                  className={`px-3 py-2 rounded-lg text-base font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "bg-[#13161B] text-[#CECFD2] shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                      : "text-[#94979C] hover:text-[#CECFD2]"
                  }`}
                >
                  {label}
                  {label === "Annual billing" && (
                    <span
                      className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                        active
                          ? "bg-[#FF504E]/20 text-[#FF504E]"
                          : "bg-[#1D202A] text-[#94979C]"
                      }`}
                    >
                      Save 20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing cards ────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-0 md:px-8">

          {/* Mobile: one card per plan with embedded feature table */}
          <div className="md:hidden flex flex-col gap-6">
            {MOBILE_PLANS.map((plan) => (
              <MobilePlanCard key={plan.label} plan={plan} annual={annual} />
            ))}
          </div>

          {/* Desktop: grid layout */}
          <div className="hidden md:flex flex-col gap-8">
            {/* Row 1: Free / Starter / Growth */}
            <div className="grid grid-cols-3 gap-8">
              {TOP_TIERS.map((tier) => {
                const p = getPrice(tier.monthly, tier.annual);
                return (
                  <div key={tier.key} className="gradient-border-wrap">
                  <div
                    className="relative z-[1] flex flex-col bg-[#13161B] rounded-2xl overflow-hidden flex-1"
                  >
                    {/* Card header */}
                    <div className="p-8 flex flex-col gap-8">
                      {/* Heading & price */}
                      <div className="flex flex-col gap-4">
                        <p className="text-lg font-semibold text-[#94979C]">
                          {tier.name}
                        </p>
                        <div className="flex items-end gap-1">
                          <span className="text-[60px] font-semibold text-[#F7F7F7] leading-[72px] tracking-[-0.02em]">
                            {p === 0 ? "$0" : `$${p}`}
                          </span>
                          <span className="text-base font-medium text-[#94979C] mb-2">
                            {annual && tier.monthly > 0
                              ? "/ mo, billed annually"
                              : "/ mo"}
                          </span>
                        </div>
                        <p className="text-base font-normal text-[#94979C] leading-6">
                          {tier.desc}
                        </p>
                      </div>
                      {/* Actions */}
                      <div className="flex flex-col gap-3">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full py-3 px-[18px] rounded-lg text-base font-semibold text-white bg-[#FF504E] shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:opacity-90 transition-opacity"
                        >
                          Get started
                        </a>
                        <a
                          href="/contact"
                          className="flex items-center justify-center w-full py-3 px-[18px] rounded-lg text-base font-semibold text-[#CECFD2] bg-[#1D202A] border border-[#373A41] shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:bg-[#22262F] transition-colors"
                        >
                          Chat to sales
                        </a>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="border-t border-[#22262F] p-8 flex flex-col gap-6 flex-1">
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-semibold text-[#F7F7F7]">
                          {tier.upSellLabel}
                        </p>
                        {tier.upSellSub && (
                          <p className="text-base font-normal text-[#94979C]">
                            {tier.upSellSub}
                          </p>
                        )}
                      </div>
                      <ul className="flex flex-col gap-4">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <CardCheck />
                            <span className="text-base font-normal text-[#94979C] leading-6">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>

            {/* Row 2: Pro + Enterprise */}
            <div className="grid grid-cols-3 gap-8">
              {/* Pro */}
              <div className="gradient-border-wrap">
              <div className="relative z-[1] flex flex-col bg-[#13161B] rounded-2xl overflow-hidden flex-1">
                <div className="p-8 flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-semibold text-[#94979C]">
                        Pro plan
                      </p>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#55160C] border border-[#912018] text-[#FDA29B]">
                        Popular
                      </span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-[60px] font-semibold text-[#F7F7F7] leading-[72px] tracking-[-0.02em]">
                        ${getPrice(79, 63)}
                      </span>
                      <span className="text-base font-medium text-[#94979C] mb-2">
                        {annual ? "/ mo, billed annually" : "/ mo"}
                      </span>
                    </div>
                    <p className="text-base font-normal text-[#94979C] leading-6">
                      Our plan for serious sports organisations.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href="#"
                      className="flex items-center justify-center w-full py-3 px-[18px] rounded-lg text-base font-semibold text-white bg-[#FF504E] shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:opacity-90 transition-opacity"
                    >
                      Get started
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center justify-center w-full py-3 px-[18px] rounded-lg text-base font-semibold text-[#CECFD2] bg-[#1D202A] border border-[#373A41] shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:bg-[#22262F] transition-colors"
                    >
                      Chat to sales
                    </a>
                  </div>
                </div>
                <div className="border-t border-[#22262F] p-8 flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-[#F7F7F7]">
                      What's included
                    </p>
                    <p className="text-base font-normal text-[#94979C]">
                      Everything in our Growth plan plus...
                    </p>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {PRO_FEATURES_LEFT.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CardCheck />
                        <span className="text-base font-normal text-[#94979C] leading-6">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              </div>

              {/* Enterprise */}
              <div className="col-span-2 gradient-border-wrap">
              <div className="relative z-[1] flex flex-col bg-[#13161B] rounded-2xl overflow-hidden flex-1">
                <div className="p-8 flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold text-[#94979C]">
                      Enterprise plan
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-[60px] font-semibold text-[#F7F7F7] leading-[72px] tracking-[-0.02em]">
                        Custom
                      </span>
                      <span className="text-base font-medium text-[#94979C] mb-2">
                        / mo
                      </span>
                    </div>
                    <p className="text-base font-normal text-[#94979C] leading-6">
                      For national federations and professional broadcasters.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="flex items-center justify-center w-full sm:w-auto flex-1 py-3 px-[18px] rounded-lg text-base font-semibold text-white bg-[#FF504E] shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:opacity-90 transition-opacity"
                    >
                      Get started
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center justify-center w-full sm:w-auto flex-1 py-3 px-[18px] rounded-lg text-base font-semibold text-[#CECFD2] bg-[#1D202A] border border-[#373A41] shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:bg-[#22262F] transition-colors"
                    >
                      Chat to sales
                    </a>
                  </div>
                </div>
                <div className="border-t border-[#22262F] p-8 flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-[#F7F7F7]">
                      What's included
                    </p>
                    <p className="text-base font-normal text-[#94979C]">
                      Everything in our Pro plan plus...
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {[...ENT_FEATURES_LEFT, ...ENT_FEATURES_RIGHT].map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <CardCheck />
                        <span className="text-base font-normal text-[#94979C] leading-6">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Compare Plans (desktop only) ─────────────────────────────────── */}
      <section className="hidden md:block px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-0 md:px-8">
          {/* Section heading */}
          <div className="mb-8 flex flex-col gap-5">
            <h2
              className="text-[32px] md:text-[36px] font-semibold leading-[44px] tracking-[-0.02em]"
              style={{
                background: "linear-gradient(135deg, #FF504E 0%, #FF8A65 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Compare Plans
            </h2>
            <p className="text-xl font-normal text-[#94979C]">
              A detailed breakdown of what&apos;s included in each tier.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <div style={{ minWidth: 760 }}>
              {/* Column headers */}
              <div className="grid grid-cols-6 border-b border-[#22262F]">
                <div className="h-[46px] px-6 flex items-center border-b border-[#22262F]" />
                {TABLE_COLS.map((col) => (
                  <div
                    key={col.label}
                    className="h-[46px] px-6 flex items-center justify-center gap-2 border-b border-[#22262F]"
                  >
                    <span className="text-xl font-semibold text-[#F7F7F7]">
                      {col.label}
                    </span>
                    {col.badge && (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#55160C] border border-[#912018] text-[#FDA29B]">
                        {col.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Table sections */}
              {TABLE.map((section) => (
                <div key={section.label} className="border-b border-[#22262F]">
                  <div className="grid grid-cols-6">
                    <div className="h-9 px-6 flex items-center">
                      <span className="text-sm font-semibold text-[#CECFD2]">
                        {section.label}
                      </span>
                    </div>
                    {TABLE_COLS.map((col) => (
                      <div key={col.label} className="h-9" />
                    ))}
                  </div>

                  {section.rows.map((row, ri) => (
                    <div key={row.feature} className="grid grid-cols-6">
                      <div
                        className={`h-16 px-6 flex items-center ${ri % 2 === 0 ? "bg-[#13161B]" : ""}`}
                      >
                        <span className="text-sm font-medium text-[#F7F7F7]">
                          {row.feature}
                        </span>
                      </div>
                      {row.vals.map((val, ci) => (
                        <div key={ci}>{renderCell(val, ri)}</div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              {/* Footer CTA row */}
              <div className="grid grid-cols-6 pt-10 pb-8 gap-3">
                <div />
                {TABLE_COLS.map((col) => (
                  <div key={col.label} className="px-3">
                    <a
                      href={col.href}
                      className={`flex items-center justify-center w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                        col.primary
                          ? "bg-[#FF504E] text-white shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)] hover:opacity-90"
                          : "bg-[#0C0E12] border border-[#373A41] text-[#CECFD2] hover:bg-[#13161B]"
                      }`}
                    >
                      {col.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tablet: scrollable table */}
          <div className="lg:hidden">
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-[#22262F]">
                    <th className="text-left px-0 py-3 text-base font-semibold text-[#F7F7F7] w-1/3">
                      Feature
                    </th>
                    {TABLE_COLS.map((col) => (
                      <th
                        key={col.label}
                        className="text-center px-2 py-3 text-sm font-semibold text-[#CECFD2]"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((section) => (
                    <>
                      <tr key={`${section.label}-head`}>
                        <td
                          colSpan={6}
                          className="pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-[#CECFD2]"
                        >
                          {section.label}
                        </td>
                      </tr>
                      {section.rows.map((row, ri) => (
                        <tr
                          key={row.feature}
                          className={`border-t border-[#22262F] ${ri % 2 === 0 ? "bg-[#13161B]" : ""}`}
                        >
                          <td className="py-3 px-0 text-sm text-[#F7F7F7]">
                            {row.feature}
                          </td>
                          {row.vals.map((val, ci) => (
                            <td key={ci} className="py-3 px-2 text-center">
                              {val === true ? (
                                <span className="flex justify-center">
                                  <GreenCheck />
                                </span>
                              ) : val === false ? (
                                <span className="flex justify-center">
                                  <GrayMinus />
                                </span>
                              ) : (
                                <span className="text-xs text-[#94979C]">
                                  {val}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {TABLE_COLS.map((col) => (
                <a
                  key={col.label}
                  href={col.href}
                  className={`flex items-center justify-between w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                    col.primary
                      ? "bg-[#FF504E] text-white"
                      : "bg-[#13161B] border border-[#373A41] text-[#CECFD2]"
                  }`}
                >
                  <span>{col.label}</span>
                  <span>{col.cta} →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-6 pb-4 md:pb-6">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="rounded-2xl relative overflow-hidden"
            style={{ background: '#2A2D3D' }}
          >
            <div className="mesh-blob mesh-blob-1" />
            <div className="mesh-blob mesh-blob-2" />
            <div className="mesh-blob mesh-blob-3" />
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
              <div className="max-w-[768px] flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                  <h2 className="text-[30px] md:text-[36px] font-semibold leading-[1.22] tracking-[-0.02em] text-[#F7F7F7]">
                    Not sure what plan is right?
                  </h2>
                  <p className="text-lg md:text-xl font-normal text-[#F7F7F7] leading-[1.6] max-w-[600px]">
                    Talk to our team. We'll help you find the perfect setup for your sport, scale, and budget.
                  </p>
                </div>
                <div>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white text-[#FF504E] font-semibold px-[18px] py-3 rounded-lg text-base hover:bg-white/90 transition-colors shadow-[0_1px_2px_rgba(10,13,18,0.05),inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05)]"
                  >
                    Chat to sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
