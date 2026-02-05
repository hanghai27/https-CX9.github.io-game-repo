"use client"

import {
  Gamepad2,
  Download,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Tổng dự án",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Gamepad2,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Lượt tải",
    value: "125.4K",
    change: "+12.5%",
    trend: "up",
    icon: Download,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Người dùng",
    value: "8.2K",
    change: "+5.2%",
    trend: "up",
    icon: Users,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "Đánh giá TB",
    value: "4.8",
    change: "-0.1",
    trend: "down",
    icon: Star,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
]

const recentActivity = [
  {
    title: "Plague Inc đã được cập nhật",
    time: "2 phút trước",
    type: "update",
  },
  {
    title: "Người dùng mới đăng ký",
    time: "15 phút trước",
    type: "user",
  },
  {
    title: "Stardew Valley - 500 lượt tải mới",
    time: "1 giờ trước",
    type: "download",
  },
  {
    title: "Hollow Knight phiên bản 2.0",
    time: "3 giờ trước",
    type: "release",
  },
  {
    title: "Genshin Impact bắt đầu Việt hóa",
    time: "5 giờ trước",
    type: "new",
  },
]

const topGames = [
  { name: "Plague Inc", downloads: "15.4K", progress: 100 },
  { name: "Stardew Valley", downloads: "25K", progress: 100 },
  { name: "Hollow Knight", downloads: "18.3K", progress: 100 },
  { name: "Genshin Impact", downloads: "45K", progress: 35 },
]

export function DashboardModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">
          Tổng quan hệ thống CX9
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-start justify-between">
              <div className={cn("rounded-xl p-2.5", stat.bgColor)}>
                <stat.icon className={cn("size-5", stat.color)} />
              </div>
              <div
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  stat.trend === "up" ? "text-success" : "text-destructive"
                )}
              >
                {stat.change}
                {stat.trend === "up" ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Hoạt động gần đây</h3>
            <button className="text-sm text-primary hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Games */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Top Games</h3>
            <TrendingUp className="size-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {topGames.map((game, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{game.name}</span>
                  <span className="text-xs text-muted-foreground">{game.downloads}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      game.progress === 100 ? "bg-success" : "bg-primary"
                    )}
                    style={{ width: `${game.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Hành động nhanh</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Thêm dự án mới", icon: Gamepad2 },
            { label: "Xem thống kê", icon: TrendingUp },
            { label: "Quản lý người dùng", icon: Users },
            { label: "Tải xuống báo cáo", icon: Download },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4 text-left transition-all hover:bg-secondary hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <action.icon className="size-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
