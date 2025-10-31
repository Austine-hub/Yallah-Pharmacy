// ===============================================================
// ✅ SkinDrugs.tsx — Clean & Production-Ready Component (2025)
// ===============================================================

import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "./Offers.module.css";

// =============================================================== 
// ✅ Image Imports (renamed to React-safe filenames, no spaces or symbols)
// Place these in: src/assets/products/
// ===============================================================
import pic1 from "../assets/products/benzoyl-peroxide-gel.png";
import pic2 from "../assets/products/clindamycin-gel.png";
import pic3 from "../assets/products/adapalene-gel.png";
import pic4 from "../assets/products/hydrocortisone-cream.png";
import pic5 from "../assets/products/mupirocin-ointment.png";
import pic6 from "../assets/products/ketoconazole-cream.png";
import pic7 from "../assets/products/clotrimazole-cream.png";
import pic8 from "../assets/products/terbinafine-cream.png";
import pic9 from "../assets/products/metronidazole-gel.png";
import pic10 from "../assets/products/azelaic-acid-gel.png";
import pic11 from "../assets/products/tretinoin-cream.png";
import pic12 from "../assets/products/calamine-lotion.png";
import pic13 from "../assets/products/fusidic-acid-cream.png";
import pic14 from "../assets/products/neosporin-ointment.png";
import pic15 from "../assets/products/fusibact-ointment.png";
import pic16 from "../assets/products/erythromycin-gel.png";
import pic17 from "../assets/products/cerave-moisturizing-cream.png";
import pic18 from "../assets/products/effaclar-duo.png";
import pic19 from "../assets/products/eucerin-repair-cream.png";
import pic20 from "../assets/products/olay-retinol-night-cream.png";
import pic21 from "../assets/products/aveeno-moisturizing-lotion.png";
import pic22 from "../assets/products/aquaphor-healing-ointment.png";
import pic23 from "../assets/products/niacinamide-zinc-serum.png";
import pic24 from "../assets/products/salicylic-acid-toner.png";
import pic25 from "../assets/products/panoxyl-foaming-wash.png";


// ===============================================================
// ✅ Types
// ===============================================================
type Offer = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
};

// ===============================================================
// ✅ Offers Data
// ===============================================================
const offersData: Offer[] = [
  { id: "1", name: "Benzoyl Peroxide 5% Gel (Acne Treatment)", image: pic1, discount: 12, price: 899, oldPrice: 1020 },
  { id: "2", name: "Clindamycin 1% Gel (Cleocin T)", image: pic2, discount: 10, price: 1199, oldPrice: 1349 },
  { id: "3", name: "Adapalene 0.1% Gel (Differin)", image: pic3, discount: 12, price: 1499, oldPrice: 1699 },
  { id: "4", name: "Hydrocortisone 1% Cream", image: pic4, discount: 8, price: 499, oldPrice: 549 },
  { id: "5", name: "Mupirocin 2% Ointment (Bactroban)", image: pic5, discount: 10, price: 1249, oldPrice: 1399 },
  { id: "6", name: "Ketoconazole 2% Cream (Nizoral)", image: pic6, discount: 10, price: 999, oldPrice: 1099 },
  { id: "7", name: "Clotrimazole 1% Cream (Canesten)", image: pic7, discount: 10, price: 599, oldPrice: 669 },
  { id: "8", name: "Terbinafine 1% Cream (Lamisil)", image: pic8, discount: 10, price: 899, oldPrice: 999 },
  { id: "9", name: "Metronidazole 0.75% Gel (for Rosacea)", image: pic9, discount: 12, price: 1199, oldPrice: 1349 },
  { id: "10", name: "Azelaic Acid 15% Gel (Finacea)", image: pic10, discount: 12, price: 1799, oldPrice: 2049 },
  { id: "11", name: "Tretinoin 0.05% Cream (Retin-A)", image: pic11, discount: 10, price: 1599, oldPrice: 1799 },
  { id: "12", name: "Calamine Lotion (Itch & Rash Relief)", image: pic12, discount: 10, price: 449, oldPrice: 499 },
  { id: "13", name: "Fusidic Acid 2% Cream (Fucidin)", image: pic13, discount: 10, price: 1199, oldPrice: 1349 },
  { id: "14", name: "Neomycin + Bacitracin Ointment (Neosporin)", image: pic14, discount: 10, price: 999, oldPrice: 1099 },
  { id: "15", name: "Sodium Fusidate Ointment (Fusibact)", image: pic15, discount: 12, price: 1149, oldPrice: 1299 },
  { id: "16", name: "Erythromycin 2% Gel (Aknemycin)", image: pic16, discount: 10, price: 1199, oldPrice: 1349 },
  { id: "17", name: "CeraVe Moisturizing Cream", image: pic17, discount: 10, price: 1999, oldPrice: 2199 },
  { id: "18", name: "La Roche-Posay Effaclar Duo (+)", image: pic18, discount: 8, price: 2999, oldPrice: 3249 },
  { id: "19", name: "Eucerin Advanced Repair Cream", image: pic19, discount: 10, price: 2299, oldPrice: 2549 },
  { id: "20", name: "Olay Regenerist Retinol 24 Night Moisturizer", image: pic20, discount: 8, price: 2599, oldPrice: 2799 },
  { id: "21", name: "Aveeno Daily Moisturizing Lotion", image: pic21, discount: 10, price: 1299, oldPrice: 1449 },
  { id: "22", name: "Aquaphor Healing Ointment", image: pic22, discount: 10, price: 999, oldPrice: 1099 },
  { id: "23", name: "Niacinamide Serum 10% + Zinc 1%", image: pic23, discount: 10, price: 999, oldPrice: 1149 },
  { id: "24", name: "Salicylic Acid 2% Toner (BHA Exfoliant)", image: pic24, discount: 12, price: 1199, oldPrice: 1349 },
  { id: "25", name: "PanOxyl Acne Foaming Wash 10% Benzoyl Peroxide", image: pic25, discount: 10, price: 1499, oldPrice: 1699 },
];

// ===============================================================
// ✅ Component
// ===============================================================
const SkinDrugs: React.FC = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (offer: Offer) => {
    addToCart({ id: offer.id, name: offer.name, price: offer.price, image: offer.image, quantity: 1 });
    toast.success(`${offer.name} added to cart 🛒`, { duration: 2000 });
  };

  const handleImageClick = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.offersSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Skincare & Infection Treatments</h2>
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
              <button className={styles.addToCart} onClick={() => handleAddToCart(offer)}>
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
            <button className={styles.closeBtn} onClick={closeModal}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
});

export default SkinDrugs;
