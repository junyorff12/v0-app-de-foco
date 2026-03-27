'use client'

import { useState } from 'react'
import { ArrowLeft, Clock, Bell, Volume2, Shield, ChevronRight, Moon, Sun, Minus, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useApp } from '@/lib/app-context'

export function SettingsScreen() {
  const { setCurrentScreen, settings, setSettings } = useApp()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const updateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('profile')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Configurações</h1>
      </div>

      <div className="flex flex-col gap-6 px-6">
        {/* Timer Settings */}
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">TEMPO</h2>
          <Card className="divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10">
                  <Clock className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pomodoro</p>
                  <p className="text-sm text-muted-foreground">Duração da sessão</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateSetting('pomodoroLength', Math.max(5, settings.pomodoroLength - 5))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-foreground">
                  {settings.pomodoroLength}min
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateSetting('pomodoroLength', Math.min(60, settings.pomodoroLength + 5))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">Pausa Curta</p>
                <p className="text-sm text-muted-foreground">Entre sessões</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateSetting('shortBreakLength', Math.max(1, settings.shortBreakLength - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-foreground">
                  {settings.shortBreakLength}min
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateSetting('shortBreakLength', Math.min(15, settings.shortBreakLength + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">Pausa Longa</p>
                <p className="text-sm text-muted-foreground">Após 4 sessões</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateSetting('longBreakLength', Math.max(5, settings.longBreakLength - 5))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-foreground">
                  {settings.longBreakLength}min
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateSetting('longBreakLength', Math.min(30, settings.longBreakLength + 5))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">NOTIFICAÇÕES</h2>
          <Card className="divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/10">
                  <Bell className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Notificações</p>
                  <p className="text-sm text-muted-foreground">Alertas e lembretes</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
                  <Volume2 className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sons</p>
                  <p className="text-sm text-muted-foreground">Alertas sonoros</p>
                </div>
              </div>
              <Switch
                checked={settings.sounds}
                onCheckedChange={(checked) => updateSetting('sounds', checked)}
              />
            </div>
          </Card>
        </div>

        {/* Focus Mode */}
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">MODO FOCO</h2>
          <Card className="divide-y divide-border">
            <button
              className="flex w-full items-center justify-between p-4"
              onClick={() => setCurrentScreen('blocked-apps')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                  <Shield className="h-5 w-5 text-destructive" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Apps Bloqueados</p>
                  <p className="text-sm text-muted-foreground">{settings.blockedApps.length} apps selecionados</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="p-4">
              <p className="mb-3 font-medium text-foreground">Intensidade do Bloqueio</p>
              <div className="flex gap-2">
                {(['relaxed', 'moderate', 'strict'] as const).map((mode) => (
                  <button
                    key={mode}
                    className={`flex-1 rounded-lg border-2 py-3 text-sm font-medium transition-all ${
                      settings.focusMode === mode
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground'
                    }`}
                    onClick={() => updateSetting('focusMode', mode)}
                  >
                    {mode === 'relaxed' ? 'Leve' : mode === 'moderate' ? 'Moderado' : 'Intenso'}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Appearance */}
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">APARÊNCIA</h2>
          <Card>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  {isDarkMode ? <Moon className="h-5 w-5 text-foreground" /> : <Sun className="h-5 w-5 text-foreground" />}
                </div>
                <div>
                  <p className="font-medium text-foreground">Modo Escuro</p>
                  <p className="text-sm text-muted-foreground">Alterna o tema do app</p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
