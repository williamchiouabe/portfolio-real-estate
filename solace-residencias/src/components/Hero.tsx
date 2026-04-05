"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Header from "./Header";

gsap.registerPlugin(ScrollTrigger);

function SolaceTitle() {
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
          className={`inline-block transition-transform duration-700 hover:scale-105 ${l.outline ? "text-transparent" : "text-white"}`}
          style={
            l.outline
              ? { WebkitTextStroke: "1.5px rgba(255,255,255,0.85)" }
              : undefined
          }
        >
          {l.char}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on hero image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Title fade out on scroll
      gsap.to(titleRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      // Content fade out on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-exterior.webp"
          alt="Casa de luxo moderna ao entardecer com revestimento em madeira escura e amplas janelas de vidro"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full px-10 md:px-14 lg:px-16"
      >
        {/* Bottom composition */}
        <div className="absolute bottom-[18%] md:bottom-[20%] left-0 right-0 px-10 md:px-14 lg:px-16">
          <div className="relative">
            {/* Left - SOLACE title */}
            <div ref={titleRef}>
              <h1
                className="font-serif text-[72px] sm:text-[110px] md:text-[140px] lg:text-[180px] xl:text-[210px] font-normal uppercase leading-[0.82] tracking-[-0.03em] inline-block"
                aria-label="SOLACE"
              >
                <SolaceTitle />
              </h1>
            </div>

            {/* Right - Subtitle & Description */}
            <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 max-w-[300px] lg:max-w-[320px] mt-6 md:mt-0">
              {/* Golden accent line */}
              <div className="accent-line mb-5" />
              <h2 className="font-serif italic text-[18px] md:text-[20px] lg:text-[22px] text-white tracking-[0.03em] mb-4 uppercase leading-[1.35] text-left">
                Luxo Holistico em Perfeita Harmonia
              </h2>
              <p className="font-sans text-[13px] md:text-[14px] text-white/70 leading-[1.75] text-left font-light">
                Bem-vindo a Solace Residencias, onde design atemporal, vida
                focada no bem-estar e enriquecimento cultural convergem em
                unidade para criar um santuario incomparavel de elegancia e
                serenidade.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator - animated golden line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 font-light">
            Deslize
          </span>
          <div className="w-px h-8 bg-white/10 relative overflow-hidden">
            <div className="w-full h-full bg-accent/60 scroll-indicator-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
