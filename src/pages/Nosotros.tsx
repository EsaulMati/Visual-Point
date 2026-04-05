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
      className={`hex-wrapper relative group w-[260px] h-[300px] sm:w-[300px] sm:h-[345px] md:w-[320px] md:h-[368px] flex-shrink-0`}
    >
      <div
        className="hex-content absolute inset-0 bg-white border border-gray-100 shadow-lg flex flex-col items-center justify-center p-5 sm:p-8 md:p-10 text-center transition-all duration-500 group-hover:bg-brand-celeste group-hover:text-white group-hover:border-transparent group-hover:-translate-y-4"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div className="mb-3 sm:mb-6 text-brand-celeste group-hover:text-white transition-all duration-500 transform group-hover:scale-125">
          <Icon size={52} strokeWidth={1} />
        </div>

        <div className="space-y-2 transition-all duration-300 group-hover:translate-y-[-10px]">
          <h4 className="font-display font-black text-lg sm:text-2xl leading-tight group-hover:text-white">
            {benefit.title}
          </h4>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-celeste group-hover:text-white/80">
            {benefit.subtitle}
          </p>
        </div>

        <div className="absolute inset-x-8 bottom-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <p className="text-sm leading-relaxed font-light text-white/90">
            {benefit.desc}
          </p>
        </div>
      </div>

      <div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-30 blur-[40px] bg-brand-celeste transition-all duration-700 scale-110"
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
      {/* HERO SECTION - SPLIT PROFESIONAL (ALINEADA IZQUIERDA) */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-32 px-6 md:px-20 text-left led-grid">
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-br from-brand-celeste/5 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="reveal-text inline-block text-brand-celeste font-black text-[10px] tracking-[0.4em] uppercase">
                Visual Point
              </span>
              <h1 className="reveal-text text-4xl sm:text-6xl md:text-8xl font-display font-black text-brand-dark leading-[0.85] tracking-tighter">
                ¿Quiénes <br />
                <span className="text-brand-celeste">somos?</span>
              </h1>
            </div>

            <p className="reveal-text text-xl md:text-2xl text-brand-dark font-medium leading-normal max-w-xl">
              VisualPoint es una empresa especializada en la{" "}
              <span className="text-brand-celeste underline decoration-brand-celeste/30 underline-offset-8">
                venta, instalación y asesoría
              </span>{" "}
              de pantallas LED de alto impacto.
            </p>
          </div>

          <div className="reveal-text bg-white p-6 sm:p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-sm relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-celeste/20 rounded-l-[40px]" />
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed italic font-light">
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

      {/* TECH DIVIDER */}
      <div className="tech-divider" />

      {/* HEXAGON GRID SECTION */}
      <section className="py-24 bg-white overflow-hidden text-left">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
          <div className="mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-dark leading-none tracking-tighter">
              ¿Por qué <br />
              <span className="text-brand-celeste">elegirnos?</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary font-light max-w-xl">
              Nuestra ingeniería visual combina robustez de hardware con una
              experiencia de software intuitiva para resultados sin igual.
            </p>
            <div className="w-12 h-1 bg-brand-celeste" />
          </div>

          {/* Optimized Honeycomb Grid */}
          <div className="hex-container flex flex-wrap justify-center gap-x-12 md:gap-x-[-20px] gap-y-12">
            {BENEFITS.slice(0, 4).map((b, i) => (
              <HexagonItem key={i} benefit={b} index={i} />
            ))}
            <div className="w-full h-0 md:h-12 hidden md:block" />
            <div className="flex flex-wrap justify-center gap-x-12 md:translate-x-[0px] mt-2 sm:mt-[-40px]">
              {BENEFITS.slice(4).map((b, i) => (
                <HexagonItem key={i + 4} benefit={b} index={i + 4} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH DIVIDER */}
      <div className="tech-divider" />

      {/* VALORES SECTION - ALINEADA IZQUIERDA */}
      <section className="py-32 px-6 md:px-20 bg-[#FCFCFC]">
        <div className="max-w-7xl mx-auto mb-20 text-left">
          <h3 className="text-brand-celeste font-bold text-[10px] tracking-[0.4em] uppercase mb-4">
            Filosofía VisualPoint
          </h3>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">
            Nuestros Valores
          </h2>
          <div className="w-8 h-1 bg-brand-celeste mt-4" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
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
            <div key={idx} className="reveal-text group space-y-6">
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-brand-celeste group-hover:bg-brand-celeste group-hover:text-white transition-all duration-500 shadow-sm">
                <val.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-brand-dark uppercase tracking-wide">
                  {val.title}
                </h4>
                <p className="text-text-secondary leading-relaxed text-sm">
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
