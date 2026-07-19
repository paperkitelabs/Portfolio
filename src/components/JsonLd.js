/**
 * JSON-LD Structured Data Components for SEO/AEO/GEO
 * 
 * These are server components that inject schema.org structured data
 * into the page <head> for rich results, knowledge panels, and AI engine answers.
 */

/* ─── Organization + WebSite Schema (Global — used in layout) ─── */
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://paperkitelabs.com/#organization",
        "name": "Paper Kite Labs",
        "alternateName": "Paperkite Labs",
        "url": "https://paperkitelabs.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://paperkitelabs.com/og-image.png",
          "width": 1200,
          "height": 630
        },
        "image": "https://paperkitelabs.com/og-image.png",
        "description": "Paper Kite Labs is a technology and innovation partner that transforms complex business processes into efficient, scalable, and intelligent systems through AI, automation, and enterprise software.",
        "email": "contact@paperkitelabs.com",
        "telephone": ["+919270291116", "+919867353449"],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "India"
        },
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Machine Learning",
          "Business Process Automation",
          "Custom Enterprise Software",
          "Data Intelligence",
          "AI Video Production",
          "Digital Transformation",
          "Computer Vision",
          "Workflow Automation"
        ],
        "foundingDate": "2024",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 5,
          "maxValue": 50
        },
        "slogan": "Ideas that rise · Innovation that takes flight",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://paperkitelabs.com/#website",
        "url": "https://paperkitelabs.com",
        "name": "Paper Kite Labs",
        "description": "Technology & Innovation Partner — AI Solutions, Custom Software, Data Intelligence, and AI Video Production",
        "publisher": {
          "@id": "https://paperkitelabs.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://paperkitelabs.com/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── LocalBusiness Schema (for Google Maps & Local SEO) ─── */
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://paperkitelabs.com/#localbusiness",
    "name": "Paper Kite Labs",
    "image": "https://paperkitelabs.com/og-image.png",
    "url": "https://paperkitelabs.com",
    "telephone": ["+919270291116", "+919867353449"],
    "email": "contact@paperkitelabs.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Service Schema (for individual service rich results) ─── */
export function ServicesJsonLd() {
  const services = [
    {
      name: "AI Solutions & Automation",
      description: "Intelligent Agents, Document Processing, Computer Vision, and Workflow Automation tailored for enterprise businesses. We build custom AI models that reduce manual work by up to 80%.",
      serviceType: "Artificial Intelligence Consulting"
    },
    {
      name: "Custom Enterprise Software Development",
      description: "Enterprise Applications, Web Platforms, Dashboards, and Internal Systems built for scale. Full-stack development using modern frameworks like React, Next.js, and Node.js.",
      serviceType: "Software Development"
    },
    {
      name: "Data Intelligence & Analytics",
      description: "Business Analytics, MIS Dashboards, Data Reporting, and Operational Visibility solutions that turn raw data into actionable business insights.",
      serviceType: "Data Analytics"
    },
    {
      name: "AI-Powered Video Production",
      description: "AI Video Generation, Corporate Videos, Explainer Videos, and Marketing Assets created using cutting-edge AI tools at unprecedented speed and quality.",
      serviceType: "Video Production"
    }
  ];

  const schema = services.map((service, index) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://paperkitelabs.com/services#service-${index + 1}`,
    "name": service.name,
    "description": service.description,
    "serviceType": service.serviceType,
    "provider": {
      "@id": "https://paperkitelabs.com/#organization"
    },
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "United States" }
    ],
    "url": "https://paperkitelabs.com/services"
  }));

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

/* ─── FAQPage Schema (for AEO — featured snippets & AI answers) ─── */
export function FAQJsonLd({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── BreadcrumbList Schema ─── */
export function BreadcrumbJsonLd({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── VideoObject Schema (for creative work) ─── */
export function VideoObjectJsonLd({ videos }) {
  const schema = videos.map(video => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": video.thumbnail,
    "contentUrl": video.videoUrl,
    "uploadDate": "2025-01-01",
    "publisher": {
      "@id": "https://paperkitelabs.com/#organization"
    }
  }));

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

/* ─── CollectionPage Schema ─── */
export function CollectionPageJsonLd({ name, description, url }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@id": "https://paperkitelabs.com/#website"
    },
    "about": {
      "@id": "https://paperkitelabs.com/#organization"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
