'use client'

import { useState, useEffect } from 'react'
import { Coffee, Play, SkipForward, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApp } from '@/lib/app-context'

const breakActivities = [
  'Levante e alongue o corpo',
  'Tome um copo de água',
  'Olhe para longe da tela',
  'Faça uma respiração profunda',
  'Caminhe um pouco pelo ambiente',
]

export function FocusBreakScreen() {
  const { setCurrentScreen, settings } = useApp()
  const [timeRemaining, setTimeRemaining] = useState(settings.shortBreakLength * 60)
  const [activity] = useState(breakActivities[Math.floor(Math.random() * breakActivities.length)])

  const totalSeconds = settings.shortBreakLength * 60
  const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const circumference = 2 * Math.PI * 100
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      {/* Header */}
      <div className="flex w-full items-center justify-center p-6">
        <div className="flex items-center gap-2 rounded-full bg-chart-4/10 px-4 py-2">
          <Coffee className="h-5 w-5 text-chart-4" />
          <span className="font-medium text-chart-4">Pausa</span>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mb-8 px-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Ótimo trabalho!</h2>
        <p className="text-muted-foreground">Você completou uma sessão de foco.</p>
      </div>

      {/* Timer Circle */}
      <div className="relative mb-8">
        <svg className="h-56 w-56 -rotate-90 transform">
          <circle
            cx="112"
            cy="112"
            r="100"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="112"
            cy="112"
            r="100"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className="text-chart-4 transition-all duration-1000"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums text-foreground">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-sm text-muted-foreground">restantes</span>
        </div>
      </div>

      {/* Activity Suggestion */}
      <Card className="mx-6 mb-8 flex items-center gap-4 border-chart-4/20 bg-chart-4/5 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/20">
          <Sparkles className="h-5 w-5 text-chart-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Sugestão</p>
          <p className="font-medium text-foreground">{activity}</p>
        </div>
      </Card>

      {/* Actions */}
      <div className="mt-auto w-full space-y-3 p-6">
        <Button
          size="lg"
          className="h-14 w-full gap-2"
          onClick={() => setCurrentScreen('focus-active')}
        >
          <Play className="h-5 w-5" />
          Próxima Sessão
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-full gap-2"
          onClick={() => setCurrentScreen('focus-complete')}
        >
          <SkipForward className="h-5 w-5" />
          Encerrar por Hoje
        </Button>
      </div>
    </div>
  )
}
