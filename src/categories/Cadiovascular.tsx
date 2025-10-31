import React, { useState } from "react";
import styles from "./Shop.module.css";

// ===============================
// ✅ Type Definition
// ===============================
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
  subCategory: string;
}

// ===============================
// ✅ Static Image Imports
// ===============================
import amlodipineImg from "../assets/products/BloodPressure/Amlodipine.png";
import atenololImg from "../assets/products/BloodPressure/Atenolol.png";
import bisoprololImg from "../assets/products/BloodPressure/Bisoprolol.png";
import candesartanImg from "../assets/products/BloodPressure/Candesartan.png";
import chlorthalidoneImg from "../assets/products/BloodPressure/Chlorthalidone.png";
import enalaprilImg from "../assets/products/BloodPressure/Enalapril.png";
import furosemideImg from "../assets/products/BloodPressure/Furosemide.png";
import hydrochlorothiazideImg from "../assets/products/BloodPressure/Hydrochlorothiazide.png";
import losartanImg from "../assets/products/BloodPressure/Losartan.png";
import nifedipineImg from "../assets/products/BloodPressure/Nifedipine.png";
import spironolactoneImg from "../assets/products/BloodPressure/Spironolactone.png";
import telmisartanImg from "../assets/products/BloodPressure/Telmisartan.png";
import valsartanImg from "../assets/products/BloodPressure/Valsartan.png";

// ===============================
// ✅ Product Data
// ===============================
const products: Product[] = [
  // Hypertension
  { id: 1, name: "Amlodipine", image: amlodipineImg, price: 2395, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 2, name: "Atenolol", image: atenololImg, price: 2747, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 3, name: "Bisoprolol", image: bisoprololImg, price: 1714, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },

  { id: 4, name: "Candesartan", image: candesartanImg, price: 1420, category: "Cardiovascular", subCategory:"Hypertension", stock: "In Stock" },
  { id: 5, name: "Furosemide", image: furosemideImg, price: 1200, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 6, name: "Spironolactone", image: spironolactoneImg, price: 1350, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },

  { id: 7, name: "Enalapril", image: enalaprilImg, price: 1520, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 8, name: "Telmisartan", image: telmisartanImg, price: 1380, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 9, name: "Valsartan", image: valsartanImg, price: 1420, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  
  {id: 10, name: "Losartan", image: losartanImg, price: 1470, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 11, name: "Chlorthalidone", image: chlorthalidoneImg, price: 1320, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 12, name: "Hydrochlorothiazide", image: hydrochlorothiazideImg, price: 1410, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },
  { id: 13, name: "Nifedipine", image: nifedipineImg, price: 1450, category: "Cardiovascular", subCategory: "Hypertension", stock: "In Stock" },

  // Congestive Heart Failure (CHF)
  { id: 4, name: "Candesartan", image: candesartanImg, price: 1420, category: "Cardiovascular", subCategory: "Congestive Heart Failure", stock: "In Stock" },
  { id: 5, name: "Furosemide", image: furosemideImg, price: 1200, category: "Cardiovascular", subCategory: "Congestive Heart Failure", stock: "In Stock" },
  { id: 6, name: "Spironolactone", image: spironolactoneImg, price: 1350, category: "Cardiovascular", subCategory: "Congestive Heart Failure", stock: "In Stock" },

  // Coronary Artery Disease (CAD)
  { id: 7, name: "Enalapril", image: enalaprilImg, price: 1520, category: "Cardiovascular", subCategory: "Coronary Artery Disease", stock: "In Stock" },
  { id: 8, name: "Telmisartan", image: telmisartanImg, price: 1380, category: "Cardiovascular", subCategory: "Coronary Artery Disease", stock: "In Stock" },
  { id: 9, name: "Valsartan", image: valsartanImg, price: 1420, category: "Cardiovascular", subCategory: "Coronary Artery Disease", stock: "In Stock" },

  // Deep Vein Thrombosis (DVT)
  { id: 10, name: "Losartan", image: losartanImg, price: 1470, category: "Cardiovascular", subCategory: "DVT", stock: "In Stock" },
  { id: 11, name: "Chlorthalidone", image: chlorthalidoneImg, price: 1320, category: "Cardiovascular", subCategory: "DVT", stock: "In Stock" },

  // Other Cardiac Conditions
  { id: 12, name: "Hydrochlorothiazide", image: hydrochlorothiazideImg, price: 1410, category: "Cardiovascular", subCategory: "Other Cardiac Conditions", stock: "In Stock" },
  { id: 13, name: "Nifedipine", image: nifedipineImg, price: 1450, category: "Cardiovascular", subCategory: "Other Cardiac Conditions", stock: "In Stock" },
];

// ===============================
// ✅ Component
// ===============================
const CVS: React.FC = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState("Hypertension");

  // Derive unique subcategories
  const subCategories = Array.from(new Set(products.map((p) => p.subCategory)));

  // Filter products based on subcategory
  const filteredProducts = products.filter(
    (p) => p.subCategory === selectedSubCategory
  );

  return (
    <section className={styles.shopSection}>
      {/* Header */}
      <header className={styles.header}>
        <h2 className={styles.title}>Cardiovascular & Heart Drugs</h2>

        <div className={styles.subCategorySelect}>
          <label htmlFor="subcategory">Select Subcategory:</label>
          <select
            id="subcategory"
            className={styles.dropdown}
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Product Grid */}
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className={styles.image}
              />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.subCategory}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to Cart</button>
              <button className={styles.moreInfo}>More Info</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CVS;
