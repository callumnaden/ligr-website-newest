import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FeatureDetailHero, { type FeatureDetail } from "@/components/FeatureDetailHero";
import Footer from "@/components/Footer";

const featureDetails: Record<string, FeatureDetail> = {
  fuse: {
    name: "Fuse",
    badge: "Theme Builder",
    tagline: "Design broadcast overlays without code.",
    body: "Fuse is LIGR's advanced visual theme builder. Craft pixel-perfect broadcast graphics with a drag-and-drop interface, bind live match data, and publish directly to your production pipeline — all in real time.",
    color: "#FF504E",
    checks: [
      "Sport-specific scoreboard overlays",
      "Automated clock and period management",
      "Team logo and colour auto-population",
      "Player roster integration",
      "Event-driven graphic triggers",
      "Real-time stats overlays",
      "Customisable lower-thirds",
      "Pre-built Fuse templates",
      "Data feed connectors",
    ],
  },
  "ai-graphics": {
    name: "AI Graphics",
    badge: "Powered by Claude",
    tagline: "Describe it. Generate it. Broadcast it.",
    body: "Powered by Anthropic's Claude, AI Graphics transforms natural language prompts into broadcast-ready overlays. Describe what you want — including sport, style, and brand preferences — and watch professional graphics materialise in seconds.",
    color: "#9E77ED",
    checks: [
      "Text-to-overlay generation powered by Claude AI",
      "Understands sport-specific layouts and data structures",
      "Generates data-bound components, not static images",
      "Supports AFL, NRL, basketball, soccer and more",
      "Brand colour and style preference learning",
      "One-click apply to live broadcast",
      "Iteration via natural language refinement",
      "Export to Fuse theme library",
      "Full style and animation control",
    ],
  },
  "full-automation": {
    name: "Full Automation",
    badge: "Event-Driven",
    tagline: "Set it. Forget it. Broadcast it.",
    body: "LIGR's automation engine connects to live data feeds and runs your entire broadcast production without a single operator. Scores update, clocks tick, graphics trigger — all automatically, all in real time.",
    color: "#16B364",
    checks: [
      "Connect to scoring APIs and timing systems",
      "Auto-trigger graphics based on match events",
      "Smart clock management with period tracking",
      "Automated quarter and half-time sequences",
      "Goal, foul, and timeout graphic triggers",
      "Player substitution card automation",
      "Live stat overlay updates",
      "Custom event rule builder",
      "Multi-sport rules engine",
    ],
  },
  "cloud-streaming": {
    name: "Cloud Streaming",
    badge: "Multi-Destination",
    tagline: "Broadcast from anywhere to everywhere.",
    body: "LIGR's cloud-native streaming pipeline delivers sub-second latency with built-in CDN distribution. Stream to YouTube, Facebook, Twitch, or any RTMP destination — with broadcast-grade overlays composited in the cloud.",
    color: "#0BA5EC",
    checks: [
      "Sub-second glass-to-glass latency",
      "YouTube, Facebook and Twitch simultaneously",
      "Custom RTMP destination support",
      "Cloud-composited overlays — no local hardware",
      "HD 1080p60 output quality",
      "Automatic failover and redundancy",
      "Viewer analytics and peak monitoring",
      "Adaptive bitrate streaming",
      "Global CDN distribution",
    ],
  },
  "revenue-ads": {
    name: "Revenue & Ads",
    badge: "Monetisation",
    tagline: "Turn every broadcast into a revenue stream.",
    body: "Transform your broadcasts into revenue generators with automated sponsor placements, dynamic ad rotations, and detailed exposure analytics that prove ROI to your partners.",
    color: "#F79009",
    checks: [
      "Automated sponsor logo placement",
      "Dynamic ad roll scheduling",
      "Sponsor exposure analytics",
      "Pre, mid, and post-match ad breaks",
      "Customisable ad inventory management",
      "Second-by-second exposure tracking",
      "ROI reporting for sponsors",
      "Multi-sponsor rotation support",
      "Integrated billing dashboard",
    ],
  },
  "rive-animations": {
    name: "Rive Animations",
    badge: "Interactive Motion",
    tagline: "Next-gen motion, powered by interactivity.",
    body: "LIGR integrates Rive — the industry-leading interactive animation platform — to deliver buttery-smooth motion graphics that respond to live match events. Transitions, celebrations, and data reveals that feel alive.",
    color: "#EE46BC",
    checks: [
      "Rive-powered animations at 60fps",
      "Event-driven triggers for match moments",
      "State machine support for complex overlays",
      "Goal, timeout, and foul celebration animations",
      "Custom animation import via Rive editor",
      "Real-time state machine control",
      "Smooth transitions between graphic states",
      "Interactive data-driven animations",
      "Export and share animation packages",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(featureDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = featureDetails[slug];
  if (!feature) return {};
  return {
    title: `${feature.name} — LIGR`,
    description: `${feature.tagline} ${feature.body}`,
  };
}

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = featureDetails[slug];
  if (!feature) notFound();

  return (
    <>
      <Navbar />
      <FeatureDetailHero feature={feature} />
      <Footer />
    </>
  );
}
