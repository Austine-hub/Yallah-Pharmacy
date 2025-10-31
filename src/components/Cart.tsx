// src/components/Cart.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Trash2, 
  ShoppingCart, 
  AlertCircle, 
  Minus, 
  Plus,
  MessageCircle,
  ArrowRight 
} from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";

import { useCart } from "../context/CartContext";
import { handleWhatsAppOrder } from "../utils/whatsappOrder";
import styles from "./Cart.module.css";

// --- Helpers -------------------------------------------------
const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0,
});
const formatPrice = (v: number) => currencyFormatter.format(v);

// --- QuantityInput: local-friendly + accessible ----------------
type QuantityInputProps = {
  id: string;
  value: number;
  onChange?: (n: number) => void;
  disabled?: boolean;
};

const QuantityInput: React.FC<QuantityInputProps> = ({ id, value, onChange, disabled }) => {
  const [local, setLocal] = useState(String(value));

  useEffect(() => setLocal(String(value)), [value]);

  const commit = useCallback(
    (val?: string) => {
      const raw = val ?? local;
      const n = Number.parseInt(String(raw || "0"), 10);
      if (Number.isNaN(n) || n < 1) {
        setLocal(String(value));
        return;
      }
      onChange?.(Math.max(1, Math.trunc(n)));
    },
    [local, onChange, value]
  );

  return (
    <input
      aria-label={`Quantity for item ${id}`}
      className={styles.quantityInput}
      inputMode="numeric"
      pattern="[0-9]*"
      value={local}
      onChange={(e) => setLocal(e.target.value.replace(/[^0-9]/g, ""))}
      onBlur={() => commit()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commit();
          (e.target as HTMLInputElement).blur();
        }
      }}
      disabled={disabled}
      min={1}
    />
  );
};

// --- Motion variants -----------------------------------------
const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8, transition: { duration: 0.18 } },
};

// --- Component -----------------------------------------------
const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems = [],
    removeFromCart,
    clearCart,
    getCartTotal = () => 0,
    getTotalItems = () => 0,
    updateQuantity,
  } = useCart();

  // memoized values
  const subtotal = useMemo(() => getCartTotal(), [getCartTotal]);
  const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);
  const quantityControlsEnabled = Boolean(updateQuantity);

  const handleAdjustQty = useCallback(
    (id: string, qty: number) => {
      if (!quantityControlsEnabled) {
        toast.info("Quantity editing not available");
        return;
      }
      const safeQty = Math.max(1, Math.trunc(qty));
      updateQuantity && updateQuantity(id, safeQty);
    },
    [updateQuantity, quantityControlsEnabled]
  );

  const handleRemove = useCallback(
    (id: string, name?: string) => {
      removeFromCart(id);
      toast.success(`${name ?? "Item"} removed`);
    },
    [removeFromCart]
  );

  const handleClear = useCallback(() => {
    if (!cartItems.length) return;
    const ok = window.confirm("Clear your cart? This cannot be undone.");
    if (!ok) return;
    clearCart();
    toast.success("Cart cleared");
  }, [clearCart, cartItems.length]);

  const handleCheckout = useCallback(() => {
    if (!cartItems.length) {
      toast.info("Your cart is empty");
      return;
    }
    navigate("/checkout");
  }, [cartItems.length, navigate]);

  /**
   * WhatsApp Order Handler
   */
  const handleWhatsAppClick = useCallback(() => {
    if (!cartItems.length) {
      toast.info("Your cart is empty. Add items before ordering via WhatsApp.");
      return;
    }

    const success = handleWhatsAppOrder(cartItems, subtotal);
    
    if (success) {
      toast.success("Opening WhatsApp...");
    } else {
      toast.error("Failed to open WhatsApp. Please check your settings.");
    }
  }, [cartItems, subtotal]);

  // keyboard shortcut: press "c" to clear (only when focused inside cart)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && document.activeElement?.closest(`.${styles.cartContainer}`)) {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClear]);

  // Empty state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.emptyCart} role="status" aria-live="polite">
        <ShoppingCart className={styles.emptyIcon} aria-hidden="true" />
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        <p className={styles.emptyMsg}>Browse products and add them to your cart.</p>
      </div>
    );
  }

  return (
    <main className={styles.cartContainer} aria-labelledby="cart-heading">
      <header className={styles.cartHeader}>
        <h1 id="cart-heading" className={styles.cartTitle}>
          <ShoppingCart size={20} aria-hidden="true" /> Cart ({totalItems})
        </h1>
      </header>

      <div className={styles.cartContent}>
        {/* Items column */}
        <section className={styles.cartItems} aria-label="Cart items">
          <AnimatePresence initial={false} mode="popLayout">
            {cartItems.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={itemVariants}
                className={styles.cartItem}
                role="group"
                aria-labelledby={`item-${item.id}-name`}
              >
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} loading="lazy" className={styles.productImage} />
                </div>

                <div className={styles.itemDetails}>
                  <h2 id={`item-${item.id}-name`} className={styles.itemName} title={item.name}>
                    {item.name}
                  </h2>

                  {item.category && <p className={styles.itemCategory}>{item.category}</p>}
                  {item.description && <p className={styles.itemDescription}>{item.description}</p>}
                  {item.variation && (
                    <p className={styles.itemVariation}>
                      <strong>Variant:</strong> {item.variation}
                    </p>
                  )}

                  {!item.inStock ? (
                    <div className={styles.stockWarning} aria-live="polite">
                      <AlertCircle size={14} aria-hidden="true" />
                      <span>Out of stock</span>
                    </div>
                  ) : (
                    <p className={styles.stockStatus}>In stock</p>
                  )}
                </div>

                <div className={styles.itemPricing}>
                  <div className={styles.priceSection}>
                    <p className={styles.currentPrice}>{formatPrice(item.price)}</p>
                    {item.originalPrice && (
                      <p className={styles.originalPrice}>{formatPrice(item.originalPrice)}</p>
                    )}
                    {item.discount && <span className={styles.discountBadge}>-{item.discount}%</span>}
                  </div>

                  <div className={styles.controlsRow}>
                    <div className={styles.quantityControl}>
                      <button
                        type="button"
                        className={styles.quantityBtn}
                        onClick={() => handleAdjustQty(item.id, Math.max(1, item.quantity - 1))}
                        disabled={!quantityControlsEnabled || item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>

                      <QuantityInput
                        id={item.id}
                        value={item.quantity}
                        onChange={(n) => handleAdjustQty(item.id, n)}
                        disabled={!quantityControlsEnabled}
                      />

                      <button
                        type="button"
                        className={styles.quantityBtn}
                        onClick={() => handleAdjustQty(item.id, item.quantity + 1)}
                        disabled={!quantityControlsEnabled}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.id, item.name)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span className={styles.removeText}>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {/* Summary column */}
        <aside className={styles.cartSummary} aria-label="Cart summary">
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Cart summary</h3>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <strong className={styles.summaryAmount}>{formatPrice(subtotal)}</strong>
            </div>

            <div className={styles.summaryActions}>
              <button
                type="button"
                className={clsx(styles.checkoutBtn)}
                onClick={handleCheckout}
                aria-label={`Checkout ${formatPrice(subtotal)}`}
              >
                Checkout ({formatPrice(subtotal)})
              </button>

              <button
                type="button"
                className={clsx(styles.clearBtn)}
                onClick={handleClear}
                aria-label="Clear cart"
              >
                Clear cart
              </button>

              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => navigate("/")}
                aria-label="Continue shopping"
              >
                Continue shopping
              </button>
            </div>

            <div className={styles.tinyNote} aria-hidden>
              <small>Secure checkout · Local currency: KES</small>
            </div>
          </div>

          {/* === WhatsApp Order Section === */}
          <motion.section 
            className={styles.whatsappSection}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className={styles.whatsappContent}>
              <div className={styles.whatsappHeader}>
                <div className={styles.whatsappIconWrapper}>
                  <MessageCircle 
                    className={styles.whatsappIcon} 
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.whatsappTextContent}>
                  <h2 className={styles.whatsappTitle}>Want to Order?</h2>
                  <p className={styles.whatsappDescription}>
                    Order with us directly on WhatsApp for instant support, order tracking, or to place a new order.
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handleWhatsAppClick}
                className={styles.whatsappButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Order via WhatsApp"
              >
                <span className={styles.whatsappButtonText}>
                  Continue your Order on WhatsApp
                </span>
                <ArrowRight 
                  className={styles.whatsappButtonIcon} 
                  aria-hidden="true"
                />
              </motion.button>
            </div>
          </motion.section>
        </aside>
      </div>

      <footer className={styles.cartFooter} aria-hidden={false}>
        <small>Prices include local taxes when applicable.</small>
      </footer>
    </main>
  );
};

export default Cart;