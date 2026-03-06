import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SportsSection from "@/components/SportsSection";

export const metadata: Metadata = {
  title: "Sports — LIGR",
  description: "20+ sports with purpose-built overlays and automation.",
};

export default function SportsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SportsSection />
      <Footer />
    </main>
  );
}
