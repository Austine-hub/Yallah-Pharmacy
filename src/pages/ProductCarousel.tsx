import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import styles from "./ProductCarousel.module.css";
import { useCart } from "../context/CartContext";


// === Import images ===
import pic1 from "../assets/products/OneTouchSelectPlusGlucometerKit.png";
import pic2 from "../assets/products/iProvenDigitalThermometer.png";
import pic3 from "../assets/products/First Aid Kit Essentials (110 pcs).png";
import pic4 from "../assets/products/Swift-Pregnancy-Test-Kit.png";
import pic5 from "../assets/products/OmronBronzeBloodPressurMonitor.png";
import pic6 from "../assets/products/Accu-ChekSoftclixLancets.png";
import pic7 from "../assets/products/ElastoplastSensitivePlasters.png";
import pic8 from "../assets/products/Vickswarmmisthumidifier.png";
import pic9 from "../assets/products/Omronpeakflowmeter.png";
import pic10 from "../assets/products/PurellAdvancedHandSanitizer.png";
import pic11 from "../assets/products/Covid19Test.png";
import pic12 from "../assets/products/ElectricHeatingPadForBack Pain.png";
import pic13 from "../assets/products/PulseOximeter.png";
import pic14 from "../assets/products/GelPack.png";
import pic15 from "../assets/products/WalkingCane.png";

interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  image: string;
  trending: boolean;
}

const ProductCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ✅ Global Cart Context
  const { addToCart, openCart } = useCart();

  const handleAddToCart = useCallback(
    (product: Product) => {
      const cartItem = {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.brand,
        description: product.description,
        inStock: true,
      };
      addToCart(cartItem);
      toast.success(`${product.name} added to cart!`, { duration: 2000 });
      openCart();
    },
    [addToCart, openCart]
  );

  // 💨 Scroll logic
  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, []);

  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

// 🧾 Top 15 Home Healthcare Essentials (Kenya Pricing 2025)
// --------------------------------------------------------

const products: Product[] = [
  {
    id: 1,
    name: "OneTouch Select Plus Glucometer Kit",
    description: "Accurate blood glucose monitoring kit with test strips and lancets.",
    brand: "OneTouch",
    price: 4500,
    image: pic1,
    trending: true,
  },
  {
    id: 2,
    name: "iProven Digital Thermometer",
    description: "Fast and reliable thermometer for adults and children.",
    brand: "iProven",
    price: 950,
    image: pic2,
    trending: false,
  },
  {
    id: 3,
    name: "First Aid Kit Essentials (110 pcs)",
    description: "Comprehensive first aid kit with bandages, scissors, and antiseptics.",
    brand: "Johnson & Johnson",
    price: 3200,
    image: pic3,
    trending: true,
  },
  {
    id: 4,
    name: "Swift Pregnancy Test Kit (Cassette)",
    description: "Accurate early pregnancy detection kit for home use.",
    brand: "Pharmaplus",
    price: 250,
    image: pic4,
    trending: true,
  },
  {
    id: 5,
    name: "Omron Bronze Blood Pressure Monitor",
    description: "Clinically validated BP monitor with one-touch digital operation.",
    brand: "Omron",
    price: 8500,
    image: pic5,
    trending: true,
  },
  {
    id: 6,
    name: "Accu-Chek Softclix Lancets (100s)",
    description: "Gentle, precise lancets for blood glucose testing.",
    brand: "Accu-Chek",
    price: 1800,
    image: pic6,
    trending: false,
  },
  {
    id: 7,
    name: "Elastoplast Sensitive Plasters (20s)",
    description: "Hypoallergenic plasters ideal for sensitive skin.",
    brand: "Elastoplast",
    price: 600,
    image: pic7,
    trending: false,
  },
  {
    id: 8,
    name: "Vicks Warm Mist Humidifier",
    description: "Adds moisture and relieves dry throat and nasal irritation.",
    brand: "Vicks",
    price: 9500,
    image: pic8,
    trending: true,
  },
  {
    id: 9,
    name: "Omron Peak Flow Meter",
    description: "Monitors lung function for asthma and respiratory care.",
    brand: "Omron",
    price: 4200,
    image: pic9,
    trending: false,
  },
  {
    id: 10,
    name: "Purell Advanced Hand Sanitizer (500ml)",
    description: "Kills 99.9% of germs instantly while keeping hands moisturized.",
    brand: "Purell",
    price: 650,
    image: pic10,
    trending: false,
  },
  {
    id: 11,
    name: "COVID-19 Rapid Antigen Test Kit",
    description: "Approved rapid test for accurate COVID-19 detection.",
    brand: "Abbott",
    price: 1200,
    image: pic11,
    trending: true,
  },
  {
    id: 12,
    name: "Electric Heating Pad for Back Pain",
    description: "Adjustable heat therapy pad for muscle and joint pain.",
    brand: "Sunbeam",
    price: 3800,
    image: pic12,
    trending: false,
  },
  {
    id: 13,
    name: "Pulse Oximeter Fingertip",
    description: "Instant oxygen saturation and pulse rate monitor.",
    brand: "Contec",
    price: 2500,
    image: pic13,
    trending: true,
  },
  {
    id: 14,
    name: "Reusable Hot & Cold Gel Pack",
    description: "Flexible, reusable gel pack for pain and swelling relief.",
    brand: "TheraPearl",
    price: 950,
    image: pic14,
    trending: false,
  },
  {
    id: 15,
    name: "Medline Adjustable Walking Cane",
    description: "Lightweight aluminum cane for improved balance and mobility.",
    brand: "Medline",
    price: 4800,
    image: pic15,
    trending: false,
  },
];


  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Home Healthcare</h2>
          <div className={styles.navigation}>
            <button
              className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>

        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={scrollContainerRef}>
            {products.map((product) => (
              <motion.article
                key={product.id}
                className={styles.productCard}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className={styles.cardHeader}>
                  {product.trending && <span className={styles.trendingBadge}>🔥 Trending</span>}
                </div>

                <div className={styles.imageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className={styles.productImage}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <p className={styles.productBrand}>{product.brand}</p>
                  <p className={styles.productPrice}>KES {product.price.toFixed(2)}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button
                    className={styles.addButton}
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    🛒 Add
                  </button>
                  <button
                    className={styles.detailsButton}
                    onClick={() => toast("Feature coming soon!")}
                  >
                    View Details
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className={styles.viewAll}>
          <a href="#" className={styles.viewAllLink}>
            View All Home Healthcare Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
