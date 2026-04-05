"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text reveal
      const headingLines = headingRef.current?.querySelectorAll(".heading-line");
      if (headingLines) {
        gsap.from(headingLines, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      // Image clip-path reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Text fade in
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Image parallax
      const img = imageRef.current?.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: 10,
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
    <section
      ref={sectionRef}
      id="sobre"
      className="px-4 md:px-8 py-4"
    >
      <div className="bg-card rounded-[16px] border border-border overflow-hidden card-glow">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 md:p-12 lg:p-16">
          {/* Left Column - Text */}
          <div className="lg:w-[45%] flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted font-light">
                (SOBRE)
              </span>
              <div className="accent-line" />
            </div>
            <div ref={headingRef} className="space-y-0">
              <div className="heading-line font-serif text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] text-white leading-[1.1]">
                DESIGN
              </div>
              <div className="heading-line font-serif text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] text-white leading-[1.1]">
                ATEMPORAL.
              </div>
              <div className="heading-line font-serif italic text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] text-accent leading-[1.1]">
                BEM-ESTAR
              </div>
              <div className="heading-line font-serif italic text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] text-accent leading-[1.1]">
                COMO
              </div>
              <div className="heading-line font-serif text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] text-white leading-[1.1]">
                ESTILO DE VIDA.
              </div>
            </div>
          </div>

          {/* Right Column - Image + Text */}
          <div className="lg:w-[55%] flex flex-col gap-8">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] w-full rounded-xl overflow-hidden"
            >
              <Image
                src="/images/about-living-room.webp"
                alt="Sala de estar moderna e luxuosa com sofa bege, mesa de cafe em madeira escura e janelas do chao ao teto"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card/50 to-transparent" />
            </div>

            <div ref={textRef} className="space-y-6">
              <p className="font-sans text-sm text-text-secondary leading-[1.8] font-light">
                Cada elemento da Solace Residencias reflete um compromisso com a
                excelencia. Da elegancia atemporal de seus interiores as
                comodidades cuidadosamente selecionadas, o empreendimento
                incorpora uma abordagem holistica ao viver com luxo.
              </p>
              <p className="font-sans text-sm text-text-secondary leading-[1.8] font-light">
                Seja buscando um refugio sereno, um polo cultural ou um espaco
                que promova o crescimento pessoal, a Solace Residencias oferece
                tudo isso.
              </p>
              <a
                href="#contato"
                className="inline-flex items-center px-6 py-2.5 border border-white/20 rounded-full text-white text-[10px] uppercase tracking-[0.12em] hover:border-accent/50 hover:text-accent transition-all duration-500 btn-shimmer"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
