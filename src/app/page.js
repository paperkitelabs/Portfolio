import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TrustedBySection from "@/components/TrustedBySection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CinematicBrandSection from "@/components/CinematicBrandSection";
import Preloader from "@/components/Preloader";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import BackToTopButton from "@/components/BackToTopButton";
import FAQSection from "@/components/FAQSection";
import { faqData } from "@/components/faqData";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Paper Kite Labs — Technology & Innovation Partner | AI, Software, Data & Video",
  description:
    "Paper Kite Labs transforms complex business processes into efficient, scalable, and intelligent systems through AI automation, custom enterprise software, data intelligence, and AI-powered video production. Trusted by businesses across India, USA, UK & UAE.",
  alternates: {
    canonical: "https://paperkitelabs.com",
  },
  openGraph: {
    title: "Paper Kite Labs — Technology & Innovation Partner",
    description:
      "We transform complex business processes into efficient, scalable, and intelligent systems through AI, automation, and enterprise software.",
    url: "https://paperkitelabs.com",
    type: "website",
  },
  twitter: {
    title: "Paper Kite Labs — Technology & Innovation Partner",
    description:
      "AI Solutions · Custom Software · Data Intelligence · AI Videos — Transforming businesses with intelligent systems.",
  },
};

export default function Home() {
  return (
    <>
      <FAQJsonLd faqs={faqData} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://paperkitelabs.com" },
        ]}
      />
      <Preloader />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TrustedBySection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CinematicBrandSection />
      <FAQSection />
      <CTASection overlap={true} />
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
