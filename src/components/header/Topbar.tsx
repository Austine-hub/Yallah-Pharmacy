import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Topbar.module.css";

const Topbar: React.FC = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for topbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.navbarContainer}>
        {/* === Logo Section === */}
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink} aria-label="Healthfield Pharmacy Home">
            <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src="/logo.png" alt="Healthfield Pharmacy logo" className={styles.logoImage} />
            </div>
             <div className={styles.logoText}>
                <span className={styles.maplewood}>HEALTHFIELD</span>
                <span className={styles.pharmacy}>PHARMACY</span>
                <span className={styles.tagline}>
                  Your Health, Our Mission — Reliable Care. Anytime
                </span>
              </div>
            </div>
          </Link>
        </div>

         {/* === Only “Shop Now” Button === */}
        
     <div id="navbar-menu" className={styles.navMenu} role="menu">
        <Link to="/shop" className={styles.enrollButton} role="menuitem">
          <span className={styles.enrollIcon}>▶</span>
          Shop Now
        </Link>
      </div>

      </div>
    </nav>
  );
};

export default Topbar;
