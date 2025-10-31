// src/context/CartContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState, 
  useCallback,
  useMemo,
  useRef,
} from "react";

import  type {
 
  ReactNode,

} from "react";

/**
 * Type definitions
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  // optional fields commonly used by UI components
  category?: string;
  description?: string;
  variation?: string;
  inStock?: boolean;
  originalPrice?: number;
  discount?: number;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "INIT"; payload: CartItem[] }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "CLEAR" }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "INCREASE_QTY"; payload: { id: string; delta?: number } }
  | { type: "DECREASE_QTY"; payload: { id: string; delta?: number } };

/**
 * Public context API
 */
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  increaseQty: (id: string, delta?: number) => void;
  decreaseQty: (id: string, delta?: number) => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
  openCart: () => void;          // 👈 added
  closeCart: () => void;         // 👈 optional
  isCartOpen: boolean;           // 👈 optional state
  
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart_items_v1"; // bump version if shape changes

/**
 * Reducer: pure state transitions
 */
const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "INIT":
      return { items: action.payload };

    case "ADD": {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };

    case "CLEAR":
      return { items: [] };

    case "UPDATE_QTY": {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        // keep quantity >= 1 (caller should confirm deletes explicitly)
        return state;
      }
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      };
    }

    case "INCREASE_QTY": {
      const { id, delta = 1 } = action.payload;
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + Math.max(1, Math.trunc(delta)) } : i
        ),
      };
    }

    case "DECREASE_QTY": {
      const { id, delta = 1 } = action.payload;
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity - Math.max(1, Math.trunc(delta))) } : i
        ),
      };
    }

    default:
      return state;
  }
};

/**
 * Provider
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const isBrowser = typeof window !== "undefined" && !!window.localStorage;

  // lazy init: read from localStorage safely
  const initialState: CartState = { items: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  // Ref used for debounced localStorage writes
  const saveTimerRef = useRef<number | null>(null);

  // Initialize once from storage
  useEffect(() => {
    if (!isBrowser) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        dispatch({ type: "INIT", payload: [] });
        return;
      }
      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) {
        console.warn("Cart: stored data invalid, resetting.");
        dispatch({ type: "INIT", payload: [] });
        return;
      }
      // ensure quantities are integers >= 1
      const safe = parsed.map((p) => ({ ...p, quantity: Math.max(1, Math.trunc(p.quantity || 1)) }));
      dispatch({ type: "INIT", payload: safe });
    } catch (err) {
      console.warn("Cart: failed to read from localStorage:", err);
      dispatch({ type: "INIT", payload: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to localStorage (debounced)
  useEffect(() => {
    if (!isBrowser) return;
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    // debounce writes: 300ms after last change
    saveTimerRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch (err) {
        console.error("Cart: failed to write to localStorage:", err);
      } finally {
        saveTimerRef.current = null;
      }
    }, 300);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [state.items, isBrowser]);

  // Cross-tab sync: update state when other tab modifies cart
  useEffect(() => {
    if (!isBrowser) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const newVal = e.newValue ? JSON.parse(e.newValue) : [];
        if (Array.isArray(newVal)) {
          // sanitize
          const safe = newVal.map((p: any) => ({ ...p, quantity: Math.max(1, Math.trunc(p.quantity || 1)) }));
          dispatch({ type: "INIT", payload: safe });
        }
      } catch (err) {
        // ignore errors
        console.warn("Cart: failed to parse storage event value", err);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isBrowser]);

  /**
   * Public API helpers
   */
  const addToCart = useCallback((item: CartItem) => {
    // sanitize
    const safeItem: CartItem = { ...item, quantity: Math.max(1, Math.trunc(item.quantity || 1)) };
    dispatch({ type: "ADD", payload: safeItem });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: "REMOVE", payload: { id } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const q = Math.max(1, Math.trunc(quantity));
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity: q } });
  }, []);

  const increaseQty = useCallback((id: string, delta: number = 1) => {
    dispatch({ type: "INCREASE_QTY", payload: { id, delta } });
  }, []);

  const decreaseQty = useCallback((id: string, delta: number = 1) => {
    dispatch({ type: "DECREASE_QTY", payload: { id, delta } });
  }, []);

  const getCartTotal = useCallback(
    () => state.items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [state.items]
  );

  const getTotalItems = useCallback(() => state.items.reduce((sum, it) => sum + it.quantity, 0), [state.items]);

  // Memoize context value to avoid re-renders
 const [isCartOpen, setIsCartOpen] = useState(false);
const openCart = () => setIsCartOpen(true);
const closeCart = () => setIsCartOpen(false);

// Memoize context value to avoid re-renders
const value = useMemo(
  (): CartContextType => ({
    cartItems: state.items,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    increaseQty,
    decreaseQty,
    getCartTotal,
    getTotalItems,
    isCartOpen,   // ✅ added
    openCart,     // ✅ added
    closeCart,    // ✅ added
  }),
  [
    state.items,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    increaseQty,
    decreaseQty,
    getCartTotal,
    getTotalItems,
    isCartOpen,   // ✅ include dependencies
    openCart,
    closeCart,
  ]
);


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Hook
 */
export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
