// ===============================================================
// OUR STORY — Accessible, Scalable, Mobile-Optimized (2025)
// ===============================================================

import { useEffect, useRef, memo } from "react";
import styles from "./OurStory.module.css";

// ===============================================================
// ✅ Local Images
// ===============================================================
import pic1 from "../assets/photos/photo1.jpg";
import pic2 from "../assets/shop1/accessories.png";
import pic3 from "../assets/shop1/Vitamins.png";
import pic4 from "../assets/shop1/reproductive.png";

// ===============================================================
// ✅ Type Definitions
// ===============================================================
export interface Milestone {
  year: string | number;
  title: string;
  description?: string;
  imageAlt?: string;
  imageSrc?: string;
}

interface Props {
  companyName?: string;
  intro?: string;
  milestones?: Milestone[];
}

// ===============================================================
// ✅ Default Example Data
// ===============================================================
const DEFAULT_MILESTONES: Milestone[] = [
  {
    year: 2008,
    title: "Founded",
    description:
      "Started as a small community pharmacy focused on patient care.",
    imageAlt: "Founding team photo placeholder",
    imageSrc: pic1,
  },
  {
    year: 2013,
    title: "Expanded Services",
    description:
      "Introduced medication therapy management and home delivery.",
    imageAlt: "Pharmacist counseling patient placeholder",
    imageSrc: pic2,
  },
  {
    year: 2018,
    title: "Digital Transformation",
    description:
      "Launched our online refill and appointment booking system.",
    imageAlt: "Web app UI placeholder",
    imageSrc: pic3,
  },
  {
    year: 2024,
    title: "Community Impact",
    description:
      "Reached over 100,000 patients through educational programs.",
    imageAlt: "Community outreach placeholder",
    imageSrc: pic4,
  },
];

// ===============================================================
// ✅ Component
// ===============================================================
function OurStory({
  companyName = "Your Pharmacy",
  intro = "Serving our community with safe, evidence-based pharmacy care.",
  milestones = DEFAULT_MILESTONES,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Intersection Observer Animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add(styles.visible);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="our-story-heading">
      <div className={styles.inner} ref={containerRef}>
        {/* ========================= HEADER ========================= */}
        <header className={styles.header}>
          <h2 id="our-story-heading" className={styles.title}>
            {companyName} — Our Story
          </h2>
          <p className={styles.intro}>{intro}</p>
        </header>

        {/* ========================= TIMELINE ========================= */}
        <ol className={styles.timeline} role="list">
          {milestones
            .slice()
            .sort((a, b) => Number(a.year) - Number(b.year))
            .map((m, i) => (
              <li
                key={`${m.year}-${i}`}
                className={styles.milestone}
                style={{ transitionDelay: `${i * 200}ms` }}
                aria-label={`${m.year} — ${m.title}`}
              >
                <div className={styles.meta}>
                  <span className={styles.year}>{m.year}</span>
                </div>

                <div className={styles.card}>
                  <div className={styles.media}>
                    {m.imageSrc ? (
                      <img
                        src={m.imageSrc}
                        alt={m.imageAlt ?? m.title}
                        className={styles.image}
                        loading="lazy"
                        decoding="async"
                        width={320}
                        height={240}
                      />
                    ) : (
                      <div
                        className={styles.placeholder}
                        aria-hidden="true"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M8 13l3-3 5 5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.milestoneTitle}>{m.title}</h3>
                    {m.description && (
                      <p className={styles.desc}>{m.description}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ol>

        {/* ========================= FOOTER ========================= */}
        <footer className={styles.footer}>
          <p className={styles.note}>
            For clinical or product information, ensure all content is
            referenced from reputable sources such as Mayo Clinic, CDC, NHS, or
            Pharmacy Times.
          </p>
        </footer>
      </div>
    </section>
  );
}

// ===============================================================
// ✅ Export (Memoized for Performance)
// ===============================================================
export default memo(OurStory);
