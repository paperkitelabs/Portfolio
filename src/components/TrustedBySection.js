import Image from 'next/image';
import styles from './TrustedBySection.module.css';

const clients = [
  {
    name: 'JSW Steel',
    logo: 'https://res.cloudinary.com/dgooptuqc/image/upload/v1784442903/jsw-logo-jv_bjyl0p.webp',
    text: 'JSW Steel — Automated CAD drawing review, cutting engineering hours significantly',
  },
  {
    name: 'More Creative House',
    logo: 'https://res.cloudinary.com/dgooptuqc/image/upload/v1784442903/images_yhsujs.png',
    text: 'More Creative House',
  },
  {
    name: 'KCE Automation',
    logo: 'https://res.cloudinary.com/dgooptuqc/image/upload/v1784442903/1631303485978_nrr8yo.jpg',
    text: 'KCE Automation',
  },
  {
    name: 'Many More',
    text: 'and many more...',
    isTextOnly: true,
  },
];

export default function TrustedBySection() {
  return (
    <section className={styles.trustedSection} id="trusted-by">
      <div className={styles.container}>
        <h3 className={styles.sectionTitle}>TRUSTED BY</h3>
        
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {/* Render two sets of clients for seamless infinite scroll */}
            {[...clients, ...clients].map((client, index) => (
              <div className={styles.clientCard} key={index} style={client.isTextOnly ? { justifyContent: 'center' } : {}}>
                {client.isTextOnly ? (
                  <p className={styles.clientText} style={{ fontStyle: 'italic', color: '#888' }}>
                    {client.text}
                  </p>
                ) : (
                  <>
                    <div className={styles.logoContainer}>
                      <Image 
                        src={client.logo}
                        alt={`${client.name} Logo`}
                        width={160}
                        height={60}
                        className={styles.clientLogo}
                      />
                    </div>
                    <p className={styles.clientText}>
                      {client.text}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <span className={styles.statItem}>Multiple Industries Served</span>
          <span className={styles.statDot}>·</span>
          <span className={styles.statItem}>4 Core Services</span>
          <span className={styles.statDot}>·</span>
          <span className={styles.statItem}>100% Custom Built</span>
        </div>
      </div>
    </section>
  );
}
