import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cn } from "./lib/utils";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Productos", path: "/productos" },
  { name: "Proyectos", path: "/proyectos" },
  { name: "Contacto", path: "/contacto" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis (Smooth Scroll) - Pro Configuration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  // Scroll Listener for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Page Transition Logic
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (location.pathname === path) {
      lenisRef.current?.scrollTo(0, { lerp: 0.1 });
      return;
    }
    e.preventDefault();

    setIsTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => {
        navigate(path);
        lenisRef.current?.scrollTo(0, { immediate: true });
        setIsMenuOpen(false);
      },
    });

    tl.to(overlayRef.current, {
      x: "0%",
      duration: 0.6,
      ease: "power4.inOut",
    });
  };

  useEffect(() => {
    // Fade out overlay on new page
    gsap.to(overlayRef.current, {
      x: "100%",
      duration: 0.8,
      ease: "power4.out",
      onComplete: () => {
        setIsTransitioning(false);
        // Reset position for next transition
        gsap.set(overlayRef.current, { x: "-100%" });
      },
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[10000]">
        <div 
          className="h-full bg-gradient-to-r from-brand-celeste to-brand-dark transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Page Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#1a3a5c] z-[9999] pointer-events-none transform -translate-x-full flex items-center justify-center"
      >
        <img src="/vp-logo-icono.png" alt="VP" className="w-40 h-auto opacity-60 animate-pulse object-contain" />
      </div>

      {/* Navbar */}
      <nav
        className={cn(
          "fixed transition-all duration-700 ease-in-out z-50",
          isScrolled
            ? "top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-80 h-20 bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 rounded-full px-8 flex items-center justify-between"
            : "top-0 left-0 w-full h-32 bg-transparent border-none px-6 sm:px-16 flex items-center",
        )}
      >
        {/* Scrolled State Logic */}
        {isScrolled ? (
          <>
            {/* Left: Logo Icon (Moved significantly more left) */}
            <Link
              to="/"
              onClick={(e) => handleNavigation(e, "/")}
              className="flex-shrink-0 -ml-4"
            >
              <img
                src="/vp-logo-icono.png"
                alt="VP"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Center: "Inicio" Link (Replaces "Menú") */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                to="/"
                onClick={(e) => handleNavigation(e, "/")}
                className="text-brand-celeste text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
              >
                Inicio
              </Link>
            </div>

            {/* Right: Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-brand-celeste transition-colors flex-shrink-0 -mr-1"
            >
              <Menu size={26} />
            </button>
          </>
        ) : (
          /* Initial State Logic */
          <div className="w-full h-full flex justify-between items-center">
            {/* Logo moved more to the left by reducing parent padding or adding negative margin */}
            <Link
              to="/"
              onClick={(e) => handleNavigation(e, "/")}
              className="flex items-center -ml-2"
            >
              <img
                src="/vp-logo.png"
                alt="VisualPoint"
                className="h-20 object-contain"
              />
            </Link>

            <div className="hidden lg:flex space-x-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavigation(e, link.path)}
                  className={cn(
                    "nav-link relative py-1 text-sm font-bold uppercase tracking-widest transition-colors duration-300 hover:text-brand-celeste text-brand-dark/80",
                    location.pathname === link.path && "text-brand-celeste active",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-brand-dark"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "fixed top-28 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 origin-top z-[60]",
          isMenuOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none",
        )}
      >
        <div className="p-5 space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-accent px-3">
            Explorar
          </p>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => {
                handleNavigation(e, link.path);
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-6 group p-4 rounded-[24px] hover:bg-brand-gray-light transition-all active:scale-95"
            >
              <span className="text-[10px] font-black text-brand-celeste/40 font-accent group-hover:text-brand-celeste transition-colors">
                0{i + 1}
              </span>
              <span
                className={cn(
                  "text-2xl font-display font-black tracking-tighter transition-colors",
                  location.pathname === link.path
                    ? "text-brand-celeste"
                    : "text-brand-dark group-hover:text-brand-celeste",
                )}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full">{children}</main>

      {/* WhatsApp Support FAB */}
      <a
        href="https://wa.me/51995119509"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[100] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] active:scale-90 transition-all duration-300 group"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-full mr-4 bg-white text-brand-dark px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-xl pointer-events-none border border-gray-100 font-accent">
          ¿En qué podemos ayudarte?
        </span>
      </a>

      {/* Footer */}
      <footer className="bg-white text-brand-dark pt-16 md:pt-32 pb-8 md:pb-16 border-t border-gray-100 w-full px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
            {/* Column 1: Logo & Vision */}
            <div className="lg:col-span-4 space-y-8">
              <img
                src="/vp-logo.png"
                alt="VisualPoint"
                className="h-24 object-contain"
              />
              <p className="text-gray-400 text-sm leading-relaxed font-light font-accent tracking-wide">
                Líderes en ingeniería visual y soluciones de visualización
                digital de alto impacto en todo el Perú.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lg:col-span-4 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-dark/20 font-accent">
                Navegación
              </h4>
              <ul className="grid grid-cols-2 gap-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={(e) => handleNavigation(e, link.path)}
                      className="text-brand-dark hover:text-brand-celeste transition-colors text-xs font-black uppercase tracking-widest font-accent"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="lg:col-span-4 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-dark/20 font-accent">
                Contacto Directo
              </h4>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <p className="text-[10px] uppercase font-black tracking-widest text-brand-celeste mb-1">
                    Email
                  </p>
                  <p className="text-base md:text-xl font-display font-black text-brand-dark group-hover:text-brand-celeste transition-colors break-all">
                    gerencia.moussac@gmail.com
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-[10px] uppercase font-black tracking-widest text-brand-celeste mb-1 font-accent">
                    Región
                  </p>
                  <p className="text-xl font-display font-black text-brand-dark">
                    Lima, Perú
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-50 mt-10 md:mt-24 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.5em] font-black text-gray-300 w-full space-y-6 md:space-y-0">
            <p>© 2026 Visual Point Engineering • All Rights Reserved</p>
            <div className="flex space-x-10">
              <a
                href="#"
                className="hover:text-brand-dark transition-colors font-accent tracking-widest"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="hover:text-brand-dark transition-colors font-accent tracking-widest"
              >
                Términos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
