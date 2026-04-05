import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Megaphone,
  Building2,
  ShoppingBag,
  Presentation,
  Landmark,
  Store,
  Monitor,
  Maximize,
  Tablet,
  Settings,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
  {
    id: "outdoor",
    title: "Pantallas publicitarias LED Outdoor",
    desc: "Grandes formatos para avenidas, fachadas de edificios, rooftops o mobiliario urbano.",
    icon: Maximize,
  },
  {
    id: "indoor",
    title: "Pantallas LED Indoor",
    desc: "Perfectas para centros comerciales, ferias, tiendas y eventos corporativos.",
    icon: Monitor,
  },
  {
    id: "totems",
    title: "Tótems y paneles digitales interactivos",
    desc: "Ideales para puntos de venta, lobbies, campañas informativas y más.",
    icon: Tablet,
  },
  {
    id: "custom",
    title: "Pantallas personalizadas",
    desc: "Nos adaptamos a tu espacio, diseño y objetivos.",
    icon: Settings,
  },
];

const SECTORS = [
  {
    name: "Agencias de publicidad",
    desc: "Campañas urbanas de alto impacto y gestión remota de contenidos.",
    icon: Megaphone,
  },
  {
    name: "Centros comerciales",
    desc: "Señalización digital dinámica y experiencias inmersivas.",
    icon: Building2,
  },
  {
    name: "Marcas retail",
    desc: "Escaparatismo LED y pantallas de punto de venta premium.",
    icon: ShoppingBag,
  },
  {
    name: "Eventos corporativos",
    desc: "Montaje de pantallas de gran formato para lanzamientos.",
    icon: Presentation,
  },
  {
    name: "Instituciones públicas",
    desc: "Paneles informativos y señalética de emergencia.",
    icon: Landmark,
  },
  {
    name: "Negocios locales",
    desc: "Soluciones accesibles para aumentar el tráfico de clientes.",
    icon: Store,
  },
];

export default function Productos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".section-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Product cards reveal - Single robust animation
      gsap.fromTo(
        ".solution-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".solutions-grid",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white pb-20 overflow-hidden font-sans"
    >
      {/* HERO / HEADER SECTION - COMPACT THEME */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-20 bg-[#FCFCFC] text-brand-dark overflow-hidden led-grid">
        {/* Tech decorative patterns */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none -z-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-brand-celeste rounded-full border border-brand-celeste/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <span className="section-header inline-block text-brand-celeste font-black text-[12px] tracking-[0.4em] uppercase">
                Ecosistema Visual
              </span>
              <h1 className="section-header text-4xl sm:text-5xl md:text-8xl font-display font-black text-brand-dark leading-[0.9] tracking-tighter">
                Gama de <br />
                <span className="text-brand-celeste">soluciones LED</span>
              </h1>
            </div>

            <p className="section-header text-xl md:text-2xl text-brand-dark/70 leading-relaxed font-light">
              Ofrecemos una amplia gama de soluciones LED de alto impacto para
              potenciar la visibilidad de tu marca en cualquier entorno.
            </p>
            <div className="section-header w-12 h-1 bg-brand-celeste" />
          </div>
        </div>
      </section>

      {/* SOLUTIONS CATALOG */}
      <section className="py-24 px-6 md:px-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Main Grid: Staggered columns for dynamic interest */}
          <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {SOLUTIONS.map((item, idx) => (
              <div
                key={item.id}
                className={`solution-card group relative space-y-10 ${idx % 2 === 1 ? "md:mt-24" : ""}`}
              >
                {/* Background Editorial Index */}
                <span className="absolute -top-12 -left-4 text-9xl font-display font-black text-brand-dark/[0.03] select-none pointer-events-none group-hover:text-brand-celeste/[0.05] transition-colors duration-700">
                  0{idx + 1}
                </span>

                {/* Product Placeholder */}
                <div className="relative aspect-video bg-gray-50/50 backdrop-blur-sm rounded-[48px] border border-gray-100 overflow-hidden flex items-center justify-center transition-all duration-700 group-hover:border-brand-celeste/20 group-hover:shadow-[0_40px_80px_-20px_rgba(0,183,235,0.15)] group-hover:-translate-y-4">
                  {/* Glass Accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Subtle technical lines pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)",
                      backgroundSize: "50px 50px",
                    }}
                  />

                  {/* Icon with glowing core */}
                  <div className="relative z-10">
                    <div className="absolute inset-0 bg-brand-celeste/10 blur-2xl group-hover:bg-brand-celeste/30 transition-all duration-700 scale-150" />
                    <div className="relative text-brand-celeste/40 group-hover:text-brand-celeste transition-all duration-700 transform group-hover:scale-110">
                      <item.icon size={100} strokeWidth={0.5} />
                    </div>
                  </div>

                  {/* Precision Label */}
                  <div className="absolute bottom-10 left-10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-celeste animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/30 group-hover:text-brand-celeste transition-colors duration-500">
                      VP SOLUCIÓN: {item.id}
                    </span>
                  </div>
                </div>

                {/* Product Text Component */}
                <div className="space-y-6 px-4 sm:px-10">
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-display font-black text-brand-dark leading-tight group-hover:text-brand-celeste transition-colors duration-500">
                      {item.title}
                    </h3>
                    <div className="w-0 group-hover:w-16 h-1 bg-brand-celeste transition-all duration-700" />
                  </div>
                  <p className="text-lg text-text-secondary leading-relaxed font-light max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH DIVIDER */}
      <div className="tech-divider" />

      {/* SECTORES SECTION - COMPACT REDESIGN */}
      <section className="py-16 px-0 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-10">
          {/* Blue Header Banner */}
          <div className="relative bg-brand-dark rounded-3xl py-8 px-12 text-center overflow-hidden border-y-4 border-brand-celeste">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none tracking-tighter">
              Sectores que <br />
              <span className="text-brand-celeste">atendemos</span>
            </h2>
          </div>

          {/* Large Industry Image - Like Screenshot */}
          <div className="relative w-full aspect-[21/9] bg-gray-100 rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000"
              alt="Industria LED Impacto"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[3s]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Description Intro */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xl text-text-secondary leading-relaxed font-light">
              Desde retail hasta grandes infraestructuras públicas, adaptamos
              nuestra tecnología para responder a las exigencias críticas de
              cada industria.
            </p>
            <div className="w-12 h-1 bg-brand-celeste mx-auto" />
          </div>

          {/* Sectors Expanded Grid - STABLE RENDERING */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS.map((sector, idx) => (
              <div
                key={idx}
                className="card-hover group flex items-center gap-6 p-8 bg-gray-50/50 rounded-3xl border border-gray-100 hover:bg-white hover:border-brand-celeste/20 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-dark group-hover:bg-brand-celeste group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm border border-gray-100">
                  <sector.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <span className="block font-display font-bold text-lg text-brand-dark leading-none group-hover:text-brand-celeste transition-colors duration-300">
                    {sector.name}
                  </span>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60">
                    Solución Especializada
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
