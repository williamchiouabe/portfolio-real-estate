"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  unit?: string;
  description: string;
  isStatic?: boolean;
}

const stats: StatItem[] = [
  {
    value: 150,
    suffix: "k",
    unit: "m\u00B2",
    description: "de espaco projetado com maestria.",
  },
  {
    value: 60,
    suffix: "%",
    unit: "",
    description: "areas verdes para tranquilidade e bem-estar.",
  },
  {
    value: 30,
    suffix: "",
    unit: "",
    description:
      "residencias exclusivas, cada uma pensada para conforto e elegancia.",
  },
  {
    value: 24,
    suffix: "/7",
    unit: "",
    description:
      "servicos de concierge, atendendo cada necessidade com excelencia.",
    isStatic: true,
  },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statEls = sectionRef.current?.querySelectorAll(".stat-group");

      if (statEls) {
        gsap.from(statEls, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      // Counter animations
      countersRef.current.forEach((el, i) => {
        if (!el || stats[i]?.isStatic) return;
        const target = stats[i]?.value ?? 0;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-4">
      <div className="bg-card rounded-[16px] border border-border py-16 md:py-24 px-8 md:px-12 lg:px-16 card-glow">
        <div className="max-w-[1400px] mx-auto">
          {/* Grid layout for mobile, scattered for desktop */}
          <div className="grid grid-cols-2 gap-8 md:gap-0 md:grid-cols-1 md:relative md:min-h-[550px] lg:min-h-[500px]">
            {/* 150k m2 */}
            <div className="stat-group md:absolute md:left-0 md:bottom-0 lg:left-[5%] lg:bottom-[5%]">
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) countersRef.current[0] = el;
                  }}
                  className="font-serif text-[56px] sm:text-[80px] md:text-[120px] lg:text-[140px] font-light text-white leading-none"
                >
                  0
                </span>
                <span className="font-serif text-[20px] md:text-[36px] font-light text-white">
                  k
                </span>
                <span className="font-serif text-[20px] md:text-[36px] font-light text-accent/70 ml-1">
                  m&sup2;
                </span>
              </div>
              <div className="accent-line mt-3 mb-2" />
              <p className="font-sans text-[10px] md:text-xs text-muted max-w-[200px] font-light leading-relaxed">
                {stats[0].description}
              </p>
            </div>

            {/* 60% */}
            <div className="stat-group md:absolute md:right-[20%] md:top-[5%] lg:right-[30%] lg:top-[5%]">
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) countersRef.current[1] = el;
                  }}
                  className="font-serif text-[56px] sm:text-[80px] md:text-[120px] lg:text-[140px] font-light text-white leading-none"
                >
                  0
                </span>
                <span className="font-serif text-[20px] md:text-[36px] font-light text-accent/70">
                  %
                </span>
              </div>
              <div className="accent-line mt-3 mb-2" />
              <p className="font-sans text-[10px] md:text-xs text-muted max-w-[200px] font-light leading-relaxed">
                {stats[1].description}
              </p>
            </div>

            {/* 30 */}
            <div className="stat-group md:absolute md:right-0 md:top-[2%] lg:right-[5%] lg:top-[0%]">
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) countersRef.current[2] = el;
                  }}
                  className="font-serif text-[56px] sm:text-[80px] md:text-[120px] lg:text-[140px] font-light text-white leading-none"
                >
                  0
                </span>
              </div>
              <div className="accent-line mt-3 mb-2" />
              <p className="font-sans text-[10px] md:text-xs text-muted max-w-[200px] font-light leading-relaxed">
                {stats[2].description}
              </p>
            </div>

            {/* 24/7 */}
            <div className="stat-group md:absolute md:left-[25%] md:bottom-[5%] lg:left-[35%] lg:bottom-[0%]">
              <div className="flex items-baseline">
                <span className="font-serif text-[56px] sm:text-[80px] md:text-[120px] lg:text-[140px] font-light text-white leading-none">
                  24
                </span>
                <span className="font-serif text-[20px] md:text-[36px] font-light text-accent/70">
                  /7
                </span>
              </div>
              <div className="accent-line mt-3 mb-2" />
              <p className="font-sans text-[10px] md:text-xs text-muted max-w-[200px] font-light leading-relaxed">
                {stats[3].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
