// Hero.tsx
// Modern Responsive Hero with main arrows + side banners sliding opposite directions
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

/* -------------------------
   Replace these imports with your local assets
   e.g.
   import main1 from '../../assets/hero/main-1.jpg'
   ...
--------------------------*/
import pic1 from "../../assets/hero/Banner1.webp";
import pic2 from "../../assets/hero/Banner2.webp";
import pic4 from "../../assets/hero/Banner3.webp";
import pic3 from "../../assets/hero/Banner4.webp";
import main1 from "../../assets/photos/photo1.jpg";
import main2 from "../../assets/photos/photo2.jpg";
import main3 from "../../assets/photos/photo3.jpg";
import pic5 from "../../assets/hero/Banner5.jpg";

import sideA1 from "../../assets/photos/photo4.jpg";
import sideA2 from "../../assets/hero/photo6.jpg";

import sideB1 from "../../assets/hero/Banner5.jpg";
import sideB2 from "../../assets/photos/photo4.jpg";

type Slide = { id: number; image: string; title?: string; subtitle?: string };

const Hero: React.FC = () => {
  // --- slides
  const mainSlides: Slide[] = [
    { id: 1, image: sideA1, title: "Timeless Beauty", subtitle: "Skincare & supplements" },
    { id: 2, image: main2, title: "Wellness Starts Here", subtitle: "Trusted pharmacy solutions" },
    { id: 3, image: pic1, title: "Affordable. Reliable.", subtitle: "Everything for better health." },
    { id: 4, image: pic2, title: "Timeless Beauty", subtitle: "Skincare & supplements" },
    { id: 5, image: pic3, title: "Wellness Starts Here", subtitle: "Trusted pharmacy solutions" },
    { id: 6, image: pic4, title: "Affordable. Reliable.", subtitle: "Everything for better health." },
    { id: 7, image: main1, title: "Wellness Starts Here", subtitle: "Trusted pharmacy solutions" },
    { id: 8, image: main3, title: "Affordable. Reliable.", subtitle: "Everything for better health." },
    { id: 9, image: pic2, title: "Timeless Beauty", subtitle: "Skincare & supplements" },
    { id: 10, image: pic5, title: "Timeless Beauty", subtitle: "Skincare & supplements" },
  ];

  const sideLeftSlides: Slide[] = [
    { id: 1, image: sideA1, title: "No More Acne", subtitle: "Skincare essentials" },
    { id: 2, image: sideA2, title: "Top Brands", subtitle: "Supplements & vitamins" },
  ];

  const sideRightSlides: Slide[] = [
    { id: 1, image: sideB1, title: "Studex", subtitle: "Ear care & accessories" },
    { id: 2, image: sideB2, title: "Dermacare", subtitle: "Natural beauty" },
  ];

  // --- state
  const [mainIndex, setMainIndex] = useState(0);
  const [sideIndex, setSideIndex] = useState(0); // used for both side banners (they are synced)
  const [isPaused, setIsPaused] = useState(false);

  // refs so arrow clicks temporarily pause auto-rotate
  const pauseRef = useRef<number | null>(null);

  const pauseAuto = (ms = 3000) => {
    setIsPaused(true);
    if (pauseRef.current) window.clearTimeout(pauseRef.current);
    pauseRef.current = window.setTimeout(() => setIsPaused(false), ms);
  };

  // --- auto-rotation: main is async, side banners rotate together
  useEffect(() => {
    const mainTimer = setInterval(() => {
      if (!isPaused) setMainIndex((i) => (i + 1) % mainSlides.length);
    }, 6000);

    const sideTimer = setInterval(() => {
      if (!isPaused) setSideIndex((i) => (i + 1) % sideLeftSlides.length);
    }, 7000);

    return () => {
      clearInterval(mainTimer);
      clearInterval(sideTimer);
      if (pauseRef.current) window.clearTimeout(pauseRef.current);
    };
  }, [isPaused, mainSlides.length, sideLeftSlides.length]);

  // --- main variants (left/right arrows change slide direction)
  const mainVariants: Variants = {
    enterLeft: { opacity: 0, x: -120, scale: 0.99 },
    enterRight: { opacity: 0, x: 120, scale: 0.99 },
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
    exitLeft: { opacity: 0, x: 120, transition: { duration: 0.6 } },
    exitRight: { opacity: 0, x: -120, transition: { duration: 0.6 } },
  };

  // --- side variants: left slides move left-to-right (we'll invert for the other side)
  const sideEnterLeftToRight: Variants = {
    hidden: { opacity: 0, x: -80, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: 80, transition: { duration: 0.6 } },
  };

  const sideEnterRightToLeft: Variants = {
    hidden: { opacity: 0, x: 80, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -80, transition: { duration: 0.6 } },
  };

  // control which direction main slide enters/exits (used when clicking arrows)
  const [direction, setDirection] = useState<"left" | "right">("right");

  const gotoMain = (idx: number) => {
    setMainIndex(idx);
    pauseAuto();
  };

  const prevMain = () => {
    setDirection("left");
    setMainIndex((i) => (i - 1 + mainSlides.length) % mainSlides.length);
    pauseAuto();
  };

  const nextMain = () => {
    setDirection("right");
    setMainIndex((i) => (i + 1) % mainSlides.length);
    pauseAuto();
  };

  return (
    <section className={styles.heroContainer} aria-label="Hero section">
      {/* MAIN HERO - left, ~70% width */}
      <div className={styles.mainHero}>
        {/* left/right arrows (desktop only) */}
        <button
          className={clsx(styles.arrowBtn, styles.leftArrow)}
          onClick={prevMain}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        

        <button
          className={clsx(styles.arrowBtn, styles.rightArrow)}
          onClick={nextMain}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mainSlides[mainIndex].id}
            className={styles.mainSlide}
            initial={direction === "right" ? "enterRight" : "enterLeft"}
            animate="center"
            exit={direction === "right" ? "exitRight" : "exitLeft"}
            variants={mainVariants}
          >
            <LazyLoadImage
              src={mainSlides[mainIndex].image}
              alt={mainSlides[mainIndex].title || `Main slide ${mainIndex + 1}`}
              effect="opacity"
              className={styles.mainImage}
            />

            <div className={styles.mainOverlay} />

            <div className={styles.mainContent}>
              <h2 className={styles.mainTitle}>{mainSlides[mainIndex].title}</h2>
              <p className={styles.mainSubtitle}>{mainSlides[mainIndex].subtitle}</p>

              
              <div>
                      <Link to="/shop" className={styles.cta}>
                           Shop Now <ChevronRight size={16} />
                      </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* dots */}
        <div className={styles.dots}>
          {mainSlides.map((_, i) => (
            <button
              key={i}
              className={clsx(styles.dot, { [styles.activeDot]: i === mainIndex })}
              onClick={() => { gotoMain(i); setDirection(i > mainIndex ? "right" : "left"); }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* SIDE COLUMN - right, ~30% width with 2 stacked banners */}
      <div className={styles.sideColumn}>
        <div className={styles.sideBannerWrap}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sideLeftSlides[sideIndex].id}
              className={styles.sideBanner}
              variants={sideEnterLeftToRight}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <LazyLoadImage
                src={sideLeftSlides[sideIndex].image}
                alt={sideLeftSlides[sideIndex].title || "side banner left"}
                effect="opacity"
                className={styles.sideImage}
              />
              <div className={styles.sideOverlay} />
              <div className={styles.sideText}>
                <h4>{sideLeftSlides[sideIndex].title}</h4>
                <p>{sideLeftSlides[sideIndex].subtitle}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.sideBannerWrap}>
          {/* Right side banner moves opposite direction: slide right-to-left */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sideRightSlides[sideIndex].id}
              className={styles.sideBanner}
              variants={sideEnterRightToLeft}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <LazyLoadImage
                src={sideRightSlides[sideIndex].image}
                alt={sideRightSlides[sideIndex].title || "side banner right"}
                effect="opacity"
                className={styles.sideImage}
              />
              <div className={styles.sideOverlay} />
              <div className={styles.sideText}>
                <h4>{sideRightSlides[sideIndex].title}</h4>
                <p>{sideRightSlides[sideIndex].subtitle}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
