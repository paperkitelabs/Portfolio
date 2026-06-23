"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WorkSection.module.css';
import Image from 'next/image';

const projects = [
  {
    id: "jsw-steel",
    filename: "jsw_steel_ai.json",
    title: "AI Drawing Processing",
    client: "JSW Steel",
    industry: "Manufacturing & Engineering",
    description: "AI-powered workflow that reads engineering CAD drawings, extracts critical dimensions and specifications, and automatically updates structured records within operational systems — replacing hours of manual review.",
    impact: ["Reduced engineering review effort", "Accelerated drawing processing cycles", "Improved data accuracy"],
    link: "#",
    tech: ["Python", "Computer Vision", "AI/ML", "OCR"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: "avpe",
    filename: "avpe_engine.json",
    title: "AVPE",
    client: "Artrage Studios",
    industry: "AI & Media Production",
    description: "AI-powered video production ecosystem automating scriptwriting, character design, and video creation for social media at scale.",
    impact: ["Automated end-to-end video creation", "Reduced production costs", "Scaled content output"],
    link: "#",
    tech: ["Python", "TensorFlow", "React"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: "legal-ai",
    filename: "legal_ai_platform.json",
    title: "AI Legal Assistance",
    client: "LegalTech Platform",
    industry: "Legal Technology",
    description: "AI-powered legal platform that converts everyday language into structured legal queries, maps cases to IPC/BNS provisions, and generates FIR drafts, legal notices, and complaint documentation.",
    impact: ["Made legal guidance accessible to non-lawyers", "Accelerated case preparation", "Automated legal document generation"],
    link: "#",
    tech: ["AI/ML", "NLP", "Next.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: "fin-intel",
    filename: "fin_intelligence.json",
    title: "Financial Intelligence",
    client: "Compliance Platform",
    industry: "Financial Investigation",
    description: "Intelligent financial analysis platform that auto-processes bank statements, traces fund movements, identifies transaction relationships, and generates structured financial intelligence reports.",
    impact: ["Reduced analysis time from days to minutes", "Enhanced compliance workflows", "Faster report generation"],
    link: "#",
    tech: ["Python", "AI/ML", "React", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: "garage-mgmt",
    filename: "garage_platform.json",
    title: "Garage Management",
    client: "Automotive SaaS",
    industry: "Automotive Services",
    description: "Full-stack garage management platform with digital invoicing, WhatsApp bill delivery, CRM, inventory tracking, service history, automated reminders, and business analytics dashboards.",
    impact: ["Complete digitization of operations", "Data-driven business decisions", "Revenue optimization"],
    link: "#",
    tech: ["Next.js", "Node.js", "MongoDB", "WhatsApp API"],
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: "erp-modern",
    filename: "erp_modernization.json",
    title: "Legacy ERP Modernization",
    client: "Housing Society Platform",
    industry: "Property Management",
    description: "Complete reverse-engineering and modernization of a decades-old desktop ERP used by thousands of housing societies — rebuilt with modern UI, automation, and cloud-ready architecture.",
    impact: ["Eliminated legacy infrastructure dependency", "Improved efficiency & user adoption", "Cloud & mobile ready"],
    link: "#",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop"
  },
  {
    id: "forever",
    filename: "forever_consultants.json",
    title: "Forever Consultants",
    client: "Forever Consultants",
    industry: "Financial Advisory",
    description: "Full-service financial advisory platform featuring dynamic booking systems, vCards, SEO optimization, and Google Analytics integration.",
    impact: ["Enhanced online presence", "Streamlined client bookings", "Improved search rankings"],
    link: "https://www.foreverconsultants.in",
    tech: ["Next.js", "Node.js", "SEO"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    id: "aadya",
    filename: "aadya_creation.json",
    title: "Aadya Creation",
    client: "Aadya Creation",
    industry: "E-Commerce",
    description: "Robust full-stack e-commerce experience with seamless UI, secure payment gateways, and real-time inventory management.",
    impact: ["Seamless shopping experience", "Secure payment processing", "Real-time inventory sync"],
    link: "#",
    tech: ["React", "Stripe", "Express"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2400&auto=format&fit=crop"
  }
];

const JsonSyntaxHighlighter = ({ data }) => {
  const jsonString = JSON.stringify(data, null, 2);

  // A very basic regex replacer for JSON syntax highlighting
  const highlighted = jsonString.split('\n').map((line, i) => {
    // Check if line is a property key
    if (line.includes('":')) {
      const parts = line.split('":');
      const key = parts[0] + '"';
      let value = parts[1];

      // Colorize value
      if (value.includes('"')) {
        value = value.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
      } else if (value.includes('true') || value.includes('false')) {
        value = value.replace(/true|false/g, '<span class="boolean">$&</span>');
      } else if (/\d/.test(value)) {
        value = value.replace(/\d+/g, '<span class="number">$&</span>');
      }

      return (
        <div key={i}>
          <span className="key" dangerouslySetInnerHTML={{ __html: key }} />
          <span className="punctuation">:</span>
          <span dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      );
    }

    // Fallback for brackets
    return <div key={i} className="punctuation">{line}</div>;
  });

  return <div className={styles.codeArea}>{highlighted}</div>;
};

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isCompiled, setIsCompiled] = useState(false);

  // Trigger terminal compile sequence when project changes
  useEffect(() => {
    setIsCompiled(false);
    setTerminalLogs([]);

    const sequence = [
      { text: `> Loading module ${activeProject.filename}...`, delay: 200, type: 'info' },
      { text: "> Resolving dependencies [OK]", delay: 600, type: 'success' },
      { text: "> npm run build:ui", delay: 1000, type: 'prompt' },
      { text: "> Compiling visual assets...", delay: 1400, type: 'info' },
      { text: "> UI compiled successfully! Launching interface...", delay: 2000, type: 'success' }
    ];

    const timeouts = [];

    sequence.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setTerminalLogs(prev => [...prev, step]);

        // If it's the last step, launch the UI
        if (index === sequence.length - 1) {
          setTimeout(() => setIsCompiled(true), 400); // Small pause before burst
        }
      }, step.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [activeProject]);

  return (
    <section className={styles.compilerSection} id="work">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionSubtitle}>The Compiler</span>
          <h2 className={styles.sectionTitle}>Technical Projects</h2>
        </div>

        <div className={styles.ideContainer}>

          {/* IDE Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>Explorer</div>
            <ul className={styles.fileList}>
              {projects.map((p) => (
                <li
                  key={p.id}
                  className={`${styles.fileItem} ${activeProject.id === p.id ? styles.active : ''}`}
                  onClick={() => {
                    if (activeProject.id !== p.id) {
                      setActiveProject(p);
                    }
                  }}
                >
                  <svg className={styles.fileIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  {p.filename}
                </li>
              ))}
            </ul>
          </div>

          {/* IDE Main Pane */}
          <div className={styles.editorPane}>
            <div className={styles.tabs}>
              <div className={styles.tab}>
                <svg className={styles.fileIcon} viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                {activeProject.filename}
              </div>
            </div>

            {/* Code View with Blur & Loader */}
            <div className={styles.codeViewWrapper}>
              <div className={`${styles.codeLayer} ${!isCompiled ? styles.blurredCode : ''}`}>
                <JsonSyntaxHighlighter data={{
                  id: activeProject.id,
                  client: activeProject.client,
                  industry: activeProject.industry,
                  title: activeProject.title,
                  description: activeProject.description,
                  tech_stack: activeProject.tech,
                  impact: activeProject.impact,
                  url: activeProject.link,
                  status: isCompiled ? "COMPILED_SUCCESS" : "COMPILING_MODULES..."
                }} />
              </div>

              <AnimatePresence>
                {!isCompiled && (
                  <motion.div
                    className={styles.loaderOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className={styles.loaderGraphic}>
                      <motion.svg
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      >
                        <defs>
                          <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#61dafb" />
                            <stop offset="100%" stopColor="#d4d4d4" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="40" stroke="url(#loaderGrad)" strokeWidth="4" fill="none" strokeDasharray="250" strokeDashoffset="50" strokeLinecap="round" />
                        <motion.circle
                          cx="50" cy="50" r="20"
                          fill="#61dafb"
                          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        />
                      </motion.svg>
                    </div>
                    <motion.div
                      className={styles.loaderText}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      Loading Project...
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal View */}
            <div className={styles.terminalPane}>
              <div className={styles.terminalHeader}>Terminal</div>
              <div className={styles.terminalOutput}>
                {terminalLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    className={`${styles.terminalLine} ${styles[log.type]}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {log.text}
                  </motion.div>
                ))}
                {!isCompiled && (
                  <motion.div
                    className={styles.terminalLine}
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    _
                  </motion.div>
                )}
              </div>
            </div>

            {/* The Compiled UI Reveal */}
            <AnimatePresence>
              {isCompiled && (
                <motion.div
                  className={styles.compileOverlay}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 50 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <button className={styles.closeCompile} onClick={() => setIsCompiled(false)} title="Back to Code">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>

                  <motion.div
                    className={styles.compiledCard}
                    whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
                    transition={{ type: "spring", damping: 20 }}
                    style={{ transformPerspective: 1000 }}
                  >
                    <div className={styles.compiledImageContainer}>
                      <Image
                        src={activeProject.link !== "#"
                          ? `https://api.microlink.io?url=${encodeURIComponent(activeProject.link)}&screenshot=true&meta=false&embed=screenshot.url`
                          : activeProject.image}
                        alt={activeProject.title}
                        fill
                        unoptimized={true}
                        className={styles.compiledImage}
                      />
                      <div className={styles.imageOverlay}></div>
                    </div>

                    <div className={styles.compiledBody}>
                      <div className={styles.cardHeader}>
                        <div>
                          <span className={styles.industryBadge}>{activeProject.industry}</span>
                          <h3 className={styles.compiledTitle}>{activeProject.title}</h3>
                          <span className={styles.compiledClient}>Client: {activeProject.client}</span>
                        </div>
                        <div className={styles.techStack}>
                          {activeProject.tech.map((t, i) => (
                            <span key={i} className={styles.techTag}>{t}</span>
                          ))}
                        </div>
                      </div>

                      <p className={styles.compiledDesc}>{activeProject.description}</p>

                      {activeProject.impact && (
                        <div className={styles.impactList}>
                          {activeProject.impact.map((item, i) => (
                            <span key={i} className={styles.impactItem}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              {item}
                            </span>
                          ))}
                        </div>
                      )}

                      <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
                        Launch Application
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </motion.div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
