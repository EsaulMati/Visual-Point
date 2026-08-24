import { useEffect, useRef, useCallback } from "react";

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
  const isVisibleRef = useRef(true);

  // Tres copias mantienen una colección completa a cada lado del set visible.
  const multiplied = [...images, ...images, ...images];

  const resetScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const setWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
    if (el.scrollLeft <= 0) el.scrollLeft += setWidth;
  }, [direction, images.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Posicionar en el centro para tener espacio en ambas direcciones
    const setWidth = el.scrollWidth / 3;
    el.scrollLeft = setWidth;

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
      el.scrollLeft = el.scrollWidth / 3;
      animationRef.current = requestAnimationFrame(animate);
    }, 200);

    // Escuchar scroll manual del usuario
    const onScroll = () => resetScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      isPausedRef.current = !entry.isIntersecting;
    }, { rootMargin: "200px" });
    observer.observe(el);

    return () => {
      clearTimeout(startDelay);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [direction, speed, resetScroll]);

  return (
    <div
      className={`infinite-scroll-container ${className}`}
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = !isVisibleRef.current; }}
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
              alt={idx < images.length ? img.alt || "" : ""}
              loading="lazy"
              decoding="async"
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
