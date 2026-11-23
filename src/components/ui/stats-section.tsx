"use client"

import React from "react"
import { useSiteContent } from "@/context/ContentContext"
import MarketCard from "@/components/ui/market-card"
import { Award, Zap, Smile } from "lucide-react"

export default function StatsSection() {
  const { content } = useSiteContent()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const mainStat = content.stats[0] || {
    label: "Websites Delivered",
    value: "25+",
    delta: "+5 new this quarter",
  }

  const otherStats = content.stats.slice(1)

  return (
    <section className="relative py-20 md:py-28 border-t border-white/5 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300 mb-4">
            <Award className="size-3.5 text-blue-400" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Numbers That Speak Quality
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Delivering high-converting, mobile-ready websites quickly and affordably.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Peak Chart Card */}
          <div className="lg:col-span-8 w-full flex justify-center">
            <div className="w-full max-w-[620px] min-h-[260px] flex items-center justify-center">
              {mounted ? (
                <MarketCard
                  value={mainStat.value || "25+"}
                  label={mainStat.label || "Websites Delivered"}
                  deltaLabel={mainStat.delta || "+5 new this quarter"}
                  data={[12, 16, 19, 23, 27, 30, 34]}
                  fill={1}
                  cardColor="#141419"
                  accent="#6366f1"
                  background="transparent"
                />
              ) : (
                <div className="w-full h-[260px] rounded-2xl bg-neutral-900/40 border border-white/5 animate-pulse" />
              )}
            </div>
          </div>

          {/* Secondary Stat Badges / Metrics */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {otherStats.map((st, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                    {i === 0 ? <Smile className="size-5" /> : <Zap className="size-5" />}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">{st.value}</div>
                    <div className="text-xs text-neutral-400">{st.label}</div>
                  </div>
                </div>
                {st.delta && (
                  <div className="text-[11px] text-emerald-400/90 font-medium mt-1">
                    ✓ {st.delta}
                  </div>
                )}
              </div>
            ))}

            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03]">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                AI + Handcrafted Code
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Harnessing modern AI coding tools to deliver production-ready websites in days rather than weeks, passing the speed and savings directly to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
