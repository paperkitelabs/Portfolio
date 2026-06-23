"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './ContactPageSection.module.css';
import Image from 'next/image';

export default function ContactPageSection() {
  const [method, setMethod] = useState('email'); // 'email' or 'call'
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // You can also trigger the auto-reply template automatically through the EmailJS dashboard's "Auto-Reply" tab on your main template, 
    // or by calling a second emailjs.send() here if needed.
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 4000);
    }, (error) => {
        console.error(error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
    });
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        
        {/* Left Visual Side */}
        <div className={styles.imageSide}>
          <Image 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2400&auto=format&fit=crop"
            alt="Creative studio setup"
            fill
            className={styles.contactImage}
          />
          <div className={styles.imageOverlay}>
            <h2 className={styles.imageTagline}>Let's build something remarkable.</h2>
          </div>
        </div>

        {/* Right Interactive Side */}
        <div className={styles.formSide}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Get in Touch</h1>
            <p className={styles.subtitle}>We'd love to hear about your next project.</p>
          </div>

          {/* Segmented Toggle Control */}
          <div className={styles.toggleContainer}>
            <motion.div 
              className={styles.toggleIndicator}
              animate={{ x: method === 'email' ? '0%' : '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button 
              className={`${styles.toggleBtn} ${method === 'email' ? styles.active : ''}`}
              onClick={() => setMethod('email')}
            >
              Email Us
            </button>
            <button 
              className={`${styles.toggleBtn} ${method === 'call' ? styles.active : ''}`}
              onClick={() => setMethod('call')}
            >
              Book a Call
            </button>
          </div>

          <div className={styles.contentArea}>
            <AnimatePresence mode="wait">
              {method === 'email' ? (
                <motion.form 
                  key="email"
                  ref={formRef}
                  className={styles.formArea}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={sendEmail}
                >
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Name</label>
                    <input type="text" name="from_name" className={styles.input} placeholder="John Doe" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input type="email" name="from_email" className={styles.input} placeholder="john@company.com" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Project Details</label>
                    <textarea name="message" className={styles.textarea} placeholder="Tell us about your goals..." required></textarea>
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error. Try again.' : 'Send Message'}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="call"
                  className={styles.bookingArea}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className={styles.bookingIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <h3 className={styles.bookingTitle}>Discovery Call</h3>
                  <p className={styles.bookingDesc}>Book a free 30-minute consultation with our team to discuss your project.</p>
                  <a href="https://cal.com/paper-kite-labs" target="_blank" rel="noopener noreferrer" className={styles.bookingBtn}>
                    Schedule Meeting
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
