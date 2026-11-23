"use client";

import React, { useState, useEffect } from "react";
import { useSiteContent } from "@/context/ContentContext";
import BottomNavBar from "@/components/ui/bottom-nav-bar";

export default function HeaderNavbar() {
  const { content } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand Name (R logo removed) */}
        <a
          href="#"
          className={`pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
            scrolled
              ? "bg-neutral-900/80 backdrop-blur-md border-white/15 shadow-lg"
              : "bg-transparent border-transparent"
          }`}
        >
          <span className="font-semibold text-sm tracking-tight text-white hover:text-neutral-200 transition-colors">
            {content.site.name || "Raihan Sorwar"}
          </span>
        </a>

        {/* Desktop Centered Floating Navbar */}
        <div className="pointer-events-auto hidden md:block">
          <BottomNavBar stickyBottom={false} className="shadow-lg" />
        </div>

        {/* Right CTA Button */}
        <a
          href={`https://wa.me/${content.site.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Contact</span>
        </a>
      </div>
    </header>
  );
}
