import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Shop.module.css";

// 🖼️ Import product images
import pic1 from "../assets/shop2/Personal & Lifestyle Section/2025-1oothpaste & Oral Care.png";
import pic2 from "../assets/shop2/Personal & Lifestyle Section/Skincare.png";
import pic3 from "../assets/shop2/Personal & Lifestyle Section/Pain Relievers & First Aid.png";
import pic4 from "../assets/shop2/Personal & Lifestyle Section/Cold & Flu Remedies.png";
import pic5 from "../assets/shop2/Personal/Emergency pills.png";
import pic6 from "../assets/shop2/General/Calm.png";
import pic7 from "../assets/shop2/General/Contraceptives.png";
import pic8 from "../assets/shop2/Personal/Antifungal.png";
import pic9 from "../assets/shop2/Personal/Pessary.png";
import pic10 from "../assets/shop2/Personal/Pegnancy test kits.png";
import pic11 from "../assets/shop2/General/Multivitamins.png";
import pic12 from "../assets/shop2/General/Iron & Folic Acid Supplements.png";
import pic13 from "../assets/shop2/General/Vitamin C & Zinc.png";
import pic14 from "../assets/shop2/General/Rehydration Solutions.png";

// 🧩 Product Interface
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: string;
}

// 🧾 Product Data
const products: Product[] = [
  { id: 1, name: "Oral Care Pack", image: pic1, price: 1395, category: "Toothpaste & Oral Care", stock: "In Stock" },
  { id: 2, name: "Skincare", image: pic2, price: 2747, category: "Skin and Beauty", stock: "In Stock" },
  { id: 3, name: "Pain Relievers & First Aid", image: pic3, price: 1714, category: "Pain Medications", stock: "In Stock" },
  { id: 4, name: "Cold & Flu Remedies", image: pic4, price: 1420, category: "Respiratory Drugs", stock: "In Stock" },
  { id: 5, name: "Pregnancy test kits", image: pic10, price: 1420, category: "Discreet / Private Purchase Shelf", stock: "In Stock" },
  { id: 6, name: "Vaginal pessaries", image: pic9, price: 1420, category: "Discreet / Private Purchase Shelf", stock: "In Stock" },
  { id: 7, name: "Emergency pills", image: pic5, price: 1420, category: "Discreet / Private Purchase Shelf", stock: "In Stock" },
  { id: 8, name: "Contraceptives", image: pic7, price: 1420, category: "Discreet / Private Purchase Shelf", stock: "In Stock" },
  { id: 9, name: "Sleep/Stress Relief", image: pic6, price: 1420, category: "General Wellness & Support", stock: "In Stock" },
  { id: 10, name: "Antifungal creams", image: pic8, price: 1420, category: "Skin Treatment", stock: "In Stock" },
  { id: 11, name: "Multivitamins", image: pic11, price: 1420, category: "General Wellness", stock: "In Stock" },
  { id: 12, name: "Iron & Folic Acid Supplements", image: pic12, price: 1420, category: "General Wellness", stock: "In Stock" },
  { id: 13, name: "Vitamin C & Zinc", image: pic13, price: 1420, category: "General Wellness", stock: "In Stock" },
  { id: 14, name: "Rehydration Solutions", image: pic14, price: 1420, category: "General Wellness", stock: "In Stock" },
];

const Shop: React.FC = () => {
  const { addToCart } = useCart();

  // ✅ Format price safely
  const formatPrice = useCallback((price: number | undefined | null): string => {
    if (price == null || isNaN(Number(price))) return "KES 0.00";
    return Number(price).toLocaleString("en-KE", {
      style: "currency",
      currency: "KES",
    });
  }, []);

  // ✅ Add product to cart with toast feedback
  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      toast.success(`✅ ${product.name} added to cart!`);
    },
    [addToCart]
  );

  return (
    <section className={styles.shopSection}>
      <header className={styles.header}>
        <h2>Our Top Products</h2>
      </header>

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
              <p className={styles.price}>{formatPrice(product.price)}</p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <button className={styles.moreInfo}>More Info</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
