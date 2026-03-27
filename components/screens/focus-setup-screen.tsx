'use client'

import { useState } from 'react'
import { ArrowLeft, Clock, Brain, Zap, Timer, Shield, ChevronDown, ChevronUp, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApp } from '@/lib/app-context'

const focusTypes = [
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    description: '25 min de foco + 5 min de pausa',
    duration: 25,
    icon: Timer,
    color: 'bg-chart-1',
  },
  {
    id: 'deep-work',
    name: 'Deep Work',
    description: 'Sessão intensa de 50 minutos',
    duration: 50,
    icon: Brain,
    color: 'bg-chart-3',
  },
  {
    id: 'custom',
    name: 'Personalizado',
    description: 'Defina seu próprio tempo',
    duration: 0,
    icon: Clock,
    color: 'bg-chart-4',
  },
]

export function FocusSetupScreen() {
  const { setCurrentScreen, focusType, setFocusType, focusDuration, setFocusDuration, currentTask, setCurrentTask, settings } = useApp()
  const [showBlockedApps, setShowBlockedApps] = useState(false)
  const [customDuration, setCustomDuration] = useState(30)

  const handleStart = () => {
    if (focusType === 'custom') {
      setFocusDuration(customDuration)
    } else {
      const selectedType = focusTypes.find(t => t.id === focusType)
      setFocusDuration(selectedType?.duration || 25)
    }
    setCurrentScreen('focus-active')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Nova Sessão</h1>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-6">
        {/* Task Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            O que você vai estudar?
          </label>
          <Input
            placeholder="Ex: Revisar Matemática"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            className="h-14 text-base"
          />
        </div>

        {/* Focus Type Selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-foreground">
            Tipo de sessão
          </label>
          <div className="flex flex-col gap-3">
            {focusTypes.map((type) => {
              const Icon = type.icon
              const isSelected = focusType === type.id
              return (
                <Card
                  key={type.id}
                  className={`cursor-pointer p-4 transition-all ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setFocusType(type.id as 'pomodoro' | 'deep-work' | 'custom')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${type.color}`}>
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 ${
                      isSelected 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground/30'
                    }`}>
                      {isSelected && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Custom Duration */}
        {focusType === 'custom' && (
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Duração (minutos)
            </label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCustomDuration(Math.max(5, customDuration - 5))}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-bold text-foreground">{customDuration}</span>
                <span className="ml-1 text-muted-foreground">min</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCustomDuration(Math.min(120, customDuration + 5))}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Blocked Apps */}
        <Card className="overflow-hidden">
          <button
            className="flex w-full items-center justify-between p-4"
            onClick={() => setShowBlockedApps(!showBlockedApps)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                <Shield className="h-5 w-5 text-destructive" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-foreground">Apps Bloqueados</h3>
                <p className="text-sm text-muted-foreground">{settings.blockedApps.length} apps</p>
              </div>
            </div>
            {showBlockedApps ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          {showBlockedApps && (
            <div className="border-t border-border px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {settings.blockedApps.map((app) => (
                  <span
                    key={app}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    {app}
                  </span>
                ))}
              </div>
              <button 
                className="mt-3 text-sm text-primary"
                onClick={() => setCurrentScreen('blocked-apps')}
              >
                Gerenciar apps bloqueados
              </button>
            </div>
          )}
        </Card>

        {/* XP Preview */}
        <Card className="flex items-center gap-4 bg-accent/10 p-4">
          <Zap className="h-6 w-6 text-accent" />
          <div>
            <p className="text-sm text-muted-foreground">XP estimado</p>
            <p className="font-semibold text-foreground">
              +{focusType === 'custom' ? customDuration * 2 : focusType === 'pomodoro' ? 50 : 100} XP
            </p>
          </div>
        </Card>
      </div>

      {/* Start Button */}
      <div className="p-6">
        <Button 
          size="lg" 
          className="h-16 w-full gap-3 text-lg"
          onClick={handleStart}
        >
          <Play className="h-6 w-6" />
          Iniciar Foco
        </Button>
      </div>
    </div>
  )
}
