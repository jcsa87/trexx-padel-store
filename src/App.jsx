import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

// --- COMPONENTS ---
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import InfiniteMarquee from "./components/ui/InfiniteMarquee";
import FeaturedProducts from "./components/home/FeaturedProducts";
import AboutUs from "./components/home/AboutUs";
import Contact from "./components/home/Contact";

// --- PAGES ---
import Shop from "./pages/Shop"; // <--- IMPORTAMOS LA NUEVA PÁGINA ÚNICA

// --- SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- PLACEHOLDER (Solo para páginas institucionales que aún no existen) ---
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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-trexx-red selection:text-white flex flex-col">
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
                    <Hero current={currentSlide} setCurrent={setCurrentSlide} />
                  </div>

                  <div className="relative z-20">
                    <InfiniteMarquee />
                  </div>

                  <div className="relative z-10 bg-[#050505]">
                    {/* Productos Destacados (Elite Series) */}
                    <FeaturedProducts />

                    {/* Historia (ADN Argentino) */}
                    <AboutUs />

                    {/* Contacto (Formulario) */}
                    <Contact />
                  </div>
                </>
              }
            />

            {/* --- SHOP (CATÁLOGO UNIFICADO) --- */}
            {/* Todas estas rutas renderizan el mismo componente Shop.
                El componente Shop se encarga de scrollear a la sección correcta usando el #hash del Navbar */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/palas" element={<Shop />} />
            <Route path="/ropa" element={<Shop />} />
            <Route path="/zapatillas" element={<Shop />} />
            <Route path="/accesorios" element={<Shop />} />

            {/* --- RUTAS INSTITUCIONALES (Footer) --- */}
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

            {/* Ruta directa a contacto (opcional, ya está en home) */}
            <Route
              path="/contacto"
              element={
                <div className="pt-20">
                  <Contact />
                </div>
              }
            />

            {/* --- 404 --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer Global */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
