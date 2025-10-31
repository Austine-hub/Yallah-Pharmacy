// src/components/CartDrawer.tsx
// ============================================================================
// ✅ CartDrawer.tsx — Animated, Accessible, Context-Integrated (2025 Edition)
// ============================================================================

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  Trash2,
  ShoppingCart,
  AlertCircle,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "./Cart.module.css";

/**
 * QuantityInput
 * - local input state (prevents noisy updates while typing)
 * - commits on blur or Enter
 * - only numeric input allowed
 */
const QuantityInput: React.FC<{
  id: string;
  value: number;
  onCommit: (n: number) => void;
  disabled?: boolean;
}> = ({ id, value, onCommit, disabled }) => {
  const [local, setLocal] = useState<string>(String(value));

  useEffect(() => {
    setLocal(String(value));
  }, [value]);

  const commit = useCallback(
    (valStr?: string) => {
      const v = valStr ?? local;
      const n = Number.parseInt(String(v), 10);
      if (Number.isNaN(n) || n < 1) {
        // revert
        setLocal(String(value));
        return;
      }
      onCommit(n);
    },
    [local, onCommit, value]
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
      type="text"
      style={{ width: 64, textAlign: "center" }}
    />
  );
};

const CartDrawer: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getCartTotal,
    getTotalItems,
    updateQuantity,
    increaseQty,
    decreaseQty,
  } = useCart();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // currency formatter memoized
  const formatPrice = useMemo(
    () =>
      new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
      }).format,
    []
  );

  // Prevent body scroll when drawer open & focus trap
  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";

      // move focus into the drawer
      requestAnimationFrame(() => {
        const node = drawerRef.current;
        const first = node?.querySelector<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        first?.focus();
      });
    } else {
      document.body.style.overflow = "";
      // restore focus
      previouslyFocused.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close with Escape key (accessible)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Safe handlers that gracefully degrade if helpers are absent
  const safeUpdateQty = useCallback(
    (id: string, qty: number) => {
      if (typeof updateQuantity === "function") {
        updateQuantity(id, qty);
        return;
      }
      // fallback to increase/decrease if available
      if (qty <= 0) return;
      // naive fallback: compute delta from current item
      const cur = cartItems.find((it) => it.id === id)?.quantity ?? 1;
      const delta = qty - cur;
      if (delta > 0 && typeof increaseQty === "function") increaseQty(id, delta);
      if (delta < 0 && typeof decreaseQty === "function") decreaseQty(id, -delta);
    },
    [updateQuantity, increaseQty, decreaseQty, cartItems]
  );

  const handleRemove = useCallback(
    (id: string, name?: string) => {
      removeFromCart(id);
      toast?.info?.(`Removed "${name ?? "item"}" from cart`);
    },
    [removeFromCart]
  );

  const handleClear = useCallback(() => {
    if (cartItems.length === 0) return;
    const ok = window.confirm("Clear your cart? This action cannot be undone.");
    if (!ok) return;
    clearCart();
    toast?.success?.("Cart cleared");
  }, [cartItems.length, clearCart]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      toast?.info?.("Your cart is empty");
      return;
    }
    toast?.success?.("Proceeding to checkout...");
    // small delay to show toast then navigate
    setTimeout(() => navigate("/checkout"), 350);
  }, [cartItems.length, navigate]);

  // Reduced-motion: prefer simpler transitions if user prefers reduced motion
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <>
      {/* Cart Toggle (placeable in navbar) */}
      <button
        className={styles.cartToggleBtn}
        onClick={() => setIsOpen(true)}
        aria-label="Open shopping cart"
      >
        <ShoppingCart size={20} aria-hidden="true" />
        {getTotalItems() > 0 && (
          <span className={styles.itemCount} aria-live="polite">
            {getTotalItems()}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={styles.overlay}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              className={styles.drawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: prefersReducedMotion ? 500 : 300,
                damping: 35,
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              ref={drawerRef}
            >
              <header className={styles.cartHeader}>
                <h2 className={styles.cartTitle}>
                  <ShoppingCart size={18} aria-hidden="true" /> Cart (
                  {getTotalItems()})
                </h2>

                <div className={styles.headerActions}>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setIsOpen(false)}
                    aria-label="Close cart"
                  >
                    <X size={18} />
                  </button>
                </div>
              </header>

              {/* Body */}
              <div className={styles.drawerBody}>
                {cartItems.length === 0 ? (
                  <div className={styles.emptyCart}>
                    <ShoppingCart className={styles.emptyIcon} aria-hidden="true" />
                    <h3 className={styles.emptyTitle}>Your cart is empty</h3>
                    <p className={styles.emptyMsg}>Add items to get started.</p>
                  </div>
                ) : (
                  <>
                    <ul className={styles.cartList}>
                      {cartItems.map((item) => (
                        <li key={item.id} className={styles.cartItem}>
                          <div className={styles.itemVisual}>
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className={styles.productImage}
                            />
                            <div className={styles.itemMeta}>
                              <h3 className={styles.itemName}>{item.name}</h3>
                              {item.category && (
                                <small className={styles.itemCategory}>
                                  {item.category}
                                </small>
                              )}
                              {!item.inStock ? (
                                <div className={styles.stockWarning}>
                                  <AlertCircle size={14} />
                                  <span>Out of stock</span>
                                </div>
                              ) : (
                                <div className={styles.stockStatus}>In stock</div>
                              )}
                            </div>
                          </div>

                          <div className={styles.itemControls}>
                            <div className={styles.priceWrap}>
                              <div className={styles.currentPrice}>
                                {formatPrice(item.price)}
                              </div>
                            </div>

                            <div className={styles.qtyAndRemove}>
                              <div className={styles.quantityControl}>
                                <button
                                  type="button"
                                  className={styles.quantityBtn}
                                  onClick={() =>
                                    safeUpdateQty(item.id, Math.max(1, item.quantity - 1))
                                  }
                                  disabled={item.quantity <= 1}
                                  aria-label={`Decrease quantity of ${item.name}`}
                                >
                                  <Minus size={14} />
                                </button>

                                <QuantityInput
                                  id={item.id}
                                  value={item.quantity}
                                  onCommit={(n) => safeUpdateQty(item.id, n)}
                                  disabled={typeof updateQuantity !== "function" && !increaseQty && !decreaseQty}
                                />

                                <button
                                  type="button"
                                  className={styles.quantityBtn}
                                  onClick={() => safeUpdateQty(item.id, item.quantity + 1)}
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
                                <Trash2 size={14} />
                                <span className={styles.removeText}>Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Summary */}
                    <div className={styles.cartSummary}>
                      <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <strong>{formatPrice(getCartTotal())}</strong>
                      </div>

                      <div className={styles.summaryActions}>
                        <button
                          className={styles.checkoutBtn}
                          onClick={handleCheckout}
                          aria-label={`Checkout ${formatPrice(getCartTotal())}`}
                        >
                          Checkout ({formatPrice(getCartTotal())})
                        </button>

                        <button
                          className={styles.clearBtn}
                          onClick={handleClear}
                          aria-label="Clear cart"
                        >
                          Clear cart
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
