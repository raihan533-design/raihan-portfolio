"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSiteContent } from "@/context/ContentContext"

interface CTAProps {
  badge?: {
    text: string
  }
  title?: string
  description?: string
  action?: {
    text: string
    href: string
    variant?: "default" | "glow"
  }
  withGlow?: boolean
  className?: string
}

export function CTASection({
  badge,
  title,
  description,
  action,
  withGlow = true,
  className,
}: CTAProps) {
  const { content } = useSiteContent()

  const finalBadge = badge?.text || content.cta.badge || "Order now"
  const finalTitle = title || content.cta.title || "Want a website for your business?"
  const finalDescription = description || content.cta.description || "Contact me today and get a high-quality website at low cost."
  const finalAction = {
    text: action?.text || content.cta.buttonText || "Contact Me",
    href: action?.href || content.cta.buttonLink || `https://wa.me/${content.site.whatsapp.replace(/[^0-9]/g, '')}`,
    variant: action?.variant || "glow",
  }

  return (
    <section id="contact" className={cn("relative overflow-hidden py-16 md:py-24 border-t border-white/5 bg-gradient-to-b from-transparent via-neutral-900/40 to-neutral-950", className)}>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-12 text-center sm:gap-8 md:py-20 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
        {/* Glow behind box */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),transparent_70%)] pointer-events-none" />

        {/* Badge */}
        {finalBadge && (
          <Badge
            variant="outline"
            className="border-white/20 bg-white/5 text-neutral-300 px-4 py-1 text-xs"
          >
            <span>{finalBadge}</span>
          </Badge>
        )}

        {/* Title */}
        <h2 className="text-3xl font-bold sm:text-5xl tracking-tight text-white max-w-2xl">
          {finalTitle}
        </h2>

        {/* Description */}
        {finalDescription && (
          <p className="text-neutral-400 max-w-xl text-sm sm:text-base leading-relaxed">
            {finalDescription}
          </p>
        )}

        {/* Action Button */}
        <Button
          variant={finalAction.variant || "glow"}
          size="lg"
          className="rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-105 active:scale-95"
          asChild
        >
          <a
            href={finalAction.href}
            target={finalAction.href.startsWith("http") ? "_blank" : undefined}
            rel={finalAction.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {finalAction.text}
          </a>
        </Button>
      </div>
    </section>
  )
}

export default CTASection
