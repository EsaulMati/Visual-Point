import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId = 0;
    let running = false;

    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (!document.hidden) start();

    // Handle anchor links
    const anchorHandlers = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    ).map((anchor) => {
      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            lenis.scrollTo(target as HTMLElement);
          }
        }
      };
      anchor.addEventListener("click", handleClick);
      return { anchor, handleClick };
    });

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      anchorHandlers.forEach(({ anchor, handleClick }) => {
        anchor.removeEventListener("click", handleClick);
      });
      lenis.destroy();
    };
  }, []);

  return null;
}
