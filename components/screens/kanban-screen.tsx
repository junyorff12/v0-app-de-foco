'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, X, GripVertical, CheckCircle2, Circle, XCircle, Clock, MoreHorizontal, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApp } from '@/lib/app-context'

type TaskStatus = 'todo' | 'done' | 'cancelled'

interface KanbanTask {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

const priorityColors = {
  low: 'bg-chart-3/20 text-chart-3',
  medium: 'bg-accent/20 text-accent-foreground',
  high: 'bg-destructive/20 text-destructive',
}

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

export function KanbanScreen() {
  const { setCurrentScreen } = useApp()
  const [tasks, setTasks] = useState<KanbanTask[]>([
    { id: '1', title: 'Revisar capítulo de Matemática', description: 'Capítulos 5 e 6 do livro', status: 'todo', priority: 'high', createdAt: new Date() },
    { id: '2', title: 'Fazer exercícios de Física', description: 'Lista de 20 exercícios', status: 'todo', priority: 'medium', createdAt: new Date() },
    { id: '3', title: 'Estudar vocabulário de Inglês', status: 'todo', priority: 'low', createdAt: new Date() },
    { id: '4', title: 'Assistir aula de História', description: 'Módulo sobre Revolução Industrial', status: 'done', priority: 'high', createdAt: new Date() },
    { id: '5', title: 'Fazer resumo de Biologia', status: 'done', priority: 'medium', createdAt: new Date() },
    { id: '6', title: 'Prova simulada antiga', description: 'Não será mais necessária', status: 'cancelled', priority: 'low', createdAt: new Date() },
  ])
  
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const todoTasks = tasks.filter(t => t.status === 'todo')
  const doneTasks = tasks.filter(t => t.status === 'done')
  const cancelledTasks = tasks.filter(t => t.status === 'cancelled')

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTaskTitle.trim(),
          description: newTaskDescription.trim() || undefined,
          status: 'todo',
          priority: newTaskPriority,
          createdAt: new Date(),
        }
      ])
      setNewTaskTitle('')
      setNewTaskDescription('')
      setNewTaskPriority('medium')
      setShowAddTask(false)
    }
  }

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: TaskStatus) => {
    if (draggedTask) {
      moveTask(draggedTask, status)
      setDraggedTask(null)
    }
  }

  const TaskCard = ({ task }: { task: KanbanTask }) => (
    <Card
      draggable
      onDragStart={() => handleDragStart(task.id)}
      className={`group cursor-grab p-3 transition-all hover:shadow-md active:cursor-grabbing ${
        task.status === 'done' ? 'bg-success/5 border-success/20' : 
        task.status === 'cancelled' ? 'bg-muted/50 opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
          <p className={`text-sm font-medium ${task.status === 'cancelled' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
          )}
        </div>
        <button
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
      
      {/* Quick Actions */}
      {task.status === 'todo' && (
        <div className="mt-3 flex gap-2 border-t border-border pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 flex-1 gap-1 text-xs text-success hover:bg-success/10 hover:text-success"
            onClick={() => moveTask(task.id, 'done')}
          >
            <CheckCircle2 className="h-3 w-3" />
            Concluir
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 flex-1 gap-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => moveTask(task.id, 'cancelled')}
          >
            <XCircle className="h-3 w-3" />
            Cancelar
          </Button>
        </div>
      )}
      
      {task.status !== 'todo' && (
        <div className="mt-3 border-t border-border pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-full gap-1 text-xs"
            onClick={() => moveTask(task.id, 'todo')}
          >
            <Circle className="h-3 w-3" />
            Mover para A Fazer
          </Button>
        </div>
      )}
    </Card>
  )

  const Column = ({ 
    title, 
    icon: Icon, 
    tasks, 
    status, 
    color 
  }: { 
    title: string
    icon: React.ElementType
    tasks: KanbanTask[]
    status: TaskStatus
    color: string
  }) => (
    <div 
      className="flex min-w-[280px] flex-1 flex-col"
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(status)}
    >
      <div className={`mb-3 flex items-center gap-2 rounded-lg ${color} p-3`}>
        <Icon className="h-5 w-5" />
        <h3 className="font-semibold">{title}</h3>
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-background/50 text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center">
            <Icon className="mb-2 h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">Nenhuma tarefa</p>
          </div>
        ) : (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border p-4">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setCurrentScreen('dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">Quadro de Tarefas</h1>
          <p className="text-sm text-muted-foreground">
            Organize suas tarefas de estudo
          </p>
        </div>
        <Button onClick={() => setShowAddTask(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Nova Tarefa</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddTask(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Título</label>
                <input
                  type="text"
                  placeholder="Ex: Revisar capítulo de Matemática"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Descrição (opcional)</label>
                <textarea
                  placeholder="Detalhes adicionais..."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Prioridade</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setNewTaskPriority(priority)}
                      className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                        newTaskPriority === priority
                          ? priority === 'high' 
                            ? 'border-destructive bg-destructive/10 text-destructive'
                            : priority === 'medium'
                            ? 'border-accent bg-accent/10 text-accent-foreground'
                            : 'border-chart-3 bg-chart-3/10 text-chart-3'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {priorityLabels[priority]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddTask(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1"
                  onClick={addTask}
                  disabled={!newTaskTitle.trim()}
                >
                  Adicionar Tarefa
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 min-w-max">
          <Column 
            title="A Fazer" 
            icon={Clock} 
            tasks={todoTasks} 
            status="todo"
            color="bg-accent/20 text-accent-foreground"
          />
          <Column 
            title="Concluídas" 
            icon={CheckCircle2} 
            tasks={doneTasks} 
            status="done"
            color="bg-success/20 text-success"
          />
          <Column 
            title="Canceladas" 
            icon={XCircle} 
            tasks={cancelledTasks} 
            status="cancelled"
            color="bg-muted text-muted-foreground"
          />
        </div>
      </div>

      {/* Stats Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">A Fazer:</span>
            <span className="font-semibold">{todoTasks.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Concluídas:</span>
            <span className="font-semibold">{doneTasks.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted-foreground" />
            <span className="text-muted-foreground">Canceladas:</span>
            <span className="font-semibold">{cancelledTasks.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
