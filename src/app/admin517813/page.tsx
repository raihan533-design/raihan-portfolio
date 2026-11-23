"use client"

import React, { useState, useEffect } from "react"
import { useSiteContent } from "@/context/ContentContext"
import {
  ServiceItem,
  ProjectCardItem,
  SiteSettings,
  HeroContent,
  AboutContent,
  CTAContent,
  FooterContent,
  StatItem,
  FAQItem,
  NavItem,
} from "@/data/initialContent"
import {
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  FolderPlus,
  Image as ImageIcon,
  ExternalLink,
  RotateCcw,
  Layers,
  Settings,
  HelpCircle,
  BarChart3,
  Globe,
  Upload,
  Navigation,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const availableIcons = [
  "Home",
  "User",
  "LayoutGrid",
  "Briefcase",
  "MessageCircle",
  "Phone",
  "LineChart",
  "CreditCard",
  "Trophy",
  "HelpCircle",
  "Layers",
]

export default function AdminPage() {
  const {
    content,
    isLoaded,
    isUsingSupabase,
    updateSiteSettings,
    updateHero,
    updateAbout,
    updateCTA,
    updateFooter,
    updateNavItems,
    updateStats,
    updateFAQs,
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
    uploadImage,
    resetToDefaults,
  } = useSiteContent()

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [authError, setAuthError] = useState("")
  const [activeTab, setActiveTab] = useState<
    "settings" | "hero" | "navbar" | "services" | "projects" | "content" | "sync"
  >("hero")
  const [saveStatus, setSaveStatus] = useState<string>("")

  // Form States
  const [siteForm, setSiteForm] = useState<SiteSettings>(content.site)
  const [heroForm, setHeroForm] = useState<HeroContent>(content.hero)
  const [navItemsForm, setNavItemsForm] = useState<NavItem[]>(content.navItems || [])
  const [aboutForm, setAboutForm] = useState<AboutContent>(content.about)
  const [ctaForm, setCtaForm] = useState<CTAContent>(content.cta)
  const [footerForm, setFooterForm] = useState<FooterContent>(content.footer)
  const [statsForm, setStatsForm] = useState<StatItem[]>(content.stats)
  const [faqsForm, setFaqsForm] = useState<FAQItem[]>(content.faqs)

  // Service Modal / Form
  const [editingService, setEditingService] = useState<ServiceItem | null>(null)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [serviceForm, setServiceForm] = useState({ label: "", description: "" })

  // Project Modal / Form
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>("all")
  const [editingProject, setEditingProject] = useState<ProjectCardItem | null>(null)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [projectForm, setProjectForm] = useState<{
    serviceId: string
    title: string
    description: string
    image: string
    websiteUrl: string
    tags: string
    badge: string
  }>({
    serviceId: "",
    title: "",
    description: "",
    image: "",
    websiteUrl: "",
    tags: "",
    badge: "2026",
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [newGalleryImageUrl, setNewGalleryImageUrl] = useState("")
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false)

  // Sync form state when content loads
  useEffect(() => {
    if (isLoaded) {
      setSiteForm(content.site)
      setHeroForm({
        ...content.hero,
        images: content.hero.images || [],
        features: content.hero.features || [
          { title: "Fast Turnaround", description: "Standard blog & portfolio delivered in 2–4 days." },
          { title: "AI + Handcrafted", description: "Modern tech stack at budget-friendly cost." },
          { title: "100% Mobile Ready", description: "Flawless responsiveness across all devices." },
        ],
      })
      setNavItemsForm(content.navItems || [])
      setAboutForm(content.about)
      setCtaForm(content.cta)
      setFooterForm(content.footer)
      setStatsForm(content.stats)
      setFaqsForm(content.faqs)
    }
  }, [isLoaded, content])

  // Check existing session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("raihan_admin_auth")
    if (sessionAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (validPassword && passwordInput === validPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem("raihan_admin_auth", "true")
      setAuthError("")
    } else {
      setAuthError("Incorrect password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("raihan_admin_auth")
  }

  const showSaveSuccess = (message = "Changes saved successfully ✓") => {
    setSaveStatus(message)
    setTimeout(() => setSaveStatus(""), 4000)
  }

  const handleSaveSettings = async () => {
    await updateSiteSettings(siteForm)
    await updateAbout(aboutForm)
    await updateCTA(ctaForm)
    await updateFooter(footerForm)
    showSaveSuccess("Site settings saved ✓ Changes reflect live on homepage!")
  }

  const handleSaveHero = async () => {
    await updateHero(heroForm)
    showSaveSuccess("Hero section & orbital gallery saved ✓")
  }

  const handleSaveNavbar = async () => {
    await updateNavItems(navItemsForm)
    showSaveSuccess("Navigation bar items saved ✓")
  }

  // Gallery image handling
  const handleAddGalleryUrl = () => {
    if (!newGalleryImageUrl.trim()) return
    setHeroForm((prev) => ({
      ...prev,
      images: [...prev.images, newGalleryImageUrl.trim()],
    }))
    setNewGalleryImageUrl("")
  }

  const handleUploadGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingGalleryImage(true)
      const url = await uploadImage(file)
      setHeroForm((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }))
      showSaveSuccess("Gallery image uploaded ✓")
    } catch (err) {
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploadingGalleryImage(false)
    }
  }

  const handleRemoveGalleryImage = (index: number) => {
    setHeroForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }))
  }

  // Nav items handling
  const handleAddNavItem = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: "New Link",
      icon: "Home",
      href: "#",
    }
    setNavItemsForm([...navItemsForm, newItem])
  }

  const handleRemoveNavItem = (id: string) => {
    setNavItemsForm(navItemsForm.filter((item) => item.id !== id))
  }

  const handleUpdateNavItem = (id: string, field: keyof NavItem, value: string) => {
    setNavItemsForm(
      navItemsForm.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  // Service Management
  const handleOpenAddService = () => {
    setEditingService(null)
    setServiceForm({ label: "", description: "" })
    setServiceModalOpen(true)
  }

  const handleOpenEditService = (service: ServiceItem) => {
    setEditingService(service)
    setServiceForm({ label: service.label, description: service.description })
    setServiceModalOpen(true)
  }

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceForm.label.trim()) return

    if (editingService) {
      await updateService({
        ...editingService,
        label: serviceForm.label,
        description: serviceForm.description,
      })
      showSaveSuccess(`Service "${serviceForm.label}" updated ✓`)
    } else {
      await addService({
        label: serviceForm.label,
        description: serviceForm.description,
      })
      showSaveSuccess(`New service "${serviceForm.label}" created ✓`)
    }
    setServiceModalOpen(false)
  }

  const handleDeleteService = async (id: string, label: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${label}"? This will also remove any project cards filed under it.`
      )
    ) {
      await deleteService(id)
      showSaveSuccess(`Service "${label}" deleted ✓`)
    }
  }

  // Project Management
  const handleOpenAddProject = () => {
    const defaultSvc = content.services[0]?.id || "blog"
    setEditingProject(null)
    setProjectForm({
      serviceId: selectedServiceFilter !== "all" ? selectedServiceFilter : defaultSvc,
      title: "",
      description: "",
      image: "",
      websiteUrl: "",
      tags: "Web, AI",
      badge: "2026",
    })
    setProjectModalOpen(true)
  }

  const handleOpenEditProject = (project: ProjectCardItem) => {
    setEditingProject(project)
    setProjectForm({
      serviceId: project.serviceId,
      title: project.title,
      description: project.description,
      image: project.image,
      websiteUrl: project.websiteUrl,
      tags: project.tags.join(", "),
      badge: project.badge,
    })
    setProjectModalOpen(true)
  }

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const uploadedUrl = await uploadImage(file)
      setProjectForm((prev) => ({ ...prev, image: uploadedUrl }))
      showSaveSuccess("Screenshot uploaded & preview ready ✓")
    } catch (err) {
      alert("Failed to upload image. Please try again or use an image URL.")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectForm.title.trim()) return

    const tagsArray = projectForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    if (editingProject) {
      await updateProject({
        ...editingProject,
        serviceId: projectForm.serviceId,
        title: projectForm.title,
        description: projectForm.description,
        image: projectForm.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800",
        websiteUrl: projectForm.websiteUrl,
        tags: tagsArray,
        badge: projectForm.badge || "2026",
      })
      showSaveSuccess(`Project "${projectForm.title}" updated ✓`)
    } else {
      await addProject({
        serviceId: projectForm.serviceId,
        title: projectForm.title,
        description: projectForm.description,
        image: projectForm.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800",
        websiteUrl: projectForm.websiteUrl,
        tags: tagsArray,
        badge: projectForm.badge || "2026",
      })
      showSaveSuccess(`Project "${projectForm.title}" added to showcase ✓`)
    }
    setProjectModalOpen(false)
  }

  const handleDeleteProject = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}"?`)) {
      await deleteProject(id)
      showSaveSuccess(`Project card "${title}" deleted ✓`)
    }
  }

  // Stats & FAQs
  const handleSaveStatsFaqs = async () => {
    await updateStats(statsForm)
    await updateFAQs(faqsForm)
    showSaveSuccess("Stats & FAQs updated ✓")
  }

  const handleAddFaq = () => {
    setFaqsForm([
      ...faqsForm,
      {
        id: `faq-${Date.now()}`,
        q: "New question?",
        a: "Answer details here.",
      },
    ])
  }

  const handleRemoveFaq = (idx: number) => {
    setFaqsForm(faqsForm.filter((_, i) => i !== idx))
  }

  const handleAddStat = () => {
    setStatsForm([
      ...statsForm,
      { label: "Metric Name", value: "100+", delta: "Positive trend" },
    ])
  }

  const handleRemoveStat = (idx: number) => {
    setStatsForm(statsForm.filter((_, i) => i !== idx))
  }

  const handleReset = async () => {
    if (
      confirm(
        "Are you sure you want to reset all content to original defaults? Any custom services or cards will be restored to template."
      )
    ) {
      await resetToDefaults()
      showSaveSuccess("Reset to default template ✓")
    }
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0c] text-white">
        <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-4 text-white">
              <Lock className="size-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Raihan Sorwar Portfolio Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter secret admin password..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/40"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
            >
              Log In to Admin
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-500">
            <Link href="/" className="hover:text-white transition-colors">
              ← Return to website
            </Link>
            <span>Authorized access only</span>
          </div>
        </div>
      </div>
    )
  }

  // Filtered projects for Project tab
  const displayedProjects =
    selectedServiceFilter === "all"
      ? content.projects
      : content.projects.filter((p) => p.serviceId === selectedServiceFilter)

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight">Raihan Admin Panel</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isUsingSupabase
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {isUsingSupabase ? "Supabase Live Sync" : "LocalStorage Mode"}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Manage hero texts, rotating gallery, navbar items, and projects A to Z
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {saveStatus && (
              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full animate-fade-in-up font-medium">
                {saveStatus}
              </span>
            )}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-200"
            >
              <Globe className="size-3.5" />
              <span>View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-medium text-red-300"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout: Tabs + Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-8 border-b border-white/10 scrollbar-none">
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "hero"
                ? "bg-white text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="size-4" />
            <span>Hero &amp; Orbital Gallery</span>
          </button>
          <button
            onClick={() => setActiveTab("navbar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "navbar"
                ? "bg-white text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Navigation className="size-4" />
            <span>Navbar Menu ({navItemsForm.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "projects"
                ? "bg-white text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ImageIcon className="size-4" />
            <span>Project Cards ({content.projects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "services"
                ? "bg-white text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="size-4" />
            <span>Services Folders ({content.services.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "settings"
                ? "bg-white text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="size-4" />
            <span>Personal &amp; Contact</span>
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "content"
                ? "bg-white text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BarChart3 className="size-4" />
            <span>Stats &amp; FAQs</span>
          </button>
          <button
            onClick={() => setActiveTab("sync")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "sync"
                ? "bg-white text-black font-semibold"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <HelpCircle className="size-4" />
            <span>Backend &amp; Supabase</span>
          </button>
        </div>

        {/* TAB: HERO & ORBITAL GALLERY */}
        {activeTab === "hero" && (
          <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Hero Section &amp; Orbital Gallery</h2>
                <p className="text-xs text-neutral-400">
                  Control all text, action buttons, the 3 bottom feature highlights, and orbiting showcase screenshots.
                </p>
              </div>
              <button
                onClick={handleSaveHero}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-md active:scale-95"
              >
                <Save className="size-4" />
                <span>Save Hero Settings</span>
              </button>
            </div>

            {/* Headline and Buttons */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Hero Texts &amp; Action Buttons
              </h3>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Top Announcement Pill
                </label>
                <input
                  type="text"
                  value={heroForm.announcement}
                  onChange={(e) => setHeroForm({ ...heroForm, announcement: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Main Hero Title / Headline
                </label>
                <input
                  type="text"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Sub-Description Text
                </label>
                <textarea
                  rows={2}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.primaryButtonText}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryButtonText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={heroForm.primaryButtonLink}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryButtonLink: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.secondaryButtonText}
                    onChange={(e) => setHeroForm({ ...heroForm, secondaryButtonText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={heroForm.secondaryButtonLink}
                    onChange={(e) => setHeroForm({ ...heroForm, secondaryButtonLink: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            {/* 3 Bottom Feature Highlights */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                3 Bottom Feature Columns
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {heroForm.features.map((feat, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Feature #{i + 1}
                    </span>
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => {
                        const updated = [...heroForm.features]
                        updated[i] = { ...updated[i], title: e.target.value }
                        setHeroForm({ ...heroForm, features: updated })
                      }}
                      placeholder="Title..."
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-black/60 text-xs font-semibold text-white"
                    />
                    <textarea
                      rows={2}
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...heroForm.features]
                        updated[i] = { ...updated[i], description: e.target.value }
                        setHeroForm({ ...heroForm, features: updated })
                      }}
                      placeholder="Description..."
                      className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-black/60 text-[11px] text-neutral-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Orbital Gallery Images */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Orbiting Gallery Screenshots ({heroForm.images.length})
                  </h3>
                  <p className="text-xs text-neutral-500">
                    These project screenshots rotate around the hero circle. You can add new image links or upload screenshots.
                  </p>
                </div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors self-start sm:self-auto">
                  <Upload className="size-3.5" />
                  <span>{uploadingGalleryImage ? "Uploading..." : "Upload Screenshot"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadGalleryImage}
                    className="hidden"
                    disabled={uploadingGalleryImage}
                  />
                </label>
              </div>

              {/* Add by URL */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                  value={newGalleryImageUrl}
                  onChange={(e) => setNewGalleryImageUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryUrl}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Add Image
                </button>
              </div>

              {/* Grid of gallery image previews */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                {heroForm.images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 group"
                  >
                    <img src={imgUrl} alt={`Gallery item ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-md bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Remove image"
                    >
                      <Trash2 className="size-3" />
                    </button>
                    <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/80 bg-black/60 px-1 rounded">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveHero}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-98"
            >
              Save Hero Settings ✓
            </button>
          </div>
        )}

        {/* TAB: NAVBAR MENU */}
        {activeTab === "navbar" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Navbar Menu Controls</h2>
                <p className="text-xs text-neutral-400">
                  Manage the floating pill navigation bar items, labels, icons, and destination links.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNavItem}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all"
                >
                  <Plus className="size-3.5" />
                  <span>Add Nav Item</span>
                </button>
                <button
                  onClick={handleSaveNavbar}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-md active:scale-95"
                >
                  <Save className="size-4" />
                  <span>Save Navbar</span>
                </button>
              </div>
            </div>

            {/* Nav Items List */}
            <div className="space-y-3">
              {navItemsForm.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-neutral-500">#{idx + 1}</span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-neutral-400">Label:</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateNavItem(item.id, "label", e.target.value)}
                          className="px-3 py-1 rounded-lg border border-white/10 bg-black/50 text-xs font-semibold text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] text-neutral-400">Icon:</label>
                      <select
                        value={item.icon}
                        onChange={(e) => handleUpdateNavItem(item.id, "icon", e.target.value)}
                        className="px-3 py-1 rounded-lg border border-white/10 bg-black/50 text-xs text-white"
                      >
                        {availableIcons.map((ic) => (
                          <option key={ic} value={ic}>
                            {ic}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-[10px] text-neutral-400">Target Link:</label>
                      <input
                        type="text"
                        value={item.href}
                        placeholder="#about, #services..."
                        onChange={(e) => handleUpdateNavItem(item.id, "href", e.target.value)}
                        className="px-3 py-1 rounded-lg border border-white/10 bg-black/50 text-xs text-white w-32"
                      />
                    </div>

                    <button
                      onClick={() => handleRemoveNavItem(item.id)}
                      className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs ml-2"
                      title="Delete nav item"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveNavbar}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-98"
            >
              Save Navigation Menu ✓
            </button>
          </div>
        )}

        {/* TAB: PROJECT CARDS */}
        {activeTab === "projects" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Project Cards (Website Demos)</h2>
                <p className="text-xs text-neutral-400">
                  Add screenshots and external links to websites you built. Clicking a card opens it in a new tab.
                </p>
              </div>
              <button
                onClick={handleOpenAddProject}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all self-start sm:self-auto"
              >
                <Plus className="size-4" />
                <span>Add Website Card</span>
              </button>
            </div>

            {/* Filter by service */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs text-neutral-400 font-medium mr-1">Filter by folder:</span>
              <button
                onClick={() => setSelectedServiceFilter("all")}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedServiceFilter === "all"
                    ? "bg-white text-black font-semibold"
                    : "bg-white/5 text-neutral-300 hover:bg-white/10"
                }`}
              >
                All Folders ({content.projects.length})
              </button>
              {content.services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedServiceFilter(s.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedServiceFilter === s.id
                      ? "bg-white text-black font-semibold"
                      : "bg-white/5 text-neutral-300 hover:bg-white/10"
                  }`}
                >
                  {s.label} ({content.projects.filter((p) => p.serviceId === s.id).length})
                </button>
              ))}
            </div>

            {/* Project List */}
            {displayedProjects.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                <p className="text-neutral-400 text-sm">No project cards found.</p>
                <button
                  onClick={handleOpenAddProject}
                  className="mt-3 text-xs text-white underline underline-offset-4"
                >
                  Click here to create the first project card
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedProjects.map((proj) => {
                  const svc = content.services.find((s) => s.id === proj.serviceId)
                  return (
                    <div
                      key={proj.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden border-b border-white/10">
                          <img
                            src={proj.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                          {proj.badge && (
                            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white border border-white/20">
                              {proj.badge}
                            </span>
                          )}
                          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-neutral-300 border border-white/10">
                            {svc?.label || "Service"}
                          </span>
                        </div>

                        {/* Card Info */}
                        <div className="p-4">
                          <h4 className="font-semibold text-white text-base">{proj.title}</h4>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                            {proj.description || "No description provided."}
                          </p>

                          {proj.websiteUrl && (
                            <a
                              href={proj.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 mt-3"
                            >
                              <ExternalLink className="size-3" />
                              <span className="truncate max-w-[200px]">{proj.websiteUrl}</span>
                            </a>
                          )}

                          <div className="flex flex-wrap gap-1 mt-3">
                            {proj.tags.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-neutral-300 font-mono"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Action footer */}
                      <div className="p-3 border-t border-white/10 flex items-center justify-between bg-black/20">
                        <button
                          onClick={() => handleOpenEditProject(proj)}
                          className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-200 flex items-center gap-1.5"
                        >
                          <Edit2 className="size-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-300 flex items-center gap-1.5"
                        >
                          <Trash2 className="size-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Services Folders</h2>
                <p className="text-xs text-neutral-400">
                  Each service represents a glass folder on the homepage containing example website files.
                </p>
              </div>
              <button
                onClick={handleOpenAddService}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all self-start sm:self-auto"
              >
                <FolderPlus className="size-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services Table / Cards */}
            <div className="space-y-3">
              {content.services.map((svc) => {
                const count = content.projects.filter((p) => p.serviceId === svc.id).length
                return (
                  <div
                    key={svc.id}
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-base">{svc.label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                          {count} {count === 1 ? "website" : "websites"}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                        {svc.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleOpenEditService(svc)}
                        className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-200 flex items-center gap-1.5"
                      >
                        <Edit2 className="size-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteService(svc.id, svc.label)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-300 flex items-center gap-1.5"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB: PERSONAL & CONTACT */}
        {activeTab === "settings" && (
          <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Personal &amp; Contact Details</h2>
                <p className="text-xs text-neutral-400">
                  Update developer name, phone, email, WhatsApp, and location.
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-md active:scale-95"
              >
                <Save className="size-4" />
                <span>Save Personal Info</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Developer Name</label>
                  <input
                    type="text"
                    value={siteForm.name}
                    onChange={(e) => setSiteForm({ ...siteForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={siteForm.role}
                    onChange={(e) => setSiteForm({ ...siteForm, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={siteForm.phone}
                    onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={siteForm.whatsapp}
                    onChange={(e) => setSiteForm({ ...siteForm, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={siteForm.email}
                    onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={siteForm.location}
                    onChange={(e) => setSiteForm({ ...siteForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            {/* About Section Text */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                About Section Bio
              </h3>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">About Title</label>
                <input
                  type="text"
                  value={aboutForm.title}
                  onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">About Text</label>
                <textarea
                  rows={3}
                  value={aboutForm.text}
                  onChange={(e) => setAboutForm({ ...aboutForm, text: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                />
              </div>
            </div>

            {/* CTA & Footer */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Call To Action &amp; Footer
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">CTA Headline</label>
                  <input
                    type="text"
                    value={ctaForm.title}
                    onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaForm.buttonText}
                    onChange={(e) => setCtaForm({ ...ctaForm, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Footer Copyright Text</label>
                  <input
                    type="text"
                    value={footerForm.text}
                    onChange={(e) => setFooterForm({ ...footerForm, text: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/10 bg-black/40 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-98"
            >
              Save Personal Info ✓
            </button>
          </div>
        )}

        {/* TAB: STATS & FAQS */}
        {activeTab === "content" && (
          <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Stats &amp; FAQs Management</h2>
                <p className="text-xs text-neutral-400">
                  Update completed projects count and customize client questions/answers.
                </p>
              </div>
              <button
                onClick={handleSaveStatsFaqs}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-md active:scale-95"
              >
                <Save className="size-4" />
                <span>Save Stats &amp; FAQs</span>
              </button>
            </div>

            {/* Stats Editor */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Stats Metrics (Shown on Peak Chart &amp; Badges)
                </h3>
                <button
                  onClick={handleAddStat}
                  className="text-xs text-white hover:underline flex items-center gap-1"
                >
                  <Plus className="size-3" />
                  <span>Add Stat</span>
                </button>
              </div>

              <div className="space-y-3">
                {statsForm.map((st, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-white/10 bg-black/30 flex flex-col sm:flex-row items-center gap-3"
                  >
                    <div className="w-full sm:w-1/3">
                      <label className="text-[10px] text-neutral-400">Stat Label</label>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...statsForm]
                          updated[i].label = e.target.value
                          setStatsForm(updated)
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-black/50 text-xs text-white"
                      />
                    </div>
                    <div className="w-full sm:w-1/4">
                      <label className="text-[10px] text-neutral-400">Headline Value</label>
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...statsForm]
                          updated[i].value = e.target.value
                          setStatsForm(updated)
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-black/50 text-xs text-white"
                      />
                    </div>
                    <div className="w-full sm:w-1/3">
                      <label className="text-[10px] text-neutral-400">Subtitle / Delta Caption</label>
                      <input
                        type="text"
                        value={st.delta}
                        onChange={(e) => {
                          const updated = [...statsForm]
                          updated[i].delta = e.target.value
                          setStatsForm(updated)
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-black/50 text-xs text-white"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveStat(i)}
                      className="p-2 text-red-400 hover:text-red-300 self-end sm:self-center"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Editor */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  FAQ Accordion Questions &amp; Answers
                </h3>
                <button
                  onClick={handleAddFaq}
                  className="text-xs text-white hover:underline flex items-center gap-1"
                >
                  <Plus className="size-3" />
                  <span>Add FAQ Item</span>
                </button>
              </div>

              <div className="space-y-4">
                {faqsForm.map((faq, i) => (
                  <div
                    key={faq.id || i}
                    className="p-4 rounded-xl border border-white/10 bg-black/30 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        Question #{i + 1}
                      </span>
                      <button
                        onClick={() => handleRemoveFaq(i)}
                        className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) => {
                        const updated = [...faqsForm]
                        updated[i].q = e.target.value
                        setFaqsForm(updated)
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-black/50 text-sm font-medium text-white"
                      placeholder="Question..."
                    />
                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => {
                        const updated = [...faqsForm]
                        updated[i].a = e.target.value
                        setFaqsForm(updated)
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-black/50 text-xs text-neutral-300"
                      placeholder="Answer..."
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveStatsFaqs}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-98"
            >
              Save Stats &amp; FAQs ✓
            </button>
          </div>
        )}

        {/* TAB: BACKEND & SUPABASE SYNC */}
        {activeTab === "sync" && (
          <div className="space-y-6 max-w-3xl">
            <div className="pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Backend Persistence &amp; Supabase</h2>
              <p className="text-xs text-neutral-400">
                Configure cloud database syncing so changes made by you are visible to all visitors.
              </p>
            </div>

            {/* Status Card */}
            <div
              className={`p-6 rounded-2xl border ${
                isUsingSupabase
                  ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                  : "border-amber-500/30 bg-amber-500/[0.04]"
              }`}
            >
              <div className="flex items-start gap-3">
                {isUsingSupabase ? (
                  <CheckCircle2 className="size-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="size-6 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-semibold text-white text-base">
                    {isUsingSupabase
                      ? "Connected to Supabase (Global Public Sync Active)"
                      : "Using LocalStorage (Browser-Only Mode)"}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                    {isUsingSupabase
                      ? "Your edits and uploaded project screenshots are saved directly to your Supabase PostgreSQL database and Storage bucket, visible to every visitor in real-time."
                      : "Changes you make right now are saved safely in this browser's localStorage. To make changes show to all external visitors, simply connect your free Supabase project."}
                  </p>
                </div>
              </div>
            </div>

            {/* Instruction Guide */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4 text-xs leading-relaxed">
              <h4 className="font-bold text-sm text-white">Supabase Setup Guide:</h4>
              <ol className="list-decimal list-inside space-y-2 text-neutral-300">
                <li>Create a free account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">supabase.com</a>.</li>
                <li>Go to Project Settings → API, and copy the Project URL and Anon Key.</li>
                <li>Go to Storage and create a public bucket named <code className="bg-white/10 px-1 py-0.5 rounded">uploads</code>.</li>
                <li>In your project root, add them to <code className="bg-white/10 px-1 py-0.5 rounded">.env.local</code>:</li>
              </ol>

              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-neutral-300 font-mono text-[11px] overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password`}
              </pre>
            </div>

            {/* Reset Defaults Action */}
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-red-300">Reset Content to Default Template</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Restores all titles, services, and demo cards back to factory state.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-xs font-semibold text-red-200 flex items-center gap-2 self-start sm:self-auto"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset to Factory</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SERVICE MODAL */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl border border-white/15 bg-neutral-900 text-white shadow-2xl">
            <h3 className="text-lg font-bold mb-1">
              {editingService ? "Edit Service Folder" : "Add New Service Folder"}
            </h3>
            <p className="text-xs text-neutral-400 mb-5">
              Service folders are displayed on the public site with glass folder animations.
            </p>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Service Title / Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Landing Page, Blog Website..."
                  value={serviceForm.label}
                  onChange={(e) => setServiceForm({ ...serviceForm, label: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Short description of what you provide for this service..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200"
                >
                  {editingService ? "Update Folder" : "Create Folder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl p-6 rounded-3xl border border-white/15 bg-neutral-900 text-white shadow-2xl my-8">
            <h3 className="text-lg font-bold mb-1">
              {editingProject ? "Edit Project Card" : "Add Website Project Card"}
            </h3>
            <p className="text-xs text-neutral-400 mb-5">
              Upload a screenshot or paste an image URL, and link the live website.
            </p>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Assign to Service Folder</label>
                <select
                  value={projectForm.serviceId}
                  onChange={(e) => setProjectForm({ ...projectForm, serviceId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-sm text-white"
                  required
                >
                  {content.services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Website Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Fashion Apparel Store"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Live Website Link / URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={projectForm.websiteUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, websiteUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-sm text-white"
                />
                <span className="text-[10px] text-neutral-500 mt-0.5 block">
                  Clicking this project card on the public site opens this link in a new tab.
                </span>
              </div>

              {/* Image Screenshot Upload & Preview */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Card Cover Screenshot
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors">
                        <Upload className="size-3.5" />
                        <span>{uploadingImage ? "Uploading..." : "Upload Screenshot File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      <span className="text-xs text-neutral-500">or paste URL:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-xs text-white"
                    />
                  </div>

                  {/* Thumbnail Preview */}
                  {projectForm.image && (
                    <div className="size-20 rounded-xl overflow-hidden border border-white/20 bg-black shrink-0 relative">
                      <img
                        src={projectForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Key features (e.g. online cart, booking system, fast delivery)..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/50 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Blog, E-commerce, Next.js"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    className="w-full px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Badge / Year</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={projectForm.badge}
                    onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })}
                    className="w-full px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200"
                >
                  {editingProject ? "Save Changes" : "Add Website Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
