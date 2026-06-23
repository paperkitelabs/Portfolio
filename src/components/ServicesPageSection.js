"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ServicesPageSection.module.css';

const services = [
  {
    id: "ai-solutions",
    num: "01",
    title: "AI Solutions",
    tagline: "Intelligence That Works For You",
    description: "We design, build, and deploy production-ready AI systems that transform how your business operates — from intelligent document processing to autonomous decision-making agents.",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    accentColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.15)",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    capabilities: [
      { name: "Intelligent Agents", desc: "Autonomous AI agents that handle complex multi-step workflows, make decisions, and interact with your existing systems." },
      { name: "Document Processing", desc: "Extract, classify, and process documents — invoices, contracts, engineering drawings — with near-human accuracy." },
      { name: "Computer Vision", desc: "Visual inspection, object detection, and image analysis systems for manufacturing, retail, and security." },
      { name: "Workflow Automation", desc: "End-to-end process automation combining AI models with business logic to eliminate manual bottlenecks." }
    ],
    useCases: ["Engineering Drawing Analysis", "Invoice Processing", "Compliance Monitoring", "Quality Inspection"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18V5"/>
        <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/>
        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/>
        <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/>
        <path d="M18 18a4 4 0 0 0 2-7.464"/>
        <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/>
        <path d="M6 18a4 4 0 0 1-2-7.464"/>
        <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>
      </svg>
    )
  },
  {
    id: "custom-software",
    num: "02",
    title: "Custom Software",
    tagline: "Built To Scale, Designed To Last",
    description: "From internal tools to customer-facing platforms, we build enterprise-grade software tailored precisely to your workflows — no templates, no compromises.",
    gradient: "linear-gradient(135deg, #0EA5E9, #67E8F9)",
    accentColor: "#0EA5E9",
    glowColor: "rgba(14, 165, 233, 0.15)",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    capabilities: [
      { name: "Enterprise Applications", desc: "Robust, scalable applications designed for complex business operations with role-based access and audit trails." },
      { name: "Web Platforms", desc: "Modern, responsive web applications built with cutting-edge frameworks for maximum performance and user experience." },
      { name: "Admin Dashboards", desc: "Real-time operational dashboards that give you complete visibility into your business metrics and KPIs." },
      { name: "Internal Systems", desc: "CRM, ERP, inventory, billing — custom-built tools that fit your exact process instead of forcing you to adapt." }
    ],
    useCases: ["ERP Modernization", "E-Commerce Platforms", "Management Portals", "SaaS Products"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    id: "data-intelligence",
    num: "03",
    title: "Data Intelligence",
    tagline: "Decisions Powered By Data",
    description: "Turn raw data into actionable intelligence. We build analytics pipelines, BI dashboards, and reporting systems that make your data tell a story.",
    gradient: "linear-gradient(135deg, #10B981, #6EE7B7)",
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.15)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    capabilities: [
      { name: "Business Analytics", desc: "Comprehensive analytics platforms that track revenue, growth, customer behavior, and operational performance." },
      { name: "MIS Dashboards", desc: "Management information systems with drill-down reports, automated alerts, and scheduled distribution." },
      { name: "Data Pipelines", desc: "Automated ETL workflows that clean, transform, and consolidate data from multiple sources in real-time." },
      { name: "Financial Intelligence", desc: "Transaction analysis, fund flow tracking, anomaly detection, and compliance reporting systems." }
    ],
    useCases: ["Financial Investigation", "Revenue Analytics", "Operational Reporting", "Customer Intelligence"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    )
  },
  {
    id: "ai-videos",
    num: "04",
    title: "AI Videos",
    tagline: "Stories At The Speed Of AI",
    description: "From concept to final cut, we leverage AI to produce stunning video content — corporate films, explainers, social media assets — in a fraction of the traditional time.",
    gradient: "linear-gradient(135deg, #F43F5E, #FB923C)",
    accentColor: "#F43F5E",
    glowColor: "rgba(244, 63, 94, 0.15)",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    capabilities: [
      { name: "AI Video Generation", desc: "Generate professional-quality videos from text prompts, scripts, or storyboards using cutting-edge AI models." },
      { name: "Corporate Films", desc: "Brand stories, testimonials, and company profiles produced with cinematic quality and rapid turnaround." },
      { name: "Explainer Videos", desc: "Complex concepts made simple through animated explainers, product demos, and tutorial content." },
      { name: "Social Media Assets", desc: "Scroll-stopping reels, shorts, and video ads optimized for every platform's algorithm and audience." }
    ],
    useCases: ["Brand Campaigns", "Product Launches", "Training Content", "Social Media Marketing"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    )
  }
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "We deep-dive into your challenges, workflows, and goals to understand the full picture.", icon: "🔍" },
  { num: "02", title: "Strategy", desc: "We architect the right solution — choosing the best technology stack and approach for your needs.", icon: "🧠" },
  { num: "03", title: "Build", desc: "Rapid development with weekly demos. You see progress from day one, not month one.", icon: "⚡" },
  { num: "04", title: "Launch & Scale", desc: "Deployment, monitoring, and iterative improvement — we don't disappear after launch.", icon: "🚀" }
];

/* ---- Animated Section Wrapper ---- */
function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---- Capability Card ---- */
function CapabilityCard({ capability, accentColor, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={styles.capabilityCard}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className={styles.capabilityIndicator} style={{ background: accentColor }} />
      <h4 className={styles.capabilityName}>{capability.name}</h4>
      <p className={styles.capabilityDesc}>{capability.desc}</p>
    </motion.div>
  );
}

/* ---- Service Deep Dive ---- */
function ServiceSection({ service, index }) {
  const isReversed = index % 2 !== 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.serviceBlock} id={service.id} ref={ref}>
      {/* Background glow */}
      <div
        className={styles.serviceGlow}
        style={{
          background: `radial-gradient(ellipse at ${isReversed ? '80%' : '20%'} 50%, ${service.glowColor} 0%, transparent 70%)`
        }}
      />

      <div className={`${styles.serviceInner} ${isReversed ? styles.reversed : ''}`}>
        {/* Left / Visual side */}
        <motion.div
          className={styles.serviceVisual}
          initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.visualFrame}>
            <div className={styles.visualGradient} style={{ background: service.gradient }} />
            <img src={service.image} alt={service.title} className={styles.visualImage} />
            <div className={styles.visualOverlay}>
              <span className={styles.bigNumber}>{service.num}</span>
            </div>
          </div>
        </motion.div>

        {/* Right / Content side */}
        <motion.div
          className={styles.serviceContent}
          initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className={styles.serviceLabel}>
            <div className={styles.serviceDot} style={{ background: service.accentColor }} />
            <span>Service {service.num}</span>
          </div>
          <h2 className={styles.serviceTitle}>{service.title}</h2>
          <p className={styles.serviceTagline} style={{ color: service.accentColor }}>{service.tagline}</p>
          <p className={styles.serviceDescription}>{service.description}</p>

          {/* Use Cases Pills */}
          <div className={styles.useCases}>
            {service.useCases.map((uc, i) => (
              <span key={i} className={styles.useCasePill} style={{ borderColor: service.accentColor, color: service.accentColor }}>
                {uc}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Capabilities Grid */}
      <div className={styles.capabilitiesGrid}>
        {service.capabilities.map((cap, i) => (
          <CapabilityCard key={i} capability={cap} accentColor={service.accentColor} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ==== MAIN PAGE COMPONENT ==== */
export default function ServicesPageSection() {
  const [hoveredProcess, setHoveredProcess] = useState(null);

  return (
    <div className={styles.servicesPage}>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroOrbs}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
        </div>

        <div className={styles.heroContent}>
          <motion.span
            className={styles.heroLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            We Build Systems That
            <span className={styles.heroGradientText}> Think, Adapt & Scale</span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            From AI-powered automation to enterprise platforms — we transform complex challenges into elegant, intelligent solutions.
          </motion.p>

          {/* Quick Nav Pills */}
          <motion.div
            className={styles.quickNav}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {services.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={styles.quickNavPill} style={{ '--pill-accent': s.accentColor }}>
                <span className={styles.quickNavIcon}>{s.icon}</span>
                {s.title}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ===== SERVICE DEEP DIVES ===== */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* ===== HOW WE WORK ===== */}
      <section className={styles.processSection}>
        <AnimatedSection className={styles.processHeader}>
          <span className={styles.processSuptitle}>The Process</span>
          <h2 className={styles.processTitle}>How We Bring Ideas To Life</h2>
          <p className={styles.processSubtitle}>A battle-tested approach that balances speed with quality.</p>
        </AnimatedSection>

        <div className={styles.processTimeline}>
          {/* Connecting line */}
          <div className={styles.timelineLine} />

          {processSteps.map((step, i) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-50px" });

            return (
              <motion.div
                key={i}
                ref={ref}
                className={`${styles.processStep} ${hoveredProcess === i ? styles.processStepActive : ''}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                onMouseEnter={() => setHoveredProcess(i)}
                onMouseLeave={() => setHoveredProcess(null)}
              >
                <div className={styles.stepDot}>
                  <span className={styles.stepEmoji}>{step.icon}</span>
                </div>
                <div className={styles.stepContent}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <AnimatedSection className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>50+</span>
          <span className={styles.statLabel}>Projects Delivered</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>4</span>
          <span className={styles.statLabel}>Core Services</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>10+</span>
          <span className={styles.statLabel}>Industries Served</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>95%</span>
          <span className={styles.statLabel}>Client Retention</span>
        </div>
      </AnimatedSection>
    </div>
  );
}
