'use client'

import { useState, useEffect } from 'react'
import { Pause, X, Volume2, VolumeX, Zap, Shield, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'

export function FocusActiveScreen() {
  const { setCurrentScreen, focusDuration, focusType, currentTask, settings } = useApp()
  const [timeRemaining, setTimeRemaining] = useState(focusDuration * 60)
  const [isPaused, setIsPaused] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(settings.sounds)

  const totalSeconds = focusDuration * 60
  const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          if (focusType === 'pomodoro') {
            setCurrentScreen('focus-break')
          } else {
            setCurrentScreen('focus-complete')
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, setCurrentScreen, focusType])

  const handleQuit = () => {
    if (confirm('Tem certeza que deseja abandonar a sessão? Você perderá o progresso.')) {
      setCurrentScreen('dashboard')
    }
  }

  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      {/* Header */}
      <div className="flex w-full items-center justify-between p-6">
        <Button variant="ghost" size="icon" onClick={handleQuit}>
          <X className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5">
          <Shield className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">Modo Foco</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Task */}
      {currentTask && (
        <div className="mb-8 px-6 text-center">
          <p className="text-sm text-muted-foreground">Focando em</p>
          <h2 className="text-lg font-semibold text-foreground">{currentTask}</h2>
        </div>
      )}

      {/* Timer Circle */}
      <div className="relative flex flex-1 items-center justify-center">
        <svg className="h-80 w-80 -rotate-90 transform">
          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            className="text-primary transition-all duration-1000"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <span className="text-6xl font-bold tabular-nums text-foreground">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="mt-2 text-muted-foreground">
            {focusType === 'pomodoro' ? 'Pomodoro' : focusType === 'deep-work' ? 'Deep Work' : 'Personalizado'}
          </span>
        </div>
      </div>

      {/* XP Indicator */}
      <div className="mb-8 flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
        <Zap className="h-5 w-5 text-accent" />
        <span className="font-medium text-accent">
          +{Math.floor((progress / 100) * (focusType === 'pomodoro' ? 50 : 100))} XP
        </span>
      </div>

      {/* Controls */}
      <div className="w-full px-6 pb-12">
        <Button
          size="lg"
          variant={isPaused ? 'default' : 'outline'}
          className="h-16 w-full gap-3 text-lg"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? (
            <>
              <Brain className="h-6 w-6" />
              Continuar
            </>
          ) : (
            <>
              <Pause className="h-6 w-6" />
              Pausar
            </>
          )}
        </Button>
      </div>

      {/* Blocked Apps Notification */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>{settings.blockedApps.length} apps bloqueados durante a sessão</span>
        </div>
      </div>
    </div>
  )
}
