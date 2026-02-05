
"use client"

import { useState } from "react"
import { Sidebar } from "@/components/cx9/sidebar"
import { Header } from "@/components/cx9/header"
import { ViethoaModule } from "@/components/cx9/viethoa-module"
import { DashboardModule } from "@/components/cx9/dashboard-module"
import { RobloxModule } from "@/components/cx9/roblox-module"
import { UpdatesModule } from "@/components/cx9/updates-module"
import { CommunityModule } from "@/components/cx9/community-module"
import { DataModule } from "@/components/cx9/data-module"
import { SettingsModule } from "@/components/cx9/settings-module"
import { LoginScreen, type UserInfo } from "@/components/cx9/login-screen"
import { LandingPage } from "@/components/cx9/landing-page"
import { BookOpen, X } from "lucide-react"

type ViewState = 'landing' | 'login' | 'dashboard'

export default function CX9App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing')
  const [activeTab, setActiveTab] = useState("viethoa")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null)

  const handleLogin = (user: UserInfo) => {
    setCurrentUser(user)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('landing')
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardModule />
      case "viethoa":
        return <ViethoaModule />
      case "roblox":
        return <RobloxModule />
      case "updates":
        return <UpdatesModule />
      case "community":
        return <CommunityModule currentUser={currentUser} />
      case "pedia":
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-2xl bg-primary/10 p-4">
              <BookOpen className="size-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Eleon Pedia</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Kho tàng kiến thức về game và phần mềm đang được phát triển
            </p>
          </div>
        )
      case "data":
        return <DataModule />
      case "settings":
        return <SettingsModule currentUser={currentUser} />
      default:
        return <ViethoaModule />
    }
  }

  if (currentView === 'landing') {
    return (
      <LandingPage 
        onLoginClick={() => setCurrentView('login')}
        onGetStarted={() => setCurrentView('login')}
      />
    )
  }

  if (currentView === 'login') {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        onBack={() => setCurrentView('landing')}
      />
    )
  }

  // Dashboard View
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-64 animate-in slide-in-from-left duration-300">
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab)
                setMobileMenuOpen(false)
              }}
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-2 top-4 rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileMenuOpen(true)} currentUser={currentUser} />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 px-4 py-3 flex justify-between items-center text-xs text-muted-foreground backdrop-blur-sm">
          <p>CX9 System v2.5.0 • Powered by Eleon Team</p>
          <button onClick={handleLogout} className="hover:text-primary transition-colors">
            Đăng xuất
          </button>
        </footer>
      </div>
    </div>
  )
}
