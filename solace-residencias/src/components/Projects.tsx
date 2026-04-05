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
    name: "LUMIÈRE DUPLEX RESIDÊNCIAS",
    description:
      "Apartamentos duplex de luxo com espaços iluminados, terraços privativos e uma seleção de comodidades exclusivas.",
    images: [
      {
        src: "/images/project-1a.webp",
        alt: "Área de estar com iluminação pendente elegante",
      },
      {
        src: "/images/project-1b.webp",
        alt: "Quarto moderno com cabeceira em madeira",
      },
      {
        src: "/images/project-1c.webp",
        alt: "Sala de estar contemporânea com materiais nobres",
      },
    ],
  },
  {
    name: "SOLARA PENTHOUSE COLLECTION",
    description:
      "Coberturas exclusivas com vistas panorâmicas, acabamentos premium e espaços integrados de convivência.",
    images: [
      {
        src: "/images/project-2a.webp",
        alt: "Cobertura com vista panorâmica da cidade",
      },
      {
        src: "/images/project-2b.webp",
        alt: "Sala de jantar com design contemporâneo",
      },
      {
        src: "/images/project-2c.webp",
        alt: "Terraço privativo com lounge ao ar livre",
      },
    ],
  },
  {
    name: "VERDANA GARDEN VILLAS",
    description:
      "Villas com jardins privativos, integração com a natureza e arquitetura sustentável de alto padrão.",
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
        alt: "Espaço gourmet integrado ao jardim",
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

      // Fade out current content
      tl.to(
        [imagesContainerRef.current, titleRef.current, descRef.current],
        {
          opacity: 0,
          x: -30,
          duration: 0.3,
          ease: "power2.in",
        }
      );

      // Switch index
      tl.call(() => setActiveIndex(index));

      // Fade in new content
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
      <div className="bg-card rounded-[16px] border border-border py-12 md:py-16 px-8 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto project-content">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-10">
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-muted">
              (NOSSOS PROJETOS)
            </span>
            <div className="flex items-center gap-3">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-8 h-8 rounded-full border text-xs font-sans flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? "bg-white text-primary border-white"
                      : "bg-transparent text-white/50 border-white/30 hover:border-white/60"
                  }`}
                  aria-label={`Projeto ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
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
            className="flex gap-4 mb-8 h-[300px] sm:h-[400px] md:h-[500px]"
          >
            {project.images.map((img, i) => (
              <div
                key={`${activeIndex}-${i}`}
                className={`relative rounded-lg overflow-hidden transition-transform duration-400 hover:scale-[1.03] ${
                  i === 1 ? "flex-[1.2]" : "flex-1"
                } ${i === 2 ? "hidden sm:block" : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Bottom - Description + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p
              ref={descRef}
              className="font-sans text-sm text-text-secondary max-w-[500px]"
            >
              {project.description}
            </p>
            <a
              href="#contato"
              className="inline-flex items-center px-6 py-2.5 bg-btn-light text-btn-text rounded-full text-xs uppercase tracking-[0.1em] hover:bg-white transition-all duration-300 shrink-0"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
