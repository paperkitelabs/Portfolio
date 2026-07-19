import Navbar from "@/components/Navbar";
import ServicesPageSection from "@/components/ServicesPageSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import { ServicesJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Services — AI Solutions, Custom Software, Data Intelligence & AI Video Production",
  description:
    "Explore the full suite of services from Paper Kite Labs — AI automation & intelligent agents, custom enterprise software development, data intelligence & analytics dashboards, and AI-powered video production. End-to-end digital transformation for modern businesses.",
  alternates: {
    canonical: "https://paperkitelabs.com/services",
  },
  openGraph: {
    title: "Services — Paper Kite Labs",
    description:
      "AI Solutions · Custom Software · Data Intelligence · AI Video Production — Comprehensive technology services for enterprises.",
    url: "https://paperkitelabs.com/services",
    type: "website",
  },
  twitter: {
    title: "Services — Paper Kite Labs",
    description:
      "AI Solutions · Custom Software · Data Intelligence · AI Video Production — Comprehensive technology services for enterprises.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://paperkitelabs.com" },
          { name: "Services", url: "https://paperkitelabs.com/services" },
        ]}
      />
      <Navbar />
      <ServicesPageSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
