import type { User, Achievement, FocusSession, DailyStats, AppSettings } from './types'

export const mockUser: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@email.com',
  level: 12,
  xp: 2450,
  xpToNextLevel: 3000,
  totalFocusTime: 4520,
  streak: 7,
  achievements: [],
  createdAt: new Date('2024-01-15'),
}

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Primeiro Passo',
    description: 'Complete sua primeira sessão de foco',
    icon: 'rocket',
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Maratonista',
    description: 'Acumule 10 horas de foco',
    icon: 'timer',
    unlockedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Consistência',
    description: 'Mantenha uma sequência de 7 dias',
    icon: 'flame',
    unlockedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    title: 'Mestre do Foco',
    description: 'Complete 50 sessões de foco',
    icon: 'brain',
    progress: 42,
    maxProgress: 50,
  },
  {
    id: '5',
    title: 'Deep Worker',
    description: 'Complete uma sessão de 2 horas',
    icon: 'moon',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: '6',
    title: 'Lendário',
    description: 'Alcance o nível 25',
    icon: 'crown',
    progress: 12,
    maxProgress: 25,
  },
]

export const mockSessions: FocusSession[] = [
  {
    id: '1',
    userId: '1',
    startTime: new Date(),
    duration: 25,
    type: 'pomodoro',
    completed: true,
    xpEarned: 50,
    task: 'Estudar Matemática',
  },
  {
    id: '2',
    userId: '1',
    startTime: new Date(Date.now() - 3600000),
    duration: 25,
    type: 'pomodoro',
    completed: true,
    xpEarned: 50,
    task: 'Revisar Português',
  },
  {
    id: '3',
    userId: '1',
    startTime: new Date(Date.now() - 7200000),
    duration: 60,
    type: 'deep-work',
    completed: true,
    xpEarned: 120,
    task: 'Projeto de Física',
  },
]

export const mockWeeklyStats: DailyStats[] = [
  { date: '2024-01-15', focusMinutes: 120, sessions: 5, xpEarned: 250 },
  { date: '2024-01-16', focusMinutes: 90, sessions: 4, xpEarned: 180 },
  { date: '2024-01-17', focusMinutes: 150, sessions: 6, xpEarned: 300 },
  { date: '2024-01-18', focusMinutes: 60, sessions: 3, xpEarned: 120 },
  { date: '2024-01-19', focusMinutes: 180, sessions: 7, xpEarned: 360 },
  { date: '2024-01-20', focusMinutes: 45, sessions: 2, xpEarned: 90 },
  { date: '2024-01-21', focusMinutes: 135, sessions: 5, xpEarned: 270 },
]

export const defaultSettings: AppSettings = {
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  sessionsUntilLongBreak: 4,
  notifications: true,
  sounds: true,
  blockedApps: ['Instagram', 'TikTok', 'Twitter', 'YouTube'],
  focusMode: 'moderate',
}
