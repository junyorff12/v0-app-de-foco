export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  xp: number
  xpToNextLevel: number
  totalFocusTime: number
  streak: number
  achievements: Achievement[]
  createdAt: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

export interface FocusSession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  duration: number
  type: 'pomodoro' | 'deep-work' | 'custom'
  completed: boolean
  xpEarned: number
  task?: string
}

export interface DailyStats {
  date: string
  focusMinutes: number
  sessions: number
  xpEarned: number
}

export interface AppSettings {
  pomodoroLength: number
  shortBreakLength: number
  longBreakLength: number
  sessionsUntilLongBreak: number
  notifications: boolean
  sounds: boolean
  blockedApps: string[]
  focusMode: 'strict' | 'moderate' | 'relaxed'
}
