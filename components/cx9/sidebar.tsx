"use client"

import React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Globe,
  BookOpen,
  Database,
  Settings,
  ChevronLeft,
  Gamepad2,
  Boxes,
  Bell,
  Users,
} from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="size-5" /> },
  { id: "viethoa", label: "Việt hóa", icon: <Globe className="size-5" /> },
  { id: "roblox", label: "Roblox Studio", icon: <Boxes className="size-5" /> },
  { id: "updates", label: "Cập nhật", icon: <Bell className="size-5" /> },
  { id: "community", label: "Cộng đồng", icon: <Users className="size-5" /> },
  { id: "pedia", label: "Eleon Pedia", icon: <BookOpen className="size-5" /> },
  { id: "data", label: "Dữ liệu", icon: <Database className="size-5" /> },
  { id: "settings", label: "Cài đặt", icon: <Settings className="size-5" /> },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 glow-primary">
            <Gamepad2 className="size-5 text-primary" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold gradient-text">CX9</span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ChevronLeft
            className={cn(
              "size-4 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              activeTab === item.id
                ? "bg-primary/10 text-primary glow-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "transition-colors",
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {item.icon}
            </span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-border p-4">
          <div className="rounded-xl bg-secondary/50 p-3">
            <p className="text-xs text-muted-foreground">Phiên bản</p>
            <p className="text-sm font-semibold text-foreground">v2.5.0</p>
          </div>
        </div>
      )}
    </aside>
  )
}
