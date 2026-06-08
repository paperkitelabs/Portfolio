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

      {/* Background Text Layer — behind the 3D model */}
      <div className={styles.bgTextLayer}>
        <h2 className={styles.bgTextTop}>
          THINK CREATIVITY?
        </h2>
        <h2 className={styles.bgTextBottom}>
          THINK PAPERKITE
        </h2>
      </div>

      {/* 3D Paper Kite Model — centered, above bg text */}
      <div className={styles.modelContainer}>
        <PaperKite3D />
      </div>

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
