// ==============================================
// Men.tsx — Men’s Health Essentials (2025 Optimized)
// References: Mayo Clinic, Cleveland Clinic, Harvard Health, NIH
// ==============================================
import React from "react";
import styles from "../components/Shop.module.css";

// === Import images (replace placeholders with actual assets) ===
import multivitaminImg from "../assets/mens/multivitamin.png";
import omega3Img from "../assets/mens/omega3.png";
import zincImg from "../assets/mens/zinc.png";
import vitaminDImg from "../assets/mens/vitaminD.png";
import sawPalmettoImg from "../assets/mens/sawPalmetto.png";
import tadalafilImg from "../assets/mens/tadalafil.png";
import sildenafilImg from "../assets/mens/sildenafil.png";
import testosteroneGelImg from "../assets/mens/testosteroneGel.png";
import finasterideImg from "../assets/mens/finasteride.png";
import minoxidilImg from "../assets/mens/minoxidil.png";
import ashwagandhaImg from "../assets/mens/ashwagandha.png";
import coq10Img from "../assets/mens/coq10.png";
import probioticsImg from "../assets/mens/probiotics.png";
import magnesiumImg from "../assets/mens/magnesium.png";
import lArginineImg from "../assets/mens/l'Arginine.png";

// === Type Definition ===
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
}

const products: Product[] = [
  { id: 1, name: "Men’s Multivitamin Complex", image: multivitaminImg, price: 1450, category: "Daily Vitality", stock: "In Stock" },
  { id: 2, name: "Omega-3 Fish Oil (EPA + DHA)", image: omega3Img, price: 1750, category: "Cardiovascular Support", stock: "In Stock" },
  { id: 3, name: "Zinc Gluconate 50mg", image: zincImg, price: 850, category: "Immune & Testosterone Support", stock: "In Stock" },
  { id: 4, name: "Vitamin D3 5000 IU", image: vitaminDImg, price: 980, category: "Bone & Hormonal Health", stock: "In Stock" },
  { id: 5, name: "Saw Palmetto Extract", image: sawPalmettoImg, price: 1300, category: "Prostate Health", stock: "In Stock" },
  { id: 6, name: "Tadalafil (Cialis)", image: tadalafilImg, price: 2850, category: "Erectile Dysfunction", stock: "In Stock" },
  { id: 7, name: "Sildenafil (Viagra)", image: sildenafilImg, price: 2600, category: "Erectile Dysfunction", stock: "In Stock" },
  { id: 8, name: "Testosterone Gel (AndroGel)", image: testosteroneGelImg, price: 4850, category: "Hormonal Therapy", stock: "In Stock" },
  { id: 9, name: "Finasteride (Propecia)", image: finasterideImg, price: 2200, category: "Hair & Prostate Health", stock: "In Stock" },
  { id: 10, name: "Minoxidil 5% Solution", image: minoxidilImg, price: 1850, category: "Hair Regrowth", stock: "In Stock" },
  { id: 11, name: "Ashwagandha Root Extract", image: ashwagandhaImg, price: 1100, category: "Stress & Libido Support", stock: "In Stock" },
  { id: 12, name: "Coenzyme Q10 (CoQ10)", image: coq10Img, price: 1600, category: "Heart & Energy Support", stock: "In Stock" },
  { id: 13, name: "Probiotic Blend (Men’s Gut Health)", image: probioticsImg, price: 1450, category: "Digestive Health", stock: "In Stock" },
  { id: 14, name: "Magnesium Citrate 400mg", image: magnesiumImg, price: 950, category: "Muscle & Nerve Function", stock: "In Stock" },
  { id: 15, name: "L-Arginine 1000mg", image: lArginineImg, price: 1250, category: "Circulatory & Performance", stock: "In Stock" },
];

const MensHealth: React.FC = () => {
  return (
    <section className={styles.shopSection} aria-labelledby="mens-health-heading">
      <div className={styles.header}>
        <h2 id="mens-health-heading" className={styles.title}>
          Men’s Health Essentials
        </h2>
        <p className={styles.subtitle}>
          Explore clinically trusted products supporting men’s vitality, performance, and overall well-being.
        </p>
      </div>

      <div className={styles.grid} role="list">
        {products.map((product) => (
          <article key={product.id} className={styles.card} role="listitem">
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className={styles.image}
              />
              <span className={styles.stockBadge} aria-label={product.stock}>
                {product.stock}
              </span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <button
                className={styles.moreInfo}
                aria-label={`View more information about ${product.name}`}
              >
                More Info
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MensHealth;
