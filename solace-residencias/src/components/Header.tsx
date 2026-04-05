"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-10 md:px-14 lg:px-16 py-5">
        {/* Left - Brand */}
        <a href="#" className="flex flex-col group">
          <span className="font-serif text-[14px] md:text-[15px] tracking-[0.12em] text-white/90 uppercase transition-colors duration-300 group-hover:text-accent">
            SOLACE
          </span>
          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.18em] text-white/40 uppercase font-light">
            RESIDENCIAS
          </span>
        </a>

        {/* Right - CTA + Menu */}
        <div className="flex items-center gap-4">
          <a
            href="#contato"
            className="hidden md:inline-flex items-center px-6 py-2 rounded-full text-white text-[10px] uppercase tracking-[0.12em] border border-white/20 hover:border-accent/50 hover:text-accent transition-all duration-500 btn-shimmer"
          >
            Agende uma visita
          </a>
          <div className="hidden md:block w-px h-5 bg-white/15" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] w-[22px] cursor-pointer group"
            aria-label="Menu"
          >
            <span
              className={`block h-[1px] bg-white/80 transition-all duration-500 group-hover:bg-accent ${menuOpen ? "rotate-45 translate-y-[6px] bg-accent!" : ""} w-full`}
            />
            <span
              className={`block h-[1px] bg-white/80 transition-all duration-500 group-hover:bg-accent ${menuOpen ? "opacity-0" : ""} w-full`}
            />
            <span
              className={`block h-[1px] bg-white/80 transition-all duration-500 group-hover:bg-accent ${menuOpen ? "-rotate-45 -translate-y-[6px] bg-accent!" : ""} w-full`}
            />
          </button>
        </div>
      </div>

      {/* Bottom accent line - appears on scroll */}
      <div
        className={`h-px transition-all duration-700 ${
          scrolled
            ? "bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            : "bg-white/10"
        }`}
      />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 bg-primary/98 backdrop-blur-lg z-30 flex flex-col items-center justify-center gap-10 transition-all duration-700 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-10 md:right-14 lg:right-16 flex flex-col gap-[5px] w-[22px] cursor-pointer"
          aria-label="Fechar menu"
        >
          <span className="block h-[1px] bg-accent rotate-45 translate-y-[6px] w-full" />
          <span className="block h-[1px] bg-accent opacity-0 w-full" />
          <span className="block h-[1px] bg-accent -rotate-45 -translate-y-[6px] w-full" />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {[
            { label: "Sobre", href: "#sobre" },
            { label: "Projetos", href: "#projetos" },
            { label: "Valores", href: "#valores" },
          ].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white font-serif text-3xl md:text-4xl italic hover:text-accent transition-colors duration-500 relative group"
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="mt-4 px-8 py-3 border border-accent/50 rounded-full text-accent text-[11px] uppercase tracking-[0.15em] hover:bg-accent hover:text-primary transition-all duration-500 btn-shimmer"
          onClick={() => setMenuOpen(false)}
        >
          Agende uma visita
        </a>

        {/* Decorative accent */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 accent-line opacity-40" />
      </div>
    </header>
  );
}
