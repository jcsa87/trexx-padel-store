import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// --- BASE DE DATOS DE PRODUCTOS ---
const ALL_PRODUCTS = {
  palas: [
    {
      id: 1,
      name: "TREXX RAPTOR",
      price: "365.900",
      img: "/shop/palas/raptor.png",
      color: "#06b6d4",
    },
    {
      id: 2,
      name: "TREXX DRAGON",
      price: "365.900",
      img: "/shop/palas/dragon.png",
      color: "#dc2626",
    },
    {
      id: 3,
      name: "TREXX GOLD PRO",
      price: "354.800",
      img: "/shop/palas/gold.png",
      color: "#fbbf24",
    },
    {
      id: 4,
      name: "MONSTER 05",
      price: "333.000",
      img: "/shop/palas/monster.png",
      color: "#84cc16",
    },
  ],
  ropaHombre: [
    {
      id: 5,
      name: "REMERA TECH MALE",
      price: "45.000",
      img: "/shop/ropa-hombre/remera-h.png",
    },
    {
      id: 6,
      name: "SHORT PRO LINE",
      price: "38.500",
      img: "/shop/ropa-hombre/short-h.png",
    },
    {
      id: 7,
      name: "BUZO TREXX WARM",
      price: "85.000",
      img: "/shop/ropa-hombre/buzo-h.png",
    },
    {
      id: 8,
      name: "CHOMBA MATCH",
      price: "48.000",
      img: "/shop/ropa-hombre/chomba-h.png",
    },
  ],
  ropaMujer: [
    {
      id: 9,
      name: "TANK TOP PRO",
      price: "35.000",
      img: "/shop/ropa-mujer/tank-m.png",
    },
    {
      id: 10,
      name: "SKIRT DYNAMIC",
      price: "42.000",
      img: "/shop/ropa-mujer/pollera-m.png",
    },
    {
      id: 11,
      name: "CALZA CORTA",
      price: "32.000",
      img: "/shop/ropa-mujer/calza-m.png",
    },
    {
      id: 12,
      name: "VESTIDO COURT",
      price: "65.000",
      img: "/shop/ropa-mujer/vestido-m.png",
    },
  ],
  zapatillas: [
    {
      id: 17,
      name: "AERO SPEED 2.0",
      price: "125.000",
      img: "/shop/zapatillas/zap1.png",
    },
    {
      id: 18,
      name: "COURT STABILITY",
      price: "118.000",
      img: "/shop/zapatillas/zap2.png",
    },
    {
      id: 19,
      name: "TREXX CLAY MASTER",
      price: "132.000",
      img: "/shop/zapatillas/zap3.png",
    },
    {
      id: 20,
      name: "LITE MOTION",
      price: "98.000",
      img: "/shop/zapatillas/zap4.png",
    },
  ],
  accesorios: [
    {
      id: 13,
      name: "MUÑEQUERAS XL",
      price: "12.000",
      img: "/shop/accesorios/munuquera.png",
    },
    {
      id: 14,
      name: "GRIP TREXX SENSITIVE",
      price: "8.500",
      img: "/shop/accesorios/grip.png",
    },
    {
      id: 15,
      name: "GORRA VISERA",
      price: "25.000",
      img: "/shop/accesorios/gorra.png",
    },
    {
      id: 16,
      name: "MEDIAS TÉCNICAS",
      price: "9.000",
      img: "/shop/accesorios/medias.png",
    },
  ],
};

const Shop = () => {
  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20 px-4 md:px-6 overflow-hidden">
      {/* TÍTULO PRINCIPAL (Restaurado a la versión simple con degradado rojo) */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-20 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-none md:leading-tight"
        >
          Equipamiento <br />
          {/* Degradado minimalista de rojo a rojo oscuro */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-trexx-red to-red-900">
            Profesional.
          </span>
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* SECCIÓN: PALAS (Abierta por defecto) */}
        <CollapsibleSection
          title="Palas"
          id="palas"
          products={ALL_PRODUCTS.palas}
          defaultOpen={true}
        />

        {/* SECCIÓN: ROPA HOMBRE */}
        <CollapsibleSection
          title="Indumentaria Hombre"
          id="ropa-hombre"
          products={ALL_PRODUCTS.ropaHombre}
        />

        {/* SECCIÓN: ROPA MUJER */}
        <CollapsibleSection
          title="Indumentaria Mujer"
          id="ropa-mujer"
          products={ALL_PRODUCTS.ropaMujer}
        />

        {/* SECCIÓN: ZAPATILLAS */}
        <CollapsibleSection
          title="Zapatillas"
          id="zapatillas"
          products={ALL_PRODUCTS.zapatillas}
        />

        {/* SECCIÓN: ACCESORIOS */}
        <CollapsibleSection
          title="Accesorios"
          id="accesorios"
          products={ALL_PRODUCTS.accesorios}
        />
      </div>
    </div>
  );
};

// --- COMPONENTE DE SECCIÓN COLAPSABLE (ACORDEÓN) ---
const CollapsibleSection = ({ title, id, products, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { hash } = useLocation();

  // EFECTO INTELIGENTE PARA SCROLL
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "").replace("/", "-");
      if (targetId === id) {
        setIsOpen(true);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, [hash, id]);

  return (
    <section
      id={id}
      className="border-b border-white/10 last:border-0 pb-6 scroll-mt-32"
    >
      {/* BOTÓN / HEADER (Clickable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group py-4 md:py-6 focus:outline-none"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black italic text-white uppercase tracking-wider transition-colors group-hover:text-trexx-red text-left">
            {title}
          </h2>
          {/* (Sin contador de items) */}
        </div>

        {/* Icono Animado (+ / -) */}
        <div className="relative w-8 h-8 md:w-10 md:h-10 border border-white/20 rounded-full flex items-center justify-center text-white transition-colors group-hover:border-trexx-red group-hover:bg-trexx-red group-hover:text-white">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </motion.div>
        </div>
      </button>

      {/* CONTENIDO DESPLEGABLE */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: 20 },
              collapsed: { opacity: 0, height: 0, marginTop: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 pb-8">
              {products.map((p, index) => (
                <ProductCard key={p.id} item={p} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- TARJETA DE PRODUCTO ---
const ProductCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    whileHover={{ y: -5 }}
    className="group cursor-pointer flex flex-col h-full bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300"
  >
    {/* Contenedor Imagen */}
    <div className="relative aspect-[4/5] overflow-hidden p-6 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <img
        src={item.img}
        alt={item.name}
        className="relative z-10 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {item.color && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-[40px] transition-opacity duration-500"
          style={{ backgroundColor: item.color }}
        ></div>
      )}
    </div>

    {/* Info Producto */}
    <div className="p-4 mt-auto border-t border-white/5">
      <h3 className="text-white font-bold text-xs sm:text-sm tracking-widest uppercase truncate">
        {item.name}
      </h3>
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-400 font-mono text-base sm:text-lg group-hover:text-white transition-colors">
          ${item.price}
        </p>
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Plus size={12} />
        </div>
      </div>

      {/* Etiquetas Solo Desktop (para limpiar mobile) */}
      <div className="hidden md:flex mt-3 items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] text-white/40 font-bold uppercase tracking-wider">
        <span>6 Cuotas</span>
      </div>
    </div>
  </motion.div>
);

export default Shop;
