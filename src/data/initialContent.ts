export interface SiteSettings {
  title: string
  name: string
  role: string
  phone: string
  email: string
  whatsapp: string
  location: string
  profilePhoto: string
  socialLinks: Array<{ label: string; url: string }>
}

export interface HeroFeature {
  title: string
  description: string
}

export interface HeroContent {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  announcement: string
  images: string[]
  features: HeroFeature[]
}

export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
}

export interface AboutContent {
  title: string
  text: string
  subtitle: string
}

export interface ServiceItem {
  id: string
  label: string
  description: string
  badge?: string
}

export interface ProjectCardItem {
  id: string
  serviceId: string
  title: string
  description: string
  image: string
  websiteUrl: string
  tags: string[]
  badge: string
}

export interface StatItem {
  label: string
  value: string
  delta: string
}

export interface FAQItem {
  id: string
  q: string
  a: string
}

export interface CTAContent {
  badge: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export interface FooterContent {
  text: string
  tagline: string
}

export interface SiteContent {
  site: SiteSettings
  hero: HeroContent
  navItems: NavItem[]
  about: AboutContent
  services: ServiceItem[]
  projects: ProjectCardItem[]
  stats: StatItem[]
  faqs: FAQItem[]
  cta: CTAContent
  footer: FooterContent
}

export const initialSiteContent: SiteContent = {
  site: {
    title: "Raihan Sorwar — Website Developer",
    name: "Raihan Sorwar",
    role: "Website Developer",
    phone: "01643684240",
    email: "raihansarwar533@gmail.com",
    whatsapp: "8801643684240",
    location: "Chittagong, Bangladesh",
    profilePhoto: "",
    socialLinks: [
      { label: "WhatsApp", url: "https://wa.me/8801643684240" },
      { label: "Email", url: "mailto:raihansarwar533@gmail.com" },
      { label: "GitHub", url: "https://github.com" },
      { label: "Facebook", url: "https://facebook.com" },
    ],
  },
  hero: {
    title: "I Build Fast, Modern Websites at Low Cost",
    description: "I make good websites cheaply with AI — blog, portfolio and e-commerce websites for your business.",
    primaryButtonText: "See My Work",
    primaryButtonLink: "#work",
    secondaryButtonText: "Contact Me",
    secondaryButtonLink: "#contact",
    announcement: "Now taking new website orders",
    images: [
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
    ],
    features: [
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
    ],
  },
  navItems: [
    { id: "nav-1", label: "Home", icon: "Home", href: "#" },
    { id: "nav-2", label: "About", icon: "User", href: "#about" },
    { id: "nav-3", label: "Services", icon: "LayoutGrid", href: "#services" },
    { id: "nav-4", label: "Work", icon: "Briefcase", href: "#work" },
    { id: "nav-5", label: "FAQ", icon: "MessageCircle", href: "#faq" },
    { id: "nav-6", label: "Contact", icon: "Phone", href: "#contact" },
  ],
  about: {
    title: "Websites, Made Simple",
    text: "I am a website developer from Chittagong, Bangladesh. I build clean, high-performance, and mobile-friendly websites with AI, helping businesses and creators launch online affordably without sacrificing quality.",
    subtitle: "Website Developer · Chittagong, Bangladesh",
  },
  services: [
    {
      id: "blog",
      label: "Blog Website",
      description: "Fast, modern blogs with content management, SEO optimization and clean reading experience.",
      badge: "Blog",
    },
    {
      id: "portfolio",
      label: "Portfolio Website",
      description: "Interactive showcases and agency portfolios designed to impress clients and capture leads.",
      badge: "Portfolio",
    },
    {
      id: "ecommerce",
      label: "E-commerce Website",
      description: "Complete online stores with product catalogs, shopping carts and Cash on Delivery support.",
      badge: "E-commerce",
    },
  ],
  projects: [
    {
      id: "1",
      serviceId: "blog",
      title: "Tech & Lifestyle Publication",
      description: "Fast modern editorial blog with smooth typography and responsive layout.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800",
      websiteUrl: "https://example.com/blog",
      tags: ["Blog", "Next.js"],
      badge: "2026",
    },
    {
      id: "2",
      serviceId: "portfolio",
      title: "Creative Developer Showcase",
      description: "Interactive developer portfolio with 3D elements and dark aesthetics.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800",
      websiteUrl: "https://example.com/portfolio",
      tags: ["Portfolio", "Motion"],
      badge: "2026",
    },
    {
      id: "3",
      serviceId: "ecommerce",
      title: "Clothing & Apparel Brand",
      description: "Clean fashion e-commerce with fast cart checkout and Cash on Delivery.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
      websiteUrl: "https://example.com/shop",
      tags: ["E-commerce", "Tailwind"],
      badge: "2026",
    },
    {
      id: "4",
      serviceId: "ecommerce",
      title: "Artisan Cafe & Restaurant",
      description: "Online food menu, table reservations and takeaway order ordering.",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800",
      websiteUrl: "https://example.com/cafe",
      tags: ["E-commerce", "Order"],
      badge: "2026",
    },
  ],
  stats: [
    { label: "Websites Delivered", value: "25+", delta: "+5 new this quarter" },
    { label: "Client Satisfaction", value: "100%", delta: "Verified reviews" },
    { label: "Average Turnaround", value: "48h", delta: "Rapid delivery" },
  ],
  faqs: [
    {
      id: "item-1",
      q: "How much does a website cost?",
      a: "Pricing is designed to be affordable for businesses and individuals — starting around ৳3,000–5,000 for standard websites, with exact quotes based on your requirements.",
    },
    {
      id: "item-2",
      q: "How long does it take to make my website?",
      a: "Most blog and portfolio websites are delivered within 2 to 4 days. Full e-commerce websites typically take 4 to 7 days.",
    },
    {
      id: "item-3",
      q: "Do you provide domain and hosting?",
      a: "Yes! I guide you through acquiring your domain name and setting up fast, reliable cloud hosting with free SSL security.",
    },
    {
      id: "item-4",
      q: "Can you make a blog, portfolio, or e-commerce website?",
      a: "Yes! Those are my core specializations: high-converting blogs, custom portfolios, and functional e-commerce stores with local payment / Cash on Delivery.",
    },
    {
      id: "item-5",
      q: "How do I order and pay?",
      a: "Reach out via WhatsApp or phone at 01643684240. We discuss your project, confirm the scope with a 50% advance via bKash/Nagad, and the remainder upon final approval.",
    },
  ],
  cta: {
    badge: "Order now",
    title: "Want a website for your business?",
    description: "Contact me today and get a high-quality, modern website built quickly and affordably.",
    buttonText: "Contact Me",
    buttonLink: "https://wa.me/8801643684240",
  },
  footer: {
    text: "© 2026 Raihan Sorwar. All rights reserved.",
    tagline: "Crafted with ❤ by Raihan Sorwar",
  },
}
