"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  return (
    <>
      <nav className={styles.navbar} id="navbar">
        {/* Logo */}
        <a href="/" className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Paper Kite Labs Logo"
            width={36}
            height={36}
            className={styles.logoImage}
            priority
          />
          <span className={styles.logoText}>
            Paperkite <span className={styles.logoTextAccent}>Labs</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className={styles.navLinks}>
          <div className={styles.dropdownContainer}>
            <button className={`${styles.navLink} ${styles.dropdownTrigger}`}>
              Work 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={styles.dropdownMenu}>
              <a href="/tech-work" className={styles.dropdownItem}>
                Tech Work 
                <span className={styles.arrow}>→</span>
              </a>
              <a href="/creative-work" className={styles.dropdownItem}>
                Creative Work 
                <span className={styles.arrow}>→</span>
              </a>
            </div>
          </div>
          <a href="/services" className={styles.navLink}>Services</a>
          <a href="/contact" className={styles.navLink}>Contact</a>
        </div>

        {/* CTA Button */}
        <button className={styles.ctaButton} id="nav-cta">
          Let&apos;s Talk
        </button>

        {/* Creative Morphing Mobile Menu Button */}
        <button 
          className={styles.menuButton} 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Menu"
        >
          <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Morphs from Right side of Kite/Diamond to X line 1 */}
            <motion.path 
              animate={{ 
                d: isMobileOpen 
                  ? "M18 6L6 18" 
                  : "M12 2L22 12L12 22" 
              }} 
              transition={{ duration: 0.3 }}
            />
            {/* Morphs from Left side of Kite/Diamond to X line 2 */}
            <motion.path 
              animate={{ 
                d: isMobileOpen 
                  ? "M6 6L18 18" 
                  : "M12 2L2 12L12 22" 
              }} 
              transition={{ duration: 0.3 }}
            />
          </motion.svg>
        </button>
      </nav>

      {/* Full Screen Mobile Menu Tray */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            className={styles.mobileTray}
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className={styles.trayContent}>
              <a href="/tech-work" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Tech Work</a>
              <a href="/creative-work" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Creative Work</a>
              <a href="/services" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Services</a>
              <a href="/contact" className={styles.mobileLink} onClick={() => setIsMobileOpen(false)}>Contact</a>
            </div>
            
            <div className={styles.trayFooter}>
              <p>contact@paperkitelabs.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
