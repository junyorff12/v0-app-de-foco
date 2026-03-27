'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User, AppSettings } from './types'
import { mockUser, defaultSettings } from './mock-data'

type Screen = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'focus-setup'
  | 'focus-active'
  | 'focus-break'
  | 'focus-complete'
  | 'achievements'
  | 'stats'
  | 'profile'
  | 'settings'
  | 'blocked-apps'
  | 'kanban'

interface AppContextType {
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
  user: User | null
  setUser: (user: User | null) => void
  settings: AppSettings
  setSettings: (settings: AppSettings) => void
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  focusType: 'pomodoro' | 'deep-work' | 'custom'
  setFocusType: (type: 'pomodoro' | 'deep-work' | 'custom') => void
  focusDuration: number
  setFocusDuration: (duration: number) => void
  currentTask: string
  setCurrentTask: (task: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash')
  const [user, setUser] = useState<User | null>(null)
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [focusType, setFocusType] = useState<'pomodoro' | 'deep-work' | 'custom'>('pomodoro')
  const [focusDuration, setFocusDuration] = useState(25)
  const [currentTask, setCurrentTask] = useState('')

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        setUser,
        settings,
        setSettings,
        isAuthenticated,
        setIsAuthenticated,
        focusType,
        setFocusType,
        focusDuration,
        setFocusDuration,
        currentTask,
        setCurrentTask,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export { mockUser }
