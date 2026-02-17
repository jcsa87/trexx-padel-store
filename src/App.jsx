import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

// --- CONTEXTO DEL CARRITO ---
import { CartProvider } from "./context/CartContext";

// --- COMPONENTS ---
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import VideoHero from "./components/home/VideoHero";
import Hero from "./components/home/Hero";
import InfiniteMarquee from "./components/ui/InfiniteMarquee";
import FeaturedProducts from "./components/home/FeaturedProducts";
import AboutUs from "./components/home/AboutUs";
import Contact from "./components/home/Contact";
import SectionDivider from "./components/ui/SectionDivider"; // Componente de Cinta
import CartDrawer from "./components/cart/CartDrawer"; // Componente del Carrito

// --- PAGES ---
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NewReleaseHero from "./components/home/NewReleaseHero";

// --- SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- PLACEHOLDER ---
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

const NotFound = () => (
  <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
    <h1 className="text-9xl font-black text-trexx-red italic tracking-tighter">
      404
    </h1>
    <p className="text-xl tracking-[0.5em] uppercase mt-4">
      Página no encontrada
    </p>
  </div>
);

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    // 1. Envolvemos la app con el Provider del Carrito
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-trexx-red selection:text-white flex flex-col">
          {/* 2. Panel del Carrito Global */}
          <CartDrawer />

          {/* Navbar Fijo */}
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* --- HOME PAGE --- */}
              <Route
                path="/"
                element={
                  <>
                    <div className="relative z-0">
                      <NewReleaseHero />
                    </div>

                    {/* 1. VIDEO HERO (Nuevo Principal) */}
                    <div className="relative z-0">
                      <VideoHero />
                    </div>

                    {/* 3. MARQUEE */}
                    <div className="relative z-20">
                      <InfiniteMarquee />
                    </div>

                    <div className="relative z-10 bg-[#050505]">
                      {/* Productos Destacados */}
                      <FeaturedProducts />

                      {/* --- CINTA SUPERIOR (NUEVA) --- */}
                      {/* Transición hacia el slider de productos */}
                      <SectionDivider
                        text1="High Performance"
                        text2="Carbon Innovation"
                        text3="Next Gen Padel"
                        reverse={true}
                      />

                      {/* 2. PRODUCT HERO (Antiguo Hero, ahora secundario) */}
                      <div id="product-hero" className="relative z-10">
                        <Hero
                          current={currentSlide}
                          setCurrent={setCurrentSlide}
                        />
                      </div>

                      {/* --- CINTA INFERIOR (EXISTENTE) --- */}
                      {/* Transición hacia la historia */}
                      <SectionDivider
                        text1="Argentine DNA"
                        text2="Professional Grade"
                        text3="Break The Limits"
                      />

                      {/* Historia (ADN Argentino) */}
                      <AboutUs />

                      {/* Contacto */}
                      <Contact />
                    </div>
                  </>
                }
              />

              {/* --- SHOP ROUTES --- */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/palas" element={<Shop />} />
              <Route path="/ropa" element={<Shop />} />
              <Route path="/zapatillas" element={<Shop />} />
              <Route path="/accesorios" element={<Shop />} />

              {/* --- PRODUCT DETAIL --- */}
              <Route path="/shop/product/:id" element={<ProductDetail />} />

              {/* --- PÁGINAS ESTÁTICAS / PLACEHOLDERS --- */}
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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
