// src/components/Shop.tsx
import React from "react";
import styles from "../components/Shop.module.css";

// === Import diabetes-related images (replace placeholders with actual paths) ===
import metforminImg from "../assets/diabetes/Metformin.png";
import glimepirideImg from "../assets/diabetes/Glimepiride.png";
import glipizideImg from "../assets/diabetes/Glipizide.png";
import gliclazideImg from "../assets/diabetes/Gliclazide.png";
import sitagliptinImg from "../assets/diabetes/Sitagliptin.png";
import vildagliptinImg from "../assets/diabetes/Vildagliptin.png";
import empagliflozinImg from "../assets/diabetes/Empagliflozin.png";
import dapagliflozinImg from "../assets/diabetes/Dapagliflozin.png";
import insulinGlargineImg from "../assets/diabetes/Insulinglargine.png";
import insulinAspartImg from "../assets/diabetes/InsulinAspart.png";
import insulinDetemirImg from "../assets/diabetes/InsulinDetemir.png";
import pioglitazoneImg from "../assets/diabetes/Pioglitazone.png";
import acarboseImg from "../assets/diabetes/Acarbose.png";
import linagliptinImg from "../assets/diabetes/Linagliptin.png";
import repaglinideImg from "../assets/diabetes/Repaglinide.png";

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
  { id: 1, name: "Metformin (Glucophage)", image: metforminImg, price: 850, category: "Biguanides", stock: "In Stock" },
  { id: 2, name: "Glimepiride (Amaryl)", image: glimepirideImg, price: 970, category: "Sulfonylureas", stock: "In Stock" },
  { id: 3, name: "Glipizide", image: glipizideImg, price: 890, category: "Sulfonylureas", stock: "In Stock" },
  { id: 4, name: "Gliclazide (Diamicron)", image: gliclazideImg, price: 950, category: "Sulfonylureas", stock: "In Stock" },
  { id: 5, name: "Sitagliptin (Januvia)", image: sitagliptinImg, price: 2850, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 6, name: "Vildagliptin (Galvus)", image: vildagliptinImg, price: 2550, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 7, name: "Empagliflozin (Jardiance)", image: empagliflozinImg, price: 3350, category: "SGLT2 Inhibitors", stock: "In Stock" },
  { id: 8, name: "Dapagliflozin (Forxiga)", image: dapagliflozinImg, price: 3280, category: "SGLT2 Inhibitors", stock: "In Stock" },
  { id: 9, name: "Insulin Glargine (Lantus)", image: insulinGlargineImg, price: 4100, category: "Insulin (Basal)", stock: "In Stock" },
  { id: 10, name: "Insulin Aspart (NovoRapid)", image: insulinAspartImg, price: 3900, category: "Insulin (Rapid-Acting)", stock: "In Stock" },
  { id: 11, name: "Insulin Detemir (Levemir)", image: insulinDetemirImg, price: 4200, category: "Insulin (Basal)", stock: "In Stock" },
  { id: 12, name: "Pioglitazone (Actos)", image: pioglitazoneImg, price: 1200, category: "Thiazolidinediones", stock: "In Stock" },
  { id: 13, name: "Acarbose (Glucobay)", image: acarboseImg, price: 950, category: "Alpha-Glucosidase Inhibitors", stock: "In Stock" },
  { id: 14, name: "Linagliptin (Tradjenta)", image: linagliptinImg, price: 2850, category: "DPP-4 Inhibitors", stock: "In Stock" },
  { id: 15, name: "Repaglinide (Prandin)", image: repaglinideImg, price: 1120, category: "Meglitinides", stock: "In Stock" },
];

const DM: React.FC = () => {
  return (
    <section className={styles.shopSection} aria-labelledby="shop-heading">
      <div className={styles.header}>
        <h2 id="shop-heading" className={styles.title}>
          Diabetes Care Essentials
        </h2>
        <p className={styles.subtitle}>
          Explore the most prescribed and trusted medicines for diabetes management
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
              <button className={styles.addToCart} aria-label={`Add ${product.name} to cart`}>
                Add to Cart
              </button>
              <button className={styles.moreInfo} aria-label={`View more information about ${product.name}`}>
                More Info
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DM;
