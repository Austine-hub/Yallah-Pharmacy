// src/components/Navbar.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

/**
 * Refactored Navbar
 * - separate desktop/mobile dropdown state to avoid interference
 * - ESC key support to close menus
 * - useMemo for menu data (performance)
 * - react-router <Link> used for navigation (no full page reload)
 * - click-outside closes desktop dropdowns
 * - mobile menu closes when a link is clicked
 *
 * Note: keep CSS classes in Navbar.module.css for animations (mobile submenu .open)
 */

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // separate dropdown states for desktop and mobile
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  // refs
  const desktopNavRef = useRef<HTMLDivElement | null>(null);

  // ===== Menu data (memoized) =====
  const menus = useMemo(
    () => [
      {
        label: "Shop By Category",
        key: "category",
        links: [
          ["Skin Care", "/categories/skin-care"],
          ["Beauty & Cosmetics", "/categories/beauty-care-cosmetics"],
          ["Vitamins & Supplements", "/categories/vitamins-supplements"],
          ["Medicine", "/categories/medicine"],
          ["Hygiene", "/categories/general-hygiene"],
          ["Home Healthcare", "/categories/home-healthcare"],

        ] as [string, string][],
      },


            {
        label: "Shop By Body System",
        key: "system",
        links: [
          ["Breathing", "/system/respiratory"],
          ["Digestion and Eating", "/system/git"],
          ["Nervous", "/system/nervous"],
          ["Sexual and Reproductive", "/system/reproductive"],
          ["Skin Treatment", "/system/skin-treatment"],
          ["Kidneys and renal", "/system/renal"],
          ["Diabetes", "/system/diabetes"],
          ["Ear & Eye Care", "/system/ear-eye-care"],
          ["Oral Hygiene", "/system/oral-hygiene"],
          ["Muscles and Bones", "/system/msk"],
        ] as [string, string][],
      },

      {
        label: "Shop By Condition",
        key: "condition",
        links: [
          ["Hypertension", "/conditions/hypertension"],
          ["Diabetes", "/conditions/diabetes"],
          ["Malaria", "/conditions/malaria"],
          ["Fungal Infection", "/conditions/fungal-infection"],
          ["Skin Treatment", "/conditions/skin-treatment"],
          ["UTI Infections", "/conditions/uti-infections"],
          ["Cough, Cold & Flu", "/conditions/cough-cold-flu"],
          ["Ear & Eye Care", "/conditions/ear-eye-care"],
          ["Oral Hygiene", "/conditions/oral-hygiene"],
        ] as [string, string][],
      },
      {
        label: "Prescription Assistance",
        key: "prescription",
        links: [
          ["Upload Prescription", "/prescription/upload"],
          ["Request Prescription", "/prescription/refill"],
          ["Talk to a Pharmacist", "/prescription/support"],
        ] as [string, string][],
      },
    ],
    []
  );

  // additional mobile-only menus
  const mobileExtraMenus = useMemo(
    () => [
      {
        label: "Brands",
        key: "brands-mobile",
        links: [
          ["Pfizer", "/brands/pfizer"],
          ["GSK", "/brands/gsk"],
          ["Johnson & Johnson", "/brands/johnson-johnson"],
          ["Bayer", "/brands/bayer"],
          ["Novartis", "/brands/novartis"],
        ] as [string, string][],
      },
    ],
    []
  );

  // ===== Scroll, click-outside and ESC handling =====
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    const handleDocMouseDown = (event: MouseEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
        setOpenDesktopDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleDocMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleDocMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close mobile menu when viewport becomes desktop-sized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        // arbitrary breakpoint - adjust to match your CSS
        setIsMobileMenuOpen(false);
        setOpenMobileDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== Toggle helpers =====
  const toggleDesktopDropdown = (key: string) =>
    setOpenDesktopDropdown((prev) => (prev === key ? null : key));

  const toggleMobileDropdown = (key: string) =>
    setOpenMobileDropdown((prev) => (prev === key ? null : key));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((v) => !v);
    // when opening mobile menu, ensure desktop dropdowns are closed
    if (!isMobileMenuOpen) {
      setOpenDesktopDropdown(null);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* LOGO */}
        <Link to="/" className={styles.logo} aria-label="Home">
          <div className={styles.logoIcon}>
            <div className={styles.logoGrid}>
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className={styles.desktopNav} ref={desktopNavRef} role="menubar">
          {menus.map((menu) => (
            <div key={menu.key} className={styles.menuDropdown}>
              <button
                className={styles.menuItem}
                onClick={() => toggleDesktopDropdown(menu.key)}
                aria-expanded={openDesktopDropdown === menu.key}
                aria-haspopup="true"
                aria-controls={`${menu.key}-menu`}
              >
                {menu.label}
                <ChevronDown
                  size={16}
                  className={`${styles.chevron} ${
                    openDesktopDropdown === menu.key ? styles.open : ""
                  }`}
                />
              </button>

              <ul
                id={`${menu.key}-menu`}
                className={`${styles.dropdownMenu} ${
                  openDesktopDropdown === menu.key ? styles.open : ""
                }`}
                role="menu"
                aria-hidden={openDesktopDropdown !== menu.key}
              >
                {menu.links.map(([text, href]) => (
                  <li key={href} role="none">
                    <Link
                      to={href}
                      className={styles.dropdownLink}
                      role="menuitem"
                      tabIndex={openDesktopDropdown === menu.key ? 0 : -1}
                      onClick={() => setOpenDesktopDropdown(null)}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* STATIC LINKS */}
          <Link to="/new-arrivals" className={styles.navLink}>
            <span className={styles.badge}>New Arrivals</span>
          </Link>
          <Link to="/trending" className={styles.navLink}>
            Trending
          </Link>
         {/*<Link to="/offers" className={styles.navLink}>
            <span className={styles.badge}>Offers</span>
          </Link>*/}
          <Link to="/best-sellers" className={styles.navLink}>
            Best Sellers
          </Link>
          <Link to="/about-us" className={styles.navLink}>
            About Us
          </Link>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className={styles.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {isMobileMenuOpen && (
          <div className={styles.mobileMenuContent}>
            {[...menus, ...mobileExtraMenus].map((menu) => {
              const mobileKey = `${menu.key}-mobile`;
              return (
                <div key={mobileKey} className={styles.mobileDropdown}>
                  <button
                    className={styles.mobileMenuItem}
                    onClick={() =>
                      // map desktop menu keys to mobile keys consistently
                      toggleMobileDropdown(mobileKey)
                    }
                    aria-expanded={openMobileDropdown === mobileKey}
                    aria-controls={`${mobileKey}-submenu`}
                  >
                    {menu.label}
                    <ChevronDown
                      size={16}
                      className={`${styles.chevron} ${
                        openMobileDropdown === mobileKey ? styles.open : ""
                      }`}
                    />
                  </button>

                  <ul
                    id={`${mobileKey}-submenu`}
                    className={`${styles.mobileSubmenu} ${
                      openMobileDropdown === mobileKey ? styles.open : ""
                    }`}
                    aria-hidden={openMobileDropdown !== mobileKey}
                  >
                    {menu.links.map(([text, href]) => (
                      <li key={href}>
                        <Link
                          to={href}
                          onClick={closeMobileMenu}
                          className={styles.mobileNavLink}
                        >
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}







            {/* static mobile links */}
            <Link to="/new-arrivals" onClick={closeMobileMenu} className={styles.mobileNavLink}>
              <span className={styles.badge}>New Arrivals</span>
            </Link>

            <Link to="/trending" onClick={closeMobileMenu} className={styles.mobileNavLink}>
              Trending
            </Link>


            <Link to="/best-sellers" onClick={closeMobileMenu} className={styles.mobileNavLink}>
              Best Sellers
            </Link>

            <Link to="/about-us" onClick={closeMobileMenu} className={styles.mobileNavLink}>
              About Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
