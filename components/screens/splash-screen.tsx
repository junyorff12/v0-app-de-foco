'use client'

import { useEffect } from 'react'
import { Brain } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export function SplashScreen() {
  const { setCurrentScreen } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding')
    }, 2500)
    return () => clearTimeout(timer)
  }, [setCurrentScreen])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-foreground/10 backdrop-blur-sm">
          <Brain className="h-14 w-14 text-primary-foreground" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground">
            FocusFlow
          </h1>
          <p className="text-primary-foreground/80">
            Foque no que realmente é importante
          </p>
        </div>
      </div>
      <div className="absolute bottom-12">
        <div className="h-1 w-32 overflow-hidden rounded-full bg-primary-foreground/20">
          <div className="h-full animate-pulse rounded-full bg-primary-foreground" 
               style={{ animation: 'loading 2s ease-in-out' }} />
        </div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
