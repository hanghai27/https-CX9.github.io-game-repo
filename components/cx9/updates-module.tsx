"use client"

import React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Filter,
  Gamepad2,
  Globe,
  Megaphone,
  Package,
  Search,
  Sparkles,
  Tag,
  Wrench,
  Zap,
} from "lucide-react"
const colorMap = {
  primary: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
  },
  warning: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
  },
  success: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
  },
} as const

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type UpdateType = "all" | "release" | "patch" | "announcement" | "feature"

interface Update {
  id: string
  title: string
  description: string
  type: "release" | "patch" | "announcement" | "feature"
  version?: string
  date: string
  isNew: boolean
  changes?: string[]
  relatedGame?: string
}

const updates: Update[] = [
  {
    id: "1",
    title: "CX9 System v2.5.0",
    description: "Phiên bản mới với giao diện hoàn toàn mới, tối ưu hiệu suất và nhiều tính năng hấp dẫn.",
    type: "release",
    version: "2.5.0",
    date: "2024-01-15",
    isNew: true,
    changes: [
      "Giao diện Dark Mode hoàn toàn mới",
      "Tối ưu tốc độ tải trang 40%",
      "Thêm module Roblox Studio",
      "Cải thiện trải nghiệm mobile",
    ],
  },
  {
    id: "2",
    title: "Việt hóa Genshin Impact 4.4",
    description: "Cập nhật bản Việt hóa mới nhất cho phiên bản Lantern Rite.",
    type: "patch",
    version: "4.4.0",
    date: "2024-01-12",
    isNew: true,
    relatedGame: "Genshin Impact",
    changes: [
      "Việt hóa toàn bộ quest Lantern Rite",
      "Thêm nhân vật Xianyun",
      "Sửa lỗi font chữ",
    ],
  },
  {
    id: "3",
    title: "Thông báo bảo trì hệ thống",
    description: "Hệ thống sẽ bảo trì từ 2:00 - 4:00 AM ngày 20/01/2024 để nâng cấp server.",
    type: "announcement",
    date: "2024-01-10",
    isNew: false,
  },
  {
    id: "4",
    title: "Tính năng mới: Auto-Update",
    description: "Giờ đây bạn có thể bật tự động cập nhật cho các bản Việt hóa yêu thích.",
    type: "feature",
    date: "2024-01-08",
    isNew: false,
    changes: [
      "Tự động kiểm tra phiên bản mới",
      "Thông báo khi có cập nhật",
      "Tải xuống và cài đặt tự động",
    ],
  },
  {
    id: "5",
    title: "Việt hóa Honkai: Star Rail 1.6",
    description: "Bản cập nhật Việt hóa cho phiên bản 1.6 với Penacony hoàn chỉnh.",
    type: "patch",
    version: "1.6.0",
    date: "2024-01-05",
    isNew: false,
    relatedGame: "Honkai: Star Rail",
    changes: [
      "Hoàn thiện Penacony Chapter",
      "Việt hóa nhân vật Black Swan",
      "Cập nhật thuật ngữ mới",
    ],
  },
  {
    id: "6",
    title: "CX9 System v2.4.5",
    description: "Bản vá lỗi và cải thiện hiệu suất.",
    type: "release",
    version: "2.4.5",
    date: "2024-01-02",
    isNew: false,
    changes: [
      "Sửa lỗi crash khi tải game",
      "Cải thiện bộ nhớ sử dụng",
      "Sửa lỗi hiển thị trên iOS",
    ],
  },
]

const typeConfig = {
  release: {
    label: "Phát hành",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  patch: {
    label: "Bản vá",
    icon: Wrench,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
  },
  announcement: {
    label: "Thông báo",
    icon: Megaphone,
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/30",
  },
  feature: {
    label: "Tính năng",
    icon: Sparkles,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
  },
}

const filterTypes: { id: UpdateType; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Tất cả", icon: <Bell className="size-4" /> },
  { id: "release", label: "Phát hành", icon: <Package className="size-4" /> },
  { id: "patch", label: "Bản vá", icon: <Wrench className="size-4" /> },
  { id: "announcement", label: "Thông báo", icon: <Megaphone className="size-4" /> },
  { id: "feature", label: "Tính năng", icon: <Sparkles className="size-4" /> },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function UpdateCard({ update }: { update: Update }) {
  const config = typeConfig[update.type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        update.isNew && "border-primary/50"
      )}
    >
      {/* New badge */}
      {update.isNew && (
        <div className="absolute right-4 top-4">
          <Badge className="bg-primary text-primary-foreground">
            <Zap className="mr-1 size-3" />
            Mới
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-start gap-4">
        <div className={cn("rounded-xl p-3", config.bgColor)}>
          <Icon className={cn("size-6", config.color)} />
        </div>
        <div className="flex-1 pr-16">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className={cn("text-xs", config.color, config.borderColor)}>
              {config.label}
            </Badge>
            {update.version && (
              <Badge variant="secondary" className="text-xs">
                <Tag className="mr-1 size-3" />
                v{update.version}
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{update.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {update.description}
      </p>

      {/* Related game */}
      {update.relatedGame && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Gamepad2 className="size-4" />
          <span>{update.relatedGame}</span>
        </div>
      )}

      {/* Changes list */}
      {update.changes && update.changes.length > 0 && (
        <div className="mb-4 rounded-xl bg-secondary/50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Thay đổi
          </p>
          <ul className="space-y-2">
            {update.changes.map((change, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-4" />
          <span>{formatDate(update.date)}</span>
        </div>
        <div className="flex gap-2">
          {update.type === "patch" && (
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Download className="size-4" />
              Tải xuống
            </Button>
          )}
          <Button size="sm" variant="ghost" className="gap-2">
            <ExternalLink className="size-4" />
            Chi tiết
          </Button>
        </div>
      </div>
    </div>
  )
}

export function UpdatesModule() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeType, setActiveType] = useState<UpdateType>("all")

  type StatColor = keyof typeof colorMap

  const stats: {
    label: string
    value: number
    icon: React.ElementType
    color: StatColor
  }[] = [
    { label: "Tổng cập nhật", value: updates.length, icon: Globe, color: "primary" },
    { label: "Phát hành", value: updates.filter((u) => u.type === "release").length, icon: Package, color: "primary" },
    { label: "Bản vá", value: updates.filter((u) => u.type === "patch").length, icon: Wrench, color: "warning" },
    { label: "Tính năng mới", value: updates.filter((u) => u.type === "feature").length, icon: Sparkles, color: "success" },
  ]

  const filteredUpdates = updates.filter((update) => {
    const matchesSearch =
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = activeType === "all" || update.type === activeType
    return matchesSearch && matchesType
  })

  const newUpdatesCount = updates.filter((u) => u.isNew).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Cập nhật</h1>
          <p className="mt-1 text-muted-foreground">
            Theo dõi các bản cập nhật và thông báo mới nhất
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1 px-3 py-1.5">
            <Clock className="size-4" />
            {newUpdatesCount} mới
          </Badge>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={cn("rounded-xl p-3", colorMap[stat.color].bg)}>
                <stat.icon className={cn("size-5", colorMap[stat.color].text)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm cập nhật..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 rounded-xl border-border bg-secondary/50 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <Filter className="size-4 shrink-0 text-muted-foreground" />
          {filterTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                activeType === type.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Updates list */}
      <div className="space-y-4">
        {filteredUpdates.length > 0 ? (
          filteredUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-2xl bg-muted p-4">
              <Bell className="size-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Không tìm thấy cập nhật</h3>
            <p className="mt-2 max-w-md text-muted-foreground">
              Không có cập nhật nào phù hợp với bộ lọc hiện tại
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
