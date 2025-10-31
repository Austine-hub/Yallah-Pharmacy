import React, { useState } from 'react';
import styles from './NewArrivals.module.css';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  isFavorite: boolean;
}



// === Import images ===
import pic1 from "../assets/products/2025-1Sunshine-Nutrition-Melatonin-5mg.png";
import pic2 from "../assets/products/Folic-Acid-5mg.png";
import pic3 from "../assets/products/Mason-Natural-Magnesium-Oxide-500mg-100'S.png";
import pic4 from "../assets/products/Sunshine-Nutrition-Vitamin-C.png";
import pic5 from "../assets/products/Sunshine-Nutrition-Skin-Radiance-EFF-Pineapple.png";
import pic6 from "../assets/products/Sunshine-Nutrition-Zinc-Gluconate-50mg.png";
import pic7 from "../assets/products/2Sunshine-Nutrition-Good-Morning-Multivitamin + 9 60'S.png";
import pic8 from "../assets/products/Piriteze-Allergy-Tablets-10'S.png";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Sunshine Nutrition Melatonin 5mg Tablets 100\'S',
      brand: 'Sunshine Nutrition',
      price: 3200.00,
      image: pic1,
      isFavorite: false
    },

  
    {
      id: 2,
      name: 'Folic Acid 5mg',
      brand: 'Lab Brand',
      price: 344.00,
      image: pic2,
      isFavorite: false
    },
    {
      id: 3,
      name: 'Mason Natural Magnesium Oxide 500mg 100\'S',
      brand: 'Mason Natural',
      price: 3096.00,
      image: pic3,
      isFavorite: false
    },
    {
      id: 4,
      name: 'Sunshine Nutrition Vitamin C 1000mg HT Tabs 100\'S',
      brand: 'Sunshine Nutrition',
      price: 3200.00,
      image: pic4,
      isFavorite: false
    },
    {
      id: 5,
      name: 'Sunshine Nutrition Skin Radiance EFF Pineapple 20\'S',
      brand: 'Sunshine Nutrition',
      price: 1800.00,
      image: pic5,
      isFavorite: false
    },
    {
      id: 6,
      name: 'Sunshine Nutrition Zinc Gluconate 50mg Gss 100\'S',
      brand: 'Sunshine Nutrition',
      price: 2700.00,
      image: pic6,
      isFavorite: false
    },
    {
      id: 7,
      name: 'Sunshine Nutrition Good Morning Multivitamin + 9 60\'S',
      brand: 'Sunshine Nutrition',
      price: 3800.00,
      image: pic7,
      isFavorite: false
    },
    {
      id: 8,
      name: 'Piritaze Allergy Tablets 10\'S',
      brand: 'Niiux',
      price: 1040.00,
      image: pic8,
      isFavorite: false
    }
  ]);

  const toggleFavorite = (id: number): void => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleAddToCart = (productId: number): void => {
    console.log(`Product ${productId} added to cart`);
    // Implement cart logic here
  };

  const handleViewDetails = (productId: number): void => {
    console.log(`Viewing details for product ${productId}`);
    // Implement navigation to product details
  };

  const formatPrice = (price: number): string => {
    return `Kes ${price.toFixed(2)}`;
  };

  return (
    <section className={styles.newArrivals} aria-labelledby="new-arrivals-heading">
      <div className={styles.header}>
        <h2 id="new-arrivals-heading" className={styles.title}>
          New Arrivals
        </h2>
        <p className={styles.subtitle}>Showing 20 out of 20</p>
      </div>

      <div className={styles.productGrid} role="list">
        {products.map((product) => (
          <article
            key={product.id}
            className={styles.productCard}
            role="listitem"
          >
            <div className={styles.cardHeader}>
              <button
                className={styles.favoriteBtn}
                onClick={() => toggleFavorite(product.id)}
                aria-label={product.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={product.isFavorite}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={product.isFavorite ? '#10b981' : 'none'}
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <div className={styles.actionIcons}>
                <button
                  className={styles.iconBtn}
                  aria-label="Share product"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
                <button
                  className={styles.iconBtn}
                  aria-label="View product details"
                  onClick={() => handleViewDetails(product.id)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productBrand}>{product.brand}</p>
              <p className={styles.productPrice}>{formatPrice(product.price)}</p>
            </div>

            <div className={styles.cardFooter}>
              <button
                className={styles.addBtn}
                onClick={() => handleAddToCart(product.id)}
                aria-label={`Add ${product.name} to cart`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add
              </button>
              <button
                className={styles.detailsBtn}
                onClick={() => handleViewDetails(product.id)}
              >
                View Details
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;