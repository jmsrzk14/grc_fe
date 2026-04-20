"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const Icon = variant === "success" ? CheckCircle2 : 
                     variant === "destructive" ? AlertCircle : 
                     variant === "warning" ? AlertTriangle : Info

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 mt-1">
                <Icon size={18} className="animate-in fade-in zoom-in duration-300" />
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle className="font-black tracking-tight">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-xs font-medium opacity-90">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
