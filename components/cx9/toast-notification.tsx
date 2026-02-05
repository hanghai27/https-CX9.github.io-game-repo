"use client"

import React from "react"

import { useState, useEffect, createContext, useContext, useCallback } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"

export type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

const toastConfig: Record<ToastType, { icon: React.ReactNode; color: string }> = {
  success: {
    icon: <CheckCircle className="size-4" />,
    color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  error: {
    icon: <XCircle className="size-4" />,
    color: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  warning: {
    icon: <AlertTriangle className="size-4" />,
    color: "border-warning/30 bg-warning/10 text-warning",
  },
  info: {
    icon: <Info className="size-4" />,
    color: "border-info/30 bg-info/10 text-info",
  },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, type, message, duration }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onRemove={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const config = toastConfig[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove()
    }, toast.duration || 4000)

    return () => clearTimeout(timer)
  }, [toast.duration, onRemove])

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm animate-in slide-in-from-right-4 duration-300",
        config.color
      )}
    >
      {config.icon}
      <span className="text-sm font-medium text-foreground">{toast.message}</span>
      <button
        onClick={onRemove}
        className="ml-2 rounded p-1 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="size-3" />
      </button>
    </div>
  )
}
