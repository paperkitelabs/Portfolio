import { Inter, Lilita_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import KiteCursor from "@/components/KiteCursor";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const lilitaOne = Lilita_One({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://paperkitelabs.com"),

  title: {
    default: "Paper Kite Labs — Technology & Innovation Partner | AI, Software, Data & Video",
    template: "%s | Paper Kite Labs",
  },

  description:
    "Paper Kite Labs transforms complex business processes into efficient, scalable, and intelligent systems through AI automation, custom enterprise software, data intelligence, and AI-powered video production. Trusted by businesses across India, USA, UK & UAE.",

  keywords: [
    "Paper Kite Labs",
    "Paperkite Labs",
    "AI automation agency",
    "AI solutions India",
    "custom software development",
    "enterprise software company",
    "business process automation",
    "data intelligence platform",
    "AI video production",
    "digital transformation services",
    "AI agent development",
    "workflow automation",
    "document processing AI",
    "computer vision solutions",
    "MIS dashboard development",
    "business analytics India",
    "corporate video production AI",
    "technology innovation partner",
    "best AI agency India",
    "scalable software solutions",
  ],

  authors: [{ name: "Paper Kite Labs", url: "https://paperkitelabs.com" }],
  creator: "Paper Kite Labs",
  publisher: "Paper Kite Labs",

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  alternates: {
    canonical: "https://paperkitelabs.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paperkitelabs.com",
    siteName: "Paper Kite Labs",
    title: "Paper Kite Labs — Technology & Innovation Partner",
    description:
      "We transform complex business processes into efficient, scalable, and intelligent systems through AI, automation, and enterprise software. AI Solutions · Custom Software · Data Intelligence · AI Videos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paper Kite Labs — Technology & Innovation Partner",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Paper Kite Labs — Technology & Innovation Partner",
    description:
      "AI Solutions · Custom Software · Data Intelligence · AI Video Production — Transforming businesses with intelligent systems.",
    images: ["/og-image.png"],
    creator: "@paperkitelabs",
    site: "@paperkitelabs",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Geo-targeting metadata
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "geo.position": "19.0760;72.8777",
    "ICBM": "19.0760, 72.8777",
    "rating": "general",
    "distribution": "global",
    "revisit-after": "7 days",
    "language": "English",
    "author": "Paper Kite Labs",
    "contact": "contact@paperkitelabs.com",
  },

  // Placeholder for search console verification — replace with actual codes
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   bing: "your-bing-verification-code",
  // },

  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lilitaOne.variable}`}>
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1FRNMJ0CS8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1FRNMJ0CS8');
          `}
        </Script>
        <KiteCursor />
        {children}
      </body>
    </html>
  );
}
