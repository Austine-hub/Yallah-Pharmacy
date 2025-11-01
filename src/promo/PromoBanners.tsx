import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoBanners.module.css';


interface PromoBanner {
  id: string;
  image: string;
  alt: string;
  link: string;
  category: string;
}

const PromoBanners: React.FC = () => {
  const navigate = useNavigate();

  const banners: PromoBanner[] = [
    {
      id: 'diapers',
      image:"/diapers-promo.jpg",
      alt: 'Baby Diapers Sale - Up to 50% off',
      link: '/offers/diapers',
      category: 'Baby Diapers'
    },
    {
      id: 'makeup',
      image: "/beauty.png",
      alt: 'Makeup & Beauty Products - Up to 30% off',
      link: '/offers/makeup',
      category: 'Beauty & Makeup'
    }
  ];

  const handleBannerClick = (link: string, category: string) => {
    navigate(link, { state: { category } });
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    link: string,
    category: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleBannerClick(link, category);
    }
  };

  return (
    <section className={styles.promoBannersContainer} aria-label="Promotional Offers">
      <div className={styles.bannersWrapper}>
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={styles.bannerItem}
            onClick={() => handleBannerClick(banner.link, banner.category)}
            onKeyPress={(e) => handleKeyPress(e, banner.link, banner.category)}
            role="button"
            tabIndex={0}
            aria-label={`View ${banner.category} offers`}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className={styles.bannerImage}
              loading="lazy"
            />
            <div className={styles.bannerOverlay}>
              <span className={styles.viewOffersText}>View Offers</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;