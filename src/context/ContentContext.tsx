"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import {
  SiteContent,
  initialSiteContent,
  ServiceItem,
  ProjectCardItem,
  SiteSettings,
  HeroContent,
  AboutContent,
  StatItem,
  FAQItem,
  CTAContent,
  FooterContent,
  NavItem,
} from "@/data/initialContent"
import { createClient, SupabaseClient } from "@supabase/supabase-js"

interface ContentContextType {
  content: SiteContent
  isLoaded: boolean
  isUsingSupabase: boolean
  saveContent: (updated: SiteContent) => Promise<boolean>
  updateSiteSettings: (settings: SiteSettings) => Promise<boolean>
  updateHero: (hero: HeroContent) => Promise<boolean>
  updateAbout: (about: AboutContent) => Promise<boolean>
  updateCTA: (cta: CTAContent) => Promise<boolean>
  updateFooter: (footer: FooterContent) => Promise<boolean>
  updateNavItems: (items: NavItem[]) => Promise<boolean>
  updateStats: (stats: StatItem[]) => Promise<boolean>
  updateFAQs: (faqs: FAQItem[]) => Promise<boolean>
  addService: (service: Omit<ServiceItem, "id">) => Promise<boolean>
  updateService: (service: ServiceItem) => Promise<boolean>
  deleteService: (id: string) => Promise<boolean>
  addProject: (project: Omit<ProjectCardItem, "id">) => Promise<boolean>
  updateProject: (project: ProjectCardItem) => Promise<boolean>
  deleteProject: (id: string) => Promise<boolean>
  uploadImage: (file: File) => Promise<string>
  resetToDefaults: () => Promise<boolean>
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

const STORAGE_KEY = "raihan_portfolio_content_v1"

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initialSiteContent)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isUsingSupabase, setIsUsingSupabase] = useState(false)
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    let client: SupabaseClient | null = null
    if (supabaseUrl && supabaseKey) {
      try {
        client = createClient(supabaseUrl, supabaseKey)
        setSupabaseClient(client)
        setIsUsingSupabase(true)
      } catch (err) {
        console.warn("Failed to initialize Supabase client:", err)
      }
    }

    async function loadData() {
      if (client) {
        try {
          const { data, error } = await client
            .from("site_content")
            .select("content")
            .eq("id", 1)
            .single()

          if (!error && data && data.content) {
            setContent({ ...initialSiteContent, ...data.content })
            setIsLoaded(true)
            return
          }
        } catch (e) {
          console.warn("Supabase load failed, falling back to local storage:", e)
        }
      }

      // LocalStorage fallback
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          setContent({ ...initialSiteContent, ...parsed })
        }
      } catch (e) {
        console.warn("Failed to load from localStorage:", e)
      }
      setIsLoaded(true)
    }

    loadData()
  }, [])

  const persist = async (nextContent: SiteContent): Promise<boolean> => {
    setContent(nextContent)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent))
    } catch (e) {
      console.warn("LocalStorage write error:", e)
    }

    if (supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from("site_content")
          .upsert({ id: 1, content: nextContent, updated_at: new Date().toISOString() })
        if (error) {
          console.error("Supabase upsert error:", error)
          return false
        }
      } catch (e) {
        console.error("Supabase write failed:", e)
        return false
      }
    }
    return true
  }

  const saveContent = async (updated: SiteContent) => {
    return await persist(updated)
  }

  const updateSiteSettings = async (settings: SiteSettings) => {
    return await persist({ ...content, site: settings })
  }

  const updateHero = async (hero: HeroContent) => {
    return await persist({ ...content, hero })
  }

  const updateAbout = async (about: AboutContent) => {
    return await persist({ ...content, about })
  }

  const updateCTA = async (cta: CTAContent) => {
    return await persist({ ...content, cta })
  }

  const updateFooter = async (footer: FooterContent) => {
    return await persist({ ...content, footer })
  }

  const updateNavItems = async (navItems: NavItem[]) => {
    return await persist({ ...content, navItems })
  }

  const updateStats = async (stats: StatItem[]) => {
    return await persist({ ...content, stats })
  }

  const updateFAQs = async (faqs: FAQItem[]) => {
    return await persist({ ...content, faqs })
  }

  const addService = async (service: Omit<ServiceItem, "id">) => {
    const newService: ServiceItem = {
      ...service,
      id: "service-" + Date.now().toString(36),
    }
    return await persist({
      ...content,
      services: [...content.services, newService],
    })
  }

  const updateService = async (updated: ServiceItem) => {
    return await persist({
      ...content,
      services: content.services.map((s) => (s.id === updated.id ? updated : s)),
    })
  }

  const deleteService = async (id: string) => {
    return await persist({
      ...content,
      services: content.services.filter((s) => s.id !== id),
      projects: content.projects.filter((p) => p.serviceId !== id),
    })
  }

  const addProject = async (project: Omit<ProjectCardItem, "id">) => {
    const newProject: ProjectCardItem = {
      ...project,
      id: "project-" + Date.now().toString(36),
    }
    return await persist({
      ...content,
      projects: [...content.projects, newProject],
    })
  }

  const updateProject = async (updated: ProjectCardItem) => {
    return await persist({
      ...content,
      projects: content.projects.map((p) => (p.id === updated.id ? updated : p)),
    })
  }

  const deleteProject = async (id: string) => {
    return await persist({
      ...content,
      projects: content.projects.filter((p) => p.id !== id),
    })
  }

  const uploadImage = async (file: File): Promise<string> => {
    if (supabaseClient) {
      try {
        const fileExt = file.name.split(".").pop() || "png"
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
        const filePath = `screenshots/${fileName}`

        const { error } = await supabaseClient.storage
          .from("uploads")
          .upload(filePath, file)

        if (!error) {
          const { data } = supabaseClient.storage
            .from("uploads")
            .getPublicUrl(filePath)
          if (data && data.publicUrl) {
            return data.publicUrl
          }
        }
      } catch (err) {
        console.warn("Supabase storage upload error, falling back to base64:", err)
      }
    }

    // High quality Base64 fallback for immediate browser preview/persistence
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (err) => reject(err)
      reader.readAsDataURL(file)
    })
  }

  const resetToDefaults = async () => {
    return await persist(initialSiteContent)
  }

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoaded,
        isUsingSupabase,
        saveContent,
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
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error("useSiteContent must be used within a ContentProvider")
  }
  return context
}
