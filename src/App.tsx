// ===============================================================
// ✅ App.tsx — Modern Scalable Layout (2025 Optimized)
// ===============================================================

import { Suspense, lazy, useEffect, type FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import appStyles from "./App.module.css";



// ===============================================================
// 🎨 Theme Context Provider
// ===============================================================
import { ThemeProvider } from "./theme/ThemeProvider";

// ===============================================================
// 🧩 Global Layout Components
// ===============================================================
import Hero from "./components/header/Hero";
import Footer from "./components/footer/Footer";

// ===============================================================
// 🛍️ Content & Page Imports
// ===============================================================
import Shop from "./components/Shop";
import ShopByCategory from "./pages/ShopByCategory";
import DM from "./dropdowns/Diabetes";
import CVS from "./categories/Cadiovascular";
import WomenHealthShop from "./dropdowns/Women";
import PrescriptionUpload from "./dropdowns/PrescriptionUpload";
import RequestPrescription from "./dropdowns/RequestPrescription";
import Vitamins from "./dropdowns/Vitamins";
import Equipment from "./dropdowns/Equipment";
import MensHealth from "./dropdowns/Men";
import BestSellers from "./pages/BestSellers";
import BeautyProducts from "./pages/BeautyProducts";
import ProductCarousel from "./pages/ProductCarousel";
import OffersWrapper from "./pages/OffersWrapper";
import BottomNav from "./components/footer/BottomNav";
import Offers1 from "./pages/Offers1";
import Offers2 from "./pages/Hygiene";
import Cart from "./components/Cart";
import Wishlist from "./components/WishList";
import NewArrivals from "./dropdowns/NewArrivals";
import NewArrivals1 from "./dropdowns/NewArrivals2";
import AboutUs from "./outer/AboutUs";
import SkinCare from "./dropdowns/Skincare";
import Resp from "./categories/Respiratory";
import GIT from "./categories/Gastrointestinal";
import Renal from "./categories/Renal";
import Sexual from "./categories/Sexual";
import CNS from "./categories/Nervous";
import MSK from "./categories/Musculosketal";
import SkinCare1 from "./pages/Derma";
import Header from "./components/header/Header";
import Order from "./outer/Order";
import HTN from "./conditions/Hypertension";
import CoughFluCold from "./conditions/CoughFluCold";
import UTI from "./conditions/Uti";
import EyeEar from "./conditions/EyeEar";
import OralCare from "./conditions/Oral";
import SkinDrugs from "./conditions/SkinInfection";
import Prescription from "./dropdowns/Prescription";

// ===============================================================
// 🧠 Lazy-loaded Routes for Performance Optimization
// ===============================================================
const ProductsWrapper = lazy(() => import("./components/ProductsWrapper"));
const OTC = lazy(() => import("./dropdowns/OTC"));
const OurStory = lazy(() => import("./outer/OurStory"));
const OurTeam = lazy(() => import("./outer/OurTeam"));
const OurMissionVision = lazy(() => import("./outer/OurMissionVision"));
const ContactUs = lazy(() => import("./outer/ContactUs"));
const Offers = lazy(() => import("./pages/Offers"));

// ===============================================================
// 🧭 Scroll Restoration Hook (UX Enhancement)
// ===============================================================
const ScrollToTop: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// ===============================================================
// 🏥 Root Application Component
// ===============================================================
const App: FC = () => (
<ThemeProvider>
  <CartProvider>
    <ScrollToTop />


    {/* === Global Toast Notifications === */}
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: { fontSize: "0.9rem" },
      }}
    />

{/* === Persistent Header === */}
<header
  role="banner"
  style={{
    position: "fixed",
    top: 0,
    zIndex: 1000,
    backgroundColor: "var(--header-bg, #fff)",
    width: "100%",
  }}
>
  <Header />
</header>

{/* === Spacer BELOW the fixed header === */}
<div className={appStyles.headerSpacer}></div>


    {/* === Main Content Area === */}
<main
  style={{
    display: "block",
    paddingTop: "var(--header-height, 120px)",
  }}
>


      <Suspense
        fallback={
          <div
            role="status"
            aria-busy="true"
            style={{
              textAlign: "center",
              padding: "3rem",
              fontSize: "1rem",
              color: "#555",
            }}
          >
            <p>Loading content, please wait...</p>
          </div>
        }
      >
        <Routes>
          {/* === Home === */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Offers1/> 
                <Shop/>
                <Offers />  
                <ProductCarousel/>
                <BestSellers /> 
                <SkinDrugs/>                         
                <Offers1/>           
                <ShopByCategory />
                <BeautyProducts />

              </>
            }
          />

          {/* === Product Routes === */}
          <Route path="/products/prescription" element={<ProductsWrapper />} />
          <Route path="/products/otc" element={<OTC />} />
          <Route path="/products/supplements" element={<Vitamins />} />
          <Route path="/products/equipment" element={<Equipment />} />


          {/* === CATEGORIES Routes === */}
          <Route path="/categories/beauty-care-cosmetics" element={<BeautyProducts />} />
          <Route path="/categories/vitamins-supplements" element={<Vitamins />} />
          <Route path="/categories/medicine" element={<ProductsWrapper />} />
          <Route path="/categories/vitamins-supplements" element={<Vitamins />} />
          <Route path="/categories/skin-care" element={<SkinCare1 />} /> 
          <Route path="/categories/general-hygiene" element={<Offers2/>} /> 
          <Route path="/categories/home-healthcare" element={<ProductCarousel/>} /> 

          {/* === Condition Routes === */}
          <Route path="/condition/heart" element={<CVS />} />
          <Route path="/condition/diabetes" element={<DM/>} />
          <Route path="/conditions/htn" element={<HTN/>} />
          <Route path="/conditions/flu" element={<CoughFluCold/>} />  
          <Route path="/conditions/uti-infections" element={<UTI/>} /> 
          <Route path="/conditions/ear-eye-care" element={<EyeEar/>} /> 
          <Route path="/conditions/oral-hygiene" element={<OralCare/>} />
          <Route path="/conditions/skin-treatment" element={<SkinDrugs/>} />  


          <Route path="/condition/women" element={<WomenHealthShop />} />
          <Route path="/condition/men" element={<MensHealth />} />


          {/* === System Routes === */}
          <Route path="/system/respiratory" element={<Resp/>} />
          <Route path="/system/git" element={<GIT/>} />
          <Route path="/system/oral-hygiene" element={<OralCare/>} />
          <Route path="/system/renal" element={<Renal/>} />
          <Route path="/system/reproductive" element={<Sexual/>} /> 
          <Route path="/system/nervous" element={<CNS/>} /> 
          <Route path="/system/diabetes" element={<DM/>} /> 
          <Route path="/system/ent" element={<EyeEar/>} /> 
          <Route path="/system/skin-treatment" element={<SkinCare/>} /> 
          <Route path="/system/msk" element={<MSK/>} /> 


          {/* === Prescription Workflow === */}
          <Route path="/prescription/upload" element={<PrescriptionUpload />} />
          <Route path="/prescription/refill" element={<RequestPrescription />} />
          <Route path="/prescription" element={<Prescription />} />

          {/* === About Section === */}
          <Route path="/about/story" element={<OurStory />} />
          <Route path="/about/team" element={<OurTeam />} />
          <Route path="/about/vision" element={<OurMissionVision />} />
          <Route path="/about-us" element={<AboutUs/>} />

          {/* === Contact Page === */}
          <Route path="/contact-us" element={<ContactUs />} />

          {/* === Shop Page === */}
          <Route path="/shop" element={<Shop />} />

          {/* === OFFERS  Page === */}
          <Route path="/offers" element={<OffersWrapper/>} />
          <Route path="/best-sellers" element={<BestSellers/>} />
          <Route path="/new-arrivals" element={<NewArrivals/>} />  
          <Route path="/trending" element={<NewArrivals1/>} />

          {/* === Cart Page === */}
          <Route path="/cart" element={<Cart/>} />  
          <Route path="/wishlist" element={<Wishlist/>} />
          
          {/* === Checkout= */}
          <Route path="/checkout" element={<Order/>} />  
          


          {/* === 404 — Not Found === */}
          <Route
            path="*"
            element={
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-labelledby="not-found-title"
                style={{
                  textAlign: "center",
                  padding: "4rem 1rem",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <h2
                  id="not-found-title"
                  style={{
                    marginBottom: "1rem",
                    color: "#7a0c2e",
                    fontWeight: 600,
                  }}
                >
                  404 — Page Not Found
                </h2>
                <p style={{ color: "#6b7280" }}>
                  The page you’re looking for doesn’t exist or may have been moved.
                </p>
              </motion.section>
            }
          />
        </Routes>
      </Suspense>
    </main>

    {/* === Global Footer === */}
    <footer role="contentinfo">
      <Footer />
    </footer>
      <BottomNav/>
  </CartProvider>
</ThemeProvider>


);

export default App;
