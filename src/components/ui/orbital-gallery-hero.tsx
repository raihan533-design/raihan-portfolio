"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/context/ContentContext";

export function OrbitalGalleryHero() {
  const { content } = useSiteContent();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const heroImages =
    content.hero.images && content.hero.images.length > 0
      ? content.hero.images
      : [
          "https://cdn.21st.dev/assets/localized/8e3dbc28350f201450dc7eab5b544524dd01f513d6c2454b5e260645af4b25c2.jpg",
          "https://cdn.21st.dev/assets/localized/c4469ba3a7967f34998ac35c47e970a0e901aeb6b6732ad96633951192eb16b2.jpg",
          "https://cdn.21st.dev/assets/localized/4ee211c5d7a642c17f71f80018a2c3cc830cd08b043bfbb25467e73721c57a1f.jpg",
          "https://cdn.21st.dev/assets/localized/a05b5608c5d4e915cf92a32947c759567ae69256ead3c03184d4f49b70275839.jpg",
          "https://cdn.21st.dev/assets/localized/b213ce44782be874e4d4d4daafec6868494fffae59ddc54513de1d30ac181e9c.jpg",
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600",
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600",
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
        ];

  const features =
    content.hero.features && content.hero.features.length >= 3
      ? content.hero.features
      : [
          {
            title: "Fast Turnaround",
            description: "Standard blog & portfolio delivered in 2–4 days.",
          },
          {
            title: "AI + Handcrafted",
            description: "Modern tech stack at budget-friendly cost.",
          },
          {
            title: "100% Mobile Ready",
            description: "Flawless responsiveness across all devices.",
          },
        ];

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#0a0a0c] text-white flex items-center justify-center pt-24 pb-16">
      {/* Background glow and subtle mesh texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(120,119,198,0.14),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />

      {/* Orbiting Rotating Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10 flex items-center justify-center">
        {mounted && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-full w-full"
            style={{
              x: "-50%",
              y: "-50%",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {heroImages.map((src, index) => {
              const angle = (index * 360) / heroImages.length;
              // Responsive radius based on screen size via css variable or calculated values
              const radiusX = 480;
              const radiusY = 480;

              const x = Math.cos((angle * Math.PI) / 180) * radiusX;
              const y = Math.sin((angle * Math.PI) / 180) * radiusY;

              return (
                <div
                  key={`${src}-${index}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  {/* COUNTER ROTATION */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 45,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="h-24 sm:h-28 w-40 sm:w-48 overflow-hidden rounded-xl border border-white/15 shadow-2xl bg-neutral-900/90 backdrop-blur-sm opacity-60 hover:opacity-100 transition-opacity">
                      <img
                        src={src}
                        alt={`Showcase ${index + 1}`}
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* CENTER CONTENT - STATIC */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center max-w-4xl mx-auto my-auto">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-neutral-300 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{content.hero.announcement || "Now taking new website orders"}</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-[780px] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]">
          {content.hero.title || "I Build Fast, Modern Websites at Low Cost"}
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-[560px] text-sm sm:text-base leading-relaxed text-neutral-400">
          {content.hero.description ||
            "I make good websites cheaply with AI — blog, portfolio and e-commerce websites for your business."}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <a
            href={content.hero.primaryButtonLink || "#work"}
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-neutral-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            {content.hero.primaryButtonText || "See My Work"}
          </a>
          <a
            href={content.hero.secondaryButtonLink || "#contact"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <span>{content.hero.secondaryButtonText || "Contact Me"}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* 3 Bottom Feature Highlights */}
        <div className="mt-14 grid w-full max-w-[680px] grid-cols-1 md:grid-cols-3 border-t border-white/10 pt-8 gap-4 md:gap-0">
          <div className="px-4 text-center">
            <h3 className="font-semibold text-sm sm:text-base text-white">
              {features[0]?.title || "Fast Turnaround"}
            </h3>
            <p className="mt-1.5 text-xs text-neutral-400 leading-normal">
              {features[0]?.description || "Standard blog & portfolio delivered in 2–4 days."}
            </p>
          </div>

          <div className="border-t md:border-t-0 md:border-x border-white/10 pt-4 md:pt-0 px-4 text-center">
            <h3 className="font-semibold text-sm sm:text-base text-white">
              {features[1]?.title || "AI + Handcrafted"}
            </h3>
            <p className="mt-1.5 text-xs text-neutral-400 leading-normal">
              {features[1]?.description || "Modern tech stack at budget-friendly cost."}
            </p>
          </div>

          <div className="border-t md:border-t-0 pt-4 md:pt-0 px-4 text-center">
            <h3 className="font-semibold text-sm sm:text-base text-white">
              {features[2]?.title || "100% Mobile Ready"}
            </h3>
            <p className="mt-1.5 text-xs text-neutral-400 leading-normal">
              {features[2]?.description || "Flawless responsiveness across all devices."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrbitalGalleryHero;
