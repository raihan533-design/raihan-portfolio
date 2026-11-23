"use client";

import React from "react";
import HeaderNavbar from "@/components/ui/header-navbar";
import OrbitalGalleryHero from "@/components/ui/orbital-gallery-hero";
import BottomNavBar from "@/components/ui/bottom-nav-bar";
import AboutSection from "@/components/ui/about-section";
import ServicesAndProjectsSection from "@/components/ui/services-and-projects-section";
import StatsSection from "@/components/ui/stats-section";
import Faq06 from "@/components/ui/faq-06";
import CTASection from "@/components/ui/cta-with-rectangle";
import CinematicFooter from "@/components/ui/motion-footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col">
      {/* Top Navbar */}
      <HeaderNavbar />

      {/* 1. New Orbital Gallery Hero Section */}
      <OrbitalGalleryHero />

      {/* 2. Floating Mobile Bottom Nav */}
      <BottomNavBar stickyBottom={true} className="md:hidden" />

      {/* 3. About (with interactive 3D Lanyard Badge) */}
      <AboutSection />

      {/* 4, 5, 6. Services (Glass folders) -> Project Cards (Notched Cards) -> Pagination (Tactile Pagination) */}
      <ServicesAndProjectsSection />

      {/* 7. Stats / Peak Chart (Market Card) */}
      <StatsSection />

      {/* 8. FAQ Accordion */}
      <Faq06 />

      {/* 9. CTA with glow */}
      <CTASection />

      {/* 10. Motion Footer with parallax reveal & giant text */}
      <CinematicFooter />
    </main>
  );
}
