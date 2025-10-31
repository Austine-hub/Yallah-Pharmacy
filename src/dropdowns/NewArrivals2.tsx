import React, { useRef, useState, useEffect } from 'react';
import styles from './NewArrivals2.module.css';



// === Import images ===
import pic1 from "../assets/products/Anua-Azelaic-Acid+Hyaluron-Redness-Soothing-Serum.png";
import pic2 from "../assets/products/anua-heartleaf-pore-control-cleansing-OIL.png";
import pic3 from "../assets/products/Ariul-Hydro-Sleeping-Mask-80g.png";
import pic4 from "../assets/products/Axis-Y-Dark-Spot-Correcting-Glow-Serum-50g.png";
import pic5 from "../assets/products/Beauty-of-joseon-ginseng-cleansing-oil-210ml.png";

interface Product {
  id: number;
  image: string;
  category: string;
  name: string;
  price: number;
  currency: string;
  outOfStock?: boolean;
}

const NewArrivals1: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const products: Product[] = [
    {
      id: 1,
      image: pic1,
      category: 'Beauty and Skin Care',
      name: 'Anua Azaleic Acid+Hyaluron Redness Soothing Serum',
      price: 3200,
      currency: 'KES'
    },
    {
      id: 2,
      image: pic2,
      category: 'Beauty and Skin Care',
      name: 'Anua Heartleaf Pore Control Cleansing Oil 200ml',
      price: 2700,
      currency: 'KES'
    },
    {
      id: 3,
      image: pic3,
      category: 'Beauty and Skin Care',
      name: 'Ariul Hydro Sleeping Mask 80g',
      price: 0,
      currency: 'KES',
      outOfStock: true
    },
    {
      id: 4,
      image: pic4,
      category: 'New on MYDAWA',
      name: 'Axis-Y Dark Spot Correcting Glow Serum 50g',
      price: 2800,
      currency: 'KES'
    },
    {
      id: 5,
      image: pic5,
      category: 'Beauty and Skin Care',
      name: 'Beauty of Joseon Ginseng Cleansing Oil 210ml',
      price: 3000,
      currency: 'KES'
    }
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (productId: number) => {
    console.log(`Add to cart: ${productId}`);
  };

  return (
    <section className={styles.newArrivals} aria-labelledby="new-arrivals-heading">
      <div className={styles.container}>
        <h2 id="new-arrivals-heading" className={styles.heading}>
          New At Healthfield 
        </h2>

        <div className={styles.carouselWrapper}>
          <button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll to previous products"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className={styles.productsContainer}
            onScroll={checkScrollButtons}
            role="list"
          >
            {products.map((product) => (
              <article
                key={product.id}
                className={styles.productCard}
                role="listitem"
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>

                <div className={styles.productInfo}>
                  <p className={styles.category}>{product.category}</p>
                  <h3 className={styles.productName}>{product.name}</h3>

                  <div className={styles.productFooter}>
                    {product.outOfStock ? (
                      <span className={styles.outOfStock}>Out Of Stock</span>
                    ) : (
                      <p className={styles.price}>
                        <span className={styles.currency}>{product.currency}</span>
                        <span className={styles.amount}>
                          {product.price.toLocaleString()}
                        </span>
                      </p>
                    )}

                    <button
                      className={styles.cartButton}
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.outOfStock}
                      aria-label={`Add ${product.name} to cart`}
                      type="button"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 2L7 6H3C2.44772 6 2 6.44772 2 7V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V7C22 6.44772 21.5523 6 21 6H17L15 2H9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 11C9 12.0609 9.42143 13.0783 10.1716 13.8284C10.9217 14.5786 11.9391 15 13 15C14.0609 15 15.0783 14.5786 15.8284 13.8284C16.5786 13.0783 17 12.0609 17 11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll to next products"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.seeMoreWrapper}>
          <button className={styles.seeMoreButton} type="button">
            See more
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals1;