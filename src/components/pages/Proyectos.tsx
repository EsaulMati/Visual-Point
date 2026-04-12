import React, { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Building2,
  GraduationCap,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Simple image component - images are preloaded at module level
function GalleryImage({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="eager"
      decoding="sync"
      className={className}
    />
  );
}

// Tipos de contenido
type GalleryItem = { type: "single"; image: string };

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  icon: typeof GraduationCap;
  specs: string;
  gallery: GalleryItem[];
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Universidad Católica Santa María",
    location: "Arequipa, Perú",
    category: "Educación Superior",
    icon: GraduationCap,
    specs: "Pantallas Modulares | Indoor & Outdoor",
    gallery: [
      { type: "single", image: "/Cato1.png" },
      { type: "single", image: "/Cato2.png" },
      { type: "single", image: "/Cato3.png" },
      { type: "single", image: "/Cato4.png" },
      { type: "single", image: "/Cato5.png" },
      { type: "single", image: "/Cato6.png" },
      { type: "single", image: "/Cato7.png" },
      { type: "single", image: "/Cato8.png" },
      { type: "single", image: "/Cato9.png" },
      { type: "single", image: "/Cato10.png" },
      { type: "single", image: "/Cato11.png" },
      { type: "single", image: "/Cato12.jpg" },
    ],
    description: `Implementación integral de soluciones de visualización LED de alta tecnología para la Universidad Católica Santa María, abarcando múltiples espacios estratégicos del campus universitario.

El proyecto contempló la instalación de pantallas modulares LED tanto en ambientes interiores como exteriores, optimizando la comunicación institucional y la experiencia educativa.

Los auditorios principales fueron equipados con videowalls de gran formato, diseñados para conferencias magistrales, eventos institucionales y transmisiones en vivo con calidad cinematográfica.`,
  },
  {
    id: 2,
    title: "Centro Médico ESSALUD",
    location: "Perú",
    category: "Sector Salud",
    icon: Stethoscope,
    specs: "Tótems y Pantallas Indoor",
    gallery: [
      { type: "single", image: "/Essalud1.png" },
      { type: "single", image: "/Essalud2.png" },
      { type: "single", image: "/Essalud3.jpg" },
      { type: "single", image: "/Essalud4.jpg" },
    ],
    description: `Desarrollo e implementación de un sistema integral de señalización digital mediante tótems informativos y pantallas LED indoor para las instalaciones del Centro Médico ESSALUD, orientado a mejorar la experiencia del paciente y optimizar la gestión de información hospitalaria.

La solución implementada permite la gestión centralizada de contenidos, incluyendo turnos de atención, información preventiva de salud y comunicados institucionales.`,
  },
];

// Aggressive preload - preload ALL images immediately at module load
const allImages = PROJECTS.flatMap((p) => p.gallery.map((g) => g.image));

// Preload ALL images via Image objects (fills browser cache)
const imageCache: HTMLImageElement[] = [];
allImages.forEach((url) => {
  const img = new Image();
  img.src = url;
  imageCache.push(img);
});

// Dual row infinite gallery (UCSM) - Two rows moving in opposite directions, synced
interface DualInfiniteGalleryProps {
  row1Images: GalleryItem[];
  row2Images: GalleryItem[];
}

function DualInfiniteGallery({
  row1Images,
  row2Images,
}: DualInfiniteGalleryProps) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const userInteractingRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUpdatingRef = useRef(false);

  const startAutoScroll = useCallback(() => {
    if (userInteractingRef.current) return;

    const scroll = () => {
      if (!row1Ref.current || !row2Ref.current || userInteractingRef.current)
        return;

      const el1 = row1Ref.current;
      const el2 = row2Ref.current;

      // Move row1 left, row2 right
      el1.scrollLeft += 0.5;
      el2.scrollLeft -= 0.5;

      // Infinite loop for row1 (2x duplication)
      const oneHalf1 = el1.scrollWidth / 2;
      if (el1.scrollLeft >= oneHalf1) {
        el1.scrollLeft = 0;
      }

      // Infinite loop for row2 (2x duplication)
      const oneHalf2 = el2.scrollWidth / 2;
      if (el2.scrollLeft <= 0) {
        el2.scrollLeft = oneHalf2;
      }

      autoScrollRef.current = requestAnimationFrame(scroll);
    };

    autoScrollRef.current = requestAnimationFrame(scroll);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const handleUserInteraction = useCallback(() => {
    userInteractingRef.current = true;
    stopAutoScroll();

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Resume auto-scroll after 2.5 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false;
      startAutoScroll();
    }, 2500);
  }, [startAutoScroll, stopAutoScroll]);

  // Sync row1 scroll to row2 (opposite direction)
  const handleRow1Scroll = useCallback(() => {
    if (isUpdatingRef.current || !row1Ref.current || !row2Ref.current) return;
    isUpdatingRef.current = true;

    const el1 = row1Ref.current;
    const el2 = row2Ref.current;
    const oneHalf1 = el1.scrollWidth / 2;
    const oneHalf2 = el2.scrollWidth / 2;

    // Infinite loop check
    if (el1.scrollLeft >= oneHalf1 - 5) {
      el1.scrollLeft = 0;
    }

    // Sync row2 opposite
    const ratio = el1.scrollLeft / oneHalf1;
    el2.scrollLeft = oneHalf2 * (1 - ratio);

    requestAnimationFrame(() => {
      isUpdatingRef.current = false;
    });
  }, []);

  // Sync row2 scroll to row1 (opposite direction)
  const handleRow2Scroll = useCallback(() => {
    if (isUpdatingRef.current || !row1Ref.current || !row2Ref.current) return;
    isUpdatingRef.current = true;

    const el1 = row1Ref.current;
    const el2 = row2Ref.current;
    const oneHalf1 = el1.scrollWidth / 2;
    const oneHalf2 = el2.scrollWidth / 2;

    // Infinite loop check
    if (el2.scrollLeft <= 5) {
      el2.scrollLeft = oneHalf2;
    }

    // Sync row1 opposite
    const ratio = el2.scrollLeft / oneHalf2;
    el1.scrollLeft = oneHalf1 * (1 - ratio);

    requestAnimationFrame(() => {
      isUpdatingRef.current = false;
    });
  }, []);

  useEffect(() => {
    const el1 = row1Ref.current;
    const el2 = row2Ref.current;
    if (!el1 || !el2) return;

    // Start positions (el1 at start, el2 at end for opposite motion)
    el1.scrollLeft = 0;
    const oneHalf2 = el2.scrollWidth / 2;
    el2.scrollLeft = oneHalf2;

    // Start auto-scroll
    const startDelay = setTimeout(() => startAutoScroll(), 100);

    // Only pause on direct horizontal interaction (wheel with shift, or touch/drag on gallery)
    const onWheelRow1 = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        handleUserInteraction();
      }
    };
    const onWheelRow2 = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        handleUserInteraction();
      }
    };
    const onPointerDown = () => handleUserInteraction();

    el1.addEventListener("wheel", onWheelRow1, { passive: true });
    el2.addEventListener("wheel", onWheelRow2, { passive: true });
    el1.addEventListener("pointerdown", onPointerDown);
    el2.addEventListener("pointerdown", onPointerDown);
    el1.addEventListener("scroll", handleRow1Scroll, { passive: true });
    el2.addEventListener("scroll", handleRow2Scroll, { passive: true });

    return () => {
      clearTimeout(startDelay);
      stopAutoScroll();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      el1.removeEventListener("wheel", onWheelRow1);
      el2.removeEventListener("wheel", onWheelRow2);
      el1.removeEventListener("pointerdown", onPointerDown);
      el2.removeEventListener("pointerdown", onPointerDown);
      el1.removeEventListener("scroll", handleRow1Scroll);
      el2.removeEventListener("scroll", handleRow2Scroll);
    };
  }, [
    startAutoScroll,
    stopAutoScroll,
    handleUserInteraction,
    handleRow1Scroll,
    handleRow2Scroll,
  ]);

  // Duplicate 2x instead of 3x for better performance
  const doubleRow1 = [...row1Images, ...row1Images];
  const doubleRow2 = [...row2Images, ...row2Images];

  return (
    <div className="space-y-3">
      {/* Row 1 */}
      <div className="infinite-scroll-container">
        <div
          ref={row1Ref}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
        >
          {doubleRow1.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="gallery-img relative overflow-hidden rounded-lg bg-gray-100 group cursor-pointer flex-shrink-0 w-[220px] sm:w-56 md:w-64 lg:w-72 aspect-[4/3]"
            >
              <GalleryImage
                src={item.image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
      {/* Row 2 */}
      <div className="infinite-scroll-container">
        <div
          ref={row2Ref}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
        >
          {doubleRow2.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="gallery-img relative overflow-hidden rounded-lg bg-gray-100 group cursor-pointer flex-shrink-0 w-[220px] sm:w-56 md:w-64 lg:w-72 aspect-[4/3]"
            >
              <GalleryImage
                src={item.image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Single row infinite gallery (ESSALUD)
interface InfiniteGalleryProps {
  images: GalleryItem[];
  id: string;
}

function InfiniteGallery({ images, id }: InfiniteGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const userInteractingRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAutoScroll = useCallback(() => {
    if (!scrollRef.current || userInteractingRef.current) return;

    const scroll = () => {
      if (!scrollRef.current || userInteractingRef.current) return;

      const el = scrollRef.current;
      el.scrollLeft += 0.5;

      // For 2x duplication, use half point
      const oneHalf = el.scrollWidth / 2;
      if (el.scrollLeft >= oneHalf) {
        el.scrollLeft = 0;
      }

      autoScrollRef.current = requestAnimationFrame(scroll);
    };

    autoScrollRef.current = requestAnimationFrame(scroll);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const handleUserInteraction = useCallback(() => {
    userInteractingRef.current = true;
    stopAutoScroll();

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false;
      startAutoScroll();
    }, 2500);
  }, [startAutoScroll, stopAutoScroll]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const oneHalf = el.scrollWidth / 2;

    if (el.scrollLeft >= oneHalf - 5) {
      el.scrollLeft = 0;
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = 0;

    const startDelay = setTimeout(() => startAutoScroll(), 100);

    // Only pause on horizontal scroll interaction
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        handleUserInteraction();
      }
    };
    const onPointerDown = () => handleUserInteraction();

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(startDelay);
      stopAutoScroll();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [startAutoScroll, stopAutoScroll, handleUserInteraction, handleScroll]);

  // Duplicate 2x for infinite feel with less memory
  const doubleImages = [...images, ...images];

  return (
    <div className="infinite-scroll-container">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {doubleImages.map((item, idx) => (
          <div
            key={`${id}-${idx}`}
            className="gallery-img relative overflow-hidden rounded-lg bg-gray-100 group cursor-pointer flex-shrink-0 w-[220px] sm:w-56 md:w-64 lg:w-72 aspect-[4/3]"
          >
            <GalleryImage
              src={item.image}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Proyectos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.from(".reveal-up", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Project cards
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Note: Gallery images don't need individual animations - they scroll automatically
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white font-sans">
      {/* HERO SECTION - Blanco/Claro */}
      <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 led-grid opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-celeste/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 text-center">
          <div className="flex items-center justify-center gap-4 reveal-up mb-8">
            <div className="h-px w-16 bg-brand-celeste/30" />
            <span className="text-brand-celeste font-black text-xs tracking-[0.2em] uppercase">
              Portafolio
            </span>
            <div className="h-px w-16 bg-brand-celeste/30" />
          </div>

          <h1 className="reveal-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-brand-dark leading-[0.95] tracking-tight mb-8">
            Proyectos
            <br />
            <span className="text-brand-celeste">ejecutados</span>
          </h1>

          <p className="reveal-up text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed text-justify">
            Descubra cómo hemos transformado espacios corporativos, educativos y
            de salud con soluciones de visualización LED de última generación.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* PROJECTS LIST */}
      <section className="py-12 md:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="space-y-16 md:space-y-24">
            {PROJECTS.map((project, projectIdx) => {
              const IconComponent = project.icon;

              return (
                <article key={project.id} className="project-card">
                  {/* Project Number & Header */}
                  <div className="flex items-start gap-6 mb-12">
                    <span className="text-8xl md:text-9xl font-display font-black text-gray-100 leading-none select-none">
                      {String(projectIdx + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-4 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-celeste/10 flex items-center justify-center">
                          <IconComponent
                            className="text-brand-celeste"
                            size={20}
                          />
                        </div>
                        <span className="text-brand-celeste font-bold text-xs tracking-widest uppercase">
                          {project.category}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-display font-black text-brand-dark leading-tight tracking-tight">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-2 text-text-secondary text-sm mt-3">
                        <MapPin size={14} />
                        {project.location}
                        <span className="mx-2">•</span>
                        <Building2 size={14} />
                        {project.specs}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="w-full mb-12">
                    {project.description.split("\n\n").map((p, i) => (
                      <p
                        key={i}
                        className="text-text-secondary text-base md:text-lg leading-relaxed mb-4 last:mb-0 text-justify"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Gallery */}
                  {project.id === 1 ? (
                    // UCSM: Two rows synced - moving in opposite directions
                    <DualInfiniteGallery
                      row1Images={project.gallery.slice(0, 6)}
                      row2Images={project.gallery.slice(6)}
                    />
                  ) : (
                    // ESSALUD: Single infinite row
                    <InfiniteGallery images={project.gallery} id="essalud" />
                  )}

                  {/* Divider between projects */}
                  {projectIdx < PROJECTS.length - 1 && (
                    <div className="mt-16 md:mt-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Más formal */}
      <section className="py-14 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-display font-black text-brand-dark mb-4 tracking-tight">
            ¿Tiene un proyecto en mente?
          </h3>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto text-justify">
            Contáctenos para una consultoría personalizada sobre soluciones LED
            para su organización.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-celeste transition-colors duration-300 group"
          >
            Solicitar información
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
