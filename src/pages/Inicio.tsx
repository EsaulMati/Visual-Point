import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

// ── Content Configuration ────────────────────────────────────────
const HOME_DATA = {
  hero: {
    title: "Diseñando el",
    titleAccent: "mañana digital",
    subtitle:
      "Soluciones visuales inteligentes que impulsan la próxima generación de innovación tecnológica.",
    ctaPrimary: { text: "Conocer más", link: "/nosotros" },
    ctaSecondary: { text: "Ver proyectos", link: "/proyectos" },
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-and-dots-in-blue-23265-large.mp4",
    centerTextLabel: "Tecnología visual de alto impacto",
    centerTextMain: "Transformamos espacios con pantallas LED de ",
    centerTextAccent: "máxima definición.",
  },
  stats: {
    label: "Resultados que hablan",
    title: "Números que nos definen.",
    items: [
      { value: "1,000+", desc: "Clientes satisfechos" },
      { value: "99%", desc: "Nos recomiendan" },
      { value: "15+", desc: "Regiones del Perú" },
      { value: "100+", desc: "Colaboradores" },
    ],
  },
};

const BRANDS = [
  {
    name: "Brand 1",
    logo: "https://cdn.worldvectorlogo.com/logos/google-2015.svg",
  },
  {
    name: "Brand 2",
    logo: "https://cdn.worldvectorlogo.com/logos/apple-13.svg",
  },
  {
    name: "Brand 3",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
  },
  {
    name: "Brand 4",
    logo: "https://cdn.worldvectorlogo.com/logos/amazon-2.svg",
  },
  { name: "Brand 5", logo: "https://cdn.worldvectorlogo.com/logos/meta-7.svg" },
  {
    name: "Brand 6",
    logo: "https://cdn.worldvectorlogo.com/logos/tesla-9.svg",
  },
];

// ── 4 columns × 5 images each ──────────────────────────────────
const COL1 = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=400",
];
const COL2 = [
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
];
const COL3 = [
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400",
];
const COL4 = [
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
];

const GALLERY_IMGS = ["/proj1.jpg", "/proj2.jpg", "/proj3.jpg"];

function FullscreenSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] bg-white overflow-hidden border-y border-gray-50">
      <div className="absolute inset-0 led-grid opacity-[0.03] z-0" />
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.08)",
          }}
        >
          <img
            src={img}
            alt={`Proyecto ${i + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
        </div>
      ))}

      <div className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 z-20">
        <span className="text-[10px] text-brand-celeste uppercase tracking-widest font-black font-accent">
          VP • Portafolio
        </span>
        <h3 className="text-3xl md:text-6xl font-display font-black text-brand-dark mt-4 tracking-tighter leading-none">
          Ingeniería de <br />{" "}
          <span className="text-gradient">visualización.</span>
        </h3>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-brand-celeste"
                : "bg-brand-dark/20 hover:bg-brand-dark/40"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-50 z-30">
        <div
          className="h-full bg-gradient-to-r from-brand-celeste to-brand-dark transition-all duration-500"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </section>
  );
}

function GalleryColumn({
  imgs,
  colRef,
  offsetTop = 0,
}: {
  imgs: string[];
  colRef: React.RefObject<HTMLDivElement | null>;
  offsetTop?: number;
}) {
  return (
    <div
      ref={colRef}
      className="flex flex-col gap-8 opacity-0"
      style={{ marginTop: offsetTop }}
    >
      {imgs.map((src, i) => (
        <div
          key={i}
          className="w-full overflow-hidden rounded-xl shadow-lg aspect-square flex-shrink-0"
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
    </div>
  );
}

export default function Inicio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);
  const galleryCenterRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [startStats, setStartStats] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-headline > *", {
        y: 70,
        opacity: 0,
        duration: 1.4,
        stagger: 0.18,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(".hero-sub", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.0,
      });
      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 1.3,
      });
      gsap.to(".scroll-dot", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
      });

      // Gallery pin animation only on desktop (avoids excessive scroll on mobile)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          heroTextRef.current,
          { opacity: 0, y: -100, duration: 1, ease: "none" },
          0,
        );
        tl.to(
          videoBgRef.current,
          { y: -150, opacity: 0, duration: 1, ease: "none" },
          0,
        );
        tl.to(".scroll-indicator", { opacity: 0, duration: 0.3 }, 0);
        tl.to(galleryRef.current, { opacity: 1, duration: 0.5 }, 1);

        gsap.set(col1Ref.current, { y: "100vh", opacity: 1 });
        gsap.set(col4Ref.current, { y: "100vh", opacity: 1 });
        gsap.set(col2Ref.current, { y: "60vh", opacity: 1 });
        gsap.set(col3Ref.current, { y: "60vh", opacity: 1 });

        tl.to(col1Ref.current, { y: "0vh", duration: 2, ease: "none" }, 1);
        tl.to(col4Ref.current, { y: "0vh", duration: 2, ease: "none" }, 1);
        tl.to(col2Ref.current, { y: "0vh", duration: 1.5, ease: "none" }, 1.2);
        tl.to(col3Ref.current, { y: "0vh", duration: 1.5, ease: "none" }, 1.2);

        tl.fromTo(
          galleryCenterRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "none" },
          2,
        );

        tl.to(col1Ref.current, { y: "-80vh", duration: 5, ease: "none" }, 2.5);
        tl.to(col4Ref.current, { y: "-80vh", duration: 5, ease: "none" }, 2.5);
        tl.to(col2Ref.current, { y: "-50vh", duration: 5, ease: "none" }, 2.5);
        tl.to(col3Ref.current, { y: "-50vh", duration: 5, ease: "none" }, 2.5);

        tl.to(
          [galleryCenterRef.current, galleryRef.current],
          { opacity: 0, duration: 1.5 },
          8,
        );
      });

      gsap.from(".cta-content > *", {
        scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".brand-item", {
        scrollTrigger: { trigger: ".brands-section", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: statsSectionRef.current,
        start: "top 85%",
        onEnter: () => setStartStats(true),
        onEnterBack: () => setStartStats(true),
        onLeaveBack: () => setStartStats(false),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white font-sans text-text-primary">
      <Helmet>
        <title>
          Visual Point | Pantallas LED y Soluciones Visuales en Perú
        </title>
        <meta
          name="description"
          content="Líderes en venta, instalación y asesoría de pantallas LED de alto impacto en Perú. Tecnología visual de vanguardia para tu negocio."
        />
      </Helmet>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-white"
      >
        <div
          ref={videoBgRef}
          className="absolute inset-0 z-10 overflow-hidden led-grid"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-[0.08]"
          >
            <source src={HOME_DATA.hero.videoUrl} type="video/mp4" />
          </video>
          {/* Precise lighting gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white" />
        </div>

        <div
          ref={heroTextRef}
          className="relative z-20 w-full px-6 md:px-20 text-left max-w-7xl mx-auto pt-24 md:pt-32"
        >
          <div className="hero-headline">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[clamp(5rem,10vw,8.5rem)] font-display font-black text-brand-dark leading-[0.9] tracking-[-0.05em] mb-8">
              {HOME_DATA.hero.title}
              <br />
              <span className="text-brand-celeste">
                {HOME_DATA.hero.titleAccent}
              </span>
            </h1>
          </div>
          <p className="hero-sub text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed mb-12 font-medium font-accent">
            {HOME_DATA.hero.subtitle}
          </p>
          <div className="hero-cta flex flex-wrap gap-4 md:gap-6 mt-8 md:mt-16">
            <Link
              to={HOME_DATA.hero.ctaPrimary.link}
              className="btn-shine group relative inline-flex items-center gap-6 bg-brand-dark text-white font-black px-12 py-6 rounded-full hover:bg-brand-celeste hover:shadow-[0_20px_40px_rgba(0,163,221,0.3)] transition-all duration-500 text-[10px] uppercase tracking-[0.3em] font-accent overflow-hidden"
            >
              <span className="relative z-10">
                {HOME_DATA.hero.ctaPrimary.text}
              </span>
              <ArrowRight
                size={18}
                className="relative z-10 group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
            <Link
              to={HOME_DATA.hero.ctaSecondary.link}
              className="inline-flex items-center gap-6 border-b-2 border-brand-dark/10 py-4 text-brand-dark font-black text-[10px] uppercase tracking-[0.3em] font-accent hover:border-brand-celeste transition-all duration-300"
            >
              {HOME_DATA.hero.ctaSecondary.text}
            </Link>
          </div>
        </div>

        <div
          ref={galleryRef}
          className="absolute inset-0 z-30 pointer-events-none opacity-0"
        >
          <div className="absolute top-0 left-0 h-full hidden md:flex gap-10 pl-5 pt-8 items-start">
            <div className="w-[9vw] min-w-[75px] max-w-[115px]">
              <GalleryColumn imgs={COL1} colRef={col1Ref} offsetTop={140} />
            </div>
            <div className="w-[9vw] min-w-[75px] max-w-[115px]">
              <GalleryColumn imgs={COL2} colRef={col2Ref} offsetTop={40} />
            </div>
          </div>

          <div className="absolute top-0 right-0 h-full hidden md:flex gap-10 pr-5 pt-8 items-start flex-row-reverse">
            <div className="w-[9vw] min-w-[75px] max-w-[115px]">
              <GalleryColumn imgs={COL4} colRef={col4Ref} offsetTop={140} />
            </div>
            <div className="w-[9vw] min-w-[75px] max-w-[115px]">
              <GalleryColumn imgs={COL3} colRef={col3Ref} offsetTop={40} />
            </div>
          </div>

          <div
            ref={galleryCenterRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-[28vw] opacity-0"
          >
            <p className="text-[10px] text-brand-celeste uppercase tracking-widest font-black mb-8 font-accent">
              {HOME_DATA.hero.centerTextLabel}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-brand-dark leading-[1.1] tracking-tighter">
              {HOME_DATA.hero.centerTextMain}
              <span className="text-brand-celeste">
                {HOME_DATA.hero.centerTextAccent}
              </span>
            </h2>
          </div>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 opacity-40">
          <span className="text-[10px] text-brand-dark uppercase tracking-wider">
            Scroll
          </span>
          <div className="w-5 h-9 border border-gray-300 rounded-full flex items-start justify-center pt-1.5">
            <div className="scroll-dot w-1.5 h-1.5 bg-brand-celeste rounded-full" />
          </div>
        </div>
      </section>

      {/* MOBILE GALLERY - Solo visible en móvil */}
      <section className="md:hidden py-16 px-6 bg-white">
        <p className="text-[10px] text-brand-celeste uppercase tracking-widest font-black mb-6 text-center font-accent">
          {HOME_DATA.hero.centerTextLabel}
        </p>
        <h2 className="text-2xl font-display font-black text-brand-dark mb-8 tracking-tighter text-center">
          {HOME_DATA.hero.centerTextMain}
          <span className="text-brand-celeste">
            {HOME_DATA.hero.centerTextAccent}
          </span>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[...COL1.slice(0, 2), ...COL2.slice(0, 2)].map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* TECH DIVIDER */}
      <div className="tech-divider" />

      {/* MARCAS SECTION */}
      <section className="brands-section py-16 md:py-32 bg-white w-full px-6 md:px-10 led-grid">
        <div className="w-full text-center max-w-7xl mx-auto">
          <p className="text-[10px] text-brand-celeste uppercase tracking-widest font-black mb-6 font-accent">
            Partnerships
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark mb-12 md:mb-24 tracking-tighter">
            Marcas con las que <span className="text-gradient">trabajamos</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center">
            {BRANDS.map((brand, i) => (
              <div
                key={i}
                className="brand-item group p-4 rounded-2xl hover:bg-gray-50/50 transition-all duration-500"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 md:h-12 w-auto mx-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH DIVIDER */}
      <div className="tech-divider" />

      {/* STATS SECTION */}
      <section
        ref={statsSectionRef}
        className="stats-strip bg-white py-20 md:py-40 overflow-hidden w-full px-6 md:px-10 border-t border-gray-100"
      >
        <div className="w-full text-center max-w-7xl mx-auto">
          <p className="text-[10px] text-brand-celeste uppercase tracking-widest font-black mb-8 font-accent">
            {HOME_DATA.stats.label}
          </p>
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-display font-black text-brand-dark mb-16 md:mb-32 tracking-tighter">
            {HOME_DATA.stats.title}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {HOME_DATA.stats.items.map(({ value, desc }, i) => (
              <StatItem
                key={i}
                target={value}
                label={desc}
                startAnimation={startStats}
              />
            ))}
          </div>
        </div>
      </section>

      <FullscreenSlider images={GALLERY_IMGS} />
    </div>
  );
}

function StatItem({
  target,
  label,
  startAnimation,
}: {
  target: string;
  label: string;
  startAnimation: boolean;
  key?: React.Key;
}) {
  const [count, setCount] = useState(0);

  // Extract number from target (e.g., "1,000+" -> 1000)
  const numericValue = parseInt(target.replace(/[^0-9]/g, "")) || 0;
  const suffix = target.replace(/[0-9,]/g, "");
  const hasComma = target.includes(",");

  useEffect(() => {
    if (!startAnimation) {
      setCount(0); // Reset when scrolled out
      return;
    }

    const obj = { value: 0 };
    gsap.to(obj, {
      value: numericValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      },
    });
  }, [numericValue, startAnimation]);

  return (
    <div className="flex flex-col items-center">
      <span className="font-display font-black text-brand-dark leading-none tracking-tighter mb-4 text-5xl md:text-7xl lg:text-8xl">
        {hasComma ? count.toLocaleString() : count}
        {suffix}
      </span>
      <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest max-w-[150px] mx-auto whitespace-pre-line leading-relaxed">
        {label}
      </p>
    </div>
  );
}
