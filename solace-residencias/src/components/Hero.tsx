"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Header from "./Header";

gsap.registerPlugin(ScrollTrigger);

function SolaceTitle() {
  // Pattern: S=outline, O=solid, L=outline, A=solid, C=outline, E=solid
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
              ? { WebkitTextStroke: "2px white" }
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
      {/* Background Image - 100vh */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-exterior.webp"
          alt="Casa de luxo moderna ao entardecer com revestimento em madeira escura e amplas janelas de vidro"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full px-10 md:px-14 lg:px-16"
      >
        {/* Bottom composition - no centering container, starts from left padding */}
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

            {/* Right - Subtitle & Description, aligned to vertical center of title */}
            <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 max-w-[300px] lg:max-w-[320px] mt-6 md:mt-0">
              <h2 className="font-serif italic text-[18px] md:text-[20px] lg:text-[22px] text-white tracking-[0.03em] mb-4 uppercase leading-[1.35] text-left">
                Luxo Holístico em Perfeita Harmonia
              </h2>
              <p className="font-sans text-[13px] md:text-[14px] text-white/85 leading-[1.65] text-left">
                Bem-vindo à Solace Residências, onde design atemporal, vida
                focada no bem-estar e enriquecimento cultural convergem em
                unidade para criar um santuário incomparável de elegância e
                serenidade.
              </p>
            </div>
          </div>
        </div>

        {/* DESLIZE - absolute bottom center of viewport */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <span className="font-sans text-[11px] uppercase tracking-[5px] text-white">
            Deslize
          </span>
        </div>
      </div>
    </section>
  );
}
