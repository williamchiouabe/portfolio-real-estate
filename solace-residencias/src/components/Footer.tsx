"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand name scales up as user scrolls to bottom
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contato"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image (same as hero for bookend effect) */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-exterior.webp"
          alt="Casa de luxo moderna ao entardecer"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 md:pb-24">
        <div ref={titleRef} className="text-center">
          <h2 className="font-serif text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-normal text-white uppercase leading-[0.85] tracking-[-0.03em]">
            SOLACE
          </h2>
          <p className="font-sans text-sm md:text-base tracking-[0.3em] text-white/60 uppercase mt-2">
            RESIDÊNCIAS
          </p>
        </div>

        {/* Footer bottom */}
        <div className="absolute bottom-6 left-0 right-0 px-8 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 font-sans text-xs">
            <span>&copy; 2026 Solace Residências. Todos os direitos reservados.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
