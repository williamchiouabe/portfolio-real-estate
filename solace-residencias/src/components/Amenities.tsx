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
      // Text slide-in from left
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

      // Right image (back) reveals first
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

      // Left image (front) slides in with delay
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

      // Parallax on images
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
      <div className="bg-card rounded-[16px] border border-border overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
          {/* Left - Text */}
          <div
            ref={textRef}
            className="lg:w-[35%] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
          >
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

            <p className="amenity-text font-sans text-sm text-text-secondary leading-relaxed mb-8">
              De estúdios privativos de fitness a sessões guiadas de meditação,
              nossas comodidades são projetadas para aprimorar seu bem-estar e
              promover um senso de harmonia.
            </p>

            <a
              href="#contato"
              className="amenity-text inline-flex items-center self-start px-6 py-2.5 bg-btn-light text-btn-text rounded-full text-xs uppercase tracking-[0.1em] hover:bg-white transition-all duration-300"
            >
              Saiba Mais
            </a>
          </div>

          {/* Right - Overlapping Images */}
          <div className="lg:w-[65%] relative p-8 md:p-12 flex items-center min-h-[400px]">
            {/* Back/right image - larger */}
            <div
              ref={img2Ref}
              className="absolute right-0 top-4 bottom-4 w-[65%] rounded-xl overflow-hidden"
            >
              <Image
                src="/images/amenities-corridor.webp"
                alt="Corredor arquitetônico moderno com teto de vidro geométrico e paredes curvas"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Front/left image - smaller, overlapping */}
            <div
              ref={img1Ref}
              className="relative z-10 w-[55%] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/amenities-gym.webp"
                alt="Estúdio de fitness moderno com janelas do chão ao teto e equipamentos de exercício"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
