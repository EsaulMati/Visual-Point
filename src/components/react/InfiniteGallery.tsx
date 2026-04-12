import { useEffect, useRef, useState } from "react";

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
  speed = 1,
  className = "",
}: InfiniteGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  // Auto-scroll animation
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const animate = () => {
      if (!isPausedRef.current && !isDragging && scroller) {
        if (direction === "left") {
          scroller.scrollLeft += speed;
          // Reset to start when reaching the duplicate
          if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
            scroller.scrollLeft = 0;
          }
        } else {
          scroller.scrollLeft -= speed;
          if (scroller.scrollLeft <= 0) {
            scroller.scrollLeft = scroller.scrollWidth / 2;
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start from middle for right direction
    if (direction === "right") {
      scroller.scrollLeft = scroller.scrollWidth / 2;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, speed, isDragging]);

  // Mouse/Touch handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    setIsDragging(true);
    setStartX(e.pageX - scroller.offsetLeft);
    setScrollLeft(scroller.scrollLeft);
    scroller.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const x = e.pageX - scroller.offsetLeft;
    const walk = (x - startX) * 2;
    scroller.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollerRef.current) {
        scrollerRef.current.style.cursor = "grab";
      }
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - scroller.offsetLeft);
    setScrollLeft(scroller.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const x = e.touches[0].pageX - scroller.offsetLeft;
    const walk = (x - startX) * 2;
    scroller.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeaveContainer = () => {
    isPausedRef.current = false;
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Duplicate images for seamless loop
  const doubledImages = [...images, ...images];

  return (
    <div
      className={`infinite-gallery-wrapper overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveContainer}
    >
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {doubledImages.map((img, idx) => (
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
