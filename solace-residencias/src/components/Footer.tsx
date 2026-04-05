"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function SolaceFooterTitle() {
  const letters = [
    { char: "S", outline: true },
    { char: "O", outline: false },
    { char: "L", outline: true },
    { char: "A", outline: false },
    { char: "C", outline: true },
    { char: "E", outline: false },
  ];

  return (
    <>
      {letters.map((l, i) => (
        <span
          key={i}
          className={l.outline ? "text-transparent" : "text-white"}
          style={
            l.outline
              ? { WebkitTextStroke: "1.5px rgba(255,255,255,0.6)" }
              : undefined
          }
        >
          {l.char}
        </span>
      ))}
    </>
  );
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-exterior.webp"
          alt="Casa de luxo moderna ao entardecer"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        {/* Golden vignette at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 md:pb-24">
        {/* CTA before title */}
        <div className="mb-12 text-center">
          <p className="font-sans text-sm text-white/50 mb-6 font-light tracking-wide">
            Descubra o seu santuario
          </p>
          <a
            href="#contato"
            className="inline-flex items-center px-8 py-3 border border-accent/50 rounded-full text-accent text-[11px] uppercase tracking-[0.15em] hover:bg-accent hover:text-primary transition-all duration-500 btn-shimmer"
          >
            Agende uma visita exclusiva
          </a>
        </div>

        {/* Golden divider */}
        <div className="section-divider w-[120px] mb-10" />

        <div ref={titleRef} className="text-center">
          <h2 className="font-serif text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-normal uppercase leading-[0.85] tracking-[-0.03em]">
            <SolaceFooterTitle />
          </h2>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.35em] text-white/40 uppercase mt-3 font-light">
            RESIDENCIAS
          </p>
        </div>

        {/* Footer bottom */}
        <div className="absolute bottom-6 left-0 right-0 px-8 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 font-sans text-[10px] font-light tracking-wider">
            <span>&copy; 2026 Solace Residencias. Todos os direitos reservados.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-accent transition-colors duration-500">
                Politica de Privacidade
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-500">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
