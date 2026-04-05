"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "BEM-ESTAR HOLÍSTICO",
    description: "Espaços projetados para nutrir a mente, o corpo e a alma.",
    number: 1,
    italic: true,
  },
  {
    title: "DISCRIÇÃO & EXCLUSIVIDADE",
    description: "Privacidade e crescimento pessoal em primeiro lugar.",
    number: 2,
    italic: true,
    hasIllustration: true,
  },
  {
    title: "ENRIQUECIMENTO CULTURAL",
    description: "Celebre a arte, a história e as tradições locais.",
    number: 3,
    italic: false,
  },
  {
    title: "COMUNIDADE & CONEXÃO",
    description: "Um ambiente acolhedor que fortalece relacionamentos.",
    number: 4,
    italic: true,
  },
  {
    title: "ELEGÂNCIA SUSTENTÁVEL",
    description: "Luxo que respeita o nosso meio ambiente.",
    number: 5,
    italic: false,
  },
];

function FloralIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-24 h-24 opacity-30"
      fill="none"
      stroke="white"
      strokeWidth="0.8"
    >
      <path d="M60 10 C60 10 40 30 40 50 C40 70 60 80 60 80 C60 80 80 70 80 50 C80 30 60 10 60 10Z" />
      <path d="M60 30 C60 30 50 40 50 55 C50 65 60 70 60 70 C60 70 70 65 70 55 C70 40 60 30 60 30Z" />
      <path d="M40 50 Q30 45 25 55 Q30 65 40 60" />
      <path d="M80 50 Q90 45 95 55 Q90 65 80 60" />
      <line x1="60" y1="80" x2="60" y2="110" />
      <path d="M55 95 Q50 85 45 90" />
      <path d="M65 100 Q70 90 75 95" />
    </svg>
  );
}

export default function Values() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid cells staggered reveal
      const cells = sectionRef.current?.querySelectorAll(".value-cell");
      if (cells) {
        gsap.from(cells, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Side text reveal
      gsap.from(".values-side-text", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Background parallax
      const bg = sectionRef.current?.querySelector(".values-bg");
      if (bg) {
        gsap.to(bg, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-4">
      <div className="rounded-[16px] border border-border overflow-hidden relative min-h-[600px] md:min-h-[700px]">
        {/* Background Image */}
        <div className="values-bg absolute inset-0 scale-110">
          <Image
            src="/images/values-interior.webp"
            alt="Sala de estar minimalista moderna com sofá branco e parede de ripas de madeira"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full p-6 md:p-10 lg:p-12 gap-8">
          {/* Grid */}
          <div className="lg:w-[65%]">
            {/* Top Row - 2 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-white/15">
              {values.slice(0, 2).map((v) => (
                <div
                  key={v.number}
                  className="value-cell p-6 md:p-8 border-r border-white/15 last:border-r-0 hover:bg-white/5 transition-colors duration-300 min-h-[180px] flex flex-col justify-between"
                >
                  <div>
                    <h3
                      className={`font-serif text-lg md:text-xl text-white mb-3 ${v.italic ? "italic" : ""}`}
                    >
                      {v.title}
                    </h3>
                    <p className="font-sans text-xs text-white/60 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    {v.hasIllustration && <FloralIllustration />}
                    <span className="font-sans text-xs text-white/30 ml-auto">
                      ({v.number})
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row - 3 items */}
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {values.slice(2).map((v) => (
                <div
                  key={v.number}
                  className="value-cell p-6 md:p-8 border-r border-white/15 last:border-r-0 hover:bg-white/5 transition-colors duration-300 min-h-[160px] flex flex-col justify-between"
                >
                  <div>
                    <h3
                      className={`font-serif text-base md:text-lg text-white mb-3 ${v.italic ? "italic" : ""}`}
                    >
                      {v.title}
                    </h3>
                    <p className="font-sans text-xs text-white/60 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                  <span className="font-sans text-xs text-white/30 self-end mt-4">
                    ({v.number})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Text */}
          <div className="lg:w-[35%] flex flex-col justify-center values-side-text">
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
              Na Solace Residências, acreditamos que um lar é mais do que um
              espaço físico — é um reflexo de suas aspirações, bem-estar e
              valores.
            </p>
            <p className="font-sans text-sm text-white/70 leading-relaxed">
              Nossa missão é imergir você em um estilo de vida que equilibra
              estética refinada, excelência arquitetônica e um profundo senso de
              comunidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
