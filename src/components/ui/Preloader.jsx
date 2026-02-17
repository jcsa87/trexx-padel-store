import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulamos una carga (puedes ajustar la velocidad)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          // Damos un pequeño respiro antes de decirle a la App que terminó
          setTimeout(onComplete, 500);
          return 100;
        }
        // Incrementos aleatorios para que parezca real
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150); // Velocidad de actualización

    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Contenedor del Logo */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8">
        {/* Efecto de Pulso detrás del logo */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-trexx-red rounded-full blur-[50px] opacity-20"
        />

        <motion.img
          src="/images/logo.png"
          alt="Trexx Loading"
          className="w-full h-full object-contain relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Barra de Progreso Minimalista */}
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-trexx-red"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mt-4 font-bold">
        Cargando Tienda
      </p>
    </motion.div>
  );
};

export default Preloader;
