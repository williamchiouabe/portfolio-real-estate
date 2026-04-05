import { gsap } from "gsap";

export const EASING = {
  reveal: "power2.out",
  smooth: "power3.inOut",
  intro: "power4.inOut",
  counter: "power2.out",
} as const;

export const DURATION = {
  textReveal: 0.6,
  imageReveal: 0.8,
  introZoom: 1.8,
  counter: 2.2,
  carousel: 0.6,
  stagger: 0.15,
} as const;

export function createTextReveal(
  elements: Element | Element[] | NodeListOf<Element>,
  trigger: Element,
  options?: { stagger?: number; y?: number }
) {
  return gsap.from(elements, {
    y: options?.y ?? 40,
    opacity: 0,
    duration: DURATION.textReveal,
    stagger: options?.stagger ?? DURATION.stagger,
    ease: EASING.reveal,
    scrollTrigger: {
      trigger,
      start: "top 70%",
      toggleActions: "play none none none",
    },
  });
}

export function createImageReveal(
  element: Element,
  trigger: Element,
  direction: "bottom" | "left" = "bottom"
) {
  const clipFrom =
    direction === "bottom"
      ? "inset(100% 0 0 0)"
      : "inset(0 100% 0 0)";

  return gsap.fromTo(
    element,
    { clipPath: clipFrom },
    {
      clipPath: "inset(0 0 0 0)",
      duration: DURATION.imageReveal,
      ease: EASING.reveal,
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function createParallax(
  element: Element,
  trigger: Element,
  speed: number = 0.5
) {
  const yPercent = speed * 20;
  return gsap.fromTo(
    element,
    { yPercent: -yPercent },
    {
      yPercent: yPercent,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}
