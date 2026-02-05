
"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, User, Loader2, Shield, Zap, ArrowLeft } from "lucide-react"

export type UserRole = "admin" | "moderator" | "member" | "vip"

export interface UserInfo {
  username: string
  role: UserRole
}

interface LoginScreenProps {
  onLogin: (user: UserInfo) => void
  onBack: () => void
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!username || !password) {
      setError("Vui long nhap day du thong tin")
      return
    }

    setIsLoading(true)
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Determine role based on username (demo logic)
    // admin/mod usernames get admin role, others get member
    const lowerUsername = username.toLowerCase()
    let role: UserRole = "member"
    if (lowerUsername.includes("admin")) {
      role = "admin"
    } else if (lowerUsername.includes("mod")) {
      role = "moderator"
    } else if (lowerUsername.includes("vip")) {
      role = "vip"
    }
    
    onLogin({ username, role })
    setIsLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-info/15 blur-[128px]" />
      </div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute left-4 top-4 z-50 flex items-center gap-2 rounded-lg border border-white/5 bg-black/20 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-colors hover:bg-black/40 hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Về trang chủ
      </button>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-4 flex size-20 items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl" />
            {/* Logo container */}
            <div className="relative flex size-20 items-center justify-center rounded-2xl border border-primary/30 bg-card">
              <span className="text-3xl font-black tracking-tighter">
                <span className="text-primary">C</span>
                <span className="text-foreground">X9</span>
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Chao mung tro lai
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Dang nhap de truy cap CX9 Control Panel
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="size-5 text-primary" />
              Dang nhap he thong
            </CardTitle>
            <CardDescription>
              Nhap thong tin tai khoan cua ban
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Ten dang nhap
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Nhap ten dang nhap"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 border-border/50 bg-secondary/50 pl-10 transition-colors focus:border-primary focus:bg-secondary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mat khau
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => {}}
                  >
                    Quen mat khau?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhap mat khau"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-border/50 bg-secondary/50 pl-10 pr-10 transition-colors focus:border-primary focus:bg-secondary"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal text-muted-foreground"
                >
                  Ghi nho dang nhap
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="h-11 w-full gap-2 bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Dang xu ly...
                  </>
                ) : (
                  <>
                    <Zap className="size-4" />
                    Dang nhap
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">Hoac</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Demo Account Info */}
            <div className="rounded-lg border border-info/30 bg-info/5 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-info/10 p-2">
                  <Shield className="size-4 text-info" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Tai khoan demo
                  </p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p><span className="text-rose-400 font-medium">admin</span> - Quyen Admin (co the xoa bai viet)</p>
                    <p><span className="text-blue-400 font-medium">mod</span> - Quyen Moderator</p>
                    <p><span className="text-amber-400 font-medium">vip</span> - Thanh vien VIP</p>
                    <p><span className="text-foreground">khac</span> - Thanh vien thuong</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>CX9 System v2.5.0</p>
          <p className="mt-1">Powered by Eleon Team</p>
        </div>
      </div>
    </div>
  )
}
