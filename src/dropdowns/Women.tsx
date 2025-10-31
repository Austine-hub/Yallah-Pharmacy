import React, { useState } from "react";
import styles from "../components/Shop.module.css";
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
// ✅ Static Image Imports (PLACEHOLDERS)
// ===============================
import contraceptiveImg from "../assets/products/WomenHealth/Contraceptive.png";
import emergencyPillImg from "../assets/products/WomenHealth/EmergencyPill.png";
import estradiolImg from "../assets/products/WomenHealth/Estradiol.png";
import clomipheneImg from "../assets/products/WomenHealth/Clomiphene.png";
import letrozoleImg from "../assets/products/WomenHealth/Letrozole.png";
import metforminImg from "../assets/products/WomenHealth/Metformin.png";
import nitrofurantoinImg from "../assets/products/WomenHealth/Nitrofurantoin.png";
import fluconazoleImg from "../assets/products/WomenHealth/Fluconazole.png";
import ferrousSulfateImg from "../assets/products/WomenHealth/FerrousSulfate.png";
import folicAcidImg from "../assets/products/WomenHealth/FolicAcid.png";

// ===============================
// ✅ Product Data
// ===============================
const products: Product[] = [
  { id: 1, name: "Ethinylestradiol + Levonorgestrel", image: contraceptiveImg, price: 850, category: "Women's Health", subCategory: "Contraception", stock: "In Stock" },
  { id: 2, name: "Levonorgestrel (Plan B)", image: emergencyPillImg, price: 620, category: "Women's Health", subCategory: "Emergency Contraception", stock: "In Stock" },
  { id: 3, name: "Estradiol", image: estradiolImg, price: 1100, category: "Women's Health", subCategory: "Menopause Management", stock: "In Stock" },
  { id: 4, name: "Clomiphene Citrate", image: clomipheneImg, price: 970, category: "Women's Health", subCategory: "Fertility", stock: "In Stock" },
  { id: 5, name: "Letrozole", image: letrozoleImg, price: 1250, category: "Women's Health", subCategory: "Fertility", stock: "In Stock" },
  { id: 6, name: "Metformin", image: metforminImg, price: 430, category: "Women's Health", subCategory: "PCOS Management", stock: "In Stock" },
  { id: 7, name: "Nitrofurantoin", image: nitrofurantoinImg, price: 680, category: "Women's Health", subCategory: "Urinary Tract Infection", stock: "In Stock" },
  { id: 8, name: "Fluconazole", image: fluconazoleImg, price: 550, category: "Women's Health", subCategory: "Vaginal Candidiasis", stock: "In Stock" },
  { id: 9, name: "Ferrous Sulfate", image: ferrousSulfateImg, price: 400, category: "Women's Health", subCategory: "Iron-Deficiency Anemia", stock: "In Stock" },
  { id: 10, name: "Folic Acid", image: folicAcidImg, price: 350, category: "Women's Health", subCategory: "Pregnancy Support", stock: "In Stock" },
];

// ===============================
// ✅ Component
// ===============================
const WomenHealthShop: React.FC = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState("Contraception");

  // Derive unique subcategories dynamically
  const subCategories = Array.from(new Set(products.map((p) => p.subCategory)));

  // Filter products by category
  const filteredProducts = products.filter(
    (p) => p.subCategory === selectedSubCategory
  );

  return (
    <section className={styles.shopSection}>
      {/* Header */}
      <header className={styles.header}>
        <h2 className={styles.title}>Women’s Health & Wellness</h2>
        <div className={styles.subCategorySelect}>
          <label htmlFor="subcategory">Select Category:</label>
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
              <span className={styles.stockBadge} aria-label="Stock status">
                {product.stock}
              </span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.subCategory}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCart} aria-label={`Add ${product.name} to cart`}>
                Add to Cart
              </button>
              <button className={styles.moreInfo} aria-label={`More info about ${product.name}`}>
                More Info
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WomenHealthShop;
