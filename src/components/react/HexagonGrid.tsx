import { useEffect, useRef } from "react";
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

interface HexagonItemProps {
  benefit: (typeof BENEFITS)[0];
  index: number;
}

function HexagonItem({ benefit, index }: HexagonItemProps) {
  const Icon = benefit.icon;

  return (
    <div className="hex-wrapper relative group w-[260px] h-[300px] sm:w-[300px] sm:h-[345px] md:w-[300px] md:h-[345px] flex-shrink-0">
      <div
        className="hex-content absolute inset-0 bg-brand-celeste border-transparent shadow-lg flex flex-col items-center justify-start pt-10 pb-8 px-6 sm:px-8 text-center md:bg-white md:border md:border-gray-100 transition-all duration-500 md:group-hover:bg-brand-celeste md:group-hover:text-white md:group-hover:border-transparent md:group-hover:-translate-y-3"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div className="mb-3 text-white md:text-brand-celeste md:group-hover:text-white transition-all duration-500 transform md:group-hover:scale-110">
          <Icon size={36} strokeWidth={1.5} />
        </div>

        <div className="space-y-1 mb-3 w-full text-center flex flex-col items-center">
          <h4 className="font-display font-black text-lg sm:text-xl leading-tight text-white md:text-brand-dark md:group-hover:text-white text-center">
            {benefit.title}
          </h4>
          <p className="text-[10px] uppercase tracking-wider font-bold text-white/80 md:text-brand-celeste md:group-hover:text-white/80 text-center">
            {benefit.subtitle}
          </p>
        </div>

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

export default function HexagonGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".hex-wrapper", {
        scrollTrigger: {
          trigger: containerRef.current,
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
    <section
      ref={containerRef}
      className="py-24 bg-white overflow-hidden text-left"
    >
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

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {BENEFITS.map((b, i) => (
            <HexagonItem key={i} benefit={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
