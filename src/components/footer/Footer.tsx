import React, { useState } from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        {/* Desktop View */}
        <div className={styles.desktopView}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Shop by Category</h3>
            <ul className={styles.linkList}>
              <li><a href="/medical-conditions">Medical Conditions</a></li>
              <li><a href="/vitamins-supplements">Vitamins and Supplements</a></li>
              <li><a href="/personal-care">Personal Care</a></li>
              <li><a href="/beauty-skin-care">Beauty and Skin Care</a></li>
              <li><a href="/medical-devices">Medical Devices</a></li>
              <li><a href="/snacks-drinks">Snacks and Drinks</a></li>
              <li><a href="/offers">Offers</a></li>
              <li><a href="/new">New on HEALTHFIELD</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>About Us</h3>
            <ul className={styles.linkList}>
              <li><a href="/who-we-are">Who we are</a></li>
              <li><a href="/quality-statement">Our Quality Statement</a></li>
              <li><a href="/blog">Our Blog</a></li>
              <li><a href="/newsroom">Newsroom</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Help Centre</h3>
            <ul className={styles.linkList}>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/shipping">Shipping Policy</a></li>
              <li><a href="/returns">Return Policy</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Telehealth Partners</h3>
            <ul className={styles.linkList}>
              <li><a href="/healthx-africa">HealthX Africa</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Authorized Pharmacy</h3>
            <p className={styles.authText}>
              HEALTHFIELD is a registered pharmacy governed by the Pharmacy and Poisons Board of Kenya, PPB (K) Health Safety code P0940
            </p>
            <div className={styles.certificationBadge}>
              <img 
                src="/images/ppb-certification.png" 
                alt="Pharmacy and Poisons Board Certification" 
                className={styles.badgeImage}
              />
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className={styles.mobileView}>
          <div className={styles.accordionSection}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleSection('about')}
              aria-expanded={openSection === 'about'}
            >
              <span>About Us</span>
              <span className={`${styles.accordionIcon} ${openSection === 'about' ? styles.open : ''}`}>
                ▼
              </span>
            </button>
            {openSection === 'about' && (
              <div className={styles.accordionContent}>
                <ul className={styles.linkList}>
                  <li><a href="/who-we-are">Who we are</a></li>
                  <li><a href="/quality-statement">Our Quality Statement</a></li>
                  <li><a href="/blog">Our Blog</a></li>
                  <li><a href="/newsroom">Newsroom</a></li>
                </ul>
              </div>
            )}
          </div>

          <div className={styles.mobileSection}>
            <h3 className={styles.mobileSectionTitle}>Telehealth Partners</h3>
            <ul className={styles.linkList}>
              <li><a href="/healthx-africa">HealthX Africa</a></li>
            </ul>
          </div>

          <div className={styles.mobileSection}>
            <h3 className={styles.mobileSectionTitle}>Authorized Pharmacy</h3>
            <p className={styles.authText}>
              HEALTHFIELD is a registered pharmacy governed by the Pharmacy and Poisons Board of Kenya, PPB (K) Health Safety code P0940
            </p>
            <div className={styles.certificationBadge}>
              <img 
                src="/images/ppb-certification.png" 
                alt="Pharmacy and Poisons Board Certification" 
                className={styles.badgeImage}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;