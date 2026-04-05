"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const previewCards = [
  {
    src: "/images/about-living-room.webp",
    alt: "Preview sala de estar",
    className: "top-[5%] left-[5%] w-[20%] h-[25%]",
    slideX: "-120%",
    slideY: "-80%",
  },
  {
    src: "/images/project-1b.webp",
    alt: "Preview quarto",
    className: "top-[5%] right-[5%] w-[20%] h-[25%]",
    slideX: "120%",
    slideY: "-80%",
  },
  {
    src: "/images/values-interior.webp",
    alt: "Preview valores",
    className: "top-[8%] left-[30%] w-[15%] h-[18%]",
    slideX: "0%",
    slideY: "-120%",
  },
  {
    src: "/images/amenities-gym.webp",
    alt: "Preview academia",
    className: "bottom-[5%] left-[5%] w-[25%] h-[20%]",
    slideX: "-120%",
    slideY: "80%",
  },
  {
    src: "/images/amenities-corridor.webp",
    alt: "Preview corredor",
    className: "bottom-[5%] right-[8%] w-[28%] h-[20%]",
    slideX: "120%",
    slideY: "80%",
  },
];

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      // Initial state: zoomed out
      gsap.set(containerRef.current, {
        scale: 0.45,
        transformOrigin: "center center",
      });

      // Cards start visible
      gsap.set(cardsRef.current, { opacity: 1, x: 0, y: 0 });

      // Zoom in the main content
      tl.to(containerRef.current, {
        scale: 1,
        duration: 1.8,
        ease: "power4.inOut",
      });

      // Simultaneously slide cards outward and fade
      tl.to(
        cardsRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.05,
        },
        "-=1.4"
      );

      // Slide each card in its specific direction
      previewCards.forEach((card, i) => {
        tl.to(
          cardsRef.current[i],
          {
            x: card.slideX,
            y: card.slideY,
            duration: 1,
            ease: "power2.in",
          },
          "-=1.8"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {!animationComplete && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {previewCards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`intro-preview-card absolute ${card.className} rounded-2xl overflow-hidden opacity-0`}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>
          ))}
        </div>
      )}
      <div ref={containerRef}>{children}</div>
    </div>
  );
}
