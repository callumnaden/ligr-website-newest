"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function ArrowUpRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M5 15L15 5M15 5H5M15 5v10" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PostImage({ gradient }: { gradient: string }) {
  return (
    <div
      className="w-full aspect-[384/256] shrink-0 relative overflow-hidden"
      style={{ background: gradient }}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
    </div>
  );
}

interface Post {
  category: string;
  title: string;
  excerpt: string;
  gradient: string;
  href: string;
}

function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={post.href}
      className="blog-card flex-1 min-w-[320px] group cursor-pointer gradient-border-wrap"
    >
      <div className="relative z-[1] flex flex-col bg-[#13161B] rounded-2xl overflow-hidden flex-1">
        <PostImage gradient={post.gradient} />
        <div className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#CECFD2]">{post.category}</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-4">
                <p className="flex-1 text-lg font-semibold text-[#F7F7F7] leading-7 group-hover:text-white transition-colors">
                  {post.title}
                </p>
                <span className="text-[#61656C] group-hover:text-[#CECFD2] transition-colors mt-0.5">
                  <ArrowUpRight />
                </span>
              </div>
              <p className="text-base text-[#94979C] leading-6">{post.excerpt}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

interface Section {
  label: string;
  posts: Post[];
}

const sections: Section[] = [
  {
    label: "Product",
    posts: [
      {
        category: "Product Launch",
        title: "Introducing LIGR Fuse — Design Broadcast Graphics in Rive, Deploy to Air",
        excerpt: "The graphics configuration engine that connects Rive designs directly to live broadcast production — no developers, no code, no limits.",
        gradient: "linear-gradient(135deg, #3d1212 0%, #2a0d0d 40%, #0f0f17 100%)",
        href: "/blog/ligr-fuse-launch-rive-integration",
      },
      {
        category: "Product Guide",
        title: "LIGR Fuse — Graphics Configuration & Publishing",
        excerpt: "Design in Rive. Configure in Fuse. Publish to air. A complete guide to Rive integration, data binding, control variables, and theme publishing.",
        gradient: "linear-gradient(135deg, #1a0d2d 0%, #120a20 40%, #0f0f17 100%)",
        href: "/blog/fuse",
      },
      {
        category: "Why LIGR",
        title: "Why Stream to LIGR — The Case for Professional Broadcast Graphics",
        excerpt: "Your automated camera captures the action. LIGR transforms it into a professional broadcast with graphics, sponsors, highlights, and multi-platform delivery.",
        gradient: "linear-gradient(135deg, #2d1a0d 0%, #1a0f08 40%, #0f0f17 100%)",
        href: "/blog/why-stream-to-ligr",
      },
    ],
  },
  {
    label: "Camera Integrations",
    posts: [
      {
        category: "Pixellot",
        title: "How to Stream from Pixellot to LIGR",
        excerpt: "Connect your Pixellot AI camera to LIGR for broadcast-quality graphics, sponsor overlays, and fully automated production without camera operators.",
        gradient: "linear-gradient(135deg, #0d1a2d 0%, #0a1220 40%, #0f0f17 100%)",
        href: "/blog/stream-pixellot-to-ligr",
      },
      {
        category: "Veo",
        title: "How to Stream from Veo to LIGR",
        excerpt: "Transform your Veo camera feed into a professional broadcast with TV-quality graphics, sponsor overlays, and fully automated production.",
        gradient: "linear-gradient(135deg, #0d2d1a 0%, #0a200e 40%, #0f0f17 100%)",
        href: "/blog/stream-veo-to-ligr",
      },
      {
        category: "Hudl Focus",
        title: "How to Stream from Hudl Focus to LIGR",
        excerpt: "Combine Hudl Focus camera feeds with professional LIGR graphics and sponsor advertising using OBS Studio as your streaming bridge.",
        gradient: "linear-gradient(135deg, #1a0d2d 0%, #130a20 40%, #0f0f17 100%)",
        href: "/blog/stream-hudl-focus-to-ligr",
      },
      {
        category: "Spiideo",
        title: "How to Stream from Spiideo to LIGR",
        excerpt: "Connect your Spiideo camera via RTMP or SRT for fully automated graphics production and sponsor revenue on every live broadcast.",
        gradient: "linear-gradient(135deg, #0d2a2a 0%, #081a1a 40%, #0f0f17 100%)",
        href: "/blog/stream-spiideo-to-ligr",
      },
      {
        category: "AI Cameras",
        title: "How to Stream AI Cameras to LIGR",
        excerpt: "Connect any RTMP-capable AI sports camera to LIGR for broadcast graphics, automated scoreboards, and multi-platform distribution.",
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #121212 40%, #0f0f17 100%)",
        href: "/blog/stream-vios-ai-cameras-to-ligr",
      },
    ],
  },
  {
    label: "Broadcast Software",
    posts: [
      {
        category: "OBS Studio",
        title: "How to Stream from OBS Studio to LIGR",
        excerpt: "Transform your OBS stream into a professional broadcast with TV-quality graphics, live scoring, and sponsor overlays — zero operators required.",
        gradient: "linear-gradient(135deg, #1a1212 0%, #120d0d 40%, #0f0f17 100%)",
        href: "/blog/stream-obs-to-ligr",
      },
      {
        category: "vMix",
        title: "How to Stream from vMix to LIGR",
        excerpt: "Route your vMix production through LIGR for cloud-based broadcast graphics, automated overlays, and sponsor monetisation on every stream.",
        gradient: "linear-gradient(135deg, #0d1a2d 0%, #080f1a 40%, #0f0f17 100%)",
        href: "/blog/stream-vmix-to-ligr",
      },
      {
        category: "Wirecast",
        title: "How to Stream from Wirecast to LIGR",
        excerpt: "Add professional broadcast graphics and automated production to your Wirecast streams via RTMP for a complete broadcast workflow.",
        gradient: "linear-gradient(135deg, #2d1a0d 0%, #1a0f08 40%, #0f0f17 100%)",
        href: "/blog/stream-wirecast-to-ligr",
      },
      {
        category: "StreamYard",
        title: "How to Stream from StreamYard to LIGR",
        excerpt: "Upgrade your browser-based StreamYard studio with professional LIGR graphics, automated scoreboards, and sponsor overlays.",
        gradient: "linear-gradient(135deg, #2d0d1a 0%, #1a0810 40%, #0f0f17 100%)",
        href: "/blog/stream-streamyard-to-ligr",
      },
      {
        category: "Blackmagic ATEM",
        title: "How to Stream from Blackmagic ATEM to LIGR",
        excerpt: "Pair your ATEM hardware switcher with LIGR's cloud graphics pipeline for broadcast-quality overlays and automated production.",
        gradient: "linear-gradient(135deg, #0d0d0d 0%, #111113 40%, #0f0f17 100%)",
        href: "/blog/stream-blackmagic-atem-to-ligr",
      },
      {
        category: "Teradek",
        title: "How to Stream from Teradek to LIGR",
        excerpt: "Route your Teradek encoder feed through LIGR for professional broadcast graphics, sponsor integration, and multi-platform streaming.",
        gradient: "linear-gradient(135deg, #0d1a12 0%, #091410 40%, #0f0f17 100%)",
        href: "/blog/stream-teradek-to-ligr",
      },
    ],
  },
];

export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-hero-text > *",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-[72px] md:pt-20 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 95%)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24 relative">
          <div className="blog-hero-text max-w-[795px] flex flex-col gap-6">
            <p className="text-base font-semibold text-[#CECFD2]">Blog</p>
            <h1
              className="text-[48px] md:text-[56px] lg:text-[60px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{
                background: "linear-gradient(170deg, #FF504E 0%, #FF8A65 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Insights for Sports Broadcasting
            </h1>
            <p className="text-xl font-normal text-[#F7F7F7] leading-[30px] max-w-[768px]">
              Integration guides, product deep-dives, and strategies for professional live sports streaming.
            </p>
          </div>
        </div>
      </section>

      {/* Blog sections */}
      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-16">
          {sections.map((section) => (
            <div key={section.label} className="flex flex-col gap-8">
              <p className="text-base font-semibold text-[#94979C]">{section.label}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-12">
                {section.posts.map((post) => (
                  <PostCard key={post.href} post={post} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
