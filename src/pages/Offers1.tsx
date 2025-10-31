import React, { useRef, useState, useEffect } from "react";
import { ShoppingCart, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Offers1.module.css";


// === Import images ===
import pic1 from "../assets/products/FentyBeautyGlossBomb-universal-lip-luminizer.png";
import pic2 from "../assets/products/laneige-lip-sleeping-mask-berry-20g.png";
import pic3 from "../assets/products/Maybelline-fit-me-mattePlusporelessPoundation.png";
import pic4 from "../assets/products/Rare-Beauty-Tinted-Moisturizer.png";
import pic5 from "../assets/products/Rare-Beauty-Soft-Pinch-Liquid-Blush.png";
import pic6 from "../assets/products/Charlotte-tilbury-glowgasm-beauty-light-wand.png";
import pic7 from "../assets/products/OPI-Nail-Lacquer.png";
import pic8 from "../assets/products/2025-Olive & June-Cuticle-Serum.png";
import pic9 from "../assets/products/L’Oréal-LashParadiseVolumizingMascara.png";
import pic10 from "../assets/products/Stila-Stay-AllDayWaterproofLiquidEyeliner.png";
import pic11 from "../assets/products/CeraVe-Hydrating-Cleanser-236ml.png";
import pic12 from "../assets/products/Mielle-Rosemary-Mint-Scalp.png";

interface Offer {
  id: number;
  category: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

const Offers1: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { cartItems, addToCart } = useCart();

  // --- Updated Offers (Top 12 Beauty Essentials) ---
  const offers: Offer[] = [
    // 💋 Lip Gloss & Lip Care
    {
      id: 1,
      category: "Lip Gloss",
      title: "Fenty Beauty Gloss Bomb Universal Lip Luminizer",
      image: pic1,
      originalPrice: 3200,
      discountedPrice: 2550,
      discount: 20,
    },
    {
      id: 2,
      category: "Lip Care",
      title: "Laneige Lip Sleeping Mask Berry 20g",
      image: pic2,
      originalPrice: 3500,
      discountedPrice: 2800,
      discount: 20,
    },

    // 💄 Foundation & Skin Tint
    {
      id: 3,
      category: "Foundation",
      title: "Maybelline Fit Me Matte + Poreless Foundation",
      image: pic3,
      originalPrice: 1800,
      discountedPrice: 1400,
      discount: 22,
    },
    {
      id: 4,
      category: "Skin Tint",
      title: "Rare Beauty Tinted Moisturizer SPF 20",
      image: pic4,
      originalPrice: 4500,
      discountedPrice: 3600,
      discount: 20,
    },

    // ✨ Highlighter & Blush
    {
      id: 5,
      category: "Blush",
      title: "Rare Beauty Soft Pinch Liquid Blush",
      image: pic5,
      originalPrice: 4200,
      discountedPrice: 3360,
      discount: 20,
    },
    {
      id: 6,
      category: "Highlighter",
      title: "Charlotte Tilbury Glowgasm Beauty Light Wand",
      image: pic6,
      originalPrice: 6200,
      discountedPrice: 4950,
      discount: 20,
    },

    // 💅 Nail Polish & Nail Care
    {
      id: 7,
      category: "Nail Polish",
      title: "OPI Nail Lacquer - Bubble Bath",
      image: pic7,
      originalPrice: 1800,
      discountedPrice: 1350,
      discount: 25,
    },
    {
      id: 8,
      category: "Nail Care",
      title: "Olive & June Cuticle Serum with Probiotic Complex",
      image: pic8,
      originalPrice: 2600,
      discountedPrice: 2080,
      discount: 20,
    },

    // 👁️ Mascara & Eyeliner
    {
      id: 9,
      category: "Mascara",
      title: "L’Oréal Lash Paradise Volumizing Mascara",
      image: pic9,
      originalPrice: 2100,
      discountedPrice: 1680,
      discount: 20,
    },
    {
      id: 10,
      category: "Eyeliner",
      title: "Stila Stay All Day Waterproof Liquid Eyeliner",
      image: pic10,
      originalPrice: 3100,
      discountedPrice: 2480,
      discount: 20,
    },

    // 💆‍♀️ Skincare & Haircare
    {
      id: 11,
      category: "Skincare",
      title: "CeraVe Hydrating Cleanser 236ml",
      image: pic11,
      originalPrice: 2200,
      discountedPrice: 1760,
      discount: 20,
    },
    {
      id: 12,
      category: "Hair Care",
      title: "Mielle Rosemary Mint Scalp & Hair Strengthening Oil",
      image: pic12,
      originalPrice: 3200,
      discountedPrice: 2560,
      discount: 20,
    },
  ];

  // --- Scroll Handling ---
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // --- Add to Cart ---
  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id.toString(),
      name: offer.title,
      price: offer.discountedPrice,
      image: offer.image,
      quantity: 1,
    });

    toast.success(`${offer.title} added to cart!`);
  };

  return (
    <section className={styles.offersSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>New Beauty Arrivals</h2>

        {/* Cart summary */}
        <button
          className={styles.cartSummary}
          aria-label="View your cart checklist"
        >
          <ShoppingCart size={22} aria-hidden="true" />
          {cartItems.length > 0 && (
            <span
              className={styles.cartBadge}
              aria-label={`${cartItems.length} items in cart`}
            >
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.offersContainer} ref={scrollContainerRef}>
          {offers.map((offer) => (
            <article key={offer.id} className={styles.offerCard}>
              <div className={styles.discountBadge}>
                Save <br />
                {offer.discount}%
              </div>

              <div className={styles.imageContainer}>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.category}>{offer.category}</span>
                <h3 className={styles.productTitle}>{offer.title}</h3>

                <div className={styles.priceContainer}>
                  <div className={styles.priceWrapper}>
                    <span className={styles.currency}>KES</span>
                    <span className={styles.price}>
                      {offer.discountedPrice.toLocaleString()}
                    </span>
                    <span className={styles.originalPrice}>
                      <span className={styles.currency}>KES</span>
                      {offer.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    className={styles.cartButton}
                    onClick={() => handleAddToCart(offer)}
                    aria-label={`Add ${offer.title} to cart`}
                  >
                    <Plus size={18} className={styles.addIcon} />
                    <ShoppingCart size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <button className={styles.seeMoreButton}>See more</button>
    </section>
  );
};

export default Offers1;
