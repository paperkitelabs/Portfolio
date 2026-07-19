import Navbar from "@/components/Navbar";
import ContactPageSection from "@/components/ContactPageSection";
import FooterSection from "@/components/FooterSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Contact Us — Book a Free Discovery Call",
  description:
    "Get in touch with Paper Kite Labs to discuss your next project. Book a free discovery call, request a quote for AI solutions, custom software, data intelligence, or AI video production. Email: contact@paperkitelabs.com | Phone: +91 9270291116.",
  alternates: {
    canonical: "https://paperkitelabs.com/contact",
  },
  openGraph: {
    title: "Contact Paper Kite Labs — Book a Free Discovery Call",
    description:
      "Discuss your project with our team. AI Solutions, Custom Software, Data Intelligence & AI Videos. Free consultation available.",
    url: "https://paperkitelabs.com/contact",
    type: "website",
  },
  twitter: {
    title: "Contact Paper Kite Labs",
    description:
      "Book a free discovery call. Email: contact@paperkitelabs.com | Phone: +91 9270291116.",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://paperkitelabs.com" },
          { name: "Contact", url: "https://paperkitelabs.com/contact" },
        ]}
      />
      <Navbar />
      <ContactPageSection />
      <FooterSection />
    </>
  );
}
