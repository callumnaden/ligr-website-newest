import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import FeaturesTabbed from "@/components/FeaturesTabbed";
import Metrics from "@/components/Metrics";
import FeatureRows from "@/components/FeatureRows";
import AIDesignSection from "@/components/AIDesignSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-[#f7f7f7]">
      <Navbar />
      <Hero />
      <SocialProof />
      <FeaturesTabbed />
      <Metrics />
      <FeatureRows />
      <AIDesignSection />
      <CTASection />
      <Footer />
    </main>
  );
}
