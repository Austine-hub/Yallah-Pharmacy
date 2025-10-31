// File: src/dropdowns/Equipment.tsx
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import styles from "./Equipment.module.css";

// === Import Local Images (replace with optimized CDN or WebP later) ===
import image1 from "../assets/Equipment/BP.png";
import image2 from "../assets/Equipment/Glucose-meter.png";
import image3 from "../assets/Equipment/Oximeter.png";
import image4 from "../assets/Equipment/Portable-Nebulizer.png";
import image5 from "../assets/Equipment/Stethoscope.png";
import image6 from "../assets/Equipment/Weifgt-scale.png";
import image7 from "../assets/Equipment/Walker.png";
import image8 from "../assets/Equipment/Wheelchair.png";
import image9 from "../assets/Equipment/Portable-Oxygen-Concentrator.png";
import image10 from "../assets/Equipment/First-Aid-Kit.png";
import image11 from "../assets/Equipment/Home-Infusion-Pump (Ambulatory).png";
import image12 from "../assets/Equipment/TENS Unit (Pain Relief Electrotherapy).png";
import image13 from "../assets/Equipment/Suction.png";

// Example environment variable for WhatsApp number
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "254796787207";

interface Product {
  id: string;
  name: string;
  category: string;
  packSize?: string;
  sku?: string;
  currentPrice?: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  stock?: number;
  rating?: number;
}

// --- Data: Seeded for now (scalable for API use) ---
const productsSeed: Product[] = [
  { id: "bp-omron-001", name: "Upper-Arm Digital Blood Pressure Monitor", category: "Monitoring", packSize: "Unit", currentPrice: 5500, originalPrice: 7500, discount: "26% Off", image: image1, stock: 12, rating: 4.5 },
  { id: "glucometer-001", name: "Blood Glucose Meter Kit", category: "Diabetes Care", packSize: "Kit", currentPrice: 2200, originalPrice: 2800, discount: "21% Off", image: image2, stock: 30, rating: 4.4 },
  { id: "oximeter-001", name: "Finger Pulse Oximeter", category: "Monitoring", packSize: "Unit", currentPrice: 900, image: image3, stock: 40, rating: 4.3 },
  { id: "nebulizer-001", name: "Portable Nebulizer", category: "Respiratory", packSize: "Unit", currentPrice: 3500, image: image4, stock: 18, rating: 4.1 },
  { id: "stethoscope-001", name: "Clinical Stethoscope", category: "Diagnostics", packSize: "Unit", currentPrice: 1800, image: image5, stock: 22, rating: 4.6 },
  { id: "scale-digital-001", name: "Digital Body Weight Scale", category: "Monitoring", packSize: "Unit", currentPrice: 2400, image: image6, stock: 16, rating: 4.0 },
  { id: "walker-001", name: "Adjustable Walker", category: "Mobility Aids", packSize: "Unit", currentPrice: 4200, image: image8, stock: 8, rating: 4.1 },
  { id: "wheelchair-basic-001", name: "Manual Wheelchair", category: "Mobility Aids", packSize: "Unit", currentPrice: 12500, image: image7, stock: 4, rating: 4.2 },
  { id: "oxygen-conc-001", name: "Portable Oxygen Concentrator (Lightweight)", category: "Respiratory", packSize: "Unit", currentPrice: 85000, image: image9, stock: 2, rating: 4.4 },
  { id: "firstaid-001", name: "First Aid Kit (Household, 120 pcs)", category: "First Aid", packSize: "Kit", currentPrice: 1500, image: image10, stock: 60, rating: 4.7 },
  { id: "infusion-pump-001", name: "Home Infusion Pump (Ambulatory)", category: "Therapy", packSize: "Unit", currentPrice: 42000, image: image11, stock: 1, rating: 4.3 },
  { id: "tens-001", name: "TENS Unit (Pain Relief Electrotherapy)", category: "Therapy", packSize: "Unit", currentPrice: 2100, image: image12, stock: 20, rating: 4.1 },
  { id: "suction-001", name: "Portable Suction Device (Emergency)", category: "Emergency", packSize: "Unit", currentPrice: 5600, image: image13, stock: 6, rating: 4.0 }

];

const Equipment: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const products = useMemo(() => productsSeed, []);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 300);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Listen for resize/scroll to auto-enable/disable arrows
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    updateScrollButtons();
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scroll("left");
      if (e.key === "ArrowRight") scroll("right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scroll]);

  const formatPrice = (value?: number) =>
    value
      ? new Intl.NumberFormat("en-KE", {
          style: "currency",
          currency: "KES",
        })
          .format(value)
          .replace("KSh", "KSH")
      : "Contact for price";

  const orderViaWhatsApp = (p: Product) => {
    const text = encodeURIComponent(
      `Hello! I'm interested in ${p.name} (${p.category}). Price: ${formatPrice(p.currentPrice)}. Product ID: ${p.id}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <section className={styles.section} aria-labelledby="equipment-title">
      <div className={styles.header}>
        <h2 id="equipment-title" className={styles.title}>
          Popular Medical Equipment
        </h2>

        <div className={styles.navGroup} role="group" aria-label="scroll buttons">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ""}`}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ""}`}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={scrollRef} className={styles.productsWrapper} tabIndex={0}>
        {products.map((p) => (
          <article key={p.id} className={styles.card}>
            {p.discount && <span className={styles.badge}>{p.discount}</span>}
            <div className={styles.imageBox}>
              <img src={p.image} alt={p.name} loading="lazy" decoding="async" className={styles.image} />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.meta}>
                {p.category}
                {p.packSize && ` • ${p.packSize}`}
              </p>
              <div className={styles.priceRow}>
                <span className={styles.current}>{formatPrice(p.currentPrice)}</span>
                {p.originalPrice && <span className={styles.old}>{formatPrice(p.originalPrice)}</span>}
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => orderViaWhatsApp(p)}
                  className={styles.orderBtn}
                  aria-label={`Order ${p.name}`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M20.52 3.48A11.93 11.93 0 0012 .5C6.21.5 1.5 5.2 1.5 11c0 1.94.5 3.82 1.45 5.47L.5 23.5l7.2-1.88A11.5 11.5 0 0012 22.5c5.79 0 10.5-4.7 10.5-10.5 0-3-1.17-5.78-3.98-7.52z"
                    />
                  </svg>
                  Order
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default React.memo(Equipment);
