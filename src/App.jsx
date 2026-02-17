import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";

// --- CONTEXTO DEL CARRITO ---
import { CartProvider } from "./context/CartContext";

// --- COMPONENTS CRÍTICOS ---
import Navbar from "./components/layout/Navbar";
import NewReleaseHero from "./components/home/NewReleaseHero";
import CartDrawer from "./components/cart/CartDrawer";
import Preloader from "./components/ui/Preloader";

// --- COMPONENTS LAZY ---
const Footer = lazy(() => import("./components/layout/Footer"));
const VideoHero = lazy(() => import("./components/home/VideoHero"));
const Hero = lazy(() => import("./components/home/Hero"));
const InfiniteMarquee = lazy(() => import("./components/ui/InfiniteMarquee"));
const FeaturedProducts = lazy(
  () => import("./components/home/FeaturedProducts"),
);
const AboutUs = lazy(() => import("./components/home/AboutUs"));
const Contact = lazy(() => import("./components/home/Contact"));
const SectionDivider = lazy(() => import("./components/ui/SectionDivider"));

// --- PAGES LAZY ---
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

// --- UTILS ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PagePlaceholder = ({ title }) => (
  <div className="min-h-screen bg-[#050505] pt-40 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    <div className="relative z-10 text-center">
      <h1 className="text-5xl md:text-8xl font-black italic text-white tracking-tighter mb-4 uppercase">
        {title}
      </h1>
      <p className="text-white/50 text-xl tracking-widest uppercase">
        Próximamente
      </p>
      <div className="mt-12 w-24 h-1 bg-trexx-red mx-auto"></div>
    </div>
  </div>
);

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-trexx-red font-bold tracking-widest animate-pulse uppercase text-xs">
    Cargando sección...
  </div>
);

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // LOGICA DE CARGA REAL
  const [itemsLoaded, setItemsLoaded] = useState(0);
  const totalItemsToLoad = 2; // 1. Imagen del NewReleaseHero + 2. Video del VideoHero
  const [isLoading, setIsLoading] = useState(true);

  const handleItemLoaded = useCallback(() => {
    setItemsLoaded((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (itemsLoaded >= totalItemsToLoad) {
      // Pequeño delay extra para que la transición sea fluida
      const timeout = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [itemsLoaded, totalItemsToLoad]);

  return (
    <CartProvider>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>

        <Router>
          <ScrollToTop />

          <div
            className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-trexx-red selection:text-white flex flex-col transition-opacity duration-1000 ${
              isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
            }`}
          >
            <CartDrawer />
            <Navbar />

            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <div className="relative z-0">
                          <NewReleaseHero onImageLoad={handleItemLoaded} />
                        </div>

                        <div className="relative z-0">
                          <VideoHero onVideoLoad={handleItemLoaded} />
                        </div>

                        <div className="relative z-20">
                          <InfiniteMarquee />
                        </div>

                        <div className="relative z-10 bg-[#050505]">
                          <FeaturedProducts />
                          <SectionDivider
                            text1="High Performance"
                            text2="Carbon Innovation"
                            text3="Next Gen Padel"
                            reverse={true}
                          />
                          <div id="product-hero" className="relative z-10">
                            <Hero
                              current={currentSlide}
                              setCurrent={setCurrentSlide}
                            />
                          </div>
                          <SectionDivider
                            text1="Argentine DNA"
                            text2="Professional Grade"
                            text3="Break The Limits"
                          />
                          <AboutUs />
                          <Contact />
                        </div>
                      </>
                    }
                  />

                  <Route path="/shop" element={<Shop />} />
                  <Route path="/palas" element={<Shop />} />
                  <Route path="/ropa" element={<Shop />} />
                  <Route path="/zapatillas" element={<Shop />} />
                  <Route path="/accesorios" element={<Shop />} />
                  <Route path="/shop/product/:id" element={<ProductDetail />} />
                  <Route
                    path="/historia"
                    element={<PagePlaceholder title="NUESTRA HISTORIA" />}
                  />
                  <Route
                    path="/tecnologia"
                    element={<PagePlaceholder title="TECNOLOGÍA" />}
                  />
                  <Route
                    path="/jugadores"
                    element={<PagePlaceholder title="TEAM TREXX" />}
                  />
                  <Route
                    path="/contacto"
                    element={
                      <div className="pt-20">
                        <Contact />
                      </div>
                    }
                  />
                  <Route path="*" element={<PagePlaceholder title="404" />} />
                </Routes>
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </Router>
      </LazyMotion>
      <SpeedInsights />
    </CartProvider>
  );
}

export default App;
