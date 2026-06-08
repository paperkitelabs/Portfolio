import { Inter, Lilita_One } from "next/font/google";
import "./globals.css";

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
  title: "Paper Kite Labs — Technology & Innovation Partner",
  description:
    "Paper Kite Labs transforms complex business processes into efficient, scalable, and intelligent systems through AI, automation, and enterprise software.",
  keywords: [
    "Paper Kite Labs",
    "AI Automation",
    "Business Process Digitization",
    "Enterprise Software",
    "Digital Transformation",
  ],
  openGraph: {
    title: "Paper Kite Labs — Technology & Innovation Partner",
    description:
      "Transforming complex business processes into efficient, scalable, and intelligent systems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lilitaOne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
