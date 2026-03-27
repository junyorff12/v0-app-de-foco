'use client'

import { Trophy, Zap, BarChart3, User, Lock, Rocket, Timer, Flame, Brain, Moon, Crown, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useApp } from '@/lib/app-context'
import { mockAchievements } from '@/lib/mock-data'
import { InspirationalQuoteCard } from '@/components/inspirational-quote-card'

const iconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  timer: Timer,
  flame: Flame,
  brain: Brain,
  moon: Moon,
  crown: Crown,
  star: Star,
}

export function AchievementsScreen() {
  const { setCurrentScreen, user } = useApp()

  const unlockedAchievements = mockAchievements.filter(a => a.unlockedAt)
  const lockedAchievements = mockAchievements.filter(a => !a.unlockedAt)

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="p-6 pb-3">
        <h1 className="text-2xl font-bold text-foreground">Conquistas</h1>
        <p className="text-muted-foreground">
          {unlockedAchievements.length} de {mockAchievements.length} desbloqueadas
        </p>
      </div>

      {/* Inspirational Quote */}
      <div className="px-6 pb-4">
        <InspirationalQuoteCard compact={false} />
      </div>

      {/* Stats Summary */}
      <div className="px-6 pb-6">
        <Card className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
              <Trophy className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de XP</p>
              <p className="text-xl font-bold text-foreground">
                {user?.xp.toLocaleString() || 0}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Nível</p>
            <p className="text-xl font-bold text-primary">{user?.level || 1}</p>
          </div>
        </Card>
      </div>

      {/* Unlocked Achievements */}
      <div className="px-6 pb-6">
        <h2 className="mb-4 font-semibold text-foreground">Desbloqueadas</h2>
        <div className="grid grid-cols-1 gap-3">
          {unlockedAchievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Star
            return (
              <Card key={achievement.id} className="flex items-center gap-4 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.unlockedAt && (
                    <p className="mt-1 text-xs text-primary">
                      Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Locked / In Progress Achievements */}
      <div className="px-6 pb-6">
        <h2 className="mb-4 font-semibold text-foreground">Em Progresso</h2>
        <div className="grid grid-cols-1 gap-3">
          {lockedAchievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Star
            const progress = achievement.progress && achievement.maxProgress 
              ? (achievement.progress / achievement.maxProgress) * 100 
              : 0
            return (
              <Card key={achievement.id} className="flex items-center gap-4 p-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                  <Icon className="h-7 w-7 text-muted-foreground" />
                  {progress === 0 && (
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="text-primary">{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-card p-4">
        <button className="flex flex-col items-center gap-1" onClick={() => setCurrentScreen('dashboard')}>
          <div className="flex h-10 w-10 items-center justify-center">
            <Zap className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1" onClick={() => setCurrentScreen('stats')}>
          <div className="flex h-10 w-10 items-center justify-center">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Estatísticas</span>
        </button>
        <button className="flex flex-col items-center gap-1" onClick={() => setCurrentScreen('achievements')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary">Conquistas</span>
        </button>
        <button className="flex flex-col items-center gap-1" onClick={() => setCurrentScreen('profile')}>
          <div className="flex h-10 w-10 items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Perfil</span>
        </button>
      </div>
    </div>
  )
}
