import Navbar from "@/components/Navbar";
import ServicesPageSection from "@/components/ServicesPageSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

export const metadata = {
  title: 'Services - Paperkite Labs | AI Solutions, Custom Software, Data Intelligence',
  description: 'Explore the full suite of services from Paperkite Labs — AI automation, custom enterprise software, data intelligence, and AI-powered video production.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <ServicesPageSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
