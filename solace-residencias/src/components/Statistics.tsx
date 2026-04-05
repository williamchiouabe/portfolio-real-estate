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
    unit: "m²",
    description: "de espaço projetado com maestria.",
  },
  {
    value: 60,
    suffix: "%",
    unit: "",
    description: "áreas verdes para tranquilidade e bem-estar.",
  },
  {
    value: 30,
    suffix: "",
    unit: "",
    description:
      "residências exclusivas, cada uma pensada para conforto e elegância.",
  },
  {
    value: 24,
    suffix: "/7",
    unit: "",
    description:
      "serviços de concierge, atendendo cada necessidade com excelência.",
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
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      // Counter animations (skip static 24/7)
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
      <div className="bg-card rounded-[16px] border border-border py-16 md:py-24 px-8 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Scattered/staggered layout */}
          <div className="relative min-h-[500px] md:min-h-[550px] lg:min-h-[500px]">
            {/* 150k m² — bottom-left */}
            <div className="stat-group absolute left-0 bottom-0 lg:left-[5%] lg:bottom-[5%]">
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) countersRef.current[0] = el;
                  }}
                  className="font-serif text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-light text-white leading-none"
                >
                  0
                </span>
                <span className="font-serif text-[28px] md:text-[36px] font-light text-white">
                  k
                </span>
                <span className="font-serif text-[28px] md:text-[36px] font-light text-white ml-1">
                  m²
                </span>
              </div>
              <p className="font-sans text-xs text-muted max-w-[200px] mt-2">
                {stats[0].description}
              </p>
            </div>

            {/* 60% — center-right, higher up */}
            <div className="stat-group absolute right-[20%] top-[5%] lg:right-[30%] lg:top-[5%]">
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) countersRef.current[1] = el;
                  }}
                  className="font-serif text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-light text-white leading-none"
                >
                  0
                </span>
                <span className="font-serif text-[28px] md:text-[36px] font-light text-white">
                  %
                </span>
              </div>
              <p className="font-sans text-xs text-muted max-w-[200px] mt-2">
                {stats[1].description}
              </p>
            </div>

            {/* 30 — far right, high */}
            <div className="stat-group absolute right-0 top-[2%] lg:right-[5%] lg:top-[0%]">
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) countersRef.current[2] = el;
                  }}
                  className="font-serif text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-light text-white leading-none"
                >
                  0
                </span>
              </div>
              <p className="font-sans text-xs text-muted max-w-[200px] mt-2">
                {stats[2].description}
              </p>
            </div>

            {/* 24/7 — center-left, bottom */}
            <div className="stat-group absolute left-[25%] bottom-[5%] lg:left-[35%] lg:bottom-[0%]">
              <div className="flex items-baseline">
                <span className="font-serif text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-light text-white leading-none">
                  24/7
                </span>
              </div>
              <p className="font-sans text-xs text-muted max-w-[200px] mt-2">
                {stats[3].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
