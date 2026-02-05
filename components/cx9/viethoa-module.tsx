"use client"
import { useState, useEffect, useMemo, useRef } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Search, Filter, Gamepad2, Grid3X3, List, ChevronRight, Plus, Edit2, Trash2, ArrowUpDown, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { GameCard, type Game } from "./game-card"
import { ProjectDetail } from "./project-detail"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import Image from "next/image"
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

type Category = { id: string; label: string }
type ExtendedGame = Game & { category_id: string | null } // category_id can be null

function ViethoaModuleContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedGame, setSelectedGame] = useState<ExtendedGame | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategoryLabel, setNewCategoryLabel] = useState("")
  const [sortBy, setSortBy] = useState<"title" | "downloads" | "status">("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false) // Added for role-based access
  const itemsPerPage = 30 // Adjustable
  const client = useQueryClient()
  const gamesContainerRef = useRef<HTMLDivElement>(null)

  // Supabase Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) fetchRole(data.user.id)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) fetchRole(u.id)
      else setIsAdmin(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const fetchRole = async (uid: string) => {
    const { data } = await supabase.from("profiles").select("role").eq("id", uid).single()
    setIsAdmin(data?.role === "admin")
  }

  const signOut = async () => {
    if (confirm("Đăng xuất khỏi hệ thống?")) {
      await supabase.auth.signOut()
    }
  }

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Scroll reset on page change
  useEffect(() => {
    gamesContainerRef.current?.scrollTo(0, 0)
  }, [currentPage])

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("label")
      if (error) throw error
      return data || []
    },
    staleTime: 60_000, // 1 minute
  })

  const categories = useMemo(() => {
    if (!categoriesData) return [{ id: "all", label: "Tất cả" }]
    return [{ id: "all", label: "Tất cả" }, ...categoriesData]
  }, [categoriesData])

  // Fetch game stats with optimized counts
  const { data: statsData } = useQuery({
    queryKey: ["game-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("game_stats").select("*").single()
      if (error) throw error
      return data || { total: 0, done: 0, testing: 0, progress: 0 }
    },
    staleTime: 60_000, // 1 minute
  })

  const stats = statsData || { total: 0, done: 0, testing: 0, progress: 0 }

  // Fetch games with pagination, search, category, sort
  const { data: gamesData, isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ["games", currentPage, debouncedSearchQuery, activeCategory, sortBy, sortOrder],
    queryFn: async () => {
      let query = supabase
        .from("games")
        .select("*, category:category_id(label)", { count: "exact" })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
      // Apply search
      if (debouncedSearchQuery) {
        query = query.ilike("title", `%${debouncedSearchQuery}%`)
      }
      // Apply category filter
      if (activeCategory !== "all") {
        query = query.eq("category_id", activeCategory)
      }
      // Apply sort safely
      const sortableFields = ["title", "downloads", "status"] as const
      if (sortableFields.includes(sortBy)) {
        query = query.order(sortBy, { ascending: sortOrder === "asc", nullsFirst: false })
      }
      const { data, error, count } = await query
      if (error) throw error
      const mappedData = (data || []).map((g: any) => ({
        ...g,
        category: g.category?.label || "Không xác định",
        category_id: g.category_id,
      })) as ExtendedGame[]
      return { games: mappedData, total: count || 0 }
    },
  })

  const games = gamesData?.games || []
  const totalGames = gamesData?.total || 0
  const totalPages = Math.max(1, Math.ceil(totalGames / itemsPerPage))

  // Handle currentPage > totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  useEffect(() => {
    if (categoriesError || gamesError) {
      setError("Lỗi khi tải dữ liệu.")
    } else {
      setError(null)
    }
  }, [categoriesError, gamesError])

  // Mutations
  const addCategoryMutation = useMutation({
    mutationFn: async (label: string) => {
      const { error } = await supabase.from("categories").insert({ label })
      if (error) throw error
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] })
      setNewCategoryLabel("")
    },
    onError: (err) => {
      console.error("Error adding category:", err)
      setError("Lỗi khi thêm danh mục.")
    },
  })

  const editCategoryMutation = useMutation({
    mutationFn: async ({ id, label }: { id: string; label: string }) => {
      const { error } = await supabase.from("categories").update({ label }).eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] })
      client.invalidateQueries({ queryKey: ["games"], exact: false })
      client.invalidateQueries({ queryKey: ["game-stats"] })
      setEditingCategory(null)
      setNewCategoryLabel("")
    },
    onError: (err) => {
      console.error("Error editing category:", err)
      setError("Lỗi khi chỉnh sửa danh mục.")
    },
  })

  const updateGamesCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("games").update({ category_id: null }).eq("category_id", id)
      if (error) throw error
    },
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      await updateGamesCategoryMutation.mutateAsync(id) // Set to null first to avoid FK error
      const { error } = await supabase.from("categories").delete().eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] })
      client.invalidateQueries({ queryKey: ["games"], exact: false })
      client.invalidateQueries({ queryKey: ["game-stats"] })
      if (activeCategory !== "all") setActiveCategory("all")
    },
    onError: (err) => {
      console.error("Error deleting category:", err)
      setError("Lỗi khi xóa danh mục.")
    },
  })

  const handleAddCategory = () => {
    if (newCategoryLabel.trim()) {
      addCategoryMutation.mutate(newCategoryLabel.trim())
    }
  }

  const handleEditCategory = () => {
    if (editingCategory && newCategoryLabel.trim()) {
      editCategoryMutation.mutate({ id: editingCategory.id, label: newCategoryLabel.trim() })
    }
  }

  const handleDeleteCategory = (id: string) => {
    if (!confirm("Xóa danh mục này?")) return
    deleteCategoryMutation.mutate(id)
  }

  // Realtime subscriptions with optimized invalidate
  useEffect(() => {
    const categoriesChannel = supabase
      .channel("categories-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "categories" },
        (_payload) => {
          client.invalidateQueries({ queryKey: ["categories"] })
          client.invalidateQueries({ queryKey: ["games"], exact: false })
          client.invalidateQueries({ queryKey: ["game-stats"] })
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          setError("Lỗi kết nối realtime cho danh mục.")
        }
      })

    const gamesChannel = supabase
      .channel("games-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "games" },
        (payload) => {
          const newCategory = payload.new?.category_id
          const oldCategory = payload.old?.category_id
          // Optimized: only invalidate if affects current view
          const affectsCurrent =
            debouncedSearchQuery ||
            (activeCategory === "all" || newCategory === activeCategory || oldCategory === activeCategory)
          if (affectsCurrent) {
            client.invalidateQueries({ queryKey: ["games"], exact: false })
          }
          // Optimized stats invalidate
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "DELETE" ||
            (payload.eventType === "UPDATE" && payload.old?.status !== payload.new?.status)
          ) {
            client.invalidateQueries({ queryKey: ["game-stats"] })
          }
          if (payload.eventType === "DELETE") {
            setCurrentPage(1)
          }
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          setError("Lỗi kết nối realtime cho trò chơi.")
        }
      })

    return () => {
      supabase.removeChannel(categoriesChannel)
      supabase.removeChannel(gamesChannel)
    }
  }, [client, activeCategory, debouncedSearchQuery])

  const isLoading = categoriesLoading || gamesLoading

  // If a game is selected, show the detail view
  if (selectedGame) {
    return <ProjectDetail game={selectedGame} onBack={() => setSelectedGame(null)} />
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]} // Adjusted to safe providers
        />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <Skeleton className="h-11 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-9 w-24" />)}
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Button onClick={signOut}>Đăng xuất</Button>
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 glow-primary">
              <Gamepad2 className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Việt hóa</h2>
              <p className="text-sm text-muted-foreground">
                Kho dự án game & phần mềm Việt hóa
              </p>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-2 px-4 shadow-sm">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground leading-none">{stats.total}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Dự án</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-success leading-none">{stats.done}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Hoàn thành</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-warning leading-none">{stats.testing}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Cập nhật</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-info leading-none">{stats.progress}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Đang làm</p>
          </div>
        </div>
      </div>
      {/* Search & Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative max-w-md flex-1 group">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Tìm game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 pl-10 pr-4"
          />
        </div>
        {/* View mode toggle & Sort & Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-card border border-border p-1">
            <button
              aria-label="Chế độ lưới"
              title="Lưới"
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-lg p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-secondary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid3X3 className="size-4" />
            </button>
            <button
              aria-label="Chế độ danh sách"
              title="Danh sách"
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-lg p-2 transition-colors",
                viewMode === "list"
                  ? "bg-secondary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>
          <Select value={sortBy} onValueChange={(value: "title" | "downloads" | "status") => { setSortBy(value); setCurrentPage(1); }}>
            <SelectTrigger className="w-[140px] h-9 rounded-xl">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Tên</SelectItem>
              <SelectItem value="downloads">Lượt tải</SelectItem>
              <SelectItem value="status">Trạng thái</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setSortOrder(sortOrder === "asc" ? "desc" : "asc"); setCurrentPage(1); }}
            className="h-9 rounded-xl"
          >
            <ArrowUpDown className="size-4 mr-2" />
            {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
          </Button>
          <button className="group flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:border-primary/50">
            <Filter className="size-4 transition-transform group-hover:rotate-90" />
            Bộ lọc
          </button>
        </div>
      </div>
      {/* Category tabs with edit */}
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-1">
            <button
              onClick={() => { setActiveCategory(category.id); setCurrentPage(1); }}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 border",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground border-transparent hover:border-border hover:text-foreground"
              )}
            >
              {category.label}
            </button>
            {category.id !== "all" && isAdmin && ( // Added isAdmin check
              <>
                <button
                  aria-label="Chỉnh sửa danh mục"
                  onClick={() => {
                    setEditingCategory(category)
                    setNewCategoryLabel(category.label)
                  }}
                  className="p-1 text-muted-foreground hover:text-primary"
                >
                  <Edit2 className="size-3" />
                </button>
                <button
                  aria-label="Xóa danh mục"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-1 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3" />
                </button>
              </>
            )}
          </div>
        ))}
        {isAdmin && ( // Added isAdmin check
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:border-primary/50">
                <Plus className="size-4" />
                Thêm danh mục
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={newCategoryLabel}
                  onChange={(e) => setNewCategoryLabel(e.target.value)}
                  placeholder="Tên danh mục"
                />
                <Button onClick={editingCategory ? handleEditCategory : handleAddCategory}>
                  {editingCategory ? "Lưu" : "Thêm"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {/* Games display without virtualization - normal render since paginated */}
      <div ref={gamesContainerRef} className="overflow-auto max-h-[600px]"> {/* Adjustable height */}
        {viewMode === "grid" ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <div key={game.id} onClick={() => setSelectedGame(game)} className="cursor-pointer">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="cursor-pointer flex items-center gap-4 px-4 py-2 border rounded-lg"
              >
                <div className="flex items-center gap-4 w-full">
                  <Image
                    src={game.image || "/placeholder.svg"} // Fallback image
                    alt={game.title}
                    width={96}
                    height={64}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{game.title}</h3>
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                    <div className="flex gap-2 mt-1 text-xs">
                      <span className="font-medium">Danh mục: {game.category}</span>
                      <span className="font-medium">Trạng thái: {game.status}</span>
                      <span className="font-medium">Lượt tải: {game.downloads}</span>
                    </div>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) setCurrentPage(currentPage - 1)
              }}
              className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
          {getVisiblePages(currentPage, totalPages).map((page) => (
            <PaginationItem key={page}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(page as number)
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) setCurrentPage(currentPage + 1)
              }}
              className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* Empty state */}
      {games.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-2xl bg-secondary/50 p-4">
            <Gamepad2 className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Không tìm thấy game</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Thử thay đổi từ khóa hoặc bộ lọc của bạn
          </p>
        </div>
      )}
    </div>
  )
}

function getVisiblePages(current: number, total: number) {
  const pages: (number | "ellipsis")[] = []
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
    return pages
  }

  pages.push(1)
  if (current > 3) {
    pages.push("ellipsis")
  }
  const start = Math.max(2, current - 2)
  const end = Math.min(total - 1, current + 2)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (current < total - 2) {
    pages.push("ellipsis")
  }
  pages.push(total)
  return pages
}

export function ViethoaModule() {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ViethoaModuleContent />
    </QueryClientProvider>
  )
}
