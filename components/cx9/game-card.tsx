"use client"

import { cn } from "@/lib/utils"
import { Download, BookOpen, ExternalLink } from "lucide-react"

export interface Game {
  id: string
  title: string
  image: string
  status: "done" | "testing" | "progress"
  category: string
  description?: string
  downloads?: number
}

interface GameCardProps {
  game: Game
}

const statusConfig = {
  done: {
    label: "Hoàn thành",
    className: "bg-success/10 text-success border-success/20",
  },
  testing: {
    label: "Đang cập nhật",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  progress: {
    label: "Đang phát triển",
    className: "bg-info/10 text-info border-info/20",
  },
}

export function GameCard({ game }: GameCardProps) {
  const status = statusConfig[game.status]

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
              status.className
            )}
          >
            {status.label}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
            <ExternalLink className="size-4" />
            Xem chi tiết
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{game.title}</h3>
          <span className="shrink-0 rounded-lg bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            {game.category}
          </span>
        </div>

        {game.description && (
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {game.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {game.status === "done" ? (
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
              <Download className="size-4" />
              Tải Việt hóa
            </button>
          ) : (
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
              <BookOpen className="size-4" />
              Hướng dẫn
            </button>
          )}
        </div>

        {/* Downloads count */}
        {game.downloads && (
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Download className="size-3" />
            <span>{game.downloads.toLocaleString()} lượt tải</span>
          </div>
        )}
      </div>
    </div>
  )
}
