"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Beliefs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      const lines = headingRef.current?.querySelectorAll(".belief-line");
      if (lines) {
        gsap.from(lines, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      // Image clip reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
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
    <section ref={sectionRef} id="valores" className="px-4 md:px-8 py-4">
      <div className="bg-card rounded-[16px] border border-border overflow-hidden card-glow">
        <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
          {/* Left - Image */}
          <div
            ref={imageRef}
            className="lg:w-[55%] relative min-h-[300px] lg:min-h-0"
          >
            <Image
              src="/images/beliefs-living.webp"
              alt="Sala de estar moderna com sofa bege, mesa de cafe escura e luminaria de piso"
              fill
              className="object-cover scale-110"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            {/* Subtle golden vignette on right edge */}
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-card/30 to-transparent hidden lg:block" />
          </div>

          {/* Right - Text */}
          <div className="lg:w-[45%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted font-light">
                (NOSSOS VALORES)
              </span>
              <div className="accent-line" />
            </div>

            <div ref={headingRef} className="mb-8">
              <div className="belief-line font-serif italic text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] text-white leading-[1.1]">
                UMA VISAO DE
              </div>
              <div className="belief-line font-serif italic text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] text-accent leading-[1.1]">
                VIVER INSPIRADO
              </div>
            </div>

            <p className="font-sans text-sm text-text-secondary leading-[1.8] mb-8 font-light">
              Inspirar e cultivar um estilo de vida enriquecido que harmonize
              beleza, bem-estar e conexao cultural, criando um santuario que se
              sinta como lar.
            </p>

            <a
              href="#contato"
              className="inline-flex items-center self-start px-6 py-2.5 bg-accent text-primary rounded-full text-[10px] uppercase tracking-[0.12em] font-medium hover:bg-accent-light transition-all duration-500 btn-shimmer"
            >
              Agende uma visita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
