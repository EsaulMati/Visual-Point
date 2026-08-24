import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 4 columns × 5 images each
const COL1 = [
  "/Imagen15.png",
  "/Imagen3.png",
  "/Imagen19.png",
  "/Imagen8.jpeg",
  "/Imagen12.png",
];
const COL2 = [
  "/Imagen6.png",
  "/Imagen20.png",
  "/Imagen1.png",
  "/Imagen14.png",
  "/Imagen9.jpeg",
];
const COL3 = [
  "/Imagen17.png",
  "/Imagen4.png",
  "/Imagen11.png",
  "/Imagen7.png",
  "/Imagen16.png",
];
const COL4 = [
  "/Imagen2.png",
  "/Imagen18.png",
  "/Imagen5.png",
  "/Imagen13.png",
  "/Imagen10.jpeg",
];

interface HeroAnimatedProps {
  title: string;
  titleAccent: string;
  subtitle: string;
  videoUrl: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  centerTextLabel?: string;
  centerTextMain?: string;
  centerTextAccent?: string;
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
          className="w-full overflow-hidden rounded-xl shadow-lg aspect-square shrink-0"
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
    </div>
  );
}

export default function HeroAnimated({
  title,
  titleAccent,
  subtitle,
  videoUrl,
  ctaPrimaryText,
  ctaPrimaryLink,
  ctaSecondaryText,
  ctaSecondaryLink,
  centerTextLabel = "Tecnología visual de alto impacto",
  centerTextMain = "Transformamos espacios con pantallas LED de ",
  centerTextAccent = "máxima definición.",
}: HeroAnimatedProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);
  const galleryCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Hero text animations
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

      // Gallery pin animation only on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1.2,
            pin: true,
          },
        });

        // 1. Ocultar el texto/video inicial suavemente
        tl.to(
          heroTextRef.current,
          { opacity: 0, y: -80, duration: 1, ease: "power2.inOut" },
          0,
        );
        tl.to(
          videoBgRef.current,
          { y: -100, opacity: 0, duration: 1, ease: "power2.inOut" },
          0,
        );
        tl.to(".scroll-indicator", { opacity: 0, duration: 0.5 }, 0);

        // 2. Mostrar el contenedor de la galería suavemente
        tl.to(galleryRef.current, { opacity: 1, duration: 1 }, 0.5);

        // 3. Mover columnas hacia arriba - fluido sin superponerse
        tl.fromTo(
          col1Ref.current,
          { y: "80vh", opacity: 1 },
          { y: "-60vh", duration: 6, ease: "none" },
          0.5,
        );
        tl.fromTo(
          col4Ref.current,
          { y: "80vh", opacity: 1 },
          { y: "-60vh", duration: 6, ease: "none" },
          0.5,
        );
        tl.fromTo(
          col2Ref.current,
          { y: "120vh", opacity: 1 },
          { y: "-30vh", duration: 6, ease: "none" },
          0.5,
        );
        tl.fromTo(
          col3Ref.current,
          { y: "120vh", opacity: 1 },
          { y: "-30vh", duration: 6, ease: "none" },
          0.5,
        );

        // 4. Aparecer texto central mientras las columnas pasan
        tl.fromTo(
          galleryCenterRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" },
          2,
        );

        // 5. Ocultar todo al final
        tl.to(
          [galleryCenterRef.current, galleryRef.current],
          { opacity: 0, duration: 1.5, ease: "power2.inOut" },
          5.5,
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] md:h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Video Background */}
      <div
        ref={videoBgRef}
        className="absolute inset-0 z-10 overflow-hidden led-grid"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-[0.08]"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-white" />
      </div>

      {/* Content */}
      <div
        ref={heroTextRef}
        className="relative z-20 w-full px-4 sm:px-6 md:px-20 text-center md:text-left max-w-7xl mx-auto pt-20 sm:pt-24 md:pt-32"
      >
        <div className="hero-headline">
          <h1 className="text-3xl sm:text-5xl md:text-8xl lg:text-[clamp(5rem,10vw,8.5rem)] font-display font-black text-brand-dark leading-[0.95] tracking-[-0.04em] mb-6 sm:mb-8">
            {title}
            <br />
            <span className="text-brand-celeste">{titleAccent}</span>
          </h1>
        </div>
        <p className="hero-sub text-base sm:text-lg md:text-xl text-gray-500 max-w-md sm:max-w-xl mx-auto md:mx-0 leading-relaxed mb-8 sm:mb-12 font-medium font-accent text-center md:text-left">
          {subtitle}
        </p>
        <div className="hero-cta flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-16">
          <a
            href={ctaPrimaryLink}
            className="btn-shine group relative inline-flex items-center gap-4 sm:gap-6 bg-brand-dark text-white font-black px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-full hover:bg-brand-celeste hover:shadow-[0_20px_40px_rgba(0,163,221,0.3)] transition-all duration-500 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-accent overflow-hidden"
          >
            <span className="relative z-10">{ctaPrimaryText}</span>
            <ArrowRight
              size={16}
              className="relative z-10 group-hover:translate-x-2 transition-transform duration-300 sm:w-[18px] sm:h-[18px]"
            />
          </a>
          <a
            href={ctaSecondaryLink}
            className="inline-flex min-h-11 items-center gap-4 sm:gap-6 border-b-2 border-brand-dark/10 py-3 sm:py-4 text-brand-dark font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-accent hover:border-brand-celeste transition-all duration-300"
          >
            {ctaSecondaryText}
          </a>
        </div>
      </div>

      {/* Gallery with columns */}
      <div
        ref={galleryRef}
        className="absolute inset-0 z-30 pointer-events-none opacity-0"
      >
        {/* Left columns */}
        <div className="absolute top-0 left-0 h-full hidden md:flex gap-10 pl-5 pt-8 items-start">
          <div className="w-[9vw] min-w-[75px] max-w-[115px]">
            <GalleryColumn imgs={COL1} colRef={col1Ref} offsetTop={140} />
          </div>
          <div className="w-[9vw] min-w-[75px] max-w-[115px]">
            <GalleryColumn imgs={COL2} colRef={col2Ref} offsetTop={40} />
          </div>
        </div>

        {/* Right columns */}
        <div className="absolute top-0 right-0 h-full hidden md:flex gap-10 pr-5 pt-8 items-start flex-row-reverse">
          <div className="w-[9vw] min-w-[75px] max-w-[115px]">
            <GalleryColumn imgs={COL4} colRef={col4Ref} offsetTop={140} />
          </div>
          <div className="w-[9vw] min-w-[75px] max-w-[115px]">
            <GalleryColumn imgs={COL3} colRef={col3Ref} offsetTop={40} />
          </div>
        </div>

        {/* Center text */}
        <div
          ref={galleryCenterRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-[28vw] opacity-0"
        >
          <p className="text-[10px] text-brand-celeste uppercase tracking-widest font-black mb-8 font-accent">
            {centerTextLabel}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-brand-dark leading-[1.1] tracking-tighter">
            {centerTextMain}
            <span className="text-brand-celeste">{centerTextAccent}</span>
          </h2>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div aria-hidden="true" className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 opacity-40">
        <span className="text-[10px] text-brand-dark uppercase tracking-wider">
          Scroll
        </span>
        <div className="w-5 h-9 border border-gray-300 rounded-full flex items-start justify-center pt-1.5">
          <div className="scroll-dot w-1.5 h-1.5 bg-brand-celeste rounded-full" />
        </div>
      </div>
    </section>
  );
}
