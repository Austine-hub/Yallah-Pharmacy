// ===============================================================
// 💊 OBGYN Prescription Medicines — Optimized (2025)
// 🇺🇸 Top 25 OBGYN Drugs with Descriptions & Kenyan Prices
// ===============================================================

import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Sexual.module.css";

// ✅ Local product images (place inside: src/assets/products/)
import pic1 from "../assets/products/Oxytocin-injection.png";
import pic2 from "../assets/products/misoprostol-tablets.png";
import pic3 from "../assets/products/mifepristone.png";
import pic4 from "../assets/products/combined-oral-contraceptive.png";
import pic5 from "../assets/products/depo-provera.png";
import pic6 from "../assets/products/medroxyprogesterone.png";
import pic7 from "../assets/products/clomiphene-citrate.png";
import pic8 from "../assets/products/letrozole.png";
import pic9 from "../assets/products/ferrous-sulfate.png";
import pic10 from "../assets/products/folic-acid.png";
import pic11 from "../assets/products/magnesium-sulfate.png";
import pic12 from "../assets/products/nifedipine.png";
import pic13 from "../assets/products/methyldopa.png";
import pic14 from "../assets/products/labetalol.png";
import pic15 from "../assets/products/betamethasone.png";
import pic16 from "../assets/products/dexamethasone.png";
import pic17 from "../assets/products/cephalexin.png";
import pic18 from "../assets/products/Amoxicillin.png";
import pic19 from "../assets/products/metronidazole-gel.png";
import pic20 from "../assets/products/Fluconazole.png";
import pic21 from "../assets/products/Acyclovir.png";
import pic22 from "../assets/products/Azithromycin.png";
import pic23 from "../assets/products/Ceftriaxone.png";
import pic24 from "../assets/products/Magnesium-oxide.png";
import pic25 from "../assets/products/Iron-sucrose.png";


// ===============================================================
// 🩺 Offer Type Definition
// ===============================================================

type Offer = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
  description: string;
};

// ===============================================================
// 💊 OBGYN Prescription Drugs (Top 25)
// ===============================================================

const offersData: Offer[] = [
  { id: "1", name: "Oxytocin Injection 10IU", image: pic1, discount: 10, price: 120, oldPrice: 140, description: "Uterotonic for labor induction and postpartum hemorrhage control." },
  { id: "2", name: "Misoprostol 200mcg Tablets", image: pic2, discount: 10, price: 150, oldPrice: 165, description: "Prostaglandin analog used for cervical ripening and PPH prevention." },
  { id: "3", name: "Mifepristone 200mg Tablets", image: pic3, discount: 12, price: 1900, oldPrice: 2100, description: "Antiprogestin for medical abortion and fibroid treatment." },
  { id: "4", name: "Combined Oral Contraceptive Pills", image: pic4, discount: 14, price: 380, oldPrice: 430, description: "Used for birth control and menstrual cycle regulation." },
  { id: "5", name: "Depo-Provera Injection 150mg/mL", image: pic5, discount: 12, price: 260, oldPrice: 300, description: "Injectable contraceptive providing 3-month pregnancy prevention." },
  { id: "6", name: "Medroxyprogesterone 10mg Tablets", image: pic6, discount: 15, price: 500, oldPrice: 580, description: "Progestin for abnormal uterine bleeding and hormone therapy." },
  { id: "7", name: "Clomiphene Citrate 50mg Tablets", image: pic7, discount: 10, price: 1150, oldPrice: 1280, description: "Ovulation-inducing drug for infertility management." },
  { id: "8", name: "Letrozole 2.5mg Tablets", image: pic8, discount: 11, price: 950, oldPrice: 1080, description: "Aromatase inhibitor used for ovulation induction." },
  { id: "9", name: "Ferrous Sulfate 200mg Tablets", image: pic9, discount: 10, price: 150, oldPrice: 180, description: "Iron supplement for anemia during pregnancy." },
  { id: "10", name: "Folic Acid 5mg Tablets", image: pic10, discount: 12, price: 90, oldPrice: 110, description: "Prevents neural tube defects during early pregnancy." },
  { id: "11", name: "Magnesium Sulfate Injection 50%", image: pic11, discount: 15, price: 95, oldPrice: 120, description: "Used in preeclampsia and eclampsia for seizure control." },
  { id: "12", name: "Nifedipine 10mg Tablets", image: pic12, discount: 10, price: 290, oldPrice: 330, description: "Tocolytic for preterm labor and antihypertensive use in pregnancy." },
  { id: "13", name: "Methyldopa 250mg Tablets", image: pic13, discount: 11, price: 370, oldPrice: 420, description: "Safe antihypertensive commonly used in pregnancy." },
  { id: "14", name: "Labetalol 100mg Tablets", image: pic14, discount: 10, price: 590, oldPrice: 640, description: "Preferred antihypertensive in gestational hypertension." },
  { id: "15", name: "Betamethasone Injection 12mg/2mL", image: pic15, discount: 13, price: 680, oldPrice: 760, description: "Corticosteroid for fetal lung maturation in preterm labor." },
  { id: "16", name: "Dexamethasone 4mg/mL Injection", image: pic16, discount: 13, price: 250, oldPrice: 290, description: "Corticosteroid for inflammation and fetal lung maturity." },
  { id: "17", name: "Cephalexin 500mg Capsules", image: pic17, discount: 12, price: 250, oldPrice: 290, description: "Antibiotic for UTIs and wound infections during pregnancy." },
  { id: "18", name: "Amoxicillin-Clavulanate 625mg", image: pic18, discount: 12, price: 480, oldPrice: 550, description: "Broad-spectrum antibiotic safe in pregnancy." },
  { id: "19", name: "Metronidazole Vaginal Gel 0.75%", image: pic19, discount: 10, price: 350, oldPrice: 400, description: "Topical antibiotic for bacterial vaginosis." },
  { id: "20", name: "Fluconazole 150mg Capsules", image: pic20, discount: 10, price: 320, oldPrice: 370, description: "Antifungal for vaginal candidiasis treatment." },
  { id: "21", name: "Acyclovir 400mg Tablets", image: pic21, discount: 10, price: 390, oldPrice: 440, description: "Antiviral for genital herpes management." },
  { id: "22", name: "Azithromycin 500mg Tablets", image: pic22, discount: 11, price: 680, oldPrice: 760, description: "Antibiotic for chlamydia and other STIs." },
  { id: "23", name: "Ceftriaxone 1g Injection", image: pic23, discount: 15, price: 850, oldPrice: 970, description: "Broad-spectrum antibiotic for severe pelvic infections." },
  { id: "24", name: "Magnesium Oxide 400mg Tablets", image: pic24, discount: 12, price: 150, oldPrice: 180, description: "Mineral supplement for leg cramps in pregnancy." },
  { id: "25", name: "Iron Sucrose Injection 100mg", image: pic25, discount: 10, price: 1600, oldPrice: 1800, description: "IV iron for severe iron-deficiency anemia in pregnancy." },
];

// ===============================================================
// 🩺 Sexual & Reproductive Health Component
// ===============================================================

const Sexual: React.FC = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      image: offer.image,
      quantity: 1,
      description: offer.description,
      discount: offer.discount,
      originalPrice: offer.oldPrice,
      inStock: true,
    });
    toast.success(`${offer.name} added to cart`);
  };

  const handleImageClick = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.offersSection}>
      {/* === Header === */}
      <div className={styles.header}>
        <h2 className={styles.title}>OBGYN Prescription Medicines</h2>
        <Link to="/buy-medicines" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* === Offers Grid === */}
      <div className={styles.offersGrid}>
        {offersData.map((offer) => (
          <div key={offer.id} className={styles.card} title={offer.description}>
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
              <p className={styles.description}>{offer.description}</p>
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
              {/* 🛒 Add to Cart button replaces WhatsApp order */}
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(offer)}
              >
                Add to Cart
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

export default Sexual;





