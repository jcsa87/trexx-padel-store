import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// --- IMPORTACIONES DE LAYOUT ---
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// --- IMPORTACIONES DE HOME ---
import Hero from "./components/home/Hero";
import InfiniteMarquee from "./components/ui/InfiniteMarquee";
import FeaturedProducts from "./components/home/FeaturedProducts";
import AboutUs from "./components/home/AboutUs";
import Contact from "./components/home/Contact"; // <--- NUEVO COMPONENTE

// --- IMPORTACIONES DE PÁGINAS ---
import CartPage from "./pages/CartPage";

// --- COMPONENTES PLACEHOLDER (Para rutas aún no desarrolladas) ---
const Shop = ({ category }) => (
  <div className="pt-40 pb-20 min-h-[80vh] flex flex-col items-center justify-center text-white bg-[#050505]">
    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 text-center">
      CATÁLOGO <br />
      <span className="text-trexx-red">{category}</span>
    </h1>
    <p className="text-white/50 text-lg">Próximamente disponible.</p>
  </div>
);

const ProductDetail = () => (
  <div className="pt-40 min-h-screen bg-[#050505] text-center text-white flex items-center justify-center">
    <h2 className="text-3xl font-bold">Detalle del Producto</h2>
  </div>
);

const NotFound = () => (
  <div className="pt-40 min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
    <h1 className="text-9xl font-black text-trexx-red italic tracking-tighter">
      404
    </h1>
    <p className="text-xl tracking-[0.5em] uppercase mt-4">
      Página no encontrada
    </p>
  </div>
);

function App() {
  // Estado para controlar el slider del Hero (si lo necesitas para otros efectos globales)
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-trexx-red selection:text-white flex flex-col">
        {/* --- NAVBAR GLOBAL (Fixed) --- */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* --- RUTA PRINCIPAL (LANDING PAGE) --- */}
            <Route
              path="/"
              element={
                <>
                  {/* 1. HERO SECTION */}
                  <div className="relative z-0">
                    <Hero current={currentSlide} setCurrent={setCurrentSlide} />
                  </div>

                  {/* 2. CINTA INFINITA (MARQUEE) */}
                  <div className="relative z-20">
                    <InfiniteMarquee />
                  </div>

                  {/* 3. SECCIONES DE CONTENIDO */}
                  <div className="relative z-10 bg-[#050505]">
                    {/* Productos Destacados (Elite Series) */}
                    <FeaturedProducts />

                    {/* Historia (ADN Argentino) */}
                    <AboutUs />

                    {/* Contacto (Formulario de Lujo) */}
                    <Contact />
                  </div>
                </>
              }
            />

            {/* --- RUTA DEL CARRITO --- */}
            <Route path="/carrito" element={<CartPage />} />

            {/* --- RUTAS DEL CATÁLOGO --- */}
            <Route path="/palas" element={<Shop category="PALAS PRO" />} />
            <Route path="/ropa" element={<Shop category="INDUMENTARIA" />} />
            <Route path="/ropa/hombre" element={<Shop category="HOMBRE" />} />
            <Route path="/ropa/mujer" element={<Shop category="MUJER" />} />
            <Route path="/zapatillas" element={<Shop category="CALZADO" />} />
            <Route
              path="/accesorios"
              element={<Shop category="ACCESORIOS" />}
            />

            {/* --- OTRAS RUTAS --- */}
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* --- FOOTER GLOBAL --- */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
