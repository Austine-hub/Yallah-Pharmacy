import React, { useState } from 'react';
import styles from './PharmacyProducts.module.css';


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

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  inStock: boolean;
  badge?: string;
}

const HTN: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());

  const products: Product[] = [
    { id: '1', name: 'Norvasc (Amlodipine) – Pfizer, USA', price: 3200.00, originalPrice: 3500.00, image: amlodipineImg, rating: 4.7, inStock: true, badge: 'SALE' },
    { id: '2', name: 'Tenormin (Atenolol) – AstraZeneca, UK', price: 2800.00, originalPrice: 3000.00, image: atenololImg, rating: 4.6, inStock: true },
    { id: '3', name: 'Concor (Bisoprolol) – Merck, Germany', price: 3400.00, originalPrice: 3700.00, image: bisoprololImg, rating: 4.9, inStock: true, badge: 'NEW' },
    { id: '4', name: 'Atacand (Candesartan) – AstraZeneca, Sweden', price: 3600.00, originalPrice: 3850.00, image: candesartanImg, rating: 4.8, inStock: true },
    { id: '5', name: 'Hygroton (Chlorthalidone) – Novartis, Switzerland', price: 3000.00, originalPrice: 3200.00, image: chlorthalidoneImg, rating: 4.5, inStock: true },
    { id: '6', name: 'Renitec (Enalapril) – MSD, Netherlands', price: 3100.00, originalPrice: 3400.00, image: enalaprilImg, rating: 4.4, inStock: true },
    { id: '7', name: 'Lasix (Furosemide) – Sanofi, France', price: 2700.00, originalPrice: 2950.00, image: furosemideImg, rating: 4.6, inStock: true },
    { id: '8', name: 'Hydrosan (Hydrochlorothiazide) – Teva, Israel', price: 2900.00, originalPrice: 3100.00, image: hydrochlorothiazideImg, rating: 4.3, inStock: true },
    { id: '9', name: 'Cozaar (Losartan) – Merck, USA', price: 3300.00, originalPrice: 3500.00, image: losartanImg, rating: 4.8, inStock: true },
    { id: '10', name: 'Adalat (Nifedipine) – Bayer, Germany', price: 3200.00, originalPrice: 3450.00, image: nifedipineImg, rating: 4.7, inStock: true },
    { id: '11', name: 'Aldactone (Spironolactone) – Pfizer, USA', price: 3400.00, originalPrice: 3700.00, image: spironolactoneImg, rating: 4.9, inStock: true },
    { id: '12', name: 'Micardis (Telmisartan) – Boehringer Ingelheim, Germany', price: 3550.00, originalPrice: 3800.00, image: telmisartanImg, rating: 4.8, inStock: true },
    { id: '13', name: 'Diovan (Valsartan) – Novartis, Switzerland', price: 3700.00, originalPrice: 4000.00, image: valsartanImg, rating: 4.9, inStock: true },
  ];


  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const addToCart = (productId: string) => {
    setCart(prev => new Set(prev).add(productId));
  };

  const renderStars = (rating: number) => {
    return (
      <div className={styles.rating} aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? styles.starFilled : styles.starEmpty}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Our Products</h1>
        <p>Quality medications at affordable prices</p>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            {product.badge && (
              <span className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>
                {product.badge}
              </span>
            )}
            
            <button
              className={`${styles.favoriteBtn} ${favorites.has(product.id) ? styles.favorited : ''}`}
              onClick={() => toggleFavorite(product.id)}
              aria-label={favorites.has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <div className={styles.imageWrapper}>
              <img 
                src={product.image} 
                alt={product.name}
                loading="lazy"
              />
            </div>

            <div className={styles.content}>
              <h2 className={styles.productName}>{product.name}</h2>
              
              {renderStars(product.rating)}

              <div className={styles.priceWrapper}>
                <span className={styles.currentPrice}>
                  Ksh. {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    Ksh. {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(product.id)}
                  disabled={cart.has(product.id)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {cart.has(product.id) ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button className={styles.detailsBtn} aria-label={`View details for ${product.name}`}>
                  View Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HTN;