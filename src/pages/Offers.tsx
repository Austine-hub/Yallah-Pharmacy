// src/components/offers/Offers.tsx
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "./Offers.module.css";

// === Import images ===
import pic1 from "../assets/products/Allergy.png";
import pic2 from "../assets/products/Anthelios.png";
import pic3 from "../assets/products/Contraception.png";
import pic4 from "../assets/products/Cough.png";
import pic5 from "../assets/products/Headache.png";
import pic6 from "../assets/products/Eno.png";
import pic7 from "../assets/products/Diclofenac.png";
import pic8 from "../assets/products/UTI.png";

type Offer = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
};

const offersData: Offer[] = [
  { id: "1", name: "Allergy Relief", image: pic1, discount: 12, price: 350, oldPrice: 490 },
  { id: "2", name: "La Roche-Posay Effaclar Foaming Gel", image: pic2, discount: 12, price: 830, oldPrice: 980 },
  { id: "3", name: "Emergency Contraception", image: pic3, discount: 11, price: 1700, oldPrice: 2035 },
  { id: "4", name: "Benyllin Cough Syrup", image: pic4, discount: 15, price: 989, oldPrice: 1075 },
  { id: "5", name: "Paracetamol Headache Relief", image: pic5, discount: 15, price: 84, oldPrice: 95 },
  { id: "6", name: "ENO Antacid Relief", image: pic6, discount: 11, price: 50, oldPrice: 75 },
  { id: "7", name: "Diclofenac Pain Relief", image: pic7, discount: 15, price: 159, oldPrice: 175 },
  { id: "8", name: "Cystex Painful Urination Relief", image: pic8, discount: 15, price: 214, oldPrice: 305 },
];

const WHATSAPP_NUMBER = "254796787207";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello, I’d like to order this product:");

const Offers: React.FC = memo(() => {
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

  const handleWhatsAppOrder = (productName: string) => {
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}%20${encodeURIComponent(
      productName
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const handleImageClick = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.offersSection}>
      {/* === Header === */}
      <div className={styles.header}>
        <h2 className={styles.title}>Offers</h2>
        <Link to="/buy-medicines" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* === Offers Grid === */}
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
                <span className={styles.newPrice}>
                  KSh {offer.price.toLocaleString()}
                </span>
                <span className={styles.oldPrice}>
                  KSh {offer.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              {/* 🛒 Add to Cart (Primary) */}
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(offer)}
              >
                <ShoppingCart size={18} strokeWidth={1.8} />
                <span>Add to Cart</span>
              </button>

              {/* 💬 WhatsApp Order (Secondary) */}
              <button
                className={styles.whatsappBtn}
                onClick={() => handleWhatsAppOrder(offer.name)}
              >
                <MessageCircle size={18} strokeWidth={1.8} />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* === Image Modal === */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Product Preview"
              className={styles.modalImage}
            />
            <button className={styles.closeBtn} onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
});

export default Offers;

