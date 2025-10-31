// src/components/offers/Offers.tsx
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import styles from "./../pages/Offers.module.css";

// === Import placeholder images (replace with your own product images later) ===
import pic1 from "../assets/products/OTC/Ibuprofen.png";
import pic2 from "../assets/products/OTC/Acetaminophen.png";
import pic3 from "../assets/products/OTC/Loratadine.png";
import pic4 from "../assets/products/OTC/Diphenhydramine.png";
import pic5 from "../assets/products/OTC/Famotidine.png";
import pic6 from "../assets/products/OTC/Omeprazole.png";
import pic7 from "../assets/products/OTC/Loperamide.png";
import pic8 from "../assets/products/OTC/Psyllium.png";
import pic9 from "../assets/products/OTC/Pepto.png";
import pic10 from "../assets/products/OTC/Dextromethorphan.png";
import pic11 from "../assets/products/OTC/Guaifenesin.png";
import pic12 from "../assets/products/OTC//Acetylsalicylic.png";
import pic13 from "../assets/products/OTC/Hydrocortisone.png";
import pic14 from "../assets/products/OTC/Neosporin.png";
import pic15 from "../assets/products/OTC/PlanB.png";
import pic16 from "../assets/products/OTC/Nicotinepatch.png";
import pic17 from "../assets/products/OTC/Melatonin.png";
import pic18 from "../assets/products/OTC/VitaminC.png";
import pic19 from "../assets/products/OTC/Salinespray.png";
import pic20 from "../assets/products/OTC/Zinc.png"; 

type OTC = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
};

const OTCData: OTC[] = [
  { id: "1", name: "Ibuprofen (Advil®, Motrin®) – Pain & Inflammation", image: pic1, discount: 15, price: 490, oldPrice: 560 },
  { id: "2", name: "Acetaminophen (Tylenol®) – Pain & Fever", image: pic2, discount: 12, price: 450, oldPrice: 510 },
  { id: "3", name: "Loratadine (Claritin®) – Allergy Relief", image: pic3, discount: 10, price: 780, oldPrice: 850 },
  { id: "4", name: "Diphenhydramine (Benadryl®) – Sleep & Allergy", image: pic4, discount: 12, price: 620, oldPrice: 700 },
  { id: "5", name: "Famotidine (Pepcid®) – Heartburn Relief", image: pic5, discount: 14, price: 350, oldPrice: 410 },
  { id: "6", name: "Omeprazole (Prilosec®) – Acid Reflux", image: pic6, discount: 11, price: 820, oldPrice: 910 },
  { id: "7", name: "Loperamide (Imodium®) – Diarrhea Control", image: pic7, discount: 13, price: 290, oldPrice: 330 },
  { id: "8", name: "Psyllium Fiber (Metamucil®) – Constipation", image: pic8, discount: 10, price: 670, oldPrice: 750 },
  { id: "9", name: "Bismuth Subsalicylate (Pepto-Bismol®) – Upset Stomach", image: pic9, discount: 15, price: 540, oldPrice: 620 },
  { id: "10", name: "Dextromethorphan (Delsym®) – Cough Suppressant", image: pic10, discount: 14, price: 690, oldPrice: 750 },
  { id: "11", name: "Guaifenesin (Mucinex®) – Chest Congestion", image: pic11, discount: 10, price: 720, oldPrice: 790 },
  { id: "12", name: "Aspirin (Bayer®) – Pain & Heart Health", image: pic12, discount: 11, price: 250, oldPrice: 280 },
  { id: "13", name: "Hydrocortisone 1% Cream – Rash & Itch Relief", image: pic13, discount: 10, price: 390, oldPrice: 440 },
  { id: "14", name: "Neosporin® Ointment – Minor Cuts & Wounds", image: pic14, discount: 13, price: 650, oldPrice: 720 },
  { id: "15", name: "Plan B One-Step® – Emergency Contraceptive", image: pic15, discount: 10, price: 3400, oldPrice: 3650 }, 
  { id: "16", name: "Nicotine Patch (Nicoderm®) – Smoking Cessation", image: pic16, discount: 12, price: 1850, oldPrice: 1990 },
  { id: "17", name: "Melatonin – Natural Sleep Aid", image: pic17, discount: 14, price: 560, oldPrice: 640 },
  { id: "18", name: "Vitamin C 1000mg – Immunity Support", image: pic18, discount: 10, price: 430, oldPrice: 480 },
  { id: "19", name: "Saline Nasal Spray – Nasal Dryness & Allergy", image: pic19, discount: 11, price: 320, oldPrice: 360 },
  { id: "20", name: "Zinc Lozenges – Cold & Immunity Support", image: pic20, discount: 9, price: 400, oldPrice: 440 },
];

const WHATSAPP_NUMBER = "254796787207";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello, I’d like to order this product:");

const OTC: React.FC = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleWhatsAppOrder = (productName: string) => {
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}%20${encodeURIComponent(
      productName
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.offersSection}>
      {/* === Header === */}
      <div className={styles.header}>
        <h2 className={styles.title}>Top OTC Pharmacy Offers</h2>
        <Link to="/buy-medicines" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* === Offers Grid === */}
      <div className={styles.offersGrid}>
        {OTCData.map((offer) => (
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
                onClick={() => handleWhatsAppOrder(offer.name)}
              >
                Order via WhatsApp
              </button>

              <button
                className={styles.viewProduct}
                onClick={() => handleImageClick(offer.image)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* === Image Modal === */}
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

export default OTC;
