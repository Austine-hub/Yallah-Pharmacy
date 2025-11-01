// src/components/WellnessBanner.tsx
import { useNavigate } from "react-router-dom";
import styles from "./WellnessBanner.module.css";

interface BannerCardProps {
  imageSrc: string;
  altText: string;
  linkTo: string;
  ariaLabel: string;
}

/* ------------------------
   🔹 BannerCard Component
   - Keyboard-accessible
   - Uses native <img> alt (no visible text)
   - Lazy loads for performance
-------------------------*/
const BannerCard: React.FC<BannerCardProps> = ({
  imageSrc,
  altText,
  linkTo,
  ariaLabel,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(linkTo);

const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    navigate(linkTo);
  }
};


  return (
    <figure
      className={styles.bannerCard}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
    >
      <img
        src={imageSrc}
        alt={altText}
        className={styles.bannerImage}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.alt = altText; // show alt text only if image fails
        }}
      />
      {/* Removed figcaption — alt text is used only for accessibility */}
    </figure>
  );
};

/* ------------------------
   🔹 WellnessBanner Section
   - Maps multiple banners
   - Semantic & accessible
-------------------------*/
const WellnessBanner: React.FC = () => {
  const banners: BannerCardProps[] = [
    {
      imageSrc: "/wellness1.png",
      altText:
        "I Choose Wellness - Get up to 50% off sitewide on supplements, health essentials, and personal care items.",
      linkTo: "/deals/wellness-products",
      ariaLabel: "Shop wellness products with up to 50% off",
    },
    {
      imageSrc: "/wellness2.png",
      altText:
        "I Choose Wellness - Get up to 30% off skincare essentials including CeraVe, Garnier, and other premium brands.",
      linkTo: "/deals/skincare-essentials",
      ariaLabel: "Shop skincare essentials with up to 30% off",
    },
  ];

  return (
    <section
      className={styles.wellnessContainer}
      aria-label="Wellness Promotional Banners"
    >
      <div className={styles.bannerWrapper}>
        {banners.map((banner) => (
          <BannerCard key={banner.linkTo} {...banner} />
        ))}
      </div>
    </section>
  );
};

export default WellnessBanner;
