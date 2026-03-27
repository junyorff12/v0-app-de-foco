'use client'

import { useState } from 'react'
import { ArrowLeft, Search, Plus, X, Check, Smartphone } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useApp } from '@/lib/app-context'

const popularApps = [
  { name: 'Instagram', icon: '📸', category: 'Social' },
  { name: 'TikTok', icon: '🎵', category: 'Social' },
  { name: 'Twitter', icon: '🐦', category: 'Social' },
  { name: 'YouTube', icon: '▶️', category: 'Entretenimento' },
  { name: 'Netflix', icon: '🎬', category: 'Entretenimento' },
  { name: 'WhatsApp', icon: '💬', category: 'Mensagens' },
  { name: 'Telegram', icon: '✈️', category: 'Mensagens' },
  { name: 'Discord', icon: '🎮', category: 'Mensagens' },
  { name: 'Facebook', icon: '👤', category: 'Social' },
  { name: 'Snapchat', icon: '👻', category: 'Social' },
  { name: 'Reddit', icon: '🔴', category: 'Social' },
  { name: 'Twitch', icon: '💜', category: 'Entretenimento' },
]

export function BlockedAppsScreen() {
  const { setCurrentScreen, settings, setSettings } = useApp()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = popularApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleApp = (appName: string) => {
    if (settings.blockedApps.includes(appName)) {
      setSettings({
        ...settings,
        blockedApps: settings.blockedApps.filter(a => a !== appName)
      })
    } else {
      setSettings({
        ...settings,
        blockedApps: [...settings.blockedApps, appName]
      })
    }
  }

  const isBlocked = (appName: string) => settings.blockedApps.includes(appName)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('settings')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Apps Bloqueados</h1>
          <p className="text-sm text-muted-foreground">{settings.blockedApps.length} selecionados</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar aplicativo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12"
          />
        </div>
      </div>

      {/* Selected Apps */}
      {settings.blockedApps.length > 0 && (
        <div className="px-6 pb-4">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">BLOQUEADOS</h2>
          <div className="flex flex-wrap gap-2">
            {settings.blockedApps.map((appName) => {
              const app = popularApps.find(a => a.name === appName)
              return (
                <button
                  key={appName}
                  onClick={() => toggleApp(appName)}
                  className="flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
                >
                  {app?.icon} {appName}
                  <X className="h-4 w-4" />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* All Apps */}
      <div className="flex-1 px-6">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">TODOS OS APPS</h2>
        <div className="flex flex-col gap-2">
          {filteredApps.map((app) => {
            const blocked = isBlocked(app.name)
            return (
              <Card
                key={app.name}
                className={`cursor-pointer transition-all ${blocked ? 'ring-2 ring-primary' : ''}`}
                onClick={() => toggleApp(app.name)}
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                    {app.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{app.name}</p>
                    <p className="text-sm text-muted-foreground">{app.category}</p>
                  </div>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    blocked ? 'bg-primary' : 'border-2 border-muted-foreground/30'
                  }`}>
                    {blocked && <Check className="h-4 w-4 text-primary-foreground" />}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="p-6">
        <Card className="flex items-center gap-4 bg-muted/50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Os apps selecionados serão bloqueados durante suas sessões de foco para ajudar você a manter a concentração.
            </p>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="p-6 pt-0">
        <Button 
          size="lg" 
          className="h-14 w-full"
          onClick={() => setCurrentScreen('settings')}
        >
          Salvar Alterações
        </Button>
      </div>
    </div>
  )
}
