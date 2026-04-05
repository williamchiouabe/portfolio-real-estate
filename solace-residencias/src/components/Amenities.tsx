"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const els = textRef.current.querySelectorAll(".amenity-text");
        gsap.from(els, {
          x: -40,
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

      if (img2Ref.current) {
        gsap.from(img2Ref.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      if (img1Ref.current) {
        gsap.from(img1Ref.current, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      [img1Ref, img2Ref].forEach((ref, i) => {
        const img = ref.current?.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: (i + 1) * 5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-4">
      <div className="bg-card rounded-[16px] border border-border overflow-hidden card-glow">
        <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
          {/* Left - Text */}
          <div
            ref={textRef}
            className="lg:w-[35%] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="amenity-text font-sans text-[10px] uppercase tracking-[0.2em] text-muted font-light">
                (COMODIDADES)
              </span>
              <div className="amenity-text accent-line" />
            </div>

            <div className="mb-8">
              <div className="amenity-text font-serif text-[32px] sm:text-[40px] md:text-[48px] text-white leading-[1.1]">
                COMODIDADES
              </div>
              <div className="amenity-text font-serif text-[32px] sm:text-[40px] md:text-[48px] text-white leading-[1.1]">
                FOCADAS EM
              </div>
              <div className="amenity-text font-serif italic text-[32px] sm:text-[40px] md:text-[48px] text-accent leading-[1.1]">
                BEM-ESTAR
              </div>
            </div>

            <p className="amenity-text font-sans text-sm text-text-secondary leading-[1.8] mb-8 font-light">
              De estudios privativos de fitness a sessoes guiadas de meditacao,
              nossas comodidades sao projetadas para aprimorar seu bem-estar e
              promover um senso de harmonia.
            </p>

            <a
              href="#contato"
              className="amenity-text inline-flex items-center self-start px-6 py-2.5 bg-accent text-primary rounded-full text-[10px] uppercase tracking-[0.12em] font-medium hover:bg-accent-light transition-all duration-500 btn-shimmer"
            >
              Saiba Mais
            </a>
          </div>

          {/* Right - Overlapping Images */}
          <div className="lg:w-[65%] relative p-8 md:p-12 flex items-center min-h-[400px]">
            {/* Back/right image - larger */}
            <div
              ref={img2Ref}
              className="absolute right-0 top-4 bottom-4 w-[65%] rounded-xl overflow-hidden group"
            >
              <Image
                src="/images/amenities-corridor.webp"
                alt="Corredor arquitetonico moderno com teto de vidro geometrico e paredes curvas"
                fill
                className="object-cover scale-110 transition-transform duration-700 group-hover:scale-115"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Front/left image - smaller, overlapping */}
            <div
              ref={img1Ref}
              className="relative z-10 w-[55%] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group border border-white/5"
            >
              <Image
                src="/images/amenities-gym.webp"
                alt="Estudio de fitness moderno com janelas do chao ao teto e equipamentos de exercicio"
                fill
                className="object-cover scale-110 transition-transform duration-700 group-hover:scale-115"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
