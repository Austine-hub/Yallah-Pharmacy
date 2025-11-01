import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './Header.module.css';
import logo from "/icon.ico"; // adjust path if needed


interface NavLink {
  label: string;
  path: string;
}

interface NavSection {
  label: string;
  key: string;
  path?: string;
  links?: NavLink[];
}

interface HeaderProps {
  onLocationChange?: (location: string) => void;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryLocation] = useState('Juja');
  const [cartCount] = useState(3);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const navigationSections: NavSection[] = useMemo(
    () => [
      { label: "Home", key: "home", path: "/" },
      { label: "Our Services", key: "services", path: "/about-us/" },
      {
        label: "Shop By Category",
        key: "category",
        links: [
          { label: "Skin Care", path: "/categories/skin-care" },
          { label: "Beauty & Cosmetics", path: "/categories/beauty-care-cosmetics" },
          { label: "Vitamins & Supplements", path: "/categories/vitamins-supplements" },
          { label: "Medicine", path: "/categories/medicine" },
          { label: "Hygiene", path: "/categories/general-hygiene" },
          { label: "Home Healthcare", path: "/categories/home-healthcare" },
        ],
      },
      {
        label: "Shop By Body System",
        key: "system",
        links: [
          { label: "Sexual and Reproductive", path: "/system/reproductive" },
          { label: "Breathing and Respiratory System", path: "/system/respiratory" },
          { label: "Diabetes", path: "/system/diabetes" },
          { label: "Digestion and Eating", path: "/system/git" },
          { label: "Kidneys and Renal", path: "/system/renal" },
          { label: "Nervous", path: "/system/nervous" },
          { label: "Skin Treatment", path: "/system/skin-treatment" },
          { label: "Ear & Eye Care", path: "/system/ent" },
          { label: "Oral Hygiene", path: "/system/oral-hygiene" },
          { label: "Muscles and Bones", path: "/system/msk" },
        ],
      },

      { label: "Submit a Prescription", key: "prescription", path: "/prescription" },

      {
        label: "Shop By Condition",
        key: "condition",
        links: [
          { label: "Hypertension", path: "/conditions/htn" },
          { label: "Diabetes", path: "/conditions/diabetes" },
          { label: "Cough, Cold & Flu", path: "/conditions/flu" },
          { label: "UTI Infections", path: "/conditions/uti-infections" },
          { label: "Skin Treatment", path: "/conditions/skin-treatment" },
          { label: "Ear & Eye Care", path: "/conditions/ear-eye-care"},
          { label: "Oral Hygiene", path: "/conditions/oral-hygiene" },
        ],
      },

      { label: "Our Blog", key: "blog", path: "/blog" },

      { label: "Contact Us", key: "contact", path: "/contact-us" },
    ],
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = (key: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleMobileSection = (key: string) => {
    setMobileActiveSection(mobileActiveSection === key ? null : key);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Desktop Header */}
              <div className={styles.desktopHeader}>
                <div className={styles.topBar}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                      <a href="/" aria-label="Home" className={styles.logoContainer}>
                        <img src={logo} alt="Company Logo" className={styles.logoImage} />
                      </a>

                      <a href="/" aria-label="YALLAH PHARMACY" className={styles.logoTextGroup}>
                        <div className={styles.logoText}>
                          <span className={styles.logoHealth}>YALLAH</span>
                          <span className={styles.logoField}>PHARMACY</span>
                        </div>
                        <span className={styles.logoTagline}>caring beyond drugs</span>
                      </a>
                    </div>


              <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  placeholder="Search for products, medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search for products"
                />
                <button type="submit" className={styles.searchButton} aria-label="Search">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </form>

              <div className={styles.deliverTo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                </svg>
                <div className={styles.locationInfo}>
                  <span className={styles.deliverLabel}>Deliver to</span>
                  <span className={styles.locationName}>{deliveryLocation}</span>
                </div>
              </div>

              <div className={styles.headerActions}>
                <button className={styles.iconButton} aria-label="My Account">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className={styles.iconButton} aria-label="Wishlist">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button className={styles.cartButton} aria-label="Shopping Cart">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                </button>
              </div>
            </div>
          </div>

          <nav className={styles.mainNav}>
            <div className={styles.container}>
              <ul className={styles.navList}>
                {navigationSections.map((section) => (
                  <li 
                    key={section.key}
                    className={section.links ? styles.hasDropdown : ''}
                    onMouseEnter={() => section.links && handleMouseEnter(section.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a 
                      href={section.path || '#'}
                      className={activeDropdown === section.key ? styles.active : ''}
                      onClick={(e) => section.links && e.preventDefault()}
                    >
                      {section.label}
                      {section.links && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.dropdownIcon}>
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </a>
                    {section.links && activeDropdown === section.key && (
                      <div className={styles.dropdown}>
                        <ul>
                          {section.links.map((link) => (
                            <li key={link.path}>
                              <a href={link.path}>{link.label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <a href="tel:+254111054949" className={styles.phoneNumber}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +254 111 054 949
              </a>
            </div>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileTopBar}>
            <button 
              className={styles.menuToggle} 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={styles.mobileLogo}>
              <a href="/" aria-label="Yallah Pharmacy">
                <span className={styles.logoText}>
                  <span className={styles.logoHealth}>YALLAH</span>
                  <span className={styles.logoField}>PHARMACY</span>
                </span>
                <span className={styles.logoTagline}>caring beyond drugs</span>
              </a>
            </div>

            <button className={styles.mobileCartButton} aria-label="Shopping Cart">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </button>
          </div>

          <form className={styles.mobileSearchBar} onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search for products"
            />
            <button type="submit" className={styles.searchButton} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </form>

          <div className={styles.mobileActionButtons}>
            <button className={styles.prescriptionButton}>
              Submit a Prescription
            </button>
            <button className={styles.consultationButton}>
              Book a Consultation
            </button>
          </div>

          <div className={styles.mobileDeliverTo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
            </svg>
            <span>Deliver to <strong>{deliveryLocation}</strong></span>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.menuOverlay}>
          <div ref={menuRef} className={styles.mobileMenu}>
            <div className={styles.menuHeader}>
              <div className={styles.userSection}>
                <div className={styles.userAvatar}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className={styles.userName}>My Account</span>
              </div>
            </div>

            <nav className={styles.menuNav}>
              <ul>
                {navigationSections.map((section) => (
                  <li key={section.key} className={section.links ? styles.hasSubmenu : ''}>
                    {section.links ? (
                      <>
                        <button 
                          className={styles.submenuToggle}
                          onClick={() => toggleMobileSection(section.key)}
                          aria-expanded={mobileActiveSection === section.key}
                        >
                          <span>{section.label}</span>
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            className={mobileActiveSection === section.key ? styles.rotated : ''}
                          >
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {mobileActiveSection === section.key && (
                          <ul className={styles.submenu}>
                            {section.links.map((link) => (
                              <li key={link.path}>
                                <a href={link.path}>{link.label}</a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a href={section.path}>{section.label}</a>
                    )}
                  </li>
                ))}
              </ul>

              <div className={styles.menuFooter}>
                <a href="tel:+254111054949" className={styles.menuPhoneButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Call Us: +254 111 054 949
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;