import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: string;
  desc: string;
}

interface StatsCounterProps {
  label: string;
  title: string;
  items: StatItem[];
}

function AnimatedNumber({ value, start }: { value: string; start: boolean }) {
  const [displayValue, setDisplayValue] = useState("0");
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const increment = numericPart / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericPart) {
        current = numericPart;
        clearInterval(timer);
      }
      setDisplayValue(Math.floor(current).toLocaleString() + suffix);
    }, 25);

    return () => clearInterval(timer);
  }, [start, numericPart, suffix]);

  return <span>{start ? displayValue : "0" + suffix}</span>;
}

export default function StatsCounter({
  label,
  title,
  items,
}: StatsCounterProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        onEnter: () => setStartCount(true),
        onEnterBack: () => setStartCount(true),
      });

      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-celeste font-black text-[10px] tracking-[0.3em] uppercase">
            {label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-dark tracking-tighter">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map((stat, i) => (
            <div key={i} className="stat-item text-center group">
              <div className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-brand-dark group-hover:text-brand-celeste transition-colors duration-500">
                <AnimatedNumber value={stat.value} start={startCount} />
              </div>
              <p className="mt-2 text-text-secondary text-sm md:text-base font-medium">
                {stat.desc}
              </p>
              <div className="mt-4 w-12 h-0.5 bg-brand-celeste/30 mx-auto group-hover:w-full group-hover:bg-brand-celeste transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
