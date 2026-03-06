import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostSection from "@/components/BlogPostSection";
import { blogPosts } from "@/lib/blog-posts";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — LIGR Blog`,
    description: post.excerpt,
  };
}

async function fetchArticleContent(slug: string): Promise<string> {
  try {
    const res = await fetch(`https://ligr-blog-site.vercel.app/blog/${slug}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return "";
    const html = await res.text();
    return extractContent(html);
  } catch {
    return "";
  }
}

function extractContent(html: string): string {
  // Strip scripts, styles, nav, header, footer
  let clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "");

  // Try to find the main article content
  const patterns: RegExp[] = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*class="[^"]*(?:prose|article-body|post-content|blog-content|rich-text)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const pattern of patterns) {
    const match = clean.match(pattern);
    if (match?.[1]?.trim().length > 100) {
      return sanitizeHtml(match[1]);
    }
  }
  return "";
}

function sanitizeHtml(html: string): string {
  return html
    // Remove class, style, id, data-* attributes
    .replace(/\s+(?:class|style|id|data-[^=\s]*)="[^"]*"/gi, "")
    // Remove presentation width/height attributes on img/iframe/video (CSS overrides)
    .replace(/(<(?:img|iframe|video)[^>]*?)\s+(?:width|height)="[^"]*"/gi, "$1")
    // Remove event handlers
    .replace(/\s+on\w+="[^"]*"/gi, "")
    // Remove empty divs/spans that add no value
    .replace(/<(div|span)[^>]*>\s*<\/\1>/gi, "")
    // Unwrap Next.js span-wrapped images
    .replace(/<span[^>]*>(\s*<img[^>]*>\s*)<\/span>/gi, "$1")
    .trim();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = await fetchArticleContent(slug);

  return (
    <main
      className="min-h-screen"
    >
      <Navbar />
      <BlogPostSection post={post} content={content} />
      <Footer />
    </main>
  );
}
