// src/components/offers/Offers.tsx
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "./Offers.module.css";

// === Example placeholder images (replace with your local product images later) ===
import pic1 from "../assets/products/cerave-cleanser.png";
import pic2 from "../assets/products/ordinary-serum.png";
import pic3 from "../assets/products/laroche-moisturizer.png";
import pic4 from "../assets/products/neutrogena-sunscreen.png";
import pic5 from "../assets/products/tatcha-cream.png";
import pic6 from "../assets/products/olay-retinol.png";
import pic7 from "../assets/products/paulas-choice.png";
import pic8 from "../assets/products/elf-hydrating.png";
import pic9 from "../assets/products/innisfree-serum.png";
import pic10 from "../assets/products/drunk-elephant.png";
import pic11 from "../assets/products/fenty-cleanser.png";
import pic12 from "../assets/products/aveeno-daily.png";
import pic13 from "../assets/products/glow-recipe.png";
import pic14 from "../assets/products/cosrx-snail.png";
import pic15 from "../assets/products/first-aid-beauty.png";
import pic16 from "../assets/products/kiehl's-cream.png";
import pic17 from "../assets/products/clinique-gel.png";
import pic18 from "../assets/products/laneige-sleeping mask.png";
import pic19 from "../assets/products/skinfix-barrier.png";
import pic20 from "../assets/products/summer-fridays.png";

type Offer = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
};

const offersData: Offer[] = [
  { id: "1", name: "CeraVe Hydrating Facial Cleanser", image: pic1, discount: 10, price: 1599, oldPrice: 1799 },
  { id: "2", name: "The Ordinary Niacinamide 10% + Zinc 1%", image: pic2, discount: 12, price: 999, oldPrice: 1149 },
  { id: "3", name: "La Roche-Posay Toleriane Double Repair Moisturizer", image: pic3, discount: 15, price: 2099, oldPrice: 2499 },
  { id: "4", name: "Neutrogena Hydro Boost Water Gel", image: pic4, discount: 10, price: 1799, oldPrice: 1999 },
  { id: "5", name: "Tatcha The Dewy Skin Cream", image: pic5, discount: 8, price: 6499, oldPrice: 7099 },
  { id: "6", name: "Olay Regenerist Retinol 24 Night Moisturizer", image: pic6, discount: 10, price: 2899, oldPrice: 3199 },
  { id: "7", name: "Paula’s Choice Skin Perfecting 2% BHA Liquid Exfoliant", image: pic7, discount: 15, price: 3199, oldPrice: 3749 },
  { id: "8", name: "e.l.f. Holy Hydration! Face Cream", image: pic8, discount: 10, price: 899, oldPrice: 999 },
  { id: "9", name: "Innisfree Green Tea Seed Serum", image: pic9, discount: 12, price: 2299, oldPrice: 2599 },
  { id: "10", name: "Drunk Elephant Protini Polypeptide Cream", image: pic10, discount: 10, price: 5699, oldPrice: 6299 },
  { id: "11", name: "Fenty Skin Total Cleans’r Remove-It-All Cleanser", image: pic11, discount: 10, price: 2899, oldPrice: 3199 },
  { id: "12", name: "Aveeno Daily Moisturizing Lotion", image: pic12, discount: 10, price: 1399, oldPrice: 1599 },
  { id: "13", name: "Glow Recipe Watermelon Glow Niacinamide Dew Drops", image: pic13, discount: 8, price: 3699, oldPrice: 3999 },
  { id: "14", name: "COSRX Advanced Snail 96 Mucin Power Essence", image: pic14, discount: 12, price: 2199, oldPrice: 2499 },
  { id: "15", name: "First Aid Beauty Ultra Repair Cream", image: pic15, discount: 10, price: 2999, oldPrice: 3299 },
  { id: "16", name: "Kiehl’s Ultra Facial Cream", image: pic16, discount: 10, price: 3599, oldPrice: 3999 },
  { id: "17", name: "Clinique Dramatically Different Moisturizing Gel", image: pic17, discount: 10, price: 2899, oldPrice: 3199 },
  { id: "18", name: "Laneige Lip Sleeping Mask (Berry)", image: pic18, discount: 15, price: 1999, oldPrice: 2299 },
  { id: "19", name: "Skinfix Barrier+ Triple Lipid-Peptide Cream", image: pic19, discount: 12, price: 4299, oldPrice: 4799 },
  { id: "20", name: "Summer Fridays Jet Lag Mask", image: pic20, discount: 10, price: 4299, oldPrice: 4799 },
];

const SkinCare1: React.FC = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      image: offer.image,
      quantity: 1,
    });
    toast.success(`${offer.name} added to cart 🛒`, { duration: 2000 });
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.offersSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Skincare Offers </h2>
        <Link to="/buy-skincare" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      <div className={styles.offersGrid}>
        {offersData.map((offer) => (
          <div key={offer.id} className={styles.card}>
            <div className={styles.discountTag}>-{offer.discount}%</div>

            <div className={styles.imageWrapper}>
              <img
                src={offer.image}
                alt={offer.name}
                className={styles.productImage}
                loading="lazy"
                onClick={() => handleImageClick(offer.image)}
              />
              <button
                className={styles.quickViewBtn}
                onClick={() => handleImageClick(offer.image)}
              >
                Quick View
              </button>
            </div>

            <div className={styles.info}>
              <p className={styles.name}>{offer.name}</p>
              <div className={styles.prices}>
                <span className={styles.newPrice}>KSh {offer.price.toLocaleString()}</span>
                <span className={styles.oldPrice}>KSh {offer.oldPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(offer)}
              >
                <ShoppingCart size={18} strokeWidth={1.8} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Product Preview" className={styles.modalImage} />
            <button className={styles.closeBtn} onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
});

export default SkinCare1;
