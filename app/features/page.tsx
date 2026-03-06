import Navbar from "@/components/Navbar";
import FeaturesHero from "@/components/FeaturesHero";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Features — LIGR",
  description: "From AI-generated graphics to fully automated broadcasts — explore every tool in the LIGR platform.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <FeaturesHero />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
