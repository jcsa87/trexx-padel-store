import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, User, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// IMPORTAMOS LOS MODALES
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import ForgotPasswordModal from "../auth/ForgotPasswordModal";

// ESTRUCTURA DEL MENÚ
const MENU_ITEMS = [
  { label: "PALAS", path: "/palas" },
  {
    label: "ROPA",
    path: "/ropa",
    submenu: [
      { label: "HOMBRE", path: "/ropa/hombre" },
      { label: "MUJER", path: "/ropa/mujer" },
    ],
  },
  { label: "ZAPATILLAS", path: "/zapatillas" },
  { label: "ACCESORIOS", path: "/accesorios" },
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
          isScrolled ? "bg-trexx-bg/95 backdrop-blur-md" : "bg-transparent"
        }`}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 relative">
          {/* 1. LOGO */}
          <Link to="/" className="group flex items-center gap-1 z-50 mr-8">
            <motion.div
              whileHover={{ rotate: -5 }}
              className="w-8 h-8 bg-trexx-red skew-x-[-10deg] flex items-center justify-center mr-2"
            >
              <span className="text-white font-black text-xs skew-x-[10deg]">
                T
              </span>
            </motion.div>
            <span className="self-center text-2xl font-black whitespace-nowrap tracking-tighter italic text-white hidden sm:block">
              TREXX<span className="text-trexx-red">PADEL</span>
            </span>
          </Link>

          {/* 2. ZONA CENTRAL: MENÚ vs BÚSQUEDA */}
          <div className="flex-1 flex justify-center md:justify-start">
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
                      className="w-full bg-transparent border-b border-white/20 py-2 pl-8 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-trexx-red transition-all font-medium tracking-wide"
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
                  className="hidden md:flex items-center gap-8 font-medium text-xs tracking-[0.2em]"
                >
                  {MENU_ITEMS.map((item, index) => (
                    <div
                      key={item.label}
                      className="relative group h-full"
                      onMouseEnter={() => setHoveredMenu(item.label)}
                    >
                      <Link
                        to={item.path}
                        className="relative block py-2 flex items-center gap-1"
                      >
                        {/* Animación de brillo "Breathing" */}
                        <motion.span
                          className="block text-white group-hover:text-trexx-red transition-colors duration-300"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{
                            duration: 3 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {item.label}
                        </motion.span>
                        {item.submenu && (
                          <ChevronDown
                            size={10}
                            className={`text-trexx-red transition-transform duration-300 ${hoveredMenu === item.label ? "rotate-180" : ""}`}
                          />
                        )}
                      </Link>

                      {/* Línea roja inferior (Hover) */}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-trexx-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>

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
                            className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                          >
                            <div className="flex flex-col py-2">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  to={subItem.path}
                                  className="px-6 py-3 text-white hover:text-trexx-red hover:bg-white/5 transition-all text-[10px] tracking-[0.2em] font-bold"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-trexx-red"></div>
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
          <div className="flex items-center gap-6 text-white z-50 pl-4">
            {/* Lupa (Oculta si ya estamos buscando) */}
            {!isSearchOpen && (
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                className="hover:text-trexx-red transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </motion.button>
            )}

            {/* Login Trigger */}
            <motion.button
              onClick={() => setAuthModal("login")}
              whileHover={{ scale: 1.1 }}
              className="hover:text-trexx-red transition-colors hidden sm:block"
            >
              <User size={20} strokeWidth={1.5} />
            </motion.button>

            {/* Carrito */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="relative hover:text-trexx-red transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-trexx-red text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </motion.button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-trexx-red transition-colors focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* 4. MENÚ MÓVIL (Overlay) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 w-full bg-trexx-bg/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl"
              >
                {MENU_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="w-full flex flex-col items-center"
                  >
                    <Link
                      to={item.path}
                      onClick={() => !item.submenu && setIsOpen(false)}
                      className="text-2xl font-black italic tracking-tighter text-white hover:text-trexx-red transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="flex flex-col items-center gap-3 mt-3 mb-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-gray-400 hover:text-white tracking-widest uppercase"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {/* Botón Login en Móvil */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-white/10 w-full justify-center">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setAuthModal("login");
                    }}
                    className="flex items-center gap-2 text-white hover:text-trexx-red text-xs tracking-widest uppercase"
                  >
                    <User size={16} /> Login
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
