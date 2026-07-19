'use client';

import dynamic from 'next/dynamic';
import styles from './HeroSection.module.css';

/* Dynamically import the 3D component — no SSR (Three.js needs browser) */
const PaperKite3D = dynamic(() => import('./PaperKite3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 60,
        height: 60,
        border: '2px solid rgba(26,26,46,0.08)',
        borderTopColor: 'rgba(26,26,46,0.3)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className={styles.hero} id="home">
      {/* Subtle background gradient */}
      <div className={styles.heroBg} />

      {/* Main Hero Content */}
      <header className={styles.heroContent}>
        <h1 className={styles.headline}>
          {["We", "Build", "Intelligent", "Systems", "for", "Modern", "Businesses"].map((word, index) => (
            <span key={index}>
              <span 
                className={styles.word} 
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                {word}
              </span>
              {' '}
              {(word === "Intelligent" || word === "Modern") && <br />}
            </span>
          ))}
        </h1>
        <p className={styles.subtitle}>
          From messy manual workflows to smart, scalable software — Paperkite Labs turns your operational challenges into competitive advantages.
        </p>
        <div className={styles.buttonGroup}>
          <a href="#work" className={styles.primaryButton}>See Our Work</a>
          <a href="#contact" className={styles.secondaryButton}>Talk to Us</a>
        </div>
      </header>

      {/* 3D Paper Kite Model — centered, above bg text */}
      <div className={styles.modelContainer}>
        <PaperKite3D />
      </div>

      {/* Bottom partition line */}
      <div className={styles.partitionLine}></div>

      {/* Bottom tagline */}
      <div className={styles.tagline}>
        <p className={styles.taglineText}>
          Ideas that rise · Innovation that takes flight
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollDot} />
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
