'use client'

import { useState } from 'react'
import { Play, Flame, Trophy, BarChart3, Settings, User, Zap, Clock, Target, Plus, X, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useApp } from '@/lib/app-context'
import { mockSessions } from '@/lib/mock-data'

interface Task {
  id: string
  title: string
  completed: boolean
}

export function DashboardScreen() {
  const { user, setCurrentScreen } = useApp()
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Revisar capítulo de Matemática', completed: false },
    { id: '2', title: 'Fazer exercícios de Física', completed: true },
  ])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  if (!user) return null

  const xpProgress = (user.xp / user.xpToNextLevel) * 100
  const todayMinutes = mockSessions.reduce((acc, s) => acc + s.duration, 0)
  const todaySessions = mockSessions.length

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), title: newTaskTitle.trim(), completed: false }
      ])
      setNewTaskTitle('')
      setShowAddTask(false)
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Olá,</p>
            <h2 className="font-semibold text-foreground">{user.name.split(' ')[0]}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1.5">
            <Flame className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">{user.streak}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setCurrentScreen('settings')}
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Level Card */}
      <div className="px-6 pb-6">
        <Card className="bg-primary p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-foreground/70">Nível {user.level}</p>
              <h3 className="text-2xl font-bold text-primary-foreground">
                {user.xp.toLocaleString()} XP
              </h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/20">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs text-primary-foreground/70">
              <span>Progresso</span>
              <span>{user.xpToNextLevel - user.xp} XP para o próximo nível</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-primary-foreground/20">
              <div 
                className="h-full rounded-full bg-primary-foreground transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 px-6 pb-6">
        <Card className="flex flex-col items-center p-4">
          <Clock className="mb-2 h-5 w-5 text-chart-1" />
          <span className="text-xl font-bold text-foreground">{todayMinutes}</span>
          <span className="text-xs text-muted-foreground">min hoje</span>
        </Card>
        <Card className="flex flex-col items-center p-4">
          <Target className="mb-2 h-5 w-5 text-chart-2" />
          <span className="text-xl font-bold text-foreground">{todaySessions}</span>
          <span className="text-xs text-muted-foreground">sessões</span>
        </Card>
        <Card className="flex flex-col items-center p-4">
          <Flame className="mb-2 h-5 w-5 text-accent" />
          <span className="text-xl font-bold text-foreground">{user.streak}</span>
          <span className="text-xs text-muted-foreground">dias</span>
        </Card>
      </div>

      {/* Start Focus Button */}
      <div className="px-6 pb-6">
        <Button 
          size="lg" 
          className="h-16 w-full gap-3 text-lg"
          onClick={() => setCurrentScreen('focus-setup')}
        >
          <Play className="h-6 w-6" />
          Iniciar Sessão de Foco
        </Button>
      </div>

      {/* Tasks Section */}
      <div className="px-6 pb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Minhas Tarefas</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1.5"
            onClick={() => setShowAddTask(true)}
          >
            <Plus className="h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>

        {/* Add Task Input */}
        {showAddTask && (
          <Card className="mb-3 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite o nome da tarefa..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Button size="sm" onClick={addTask}>
                Adicionar
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => { setShowAddTask(false); setNewTaskTitle('') }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Task List */}
        <div className="flex flex-col gap-2">
          {tasks.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-6 text-center">
              <Target className="mb-2 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Nenhuma tarefa ainda</p>
              <p className="text-xs text-muted-foreground/70">Adicione tarefas para organizar seus estudos</p>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card 
                key={task.id} 
                className={`flex items-center gap-3 p-3 transition-all ${task.completed ? 'bg-muted/50' : ''}`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    task.completed 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground/30 hover:border-primary'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
                </button>
                <span className={`flex-1 text-sm ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {task.title}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="text-muted-foreground/50 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="px-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Sessões Recentes</h3>
          <button 
            className="text-sm text-primary"
            onClick={() => setCurrentScreen('stats')}
          >
            Ver todas
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {mockSessions.slice(0, 3).map((session) => (
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-card p-4">
        <button className="flex flex-col items-center gap-1" onClick={() => setCurrentScreen('dashboard')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary">Início</span>
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
          <div className="flex h-10 w-10 items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Perfil</span>
        </button>
      </div>
    </div>
  )
}
