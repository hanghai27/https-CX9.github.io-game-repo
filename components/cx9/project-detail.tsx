
"use client"

import { Game } from "./game-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  ArrowLeft, 
  ThumbsUp, 
  Share2, 
  Flag, 
  Clock, 
  Calendar, 
  Monitor, 
  HardDrive, 
  Cpu, 
  MessageSquare,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectDetailProps {
  game: Game
  onBack: () => void
}

export function ProjectDetail({ game, onBack }: ProjectDetailProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="size-4" />
          Quay lại danh sách
        </Button>
      </div>

      {/* Header Banner */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-3xl sm:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <img 
          src={game.image} 
          alt={game.title} 
          className="size-full object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 w-full p-6 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge className="bg-primary hover:bg-primary/90">{game.category}</Badge>
                <Badge variant="outline" className={cn(
                  "bg-background/50 backdrop-blur-md border-transparent",
                  game.status === 'done' ? "text-green-400" : "text-yellow-400"
                )}>
                  {game.status === 'done' ? 'Hoàn thành' : 'Đang cập nhật'}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-5xl shadow-black drop-shadow-lg">{game.title}</h1>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Download className="size-5" />
                Tải Xuống
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <ThumbsUp className="size-5" />
                Thích
              </Button>
              <Button size="icon" variant="outline" aria-label="Chia sẻ" className="bg-background/20 backdrop-blur-md border-white/10 text-white hover:bg-background/40">
                <Share2 className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start rounded-xl bg-card p-1 border border-border">
              <TabsTrigger value="about" className="flex-1 sm:flex-none">Giới thiệu</TabsTrigger>
              <TabsTrigger value="changelog" className="flex-1 sm:flex-none">Lịch sử cập nhật</TabsTrigger>
              <TabsTrigger value="installation" className="flex-1 sm:flex-none">Hướng dẫn cài đặt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold mb-4">Thông tin dự án</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {game.description || "Chưa có mô tả chi tiết cho dự án này."}
                  <br /><br />
                  Đây là phiên bản Việt hóa hoàn chỉnh, đã được kiểm tra kỹ lưỡng trên phiên bản Steam mới nhất. Bản dịch bao gồm toàn bộ cốt truyện chính, nhiệm vụ phụ, giao diện và các vật phẩm trong game.
                  <br /><br />
                  Nhóm dịch thuật đã cố gắng giữ nguyên văn phong gốc của game đồng thời bản địa hóa các thuật ngữ để phù hợp với người chơi Việt Nam.
                </p>
                
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop" className="rounded-lg object-cover w-full h-48" alt="Screenshot 1" />
                  <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop" className="rounded-lg object-cover w-full h-48" alt="Screenshot 2" />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold mb-4">Cấu hình yêu cầu</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Tối thiểu</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Monitor className="size-4" /> OS: Windows 10 64-bit</li>
                      <li className="flex items-center gap-2"><Cpu className="size-4" /> CPU: Intel Core i3-8100</li>
                      <li className="flex items-center gap-2"><HardDrive className="size-4" /> RAM: 8 GB</li>
                      <li className="flex items-center gap-2"><HardDrive className="size-4" /> Storage: 20 GB</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Khuyến nghị</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Monitor className="size-4" /> OS: Windows 11 64-bit</li>
                      <li className="flex items-center gap-2"><Cpu className="size-4" /> CPU: Intel Core i5-10400</li>
                      <li className="flex items-center gap-2"><HardDrive className="size-4" /> RAM: 16 GB</li>
                      <li className="flex items-center gap-2"><HardDrive className="size-4" /> Storage: 20 GB SSD</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="changelog" className="mt-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="space-y-6">
                  {[
                    { ver: "1.2.0", date: "20/02/2024", content: "Việt hóa DLC mới, sửa lỗi font chữ menu." },
                    { ver: "1.1.5", date: "15/01/2024", content: "Cập nhật tương thích với patch mới nhất của game." },
                    { ver: "1.0.0", date: "01/01/2024", content: "Phát hành bản Việt hóa chính thức đầu tiên." },
                  ].map((log, i) => (
                    <div key={i} className="relative pl-6 border-l border-border pb-6 last:pb-0">
                      <div className="absolute -left-1.5 top-1.5 size-3 rounded-full bg-primary" />
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-foreground">v{log.ver}</span>
                        <span className="text-xs text-muted-foreground">{log.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="mt-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <ol className="space-y-4 list-decimal list-inside text-muted-foreground">
                  <li className="p-2 rounded bg-secondary/30"><span className="text-foreground font-medium">Bước 1:</span> Tải file Việt hóa về máy.</li>
                  <li className="p-2 rounded bg-secondary/30"><span className="text-foreground font-medium">Bước 2:</span> Giải nén file vừa tải với mật khẩu <code className="bg-background px-1 rounded">cx9system</code>.</li>
                  <li className="p-2 rounded bg-secondary/30"><span className="text-foreground font-medium">Bước 3:</span> Copy toàn bộ file trong thư mục giải nén.</li>
                  <li className="p-2 rounded bg-secondary/30"><span className="text-foreground font-medium">Bước 4:</span> Paste vào thư mục cài game (nơi chứa file .exe).</li>
                  <li className="p-2 rounded bg-secondary/30"><span className="text-foreground font-medium">Bước 5:</span> Chạy file <code className="bg-background px-1 rounded">CX9_Installer.exe</code> và nhấn Cài đặt.</li>
                </ol>
                <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex gap-3 text-sm">
                  <Flag className="size-5 shrink-0" />
                  <p>Lưu ý: Vui lòng backup file save game trước khi cài đặt để tránh rủi ro mất dữ liệu.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Comments Section */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="size-5" />
              Bình luận (128)
            </h3>
            
            {/* Comment Input */}
            <div className="flex gap-4 mb-8">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                ME
              </div>
              <div className="flex-1">
                <textarea 
				  aria-label="Nội dung bình luận"
                  className="w-full bg-secondary/30 rounded-xl p-3 text-sm border border-border focus:outline-none focus:border-primary resize-none h-24 transition-colors"
                  placeholder="Viết bình luận của bạn..."
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm">Gửi bình luận</Button>
                </div>
              </div>
            </div>

            {/* Comment List */}
            <div className="space-y-6">
              {[
                { user: "GamerPro99", content: "Bản dịch rất chất lượng, cảm ơn nhóm dịch!", time: "2 giờ trước", avatar: "G" },
                { user: "Nam Blue", content: "Có ai biết cách fix lỗi font ở đoạn cắt cảnh chap 3 không?", time: "5 giờ trước", avatar: "N" },
                { user: "VietHoaTeam", content: "Đã update fix lỗi font ở bản 1.2.1 nhé mọi người.", time: "1 giờ trước", avatar: "V", role: "Admin" },
              ].map((comment, i) => (
                <div key={i} className="flex gap-4">
                  <div className="size-10 rounded-full bg-secondary flex items-center justify-center font-bold text-muted-foreground shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{comment.user}</span>
                      {comment.role && <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{comment.role}</Badge>}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
					  <Clock className="size-3" />
					  {comment.time}
					  </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                    <div className="flex gap-4 mt-2">
                      <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Thích</button>
                      <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Trả lời</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Stats) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4 text-lg">Thông tin file</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><HardDrive className="size-4" /> Dung lượng</span>
                <span className="font-medium">1.2 GB</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="size-4" /> Cập nhật</span>
                <span className="font-medium">20/02/2024</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Download className="size-4" /> Lượt tải</span>
                <span className="font-medium">{game.downloads?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle2 className="size-4" /> Phiên bản</span>
                <span className="font-medium">v1.2.0</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4 text-lg">Nhóm thực hiện</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                CX
              </div>
              <div>
                <h4 className="font-bold">CX9 Team</h4>
                <p className="text-xs text-muted-foreground">Verified Creator</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Nhóm dịch thuật chuyên nghiệp với hơn 5 năm kinh nghiệm trong lĩnh vực Việt hóa game.
            </p>
            <Button variant="outline" className="w-full">Xem hồ sơ</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
