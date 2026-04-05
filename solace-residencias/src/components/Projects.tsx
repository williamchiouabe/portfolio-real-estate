"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  description: string;
  images: { src: string; alt: string }[];
}

const projects: Project[] = [
  {
    name: "LUMIERE DUPLEX RESIDENCIAS",
    description:
      "Apartamentos duplex de luxo com espacos iluminados, terracos privativos e uma selecao de comodidades exclusivas.",
    images: [
      {
        src: "/images/project-1a.webp",
        alt: "Area de estar com iluminacao pendente elegante",
      },
      {
        src: "/images/project-1b.webp",
        alt: "Quarto moderno com cabeceira em madeira",
      },
      {
        src: "/images/project-1c.webp",
        alt: "Sala de estar contemporanea com materiais nobres",
      },
    ],
  },
  {
    name: "SOLARA PENTHOUSE COLLECTION",
    description:
      "Coberturas exclusivas com vistas panoramicas, acabamentos premium e espacos integrados de convivencia.",
    images: [
      {
        src: "/images/project-2a.webp",
        alt: "Cobertura com vista panoramica da cidade",
      },
      {
        src: "/images/project-2b.webp",
        alt: "Sala de jantar com design contemporaneo",
      },
      {
        src: "/images/project-2c.webp",
        alt: "Terraco privativo com lounge ao ar livre",
      },
    ],
  },
  {
    name: "VERDANA GARDEN VILLAS",
    description:
      "Villas com jardins privativos, integracao com a natureza e arquitetura sustentavel de alto padrao.",
    images: [
      {
        src: "/images/project-3a.webp",
        alt: "Villa com jardim privativo e piscina",
      },
      {
        src: "/images/project-3b.webp",
        alt: "Interior com acabamentos em madeira natural",
      },
      {
        src: "/images/project-3c.webp",
        alt: "Espaco gourmet integrado ao jardim",
      },
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimating = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current || index === activeIndex) return;
      isAnimating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      tl.to(
        [imagesContainerRef.current, titleRef.current, descRef.current],
        {
          opacity: 0,
          x: -30,
          duration: 0.3,
          ease: "power2.in",
        }
      );

      tl.call(() => setActiveIndex(index));

      tl.fromTo(
        [imagesContainerRef.current, titleRef.current, descRef.current],
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08,
        }
      );
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % projects.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + projects.length) % projects.length);
  }, [activeIndex, goTo]);

  // Auto-play carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating.current) {
        goNext();
      }
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Animate on section enter
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-content", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const project = projects[activeIndex];

  return (
    <section ref={sectionRef} id="projetos" className="px-4 md:px-8 py-4">
      <div className="bg-card rounded-[16px] border border-border py-12 md:py-16 px-8 md:px-12 lg:px-16 card-glow">
        <div className="max-w-[1400px] mx-auto project-content">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted font-light">
                (NOSSOS PROJETOS)
              </span>
              <div className="accent-line" />
            </div>
            <div className="flex items-center gap-2">
              {/* Prev/Next arrows */}
              <button
                onClick={goPrev}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-accent/50 hover:text-accent transition-all duration-400 cursor-pointer"
                aria-label="Projeto anterior"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M7.5 2.5L4 6l3.5 3.5" />
                </svg>
              </button>
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-8 h-8 rounded-full border text-[10px] font-sans flex items-center justify-center transition-all duration-500 cursor-pointer ${
                    i === activeIndex
                      ? "bg-accent text-primary border-accent"
                      : "bg-transparent text-white/40 border-white/15 hover:border-accent/40 hover:text-accent"
                  }`}
                  aria-label={`Projeto ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={goNext}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-accent/50 hover:text-accent transition-all duration-400 cursor-pointer"
                aria-label="Proximo projeto"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4.5 2.5L8 6l-3.5 3.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Project Title */}
          <h2
            ref={titleRef}
            className="font-serif italic text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] text-white text-center mb-10 leading-tight"
          >
            {project.name}
          </h2>

          {/* Images */}
          <div
            ref={imagesContainerRef}
            className="flex gap-3 mb-8 h-[300px] sm:h-[400px] md:h-[500px]"
          >
            {project.images.map((img, i) => (
              <div
                key={`${activeIndex}-${i}`}
                className={`relative rounded-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] group ${
                  i === 1 ? "flex-[1.2]" : "flex-1"
                } ${i === 2 ? "hidden sm:block" : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Hover overlay with golden accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Bottom - Description + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p
              ref={descRef}
              className="font-sans text-sm text-text-secondary max-w-[500px] font-light leading-[1.8]"
            >
              {project.description}
            </p>
            <a
              href="#contato"
              className="inline-flex items-center px-6 py-2.5 bg-accent text-primary rounded-full text-[10px] uppercase tracking-[0.12em] font-medium hover:bg-accent-light transition-all duration-500 shrink-0 btn-shimmer"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
