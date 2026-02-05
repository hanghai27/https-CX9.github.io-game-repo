"use client"

import { useState } from "react"
import { Search, Filter, Grid3X3, List, Boxes, Play, Code2, Package, Users, Star, Download, ExternalLink, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface RobloxProject {
  id: string
  title: string
  image: string
  type: "game" | "plugin" | "model" | "script"
  status: "published" | "development" | "archived"
  description: string
  plays?: number
  downloads?: number
  rating?: number
  lastUpdated: string
}

const projectTypes = [
  { id: "all", label: "Tất cả", icon: Boxes },
  { id: "game", label: "Games", icon: Play },
  { id: "plugin", label: "Plugins", icon: Zap },
  { id: "model", label: "Models", icon: Package },
  { id: "script", label: "Scripts", icon: Code2 },
]

const projects: RobloxProject[] = [
  {
    id: "1",
    title: "Tower Defense Simulator VN",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=250&fit=crop",
    type: "game",
    status: "published",
    description: "Game thủ thành phong cách anime với Việt hóa hoàn chỉnh",
    plays: 125000,
    rating: 4.8,
    lastUpdated: "2 ngày trước",
  },
  {
    id: "2",
    title: "Vietnamese UI Library",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    type: "plugin",
    status: "published",
    description: "Thư viện UI components hỗ trợ tiếng Việt cho Roblox Studio",
    downloads: 8500,
    rating: 4.9,
    lastUpdated: "1 tuần trước",
  },
  {
    id: "3",
    title: "Character Customizer Pro",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
    type: "model",
    status: "published",
    description: "Hệ thống customize nhân vật với 100+ options",
    downloads: 15200,
    rating: 4.7,
    lastUpdated: "3 ngày trước",
  },
  {
    id: "4",
    title: "Auto Translate System",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    type: "script",
    status: "development",
    description: "Script tự động dịch text trong game sang tiếng Việt",
    downloads: 3200,
    rating: 4.5,
    lastUpdated: "5 ngày trước",
  },
  {
    id: "5",
    title: "Obby Adventure VN",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=250&fit=crop",
    type: "game",
    status: "development",
    description: "Game vượt chướng ngại vật với 50+ levels",
    plays: 45000,
    rating: 4.6,
    lastUpdated: "1 ngày trước",
  },
  {
    id: "6",
    title: "Combat System Framework",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop",
    type: "script",
    status: "published",
    description: "Framework chiến đấu hoàn chỉnh với combo system",
    downloads: 6800,
    rating: 4.8,
    lastUpdated: "4 ngày trước",
  },
]

const statusConfig = {
  published: { label: "Đã xuất bản", color: "bg-success/20 text-success border-success/30" },
  development: { label: "Đang phát triển", color: "bg-warning/20 text-warning border-warning/30" },
  archived: { label: "Lưu trữ", color: "bg-muted text-muted-foreground border-border" },
}

const typeConfig = {
  game: { label: "Game", icon: Play, color: "text-primary" },
  plugin: { label: "Plugin", icon: Zap, color: "text-warning" },
  model: { label: "Model", icon: Package, color: "text-info" },
  script: { label: "Script", icon: Code2, color: "text-success" },
}

function RobloxProjectCard({ project }: { project: RobloxProject }) {
  const status = statusConfig[project.status]
  const type = typeConfig[project.type]
  const TypeIcon = type.icon

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Type badge */}
        <div className="absolute left-3 top-3">
          <span className={cn("flex items-center gap-1.5 rounded-lg bg-card/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm", type.color)}>
            <TypeIcon className="size-3" />
            {type.label}
          </span>
        </div>

        {/* Status badge */}
        <div className="absolute right-3 top-3">
          <span className={cn("rounded-lg border px-2.5 py-1 text-xs font-medium backdrop-blur-sm", status.color)}>
            {status.label}
          </span>
        </div>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105">
            Xem chi tiết
          </button>
		  <button
		   aria-label="Mở liên kết dự án"
		   title="Mở liên kết dự án"
           className="rounded-xl border border-border bg-card/90 p-2 text-foreground transition-transform hover:scale-105">
            <ExternalLink className="size-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {project.plays !== undefined && (
              <span className="flex items-center gap-1">
                <Users className="size-3.5" />
                {(project.plays / 1000).toFixed(1)}K
              </span>
            )}
            {project.downloads !== undefined && (
              <span className="flex items-center gap-1">
                <Download className="size-3.5" />
                {(project.downloads / 1000).toFixed(1)}K
              </span>
            )}
            {project.rating && (
              <span className="flex items-center gap-1">
                <Star className="size-3.5 fill-warning text-warning" />
                {project.rating}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {project.lastUpdated}
          </span>
        </div>
      </div>
    </div>
  )
}

export function RobloxModule() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeType, setActiveType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = activeType === "all" || project.type === activeType
    return matchesSearch && matchesType
  })

  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.status === "published").length,
    development: projects.filter((p) => p.status === "development").length,
    totalPlays: projects.reduce((sum, p) => sum + (p.plays || 0), 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#00A2FF]/10" style={{ boxShadow: '0 0 20px rgba(0, 162, 255, 0.3)' }}>
              <Boxes className="size-6 text-[#00A2FF]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Roblox Studio</h2>
              <p className="text-sm text-muted-foreground">
                Quản lý dự án Roblox & tài nguyên
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Dự án</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{stats.published}</p>
            <p className="text-xs text-muted-foreground">Xuất bản</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[#00A2FF]">{(stats.totalPlays / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">Lượt chơi</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
			aria-label="Tìm kiếm dự án Roblox"
            placeholder="Tìm dự án Roblox..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#00A2FF] focus:outline-none focus:ring-1 focus:ring-[#00A2FF] transition-all"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-secondary p-1">
            <button
              onClick={() => setViewMode("grid")}
			  aria-label="Chế độ lưới"
			  title="Chế độ lưới"
              className={cn(
                "rounded-lg p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid3X3 className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
			  aria-label="Chế độ danh sách"
			  title="Chế độ danh sách"
              className={cn(
                "rounded-lg p-2 transition-colors",
                viewMode === "list"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            <Filter className="size-4" />
            Bộ lọc
          </button>
        </div>
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap gap-2">
        {projectTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                activeType === type.id
                  ? "bg-[#00A2FF] text-white shadow-lg shadow-[#00A2FF]/25"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {type.label}
            </button>
          )
        })}
      </div>

      {/* Projects grid */}
      <div
        className={cn(
          "grid gap-4",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {filteredProjects.map((project) => (
          <RobloxProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-2xl bg-secondary/50 p-4">
            <Boxes className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Không tìm thấy dự án</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Thử thay đổi từ khóa hoặc bộ lọc của bạn
          </p>
        </div>
      )}
    </div>
  )
}
