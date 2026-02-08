import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hammer, Factory, Plane, Award } from "lucide-react";

// --- DATOS (Sin cambios) ---
const HISTORY_STEPS = [
  {
    year: "1992",
    title: "El Taller en Zona Sur",
    description:
      "Mientras el país vivía la fiebre del pádel, nosotros abríamos un pequeño galpón en Lanús. Cortábamos la goma a mano y prensábamos madera. Sin marketing, solo 'boca a boca' de los jugadores de club.",
  },
  {
    year: "2001",
    title: "Resiliencia Industrial",
    description:
      "En la peor crisis de nuestra historia, decidimos no cerrar. Mientras las grandes marcas se iban, Trexx invirtió en matrices de carbono. Apostamos a la industria nacional cuando nadie lo hacía.",
  },
  {
    year: "2026",
    title: "Clase Mundial",
    description:
      "Hoy, esa misma fábrica exporta a 15 países. La 'Garra Argentina' ya no es solo una actitud, es una ingeniería patentada que usan los número 1 del ranking.",
  },
];

const AboutUs = () => {
  const containerRef = useRef(null);

  // Parallax para la imagen principal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Configuración de animación de entrada
  const animProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <section
      ref={containerRef}
      // Aumenté un poco el padding vertical para dar más aire a la máscara
      className="relative py-40 bg-[#050505] overflow-hidden"
    >
      {/* --- FONDO ATMOSFÉRICO DINÁMICO --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* 1. Luz Celeste Viajera (INTENSIDAD AUMENTADA) */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1.1],
            opacity: [0.2, 0.4, 0.2], // Opacidad aumentada para más intensidad central
            x: [0, -100, 50],
            y: [0, 50, -30],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#75AADB] rounded-full blur-[160px]"
        />

        {/* 2. Luz Dorada Viajera (INTENSIDAD AUMENTADA) */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1.2],
            opacity: [0.1, 0.3, 0.15], // Opacidad aumentada
            x: [0, 120, -40],
            y: [0, -80, 40],
            rotate: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#FFB900] rounded-full blur-[180px]"
        />

        {/* 3. Estela de Luz Diagonal 1 (Más brillante) */}
        <motion.div
          className="absolute h-[2px] w-[1000px] bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left" // via-white/20
          style={{ top: "30%", left: "-50%", rotate: "-15deg" }}
          animate={{ x: ["0%", "200%"], opacity: [0, 1, 0] }} // Opacidad máxima 1
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* 4. Estela de Luz Diagonal 2 (Más brillante) */}
        <motion.div
          className="absolute h-[3px] w-[1200px] bg-gradient-to-r from-transparent via-[#75AADB]/30 to-transparent origin-left" // via-blue/30
          style={{ bottom: "20%", right: "-50%", rotate: "10deg" }}
          animate={{ x: ["0%", "-200%"], opacity: [0, 0.8, 0] }} // Opacidad máxima 0.8
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />

        {/* 5. Textura de Ruido (Noise) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>

        {/* --- NUEVO: MÁSCARA DE GRADIENTE AGRESIVA (Hard Vignette) --- */}
        {/* Esto fuerza el negro sólido en los extremos superior e inferior */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to bottom, #050505 0%, #050505 15%, transparent 35%, transparent 65%, #050505 85%, #050505 100%)",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-30">
        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* TEXTO */}
          <motion.div {...animProps}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[#75AADB]"></span>
              <span className="text-[#75AADB] font-bold tracking-[0.3em] text-xs uppercase">
                ADN ARGENTINO
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-6 leading-[0.9]">
              NACIDOS EN EL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                20x10.
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-md border-l-2 border-[#75AADB]/30 pl-6">
              Llevamos 32 años fabricando palas. Hemos visto pasar todas las
              modas, todos los materiales y todos los gobiernos. Lo único que
              nunca cambió es nuestra obsesión por el control absoluto.
            </p>
          </motion.div>

          {/* IMAGEN PARALLAX CON BADGE */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-sm group shadow-2xl shadow-blue-900/10">
            <motion.div
              style={{ y: yParallax }}
              className="absolute inset-0 w-full h-[120%]"
            >
              <img
                src="/images/fabrica.jpeg"
                alt="Fábrica Trexx"
                className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

            {/* Badge Flotante "1992" */}
            <motion.div
              {...animProps}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-1">
                <Award className="text-[#75AADB]" size={28} />
                <span className="text-white font-black text-3xl italic tracking-tighter">
                  1992
                </span>
              </div>
              <div className="flex items-center justify-end gap-2 text-white/90 text-[10px] tracking-[0.2em] uppercase border-t border-white/10 pt-2 mt-2">
                {/* Bandera Argentina Minimalista SVG */}
                <svg viewBox="0 0 30 20" className="w-5 h-auto opacity-90">
                  <rect width="30" height="20" fill="#75AADB" />
                  <rect y="7" width="30" height="6" fill="white" />
                  <circle cx="15" cy="10" r="2" fill="#FFB900" />
                </svg>
                Industria Argentina
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- TIMELINE (Replay on Scroll) --- */}
        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {HISTORY_STEPS.map((step, index) => (
            <TimelineItem key={step.year} step={step} index={index} />
          ))}
        </div>

        {/* --- VALORES (Replay on Scroll) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 border-t border-white/10 pt-16">
          <PhilosophyCard
            icon={<Factory size={32} />}
            title="FABRICACIÓN PROPIA"
            text="Diseñamos, moldeamos y acabamos cada pala en nuestra planta de Buenos Aires."
            delay={0.1}
          />
          <PhilosophyCard
            icon={<Hammer size={32} />}
            title="ARTESANAL"
            text="La tecnología pone la precisión, pero el 'toque' final lo da un operario con décadas de oficio revisando el balance."
            delay={0.2}
          />
          <PhilosophyCard
            icon={<Plane size={32} />}
            title="EXPORTACIÓN"
            text="Competimos de igual a igual en el mercado europeo. Calidad de exportación con corazón local."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTES AUXILIARES (Sin cambios) ---
const TimelineItem = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative pl-8 md:pl-16 py-12 md:py-16 border-b border-white/5 last:border-0"
    >
      <span className="absolute left-[-5px] top-16 md:top-20 w-2.5 h-2.5 bg-[#75AADB] rounded-full ring-4 ring-[#050505] group-hover:scale-150 transition-transform duration-300 shadow-[0_0_15px_rgba(117,170,219,0.5)]"></span>

      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
        <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent group-hover:from-[#75AADB]/30 group-hover:to-transparent transition-colors duration-500 italic">
          {step.year}
        </span>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#75AADB] transition-colors">
            {step.title}
          </h3>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed font-light">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const PhilosophyCard = ({ icon, title, text, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5 }}
      className="bg-[#0a0a0a] p-8 border border-white/5 hover:border-[#75AADB]/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-[#75AADB]/5"
    >
      <div className="text-white/40 group-hover:text-[#75AADB] transition-colors mb-6 transform group-hover:scale-110 duration-300">
        {icon}
      </div>
      <h4 className="text-white font-bold tracking-widest text-lg mb-4">
        {title}
      </h4>
      <p className="text-white/40 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
};

export default AboutUs;
