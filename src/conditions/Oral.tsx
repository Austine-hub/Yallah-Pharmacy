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



type Offer = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
};

const offersData: Offer[] = [
  { id: "1", name: "Colgate Total Whitening Toothpaste 120g", image: pic1, discount: 10, price: 650, oldPrice: 720 },
  { id: "2", name: "Sensodyne Repair & Protect Toothpaste 100g", image: pic2, discount: 12, price: 950, oldPrice: 1080 },
  { id: "3", name: "Oral-B Pro-Health Toothbrush (Medium Bristles)", image: pic3, discount: 10, price: 500, oldPrice: 560 },
  { id: "4", name: "Listerine Cool Mint Mouthwash 500ml", image: pic4, discount: 15, price: 1100, oldPrice: 1290 },
  { id: "5", name: "Colgate Plax Fresh Tea Mouthwash 500ml", image: pic5, discount: 10, price: 950, oldPrice: 1050 },
  { id: "6", name: "Crest 3D White Brilliance Toothpaste 116g", image: pic6, discount: 10, price: 1200, oldPrice: 1340 },
  { id: "7", name: "Oral-B Glide Pro-Health Dental Floss 40m", image: pic7, discount: 12, price: 650, oldPrice: 740 },
  { id: "8", name: "Sensodyne Fresh Mint Toothpaste 100g", image: pic8, discount: 10, price: 900, oldPrice: 1000 },
  { id: "9", name: "TheraBreath Fresh Breath Oral Rinse 473ml", image: pic9, discount: 8, price: 1650, oldPrice: 1790 },
  { id: "10", name: "Colgate 360° Total Advanced Toothbrush", image: pic10, discount: 10, price: 700, oldPrice: 780 },
  { id: "11", name: "Oral-B Electric Toothbrush Vitality CrossAction", image: pic11, discount: 12, price: 3800, oldPrice: 4300 },
  { id: "12", name: "Crest Pro-Health Advanced Mouthwash 1L", image: pic12, discount: 10, price: 1450, oldPrice: 1600 },
  { id: "13", name: "Colgate Optic White Renewal Toothpaste 85g", image: pic13, discount: 10, price: 1150, oldPrice: 1280 },
  { id: "14", name: "Tom’s of Maine Fluoride-Free Toothpaste 100g", image: pic14, discount: 12, price: 1050, oldPrice: 1190 },
  { id: "15", name: "GUM Soft-Picks Advanced Dental Picks (60 pack)", image: pic15, discount: 10, price: 850, oldPrice: 940 },
];

const OralCare: React.FC = memo(() => {
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

export default OralCare;
