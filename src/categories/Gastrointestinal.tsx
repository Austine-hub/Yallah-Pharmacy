// src/components/Shop.tsx
import React, { memo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Shop.module.css";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
}


import pic1 from "../assets/products/Omeprazole.png";
import pic2 from "../assets/products/Pantoprazole.png";
import pic3 from "../assets/products/metronidazole-gel.png";
import pic4 from "../assets/products/Amoxicillin-Clavulanic Acid (Augmentin) 625mg.png";
import pic5 from "../assets/products/Loperamide.png";
import pic6 from "../assets/products/Omeprazole.png";
import pic7 from "../assets/products/Ondansetron.png";
import pic8 from "../assets/products/Esomeprazole.png";
import pic9 from "../assets/products/ORS1.png";
import pic10 from "../assets/products/Probiotic.png";


const products: Product[] = [
  {
    id: 1,
    name: "Omeprazole 20mg Capsules (Losec®)",
    image: pic1,
    price: 350,
    category: "Proton Pump Inhibitor (PPI)",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Pantoprazole 40mg Tablets (Protonix®)",
    image: pic2,
    price: 420,
    category: "Proton Pump Inhibitor (PPI)",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Metronidazole 400mg Tablets (Flagyl®)",
    image: pic3,
    price: 250,
    category: "Antibiotic / Antiprotozoal",
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Amoxicillin-Clavulanate 625mg Tabs (Augmentin®)",
    image: pic4,
    price: 850,
    category: "Antibiotic (Broad-Spectrum)",
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Loperamide 2mg Capsules (Imodium®)",
    image: pic5,
    price: 300,
    category: "Antidiarrheal",
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Domperidone 10mg Tablets (Motilium®)",
    image: pic6,
    price: 280,
    category: "Prokinetic / Antiemetic",
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Ondansetron 8mg Tablets (Zofran®)",
    image: pic7,
    price: 650,
    category: "Antiemetic (5-HT3 Antagonist)",
    stock: "In Stock",
  },
  {
    id: 8,
    name: "Esomeprazole 40mg Tablets (Nexium®)",
    image: pic8,
    price: 520,
    category: "Proton Pump Inhibitor (PPI)",
    stock: "In Stock",
  },
  {
    id: 9,
    name: "Oral Rehydration Salts (ORS)",
    image: pic9,
    price: 100,
    category: "Electrolyte Rehydration",
    stock: "In Stock",
  },
  {
    id: 10,
    name: "Probiotic Capsules (e.g., Lactobacillus GG / Florastor®)",
    image: pic10,
    price: 900,
    category: "Gut Flora Support / Diarrhea Management",
    stock: "In Stock",
  },
];

const GIT: React.FC = memo(() => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id), // ✅ Convert number → string
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      inStock: true,
    });
    toast.success(`${product.name} added to cart`);
  };
  return (
    <section className={styles.shopSection}>
      <div className={styles.header}>
        <h2>Shop</h2>
        <div className={styles.subCategory}>
          <label>Subcategory:</label>
          <span>GIT drugs</span>
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
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
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>kes {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>

              <Link to={`/product/${product.id}`} className={styles.moreInfo}>
                More Info
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default GIT;