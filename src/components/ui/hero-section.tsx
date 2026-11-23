'use client';

import React from 'react';
import { useSiteContent } from '@/context/ContentContext';

export default function HeroSection() {
  const { content } = useSiteContent();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setMenuOpen(false);
    }

    if (menuOpen) {
      document.addEventListener('keydown', onKey);
      document.addEventListener('click', onClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <section className="relative w-full overflow-hidden text-sm pb-24 md:pb-36 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-neutral-100 border-b border-white/10">
      {/* Background glow and subtle mesh texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Top Navbar */}
      <nav className="relative z-30 flex items-center justify-between p-4 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <a href="#" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            {content.site.name || "Raihan Sorwar"}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div
          id="menu"
          ref={menuRef}
          className={[
            'max-md:fixed max-md:inset-0 max-md:z-50 max-md:transition-all max-md:duration-300 max-md:bg-black/90 max-md:backdrop-blur-xl',
            'flex items-center gap-8 font-medium',
            'max-md:flex-col max-md:justify-center max-md:gap-6 text-base md:text-sm',
            menuOpen ? 'max-md:opacity-100 max-md:pointer-events-auto' : 'max-md:opacity-0 max-md:pointer-events-none md:opacity-100',
          ].join(' ')}
          aria-hidden={!menuOpen}
        >
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#services"
            onClick={() => setMenuOpen(false)}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Services
          </a>
          <a
            href="#work"
            onClick={() => setMenuOpen(false)}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Work
          </a>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Contact
          </a>

          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden mt-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full font-medium transition"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <a
          href={`https://wa.me/${content.site.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center bg-white hover:bg-white/90 text-neutral-950 px-5 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow active:scale-95 text-xs sm:text-sm"
        >
          Contact Us
        </a>

        <button
          id="open-menu"
          onClick={() => setMenuOpen(true)}
          className="md:hidden bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-lg font-medium transition"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <path d="M4 6h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Body */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 md:mt-20">
        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 backdrop-blur-md hover:border-white/30 rounded-full px-4 py-1.5 transition-colors">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm text-neutral-300">
            {content.hero.announcement || "Now taking new website orders"}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto mt-6 leading-tight">
          {content.hero.title || "I Build Fast, Modern Websites at Low Cost"}
        </h1>

        {/* Sub-text */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mt-5 leading-relaxed">
          {content.hero.description || "I make good websites cheaply with AI — blog, portfolio and e-commerce websites for your business."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <a
            href="#work"
            className="bg-white hover:bg-neutral-100 text-neutral-950 font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-95"
          >
            {content.hero.primaryButtonText || "See My Work"}
          </a>
          <a
            href={content.hero.secondaryButtonLink || `https://wa.me/${content.site.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full text-sm transition-all active:scale-95"
          >
            <span>{content.hero.secondaryButtonText || "Contact Me"}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
