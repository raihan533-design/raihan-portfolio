"use client"

import React from "react"
import { useSiteContent } from "@/context/ContentContext"
import LanyardBadge from "@/components/ui/lanyard-badge"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles, MapPin, Phone, Mail } from "lucide-react"

export default function AboutSection() {
  const { content } = useSiteContent()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const highlights = [
    "Fast delivery (2–4 days for most websites)",
    "Budget-friendly pricing with no hidden fees",
    "Modern tech: Next.js, Tailwind CSS, TypeScript",
    "Mobile-first, 100% responsive on all screens",
    "Assistance with domain setup & cloud hosting",
  ]

  return (
    <section id="about" className="relative py-20 md:py-32 border-t border-white/5 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300 w-fit mb-4">
              <Sparkles className="size-3.5 text-amber-400" />
              <span>About Raihan Sorwar</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              {content.about.title || "Websites, Made Simple"}
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
              {content.about.text ||
                "Hi, I'm Raihan Sorwar, a website developer from Chittagong, Bangladesh. I specialize in building fast, beautiful, and affordable websites for businesses and creators using modern AI tools and clean code."}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-400 mb-8">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-neutral-500" />
                {content.site.location || "Chittagong, Bangladesh"}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="size-4 text-neutral-500" />
                {content.site.phone || "01643684240"}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="size-4 text-neutral-500" />
                {content.site.email || "raihansarwar533@gmail.com"}
              </span>
            </div>

            {/* Value checklist */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">AI Assisted</Badge>
              <Badge variant="secondary">E-commerce</Badge>
              <Badge variant="secondary">Responsive Design</Badge>
            </div>
          </div>

          {/* Right Column: Interactive 3D Lanyard Badge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[340px] sm:max-w-[380px] rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-3 left-4 text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                Interactive ID Badge
              </div>
              {mounted ? (
                <LanyardBadge
                  title={content.about.title || "Websites, Made Simple"}
                  subtitle={content.about.subtitle || "Website Developer · Chittagong"}
                  name={content.site.name || "Raihan Sorwar"}
                  role={content.site.role || "Website Developer"}
                  height="460px"
                  cardWidth={220}
                />
              ) : (
                <div className="h-[460px] w-full rounded-2xl bg-neutral-900/40 border border-white/5 animate-pulse" />
              )}
              <p className="text-center text-[11px] font-mono text-neutral-500 tracking-wider uppercase mt-2">
                Drag to swing · Click to flip badge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
