'use client'

import { Trophy, Zap, Clock, Flame, Star, ArrowRight, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApp } from '@/lib/app-context'

export function FocusCompleteScreen() {
  const { setCurrentScreen, user, focusDuration, focusType, currentTask } = useApp()

  const xpEarned = focusType === 'pomodoro' ? 50 : focusType === 'deep-work' ? 100 : focusDuration * 2
  const isNewAchievement = Math.random() > 0.5

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Celebration Header */}
      <div className="flex flex-col items-center bg-primary px-6 pb-12 pt-16">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary-foreground/20">
          <Trophy className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-primary-foreground">Parabéns!</h1>
        <p className="text-center text-primary-foreground/80">
          Você completou sua sessão de foco
        </p>
      </div>

      {/* Stats Cards */}
      <div className="relative -mt-6 px-6">
        <Card className="grid grid-cols-3 divide-x divide-border p-4">
          <div className="flex flex-col items-center gap-1">
            <Clock className="h-5 w-5 text-chart-1" />
            <span className="text-xl font-bold text-foreground">{focusDuration}</span>
            <span className="text-xs text-muted-foreground">minutos</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Zap className="h-5 w-5 text-accent" />
            <span className="text-xl font-bold text-foreground">+{xpEarned}</span>
            <span className="text-xs text-muted-foreground">XP</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Flame className="h-5 w-5 text-destructive" />
            <span className="text-xl font-bold text-foreground">{user?.streak || 0}</span>
            <span className="text-xs text-muted-foreground">sequência</span>
          </div>
        </Card>
      </div>

      {/* Task Completed */}
      {currentTask && (
        <div className="px-6 pt-6">
          <Card className="flex items-center gap-4 bg-chart-1/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/20">
              <Star className="h-5 w-5 text-chart-1" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Tarefa concluída</p>
              <p className="font-medium text-foreground">{currentTask}</p>
            </div>
          </Card>
        </div>
      )}

      {/* New Achievement */}
      {isNewAchievement && (
        <div className="px-6 pt-4">
          <Card className="overflow-hidden">
            <div className="bg-accent/10 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                  <Trophy className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-accent">Nova Conquista!</p>
                  <h3 className="text-lg font-semibold text-foreground">Focado</h3>
                  <p className="text-sm text-muted-foreground">Complete 5 sessões de foco</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Level Progress */}
      <div className="px-6 pt-4">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Nível {user?.level || 1}</span>
            <span className="text-sm font-medium text-primary">
              {user?.xp.toLocaleString()} / {user?.xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${((user?.xp || 0) / (user?.xpToNextLevel || 1)) * 100}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Share */}
      <div className="flex items-center justify-center gap-2 px-6 pt-6">
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Compartilhar resultado
        </Button>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-3 p-6">
        <Button
          size="lg"
          className="h-14 w-full gap-2"
          onClick={() => setCurrentScreen('focus-setup')}
        >
          Nova Sessão
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-full"
          onClick={() => setCurrentScreen('dashboard')}
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  )
}
