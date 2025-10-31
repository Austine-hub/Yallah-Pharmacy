import { memo } from "react";
import styles from "./OffersWrapper.module.css";

// Import existing product-related components
import CVS from "../categories/Cadiovascular";
import Shop from "../components/Shop";
import Renal from "../categories/Renal";
import CNS from "../categories/Nervous";
import GUT from "../categories/Reproductive";
import ShopByCategory from "../pages/ShopByCategory";
import Offers from "./Offers";
import BestSellers from "./BestSellers";
import BeautyProducts from "./BeautyProducts";
import ProductsWrapper from "../components/ProductsWrapper";
import Offers1 from "./Offers1";
import Offers2 from "./Hygiene";
import MensHealth from "../dropdowns/Men";
import WomenHealthShop from "../dropdowns/Women";
import Vitamins from "../dropdowns/Vitamins";

const OffersWrapper = () => {
  return (
    <main className={styles.container}>

     {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Sexual & Reproductive Health Section
        </h2>
        <Offers1/>
      </section>

           {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Sexual & Reproductive Health Section
        </h2>
        <BestSellers/>
      </section>

           {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Sexual & Reproductive Health Section
        </h2>
        <MensHealth/>
      </section>
           {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Sexual & Reproductive Health Section
        </h2>
        <WomenHealthShop/>
      </section>


       {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Sexual & Reproductive Health Section
        </h2>
        <Offers2/>
      </section>


         {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Sexual & Reproductive Health Section
        </h2>
        <Offers/>
      </section>

            {/* Best Selling Section */}
      <section aria-labelledby="best-selling" className={styles.section}>
        <h2 id="best-selling" className={styles.title}>
          Best Selling Products
        </h2>
        <Vitamins/>
      </section>

     {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Heart and Cardiovascular Section
        </h2>
        <CVS />
      </section>

      {/* Best Selling Section */}
      <section aria-labelledby="best-selling" className={styles.section}>
        <h2 id="best-selling" className={styles.title}>
          Best Selling Products
        </h2>
        <BestSellers/>
      </section>

     {/* Featured Grid Section */}
      <section aria-labelledby="featured-grid" className={styles.sectionAlt}>
        <h2 id="featured-grid" className={styles.title}>
          Heart and Cardiovascular Section
        </h2>
        <CVS />
      </section>

      {/* Therapeutic Use Section */}
      <section
        aria-labelledby="therapeutic-use"
        className={styles.sectionAlt}
      >
        <h2 id="therapeutic-use" className={styles.title}>
          Respiratory system/ Breathing Section
        </h2>
        <BeautyProducts />
      </section>

            {/* Top Products Section */}
      <section aria-labelledby="top-products" className={styles.section}>
        <h2 id="top-products" className={styles.title}>
          Musculosketal and Joints Drugs
        </h2>
        <Shop />
      </section>

      {/* Therapeutic Use Section */}
      <section
        aria-labelledby="therapeutic-use"
        className={styles.sectionAlt}
      >
        <h2 id="therapeutic-use" className={styles.title}>
          Digestive system Section
        </h2>
        <ProductsWrapper />
      </section>

      {/* Top Products Section */}
      <section aria-labelledby="top-products" className={styles.section}>
        <h2 id="top-products" className={styles.title}>
          Renal/Kidney Drugs
        </h2>
        <Renal />
      </section>

      {/* Top Products Section */}
      <section aria-labelledby="top-products" className={styles.section}>
        <h2 id="top-products" className={styles.title}>
          Nervous System Drugs
        </h2>
        <CNS />
      </section>
      

      
      {/* Top Products Section */}
      <section aria-labelledby="top-products" className={styles.section}>
        <h2 id="top-products" className={styles.title}>
          Reproductive/Sexual Health Section
        </h2>
        <GUT />
      </section>

      {/* Single Product Section */}
      <section aria-labelledby="single-product" className={styles.section}>
        <h2 id="single-product" className={styles.title}>
         Shop By Category
        </h2>
        <ShopByCategory />
      </section>
    </main>
  );
};

export default memo(OffersWrapper);

