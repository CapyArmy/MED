import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Book Appointment", path: "/book-appointment" },
  { label: "Patient Portal", path: "/patient-portal" },
  { label: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center border-b border-[#E2E8F0] transition-shadow duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2C14 2 8 8 8 14C8 17.3137 10.6863 20 14 20C17.3137 20 20 17.3137 20 14C20 8 14 2 14 2Z"
              fill="#0D9488"
              fillOpacity="0.2"
            />
            <path
              d="M14 8V20M8 14H20"
              stroke="#0D9488"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="14" cy="14" r="11" stroke="#0D9488" strokeWidth="1.5" fill="none" />
          </svg>
          <div className="flex items-baseline gap-2">
            <span className="font-['Poppins'] font-bold text-xl text-[#0D9488]">
              MED+
            </span>
            <span className="font-['Poppins'] font-medium text-base text-[#4A5568]">
              Medical Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] transition-colors duration-200 pb-1 ${
                  isActive ? "text-[#1A202C]" : "text-[#4A5568] hover:text-[#1A202C]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D9488]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} className="text-[#1A202C]" /> : <Menu size={24} className="text-[#1A202C]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden border-b border-[#E2E8F0]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-3 font-['Inter'] text-sm font-medium uppercase tracking-[0.04em] ${
                        isActive ? "text-[#0D9488]" : "text-[#4A5568]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
