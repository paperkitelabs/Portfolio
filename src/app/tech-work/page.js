import Navbar from "@/components/Navbar";
import WorkSection from "@/components/WorkSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import { CollectionPageJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Tech Work — Custom Software & AI Projects Portfolio",
  description:
    "Explore selected technical projects and robust platforms built by Paper Kite Labs. Enterprise dashboards, AI automation systems, workflow tools, and scalable web applications — showcasing real results for real businesses.",
  alternates: {
    canonical: "https://paperkitelabs.com/tech-work",
  },
  openGraph: {
    title: "Tech Work Portfolio — Paper Kite Labs",
    description:
      "Enterprise dashboards, AI automation systems, workflow tools, and scalable web applications built by Paper Kite Labs.",
    url: "https://paperkitelabs.com/tech-work",
    type: "website",
  },
  twitter: {
    title: "Tech Work Portfolio — Paper Kite Labs",
    description:
      "Selected technical projects: enterprise dashboards, AI systems, and scalable platforms.",
  },
};

export default function TechWorkPage() {
  return (
    <>
      <CollectionPageJsonLd
        name="Tech Work Portfolio"
        description="Selected technical projects and robust platforms built by Paper Kite Labs — enterprise dashboards, AI automation systems, and scalable web applications."
        url="https://paperkitelabs.com/tech-work"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://paperkitelabs.com" },
          { name: "Tech Work", url: "https://paperkitelabs.com/tech-work" },
        ]}
      />
      <Navbar />
      <WorkSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
