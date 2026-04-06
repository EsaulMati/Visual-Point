import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 18); // Synced with 1.8s total loading time

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white via-white to-brand-gray-light flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-celeste/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-dark/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-40 h-40 md:w-48 md:h-48">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            boxShadow: `0 0 ${30 + progress * 0.5}px rgba(0, 163, 221, ${0.1 + progress * 0.003})`,
            transform: `scale(${1 + progress * 0.002})`,
          }}
        />

        {/* Shadow/Background Logo (Grayscale/Light) */}
        <img
          src="/vp-logo-icono.png"
          alt="Visual Point"
          className="w-full h-full object-contain opacity-15 grayscale"
        />

        {/* Filling Logo */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-100 ease-out"
          style={{ height: `${progress}%` }}
        >
          <div className="absolute bottom-0 left-0 w-40 h-40 md:w-48 md:h-48">
            <img
              src="/vp-logo-icono.png"
              alt="Visual Point"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full opacity-50"
          style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center relative z-10">
        {/* Progress bar container */}
        <div className="relative w-48 md:w-56">
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-brand-celeste to-brand-dark rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shine effect on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>

          {/* Percentage indicator */}
          <div className="flex justify-between mt-3 text-[9px] font-black tracking-[0.3em] uppercase text-brand-dark/30">
            <span>0</span>
            <span className="text-brand-celeste">{progress}%</span>
            <span>100</span>
          </div>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-widest font-bold text-brand-dark/60">
          Cargando Experiencia
        </p>

        {/* Animated dots */}
        <div className="flex gap-1 mt-3">
          <span
            className="w-1.5 h-1.5 bg-brand-celeste rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1.5 h-1.5 bg-brand-celeste rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-1.5 h-1.5 bg-brand-celeste rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
