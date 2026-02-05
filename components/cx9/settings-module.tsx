"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  MessageSquare,
  Bell,
  Palette,
  Shield,
  Camera,
  Save,
  Key,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Monitor,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Trash2,
  AlertTriangle,
  RefreshCw,
  Database,
  Users,
  Activity,
  HardDrive,
  Cpu,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
} from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useSession, signOut, signIn } from "next-auth/react"
import { useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

interface SettingsModuleProps {
  currentUser?: any // Từ NextAuth session
}

export function SettingsModule() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
    }
  }, [status])

  if (status === "loading") {
    return <div>Đang tải...</div>
  }

  const rawTab = searchParams.get("tab") ?? "account"
  const isAdmin = session?.user?.role === "admin"
  const _isModerator = session?.user?.role === "moderator"
  const activeTab = !isAdmin && rawTab === "system" ? "account" : rawTab
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cài đặt</h1>
          <p className="text-muted-foreground">Quản lý tài khoản và tùy chỉnh hệ thống</p>
        </div>
        <Button variant="outline" onClick={() => signOut()} className="gap-2">
          <LogOut className="size-4" />
          Đăng xuất
        </Button>
      </div>
      {/* Permission Notice for non-admin */}
      {!isAdmin && (
        <Card className="border-info/30 bg-info/5 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-info/10 p-2 text-info">
                <Shield className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Giới hạn quyền truy cập
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Một số tùy chọn chỉ hiển thị với tài khoản Admin. Chức năng đã được hỗ trợ, nhưng bị giới hạn theo quyền người dùng.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Tabs với URL sync + animation mượt */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="account"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Tài khoản
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Tin nhắn
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Thông báo
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Giao diện
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Bảo mật
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger
                value="system"
                className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-all data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
              >
                Hệ thống
              </TabsTrigger>
            )}
          </TabsList>
        </div>
        <TabsContent value="account" className="mt-6 animate-in fade-in-50 duration-200">
		  {session?.user && <AccountSection currentUser={session.user} />}
		</TabsContent>
        <TabsContent value="messages" className="mt-6 animate-in fade-in-50 duration-200">
          <MessagesSection />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6 animate-in fade-in-50 duration-200">
          <NotificationsSection />
        </TabsContent>
        <TabsContent value="appearance" className="mt-6 animate-in fade-in-50 duration-200">
          <AppearanceSection />
        </TabsContent>
        <TabsContent value="security" className="mt-6 animate-in fade-in-50 duration-200">
          <SecuritySection />
        </TabsContent>
        {isAdmin && (
          <TabsContent value="system" className="mt-6 animate-in fade-in-50 duration-200">
            <SystemSection />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
// Account Section with Form Validation
function AccountSection({ currentUser }: { currentUser: any }) {
  const formSchema = z.object({
    username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự").max(20, "Tên đăng nhập tối đa 20 ký tự"),
    displayName: z.string().min(3, "Tên hiển thị phải có ít nhất 3 ký tự").max(30, "Tên hiển thị tối đa 30 ký tự"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal('')),
    bio: z.string().max(500, "Giới thiệu bản thân tối đa 500 ký tự").optional(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser?.name || "",
      displayName: currentUser?.name || "",
      email: currentUser?.email || "",
      bio: "",
    },
  })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Gọi API update profile với session
    const res = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      toast({
        title: "Thành công",
        description: "Thay đổi đã được lưu!",
      })
    } else {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra!",
        variant: "destructive",
      })
    }
  }
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5 text-primary" />
            Thông tin cá nhân
          </CardTitle>
          <CardDescription>Cập nhật thông tin tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {form.watch("username").slice(0, 2).toUpperCase() || "U"}
              </div>
              <button
                aria-label="Thay đổi ảnh đại diện"
                title="Thay đổi ảnh đại diện"
                className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground shadow-lg hover:bg-primary/90"
              >
                <Camera className="size-3.5" />
              </button>
            </div>
            <div>
              <p className="font-medium text-foreground">{form.watch("username") || "User"}</p>
              <p className="text-sm text-muted-foreground capitalize">{currentUser?.role || "member"}</p>
            </div>
          </div>
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Tên đăng nhập</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Tên hiển thị</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2 sm:col-span-2">
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input type="email" className="pl-10" placeholder="email@example.com" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="space-y-2 sm:col-span-2">
                      <FormLabel>Giới thiệu bản thân</FormLabel>
                      <FormControl>
                        <textarea
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          placeholder="Viết gì đó về bản thân..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Save className="size-4" />
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* Danger Zone */}
      <Card className="border-destructive/50 bg-destructive/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            Vùng nguy hiểm
          </CardTitle>
          <CardDescription>Các hành động không thể hoàn tác</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Xóa tài khoản</p>
              <p className="text-sm text-muted-foreground">Xóa vĩnh viễn tài khoản và tất cả dữ liệu</p>
            </div>
            <Button variant="destructive" className="gap-2" onClick={async () => {
              if (confirm("Bạn có chắc chắn muốn xóa tài khoản?")) {
                const res = await fetch("/api/delete-account", { method: "DELETE" })
                if (res.ok) {
                  signOut()
                }
              }
            }}>
              <Trash2 className="size-4" />
              Xóa tài khoản
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
// Messages Section
function MessagesSection() {
  const [allowMessages, setAllowMessages] = useState(true)
  const [onlyFriends, setOnlyFriends] = useState(false)
  const [showReadStatus, setShowReadStatus] = useState(true)
  const [showTyping, setShowTyping] = useState(true)
  const [autoDelete, setAutoDelete] = useState("never")
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            Cài đặt tin nhắn
          </CardTitle>
          <CardDescription>Quản lý cách bạn nhận và gửi tin nhắn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép nhận tin nhắn</Label>
                <p className="text-sm text-muted-foreground">Người khác có thể gửi tin nhắn cho bạn</p>
              </div>
              <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Chỉ bạn bè</Label>
                <p className="text-sm text-muted-foreground">Chỉ nhận tin nhắn từ người trong danh sách bạn bè</p>
              </div>
              <Switch checked={onlyFriends} onCheckedChange={setOnlyFriends} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị trạng thái đọc</Label>
                <p className="text-sm text-muted-foreground">Người khác sẽ thấy khi bạn đã đọc tin nhắn</p>
              </div>
              <Switch checked={showReadStatus} onCheckedChange={setShowReadStatus} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị đang gõ</Label>
                <p className="text-sm text-muted-foreground">Hiển thị khi bạn đang soạn tin nhắn</p>
              </div>
              <Switch checked={showTyping} onCheckedChange={setShowTyping} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tự động xóa tin nhắn sau</Label>
            <Select value={autoDelete} onValueChange={setAutoDelete}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Không tự động xóa</SelectItem>
                <SelectItem value="1day">1 ngày</SelectItem>
                <SelectItem value="7days">7 ngày</SelectItem>
                <SelectItem value="30days">30 ngày</SelectItem>
                <SelectItem value="90days">90 ngày</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Chặn người dùng</CardTitle>
          <CardDescription>Quản lý danh sách người bị chặn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <Users className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Chưa có người dùng nào bị chặn</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
// Notifications Section
function NotificationsSection() {
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundNotifications, setSoundNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [notificationTypes, setNotificationTypes] = useState({
    newComments: true,
    newFollowers: true,
    likes: true,
    mentions: true,
    systemUpdates: false,
    communityNews: false,
  })
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5 text-primary" />
            Thông báo chung
          </CardTitle>
          <CardDescription>Cài đặt thông báo trên ứng dụng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Thông báo đẩy</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo trên trình duyệt</p>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Âm thanh thông báo</Label>
              <p className="text-sm text-muted-foreground">Phát âm thanh khi có thông báo mới</p>
            </div>
            <Switch checked={soundNotifications} onCheckedChange={setSoundNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Thông báo email</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo quan trọng qua email</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Loại thông báo</CardTitle>
          <CardDescription>Chọn loại thông báo bạn muốn nhận</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "newComments", label: "Bình luận mới", desc: "Khi có người bình luận bài viết của bạn" },
            { key: "newFollowers", label: "Người theo dõi mới", desc: "Khi có người theo dõi bạn" },
            { key: "likes", label: "Lượt thích", desc: "Khi có người thích bài viết của bạn" },
            { key: "mentions", label: "Nhắc đến", desc: "Khi có người nhắc đến bạn" },
            { key: "systemUpdates", label: "Cập nhật hệ thống", desc: "Thông báo về phiên bản mới và tính năng" },
            { key: "communityNews", label: "Tin tức cộng đồng", desc: "Tin tức và sự kiện từ cộng đồng" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{item.label}</Label>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notificationTypes[item.key as keyof typeof notificationTypes]}
                onCheckedChange={(checked) => setNotificationTypes(prev => ({ ...prev, [item.key]: checked }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
// Appearance Section
function AppearanceSection() {
  const [theme, setTheme] = useState("dark")
  const [accentColor, setAccentColor] = useState("cyan")
  const [fontSize, setFontSize] = useState("medium")
  const [language, setLanguage] = useState("vi")
  const [animations, setAnimations] = useState(true)
  const [blurEffects, setBlurEffects] = useState(true)
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="size-5 text-primary" />
            Giao diện
          </CardTitle>
          <CardDescription>Tùy chỉnh giao diện người dùng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <Label>Chế độ giao diện</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "light", label: "Sáng", icon: <Sun className="size-5" /> },
                { id: "dark", label: "Tối", icon: <Moon className="size-5" /> },
                { id: "system", label: "Hệ thống", icon: <Monitor className="size-5" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTheme(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                    theme === item.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Accent Color */}
          <div className="space-y-3">
            <Label>Màu chủ đạo</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { color: "bg-cyan-500", name: "cyan" },
                { color: "bg-blue-500", name: "blue" },
                { color: "bg-violet-500", name: "violet" },
                { color: "bg-pink-500", name: "pink" },
                { color: "bg-rose-500", name: "rose" },
                { color: "bg-orange-500", name: "orange" },
                { color: "bg-green-500", name: "green" },
              ].map((item) => (
                <button
                  key={item.name}
                  aria-label={`Chọn màu ${item.name}`}
                  title={item.name}
                  onClick={() => setAccentColor(item.name)}
                  className={cn(
                    "size-8 rounded-full transition-transform hover:scale-110",
                    item.color,
                    accentColor === item.name && "ring-2 ring-offset-2 ring-offset-background ring-primary"
                  )}
                />
              ))}
            </div>
          </div>
          {/* Font Size */}
          <div className="space-y-2">
            <Label>Cỡ chữ</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Nhỏ</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="large">Lớn</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Language */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="size-4" />
              Ngôn ngữ
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Hiệu ứng</CardTitle>
          <CardDescription>Bật/tắt các hiệu ứng giao diện</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiệu ứng chuyển động</Label>
              <p className="text-sm text-muted-foreground">Bật các hiệu ứng animation</p>
            </div>
            <Switch checked={animations} onCheckedChange={setAnimations} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Hiệu ứng mờ</Label>
              <p className="text-sm text-muted-foreground">Sử dụng backdrop blur cho các thành phần</p>
            </div>
            <Switch checked={blurEffects} onCheckedChange={setBlurEffects} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
// Security Section
function SecuritySection() {
  const formSchema = z.object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới không khớp",
    path: ["confirmPassword"],
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      toast({
        title: "Thành công",
        description: "Mật khẩu đã được thay đổi!",
      })
      form.reset()
    } else {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi đổi mật khẩu!",
        variant: "destructive",
      })
    }
  }
  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="size-5 text-primary" />
            Đổi mật khẩu
          </CardTitle>
          <CardDescription>Cập nhật mật khẩu tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Mật khẩu hiện tại</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        aria-label={showCurrentPassword ? "Ẩn mật khẩu hiện tại" : "Hiện mật khẩu hiện tại"}
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        aria-label={showNewPassword ? "Ẩn mật khẩu mới" : "Hiện mật khẩu mới"}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        aria-label={showConfirmPassword ? "Ẩn xác nhận mật khẩu" : "Hiện xác nhận mật khẩu"}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="gap-2">
                <Key className="size-4" />
                Đổi mật khẩu
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="size-5 text-primary" />
            Xác thực hai yếu tố (2FA)
          </CardTitle>
          <CardDescription>Tăng cường bảo mật cho tài khoản</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium text-foreground">Trạng thái: Chưa kích hoạt</p>
              <p className="text-sm text-muted-foreground">Sử dụng ứng dụng xác thực để bảo vệ tài khoản</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Shield className="size-4" />
              Kích hoạt
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Phiên đăng nhập</CardTitle>
          <CardDescription>Quản lý các thiết bị đã đăng nhập</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { device: "Chrome - Windows", location: "Hà Nội, VN", current: true, time: "Hiện tại" },
            { device: "Safari - iPhone", location: "Hà Nội, VN", current: false, time: "2 giờ trước" },
            { device: "Firefox - MacOS", location: "HCM, VN", current: false, time: "1 ngày trước" },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "rounded-full p-2",
                  session.current ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
                )}>
                  <Monitor className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{session.device}</p>
                  <p className="text-xs text-muted-foreground">{session.location} • {session.time}</p>
                </div>
              </div>
              {session.current ? (
                <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                  Phiên hiện tại
                </span>
              ) : (
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Đăng xuất
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
// System Section (Admin only)
function SystemSection() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  // Giả lập danh sách user thường
  const [normalUsers, setNormalUsers] = useState([
    { id: 1, name: "user1", email: "user1@example.com" },
    { id: 2, name: "user2", email: "user2@example.com" },
  ])
  const handleDeleteUser = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" })
      if (res.ok) {
        setNormalUsers(prev => prev.filter(user => user.id !== id))
        toast({
          title: "Thành công",
          description: "Người dùng đã được xóa!",
        })
      } else {
        toast({
          title: "Lỗi",
          description: "Có lỗi xảy ra!",
          variant: "destructive",
        })
      }
    }
  }
  return (
    <div className="space-y-6">
      {/* System Status */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Trạng thái hệ thống
          </CardTitle>
          <CardDescription>Theo dõi tình trạng hoạt động của hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "API Server", status: "online", latency: "45ms" },
              { label: "Database", status: "online", latency: "12ms" },
              { label: "Cache Server", status: "online", latency: "3ms" },
              { label: "CDN", status: "online", latency: "8ms" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className={cn(
                    "flex items-center gap-1 text-xs",
                    item.status === "online" ? "text-success" : "text-destructive"
                  )}>
                    {item.status === "online" ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
                    {item.status === "online" ? "Online" : "Offline"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Latency: {item.latency}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* System Resources */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="size-5 text-primary" />
            Tài nguyên hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "CPU", value: 45, icon: <Cpu className="size-4" /> },
            { label: "RAM", value: 68, icon: <Zap className="size-4" /> },
            { label: "Storage", value: 72, icon: <HardDrive className="size-4" /> },
            { label: "Network", value: 23, icon: <Activity className="size-4" /> },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {item.icon}
                  {item.label}
                </div>
                <span className="text-sm text-muted-foreground">{item.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    item.value > 80 ? "bg-destructive" : item.value > 60 ? "bg-warning" : "bg-primary"
                  )}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      {/* Database Management */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5 text-primary" />
            Quản lý database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" className="justify-start gap-2 bg-transparent" aria-label="Xóa cache">
              <RefreshCw className="size-4" />
              Xóa cache
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent" aria-label="Backup database">
              <Database className="size-4" />
              Backup database
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent" aria-label="Xem logs">
              <Activity className="size-4" />
              Xem logs
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent" aria-label="Quản lý người dùng">
              <Users className="size-4" />
              Quản lý người dùng
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* User Management for Admin */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Quản lý người dùng thường
          </CardTitle>
          <CardDescription>Xem menu và xóa người dùng thường</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {normalUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Maintenance */}
      <Card className="border-warning/50 bg-warning/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <Clock className="size-5" />
            Chế độ bảo trì
          </CardTitle>
          <CardDescription>Tạm ngừng hệ thống để bảo trì</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Trạng thái: {maintenanceMode ? 'Đang bảo trì' : 'Hoạt động bình thường'}</p>
              <p className="text-sm text-muted-foreground">Bật chế độ bảo trì sẽ tạm thời khóa tất cả người dùng</p>
            </div>
            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}