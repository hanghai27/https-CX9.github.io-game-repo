"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Database,
  BarChart3,
  FileText,
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  HardDrive,
  Clock,
  FileJson,
  Table,
  Activity,
  Eye,
  Copy,
  ExternalLink,
  RefreshCw,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  ChevronRight,
  Play,
  Code,
  Layers,
  Flame,
  AlertTriangle,
  RotateCcw,
  Settings2,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type SubTab = "overview" | "dataset" | "analysis" | "logs" | "export"

interface StatCard {
  label: string
  value: string // Đã sửa từ 'number' thành 'string' để khớp với dữ liệu (VD: "2.4M")
  change: string // Đã sửa từ 'number' thành 'string' để khớp với dữ liệu (VD: "+12.5%")
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

interface Dataset {
  id: string
  name: string
  type: "json" | "csv" | "sql"
  records: number
  size: string
  sizeGB: number
  quotaGB: number
  lastUpdated: string
  status: "active" | "archived" | "processing"
  health: "stable" | "growing" | "risk"
  growthRate: number
}

interface LogEntry {
  id: string
  timestamp: string
  date: string
  level: "info" | "warning" | "error" | "success"
  message: string
  source: string
  actionable?: boolean
}

interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  description: string
  status: "active" | "deprecated"
}

const stats: StatCard[] = [
  {
    label: "Tổng bản ghi",
    value: "2.4M",
    change: "+12.5%",
    trend: "up",
    icon: <Database className="size-5" />,
  },
  {
    label: "Dataset",
    value: "48",
    change: "+3",
    trend: "up",
    icon: <Layers className="size-5" />,
  },
  {
    label: "Dung lượng",
    value: "156 GB",
    change: "+8.2%",
    trend: "up",
    icon: <HardDrive className="size-5" />,
  },
  {
    label: "API Requests",
    value: "89.2K",
    change: "-2.1%",
    trend: "down",
    icon: <Activity className="size-5" />,
  },
]

// Smart alerts
interface SmartAlert {
  id: string
  type: "warning" | "info" | "success"
  title: string
  description: string
  actionLabel?: string
}

const smartAlerts: SmartAlert[] = [
  {
    id: "1",
    type: "warning",
    title: "web_pages sap cham 50GB",
    description:
      "Con 5GB nua la dat nguong quota. Xem xet xoa du lieu cu hoac nang cap.",
    actionLabel: "Quan ly",
  },
  {
    id: "2",
    type: "info",
    title: "API latency tang 15% hom nay",
    description:
      "So voi trung binh 7 ngay truoc. Co the do luong truy van tang.",
    actionLabel: "Xem chi tiet",
  },
  {
    id: "3",
    type: "success",
    title: "site_analytics tang truong nhanh nhat",
    description: "+35% ban ghi moi trong 24h qua.",
  },
]

const datasets: Dataset[] = [
  {
    id: "1",
    name: "web_pages",
    type: "json",
    records: 345678,
    size: "45.2 GB",
    sizeGB: 45.2,
    quotaGB: 50,
    lastUpdated: "1 gio truoc",
    status: "active",
    health: "risk",
    growthRate: 22,
  },
  {
    id: "2",
    name: "site_analytics",
    type: "sql",
    records: 1289450,
    size: "18.5 GB",
    sizeGB: 18.5,
    quotaGB: 30,
    lastUpdated: "15 phut truoc",
    status: "active",
    health: "growing",
    growthRate: 35,
  },
  {
    id: "3",
    name: "user_sessions",
    type: "sql",
    records: 567890,
    size: "8.3 GB",
    sizeGB: 8.3,
    quotaGB: 20,
    lastUpdated: "30 phut truoc",
    status: "active",
    health: "stable",
    growthRate: 12,
  },
  {
    id: "4",
    name: "page_content",
    type: "json",
    records: 89234,
    size: "12.6 GB",
    sizeGB: 12.6,
    quotaGB: 25,
    lastUpdated: "2 gio truoc",
    status: "processing",
    health: "growing",
    growthRate: 18,
  },
  {
    id: "5",
    name: "seo_metadata",
    type: "csv",
    records: 156789,
    size: "3.2 GB",
    sizeGB: 3.2,
    quotaGB: 10,
    lastUpdated: "4 gio truoc",
    status: "active",
    health: "stable",
    growthRate: 5,
  },
  {
    id: "6",
    name: "legacy_pages_2024",
    type: "sql",
    records: 234567,
    size: "28.4 GB",
    sizeGB: 28.4,
    quotaGB: 40,
    lastUpdated: "1 thang truoc",
    status: "archived",
    health: "stable",
    growthRate: 0,
  },
]

const logs: LogEntry[] = [
  {
    id: "1",
    timestamp: "14:32:05",
    date: "Hom nay",
    level: "success",
    message: "Backup hoan tat: web_pages (45.2 GB)",
    source: "Backup Service",
    actionable: false,
  },
  {
    id: "2",
    timestamp: "14:28:12",
    date: "Hom nay",
    level: "info",
    message: "API request tu 192.168.1.105 - GET /api/pages",
    source: "API Gateway",
    actionable: false,
  },
  {
    id: "3",
    timestamp: "14:25:33",
    date: "Hom nay",
    level: "warning",
    message: "Dung luong dataset web_pages gan dat nguong 50GB",
    source: "Storage Monitor",
    actionable: true,
  },
  {
    id: "4",
    timestamp: "14:20:18",
    date: "Hom nay",
    level: "error",
    message: "Ket noi database timeout sau 30s",
    source: "Database Pool",
    actionable: true,
  },
  {
    id: "5",
    timestamp: "09:15:45",
    date: "Hom qua",
    level: "info",
    message: "Crawl 5,234 trang web moi hoan tat",
    source: "Web Crawler",
    actionable: false,
  },
  {
    id: "6",
    timestamp: "08:10:22",
    date: "Hom qua",
    level: "success",
    message: "Import 18,456 ban ghi analytics vao site_analytics",
    source: "Import Service",
    actionable: false,
  },
  {
    id: "7",
    timestamp: "22:45:12",
    date: "Hom qua",
    level: "error",
    message: "API rate limit exceeded tu IP 192.168.1.200",
    source: "API Gateway",
    actionable: true,
  },
]

const apiEndpoints: ApiEndpoint[] = [
  {
    method: "GET",
    endpoint: "/api/v2/pages",
    description: "Lay danh sach trang web",
    status: "active",
  },
  {
    method: "POST",
    endpoint: "/api/v2/pages/crawl",
    description: "Crawl va luu trang web moi",
    status: "active",
  },
  {
    method: "GET",
    endpoint: "/api/v2/analytics/{domain}",
    description: "Lay thong ke truy cap theo domain",
    status: "active",
  },
  {
    method: "PUT",
    endpoint: "/api/v2/pages/{id}/content",
    description: "Cap nhat noi dung trang",
    status: "active",
  },
  {
    method: "GET",
    endpoint: "/api/v2/seo/{page_id}",
    description: "Lay metadata SEO cua trang",
    status: "active",
  },
  {
    method: "DELETE",
    endpoint: "/api/v1/pages/{id}",
    description: "Xoa trang (deprecated)",
    status: "deprecated",
  },
  {
    method: "GET",
    endpoint: "/api/v2/export/{format}",
    description: "Xuat du lieu theo dinh dang",
    status: "active",
  },
]

const subTabs = [
  { id: "overview" as SubTab, label: "Tổng quan", icon: <BarChart3 className="size-4" /> },
  { id: "dataset" as SubTab, label: "Dataset", icon: <Layers className="size-4" /> },
  { id: "analysis" as SubTab, label: "Phân tích", icon: <TrendingUp className="size-4" /> },
  { id: "logs" as SubTab, label: "Nhật ký", icon: <FileText className="size-4" /> },
  { id: "export" as SubTab, label: "Xuất / API", icon: <Code className="size-4" /> },
]

export function DataModule() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "json":
        return <FileJson className="size-4 text-yellow-400" />
      case "csv":
        return <Table className="size-4 text-green-400" />
      case "sql":
        return <Database className="size-4 text-blue-400" />
      default:
        return <FileText className="size-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-600">
            <span className="size-1.5 rounded-full bg-green-500" />
            Hoat dong
          </span>
        )
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-600">
            <span className="size-1.5 animate-pulse rounded-full bg-yellow-500" />
            Dang xu ly
          </span>
        )
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Luu tru
          </span>
        )
      default:
        return null
    }
  }

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "stable":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
            Stable
          </span>
        )
      case "growing":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-400">
            <Flame className="size-3" />
            Growing fast
          </span>
        )
      case "risk":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
            <AlertTriangle className="size-3" />
            Risk
          </span>
        )
      default:
        return null
    }
  }

  const getLogIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle className="size-4 text-green-500" />
      case "warning":
        return <AlertCircle className="size-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="size-4 text-red-500" />
      default:
        return <Info className="size-4 text-blue-500" />
    }
  }

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      GET: "bg-green-500/20 text-green-400",
      POST: "bg-blue-500/20 text-blue-400",
      PUT: "bg-yellow-500/20 text-yellow-400",
      DELETE: "bg-red-500/20 text-red-400",
    }
    return (
      <span
        className={cn(
          "rounded px-2 py-0.5 text-xs font-mono font-bold",
          colors[method]
        )}
      >
        {method}
      </span>
    )
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-border bg-card/50 backdrop-blur-sm"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-info/10 p-2 text-info">
                  {stat.icon}
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                  )}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="size-3" />
                  ) : stat.trend === "down" ? (
                    <TrendingDown className="size-3" />
                  ) : null}
                  {stat.change}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Smart Alerts */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Zap className="size-4 text-yellow-500" />
          Canh bao thong minh
        </h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {smartAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={cn(
                "border-l-4 bg-card/50 backdrop-blur-sm",
                alert.type === "warning" && "border-l-yellow-500",
                alert.type === "info" && "border-l-blue-500",
                alert.type === "success" && "border-l-green-500"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "rounded-lg p-2",
                      alert.type === "warning" &&
                        "bg-yellow-500/10 text-yellow-500",
                      alert.type === "info" && "bg-blue-500/10 text-blue-500",
                      alert.type === "success" &&
                        "bg-green-500/10 text-green-500"
                    )}
                  >
                    {alert.type === "warning" && (
                      <AlertTriangle className="size-4" />
                    )}
                    {alert.type === "info" && <Info className="size-4" />}
                    {alert.type === "success" && <Flame className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">
                      {alert.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {alert.description}
                    </p>
                    {alert.actionLabel && (
                      <Button
                        size="sm"
                        variant="link"
                        className="mt-2 h-auto p-0 text-xs text-primary"
                      >
                        {alert.actionLabel}
                        <ArrowUpRight className="ml-1 size-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Time Comparison */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="size-4 text-primary" />
            So sanh thoi gian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Chi so
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Hom nay
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Hom qua
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    7 ngay truoc
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Thay doi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 text-foreground">API Requests</td>
                  <td className="py-3 text-right font-mono">89.2K</td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    78.5K
                  </td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    72.1K
                  </td>
                  <td className="py-3 text-right">
                    <span className="flex items-center justify-end gap-1 text-green-500">
                      <ArrowUpRight className="size-3" />
                      +13.6%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-foreground">Ban ghi moi</td>
                  <td className="py-3 text-right font-mono">12.4K</td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    9.8K
                  </td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    8.2K
                  </td>
                  <td className="py-3 text-right">
                    <span className="flex items-center justify-end gap-1 text-green-500">
                      <ArrowUpRight className="size-3" />
                      +26.5%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-foreground">Latency trung binh</td>
                  <td className="py-3 text-right font-mono">45ms</td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    39ms
                  </td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    38ms
                  </td>
                  <td className="py-3 text-right">
                    <span className="flex items-center justify-end gap-1 text-red-500">
                      <ArrowDownRight className="size-3" />
                      +15.4%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-foreground">Error rate</td>
                  <td className="py-3 text-right font-mono">0.12%</td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    0.15%
                  </td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    0.18%
                  </td>
                  <td className="py-3 text-right">
                    <span className="flex items-center justify-end gap-1 text-green-500">
                      <ArrowDownRight className="size-3" />
                      -20%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <RefreshCw className="size-4 text-primary" />
              Dong bo du lieu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Lan cuoi: 2 gio truoc
            </p>
            <Button
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <RefreshCw className="mr-2 size-4" />
              Dong bo ngay
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Download className="size-4 text-green-500" />
              Sao luu he thong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              Backup tu dong: Bat
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-transparent"
            >
              <Download className="mr-2 size-4" />
              Tao backup
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="size-4 text-info" />
              Tinh trang he thong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Database</span>
                <span className="flex items-center gap-1 text-green-500">
                  <span className="size-2 rounded-full bg-green-500" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">API Server</span>
                <span className="flex items-center gap-1 text-green-500">
                  <span className="size-2 rounded-full bg-green-500" />
                  Online
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5 text-primary" />
            Hoat dong gan day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3"
              >
                {getLogIcon(log.level)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{log.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {log.source} - {log.date} {log.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDataset = () => (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tim kiem dataset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Loc
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Database className="mr-2 size-4" />
            Tao dataset
          </Button>
        </div>
      </div>

      {/* Dataset List */}
      <div className="space-y-3">
        {datasets.map((dataset) => {
          const usagePercent = (dataset.sizeGB / dataset.quotaGB) * 100
          return (
            <Card
              key={dataset.id}
              className={cn(
                "group border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80",
                dataset.health === "risk" && "border-l-4 border-l-red-500"
              )}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-secondary p-3">
                        {getTypeIcon(dataset.type)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-mono font-semibold text-foreground">
                            {dataset.name}
                          </h3>
                          {getStatusBadge(dataset.status)}
                          {getHealthBadge(dataset.health)}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span>
                            {dataset.records.toLocaleString()} ban ghi
                          </span>
                          <span>-</span>
                          <span>
                            {dataset.size} / {dataset.quotaGB} GB
                          </span>
                          <span>-</span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {dataset.lastUpdated}
                          </span>
                          {dataset.growthRate > 0 && (
                            <>
                              <span>-</span>
                              <span
                                className={cn(
                                  "flex items-center gap-1",
                                  dataset.growthRate > 20
                                    ? "text-yellow-500"
                                    : "text-muted-foreground"
                                )}
                              >
                                <TrendingUp className="size-3" />+
                                {dataset.growthRate}% / thang
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        title="Xem schema"
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        title="Phan tich"
                      >
                        <BarChart3 className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        title="Export nhanh"
                      >
                        <Download className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Dung luong su dung
                      </span>
                      <span
                        className={cn(
                          "font-medium",
                          usagePercent > 85
                            ? "text-red-400"
                            : usagePercent > 60
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {usagePercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          usagePercent > 85
                            ? "bg-red-500"
                            : usagePercent > 60
                            ? "bg-yellow-500"
                            : "bg-primary"
                        )}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderAnalysis = () => {
    const totalSize = datasets.reduce((sum, d) => sum + d.sizeGB, 0)
    return (
      <div className="space-y-6">
        {/* Auto Insights */}
        <Card className="border-border bg-gradient-to-r from-primary/5 to-info/5 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="size-4 text-yellow-500" />
              Insight tu dong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg bg-card/50 p-3">
                <div className="rounded-full bg-info/10 p-2">
                  <Layers className="size-4 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    web_pages chiem 39% tong dung luong
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dataset lon nhat trong he thong
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-card/50 p-3">
                <div className="rounded-full bg-yellow-500/10 p-2">
                  <AlertTriangle className="size-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    web_pages gan dat nguong 50GB
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Con 5GB nua la day quota
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-card/50 p-3">
                <div className="rounded-full bg-green-500/10 p-2">
                  <TrendingUp className="size-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    +28% ban ghi moi trong 24h
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tang truong cao nhat tuan nay
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toggle Tabs */}
        <div className="flex gap-2">
          {["Theo dataset", "Theo thoi gian", "Theo service"].map((tab, i) => (
            <Button
              key={tab}
              variant="outline"
              size="sm"
              className={cn(
                i === 0 && "bg-primary/10 text-primary border-primary/30"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Analysis Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="size-4 text-green-500" />
                Tang truong du lieu
              </CardTitle>
              <CardDescription>30 ngay qua</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-lg bg-secondary/30">
                <div className="text-center">
                  <BarChart3 className="mx-auto size-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Bieu do tang truong
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-green-500">+24.5%</p>
                  <p className="text-xs text-muted-foreground">Ban ghi moi</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-info">+12.3%</p>
                  <p className="text-xs text-muted-foreground">Dung luong</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-yellow-500">+8.7%</p>
                  <p className="text-xs text-muted-foreground">API calls</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="size-4 text-info" />
                Phan bo du lieu
              </CardTitle>
              <CardDescription>
                Theo dataset - Tong {totalSize.toFixed(1)} GB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {datasets.slice(0, 4).map((dataset) => {
                  const percent = (dataset.sizeGB / totalSize) * 100
                  return (
                    <div key={dataset.id}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {dataset.name}
                        </span>
                        <span className="text-muted-foreground">
                          {dataset.size} ({percent.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-info"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Resource Consumers */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Activity className="size-4 text-red-500" />
                Query ton tai nguyen nhat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { query: "JOIN translations...", time: "245ms", cpu: "high" },
                  { query: "AGGREGATE stats...", time: "189ms", cpu: "medium" },
                  { query: "FULL SCAN posts...", time: "156ms", cpu: "medium" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <code className="truncate text-xs text-muted-foreground">
                      {item.query}
                    </code>
                    <span
                      className={cn(
                        "font-mono text-xs",
                        item.cpu === "high" ? "text-red-500" : "text-yellow-500"
                      )}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Database className="size-4 text-info" />
                Dataset goi API nhieu nhat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "web_pages", calls: "52.3K" },
                  { name: "site_analytics", calls: "38.7K" },
                  { name: "user_sessions", calls: "24.1K" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="truncate text-muted-foreground">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs text-info">
                      {item.calls}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Flame className="size-4 text-yellow-500" />
                Tang truong nhanh nhat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {datasets
                  .filter((d) => d.growthRate > 0)
                  .sort((a, b) => b.growthRate - a.growthRate)
                  .slice(0, 3)
                  .map((dataset) => (
                    <div
                      key={dataset.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="truncate text-muted-foreground">
                        {dataset.name}
                      </span>
                      <span className="font-mono text-xs text-green-500">
                        +{dataset.growthRate}%
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Queries */}
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              Truy van pho bien
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  query: "SELECT * FROM web_pages WHERE domain = ?",
                  count: "18.4K",
                  time: "42ms",
                  status: "good",
                },
                {
                  query: "INSERT INTO site_analytics VALUES (...)",
                  count: "12.2K",
                  time: "28ms",
                  status: "good",
                },
                {
                  query: "UPDATE page_content SET html = ? WHERE id = ?",
                  count: "7.6K",
                  time: "35ms",
                  status: "good",
                },
                {
                  query: "SELECT COUNT(*) FROM user_sessions",
                  count: "5.1K",
                  time: "15ms",
                  status: "good",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-lg bg-secondary/30 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <code className="flex-1 truncate font-mono text-sm text-foreground">
                    {item.query}
                  </code>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {item.count} lan
                    </span>
                    <span
                      className={cn(
                        "font-mono",
                        Number.parseInt(item.time) > 100
                          ? "text-red-500"
                          : Number.parseInt(item.time) > 50
                          ? "text-yellow-500"
                          : "text-green-500"
                      )}
                    >
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderLogs = () => {
    // Group logs by date
    const groupedLogs = logs.reduce<Record<string, LogEntry[]>>((acc, log) => {
      if (!acc[log.date]) acc[log.date] = []
      acc[log.date].push(log)
      return acc
    }, {})

    return (
      <div className="space-y-4">
        {/* Filter Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {["Tat ca", "Info", "Warning", "Error", "Success"].map((level) => (
              <Button
                key={level}
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs",
                  level === "Tat ca" &&
                    "bg-primary/10 text-primary border-primary/30"
                )}
              >
                {level}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 size-4" />
              Hom nay
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </div>

        {/* Grouped Logs List */}
        <div className="space-y-4">
          {Object.entries(groupedLogs).map(([date, dateLogs]) => (
            <div key={date}>
              {/* Date Header */}
              <div className="sticky top-0 z-10 mb-2 flex items-center gap-2 bg-background/80 py-2 backdrop-blur-sm">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {date}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({dateLogs.length} log)
                </span>
              </div>

              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {dateLogs.map((log) => (
                      <div
                        key={log.id}
                        className={cn(
                          "flex items-start gap-4 p-4 transition-colors hover:bg-secondary/20 cursor-pointer",
                          log.level === "error" &&
                            "border-l-2 border-l-red-500",
                          log.level === "warning" &&
                            "border-l-2 border-l-yellow-500"
                        )}
                      >
                        <div className="mt-0.5">{getLogIcon(log.level)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">
                            {log.message}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono">
                              {log.source}
                            </span>
                            <span>{log.timestamp}</span>
                          </div>

                          {/* Action Buttons for actionable logs */}
                          {log.actionable && (
                            <div className="mt-2 flex gap-2">
                              {log.level === "error" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs bg-transparent"
                                  >
                                    <RotateCcw className="mr-1 size-3" />
                                    Retry
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs bg-transparent"
                                  >
                                    <FileText className="mr-1 size-3" />
                                    Chi tiet loi
                                  </Button>
                                </>
                              )}
                              {log.level === "warning" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs bg-transparent"
                                >
                                  <Settings2 className="mr-1 size-3" />
                                  Dieu chinh nguong
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="shrink-0 text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Xem them nhat ky</Button>
        </div>
      </div>
    )
  }

  const renderExport = () => (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            format: "JSON",
            icon: <FileJson className="size-6" />,
            color: "text-yellow-400 bg-yellow-400/10",
          },
          {
            format: "CSV",
            icon: <Table className="size-6" />,
            color: "text-green-400 bg-green-400/10",
          },
          {
            format: "SQL",
            icon: <Database className="size-6" />,
            color: "text-blue-400 bg-blue-400/10",
          },
          {
            format: "Excel",
            icon: <FileText className="size-6" />,
            color: "text-emerald-400 bg-emerald-400/10",
          },
        ].map((item) => (
          <Card
            key={item.format}
            className="group cursor-pointer border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
          >
            <CardContent className="p-6 text-center">
              <div
                className={cn("mx-auto mb-3 w-fit rounded-xl p-3", item.color)}
              >
                {item.icon}
              </div>
              <h3 className="font-semibold text-foreground">
                Xuất {item.format}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Tải về định dạng {item.format}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-4 w-full bg-transparent"
              >
                <Download className="mr-2 size-4" />
                Xuất file
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Documentation */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="size-5 text-primary" />
            API Quan ly trang web
          </CardTitle>
          <CardDescription>
            API quan ly du lieu trang web va analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiEndpoints.map((api, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-3 rounded-lg bg-secondary/30 p-4 sm:flex-row sm:items-center sm:justify-between",
                  api.status === "deprecated" && "opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  {getMethodBadge(api.method)}
                  <code className="font-mono text-sm text-foreground">
                    {api.endpoint}
                  </code>
                  {api.status === "deprecated" && (
                    <span className="rounded bg-destructive/20 px-1.5 py-0.5 text-xs text-destructive">
                      Deprecated
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {api.description}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Play className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Key */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ExternalLink className="size-4 text-yellow-500" />
            API Key
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Input
              type="password"
              value="cx9_sk_live_xxxxxxxxxxxxxxxxxxxxx"
              readOnly
              className="font-mono bg-secondary/50 border-border"
            />
            <Button variant="outline" size="sm">
              <Copy className="mr-2 size-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 size-4" />
              Tạo mới
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Giữ bí mật API key. Không chia sẻ hoặc commit vào code.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSubTab) {
      case "overview":
        return renderOverview()
      case "dataset":
        return renderDataset()
      case "analysis":
        return renderAnalysis()
      case "logs":
        return renderLogs()
      case "export":
        return renderExport()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
            Dữ liệu
          </h1>
          <p className="mt-1 text-muted-foreground">
            Quản lý và phân tích dữ liệu hệ thống
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              activeSubTab === tab.id
                ? "bg-info/10 text-info"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  )
}