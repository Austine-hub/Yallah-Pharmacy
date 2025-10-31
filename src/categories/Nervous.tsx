// src/components/Shop.tsx
import React, { memo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Shop.module.css";




// ===============================
// ✅ Local Image Imports
// ===============================
import pic1 from "../assets/products/sertraline.png";
import pic2 from "../assets/products/alprazolam.png";
import pic3 from "../assets/products/gabapentin.png";
import pic4 from "../assets/products/duloxetine.png";
import pic5 from "../assets/products/olanzapine.png";
import pic6 from "../assets/products/levetiracetam.png";
import pic7 from "../assets/products/donepezil.png";
import pic8 from "../assets/products/fluoxetine.png";



interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
}



const products: Product[] = [
  {
    id: 1,
    name: "Sertraline (Zoloft)",
    image: pic1,
    price: 1820,
    category: "Antidepressant (SSRI)",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Alprazolam (Xanax)",
    image: pic2,
    price: 960,
    category: "Anxiolytic (Benzodiazepine)",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Gabapentin (Neurontin)",
    image: pic3,
    price: 2100,
    category: "Anticonvulsant / Neuropathic Pain",
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Duloxetine (Cymbalta)",
    image: pic4,
    price: 2350,
    category: "Antidepressant / Nerve Pain",
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Olanzapine (Zyprexa)",
    image: pic5,
    price: 2640,
    category: "Antipsychotic (Schizophrenia, Bipolar)",
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Levetiracetam (Keppra)",
    image: pic6,
    price: 1980,
    category: "Antiepileptic",
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Donepezil (Aricept)",
    image: pic7,
    price: 2890,
    category: "Cognitive Enhancer (Alzheimer’s)",
    stock: "In Stock",
  },
  {
    id: 8,
    name: "Fluoxetine (Prozac)",
    image: pic8,
    price: 1750,
    category: "Antidepressant (SSRI)",
    stock: "In Stock",
  },
];

const CNS: React.FC = memo(() => {
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
        <h2>CNS & Nervous System Drugs</h2>
        <div className={styles.subCategory}>
          <label>Subcategory:</label>
          <span>CNS / Neurology</span>
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
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
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

export default CNS;
