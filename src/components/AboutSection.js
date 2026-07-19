"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale from 40% to 100% (0% -> 25% scroll)
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.25], ["64px", "0px"]);

  // Overlay fades in (25% -> 35%)
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  // "WHO WE ARE" (Giant) fades in (30% -> 40%), stays, fades out (50% -> 60%)
  const hugeTextOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const hugeTextScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.2]);

  // The answer fades in much earlier (60% -> 70%) and stays until the very end (100%)
  // This guarantees it is fully visible and solid for a very long time
  const answerOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const answerY = useTransform(scrollYProgress, [0.6, 0.7], [40, 0]);

  return (
    <section className={styles.aboutSection} ref={containerRef} id="about" aria-label="About Paper Kite Labs — Who We Are">
      <div className={styles.stickyContainer}>
        <motion.div 
          className={styles.imageWrapper}
          style={{ scale, borderRadius }}
        >
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
            alt="Abstract architecture defining Paper Kite Labs" 
            className={styles.definingImage} 
          />
          
          <motion.div className={styles.contentOverlay} style={{ opacity: overlayOpacity }}>
            
            {/* Giant "WHO WE ARE" */}
            <motion.div className={styles.hugeTextContainer} style={{ opacity: hugeTextOpacity, scale: hugeTextScale }}>
               <h2 className={styles.hugeTitle}>WHO WE ARE?</h2>
            </motion.div>

            {/* The Answer Text - Stays on screen */}
            <motion.div className={styles.answerContainer} style={{ opacity: answerOpacity, y: answerY }}>
              <span className={styles.answerSubtitle}>WHO WE ARE?</span>
              <h3 className={styles.answerTitle}>
                We are architects of the digital frontier, engineering intelligent systems that defy gravity.
              </h3>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
