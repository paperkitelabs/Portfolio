"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './CreativeWorkSection.module.css';
import Image from 'next/image';

// Utility to optimize Cloudinary URLs automatically
export function optimizeCloudinaryUrl(url) {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (url.includes('/upload/q_') || url.includes('/upload/f_')) return url;
  // Apply a unified w_600 compression. By using the EXACT same URL for both 
  // the filmstrip and the hover videos, the browser will cache the video data 
  // and load the hover preview instantly from memory.
  return url.replace('/upload/', '/upload/q_auto:eco,f_auto,w_600/');
}

// Cinematic assets for the Film Strip (playing as actual videos)
const filmStripItems = [
  "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213294/joy_COMMERCIAL_TRIAL_r0iwks.mp4",
  "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227504/0623_it4kdj.mp4",
  "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213279/Attar_final_rshgky.mp4",
  "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213326/Cole_bag_adv_z7q7hq.mp4",
  "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227684/0526_1_grdiio.mp4",
  "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213270/Final_Bagan_Dmeo_ghkbny.mp4",
  "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213341/pan_2_ta7lvw.mp4"
];

// Ensure exactly 10 items to maintain the perfect 3D cylinder proportions (radius = 850px)
// We use all 7 items, plus the first 3 again to close the loop perfectly.
const cylinderItems = [...filmStripItems, ...filmStripItems.slice(0, 3)];
const TOTAL_ITEMS = 10;
const DEGREES_PER_ITEM = 360 / TOTAL_ITEMS;

// Video projects for the Pinterest Grid
const videoProjects = [
  {
    title: "JOY Beverage Campaign",
    description: "High-energy cinematic commercial for a premium African beverage brand.",
    category: "Commercial",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213294/joy_COMMERCIAL_TRIAL_r0iwks.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213294/joy_COMMERCIAL_TRIAL_r0iwks.mp4"
  },
  {
    title: "An Animated Love Story",
    description: "A beautifully crafted Disney-style 3D animation detailing a couple's romantic journey.",
    category: "Animation",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227504/0623_it4kdj.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227504/0623_it4kdj.mp4"
  },
  {
    title: "Bagan Attar Essence",
    description: "A visually rich, sensory advertisement showcasing a luxury fragrance line.",
    category: "Product Film",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213279/Attar_final_rshgky.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213279/Attar_final_rshgky.mp4"
  },
  {
    title: "Cole Luxury Bags",
    description: "Sleek, high-fashion cinematic showcase highlighting premium leather craftsmanship.",
    category: "Fashion",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213326/Cole_bag_adv_z7q7hq.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213326/Cole_bag_adv_z7q7hq.mp4"
  },
  {
    title: "Mission Kamyabi Anthem",
    description: "Powerful brand video designed to inspire for a leading business coaching center.",
    category: "Brand Story",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227684/0526_1_grdiio.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782227684/0526_1_grdiio.mp4"
  },
  {
    title: "Bagan Premium Dryfruits",
    description: "Mouth-watering cinematic product showcase for premium organic dry fruits.",
    category: "Food & Beverage",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213270/Final_Bagan_Dmeo_ghkbny.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213270/Final_Bagan_Dmeo_ghkbny.mp4"
  },
  {
    title: "Forever Consultants Profile",
    description: "Professional corporate presentation for an elite insurance and mutual funds advisory firm.",
    category: "Corporate",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213689/Marathi_of_Sujata_Gandhi_forever_consultants_w6i1pz.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213689/Marathi_of_Sujata_Gandhi_forever_consultants_w6i1pz.mp4"
  },
  {
    title: "The Author's Journey",
    description: "Engaging promotional showcase highlighting a prolific author's complete book collection.",
    category: "Editorial",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213293/santosh_Sir_Books_mpwkby.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213293/santosh_Sir_Books_mpwkby.mp4"
  },
  {
    title: "Cinematic Product Reveal",
    description: "A dynamic, high-impact paid video advertisement featuring stunning motion visuals.",
    category: "Advertising",
    thumbnail: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213341/pan_2_ta7lvw.jpg",
    videoUrl: "https://res.cloudinary.com/dgooptuqc/video/upload/v1782213341/pan_2_ta7lvw.mp4"
  },
];

/* ---- Video Card Component (Desktop) ---- */
function VideoCard({ project, isHovered, onHover, onLeave, isMuted, setIsMuted }) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasHovered, setHasHovered] = useState(false); // Used to strictly lazy-load the video src

  useEffect(() => {
    if (isHovered && !hasHovered) {
      setHasHovered(true); // Mount the video src permanently once hovered
    }
  }, [isHovered, hasHovered]);

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isHovered) {
      // Small timeout ensures the src has been set and DOM updated before calling play
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          setIsLoading(true);
          videoRef.current.play().catch(() => setIsLoading(false));
        }
      }, 50);
    } else {
      videoRef.current.pause();
      setIsLoading(false);
    }
  }, [isHovered]);

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={`${styles.masonryItem} ${isHovered ? styles.masonryItemActive : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Thumbnail */}
      <img
        src={optimizeCloudinaryUrl(project.thumbnail)}
        alt={project.title}
        className={styles.masonryImage}
        loading="lazy"
      />

      {/* Video layer (strictly lazy loaded) */}
      <video
        ref={videoRef}
        className={`${styles.masonryVideo} ${isHovered ? styles.masonryVideoVisible : ''}`}
        src={hasHovered ? optimizeCloudinaryUrl(project.videoUrl) : undefined}
        muted={isMuted}
        loop
        playsInline
        preload="none"
        onPlaying={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />

      {/* Loading indicator */}
      {isHovered && isLoading && (
        <div className={styles.loaderContainer}>
          <div className={styles.dotsLoader}></div>
        </div>
      )}

      {/* Sound Toggle Button */}
      {isHovered && (
        <button className={styles.muteButton} onClick={toggleMute} aria-label="Toggle Sound">
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      )}

      {/* Info overlay — always visible */}
      <div className={styles.masonryOverlay}>
        <span className={styles.itemCategory}>{project.category}</span>
        <h3 className={styles.itemTitle}>{project.title}</h3>
        <p className={styles.itemDescription}>{project.description}</p>
      </div>

      {/* Play icon on hover */}
      {isHovered && (
        <motion.div
          className={styles.playIndicator}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

/* ---- Reel Card Component (Mobile — Instagram Reels Replica) ---- */
function ReelCard({ project, index, totalReels, isMuted, setIsMuted }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  // IntersectionObserver to auto-play when snapped into view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.7 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isVisible) {
      setIsPaused(false);
      setIsLoading(true);
      videoRef.current.play().catch(() => setIsLoading(false));
    } else {
      videoRef.current.pause();
      setIsLoading(false);
    }
  }, [isVisible]);

  // Tap to pause/play
  const handleTap = (e) => {
    // Don't trigger on button clicks
    if (e.target.closest('button')) return;
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  // Double-tap to like
  const lastTap = useRef(0);
  const handleDoubleTap = (e) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // Double tap detected
      setIsLiked(true);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
    lastTap.current = now;
  };

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const canonicalUrl = 'https://paperkitelabs.com/creative-work';
    const shareData = {
      title: `${project.title} — Paper Kite Labs`,
      text: `${project.title} — ${project.description} #PaperKiteLabs #AIVideo #CreativeWork`,
      url: canonicalUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(canonicalUrl);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      // User cancelled share or error — silently ignore
    }
  };

  return (
    <div className={styles.reelCard} ref={cardRef} onClick={(e) => { handleDoubleTap(e); handleTap(e); }}>
      {/* Full-screen video */}
      <video
        ref={videoRef}
        className={styles.reelVideo}
        src={optimizeCloudinaryUrl(project.videoUrl)}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className={styles.reelLoader}>
          <div className={styles.reelSpinner} />
        </div>
      )}

      {/* Pause icon (shows momentarily on tap) */}
      {isPaused && (
        <div className={styles.reelPauseIcon}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Double-tap heart animation */}
      {showHeart && (
        <div className={styles.reelHeartBurst}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="#ff3040">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      )}

      {/* Top progress dots */}
      <div className={styles.reelProgressDots}>
        {Array.from({ length: totalReels }, (_, i) => (
          <div key={i} className={`${styles.reelDot} ${i === index ? styles.reelDotActive : ''}`}>
            {i === index && isVisible && (
              <div className={styles.reelDotFill} />
            )}
          </div>
        ))}
      </div>

      {/* Right-side action bar (Instagram style) */}
      <div className={styles.reelActions}>
        {/* Like */}
        <button className={styles.reelActionBtn} onClick={handleLike}>
          {isLiked ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff3040">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </button>

        {/* Share */}
        <button className={styles.reelActionBtn} onClick={handleShare}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>

        {/* Sound */}
        <button className={styles.reelActionBtn} onClick={toggleMute}>
          {isMuted ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Bottom-left info (Instagram style) */}
      <div className={styles.reelInfo}>
        <div className={styles.reelAuthor}>
          <div className={styles.reelAvatar}>
            <Image
              src="https://res.cloudinary.com/dgooptuqc/image/upload/v1784444008/logo_xgseu4.png"
              alt="Paper Kite Labs"
              width={32}
              height={32}
              className={styles.reelAvatarImg}
            />
          </div>
          <span className={styles.reelUsername}>paperkitelabs</span>
          <span className={styles.reelCategoryBadge}>{project.category}</span>
        </div>
        <h3 className={styles.reelTitle}>{project.title}</h3>
        <p className={styles.reelCaption}>{project.description}</p>
      </div>

      {/* Bottom gradient scrim */}
      <div className={styles.reelScrim} />
    </div>
  );
}

export default function CreativeWorkSection() {
  const [radius, setRadius] = useState(850);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [globalMuted, setGlobalMuted] = useState(true); // Global sound state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setRadius(500);
      } else {
        setRadius(850);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.creativeSection} id="creative">

      {/* Part 1: Film Strip with Blur + Heading Overlay */}
      <div className={styles.filmStripHero}>
        {/* Blurred Film Strip Background */}
        <div className={styles.filmStripWrapper}>
          <div className={styles.filmTrack3D}>
            <motion.div
              className={styles.marqueeContainer}
              animate={{ rotateY: [0, -360] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 30
              }}
            >
              {cylinderItems.map((item, i) => {
                const rotateY = i * DEGREES_PER_ITEM;
                return (
                  <div
                    key={i}
                    className={styles.filmFrame}
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(-${radius}px)`
                    }}
                  >
                    <div className={styles.frameContent}>
                      <video
                        src={optimizeCloudinaryUrl(item)}
                        className={styles.frameImage}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Heading Overlay — sits on top of the blurred strip */}
        <div className={styles.heroOverlay}>
          <motion.span
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Creative Archive
          </motion.span>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Films & Visions
          </motion.h2>
          <motion.p
            className={styles.sectionDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            AI-powered video production, cinematic brand stories, and scroll-stopping content.
          </motion.p>
        </div>
      </div>

      {/* Part 2: Desktop = Pinterest Grid | Mobile = Reels */}
      {isMobile ? (
        <div className={styles.reelsContainer}>
          {videoProjects.map((project, i) => (
            <ReelCard
              key={i}
              project={project}
              index={i}
              totalReels={videoProjects.length}
              isMuted={globalMuted}
              setIsMuted={setGlobalMuted}
            />
          ))}
        </div>
      ) : (
        <div className={styles.masonryContainer}>
          <div className={`${styles.masonryGrid} ${hoveredIndex !== null ? styles.masonryGridHovered : ''}`}>
            {videoProjects.map((project, i) => (
              <VideoCard
                key={i}
                project={project}
                isHovered={hoveredIndex === i}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
                isMuted={globalMuted}
                setIsMuted={setGlobalMuted}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
