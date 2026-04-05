"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "BEM-ESTAR HOLISTICO",
    description: "Espacos projetados para nutrir a mente, o corpo e a alma.",
    number: 1,
    italic: true,
  },
  {
    title: "DISCRICAO & EXCLUSIVIDADE",
    description: "Privacidade e crescimento pessoal em primeiro lugar.",
    number: 2,
    italic: true,
    hasIllustration: true,
  },
  {
    title: "ENRIQUECIMENTO CULTURAL",
    description: "Celebre a arte, a historia e as tradicoes locais.",
    number: 3,
    italic: false,
  },
  {
    title: "COMUNIDADE & CONEXAO",
    description: "Um ambiente acolhedor que fortalece relacionamentos.",
    number: 4,
    italic: true,
  },
  {
    title: "ELEGANCIA SUSTENTAVEL",
    description: "Luxo que respeita o nosso meio ambiente.",
    number: 5,
    italic: false,
  },
];

function FloralIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 opacity-20"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
    >
      <path d="M60 10 C60 10 40 30 40 50 C40 70 60 80 60 80 C60 80 80 70 80 50 C80 30 60 10 60 10Z" className="text-accent" />
      <path d="M60 30 C60 30 50 40 50 55 C50 65 60 70 60 70 C60 70 70 65 70 55 C70 40 60 30 60 30Z" className="text-accent" />
      <path d="M40 50 Q30 45 25 55 Q30 65 40 60" className="text-accent" />
      <path d="M80 50 Q90 45 95 55 Q90 65 80 60" className="text-accent" />
      <line x1="60" y1="80" x2="60" y2="110" className="text-accent" />
      <path d="M55 95 Q50 85 45 90" className="text-accent" />
      <path d="M65 100 Q70 90 75 95" className="text-accent" />
    </svg>
  );
}

export default function Values() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      <div className="rounded-[16px] border border-border overflow-hidden relative min-h-[600px] md:min-h-[700px] card-glow">
        {/* Background Image */}
        <div className="values-bg absolute inset-0 scale-110">
          <Image
            src="/images/values-interior.webp"
            alt="Sala de estar minimalista moderna com sofa branco e parede de ripas de madeira"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full p-6 md:p-10 lg:p-12 gap-8">
          {/* Grid */}
          <div className="lg:w-[65%]">
            {/* Top Row - 2 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-white/10">
              {values.slice(0, 2).map((v) => (
                <div
                  key={v.number}
                  className="value-cell p-6 md:p-8 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-all duration-500 min-h-[180px] flex flex-col justify-between group"
                >
                  <div>
                    <h3
                      className={`font-serif text-lg md:text-xl text-white mb-3 transition-colors duration-500 group-hover:text-accent ${v.italic ? "italic" : ""}`}
                    >
                      {v.title}
                    </h3>
                    <p className="font-sans text-[11px] text-white/50 leading-relaxed font-light">
                      {v.description}
                    </p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    {v.hasIllustration && <FloralIllustration />}
                    <span className="font-sans text-[10px] text-white/20 ml-auto tracking-wider">
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
                  className="value-cell p-6 md:p-8 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-all duration-500 min-h-[160px] flex flex-col justify-between group"
                >
                  <div>
                    <h3
                      className={`font-serif text-base md:text-lg text-white mb-3 transition-colors duration-500 group-hover:text-accent ${v.italic ? "italic" : ""}`}
                    >
                      {v.title}
                    </h3>
                    <p className="font-sans text-[11px] text-white/50 leading-relaxed font-light">
                      {v.description}
                    </p>
                  </div>
                  <span className="font-sans text-[10px] text-white/20 self-end mt-4 tracking-wider">
                    ({v.number})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Text */}
          <div className="lg:w-[35%] flex flex-col justify-center values-side-text">
            <div className="accent-line mb-8" />
            <p className="font-sans text-sm text-white/60 leading-[1.8] mb-6 font-light">
              Na Solace Residencias, acreditamos que um lar e mais do que um
              espaco fisico — e um reflexo de suas aspiracoes, bem-estar e
              valores.
            </p>
            <p className="font-sans text-sm text-white/60 leading-[1.8] font-light">
              Nossa missao e imergir voce em um estilo de vida que equilibra
              estetica refinada, excelencia arquitetonica e um profundo senso de
              comunidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
