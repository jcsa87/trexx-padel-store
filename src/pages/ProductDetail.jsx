import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

import { PRODUCTS_DB } from "../data/products";

// --- VARIANTES DE ANIMACIÓN ---
// Contenedor para orquestar la entrada secuencial (stagger)
const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Retraso entre cada elemento
      delayChildren: 0.2,
    },
  },
};

// Animación de cada línea de texto: Sutil y Profesional
const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9], // Curva suave (ease-out)
    },
  },
};

const ProductDetail = () => {
  const { id } = useParams();

  const product = useMemo(() => {
    return PRODUCTS_DB.find((p) => p.id === parseInt(id));
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [shippingResult, setShippingResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product) {
      setMainImage(product.img);
      setQuantity(1);
      setSelectedSize(null);
      setShippingResult(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <AlertCircle size={48} className="text-trexx-red mb-4" />
        <h2 className="text-2xl font-bold uppercase tracking-widest">
          Producto no encontrado
        </h2>
        <Link
          to="/shop"
          className="mt-6 px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase text-xs font-bold tracking-widest"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  const calculateShipping = (e) => {
    e.preventDefault();
    if (zipCode.length < 4) return;
    setIsCalculating(true);
    setShippingResult(null);
    setTimeout(() => {
      setIsCalculating(false);
      const isLocal = zipCode.startsWith("1");
      setShippingResult({
        price: isLocal ? 4500 : 8900,
        days: isLocal ? "24-48hs" : "3-5 días hábiles",
        provider: "Andreani",
      });
    }, 1500);
  };

  const handleQuantity = (type) => {
    if (type === "minus" && quantity > 1) setQuantity(quantity - 1);
    if (type === "plus" && quantity < 10) setQuantity(quantity + 1);
  };

  const isApparel =
    product.category === "ropa" || product.category === "zapatillas";
  const features = product.features || [
    "Calidad Profesional",
    "Garantía Oficial",
    "Envío Asegurado",
  ];
  const description =
    product.description ||
    `El modelo ${product.name} está diseñado para ofrecer el máximo rendimiento en la pista. Fabricado con materiales de primera calidad para asegurar durabilidad y confort durante el juego.`;
  const displayGender =
    product.gender && product.gender.toLowerCase() !== "unisex"
      ? ` / ${product.gender}`
      : "";

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20 px-4 md:px-8 overflow-hidden">
      {/* BREADCRUMBS (Entrada suave simple) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-[1200px] mx-auto mb-8 flex items-center gap-2 text-[10px] md:text-xs text-white/40 font-mono uppercase tracking-widest overflow-hidden whitespace-nowrap"
      >
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-white transition-colors">
          Shop
        </Link>
        <ChevronRight size={10} />
        <span className="text-trexx-red font-bold truncate">
          {product.name}
        </span>
      </motion.div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* --- COLUMNA IZQUIERDA: IMAGEN (Estática y Limpia) --- */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // Entrada muy sutil
            className="relative aspect-[4/5] w-full bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden flex items-center justify-center group"
          >
            {/* Glow estático muy sutil */}
            <div
              className="absolute inset-0 opacity-10 blur-[100px]"
              style={{ backgroundColor: product.color || "#333" }}
            />

            {/* IMAGEN SIN MOVIMIENTO PERPETUO */}
            <div className="relative z-10 w-[90%] h-[90%] flex items-center justify-center">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" // Solo zoom al hover
              />
            </div>

            {/* Badge de Stock (Estático) */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-[#111] text-white/80 text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest border border-white/10 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Stock Disponible
              </div>
            </div>
          </motion.div>

          {/* Miniaturas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide justify-center lg:justify-start"
          >
            {[product.img, product.img, product.img].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 bg-[#0a0a0a] border flex-shrink-0 p-2 transition-all ${
                  mainImage === img && idx === 0
                    ? "border-trexx-red opacity-100"
                    : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain"
                  alt={`Vista ${idx}`}
                />
              </button>
            ))}
          </motion.div>
        </div>

        {/* --- COLUMNA DERECHA: INFO (Animaciones Profesionales) --- */}
        <motion.div
          className="flex flex-col h-full"
          variants={contentContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Categoría */}
          <motion.span
            variants={textItemVariants}
            className="text-trexx-red font-bold text-xs tracking-[0.2em] uppercase mb-3 block"
          >
            {product.category}
            {displayGender}
          </motion.span>

          {/* Título */}
          <motion.h1
            variants={textItemVariants}
            className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9] mb-6"
          >
            {product.name}
          </motion.h1>

          {/* Precio */}
          <motion.div
            variants={textItemVariants}
            className="flex flex-wrap items-center gap-6 mb-8 border-b border-white/10 pb-8"
          >
            <span className="text-4xl font-mono text-white font-bold tracking-tighter">
              ${product.price.toLocaleString()}
            </span>
            <div className="flex flex-col border-l border-white/10 pl-6">
              <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1 w-fit">
                Ahora 12
              </span>
              <span className="text-xs text-white/50">
                6 cuotas de ${(product.price / 6).toFixed(0)}
              </span>
            </div>
          </motion.div>

          {/* Descripción */}
          <motion.p
            variants={textItemVariants}
            className="text-white/70 text-sm md:text-base leading-relaxed mb-8"
          >
            {description}
          </motion.p>

          {/* SELECTOR DE TALLE */}
          {isApparel && (
            <motion.div variants={textItemVariants} className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-widest">
                  Seleccionar Talle
                </span>
                <button className="text-[10px] text-white/40 underline hover:text-white transition-colors">
                  Ver guía
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-[45px] px-3 flex items-center justify-center border text-sm font-bold transition-all ${
                      selectedSize === size
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        : "bg-transparent text-white/50 border-white/20 hover:border-white hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ACCIONES DE COMPRA */}
          <motion.div
            variants={textItemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {/* Contador */}
            <div className="flex items-center border border-white/20 h-14 w-full sm:w-auto bg-[#0a0a0a]">
              <button
                onClick={() => handleQuantity("minus")}
                className="w-12 h-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-white font-mono font-bold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantity("plus")}
                className="w-12 h-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Botón Añadir (Con interacción suave) */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#b91c1c" }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-trexx-red h-14 flex items-center justify-center gap-3 text-white font-black italic uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              <ShoppingBag size={20} className="mb-1" />
              <span>Añadir al Carrito</span>
            </motion.button>
          </motion.div>

          {/* CALCULADORA DE ENVÍO */}
          <motion.div
            variants={textItemVariants}
            className="bg-[#0f0f0f] border border-white/5 p-6 rounded-sm mb-8"
          >
            <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
              <Truck size={16} className="text-trexx-red" /> Calcular Costo de
              Envío
            </h3>

            <form onSubmit={calculateShipping} className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Tu Código Postal"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="bg-black border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-trexx-red font-mono text-sm placeholder:text-white/20 transition-colors"
              />
              <button
                type="submit"
                disabled={isCalculating}
                className="bg-white text-black font-bold uppercase text-xs px-6 tracking-wider hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isCalculating ? "..." : "Calcular"}
              </button>
            </form>

            <AnimatePresence>
              {shippingResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/5 p-4 rounded border border-white/10 overflow-hidden"
                >
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-white font-bold uppercase">
                          {shippingResult.provider}
                        </span>
                      </div>
                      <span className="text-white/50 text-xs pl-4">
                        Llega en {shippingResult.days}
                      </span>
                    </div>
                    <span className="text-trexx-red font-bold font-mono text-lg">
                      ${shippingResult.price}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CARACTERÍSTICAS TÉCNICAS */}
          <motion.div variants={textItemVariants} className="space-y-4">
            <div className="border border-white/10 p-5 bg-white/[0.02]">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                <Star size={14} className="text-trexx-red" /> Especificaciones
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-white/70 text-sm flex items-start gap-3"
                  >
                    <div className="mt-1.5 min-w-[4px] h-[4px] bg-trexx-red rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sellos de Confianza */}
            <div className="flex flex-wrap gap-6 text-[10px] text-white/40 uppercase tracking-wider font-bold pt-2">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-help">
                <ShieldCheck size={14} /> Garantía de fábrica
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-help">
                <RotateCcw size={14} /> 30 Días de Cambio
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
