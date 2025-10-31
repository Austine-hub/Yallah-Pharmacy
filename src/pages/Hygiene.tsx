// ===============================================================
// ✅ Offers2.tsx — Campus Popular Pharmacy & Hygiene Products (2025)
// ===============================================================

import React, { useRef, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import styles from "./Hygiene.module.css";



// === Import images ===
import pic1 from "../assets/products/Durex-Fetherlite-Condoms.png";
import pic2 from "../assets/products/Always-Ultra-Thin-Pads-8s.png";
import pic3 from "../assets/products/Swift-Pregnancy-Test-Kit.png";
import pic4 from "../assets/products/Panadol-Extra-10s.png";
import pic5 from "../assets/products/Strepsils-Lozenges-24s.png";
import pic6 from "../assets/products/E45 Moisturizing-Cream-100g.png";
import pic7 from "../assets/products/Dettol-hand-sanitizer-50ml.png";
import pic8 from "../assets/products/Gaviscon-peppermint-liquid-200ml.png";
import pic9 from "../assets/products/Deep-Heat-Rub-35g.png";
import pic10 from "../assets/products/Nivea-Lip-Balm-Original-4.8g.png";
import pic11 from "../assets/products/Vaseline-Petroleum-Jelly-100.png";
import pic12 from "../assets/products/savlon.png";
import pic13 from "../assets/products/centrum-energy.png";
import pic14 from "../assets/products/ors.png";
import pic15 from "../assets/products/clearasil.png";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  isTrending: boolean;
}

const Offers2: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart } = useCart();

  // ===============================================================
  // 🧴 Popular Campus Pharmacy Products
  // ===============================================================
  const products: Product[] = [
    {
      id: "1",
      name: "Durex Fetherlite Condoms 3s",
      description: "Ultra-thin condoms designed for comfort and protection.",
      price: 650,
      image: pic1,
      brand: "Durex",
      isTrending: true,
    },
    {
      id: "2",
      name: "Always Ultra Thin Pads 8s",
      description: "Super absorbent sanitary pads with odor-neutralizing tech.",
      price: 380,
      image: pic2,
      brand: "Always",
      isTrending: true,
    },
    {
      id: "3",
      name: "Swift Pregnancy Test Kit",
      description: "Quick and accurate pregnancy test for early detection.",
      price: 300,
      image: pic3,
      brand: "Swift",
      isTrending: true,
    },
    {
      id: "4",
      name: "Panadol Extra 10s",
      description: "Fast headache and pain relief with caffeine boost.",
      price: 150,
      image: pic4,
      brand: "Panadol",
      isTrending: true,
    },
    {
      id: "5",
      name: "Strepsils Lozenges 24s",
      description: "Soothing relief for sore throats and mouth irritation.",
      price: 420,
      image: pic5,
      brand: "Strepsils",
      isTrending: false,
    },
    {
      id: "6",
      name: "E45 Moisturizing Cream 100g",
      description: "Dermatologically tested cream for dry, sensitive skin.",
      price: 950,
      image: pic6,
      brand: "E45",
      isTrending: true,
    },
    {
      id: "7",
      name: "Dettol Hand Sanitizer 50ml",
      description: "Kills 99.9% of germs, perfect for on-the-go hygiene.",
      price: 250,
      image: pic7,
      brand: "Dettol",
      isTrending: false,
    },
    {
      id: "8",
      name: "Gaviscon Peppermint Liquid 200ml",
      description: "Fast-acting relief for acid reflux and heartburn.",
      price: 720,
      image: pic8,
      brand: "Gaviscon",
      isTrending: false,
    },
    {
      id: "9",
      name: "Deep Heat Rub 35g",
      description: "Muscle and joint pain relief cream for active individuals.",
      price: 550,
      image: pic9,
      brand: "Deep Heat",
      isTrending: false,
    },
    {
      id: "10",
      name: "Nivea Lip Balm Original 4.8g",
      description: "Moisturizing lip balm for smooth and hydrated lips.",
      price: 280,
      image: pic10,
      brand: "Nivea",
      isTrending: true,
    },
    {
      id: "11",
      name: "Vaseline Petroleum Jelly 100ml",
      description: "Multipurpose protectant for dry skin and minor cuts.",
      price: 300,
      image: pic11,
      brand: "Vaseline",
      isTrending: false,
    },
    {
      id: "12",
      name: "Savlon Antiseptic Liquid 200ml",
      description: "Trusted antiseptic for cuts, grazes, and hygiene.",
      price: 400,
      image: pic12,
      brand: "Savlon",
      isTrending: false,
    },
    {
      id: "13",
      name: "Centrum Energy Multivitamins 30s",
      description: "Daily multivitamin for energy and immune support.",
      price: 1200,
      image: pic13,
      brand: "Centrum",
      isTrending: true,
    },
    {
      id: "14",
      name: "ORS Rehydration Salts 10s",
      description: "Essential salts to restore hydration and electrolytes.",
      price: 180,
      image: pic14,
      brand: "ORS",
      isTrending: false,
    },
    {
      id: "15",
      name: "Clearasil Daily Face Wash 150ml",
      description: "Gentle cleanser to prevent acne and refresh skin.",
      price: 850,
      image: pic15,
      brand: "Clearasil",
      isTrending: true,
    },
  ];

  // ===============================================================
  // 🔁 Scroll Logic
  // ===============================================================
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ===============================================================
  // 🛒 Add to Cart Integration
  // ===============================================================
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart 🛒`, { duration: 1800 });
  };

  // ===============================================================
  // 🧩 JSX Layout
  // ===============================================================
  return (
    <section className={styles.offersSection}>
      <div className={styles.container}>
        {/* ===== Section Header ===== */}
        <div className={styles.header}>
          <h2 className={styles.title}>Campus Essentials</h2>
          <div className={styles.navButtons}>
            <button
              className={`${styles.navBtn} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`${styles.navBtn} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ===== Product Cards ===== */}
        <div className={styles.productsWrapper} ref={scrollRef} onScroll={checkScroll}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <article key={product.id} className={styles.productCard}>
                {/* Trending Badge */}
                {product.isTrending && (
                  <span className={styles.trendingBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                        fill="currentColor"
                      />
                    </svg>
                    Trending
                  </span>
                )}

                {/* Product Image */}
                <div className={styles.imageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <p className={styles.brandName}>{product.brand}</p>
                  <p className={styles.price}>KES {product.price.toFixed(2)}</p>
                </div>

                {/* Card Footer */}
                <div className={styles.cardFooter}>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={18} strokeWidth={1.8} />
                    <span>Add</span>
                  </button>
                  <button className={styles.detailsBtn}>View Details</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <a href="#" className={styles.viewAll}>
          View All Campus Essentials
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Offers2;
