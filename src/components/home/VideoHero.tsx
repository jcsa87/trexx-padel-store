import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowDown, Zap, ChevronRight, ChevronLeft } from "lucide-react";

// --- DATOS ---
const HERO_SLIDES = [
  {
    id: 1,
    badge: "New Season 2026",
    title: (
      <>
        DOMINA <br />
        <motion.span
          className="text-transparent bg-clip-text inline-block pb-2"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff, #6b7280, #ffffff)",
            backgroundSize: "200% auto",
          }}
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          LA PISTA.
        </motion.span>
      </>
    ),
    description:
      "La evolución del pádel llegó. Potencia y control en cada golpe.",
    videoSrc: "/videos/trexx-gameplay.mp4",
    themeColor: "#dc2626",
    overlayInfo: {
      label: "Live Action",
      title: "Elite Performance",
    },
  },
  {
    id: 2,
    badge: "Footwear Collection",
    title: (
      <>
        TREXX <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 pb-2">
          PRO COURT.
        </span>
      </>
    ),
    description:
      "Agarre extremo y ligereza. Disponibles en versiones blanco y negro para dominar el desplazamiento.",
    videoSrc: "/videos/shoes-presentation.mp4",
    themeColor: "#06b6d4",
    overlayInfo: {
      label: "New Arrival",
      title: "Pro Court Series",
    },
  },
];

// --- VARIANTES ---
const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
};

const videoContainerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "circOut", delay: 0.1 },
  },
  exit: { opacity: 0, scale: 0.9, y: -30, transition: { duration: 0.5 } },
};

const VideoHero = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const nextSlide = () => {
    setProgress(0);
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[current];

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[105vh] w-full bg-[#050505] overflow-hidden flex items-center pt-32 pb-32 lg:py-0 z-10"
    >
      {/* --- 1. FONDO AVANZADO CON MOVIMIENTO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grilla Cibernética con Desplazamiento Constante */}
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70"
        ></motion.div>

        {/* Partículas Flotantes Rápidas */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -200], // Suben más rápido
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Orbes Pulsantes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [1, 1.2, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] mix-blend-screen"
            style={{ backgroundColor: `${activeSlide.themeColor}30` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- COLUMNA TEXTO --- */}
          <motion.div
            style={{ y: yContent, opacity: opacityHero }}
            className="flex flex-col justify-center order-1 relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textVariants}
                className="w-full"
              >
                <div className="flex items-center gap-3 mb-6 border border-white/10 w-fit px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
                  <Zap
                    size={12}
                    style={{
                      fill: activeSlide.themeColor,
                      color: activeSlide.themeColor,
                    }}
                  />
                  <span className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">
                    {activeSlide.badge}
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic text-white tracking-tighter leading-[0.9] mb-6">
                  {activeSlide.title}
                </h1>

                <p
                  className="text-white/60 text-base md:text-xl leading-relaxed max-w-md border-l-2 pl-6 mb-10 transition-colors duration-500"
                  style={{ borderColor: `${activeSlide.themeColor}80` }}
                >
                  {activeSlide.description}
                  <span className="text-white font-bold block mt-2">
                    ¿Estás listo?
                  </span>
                </p>

                <div className="flex flex-wrap gap-6 items-center">
                  <button
                    onClick={() => {
                      const nextSection =
                        document.getElementById("product-hero");
                      nextSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group relative px-8 py-4 bg-white text-black font-black italic tracking-widest uppercase overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow duration-300"
                  >
                    <div
                      className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300 ease-out"
                      style={{ backgroundColor: activeSlide.themeColor }}
                    />
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                      Ver Colección <ArrowDown size={18} />
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-16">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white hover:scale-110 active:scale-95 duration-200"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${current === idx ? "w-12" : "w-2 bg-white/20 hover:bg-white/40"}`}
                    style={{
                      backgroundColor:
                        current === idx ? activeSlide.themeColor : "",
                    }}
                    onClick={() => {
                      setProgress(0);
                      setCurrent(idx);
                    }}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white hover:scale-110 active:scale-95 duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* --- COLUMNA VIDEO (Levitación y Movimiento) --- */}
          <motion.div className="relative order-2 flex justify-center lg:justify-end lg:pr-8 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={videoContainerVariants}
                className="relative flex flex-col items-center"
              >
                {/* ANIMACIÓN DE LEVITACIÓN PERPETUA */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  {/* Marco del Video (Tamaño Revertido a Estándar) */}
                  <div className="relative w-[280px] md:w-[340px] aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                    <video
                      ref={videoRef}
                      src={activeSlide.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={nextSlide}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20 opacity-80 pointer-events-none"></div>

                    {/* UI Video */}
                    <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{
                                backgroundColor: activeSlide.themeColor,
                              }}
                            ></span>
                            <p className="text-white/80 font-bold text-[10px] tracking-widest uppercase">
                              {activeSlide.overlayInfo.label}
                            </p>
                          </div>
                          <h3 className="text-white font-black italic text-xl uppercase leading-none">
                            {activeSlide.overlayInfo.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Efecto de Borde Brillante (Scanning) */}
                    <div className="absolute inset-0 rounded-2xl border border-white/5 overflow-hidden pointer-events-none">
                      <motion.div
                        className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-transparent via-white/10 to-transparent"
                        animate={{ top: ["-100%", "200%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 1,
                        }}
                      />
                    </div>
                  </div>

                  {/* Barra de Progreso */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full h-1 bg-white/10 mt-6 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: activeSlide.themeColor,
                      }}
                      transition={{ ease: "linear", duration: 0.1 }}
                    />
                  </motion.div>
                </motion.div>

                {/* Elementos Decorativos Flotantes Detrás (Más movimiento) */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -z-10 top-20 -right-4 w-32 h-32 border rounded-full backdrop-blur-sm"
                  style={{
                    borderColor: `${activeSlide.themeColor}40`,
                    backgroundColor: `${activeSlide.themeColor}10`,
                  }}
                />
                <motion.div
                  animate={{
                    y: [0, 25, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -z-10 bottom-10 -left-6 w-20 h-20 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Fade Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-30 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 z-40"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default VideoHero;
