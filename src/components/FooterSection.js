"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FooterSection.module.css';

export default function FooterSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      // Small timeout to allow the layout expansion to begin
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [isExpanded]);

  return (
    <footer 
      className={styles.footer}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={styles.container}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className={styles.expandedContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className={styles.trayInner}>
                
                {/* Navigation Column */}
                <div className={styles.trayCol}>
                  <h4 className={styles.trayHeading}>Explore</h4>
                  <ul className={styles.trayList}>
                    <li><a href="/tech-work">Tech Work</a></li>
                    <li><a href="/creative-work">Creative Work</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                  </ul>
                </div>

                {/* Contact Column */}
                <div className={styles.trayCol}>
                  <h4 className={styles.trayHeading}>Connect</h4>
                  <div className={styles.contactList}>
                    <a href="mailto:contact@paperkitelabs.com" className={styles.contactLink}>
                      <span className={styles.contactLabel}>Email</span>
                      <span className={styles.contactValue}>contact@paperkitelabs.com</span>
                    </a>
                    <div className={styles.contactGroup}>
                      <span className={styles.contactLabel}>Phone</span>
                      <a href="tel:9270291116" className={styles.contactValueLink}>9270291116</a>
                      <a href="tel:9867353449" className={styles.contactValueLink}>98673 53449</a>
                    </div>
                    <a href="https://paperkitelabs.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                      <span className={styles.contactLabel}>Web</span>
                      <span className={styles.contactValue}>paperkitelabs.com</span>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.thinRow}>
          <div className={styles.logoGroup}>
            <Image
              src="https://res.cloudinary.com/dgooptuqc/image/upload/v1784444008/logo_xgseu4.png"
              alt="Paper Kite Labs Logo"
              width={48}
              height={48}
              className={styles.logoImage}
            />
            <span className={styles.copyright}>© {new Date().getFullYear()} Paperkite Labs.</span>
          </div>

          {/* Minimal trigger ("logo type") */}
          <div className={styles.iconTrigger}>
            <motion.svg 
              animate={{ rotate: isExpanded ? 45 : 0 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </motion.svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
