
"use client"

import { Button } from "@/components/ui/button"
import { Gamepad2, Globe, Shield, Zap, ChevronRight, Boxes, Users, Code, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LandingPageProps {
  onLoginClick: () => void
  onGetStarted: () => void
}

export function LandingPage({ onLoginClick, onGetStarted }: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20">
              <Gamepad2 className="size-5 text-primary" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">CX9 System</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Tính năng</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Dự án</a>
            <a href="#community" className="hover:text-foreground transition-colors">Cộng đồng</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Gói dịch vụ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onLoginClick} className="font-medium">
              Đăng nhập
            </Button>
            <Button onClick={onGetStarted} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25">
              Tham gia ngay
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
              <span className="flex size-2 rounded-full bg-primary mr-2 animate-pulse" />
              Phiên bản v2.5.0 đã ra mắt
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              Nền tảng <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Việt hóa & Game Modding</span> hàng đầu Việt Nam
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Truy cập hàng ngàn bản Việt hóa chất lượng cao, tham gia cộng đồng modder sôi động và quản lý dự án game của riêng bạn trên hệ thống CX9.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={onGetStarted} className="h-12 w-full sm:w-auto px-8 text-base bg-primary hover:bg-primary/90">
                Khám phá kho game
                <ChevronRight className="ml-2 size-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto px-8 text-base bg-transparent border-border hover:bg-secondary">
                Tìm hiểu thêm
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 gap-8 border-y border-white/5 py-8 sm:grid-cols-4 bg-white/[0.02]">
              {[
                { label: "Dự án Việt hóa", value: "500+" },
                { label: "Thành viên", value: "50K+" },
                { label: "Lượt tải xuống", value: "2.5M+" },
                { label: "Modder tích cực", value: "100+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Hệ sinh thái toàn diện</h2>
              <p className="mt-4 text-muted-foreground">
                Không chỉ là nơi tải game, CX9 cung cấp đầy đủ công cụ cho game thủ và nhà phát triển.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Globe,
                  title: "Kho Việt hóa khổng lồ",
                  desc: "Hàng trăm tựa game AAA và Indie được Việt hóa bởi cộng đồng chất lượng cao.",
                  color: "text-blue-400",
                  bg: "bg-blue-400/10",
                },
                {
                  icon: Boxes,
                  title: "Roblox Studio Hub",
                  desc: "Tài nguyên, model, và script độc quyền dành cho các nhà phát triển Roblox.",
                  color: "text-orange-400",
                  bg: "bg-orange-400/10",
                },
                {
                  icon: Users,
                  title: "Cộng đồng sôi nổi",
                  desc: "Thảo luận, chia sẻ kinh nghiệm và tìm kiếm đồng đội trong diễn đàn.",
                  color: "text-green-400",
                  bg: "bg-green-400/10",
                },
                {
                  icon: Shield,
                  title: "An toàn tuyệt đối",
                  desc: "Mọi file tải lên đều được quét virus và kiểm duyệt kỹ càng trước khi public.",
                  color: "text-purple-400",
                  bg: "bg-purple-400/10",
                },
                {
                  icon: Zap,
                  title: "Tốc độ cao",
                  desc: "Server đặt tại Việt Nam, tối ưu đường truyền cho trải nghiệm tải game nhanh nhất.",
                  color: "text-yellow-400",
                  bg: "bg-yellow-400/10",
                },
                {
                  icon: Code,
                  title: "API cho Developer",
                  desc: "Tích hợp hệ thống của chúng tôi vào ứng dụng của bạn với API mạnh mẽ.",
                  color: "text-pink-400",
                  bg: "bg-pink-400/10",
                },
              ].map((feature, i) => (
                <div key={i} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className={cn("mb-4 w-fit rounded-xl p-3", feature.bg)}>
                    <feature.icon className={cn("size-6", feature.color)} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center sm:px-12 lg:px-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Sẵn sàng trải nghiệm?</h2>
                <p className="mt-4 text-primary-foreground/80 text-lg">
                  Tham gia cùng hơn 50,000 thành viên khác và bắt đầu hành trình game của bạn ngay hôm nay.
                </p>
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="mt-8 bg-white text-primary hover:bg-white/90 border-0 h-14 px-8 text-lg font-semibold"
                >
                  Đăng ký tài khoản miễn phí
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20">
                  <Gamepad2 className="size-5 text-primary" />
                </div>
                <span className="text-lg font-bold">CX9 System</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Nền tảng cung cấp giải pháp Việt hóa và tài nguyên game hàng đầu.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Sản phẩm</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Game Việt hóa</a></li>
                <li><a href="#" className="hover:text-primary">Roblox Assets</a></li>
                <li><a href="#" className="hover:text-primary">CX9 Launcher</a></li>
                <li><a href="#" className="hover:text-primary">API Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-primary">Báo lỗi</a></li>
                <li><a href="#" className="hover:text-primary">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-primary">Chính sách bảo mật</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: contact@cx9.system</li>
                <li>Discord: cx9.community</li>
                <li>Facebook: CX9 Team</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CX9 System. All rights reserved. Powered by Eleon Team.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
