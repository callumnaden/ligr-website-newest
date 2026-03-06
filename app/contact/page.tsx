import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — LIGR",
  description: "Whether you're a local club or a national federation — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <ContactHero />
      <ContactSection />
      <Footer />
    </div>
  );
}
