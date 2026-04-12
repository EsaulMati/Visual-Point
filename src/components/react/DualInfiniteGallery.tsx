import { useEffect, useRef, useCallback, useState } from "react";

interface GalleryImage {
  src: string;
  alt?: string;
}

interface DualInfiniteGalleryProps {
  row1Images: GalleryImage[];
  row2Images: GalleryImage[];
}

export default function DualInfiniteGallery({
  row1Images,
  row2Images,
}: DualInfiniteGalleryProps) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const userInteractingRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUpdatingRef = useRef(false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0, row: 0 });

  const startAutoScroll = useCallback(() => {
    if (userInteractingRef.current) return;

    const scroll = () => {
      if (!row1Ref.current || !row2Ref.current || userInteractingRef.current)
        return;

      const el1 = row1Ref.current;
      const el2 = row2Ref.current;

      // Move row1 right, row2 left
      el1.scrollLeft += 0.5;
      el2.scrollLeft -= 0.5;

      // Infinite loop for row1 (3x duplication — use oneThird)
      const oneThird1 = el1.scrollWidth / 3;
      if (el1.scrollLeft >= oneThird1 * 2) {
        el1.scrollLeft -= oneThird1;
      } else if (el1.scrollLeft <= 0) {
        el1.scrollLeft += oneThird1;
      }

      // Infinite loop for row2 (3x duplication — use oneThird)
      const oneThird2 = el2.scrollWidth / 3;
      if (el2.scrollLeft <= 0) {
        el2.scrollLeft += oneThird2;
      } else if (el2.scrollLeft >= oneThird2 * 2) {
        el2.scrollLeft -= oneThird2;
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

  // Wrap helper: keeps scrollLeft within the middle third (infinite feel)
  const wrapScroll = useCallback((el: HTMLDivElement) => {
    const oneThird = el.scrollWidth / 3;
    if (el.scrollLeft >= oneThird * 2) {
      el.scrollLeft -= oneThird;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += oneThird;
    }
  }, []);

  // Sync row1 scroll to row2 (opposite direction)
  const handleRow1Scroll = useCallback(() => {
    if (isUpdatingRef.current || !row1Ref.current || !row2Ref.current) return;
    isUpdatingRef.current = true;

    const el1 = row1Ref.current;
    const el2 = row2Ref.current;

    wrapScroll(el1);

    // Sync row2 opposite
    const oneThird1 = el1.scrollWidth / 3;
    const oneThird2 = el2.scrollWidth / 3;
    const ratio = (el1.scrollLeft % oneThird1) / oneThird1;
    el2.scrollLeft = oneThird2 + oneThird2 * (1 - ratio);

    requestAnimationFrame(() => {
      isUpdatingRef.current = false;
    });
  }, [wrapScroll]);

  // Sync row2 scroll to row1 (opposite direction)
  const handleRow2Scroll = useCallback(() => {
    if (isUpdatingRef.current || !row1Ref.current || !row2Ref.current) return;
    isUpdatingRef.current = true;

    const el1 = row1Ref.current;
    const el2 = row2Ref.current;

    wrapScroll(el2);

    // Sync row1 opposite
    const oneThird1 = el1.scrollWidth / 3;
    const oneThird2 = el2.scrollWidth / 3;
    const ratio = (el2.scrollLeft % oneThird2) / oneThird2;
    el1.scrollLeft = oneThird1 + oneThird1 * (1 - ratio);

    requestAnimationFrame(() => {
      isUpdatingRef.current = false;
    });
  }, [wrapScroll]);

  useEffect(() => {
    const el1 = row1Ref.current;
    const el2 = row2Ref.current;
    if (!el1 || !el2) return;

    // Start positions: both start at their middle third for infinite wrap room
    const oneThird1 = el1.scrollWidth / 3;
    const oneThird2 = el2.scrollWidth / 3;
    el1.scrollLeft = oneThird1;
    el2.scrollLeft = oneThird2 * 2;

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

  // Triplicate for seamless infinite scrolling in both directions
  const tripleRow1 = [...row1Images, ...row1Images, ...row1Images];
  const tripleRow2 = [...row2Images, ...row2Images, ...row2Images];

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent, row: number) => {
    const el = row === 1 ? row1Ref.current : row2Ref.current;
    if (!el) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      row,
    };
    el.style.cursor = "grabbing";
    handleUserInteraction();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (row1Ref.current) row1Ref.current.style.cursor = "grab";
    if (row2Ref.current) row2Ref.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent, row: number) => {
    if (!isDragging || dragStartRef.current.row !== row) return;
    e.preventDefault();

    const el = row === 1 ? row1Ref.current : row2Ref.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 2;
    el.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const handleMouseLeave = (row: number) => {
    if (isDragging && dragStartRef.current.row === row) {
      setIsDragging(false);
      const el = row === 1 ? row1Ref.current : row2Ref.current;
      if (el) el.style.cursor = "grab";
    }
  };

  return (
    <div className="space-y-3">
      {/* Row 1 */}
      <div className="infinite-scroll-container">
        <div
          ref={row1Ref}
          className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
          onMouseDown={(e) => handleMouseDown(e, 1)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e, 1)}
          onMouseLeave={() => handleMouseLeave(1)}
        >
          {tripleRow1.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="gallery-img relative overflow-hidden rounded-lg bg-gray-100 group shrink-0 w-[220px] sm:w-56 md:w-64 lg:w-72 aspect-[4/3]"
            >
              <img
                src={item.src}
                alt={item.alt || ""}
                loading="eager"
                decoding="sync"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
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
          className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
          onMouseDown={(e) => handleMouseDown(e, 2)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e, 2)}
          onMouseLeave={() => handleMouseLeave(2)}
        >
          {tripleRow2.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="gallery-img relative overflow-hidden rounded-lg bg-gray-100 group shrink-0 w-[220px] sm:w-56 md:w-64 lg:w-72 aspect-[4/3]"
            >
              <img
                src={item.src}
                alt={item.alt || ""}
                loading="eager"
                decoding="sync"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
