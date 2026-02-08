import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Wind,
} from "lucide-react";

const SLIDES = [
  {
    id: 1,
    brand: "TREXX",
    model: "DRAGON",
    tagline: "POTENCIA DE FUEGO",
    description:
      "Desata el caos en la pista. Balance alto y carbono 18K para rematadores que no negocian la fuerza.",
    specs: [
      { icon: <Zap size={16} />, label: "Potencia" }, // Acorté label para móvil
      { icon: <Shield size={16} />, label: "18K" },
      { icon: <Wind size={16} />, label: "Alto" },
    ],
    image:
      "https://images.unsplash.com/photo-1626246366036-248d2b99371d?q=80&w=800&auto=format&fit=crop",
    color: "#dc2626",
    bgGradient: "from-red-900/40 via-black to-black",
  },
  {
    id: 2,
    brand: "TREXX",
    model: "CONTROL",
    tagline: "PRECISIÓN TOTAL",
    description:
      "Domina cada ángulo. Punto dulce ampliado y goma soft para una defensa impenetrable.",
    specs: [
      { icon: <Zap size={16} />, label: "Control" },
      { icon: <Shield size={16} />, label: "12K" },
      { icon: <Wind size={16} />, label: "Medio" },
    ],
    image:
      "https://images.unsplash.com/photo-1629250005510-911cb34d1685?q=80&w=800&auto=format&fit=crop",
    color: "#06b6d4",
    bgGradient: "from-cyan-900/40 via-black to-black",
  },
];

const Hero = ({ current, setCurrent }) => {
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, [setCurrent]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    // CAMBIO: min-h-[100dvh] ayuda en móbiles con la barra de navegación del navegador
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505] flex items-center">
      {/* FONDO RUIDO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={SLIDES[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Luces de fondo */}
          <div
            className={`absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l ${SLIDES[current].bgGradient} opacity-60 blur-3xl`}
          />
          <div
            className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] md:blur-[120px] opacity-40"
            style={{ backgroundColor: SLIDES[current].color }}
          />
        </motion.div>
      </AnimatePresence>

      {/* CAMBIO: Padding top mas grande en movil (pt-32) y padding bottom para controles (pb-24) */}
      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center relative z-10 pt-32 pb-24 lg:py-0">
        <AnimatePresence mode="wait">
          <div
            key={SLIDES[current].id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center h-full relative"
          >
            {/* --- COLUMNA TEXTO --- */}
            {/* CAMBIO: order-1 en móvil para que el texto salga primero */}
            <div className="relative z-50 order-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex w-fit items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 mb-4 lg:mb-6 rounded-full backdrop-blur-sm"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: SLIDES[current].color }}
                ></span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                  New Collection 2026
                </span>
              </motion.div>

              <div className="mb-4 lg:mb-6 relative">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-lg md:text-2xl font-bold tracking-[0.5em] italic opacity-50 mb-[-5px] pl-1"
                >
                  {SLIDES[current].brand}
                </motion.h2>

                {/* CAMBIO: Tamaños de fuente responsivos (text-5xl en movil -> text-100px en desktop) */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl sm:text-7xl lg:text-[100px] font-black italic tracking-tighter text-white leading-[0.9] whitespace-nowrap relative z-50"
                >
                  {SLIDES[current].model}
                  <span
                    className="text-transparent bg-clip-text block md:inline"
                    style={{
                      backgroundImage: `linear-gradient(to right, white, ${SLIDES[current].color})`,
                    }}
                  >
                    {SLIDES[current].suffix}
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-trexx-red font-bold text-sm md:text-lg tracking-widest uppercase mb-4"
                style={{ color: SLIDES[current].color }}
              >
                {SLIDES[current].tagline}
              </motion.p>

              {/* CAMBIO: Ocultamos descripción larga en pantallas muy pequeñas o reducimos fuente */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/60 text-sm md:text-lg max-w-md leading-relaxed mb-6 lg:mb-8 border-l-2 pl-4 line-clamp-3 md:line-clamp-none"
                style={{ borderColor: `${SLIDES[current].color}40` }}
              >
                {SLIDES[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-2 md:gap-3 mb-8 lg:mb-10"
              >
                {SLIDES[current].specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 md:px-4 rounded-sm hover:border-white/30 transition-colors"
                  >
                    <span style={{ color: SLIDES[current].color }}>
                      {spec.icon}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="w-full md:w-fit group relative px-8 py-4 bg-transparent border overflow-hidden"
                style={{ borderColor: SLIDES[current].color }}
              >
                <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-full transition-all duration-500 ease-out" />
                <span className="relative flex items-center justify-center gap-3 text-white font-black italic tracking-widest uppercase text-sm md:text-base">
                  Comprar Ahora <ArrowRight size={18} />
                </span>
              </motion.button>
            </div>

            {/* --- COLUMNA IMAGEN --- */}
            {/* CAMBIO: Order-2 para que vaya debajo del texto en móvil. Altura controlada. */}
            <div className="relative z-10 order-2 lg:order-2 flex justify-center items-center h-[300px] lg:h-auto mt-[-50px] lg:mt-0 pointer-events-none lg:pointer-events-auto">
              {/* Texto gigante de fondo (oculto en móvil para limpiar la vista) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute select-none pointer-events-none z-[-1] hidden lg:block"
              >
                <h1
                  className="text-[200px] font-black italic text-transparent opacity-10 leading-none tracking-tighter"
                  style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
                >
                  {SLIDES[current].model}
                </h1>
              </motion.div>

              <motion.img
                key={SLIDES[current].image}
                initial={{ opacity: 0, y: 30, rotate: 5, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  filter: `drop-shadow(0 0 40px ${SLIDES[current].color}50)`,
                }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                // CAMBIO: Imagen más pequeña en móvil (w-[220px])
                className="relative z-10 w-[220px] md:w-[450px] lg:w-[500px] object-contain drop-shadow-2xl"
                src={SLIDES[current].image}
                alt={SLIDES[current].model}
                style={{
                  animation: "float 6s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </AnimatePresence>

        {/* --- CONTROLES --- */}
        <div className="absolute bottom-6 md:bottom-10 right-6 md:right-0 flex items-center gap-6 z-40 bg-black/20 backdrop-blur-sm p-2 rounded-lg lg:bg-transparent lg:p-0">
          <div className="flex items-end gap-2 text-white font-mono">
            <span className="text-xl md:text-2xl font-bold">
              0{current + 1}
            </span>
            <span className="text-xs md:text-sm text-white/40 mb-1">
              / 0{SLIDES.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 md:p-3 border border-white/10 hover:bg-white/10 text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 md:p-3 border border-white/10 hover:bg-white/10 text-white transition-colors"
              style={{ borderColor: SLIDES[current].color }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
