import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Monitor,
  Layout,
  CloudRain,
  UserCheck,
  Zap,
  LifeBuoy,
  Shield,
  Award,
  Users,
  Target,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    title: "Tecnología",
    subtitle: "Última generación",
    desc: "Hardware y software de vanguardia para rendimientos superiores en cualquier carga de trabajo.",
    icon: Cpu,
  },
  {
    title: "Alta Definición",
    subtitle: "Brillo ajustable",
    desc: "Calidad visual impecable con calibración de color profesional para máximo impacto.",
    icon: Monitor,
  },
  {
    title: "Versatilidad",
    subtitle: "Interior y exterior",
    desc: "Soluciones adaptables con certificación IP65 para resistir cualquier entorno adverso.",
    icon: Layout,
  },
  {
    title: "Resistencia",
    subtitle: "Climas extremos",
    desc: "Equipos diseñados con tecnología térmica avanzada para operar bajo sol intenso o lluvia.",
    icon: CloudRain,
  },
  {
    title: "Asesoría",
    subtitle: "Personalizada",
    desc: "Acompañamiento técnico desde la concepción hasta la puesta en marcha de tu visión.",
    icon: UserCheck,
  },
  {
    title: "Instalación",
    subtitle: "Rápida y garantizada",
    desc: "Procesos de montaje certificados que aseguran la integridad y rapidez del despliegue.",
    icon: Zap,
  },
  {
    title: "Soporte",
    subtitle: "Post-venta permanente",
    desc: "Mantenimiento preventivo y reactivo para que tu pantalla nunca deje de brillar.",
    icon: LifeBuoy,
  },
];

interface HexagonProps {
  benefit: any;
  index: number;
}

function HexagonItem({ benefit, index }: HexagonProps) {
  const Icon = benefit.icon;
  return (
    <div
      className={`hex-wrapper relative group w-[260px] h-[300px] sm:w-[300px] sm:h-[345px] md:w-[300px] md:h-[345px] flex-shrink-0`}
    >
      <div
        className="hex-content absolute inset-0 bg-brand-celeste border-transparent shadow-lg flex flex-col items-center justify-start pt-10 pb-8 px-6 sm:px-8 text-center md:bg-white md:border md:border-gray-100 transition-all duration-500 md:group-hover:bg-brand-celeste md:group-hover:text-white md:group-hover:border-transparent md:group-hover:-translate-y-3"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {/* Icono */}
        <div className="mb-3 text-white md:text-brand-celeste md:group-hover:text-white transition-all duration-500 transform md:group-hover:scale-110">
          <Icon size={36} strokeWidth={1.5} />
        </div>

        {/* Título y subtitulo */}
        <div className="space-y-1 mb-3 w-full text-center flex flex-col items-center">
          <h4 className="font-display font-black text-lg sm:text-xl leading-tight text-white md:text-brand-dark md:group-hover:text-white text-center">
            {benefit.title}
          </h4>
          <p className="text-[10px] uppercase tracking-wider font-bold text-white/80 md:text-brand-celeste md:group-hover:text-white/80 text-center">
            {benefit.subtitle}
          </p>
        </div>

        {/* Descripción - siempre visible en móvil, se muestra al pasar el mouse en desktop */}
        <div className="flex-1 flex items-center px-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 w-full justify-center">
          <p className="text-xs leading-relaxed font-light text-white/90 line-clamp-4 text-center">
            {benefit.desc}
          </p>
        </div>
      </div>

      <div
        className="absolute inset-0 -z-10 opacity-20 md:opacity-0 md:group-hover:opacity-30 blur-2xl bg-brand-celeste transition-all duration-700 scale-110"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />
    </div>
  );
}

export default function Nosotros() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.from(".hex-wrapper", {
        scrollTrigger: {
          trigger: ".hex-container",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.1,
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
      {/* SECCIÓN HERO - ALINEACIÓN IZQUIERDA */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-32 px-6 md:px-20 text-left led-grid">
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-br from-brand-celeste/5 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="reveal-text inline-block text-brand-celeste font-black text-[10px] tracking-widest uppercase">
                Visual Point
              </span>
              <h1 className="reveal-text text-4xl sm:text-6xl md:text-8xl font-display font-black text-brand-dark leading-[0.85] tracking-tighter">
                ¿Quiénes <br />
                <span className="text-brand-celeste">somos?</span>
              </h1>
            </div>

            <p className="reveal-text text-xl md:text-2xl text-brand-dark font-medium leading-normal max-w-xl text-justify">
              VisualPoint es una empresa especializada en la{" "}
              <span className="text-brand-celeste underline decoration-brand-celeste/30 underline-offset-8">
                venta, instalación y asesoría
              </span>{" "}
              de pantallas LED de alto impacto.
            </p>
          </div>

          <div className="reveal-text bg-white p-6 sm:p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-sm relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-celeste/20 rounded-l-[40px]" />
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed italic font-light text-justify">
              "Con años de experiencia en el rubro, ofrecemos soluciones
              modernas, eficientes y personalizadas para negocios que desean
              aumentar su visibilidad y destacar frente a la competencia."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-8 h-px bg-brand-celeste" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-dark italic">
                Excelencia en cada pixel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DIVISOR TÉCNICO */}
      <div className="tech-divider" />

      {/* SECCIÓN GRID HEXAGONAL */}
      <section className="py-24 bg-white overflow-hidden text-left">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
          <div className="mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-dark leading-none tracking-tighter">
              ¿Por qué <br />
              <span className="text-brand-celeste">elegirnos?</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary font-light max-w-xl text-justify">
              Nuestra ingeniería visual combina robustez de hardware con una
              experiencia de software intuitiva para resultados sin igual.
            </p>
            <div className="w-12 h-1 bg-brand-celeste" />
          </div>

          {/* Grid Hexagonal Optimizado */}
          <div className="hex-container flex flex-wrap justify-center gap-8 md:gap-12">
            {BENEFITS.map((b, i) => (
              <HexagonItem key={i} benefit={b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TECH DIVIDER */}
      <div className="tech-divider" />

      {/* SECCIÓN VALORES - ALINEACIÓN IZQUIERDA */}
      <section className="py-32 px-6 md:px-20 bg-[#FCFCFC]">
        <div className="max-w-7xl mx-auto mb-20 text-left">
          <h3 className="text-brand-celeste font-bold text-[10px] tracking-widest uppercase mb-4">
            Filosofía VisualPoint
          </h3>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">
            Nuestros Valores
          </h2>
          <div className="w-8 h-1 bg-brand-celeste mt-4" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 text-left">
          {[
            {
              icon: Shield,
              title: "Confianza",
              desc: "Respaldo absoluto en cada instalación.",
            },
            {
              icon: Award,
              title: "Excelencia",
              desc: "Calidad inmejorable en hardware y software.",
            },
            {
              icon: Users,
              title: "Colaboración",
              desc: "Trabajamos codo a codo con tu visión.",
            },
            {
              icon: Target,
              title: "Precisión",
              desc: "Cuidado milimétrico en cada proyecto.",
            },
          ].map((val, idx) => (
            <div key={idx} className="reveal-text group space-y-4 md:space-y-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-celeste md:bg-white border border-transparent md:border-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center text-white md:text-brand-celeste md:group-hover:bg-brand-celeste md:group-hover:text-white transition-all duration-500 shadow-sm">
                <val.icon
                  size={24}
                  strokeWidth={1.5}
                  className="md:w-7 md:h-7"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-base md:text-xl font-bold text-brand-dark uppercase tracking-wide">
                  {val.title}
                </h4>
                <p className="text-text-secondary leading-relaxed text-xs md:text-sm text-justify">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
