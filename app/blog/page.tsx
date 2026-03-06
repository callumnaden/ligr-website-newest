import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Blog — LIGR",
  description: "Integration guides, product deep-dives, and strategies for professional live sports streaming.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BlogSection />
      <Footer />
    </main>
  );
}
