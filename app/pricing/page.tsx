import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";

export const metadata = {
  title: "Pricing — LIGR",
  description: "Simple, transparent pricing for sports broadcast production.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PricingSection />
      <Footer />
    </main>
  );
}
