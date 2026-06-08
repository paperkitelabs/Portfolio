import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
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

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <a href="#home" className={styles.navLink}>Home</a>
        <a href="#services" className={styles.navLink}>Services</a>
        <a href="#about" className={styles.navLink}>About</a>
        <a href="#work" className={styles.navLink}>Work</a>
        <a href="#contact" className={styles.navLink}>Contact</a>
      </div>

      {/* CTA Button */}
      <button className={styles.ctaButton} id="nav-cta">
        Let&apos;s Talk
      </button>

      {/* Mobile Menu */}
      <button className={styles.menuButton} id="mobile-menu-btn" aria-label="Menu">
        <span className={styles.menuLine}></span>
        <span className={styles.menuLine}></span>
        <span className={styles.menuLine}></span>
      </button>
    </nav>
  );
}
