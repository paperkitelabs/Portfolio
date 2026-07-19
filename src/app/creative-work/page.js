import Navbar from "@/components/Navbar";
import CreativeWorkSection from "@/components/CreativeWorkSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import { CollectionPageJsonLd, VideoObjectJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

const videoPortfolio = [
  {
    title: "JOY Beverage Campaign",
    description: "High-energy cinematic commercial for a premium African beverage brand.",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213294/joy_COMMERCIAL_TRIAL_r0iwks.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213294/joy_COMMERCIAL_TRIAL_r0iwks.mp4",
  },
  {
    title: "An Animated Love Story",
    description: "A beautifully crafted Disney-style 3D animation detailing a couple's romantic journey.",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227504/0623_it4kdj.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227504/0623_it4kdj.mp4",
  },
  {
    title: "Bagan Attar Essence",
    description: "A visually rich, sensory advertisement showcasing a luxury fragrance line.",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213279/Attar_final_rshgky.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213279/Attar_final_rshgky.mp4",
  },
  {
    title: "Cole Luxury Bags",
    description: "Sleek, high-fashion cinematic showcase highlighting premium leather craftsmanship.",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213326/Cole_bag_adv_z7q7hq.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213326/Cole_bag_adv_z7q7hq.mp4",
  },
  {
    title: "Bagan Premium Dryfruits",
    description: "Mouth-watering cinematic product showcase for premium organic dry fruits.",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213270/Final_Bagan_Dmeo_ghkbny.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213270/Final_Bagan_Dmeo_ghkbny.mp4",
  },
];

export const metadata = {
  title: "Creative Work — AI-Powered Video Production Portfolio",
  description:
    "Films, cinematic brand stories, AI-generated video content, and visual identity projects by Paper Kite Labs. Watch our portfolio of commercials, animations, product films, corporate videos, and social media content created using cutting-edge AI tools.",
  alternates: {
    canonical: "https://paperkitelabs.com/creative-work",
  },
  openGraph: {
    title: "Creative Work Portfolio — Paper Kite Labs",
    description:
      "AI-powered video production: commercials, animations, product films, brand stories, and corporate videos.",
    url: "https://paperkitelabs.com/creative-work",
    type: "website",
  },
  twitter: {
    title: "Creative Work Portfolio — Paper Kite Labs",
    description:
      "Films, animations, commercials & brand stories — AI-powered video production by Paper Kite Labs.",
  },
};

export default function CreativeWorkPage() {
  return (
    <>
      <CollectionPageJsonLd
        name="Creative Work Portfolio"
        description="Films, cinematic brand stories, AI-generated video content, and visual identity projects by Paper Kite Labs."
        url="https://paperkitelabs.com/creative-work"
      />
      <VideoObjectJsonLd videos={videoPortfolio} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://paperkitelabs.com" },
          { name: "Creative Work", url: "https://paperkitelabs.com/creative-work" },
        ]}
      />
      <Navbar />
      <CreativeWorkSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
