// ============================================================
// File: ShopByCategory.tsx — 2025 Production-Ready Edition
// ============================================================

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./ShopByCategory.module.css";

// === CATEGORY IMAGES ===
import pic1 from "../assets/shop1/cough.png";
import pic2 from "../assets/shop1/accessories.png";
import pic3 from "../assets/shop1/Vitamins.png";
import pic5 from "../assets/shop1/reproductive.png";
import pic6 from "../assets/shop1/chronic.png";
import pic7 from "../assets/shop1/Allergy.png";
import pic8 from "../assets/shop1/Heartburn.png";
import pic9 from "../assets/products/Headache2.png";
import pic10 from "../assets/products/Cramps.png";
import pic11 from "../assets/products/Acne.png";
import pic12 from "../assets/products/UTI.png";

// === CATEGORY DATA ===
interface Category {
  id: string;
  title: string;
  image: string;
}

const categories: Category[] = [
  { id: "general", title: "General Wellness & Support", image: pic1 },
  { id: "personal", title: "Personal & Lifestyle", image: pic7 },
  { id: "private", title: "Discreet / Private Purchases", image: pic8 },
  { id: "sexual", title: "Sexual & Reproductive Health", image: pic5 },
  { id: "sti", title: "STI Management", image: pic7 },
  { id: "vaginal", title: "Vaginal & Genital Hygiene", image: pic8 },
  { id: "cough", title: "Cough & Cold", image: pic1 },
  { id: "allergy", title: "Allergy", image: pic7 },
  { id: "heartburn", title: "Heartburn", image: pic8 },
  { id: "chronic", title: "Chronic Diseases", image: pic6 },
  { id: "vitamins", title: "Vitamins & Supplements", image: pic3 },
  { id: "reproductive", title: "Reproductive Health", image: pic5 },
  { id: "accessories", title: "Medical Accessories", image: pic2 },
  { id: "other", title: "Other Ailments", image: pic9 },
  { id: "cramps", title: "Menstrual Cramps", image: pic10 },
  { id: "acne", title: "Acne / Pimples", image: pic11 },
  { id: "uti", title: "UTI", image: pic12 },
];

// ============================================================
// Component
// ============================================================
const ShopByCategory: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Scroll handler
  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -container.clientWidth * 0.8 : container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Quick View handler
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    toast.success("Quick view opened!");
  };

  const closeModal = () => setSelectedImage(null);

  // Keyboard close support (ESC key)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="shop-category-title">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 id="shop-category-title" className={styles.title}>
          Shop by Category
        </h2>
      </motion.div>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.arrowBtn} ${styles.leftArrow}`}
          aria-label="Scroll left"
          onClick={() => handleScroll("left")}
        >
          <FaChevronLeft />
        </button>

        <div ref={scrollRef} className={styles.carousel}>
          {categories.map((cat, index) => (
            <motion.article
              key={cat.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className={styles.imageWrapper}>
                <img src={cat.image} alt={cat.title} className={styles.image} loading="lazy" />
                <motion.button
                  className={styles.quickViewBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleImageClick(cat.image)}
                >
                  Quick View
                </motion.button>
              </div>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
            </motion.article>
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${styles.rightArrow}`}
          aria-label="Scroll right"
          onClick={() => handleScroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* === MODAL === */}
      {selectedImage && (
        <motion.div
          className={styles.modalBackdrop}
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <button className={styles.closeBtn} onClick={closeModal} aria-label="Close preview">
              <FaTimes />
            </button>
            <img src={selectedImage} alt="Quick View" className={styles.modalImage} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ShopByCategory;
