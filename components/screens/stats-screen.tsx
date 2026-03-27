'use client'

import { Zap, BarChart3, Trophy, User, Clock, Target, Flame, TrendingUp, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useApp } from '@/lib/app-context'
import { mockWeeklyStats, mockSessions } from '@/lib/mock-data'

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export function StatsScreen() {
  const { setCurrentScreen, user } = useApp()

  const totalMinutesWeek = mockWeeklyStats.reduce((acc, s) => acc + s.focusMinutes, 0)
  const totalSessionsWeek = mockWeeklyStats.reduce((acc, s) => acc + s.sessions, 0)
  const totalXpWeek = mockWeeklyStats.reduce((acc, s) => acc + s.xpEarned, 0)
  const avgMinutesPerDay = Math.round(totalMinutesWeek / 7)
  const maxMinutes = Math.max(...mockWeeklyStats.map(s => s.focusMinutes))

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground">Estatísticas</h1>
        <p className="text-muted-foreground">Seu progresso de estudo</p>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-2 gap-3 px-6 pb-6">
        <Card className="flex flex-col p-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10">
            <Clock className="h-5 w-5 text-chart-1" />
          </div>
          <span className="text-2xl font-bold text-foreground">{totalMinutesWeek}</span>
          <span className="text-sm text-muted-foreground">min esta semana</span>
        </Card>
        <Card className="flex flex-col p-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/10">
            <Target className="h-5 w-5 text-chart-2" />
          </div>
          <span className="text-2xl font-bold text-foreground">{totalSessionsWeek}</span>
          <span className="text-sm text-muted-foreground">sessões</span>
        </Card>
        <Card className="flex flex-col p-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <span className="text-2xl font-bold text-foreground">{totalXpWeek}</span>
          <span className="text-sm text-muted-foreground">XP ganhos</span>
        </Card>
        <Card className="flex flex-col p-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
            <TrendingUp className="h-5 w-5 text-chart-4" />
          </div>
          <span className="text-2xl font-bold text-foreground">{avgMinutesPerDay}</span>
          <span className="text-sm text-muted-foreground">min/dia média</span>
        </Card>
      </div>

      {/* Weekly Chart */}
      <div className="px-6 pb-6">
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Esta Semana</h3>
            <div className="flex items-center gap-1 text-sm text-primary">
              <Calendar className="h-4 w-4" />
              <span>7 dias</span>
            </div>
          </div>
          <div className="flex h-40 items-end justify-between gap-2">
            {mockWeeklyStats.map((stat, index) => {
              const height = maxMinutes > 0 ? (stat.focusMinutes / maxMinutes) * 100 : 0
              const today = new Date().getDay()
              const isToday = index === (today === 0 ? 6 : today - 1)
              return (
                <div key={stat.date} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isToday ? 'bg-primary' : 'bg-chart-1/40'
                      }`}
                      style={{ height: `${height}%`, minHeight: height > 0 ? '8px' : '0' }}
                    />
                  </div>
                  <span className={`text-xs ${isToday ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
                    {dayNames[index]}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Streak */}
      <div className="px-6 pb-6">
        <Card className="flex items-center gap-4 bg-accent/5 p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Flame className="h-7 w-7 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Sequência atual</p>
            <p className="text-2xl font-bold text-foreground">{user?.streak || 0} dias</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Melhor</p>
            <p className="font-semibold text-primary">14 dias</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <h3 className="mb-4 font-semibold text-foreground">Atividade Recente</h3>
        <div className="flex flex-col gap-3">
          {mockSessions.map((session) => (
            <Card key={session.id} className="flex items-center gap-4 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                session.type === 'pomodoro' ? 'bg-chart-1/10' : 'bg-chart-3/10'
              }`}>
                <Clock className={`h-5 w-5 ${
                  session.type === 'pomodoro' ? 'text-chart-1' : 'text-chart-3'
                }`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{session.task || 'Sessão de foco'}</p>
                <p className="text-sm text-muted-foreground">
                  {session.duration} min • {session.type === 'pomodoro' ? 'Pomodoro' : 'Deep Work'}
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <Zap className="h-4 w-4" />
                <span className="font-medium">+{session.xpEarned}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Total Stats */}
      <div className="px-6 pb-6">
        <Card className="p-4">
          <h3 className="mb-4 font-semibold text-foreground">Total Geral</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Tempo total de foco</p>
              <p className="text-xl font-bold text-foreground">
                {Math.floor((user?.totalFocusTime || 0) / 60)}h {(user?.totalFocusTime || 0) % 60}min
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sessões completadas</p>
              <p className="text-xl font-bold text-foreground">127</p>
            </div>
          </div>
        </Card>
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary">Estatísticas</span>
        </button>
        <button className="flex flex-col items-center gap-1" onClick={() => setCurrentScreen('achievements')}>
          <div className="flex h-10 w-10 items-center justify-center">
            <Trophy className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Conquistas</span>
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
