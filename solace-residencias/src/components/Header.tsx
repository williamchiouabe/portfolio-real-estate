"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-10 md:px-14 lg:px-16 py-5">
        {/* Left - Brand */}
        <div className="flex flex-col">
          <span className="font-serif text-[14px] md:text-[15px] tracking-[0.12em] text-white/90 uppercase">
            SOLACE
          </span>
          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.18em] text-white/40 uppercase">
            RESIDÊNCIAS
          </span>
        </div>

        {/* Right - CTA + Menu */}
        <div className="flex items-center gap-4">
          <a
            href="#contato"
            className="hidden md:inline-flex items-center px-6 py-2 bg-[#1a2030] rounded-full text-white text-[11px] uppercase tracking-[0.1em] hover:bg-[#2a3040] transition-all duration-300"
          >
            Agende uma visita
          </a>
          <div className="hidden md:block w-px h-5 bg-white/20" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] w-[22px] cursor-pointer group"
            aria-label="Menu"
          >
            <span
              className={`block h-[1px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""} w-full`}
            />
            <span
              className={`block h-[1px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""} w-full`}
            />
            <span
              className={`block h-[1px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""} w-full`}
            />
          </button>
        </div>
      </div>

      {/* Divider - full width */}
      <div className="w-full h-px bg-white/15" />

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 bg-primary/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-8 md:hidden">
          <a
            href="#sobre"
            className="text-white font-serif text-2xl italic hover:text-accent transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </a>
          <a
            href="#projetos"
            className="text-white font-serif text-2xl italic hover:text-accent transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Projetos
          </a>
          <a
            href="#valores"
            className="text-white font-serif text-2xl italic hover:text-accent transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Valores
          </a>
          <a
            href="#contato"
            className="mt-4 px-8 py-3 border border-white rounded-full text-white text-sm uppercase tracking-[0.1em] hover:bg-white hover:text-primary transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Agende uma visita
          </a>
        </div>
      )}
    </header>
  );
}
