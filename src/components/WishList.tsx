import React, { useState } from 'react';
import styles from './Wishlist.module.css';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

interface WishlistProps {
  items?: WishlistItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [localItems, setLocalItems] = useState<WishlistItem[]>(items);

  const handleQuantityChange = (id: string, delta: number) => {
    setLocalItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          if (newQuantity === 0 && onRemoveItem) {
            onRemoveItem(id);
            return null;
          }
          if (onUpdateQuantity) {
            onUpdateQuantity(id, newQuantity);
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as WishlistItem[];
      return updated;
    });
  };

  const handleRemove = (id: string) => {
    setLocalItems(prev => prev.filter(item => item.id !== id));
    if (onRemoveItem) {
      onRemoveItem(id);
    }
  };

  const calculateSubtotal = () => {
    return localItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const isEmpty = localItems.length === 0;

  if (isEmpty) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" fill="#E8F5E9"/>
              <path d="M45 50L60 35L75 50M60 35V75" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="30" y="75" width="60" height="20" rx="4" fill="#4CAF50" opacity="0.3"/>
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
          <p className={styles.emptyDescription}>
            Items added to your wishlist will be saved here. Start exploring and save items you love!
          </p>
          
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Browse</h3>
              <p className={styles.stepDescription}>Find products you like</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Save</h3>
              <p className={styles.stepDescription}>Click the heart icon</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Purchase</h3>
              <p className={styles.stepDescription}>Buy when ready</p>
            </div>
          </div>

          <button className={styles.productsButton} aria-label="Browse products">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3.5C6.5 3.5 3.5 5.5 3.5 8C3.5 9.5 4.5 10.5 5.5 11.5L10 16.5L14.5 11.5C15.5 10.5 16.5 9.5 16.5 8C16.5 5.5 13.5 3.5 10 3.5Z"/>
            </svg>
            Products
          </button>
          <p className={styles.saveNote}>Save your favorite products for easy access later</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <span className={styles.itemCount}>{localItems.length} {localItems.length === 1 ? 'item' : 'items'}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.itemsList}>
          {localItems.map(item => (
            <article key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>
                  KSh {item.price.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                {!item.inStock && (
                  <span className={styles.outOfStock}>Out of stock</span>
                )}
                {item.inStock && (
                  <span className={styles.inStock}>In stock</span>
                )}
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(item.id, -1)}
                    aria-label="Decrease quantity"
                    disabled={!item.inStock}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(item.id, 1)}
                    aria-label="Increase quantity"
                    disabled={!item.inStock}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className={styles.itemTotal}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalPrice}>
                  KSh {(item.price * item.quantity).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal ({localItems.length} items)</span>
              <span>KSh {calculateSubtotal().toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span className={styles.freeShipping}>FREE</span>
            </div>

            <div className={styles.summaryDivider} />

            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>KSh {calculateSubtotal().toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <button 
              className={styles.checkoutButton}
              onClick={onCheckout}
              disabled={localItems.some(item => !item.inStock)}
            >
              Proceed to Checkout
            </button>

            <button className={styles.continueButton}>
              Continue Shopping
            </button>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Secure checkout</span>
            </div>
            <div className={styles.feature}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M12 5L19 12L12 19" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Fast delivery</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Wishlist;