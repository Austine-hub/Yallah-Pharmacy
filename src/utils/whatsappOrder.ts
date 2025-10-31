// src/utils/whatsappOrder.ts

import type { CartItem } from "../context/CartContext";

/* ---------------------------------------------------------------
   WhatsApp Business Configuration
--------------------------------------------------------------- */
const WHATSAPP_CONFIG = {
  // ✅ Kenya number (no "+" or spaces)
  phoneNumber: "254796787207",

  greeting: "Hello! 👋",
  storeName: "Healthfield Pharmacy",
} as const;

/* ---------------------------------------------------------------
   Helper: Currency Formatter
--------------------------------------------------------------- */
const formatPrice = (amount: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);

/* ---------------------------------------------------------------
   Generate Custom WhatsApp Message
--------------------------------------------------------------- */
export const generateWhatsAppMessage = (
  cartItems: CartItem[],
  subtotal: number
): string => {
  if (!cartItems?.length) {
    return `${WHATSAPP_CONFIG.greeting}\n\nI'm interested in your products from *${WHATSAPP_CONFIG.storeName}*.`;
  }

  const messageParts: string[] = [
    `${WHATSAPP_CONFIG.greeting}`,
    `I'd like to place an order from *${WHATSAPP_CONFIG.storeName}*:\n`,
    "━━━━━━━━━━━━━━━━━━━━",
    "*ORDER DETAILS:*",
  ];

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    messageParts.push(
      `\n${index + 1}. *${item.name}*`,
      item.variation ? `   Variant: ${item.variation}` : "",
      `   Qty: ${item.quantity} × ${formatPrice(item.price)}`,
      `   Subtotal: ${formatPrice(itemTotal)}`
    );
  });

  messageParts.push(
    "\n━━━━━━━━━━━━━━━━━━━━",
    "*SUMMARY:*",
    `Total Items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}`,
    `*Grand Total:* ${formatPrice(subtotal)}`,
    "━━━━━━━━━━━━━━━━━━━━\n",
    "Please confirm my order and let me know the next steps. Thank you! 🙏"
  );

  return messageParts.filter(Boolean).join("\n");
};

/* ---------------------------------------------------------------
   Open WhatsApp With Pre-Filled Message
--------------------------------------------------------------- */
export const openWhatsAppOrder = (message: string): void => {
  const encodedMessage = encodeURIComponent(message.trim());

  // ✅ Updated URL: wa.me works on both mobile & desktop
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;

  // ✅ Open in a new tab safely
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/* ---------------------------------------------------------------
   Phone Validation (Basic)
--------------------------------------------------------------- */
export const isValidWhatsAppNumber = (phone: string): boolean =>
  /^\d{10,15}$/.test(phone);

/* ---------------------------------------------------------------
   Main Handler
--------------------------------------------------------------- */
export const handleWhatsAppOrder = (
  cartItems: CartItem[],
  subtotal: number
): boolean => {
  if (!isValidWhatsAppNumber(WHATSAPP_CONFIG.phoneNumber)) {
    console.error("❌ Invalid WhatsApp number in configuration");
    return false;
  }

  try {
    const message = generateWhatsAppMessage(cartItems, subtotal);
    openWhatsAppOrder(message);
    return true;
  } catch (err) {
    console.error("❌ Failed to open WhatsApp:", err);
    return false;
  }
};
