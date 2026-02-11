import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Search,
  ChevronDown,
  Filter,
} from "lucide-react";
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

// ESTRUCTURA DEL MENÚ: Usamos Query Params (?category=)
const MENU_ITEMS = [
  { label: "TODO", path: "/shop?category=all" }, // Opción para ver todo
  { label: "PALAS", path: "/shop?category=palas" },
  {
    label: "INDUMENTARIA",
    path: "/shop?category=ropa", // Categoría padre
    submenu: [
      { label: "HOMBRE", path: "/shop?category=ropaHombre" },
      { label: "MUJER", path: "/shop?category=ropaMujer" },
    ],
  },
  { label: "ZAPATILLAS", path: "/shop?category=zapatillas" },
  { label: "ACCESORIOS", path: "/shop?category=accesorios" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hooks de Router
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  const location = useLocation();
  const navigate = useNavigate();

  const searchInputRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

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

  // Función para determinar si un link está activo
  const isActive = (path) => {
    if (location.pathname !== "/shop") return false;
    const pathCategory = new URLSearchParams(path.split("?")[1]).get(
      "category",
    );
    // Caso especial para ropa padre
    if (
      pathCategory === "ropa" &&
      (currentCategory === "ropaHombre" || currentCategory === "ropaMujer")
    )
      return true;
    return currentCategory === pathCategory;
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed w-full z-50 top-0 start-0 transition-all duration-500 ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-6"
        }`}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 relative">
          {/* LOGO */}
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

          {/* MENÚ DE FILTROS (DESKTOP) */}
          <div className="flex-1 flex justify-center pl-0 md:pl-8">
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div
                  key="search-bar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
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
                      placeholder="Buscar producto..."
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
                <motion.div
                  key="nav-menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                        className={`relative flex items-center gap-1 transition-colors ${
                          isActive(item.path)
                            ? "text-trexx-red"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                        {item.submenu && (
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-300 ${hoveredMenu === item.label ? "rotate-180 text-trexx-red" : ""}`}
                          />
                        )}
                        {/* Línea indicadora activa */}
                        {isActive(item.path) && (
                          <motion.span
                            layoutId="activeNav"
                            className="absolute -bottom-1 left-0 w-full h-[2px] bg-trexx-red"
                          />
                        )}
                      </Link>

                      {/* Dropdown */}
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
                                  className={`px-6 py-3 transition-all text-[10px] tracking-[0.2em] font-bold block ${
                                    isActive(subItem.path)
                                      ? "text-white bg-white/10"
                                      : "text-gray-400 hover:text-white hover:bg-white/5"
                                  }`}
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

          {/* ICONOS */}
          <div className="flex items-center gap-5 text-white z-50 pl-4">
            {!isSearchOpen && (
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                className="hover:text-trexx-red transition-colors hidden sm:block"
              >
                <Search size={20} strokeWidth={2} />
              </motion.button>
            )}
            <Link to="/carrito">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="relative hover:text-trexx-red transition-colors group"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                <span className="absolute -top-2 -right-2 bg-trexx-red text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                  2
                </span>
              </motion.button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-trexx-red transition-colors ml-2"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* MENÚ MÓVIL */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 top-[70px] z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 p-8 md:hidden flex flex-col gap-8 h-[calc(100vh-70px)] overflow-y-auto"
              >
                {MENU_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="w-full flex flex-col border-b border-white/5 pb-4 last:border-0"
                  >
                    <Link
                      to={item.path}
                      onClick={() => !item.submenu && setIsOpen(false)}
                      className={`text-3xl font-black italic tracking-tighter transition-colors uppercase ${isActive(item.path) ? "text-trexx-red" : "text-white hover:text-trexx-red"}`}
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="flex flex-col gap-3 mt-3 pl-4 border-l border-white/20">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-sm tracking-widest uppercase font-bold ${isActive(sub.path) ? "text-white" : "text-gray-400"}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
