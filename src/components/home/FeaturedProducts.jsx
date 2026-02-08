import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Zap, Shield, BarChart3, ArrowRight } from "lucide-react";

const FEATURED_PADELS = [
  {
    id: 1,
    name: "RAPTOR",
    tagline: "CONTROL TOTAL",
    price: "340.000",
    image: "/images/raptor.png", // Asegúrate que esta ruta sea correcta
    color: "#06b6d4",
    specs: ["Carbono 12K", "Goma Soft", "Balance Medio"],
    desc: "Para el estratega que domina los tiempos.",
  },
  {
    id: 2,
    name: "DRAGON",
    tagline: "POTENCIA PURA",
    price: "380.000",
    image: "/images/dragon.png",
    color: "#dc2626",
    specs: ["Carbono 18K", "Goma Hard", "Balance Alto"],
    desc: "Diseñada para finalizar con violencia.",
  },
  {
    id: 3,
    name: "MONSTER 05",
    tagline: "HÍBRIDO LETAL",
    price: "360.000",
    image: "/images/monster.png",
    color: "#84cc16",
    specs: ["Kevlar Mix", "Goma Hybrid", "Balance Medio"],
    desc: "La evolución de la especie. Adaptabilidad total.",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-[#050505] relative overflow-hidden">
      {/* Fondo Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-white/5 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 border-b border-white/10 pb-8 gap-6">
          <div>
            <span className="text-trexx-red font-bold tracking-[0.3em] text-xs uppercase mb-2 block">
              COLECCIÓN 2026
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white">
              ELITE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                SERIES
              </span>
            </h2>
          </div>

          <Link
            to="/palas"
            className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors pb-2"
          >
            <span className="text-xs font-bold tracking-widest uppercase">
              Ver Catálogo Completo
            </span>
            <div className="p-2 border border-white/20 rounded-full group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURED_PADELS.map((pala, index) => (
            <WhiteCard key={pala.id} product={pala} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE DE TARJETA ---
const WhiteCard = ({ product, index }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil para desactivar hover logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D Tilt Logic (Solo Desktop)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 15.5;
    const mouseY = (e.clientY - rect.top) * 15.5;
    const rX = (mouseY / height - 15.5 / 2) * -1;
    const rY = mouseX / width - 15.5 / 2;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  // Variants de animación (Adaptadas para móvil: siempre visible)
  const transitionSmooth = { duration: 0.5, ease: [0.25, 1, 0.5, 1] };

  return (
    <motion.div
      ref={ref}
      initial="rest"
      whileHover={!isMobile ? "hover" : "rest"} // Desactiva hover en móvil
      animate={isMobile ? "mobile" : "rest"} // Estado especial para móvil
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.1 },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      style={{
        transformStyle: "preserve-3d",
        transform: isMobile ? "none" : transform,
      }}
      className="group relative h-[500px] md:h-[620px] w-full bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors duration-500 flex flex-col overflow-hidden cursor-pointer rounded-sm"
    >
      {/* LUZ DE FONDO (Glow) */}
      <motion.div
        variants={{
          rest: { opacity: 0.2 },
          hover: { opacity: 0.5 },
          mobile: { opacity: 0.3 }, // Un poco más visible por defecto en móvil
        }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full blur-[60px] md:blur-[80px] pointer-events-none"
        style={{ backgroundColor: product.color }}
      />

      {/* CONTENEDOR DE IMAGEN */}
      <motion.div
        className="relative w-full p-6 md:p-8 flex justify-center items-center z-10 mt-8 md:mt-12"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        variants={{
          rest: { y: 0 },
          hover: { y: -50 },
          mobile: { y: -20 }, // Sube un poco fijo en móvil
        }}
        transition={transitionSmooth}
      >
        <motion.div
          className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] bg-white shadow-2xl overflow-hidden flex items-center justify-center rounded-sm"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 },
            mobile: { scale: 1 },
          }}
          transition={transitionSmooth}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-[90%] h-[90%] object-contain mix-blend-multiply"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.15 },
              mobile: { scale: 1.05 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
        </motion.div>
      </motion.div>

      {/* INFORMACIÓN */}
      <div
        className="relative z-20 px-6 md:px-8 pb-24 md:pb-28 flex flex-col justify-end h-full"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Título y Tagline */}
        <motion.div
          className="relative mb-2"
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
            mobile: { y: -5 },
          }}
          transition={transitionSmooth}
        >
          <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
            {product.name}
          </h3>
          <span
            className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase block mt-2"
            style={{ color: product.color }}
          >
            {product.tagline}
          </span>
        </motion.div>

        {/* --- DETALLES (Visible parcial en móvil) --- */}
        <motion.div
          variants={{
            rest: { height: 0, opacity: 0 },
            hover: { height: "auto", opacity: 1 },
            mobile: { height: "auto", opacity: 1 }, // Siempre visible en móvil
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="text-white/60 text-xs leading-relaxed py-2 line-clamp-2 md:line-clamp-2">
            {product.desc}
          </p>

          <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 mt-2 pb-1">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {i === 0 && <Shield size={12} className="text-white/40 mb-1" />}
                {i === 1 && <Zap size={12} className="text-white/40 mb-1" />}
                {i === 2 && (
                  <BarChart3 size={12} className="text-white/40 mb-1" />
                )}
                <span className="text-[6px] md:text-[7px] text-white/70 font-bold uppercase tracking-wide">
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FOOTER (PRECIO Y BOTÓN) */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-center justify-between z-30 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
        <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-tight">
          ${product.price}
        </span>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <ArrowUpRight size={18} />
        </motion.button>
      </div>

      {/* Borde Neón (Visible sutil en móvil, full en hover desktop) */}
      <motion.div
        className="absolute inset-0 border-2 pointer-events-none"
        style={{ borderColor: product.color }}
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
          mobile: { opacity: 0.5 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FeaturedProducts;
