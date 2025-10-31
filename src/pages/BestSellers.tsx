/// ===============================================================
// ✅ BestSellers.tsx — Modern, Responsive, Type-Safe (2025 Optimized)
// ===============================================================

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./BestSellers.module.css";

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

// ===============================================================
// 🧩 Interfaces
// ===============================================================
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  isTopSeller: boolean;
  isPharma?: boolean;
  isNonPharma?: boolean;
}

// ===============================================================
// 🧠 Component
// ===============================================================
const BestSellers: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ===============================================================
  // ❤️ Toggle Favorites
  // ===============================================================
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
        toast("Removed from favorites ❤️‍🔥", { icon: "💔" });
      } else {
        updated.add(productId);
        toast.success("Added to favorites ❤️");
      }
      return updated;
    });
  };

  // ===============================================================
  // 🧺 Add to Cart
  // ===============================================================
  const addToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  // ===============================================================
  // 🔗 Share Product
  // ===============================================================
  const shareProduct = (productName: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: productName,
          text: `Check out ${productName} at Healthfield Pharmacy`,
          url: window.location.href,
        })
        .catch(() => toast.error("Failed to share"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // ===============================================================
  // ↔️ Scroll Controls
  // ===============================================================
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // ===============================================================
  // ✨ Animation Variants (Type-Safe)
  // ===============================================================
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  // ===============================================================
  // 🧴 Product Data
  // ===============================================================
  const products: Product[] = [
    {
      id: "1",
      name: "Durex Fetherlite Condoms 3s",
      category: "Non-Pharma",
      description: "Ultra-thin condoms designed for comfort and protection.",
      price: 650,
      image: pic1,
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "2",
      name: "Always Ultra Thin Pads 8s",
      category: "Non-Pharma",
      description:
        "Super absorbent sanitary pads with odor-neutralizing technology.",
      price: 380,
      image: pic2,
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "3",
      name: "Swift Pregnancy Test Kit",
      category: "Non-Pharma",
      description: "Quick and accurate pregnancy test for early detection.",
      price: 300,
      image: pic3,
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "4",
      name: "Panadol Extra 10s",
      category: "Pharma",
      description:
        "Effective pain and headache relief with caffeine boost.",
      price: 150,
      image: pic4,
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "5",
      name: "Strepsils Lozenges 24s",
      category: "Pharma",
      description:
        "Soothing relief for sore throats and mouth irritation.",
      price: 420,
      image: pic5,
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "6",
      name: "E45 Moisturizing Cream 100g",
      category: "Non-Pharma",
      description:
        "Dermatologically tested cream for dry and sensitive skin.",
      price: 950,
      image: pic6,
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "7",
      name: "Dettol Hand Sanitizer 50ml",
      category: "Non-Pharma",
      description: "Kills 99.9% of germs, perfect for on-the-go hygiene.",
      price: 250,
      image: pic7,
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "8",
      name: pic8,
      category: "Pharma",
      description: "Fast-acting relief for acid reflux and heartburn.",
      price: 720,
      image: "/images/gaviscon.jpg",
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "9",
      name: "Deep Heat Rub 35g",
      category: "Pharma",
      description:
        "Muscle pain relief cream for active individuals and athletes.",
      price: 550,
      image: pic9,
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "10",
      name: "Nivea Lip Balm Original 4.8g",
      category: "Non-Pharma",
      description: "Moisturizing lip balm for smooth and hydrated lips.",
      price: 280,
      image: pic10,
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "11",
      name: "Vaseline Petroleum Jelly 100ml",
      category: "Non-Pharma",
      description: "Multipurpose skin protectant for dry skin and minor cuts.",
      price: 300,
      image: pic11,
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "12",
      name: "Savlon Antiseptic Liquid 200ml",
      category: "Pharma",
      description: "Trusted antiseptic for cuts, grazes, and personal hygiene.",
      price: 400,
      image: pic12,
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "13",
      name: "Centrum Energy Multivitamins 30s",
      category: "Pharma",
      description:
        "Daily multivitamin for immune support and energy metabolism.",
      price: 1200,
      image: pic13,
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "14",
      name: "ORS Rehydration Salts 10s",
      category: "Pharma",
      description: "Essential salts to restore hydration and electrolytes.",
      price: 180,
      image: pic14,
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "15",
      name: "Clearasil Daily Face Wash 150ml",
      category: "Non-Pharma",
      description: "Gentle cleanser to prevent acne and keep skin fresh.",
      price: 850,
      image: pic15,
      isTopSeller: true,
      isNonPharma: true,
    },
  ];

  // ===============================================================
  // 🧩 JSX Layout
  // ===============================================================
  return (
    <section
      className={styles.bestSellers}
      aria-labelledby="bestsellers-heading"
    >
      <div className={styles.container}>
        {/* ===== Header ===== */}
        <div className={styles.header}>
          <h2 id="bestsellers-heading" className={styles.title}>
            Best Sellers
          </h2>

          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className={styles.navButton}
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ===== Product Cards ===== */}
        <motion.div
          className={styles.productsWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={scrollContainerRef}
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              className={styles.productCard}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* ⭐ Top Seller Badge */}
              {product.isTopSeller && (
                <motion.div
                  className={styles.topSellerBadge}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.15 }}
                >
                  ⭐ Top Seller
                </motion.div>
              )}

              {/* 🖼️ Product Image */}
              <div className={styles.imageContainer}>
                <LazyLoadImage
                  src={product.image}
                  alt={product.name}
                  effect="blur"
                  className={styles.productImage}
                  wrapperClassName={styles.imageWrapper}
                />

                <motion.button
                  className={`${styles.iconButton} ${styles.favoriteButton}`}
                  onClick={() => toggleFavorite(product.id)}
                  whileTap={{ scale: 0.9 }}
                  aria-label={
                    favorites.has(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    size={20}
                    fill={favorites.has(product.id) ? "#e53e3e" : "none"}
                    color={favorites.has(product.id) ? "#e53e3e" : "#718096"}
                  />
                </motion.button>

                <motion.button
                  className={`${styles.iconButton} ${styles.shareButton}`}
                  onClick={() => shareProduct(product.name)}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Share product"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>

              {/* 📄 Product Info */}
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.categoryBadge}>
                  {product.isPharma && (
                    <span className={`${styles.badge} ${styles.pharmaBadge}`}>
                      Pharma
                    </span>
                  )}
                  {product.isNonPharma && (
                    <span
                      className={`${styles.badge} ${styles.nonPharmaBadge}`}
                    >
                      Non-Pharma
                    </span>
                  )}
                </div>

                <p className={styles.productDescription}>
                  {product.description}
                </p>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>
                    Kes. {product.price.toFixed(2)}
                  </span>
                </div>

                <div className={styles.actionButtons}>
                  <motion.button
                    className={styles.addButton}
                    onClick={() => addToCart(product.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={18} />
                    Add
                  </motion.button>

                  <motion.button
                    className={styles.detailsButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ===== View All Link ===== */}
        <motion.div
          className={styles.viewAllContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#all-bestsellers"
            className={styles.viewAllLink}
            whileHover={{ x: 5 }}
          >
            View All Best Sellers →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
