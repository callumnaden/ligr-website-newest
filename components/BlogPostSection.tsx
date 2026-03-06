import type { BlogPost } from "@/lib/blog-posts";
import BlogShareButtons from "./BlogShareButtons";

interface Props {
  post: BlogPost;
  content: string;
}

export default function BlogPostSection({ post, content }: Props) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-[72px] md:pt-20 overflow-hidden relative">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 95%)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 relative">
          <div className="max-w-[795px] flex flex-col gap-6">

            {/* Badge group: category + read time */}
            <div className="inline-flex items-center gap-2 bg-[#13161B] border border-[#373A41] rounded-full pl-1 pr-3 py-1 w-fit">
              <span className="bg-[#0C0E12] border border-[#373A41] rounded-full px-2 py-0.5 text-xs font-medium text-[#CECFD2] whitespace-nowrap">
                {post.category}
              </span>
              <span className="text-xs font-medium text-[#CECFD2] whitespace-nowrap">{post.readTime}</span>
            </div>

            {/* Heading */}
            <h1
              className="text-[44px] md:text-[56px] lg:text-[60px] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{
                background: "linear-gradient(165deg, #FF504E 0%, #FF8A65 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {post.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl font-normal text-[#F7F7F7] leading-[30px]">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pb-0">
          <div
            className="w-full rounded-xl overflow-hidden relative"
            style={{ aspectRatio: "19/10", background: post.gradient }}
          >
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
          </div>
        </div>
      </section>

      {/* ── Date + share row ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          {/* Published date */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-[#94979C]">Published on</span>
            <span className="text-lg font-medium text-[#F7F7F7]">{post.date}</span>
          </div>

          {/* Share buttons (client component) */}
          <BlogShareButtons title={post.title} />
        </div>
      </section>

      {/* ── Article + Sidebar ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 pb-24">
        <div className="flex flex-wrap gap-x-24 gap-y-16 items-start">

          {/* Main content */}
          <div className="flex-1 min-w-[320px] md:min-w-[560px] max-w-[720px]">
            {content ? (
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              /* Fallback: excerpt + external link */
              <div className="blog-prose">
                <h2>Overview</h2>
                <p>{post.excerpt}</p>
                <p>
                  Read the full guide on the LIGR blog for step-by-step instructions,
                  setup screenshots, and configuration tips.
                </p>
                <p>
                  <a
                    href={`https://ligr-blog-site.vercel.app/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read the full article →
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Sidebar newsletter card */}
          <aside className="w-full md:w-[384px] shrink-0 md:sticky md:top-24">
            <div className="bg-[#13161B] border border-[#22262F] rounded-2xl p-8 flex flex-col gap-8">
              {/* Icon */}
              <div className="w-14 h-14 bg-[#0C0E12] border border-[#373A41] rounded-xl flex items-center justify-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M25.667 14l-21 7 4.667-7-4.667-7 21 7z" stroke="#CECFD2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.333 14h16.334" stroke="#CECFD2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Text + form */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-semibold text-[#F7F7F7]">The Lineup Lowdown</p>
                  <p className="text-base font-normal text-[#94979C] leading-6">
                    Get the latest news, tips, and exclusive insights about live sports
                    broadcasting delivered straight to your inbox.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Email input */}
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full bg-[#0C0E12] border border-[#373A41] rounded-lg px-3.5 py-2.5 text-base text-[#F7F7F7] placeholder-[#85888E] outline-none focus:border-[#FF504E] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                    />
                    <p className="text-sm text-[#94979C]">We respect your privacy.</p>
                  </div>

                  {/* Submit button */}
                  <button className="w-full bg-[#FF504E] border-2 border-white/10 text-white font-semibold text-base rounded-lg px-4 py-3 hover:opacity-90 transition-opacity shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]">
                    Sign me up
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
