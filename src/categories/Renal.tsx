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


// ===============================
// ✅ Local Image Imports
// ===============================
import pic1 from "../assets/products/furosemide.png";
import pic2 from "../assets/products/spironolactone.png";
import pic3 from "../assets/products/tamsulosin.png";
import pic4 from "../assets/products/finasteride.png";
import pic5 from "../assets/products/nitrofurantoin.png";
import pic6 from "../assets/products/ciprofloxacin1.png";
import pic7 from "../assets/products/sodiumbicarbonate.png";
import pic8 from "../assets/products/kayexalate.png";
import pic9 from "../assets/products/potassiumcitrate.png";
import pic10 from "../assets/products/erythropoietin.png";
import pic11 from "../assets/products/allopurinol.png";
import pic12 from "../assets/products/hydrochlorothiazide.png";

const products: Product[] = [
  {
    id: 1,
    name: "Furosemide 40mg Tablets (Lasix)",
    image: pic1,
    price: 220,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Spironolactone 25mg Tablets (Aldactone)",
    image: pic2,
    price: 480,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Tamsulosin 0.4mg Capsules (Flomax)",
    image: pic3,
    price: 950,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Finasteride 5mg Tablets (Proscar)",
    image: pic4,
    price: 890,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Nitrofurantoin 100mg Capsules (Macrobid)",
    image: pic5,
    price: 720,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Ciprofloxacin 500mg Tablets",
    image: pic6,
    price: 670,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Sodium Bicarbonate Tablets 500mg",
    image: pic7,
    price: 250,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 8,
    name: "Calcium Polystyrene Sulfonate Powder (Kayexalate)",
    image: pic8,
    price: 1150,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 9,
    name: "Potassium Citrate Solution (Ural/Polycitra)",
    image: pic9,
    price: 780,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 10,
    name: "Erythropoietin Injection (Eprex 4000IU)",
    image: pic10,
    price: 2800,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 11,
    name: "Allopurinol 300mg Tablets",
    image: pic11,
    price: 640,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
  {
    id: 12,
    name: "Hydrochlorothiazide 25mg Tablets",
    image: pic12,
    price: 300,
    category: "Renal & Urinary Care",
    stock: "In Stock",
  },
];

const Renal: React.FC = memo(() => {
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
          <span>Renal/Urinary System</span>
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

export default Renal;