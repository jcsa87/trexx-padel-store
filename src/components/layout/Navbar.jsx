import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, User, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// IMPORTAMOS LOS MODALES
// Asegúrate de que estos archivos existan en tu carpeta /auth
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import ForgotPasswordModal from "../auth/ForgotPasswordModal";

// ESTRUCTURA DEL MENÚ
// Si decidiste usar la "Single Page Shop" (recomendado), los paths llevan el hash (#)
const MENU_ITEMS = [
  { label: "PALAS", path: "/shop#palas" },
  {
    label: "ROPA",
    path: "/shop#ropa",
    submenu: [
      { label: "HOMBRE", path: "/shop#ropa-hombre" },
      { label: "MUJER", path: "/shop#ropa-mujer" },
    ],
  },
  { label: "ZAPATILLAS", path: "/shop#zapatillas" },
  { label: "ACCESORIOS", path: "/shop#accesorios" },
];

const Navbar = () => {
  // ESTADOS DE UI
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search Bar
  const [hoveredMenu, setHoveredMenu] = useState(null); // Desktop Dropdown
  const [isHidden, setIsHidden] = useState(false); // Hide on Scroll down
  const [isScrolled, setIsScrolled] = useState(false); // Background transparency

  // ESTADO DE AUTENTICACIÓN ('login' | 'register' | 'forgot-password' | null)
  const [authModal, setAuthModal] = useState(null);

  const searchInputRef = useRef(null);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Auto-focus al abrir el buscador
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  // Lógica de Scroll (Ocultar/Mostrar navbar)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setIsHidden(true);
    else setIsHidden(false);

    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);
  });

  const navVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: "-100%", opacity: 0 },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed w-full z-50 top-0 start-0 transition-colors duration-500 ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-6"
        }`}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 relative">
          {/* 1. LOGO */}
          <Link to="/" className="group flex items-center gap-1 z-50 mr-8">
            <motion.div
              whileHover={{ rotate: -5 }}
              className="w-10 h-10 bg-trexx-red skew-x-[-10deg] flex items-center justify-center mr-2 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              <span className="text-white font-black text-xl skew-x-[10deg] italic">
                T
              </span>
            </motion.div>
            <span className="self-center text-2xl font-black whitespace-nowrap tracking-tighter italic text-white hidden sm:block">
              TREXX<span className="text-trexx-red">PADEL</span>
            </span>
          </Link>

          {/* 2. ZONA CENTRAL: MENÚ vs BÚSQUEDA */}
          <div className="flex-1 flex justify-center md:justify-start pl-0 md:pl-8">
            <AnimatePresence mode="wait">
              {/* CASO A: BARRA DE BÚSQUEDA ACTIVADA */}
              {isSearchOpen ? (
                <motion.div
                  key="search-bar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-xl flex items-center gap-4"
                >
                  <div className="relative w-full group">
                    <Search
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-trexx-red"
                      size={18}
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Buscar palas, zapatillas..."
                      className="w-full bg-transparent border-b border-white/20 py-2 pl-8 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-trexx-red transition-all font-medium tracking-wide uppercase text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-white/50 hover:text-white transition-colors p-1"
                  >
                    <X size={24} />
                  </button>
                </motion.div>
              ) : (
                /* CASO B: MENÚ DE NAVEGACIÓN ESTÁNDAR */
                <motion.div
                  key="nav-menu"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:flex items-center gap-8 font-bold text-xs tracking-[0.15em]"
                >
                  {MENU_ITEMS.map((item) => (
                    <div
                      key={item.label}
                      className="relative group h-full py-2"
                      onMouseEnter={() => setHoveredMenu(item.label)}
                    >
                      <Link
                        to={item.path}
                        className="relative flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.label}
                        {item.submenu && (
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-300 ${
                              hoveredMenu === item.label
                                ? "rotate-180 text-trexx-red"
                                : ""
                            }`}
                          />
                        )}
                        {/* Línea roja animada */}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-trexx-red group-hover:w-full transition-all duration-300 ease-out"></span>
                      </Link>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {item.submenu && hoveredMenu === item.label && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 10,
                              clipPath: "inset(0% 0% 100% 0%)",
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              clipPath: "inset(0% 0% -20% 0%)",
                            }}
                            exit={{
                              opacity: 0,
                              y: 5,
                              clipPath: "inset(0% 0% 100% 0%)",
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-4 w-48 bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden"
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-trexx-red"></div>
                            <div className="flex flex-col py-2">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  to={subItem.path}
                                  className="px-6 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-[10px] tracking-[0.2em] font-bold block"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. ICONOS DE ACCIÓN */}
          <div className="flex items-center gap-5 text-white z-50 pl-4">
            {/* Lupa Trigger */}
            {!isSearchOpen && (
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                className="hover:text-trexx-red transition-colors hidden sm:block"
              >
                <Search size={20} strokeWidth={2} />
              </motion.button>
            )}

            {/* Login Trigger */}
            <motion.button
              onClick={() => setAuthModal("login")}
              whileHover={{ scale: 1.1 }}
              className="hover:text-trexx-red transition-colors hidden sm:block"
            >
              <User size={20} strokeWidth={2} />
            </motion.button>

            {/* Carrito */}
            <Link to="/carrito">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="relative hover:text-trexx-red transition-colors group"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                <span className="absolute -top-2 -right-2 bg-trexx-red text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform">
                  2
                </span>
              </motion.button>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-trexx-red transition-colors focus:outline-none ml-2"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* 4. MENÚ MÓVIL (Overlay) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 top-[70px] z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 p-8 md:hidden flex flex-col gap-8 shadow-2xl h-[calc(100vh-70px)] overflow-y-auto"
              >
                {MENU_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="w-full flex flex-col items-start border-b border-white/5 pb-4 last:border-0"
                  >
                    <Link
                      to={item.path}
                      onClick={() => !item.submenu && setIsOpen(false)}
                      className="text-3xl font-black italic tracking-tighter text-white hover:text-trexx-red transition-colors uppercase"
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="flex flex-col items-start gap-3 mt-3 pl-4 border-l border-white/20">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-gray-400 hover:text-white tracking-widest uppercase font-bold"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Botón Login en Móvil */}
                <div className="mt-auto pb-8 w-full">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setAuthModal("login");
                    }}
                    className="w-full py-4 border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3"
                  >
                    <User size={18} /> Iniciar Sesión
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Borde inferior animado ("Alive Border") */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.98, 1, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.nav>

      {/* --- GESTIÓN DE MODALES DE AUTENTICACIÓN --- */}
      <AnimatePresence>
        {authModal === "login" && (
          <LoginModal
            isOpen={true}
            onClose={() => setAuthModal(null)}
            onSwitchToRegister={() => setAuthModal("register")}
            onSwitchToForgot={() => setAuthModal("forgot-password")}
          />
        )}

        {authModal === "register" && (
          <RegisterModal
            isOpen={true}
            onClose={() => setAuthModal(null)}
            onSwitchToLogin={() => setAuthModal("login")}
          />
        )}

        {authModal === "forgot-password" && (
          <ForgotPasswordModal
            isOpen={true}
            onClose={() => setAuthModal(null)}
            onSwitchToLogin={() => setAuthModal("login")}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
