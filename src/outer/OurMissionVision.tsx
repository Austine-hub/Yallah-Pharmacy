// File: src/outer/OurMissionVision.tsx
import type { FC } from "react"; // ✅ type-only import for TS compliance
import styles from "./OurMissionVision.module.css";

import pic1 from "../assets/mission/Mission.png";
import pic2 from "../assets/mission/Vision.png";

type Props = {
  missionTitle?: string;
  missionText?: string;
  missionImgSrc?: string;
  missionImgAlt?: string;
  visionTitle?: string;
  visionText?: string;
  visionImgSrc?: string;
  visionImgAlt?: string;
  className?: string;
};

/**
 * ✅ OurMissionVision Component
 * Modern, accessible, and responsive presentation of a company’s mission and vision.
 * - Mobile-first layout
 * - Lazy-loaded, semantic images
 * - ARIA-compliant structure
 */
const OurMissionVision: FC<Props> = ({
  missionTitle = "Our Mission",
  missionText =
    "To deliver safe, affordable, and patient-centred pharmacy and healthcare services using evidence-based practices and the highest ethical standards.",
  missionImgSrc = pic1,
  missionImgAlt = "Pharmacy mission illustration",
  visionTitle = "Our Vision",
  visionText =
    "To be the most trusted local healthcare and pharmacy partner — improving health outcomes through innovation, clinical excellence, and community engagement.",
  visionImgSrc = pic2,
  visionImgAlt = "Pharmacy vision illustration",
  className = "",
}) => {
  return (
    <section
      className={`${styles.container} ${className}`}
      aria-labelledby="mission-vision-heading"
    >
      <div className={styles.inner}>
        {/* === Section Header === */}
        <header className={styles.header}>
          <h2 id="mission-vision-heading" className={styles.heading}>
            Our Mission & Vision
          </h2>
          <p className={styles.lead}>
            Committed to safe dispensing, excellent clinical advice, and accessible care
            for our community.
          </p>
        </header>

        {/* === Mission & Vision Grid === */}
        <div className={styles.grid}>
          {/* --- Mission --- */}
          <article
            className={styles.card}
            aria-labelledby="mission-title"
            aria-describedby="mission-text"
          >
            <div className={styles.mediaWrap}>
              <img
                src={missionImgSrc}
                alt={missionImgAlt}
                className={styles.media}
                loading="lazy"
                width={800}
                height={500}
              />
            </div>

            <div className={styles.content}>
              <h3 id="mission-title" className={styles.title}>
                {missionTitle}
              </h3>
              <p id="mission-text" className={styles.text}>
                {missionText}
              </p>

              <ul className={styles.bullets} aria-label="Mission priorities">
                <li>Patient safety & medication stewardship</li>
                <li>Evidence-based clinical counselling</li>
                <li>Accessible, affordable services</li>
              </ul>
            </div>
          </article>

          {/* --- Vision --- */}
          <article
            className={styles.card}
            aria-labelledby="vision-title"
            aria-describedby="vision-text"
          >
            <div className={styles.mediaWrap}>
              <img
                src={visionImgSrc}
                alt={visionImgAlt}
                className={styles.media}
                loading="lazy"
                width={800}
                height={500}
              />
            </div>

            <div className={styles.content}>
              <h3 id="vision-title" className={styles.title}>
                {visionTitle}
              </h3>
              <p id="vision-text" className={styles.text}>
                {visionText}
              </p>

              <ul className={styles.bullets} aria-label="Vision priorities">
                <li>Clinical excellence & staff training</li>
                <li>Community health partnerships</li>
                <li>Digital-first, user-centred services</li>
              </ul>
            </div>
          </article>
        </div>

        {/* === Footer Note === */}
        <footer className={styles.footer}>
          <p className={styles.small}>
            For custom branding or tone adaptation, pass your organization details
            through props or context.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default OurMissionVision;
