import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Monitor, Cpu, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Nexus Mall Experience",
    location: "Lima, Perú",
    specs: "P2.5 Outdoor | 120m²",
    img: "/proj1.jpg",
  },
  {
    id: 2,
    title: "Holographic Corporate Hall",
    location: "Santiago, Chile",
    specs: "Transparent LED | Interactive",
    img: "/proj2.jpg",
  },
  {
    id: 3,
    title: "Fintech Hub Display",
    location: "Quito, Ecuador",
    specs: "P1.2 Indoor | UHD",
    img: "/proj3.jpg",
  },
  {
    id: 4,
    title: "Industrial Control Center",
    location: "Bogotá, Colombia",
    specs: "Curved LED Wall | 24/7",
    img: "/proj1.jpg",
  },
  {
    id: 5,
    title: "Eco-Smart City Totem",
    location: "Lima, Perú",
    specs: "Solar Powered | Resilient",
    img: "/proj2.jpg",
  },
  {
    id: 6,
    title: "Luxury Retail Showcase",
    location: "Cusco, Perú",
    specs: "Flexible LED | Custom Shape",
    img: "/proj3.jpg",
  },
];

export default function Proyectos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from(".reveal-hero", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Projects reveal - Scroll stagger
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#FCFCFC] overflow-hidden pb-20 md:pb-40 font-sans"
    >
      {/* SECTION HERO */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-6 md:px-20 led-grid">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 reveal-hero">
              <div className="w-8 h-[1px] bg-brand-celeste" />
              <span className="text-brand-celeste font-black text-[10px] tracking-[0.4em] uppercase">
                Visual Impact
              </span>
            </div>
            <h1 className="reveal-hero text-4xl sm:text-5xl md:text-8xl font-display font-black text-brand-dark leading-[0.9] tracking-tighter">
              Portafolio de <br />
              <span className="text-brand-celeste">ingeniería visual</span>
            </h1>
          </div>
          <p className="reveal-hero text-xl md:text-2xl text-text-secondary leading-relaxed font-light max-w-2xl">
            Explora cómo hemos transformado espacios críticos en experiencias
            digitales de alto impacto mediante soluciones LED personalizadas.
          </p>
        </div>
      </section>

      {/* TECH DIVIDER */}
      <div className="tech-divider" />

      {/* PROJECTS GALLERY */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className={`project-card group relative space-y-8 ${idx % 2 === 1 ? "md:mt-32" : ""}`}
              >
                {/* Image Component with Layered Overlays */}
                <div className="img-zoom relative aspect-[4/5] md:aspect-[3/4] bg-gray-100 rounded-[48px] overflow-hidden shadow-2xl hover:shadow-[0_40px_80px_rgba(0,40,86,0.2)] transition-all duration-700">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle technical gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                  {/* Dynamic Corner Accents */}
                  <div className="absolute top-10 left-10 w-10 h-10 border-t-2 border-l-2 border-brand-celeste opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
                  <div className="absolute bottom-10 right-10 w-10 h-10 border-b-2 border-r-2 border-brand-celeste opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />

                  {/* Project Summary Reveal */}
                  <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end text-white">
                    <div className="space-y-6 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                      <div className="flex items-center gap-2 text-brand-celeste font-bold text-xs tracking-widest uppercase">
                        <MapPin size={14} /> {project.location}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-display font-black leading-none tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <Cpu size={14} />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                            {project.specs}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-celeste hover:border-brand-celeste transition-all cursor-pointer">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Metadata Label (Editorial Style) */}
                <div className="absolute -right-8 top-12 hidden xl:block origin-left -rotate-90">
                  <p className="text-[10px] text-brand-dark/20 uppercase tracking-[0.6em] font-black">
                    VP CASE STUDY • NO {project.id}
                  </p>
                </div>

                {/* Brief description that shows without hover for context */}
                <div className="flex justify-between items-start pt-4 border-t border-gray-100/50">
                  <span className="text-brand-dark/30 font-bold text-[10px] uppercase tracking-widest italic font-display">
                    Ingeniería / Ejecución
                  </span>
                  <div className="w-12 h-1 bg-brand-celeste/20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL TECH FOOTER ACCENT */}
      <div className="tech-divider" />
      <section className="py-20 px-6 text-center led-grid opacity-30">
        <p className="text-[10px] font-black text-brand-dark/20 uppercase tracking-[1em]">
          Ingeniería • Impacto • Visión
        </p>
      </section>
    </div>
  );
}
