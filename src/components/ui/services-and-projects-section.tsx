"use client"

import React, { useState, useMemo } from "react"
import { useSiteContent } from "@/context/ContentContext"
import GlassFolder, { FolderFile, FolderArt } from "@/components/ui/glass-folder-cards"
import NotchedProjectCard from "@/components/ui/notched-project-card"
import TactilePagination from "@/components/ui/tactile-pagination"

const artPresets: FolderArt[] = ["aurora", "dusk", "ember", "verdant", "glacier"]

export default function ServicesAndProjectsSection() {
  const { content } = useSiteContent()
  const [mounted, setMounted] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(6)

  React.useEffect(() => {
    setMounted(true)
    const handleHashChange = () => {
      if (window.location.hash === "#work" && content.services.length > 0 && !selectedServiceId) {
        setSelectedServiceId(content.services[0].id)
      }
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [content.services, selectedServiceId])

  // Map services to glass folder format
  const serviceFolders = useMemo(() => {
    return content.services.map((service, idx) => {
      const serviceProjects = content.projects.filter((p) => p.serviceId === service.id)
      const folderFiles: FolderFile[] = serviceProjects.map((proj) => ({
        name: proj.title,
        meta: proj.badge || "Live Site",
        art: (artPresets[(idx + 1) % artPresets.length] as any) || "aurora",
        href: proj.websiteUrl || "#",
      }))

      return {
        ...service,
        projectCount: serviceProjects.length,
        files: folderFiles.length > 0 ? folderFiles : [{ name: "Demo Site Coming", meta: "In progress" }],
        art: artPresets[idx % artPresets.length],
      }
    })
  }, [content.services, content.projects])

  // Active service object
  const activeService = useMemo(() => {
    if (!selectedServiceId) return null
    return content.services.find((s) => s.id === selectedServiceId) || null
  }, [content.services, selectedServiceId])

  // Filter projects by selected service ONLY (no "all" projects view)
  const filteredProjects = useMemo(() => {
    if (!selectedServiceId) return []
    return content.projects.filter((p) => p.serviceId === selectedServiceId)
  }, [content.projects, selectedServiceId])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize))
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredProjects.slice(start, start + pageSize)
  }, [filteredProjects, currentPage, pageSize])

  const handleSelectService = (serviceId: string) => {
    if (selectedServiceId === serviceId) {
      // Toggle off if already selected
      setSelectedServiceId(null)
    } else {
      setSelectedServiceId(serviceId)
      setCurrentPage(1)
      setTimeout(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }

  return (
    <section id="services" className="relative py-20 md:py-28 border-t border-white/5 bg-neutral-950/80">
      {/* Background ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300 mb-4">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Website Categories &amp; Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            What Kind of Website Do You Need?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Click on any folder below (Blog, Portfolio, or E-commerce) to view the websites I built.
          </p>

          {/* Category Toggle Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {content.services.map((svc) => {
              const count = content.projects.filter((p) => p.serviceId === svc.id).length
              const isSelected = selectedServiceId === svc.id
              return (
                <button
                  key={svc.id}
                  onClick={() => handleSelectService(svc.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/10 scale-105"
                      : "bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {svc.label} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Glass Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16 min-h-[340px]">
          {mounted ? (
            serviceFolders.map((folder, i) => {
              const isSelected = selectedServiceId === folder.id
              return (
                <div
                  key={folder.id}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-white/60 rounded-3xl p-3 bg-white/[0.06] shadow-[0_0_35px_rgba(255,255,255,0.12)] scale-[1.03]"
                      : "hover:scale-[1.02] p-3 rounded-3xl border border-transparent hover:border-white/10"
                  }`}
                  onClick={() => handleSelectService(folder.id)}
                >
                  <GlassFolder
                    label={folder.label}
                    art={folder.art}
                    meta={`${folder.projectCount} Websites`}
                    seed={i * 7 + 3}
                    appearDelay={i * 120}
                    files={folder.files}
                    width={280}
                    tone="dark"
                    open={isSelected}
                    onFileSelect={(file) => {
                      if (file.href && file.href !== "#") {
                        window.open(file.href, "_blank", "noopener,noreferrer")
                      }
                    }}
                  />
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold text-white text-base flex items-center justify-center gap-2">
                      <span>{folder.label}</span>
                      <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                        {folder.projectCount}
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 max-w-[260px] line-clamp-2">
                      {folder.description}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectService(folder.id)
                      }}
                      className={`mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-white text-black font-semibold shadow-md"
                          : "border border-white/20 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {isSelected ? "Showing Websites ↓" : "View Websites →"}
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            [1, 2, 3].map((n) => (
              <div key={n} className="w-[280px] h-[270px] rounded-3xl bg-neutral-900/40 border border-white/5 animate-pulse" />
            ))
          )}
        </div>

        {/* 5. Project Showcase (Only visible when a folder is selected) */}
        <div id="work" className="scroll-mt-24">
          {selectedServiceId && activeService ? (
            <div className="pt-6 border-t border-white/10 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-medium text-white mb-2">
                    <span>📂 Category: {activeService.label}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {activeService.label} Websites
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Showing {filteredProjects.length} live website demos. Click any card to open in a new tab.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedServiceId(null)}
                  className="self-start sm:self-auto px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs text-neutral-300 hover:text-white transition-colors"
                >
                  ✕ Close Websites
                </button>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                  <p className="text-neutral-300 text-sm font-medium">No websites added to &ldquo;{activeService.label}&rdquo; yet.</p>
                  <p className="text-neutral-500 text-xs mt-1">You can easily add new website screenshots and links from the Admin Panel.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedProjects.map((project) => (
                    <NotchedProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      image={project.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"}
                      imageAlt={project.title}
                      href={project.websiteUrl}
                      badge={project.badge}
                      tags={project.tags}
                      surface="#0a0a0c"
                    />
                  ))}
                </div>
              )}

              {/* 6. Tactile Pagination */}
              {totalPages > 1 && (
                <div className="mt-14 flex justify-center">
                  <TactilePagination
                    totalPages={totalPages}
                    page={currentPage}
                    onPageChange={(p) => setCurrentPage(p)}
                    pageSize={pageSize}
                    onPageSizeChange={(s) => {
                      setPageSize(s)
                      setCurrentPage(1)
                    }}
                    pageSizeOptions={[3, 6, 9, 12]}
                    theme="dark"
                    showPageSizeSelector={true}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Subtle Guide when no folder is clicked */
            <div className="text-center py-10 px-6 rounded-3xl border border-white/5 bg-white/[0.02] max-w-xl mx-auto flex flex-col items-center">
              <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 mb-3">
                <svg className="size-5 animate-bounce text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-white">Click any folder above to view websites</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Click on <strong>Blog Website</strong>, <strong>Portfolio Website</strong>, or <strong>E-commerce Website</strong> to see live client websites and demos.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
