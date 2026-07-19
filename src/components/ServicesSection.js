"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ServicesSection.module.css';

const services = [
  {
    num: "01",
    title: "AI Solutions",
    desc: "Intelligent Agents, Document Processing, Computer Vision, and Workflow Automation tailored for your business.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    bgColor: "#E6E6FA", // Pastel Lavender
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    num: "02",
    title: "Custom Software",
    desc: "Enterprise Applications, Web Platforms, Dashboards, and Internal Systems built for scale.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    bgColor: "#E0F4FF", // Soft Sky Blue
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    num: "03",
    title: "Data Intelligence",
    desc: "Business Analytics, MIS Dashboards, Data Reporting, and Operational Visibility solutions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    bgColor: "#E0FFED", // Mint Green
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    )
  },
  {
    num: "04",
    title: "AI Videos",
    desc: "AI Video Generation, Corporate Videos, Explainer Videos, and Marketing Assets created at warp speed.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    bgColor: "#FFE4E1", // Pastel Peach
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    )
  }
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className={styles.servicesSection} id="services" aria-label="Our Services — AI Solutions, Custom Software, Data Intelligence, AI Videos">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>WHAT WE DO</h2>
          <h3 className={styles.sectionSubtitle}>Four Ways We Create Impact</h3>
        </motion.div>

        <motion.div 
          className={styles.accordionContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                layout
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`${styles.capsule} ${isActive ? styles.expanded : ''}`}
                style={{ 
                  backgroundColor: service.bgColor,
                  flex: isActive ? 6 : 1 
                }}
                transition={{ 
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
              >
                <img src={service.image} alt={service.title} className={styles.bgImage} draggable="false" />
                <div className={styles.gradientOverlay} />

                {/* Collapsed State Content */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div 
                      className={styles.collapsedContent}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.iconWrapper}>{service.icon}</div>
                      <span className={styles.verticalTitle}>{service.title}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded State Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className={styles.capsuleContent}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className={styles.expandedContent}>
                        <div className={styles.expandedNumber}>{service.num}</div>
                        <h4 className={styles.expandedTitle}>{service.title}</h4>
                        <p className={styles.expandedDesc}>{service.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
