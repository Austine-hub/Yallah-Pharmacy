// src/components/offers/Offers.tsx
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "./Offers.module.css";

// === Example placeholder images (replace with your local product images later) ===
import pic1 from "../assets/products/Nitrofurantoin 100mg Capsules (Macrobid) - Google Search.png";
import pic2 from "../assets/products/Trimethoprim-Sulfamethoxazole (Septrin DS).png";
import pic3 from "../assets/products/Ciprofloxacin-500mg-Tablets.png";
import pic4 from "../assets/products/Amoxicillin-Clavulanic Acid (Augmentin) 625mg.png";
import pic5 from "../assets/products/Fosfomycin-trometamol-3g-sachet.png";
import pic6 from "../assets/products/Cefuroxime Axetil 500mg Tablets.png";
import pic7 from "../assets/products/Levofloxacin 500mg tablets.png";
import pic8 from "../assets/products/Amoxicillin 500mg capsules.png";
import pic9 from "../assets/products/cefalexin 500mg capsules.png";
import pic10 from "../assets/products/Phenazopyridine 200mg Tablets (Uristat).png";
import pic11 from "../assets/products/Doxycycline 100mg capsules.png";
import pic12 from "../assets/products/Ofloxacin 200mg tablets.png";

type Offer = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
};

const offersData: Offer[] = [
  { id: "1", name: "Nitrofurantoin 100mg Capsules (Macrobid)", image: pic1, discount: 10, price: 750, oldPrice: 830 },
  { id: "2", name: "Trimethoprim-Sulfamethoxazole (Septrin DS)", image: pic2, discount: 12, price: 650, oldPrice: 740 },
  { id: "3", name: "Ciprofloxacin 500mg Tablets", image: pic3, discount: 15, price: 850, oldPrice: 1000 },
  { id: "4", name: "Amoxicillin-Clavulanic Acid (Augmentin) 625mg", image: pic4, discount: 10, price: 1200, oldPrice: 1340 },
  { id: "5", name: "Fosfomycin Trometamol 3g Sachet", image: pic5, discount: 8, price: 1350, oldPrice: 1470 },
  { id: "6", name: "Cefuroxime Axetil 500mg Tablets", image: pic6, discount: 10, price: 1150, oldPrice: 1280 },
  { id: "7", name: "Levofloxacin 500mg Tablets", image: pic7, discount: 15, price: 1050, oldPrice: 1230 },
  { id: "8", name: "Amoxicillin 500mg Capsules", image: pic8, discount: 10, price: 450, oldPrice: 500 },
  { id: "9", name: "Cefalexin 500mg Capsules", image: pic9, discount: 12, price: 700, oldPrice: 800 },
  { id: "10", name: "Phenazopyridine 200mg Tablets (Uristat)", image: pic10, discount: 10, price: 950, oldPrice: 1050 },
  { id: "11", name: "Doxycycline 100mg Capsules", image: pic11, discount: 10, price: 550, oldPrice: 610 },
  { id: "12", name: "Ofloxacin 200mg Tablets", image: pic12, discount: 10, price: 650, oldPrice: 720 },
];


const UTI: React.FC = memo(() => {
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
        <h2 className={styles.title}>Top Drugs for Urinary Tract Infections (UTIs) </h2>
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

export default UTI;
