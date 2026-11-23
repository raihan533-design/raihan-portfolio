"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  LayoutGrid,
  Briefcase,
  MessageCircle,
  LineChart,
  CreditCard,
  Trophy,
  Phone,
  Layers,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/context/ContentContext";

const iconMap: Record<string, LucideIcon> = {
  Home,
  User,
  Profile: User,
  About: User,
  LayoutGrid,
  Grid: LayoutGrid,
  Services: LayoutGrid,
  Layers,
  Briefcase,
  Work: Briefcase,
  Portfolio: LineChart,
  LineChart,
  CreditCard,
  Transactions: CreditCard,
  MessageCircle,
  Messages: MessageCircle,
  Trophy,
  Rewards: Trophy,
  Phone,
  Contact: Phone,
  HelpCircle,
  FAQ: HelpCircle,
};

const MOBILE_LABEL_WIDTH = 72;

export type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = true,
}: BottomNavBarProps) {
  const { content } = useSiteContent();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems =
    content.navItems && content.navItems.length > 0
      ? content.navItems
      : [
          { id: "1", label: "Home", icon: "Home", href: "#" },
          { id: "2", label: "About", icon: "User", href: "#about" },
          { id: "3", label: "Services", icon: "LayoutGrid", href: "#services" },
          { id: "4", label: "Work", icon: "Briefcase", href: "#work" },
          { id: "5", label: "FAQ", icon: "HelpCircle", href: "#faq" },
          { id: "6", label: "Contact", icon: "MessageCircle", href: "#contact" },
        ];

  const handleClick = (idx: number, href: string) => {
    setActiveIndex(idx);
    if (!href || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Navigation"
      className={cn(
        "bg-neutral-900/90 dark:bg-neutral-900/90 border border-white/15 dark:border-white/15 rounded-full flex items-center p-1.5 shadow-2xl space-x-1 min-w-[280px] sm:min-w-[320px] max-w-[95vw] h-[52px] backdrop-blur-xl",
        stickyBottom && "fixed inset-x-0 bottom-4 mx-auto z-40 w-fit",
        className
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = iconMap[item.icon] || Home;
        const isActive = activeIndex === idx;

        return (
          <motion.button
            key={item.id || item.label}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[40px] sm:min-w-[44px] min-h-[40px] max-h-[44px]",
              isActive
                ? "bg-white/15 text-white gap-2 font-semibold"
                : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5",
              "focus:outline-none focus-visible:ring-0"
            )}
            onClick={() => handleClick(idx, item.href)}
            aria-label={item.label}
            type="button"
          >
            <Icon
              size={20}
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200 shrink-0"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "6px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="overflow-hidden flex items-center max-w-[72px]"
            >
              <span
                className={cn(
                  "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis leading-tight",
                  isActive ? "text-white" : "opacity-0"
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;
