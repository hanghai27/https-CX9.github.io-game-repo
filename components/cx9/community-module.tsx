"use client"

import React from "react"
import { Info as LucideInfo, X as LucideX } from "lucide-react" // Import Info and X components
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  MessageSquare,
  Heart,
  Eye,
  Clock,
  TrendingUp,
  Pin,
  Plus,
  Filter,
  ChevronRight,
  Award,
  Star,
  Flame,
  Users,
  BookOpen,
  HelpCircle,
  Megaphone,
  Trash2,
  MoreVertical,
  Edit,
} from "lucide-react"
import type { UserInfo } from "./login-screen"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type PostCategory = "all" | "discussion" | "guide" | "question" | "announcement"

interface Post {
  id: string
  title: string
  authorId: string // unique author identifier
  author: {
    name: string
    avatar: string
    role: "admin" | "moderator" | "member" | "vip"
  }
  category: PostCategory
  content: string
  views: number
  likes: number
  comments: number
  createdAt: string
  isPinned?: boolean
  isHot?: boolean
  tags: string[]
}

const posts: Post[] = [
  {
    id: "1",
    authorId: "admin", // demo: login with "admin" to see delete button
    title: "Huong dan chi tiet cach Viet hoa game Unity tu A-Z",
    author: { name: "admin", avatar: "AD", role: "admin" },
    category: "guide",
    content: "Bai huong dan day du ve quy trinh Viet hoa game Unity, bao gom extract assets, dich text, va pack lai...",
    views: 5420,
    likes: 342,
    comments: 89,
    createdAt: "2 gio truoc",
    isPinned: true,
    isHot: true,
    tags: ["Unity", "Huong dan", "Viet hoa"],
  },
  {
    id: "2",
    authorId: "nguyenvana",
    title: "Thao luan: Nhung game nao nen duoc Viet hoa tiep theo?",
    author: { name: "Nguyen Van A", avatar: "NA", role: "vip" },
    category: "discussion",
    content: "Minh muon hoi y kien cong dong ve nhung game ma moi nguoi mong muon duoc Viet hoa trong thoi gian toi...",
    views: 2150,
    likes: 187,
    comments: 156,
    createdAt: "5 gio truoc",
    isHot: true,
    tags: ["Thao luan", "De xuat"],
  },
  {
    id: "3",
    authorId: "tranminhb",
    title: "Can giup do: Loi font chu khi Viet hoa Unreal Engine 5",
    author: { name: "Tran Minh B", avatar: "TB", role: "member" },
    category: "question",
    content: "Minh gap van de voi viec hien thi tieng Viet co dau trong UE5, da thu nhieu cach nhung van bi loi...",
    views: 856,
    likes: 45,
    comments: 32,
    createdAt: "1 ngay truoc",
    tags: ["UE5", "Font", "Hoi dap"],
  },
  {
    id: "4",
    authorId: "admin",
    title: "Thong bao: Phien ban CX9 v2.5.0 da duoc phat hanh!",
    author: { name: "admin", avatar: "AD", role: "admin" },
    category: "announcement",
    content: "Chung toi vui mung thong bao phien ban moi nhat cua CX9 System da chinh thuc duoc phat hanh voi nhieu tinh nang moi...",
    views: 8920,
    likes: 567,
    comments: 234,
    createdAt: "2 ngay truoc",
    isPinned: true,
    tags: ["Thong bao", "Cap nhat"],
  },
  {
    id: "5",
    authorId: "lehoangc",
    title: "Chia se kinh nghiem dich thuat game RPG",
    author: { name: "Le Hoang C", avatar: "LC", role: "moderator" },
    category: "guide",
    content: "Sau nhieu nam tham gia Viet hoa, minh muon chia se mot so kinh nghiem khi dich cac game RPG voi he thong text phuc tap...",
    views: 1560,
    likes: 198,
    comments: 67,
    createdAt: "3 ngay truoc",
    tags: ["RPG", "Kinh nghiem", "Dich thuat"],
  },
  {
    id: "6",
    authorId: "phamvand",
    title: "Tim cong tac vien cho du an Viet hoa Hollow Knight",
    author: { name: "Pham Van D", avatar: "PD", role: "member" },
    category: "discussion",
    content: "Nhom minh dang can them thanh vien de hoan thanh du an Viet hoa Hollow Knight, uu tien nguoi co kinh nghiem...",
    views: 723,
    likes: 89,
    comments: 45,
    createdAt: "4 ngay truoc",
    tags: ["Tuyen dung", "Hollow Knight"],
  },
]

const categoryConfig: Record<
  PostCategory,
  { label: string; icon: React.ReactNode; color: string }
> = {
  all: { label: "Tất cả", icon: <MessageSquare className="size-4" />, color: "text-foreground" },
  discussion: { label: "Thảo luận", icon: <Users className="size-4" />, color: "text-blue-400" },
  guide: { label: "Hướng dẫn", icon: <BookOpen className="size-4" />, color: "text-emerald-400" },
  question: { label: "Hỏi đáp", icon: <HelpCircle className="size-4" />, color: "text-amber-400" },
  announcement: { label: "Thông báo", icon: <Megaphone className="size-4" />, color: "text-rose-400" },
}

const roleConfig: Record<string, { label: string; color: string }> = {
  admin: { label: "Admin", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  moderator: { label: "Mod", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  vip: { label: "VIP", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  member: { label: "", color: "" },
}

const topContributors = [
  { name: "Admin CX9", avatar: "AC", posts: 156, likes: 2340 },
  { name: "Le Hoang C", avatar: "LC", posts: 89, likes: 1560 },
  { name: "Nguyen Van A", avatar: "NA", posts: 67, likes: 980 },
  { name: "Tran Minh B", avatar: "TB", posts: 45, likes: 567 },
  { name: "Pham Van D", avatar: "PD", posts: 34, likes: 432 },
]

interface CommunityModuleProps {
  currentUser: UserInfo | null
}

export function CommunityModule({ currentUser }: CommunityModuleProps) {
  const [showDeleteToast, setShowDeleteToast] = useState(false)
  const [hasShownFirstDeleteToast, setHasShownFirstDeleteToast] = useState(false)
  const [activeCategory, setActiveCategory] = useState<PostCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const pinnedPosts = filteredPosts.filter((post) => post.isPinned)
  const regularPosts = filteredPosts.filter((post) => !post.isPinned)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Cộng đồng</h1>
          <p className="mt-1 text-muted-foreground">
            Diễn đàn thảo luận, chia sẻ kinh nghiệm và hỗ trợ nhau
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" />
          Tạo bài viết
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <MessageSquare className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1,234</p>
              <p className="text-sm text-muted-foreground">Bài viết</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Users className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5,678</p>
              <p className="text-sm text-muted-foreground">Thành viên</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <TrendingUp className="size-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-sm text-muted-foreground">Đang online</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <Heart className="size-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">45.2K</p>
              <p className="text-sm text-muted-foreground">Lượt thích</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-4 lg:col-span-2">
          {/* Search & Filter */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Button variant="outline" className="gap-2 border-border bg-transparent">
              <Filter className="size-4" />
              Lọc
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryConfig) as PostCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {categoryConfig[cat].icon}
                {categoryConfig[cat].label}
              </button>
            ))}
          </div>

          {/* Delete Toast */}
          {showDeleteToast && (
            <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border border-info/30 bg-info/10 px-4 py-3 text-sm text-info shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-4">
              <LucideInfo className="size-4" />
              <span>Ban chi co the xoa bai viet cua chinh minh</span>
              <button 
			    aria-label="Đóng thông báo"
                onClick={() => setShowDeleteToast(false)}
                className="ml-2 rounded p-1 hover:bg-info/20"
              >
                <LucideX className="size-3" />
              </button>
            </div>
          )}

          {/* Pinned Posts */}
          {pinnedPosts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Pin className="size-4" />
                Bai ghim
              </div>
              {pinnedPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  currentUser={currentUser}
                  onFirstDelete={() => {
                    if (!hasShownFirstDeleteToast) {
                      setShowDeleteToast(true)
                      setHasShownFirstDeleteToast(true)
                      setTimeout(() => setShowDeleteToast(false), 4000)
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* Regular Posts */}
          <div className="space-y-3">
            {pinnedPosts.length > 0 && (
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="size-4" />
                Bai viet moi nhat
              </div>
            )}
            {regularPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                currentUser={currentUser}
                onFirstDelete={() => {
                  if (!hasShownFirstDeleteToast) {
                    setShowDeleteToast(true)
                    setHasShownFirstDeleteToast(true)
                    setTimeout(() => setShowDeleteToast(false), 4000)
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Top Contributors */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Award className="size-5 text-amber-400" />
              <h3 className="font-semibold text-foreground">Top đóng góp</h3>
            </div>
            <div className="space-y-3">
              {topContributors.map((user, index) => (
                <div key={user.name} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
                      {user.avatar}
                    </div>
                    {index < 3 && (
                      <div
                        className={cn(
                          "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-xs font-bold",
                          index === 0 && "bg-amber-500 text-amber-950",
                          index === 1 && "bg-slate-400 text-slate-950",
                          index === 2 && "bg-amber-700 text-amber-100"
                        )}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.posts} bài viết • {user.likes} likes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Flame className="size-5 text-orange-400" />
              <h3 className="font-semibold text-foreground">Tags phổ biến</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Unity", "Hướng dẫn", "Việt hóa", "UE5", "RPG", "Tools", "Font", "Thảo luận"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary cursor-pointer"
                  >
                    #{tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Community Rules */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Star className="size-5 text-primary" />
              <h3 className="font-semibold text-foreground">Quy tắc cộng đồng</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Tôn trọng các thành viên khác
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Không spam hoặc quảng cáo
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Chia sẻ kiến thức một cách xây dựng
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Sử dụng tags phù hợp cho bài viết
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function PostCard({ 
  post, 
  currentUser,
  onFirstDelete 
}: { 
  post: Post
  currentUser: UserInfo | null
  onFirstDelete: () => void
}) {
  const catConfig = categoryConfig[post.category]
  const authorRole = roleConfig[post.author.role]
  
  // Show delete button if owner OR admin/moderator
  const isOwner = currentUser?.username.toLowerCase() === post.authorId.toLowerCase()
  
  const canModerate =
  currentUser?.role === "admin" || currentUser?.role === "moderator"

const canDelete = isOwner || canModerate
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
	if (!canDelete) {
    onFirstDelete()
	return
   }
    // Demo: just show alert
    alert(`Da xoa bai viet: "${post.title}"`)
  }

  return (
    <div
      className={cn(
        "group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80 cursor-pointer",
        post.isPinned && "border-primary/30 bg-primary/5"
      )}
    >
      <div className="flex gap-4">
        {/* Author Avatar */}
        <div className="hidden sm:block">
          <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
            {post.author.avatar}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={cn("flex items-center gap-1 text-xs font-medium", catConfig.color)}>
              {catConfig.icon}
              {catConfig.label}
            </span>
            {post.isPinned && (
              <span className="flex items-center gap-1 rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                <Pin className="size-3" />
                Ghim
              </span>
            )}
            {post.isHot && (
              <span className="flex items-center gap-1 rounded bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-400">
                <Flame className="size-3" />
                Hot
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{post.author.name}</span>
              {authorRole.label && (
                <span className={cn("rounded border px-1.5 py-0.5 text-xs", authorRole.color)}>
                  {authorRole.label}
                </span>
              )}
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" />
                {post.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="size-3.5" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="size-3.5" />
                {post.comments}
              </span>
            </div>
          </div>
        </div>

        {/* Actions - only show for post owner */}
        <div className="flex items-start gap-2">
          {canDelete ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
				  aria-label="Tùy chọn bài viết"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2">
                  <Edit className="size-4" />
                  Chinh sua
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="gap-2 text-destructive focus:text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="size-4" />
                  Xoa bai viet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center sm:flex">
              <ChevronRight 
			  aria-hidden
			  className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
