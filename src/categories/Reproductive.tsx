// src/components/Shop.tsx
import React from "react";
import styles from "./Shop.module.css";

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
    name: "Cartil Omega 30’s",
    image: "/images/cartil-omega.jpg",
    price: 2395,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Cartil Collagen Caps 30’s",
    image: "/images/cartil-collagen.jpg",
    price: 2747,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Cartimove-D Tabs 30’s",
    image: "/images/cartimove-d.jpg",
    price: 1714,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
    {
    id: 5,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
    {
    id: 6,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
    {
    id: 7,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
    {
    id: 8,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
    {
    id: 9,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },

      {
    id: 10,
    name: "Cartimove Tabs 30’s",
    image: "/images/cartimove.jpg",
    price: 1420,
    category: "Joint Supplements",
    stock: "In Stock",
  },
  // Add more products as needed...
];

const GUT: React.FC = () => {
  return (
    <section className={styles.shopSection}>
      <div className={styles.header}>
        <h2>Shop</h2>
        <div className={styles.subCategory}>
          <label>Subcategory:</label>
          <span>Joint Supplements</span>
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
              <button className={styles.addToCart}>Add to Cart</button>
              <button className={styles.moreInfo}>More Info</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GUT;