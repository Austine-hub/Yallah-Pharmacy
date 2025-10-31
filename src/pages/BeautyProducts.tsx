// src/pages/BeautyProducts.tsx
// ✅ Modern, Minimal, Responsive, Accessible (2025 Optimized Version)

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./BeautyProducts.module.css";
import { useCart } from "../context/CartContext";

// === Import images ===
import pic1 from "../assets/products/revitalizing-supreme.png";
import pic2 from "../assets/products/super-blendable.png";
import pic3 from "../assets/products/rouge-volupté-shine-lipstick.png";
import pic4 from "../assets/products/better-than-sex-mascara.png";
import pic5 from "../assets/products/born-this-way-foundation.png";
import pic6 from "../assets/products/Soft-Matte-Complete-Lipstick.png";
import pic7 from "../assets/products/Soft-Radiance-Pressed-Powder.png";
import pic8 from "../assets/products/airbrush-flawless-foundation.png";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
}

const BeautyProducts: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { addToCart, updateQuantity, openCart, cartItems } = useCart();

  // ❤️ Favorites feature
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast.error("Removed from favorites");
      } else {
        newSet.add(id);
        toast.success("Added to favorites");
      }
      return newSet;
    });
  }, []);

  // 🛍️ Realistic beauty products list
  const products: Product[] = [
    {
      id: 1,
      name: "Revitalizing Supreme+ Youth Power Crème",
      description: "Prestige anti-aging cream that firms, smooths, and rejuvenates skin.",
      price: 18900,
      image: pic1,
      brand: "Estée Lauder",
    },
    {
      id: 2,
      name: "True Match Super-Blendable Foundation",
      description: "Lightweight, seamless foundation for natural, flawless coverage.",
      price: 2400,
      image: pic2,
      brand: "L’Oréal Paris",
    },
    {
      id: 3,
      name: "Rouge Volupté Shine Lipstick",
      description: "Luxurious lipstick delivering intense color and moisture.",
      price: 5200,
      image: pic3,
      brand: "Yves Saint Laurent (YSL)",
    },
    {
      id: 4,
      name: "Better Than Sex Mascara",
      description: "Iconic volumizing mascara for dramatic, curled lashes.",
      price: 4200,
      image: pic4,
      brand: "Too Faced",
    },
    {
      id: 5,
      name: "Born This Way Foundation",
      description: "Medium-to-full coverage foundation with natural finish.",
      price: 5600,
      image: pic5,
      brand: "Too Faced",
    },
    {
      id: 6,
      name: "Soft Matte Complete Lipstick",
      description: "Velvety matte finish lipstick with long-lasting comfort.",
      price: 4100,
      image: pic6,
      brand: "NARS",
    },
    {
      id: 7,
      name: "Soft Radiance Pressed Powder",
      description: "Finishing powder for luminous, flawless skin.",
      price: 5300,
      image: pic7,
      brand: "Laura Mercier",
    },
    {
      id: 8,
      name: "Airbrush Flawless Foundation",
      description: "Full-coverage foundation with a natural matte finish.",
      price: 5900,
      image: pic8,
      brand: "Charlotte Tilbury",
    },
  ];

  const handlePrev = useCallback(() => {
    carouselRef.current?.scrollBy({
      left: -carouselRef.current.clientWidth / 2,
      behavior: "smooth",
    });
  }, []);

  const handleNext = useCallback(() => {
    carouselRef.current?.scrollBy({
      left: carouselRef.current.clientWidth / 2,
      behavior: "smooth",
    });
  }, []);

  const handleShare = async (product: Product) => {
    try {
      const url = `${window.location.origin}/product/${product.id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  const handleAddToCart = (product: Product) => {
    const stringId = product.id.toString();
    const inCart = cartItems.find((ci) => ci.id === stringId);
    if (inCart) updateQuantity(stringId, inCart.quantity + 1);
    else
      addToCart({
        id: stringId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.brand,
        description: product.description,
        inStock: true,
      });
    toast.success(`${product.name} added to cart`);
    openCart?.();
  };

  return (
    <section className={styles.beautySection} aria-labelledby="beauty-title">
      <Toaster position="top-right" />
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="beauty-title" className={styles.title}>
            Beauty Products
          </h2>
          <div className={styles.navigation}>
            <button onClick={handlePrev} aria-label="Previous products">
              <ChevronLeft size={22} />
            </button>
            <button onClick={handleNext} aria-label="Next products">
              <ChevronRight size={22} />
            </button>
          </div>
        </header>

        <div className={styles.productsWrapper} ref={carouselRef}>
          {products.map((product) => {
            const isFavorited = favorites.has(product.id);
            return (
              <motion.article
                key={product.id}
                className={styles.productCard}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className={styles.imageContainer}>
                  <LazyLoadImage
                    src={product.image}
                    alt={product.name}
                    effect="blur"
                    className={styles.productImage}
                  />
                  <div className={styles.cardActions}>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`${isFavorited ? "Remove from" : "Add to"} favorites`}
                    >
                      <Heart
                        size={18}
                        fill={isFavorited ? "#ff4757" : "none"}
                        color={isFavorited ? "#ff4757" : "#666"}
                      />
                    </button>
                    <button onClick={() => handleShare(product)} aria-label="Share product">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <span className={styles.brandName}>{product.brand}</span>
                  <p className={styles.price}>KES {product.price.toFixed(2)}</p>

                  <motion.button
                    className={styles.addButton}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className={styles.viewAllContainer}>
          <motion.a href="/beauty-products" whileHover={{ x: 5 }} className={styles.viewAllLink}>
            View All Products <ChevronRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default BeautyProducts;

