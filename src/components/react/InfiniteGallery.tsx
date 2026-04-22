import { useEffect, useRef, useState, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt?: string;
}

interface InfiniteGalleryProps {
  images: GalleryImage[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function InfiniteGallery({
  images,
  direction = "left",
  speed = 0.5,
  className = "",
}: InfiniteGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  // Multiplicamos las imágenes lo suficiente para cubrir cualquier pantalla
  // Con 4 imágenes a ~288px cada una = ~1152px por set
  // Necesitamos al menos 3 pantallas de ancho = ~5760px = 5 sets
  const multiplied = [
    ...images, ...images, ...images, ...images, ...images,
    ...images, ...images, ...images, ...images, ...images,
  ];

  const resetScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Cada set tiene images.length elementos
    // El ancho de un set = scrollWidth / 10 (porque tenemos 10 copias)
    const setWidth = el.scrollWidth / 10;

    if (direction === "left") {
      // Cuando avanzamos demasiado, retrocedemos un set completo
      if (el.scrollLeft >= setWidth * 6) {
        el.scrollLeft -= setWidth;
      }
      // Si estamos al inicio, avanzamos un set
      if (el.scrollLeft <= setWidth) {
        el.scrollLeft += setWidth;
      }
    } else {
      if (el.scrollLeft <= setWidth * 2) {
        el.scrollLeft += setWidth;
      }
      if (el.scrollLeft >= setWidth * 8) {
        el.scrollLeft -= setWidth;
      }
    }
  }, [direction, images.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Posicionar en el centro para tener espacio en ambas direcciones
    const setWidth = el.scrollWidth / 10;
    el.scrollLeft = setWidth * 4;

    const animate = () => {
      if (!isPausedRef.current && el) {
        if (direction === "left") {
          el.scrollLeft += speed;
        } else {
          el.scrollLeft -= speed;
        }
        resetScroll();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Esperar a que las imágenes carguen para medir correctamente
    const startDelay = setTimeout(() => {
      el.scrollLeft = el.scrollWidth / 10 * 4;
      animationRef.current = requestAnimationFrame(animate);
    }, 200);

    // Escuchar scroll manual del usuario
    const onScroll = () => resetScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(startDelay);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      el.removeEventListener("scroll", onScroll);
    };
  }, [direction, speed, resetScroll]);

  return (
    <div
      className={`infinite-scroll-container ${className}`}
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {multiplied.map((img, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg bg-gray-100 group flex-shrink-0 w-56 md:w-64 lg:w-72 aspect-[4/3]"
          >
            <img
              src={img.src}
              alt={img.alt || ""}
              loading="eager"
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
