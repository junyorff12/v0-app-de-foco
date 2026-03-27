'use client'

import { Zap, BarChart3, Trophy, User, Settings, ChevronRight, LogOut, Clock, Flame, Target, Camera } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'

export function ProfileScreen() {
  const { setCurrentScreen, user, setUser, setIsAuthenticated } = useApp()

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      setUser(null)
      setIsAuthenticated(false)
      setCurrentScreen('login')
    }
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Profile Card */}
      <div className="px-6 pb-6">
        <Card className="flex flex-col items-center p-6">
          <div className="relative mb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <span className="text-3xl font-bold text-primary">
                {user.name.charAt(0)}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="rounded-full bg-accent px-3 py-1">
              <span className="text-sm font-medium text-accent-foreground">
                Nível {user.level}
              </span>
            </div>
            <div className="rounded-full bg-primary/10 px-3 py-1">
              <span className="text-sm font-medium text-primary">
                {user.xp.toLocaleString()} XP
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 px-6 pb-6">
        <Card className="flex flex-col items-center p-4">
          <Clock className="mb-2 h-5 w-5 text-chart-1" />
          <span className="text-lg font-bold text-foreground">
            {Math.floor(user.totalFocusTime / 60)}h
          </span>
          <span className="text-xs text-muted-foreground">Total</span>
        </Card>
        <Card className="flex flex-col items-center p-4">
          <Flame className="mb-2 h-5 w-5 text-accent" />
          <span className="text-lg font-bold text-foreground">{user.streak}</span>
          <span className="text-xs text-muted-foreground">Sequência</span>
        </Card>
        <Card className="flex flex-col items-center p-4">
          <Target className="mb-2 h-5 w-5 text-chart-4" />
          <span className="text-lg font-bold text-foreground">127</span>
          <span className="text-xs text-muted-foreground">Sessões</span>
        </Card>
      </div>

      {/* Menu Options */}
      <div className="px-6 pb-6">
        <Card className="divide-y divide-border">
          <button
            className="flex w-full items-center justify-between p-4"
            onClick={() => setCurrentScreen('settings')}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">Configurações</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <button
            className="flex w-full items-center justify-between p-4"
            onClick={() => setCurrentScreen('achievements')}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Trophy className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">Conquistas</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <button
            className="flex w-full items-center justify-between p-4"
            onClick={() => setCurrentScreen('stats')}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">Estatísticas</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <button
            className="flex w-full items-center justify-between p-4"
            onClick={() => setCurrentScreen('blocked-apps')}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Zap className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">Apps Bloqueados</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="px-6">
        <Button
          variant="outline"
          className="h-12 w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Sair da Conta
        </Button>
      </div>

      {/* App Version */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">FocusFlow v1.0.0</p>
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
          <div className="flex h-10 w-10 items-center justify-center">
            <Trophy className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Conquistas</span>
        </button>
        <button className="flex flex-col items-center gap-1" onClick={() => setCurrentScreen('profile')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary">Perfil</span>
        </button>
      </div>
    </div>
  )
}
