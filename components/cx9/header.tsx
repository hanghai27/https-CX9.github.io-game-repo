"use client"

import React from "react"

import { Search, Bell, User, Menu, Shield, Crown, UserCheck, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserInfo, UserRole } from "./login-screen"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HeaderProps {
  onMenuClick?: () => void
  currentUser?: UserInfo | null
}

const roleConfig: Record<UserRole, { label: string; color: string; icon: React.ReactNode; description: string }> = {
  admin: { 
    label: "Admin", 
    color: "bg-rose-500/20 text-rose-400 border-rose-500/30", 
    icon: <Shield className="size-3" />,
    description: "Toan quyen quan ly he thong"
  },
  moderator: { 
    label: "Mod", 
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30", 
    icon: <UserCheck className="size-3" />,
    description: "Quyen kiem duyet noi dung"
  },
  vip: { 
    label: "VIP", 
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30", 
    icon: <Crown className="size-3" />,
    description: "Thanh vien cao cap"
  },
  member: { 
    label: "Member", 
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", 
    icon: <Users className="size-3" />,
    description: "Quyen co ban"
  },
}

export function Header({ onMenuClick, currentUser }: HeaderProps) {
  const role = currentUser?.role || "member"
  const config = roleConfig[role]
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-4 backdrop-blur-xl lg:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
		aria-label="Mở menu"
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      {/* Search */}
      <div className="relative hidden flex-1 max-w-md lg:flex">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
		  aria-label="Tìm kiếm"
          placeholder="Tìm theo tên, ID hoặc trạng thái..."
          className="h-10 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Nav links - Desktop */}
      <nav className="hidden items-center gap-1 lg:flex">
        {["Trang chủ", "Pedia", "Wiki", "Tools"].map((item) => (
          <a
            key={item}
            href="#"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile search */}
		<button
          aria-label="Tìm kiếm"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden">
          <Search className="size-5" />
        </button>

        {/* Notifications */}
		<button
          aria-label="Thông báo"
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
        </button>

        {/* Profile with Role */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
			<button
              aria-label="Tài khoản người dùng"
               className="flex items-center gap-2 rounded-xl bg-secondary/50 p-1.5 pr-3 transition-colors hover:bg-secondary">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20">
                  <User className="size-4 text-primary" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-foreground leading-tight">
                    {currentUser?.username || "User"}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium leading-tight",
                    config.color
                  )}>
                    {config.icon}
                    {config.label}
                  </span>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">{currentUser?.username || "User"}</p>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}
