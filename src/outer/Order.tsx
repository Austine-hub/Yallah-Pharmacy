import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, CreditCard, MessageCircle, ArrowRight } from "lucide-react";
import styles from "./Order.module.css";

interface ShipmentInfo {
  number?: number;
  station?: string;
  fulfilledBy?: string;
  deliveryStart?: string;
  deliveryEnd?: string;
}

interface OrderProps {
  orderNumber?: string;
  shipments?: ShipmentInfo[];
  hasGlobalItems?: boolean;
  onSeeDetails?: () => void;
  whatsappNumber?: string;
}

const Order: React.FC<OrderProps> = ({
  orderNumber = "Pending...",
  shipments = [],
  hasGlobalItems = false,
  onSeeDetails,
  whatsappNumber = "1234567890",
}) => {
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to place an order. Order reference: ${orderNumber}`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className={styles.orderContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ✅ Header */}
      <section className={styles.confirmationSection}>
        <div className={styles.confirmationContent}>
          <CheckCircle className={styles.checkmarkIcon} aria-hidden="true" />
          <div className={styles.confirmationText}>
            <p className={styles.thankYouText}>🎉 Thank you for shopping with us!</p>
            <p className={styles.orderNumber}>Order No. {orderNumber}</p>
          </div>
        </div>

        {onSeeDetails && (
          <button
            onClick={onSeeDetails}
            className={styles.detailsButton}
            aria-label="View order details"
          >
            See Order Details
          </button>
        )}
      </section>

      {/* ✅ Main Content */}
      <div className={styles.contentGrid}>
        {/* === Pickup Info === */}
        <section className={styles.pickupSection}>
          <div className={styles.sectionHeader}>
            <Package className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>Pick-up Station</h2>
          </div>

          <p className={styles.notificationText}>
            You'll receive an SMS, email, and push notification when your package is ready for pickup.
          </p>

          <div className={styles.shipmentsContainer}>
            {Array.isArray(shipments) && shipments.length > 0 ? (
              shipments.map((shipment, idx) => (
                <motion.div
                  key={shipment.number ?? idx}
                  className={styles.shipmentItem}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className={styles.shipmentTitle}>
                    Shipment {shipment.number ?? idx + 1}
                  </h3>
                  <p className={styles.shipmentDetail}>
                    {shipment.station ?? "Unknown Station"} • Fulfilled by{" "}
                    {shipment.fulfilledBy ?? "Pending"}
                  </p>
                  <p className={styles.deliverySchedule}>
                    Delivery{" "}
                    {shipment.deliveryEnd ? "between" : "scheduled on"}{" "}
                    <span className={styles.deliveryDate}>
                      {shipment.deliveryStart ?? "TBD"}
                    </span>
                    {shipment.deliveryEnd && (
                      <>
                        {" and "}
                        <span className={styles.deliveryDate}>
                          {shipment.deliveryEnd}
                        </span>
                      </>
                    )}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className={styles.emptyStateText}>
                No shipment information available yet.
              </p>
            )}
          </div>

          {hasGlobalItems && (
            <p className={styles.globalItemsNote}>
              🌍 This order includes global items which may take longer to arrive.
            </p>
          )}
        </section>

        {/* === Payment Info === */}
        <section className={styles.paymentSection}>
          <div className={styles.sectionHeader}>
            <CreditCard className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>
              Pay on Delivery via Mobile Money or Bank Cards
            </h2>
          </div>
          <p className={styles.paymentDescription}>
            Enjoy fast and secure payments — available for M-Pesa, Airtel Money, and major bank cards.
          </p>
        </section>

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
                <h2 className={styles.whatsappTitle}> Want to Order?</h2>
                <p className={styles.whatsappDescription}>
                  Order with us directly on WhatsApp for instant support, order tracking, or to place a new order.
                </p>
              </div>
            </div>

            <motion.button
              onClick={handleWhatsAppOrder}
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
      </div>
    </motion.div>
  );
};

export default Order;