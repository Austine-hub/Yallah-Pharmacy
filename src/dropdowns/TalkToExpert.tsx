import React, { useState } from "react";
import styles from "./TalkToExpert.module.css";
import { FaPhoneAlt, FaVideo, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const TalkToExpert: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleSelect = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <section className={styles.talkSection} aria-labelledby="talk-heading">
      <div className={styles.container}>
        <h2 id="talk-heading" className={styles.heading}>
          Talk to Our <span>Pharmacists & Doctors</span>
        </h2>
        <p className={styles.subText}>
          Get professional medical advice, prescription refills, and consultations — right from your home.
        </p>

        <div className={styles.modes}>
          <button
            className={`${styles.modeButton} ${
              selectedMode === "call" ? styles.active : ""
            }`}
            onClick={() => handleSelect("call")}
            aria-pressed={selectedMode === "call"}
          >
            <FaPhoneAlt className={styles.icon} />
            <span>Call Consultation</span>
          </button>

          <button
            className={`${styles.modeButton} ${
              selectedMode === "video" ? styles.active : ""
            }`}
            onClick={() => handleSelect("video")}
            aria-pressed={selectedMode === "video"}
          >
            <FaVideo className={styles.icon} />
            <span>Video Call</span>
          </button>

          <button
            className={`${styles.modeButton} ${
              selectedMode === "email" ? styles.active : ""
            }`}
            onClick={() => handleSelect("email")}
            aria-pressed={selectedMode === "email"}
          >
            <FaEnvelope className={styles.icon} />
            <span>Email Consultation</span>
          </button>

          <button
            className={`${styles.modeButton} ${
              selectedMode === "whatsapp" ? styles.active : ""
            }`}
            onClick={() => handleSelect("whatsapp")}
            aria-pressed={selectedMode === "whatsapp"}
          >
            <FaWhatsapp className={styles.icon} />
            <span>WhatsApp Chat</span>
          </button>
        </div>

        <div className={styles.ctaContainer}>
          <button className={styles.ctaButton}>
            {selectedMode
              ? `Start ${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Session`
              : "Start Consultation"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TalkToExpert;
