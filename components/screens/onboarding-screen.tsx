'use client'

import { useState } from 'react'
import { Brain, Target, Trophy, Shield, ArrowRight, ArrowLeft, MessageCircleHeart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'

const slides = [
  {
    icon: Brain,
    title: 'Foco Guiado',
    description: 'Técnicas comprovadas como Pomodoro e Deep Work para maximizar sua concentração durante os estudos.',
    color: 'bg-primary',
  },
  {
    icon: Trophy,
    title: 'Recompensas',
    description: 'Ganhe XP, suba de nível e desbloqueie conquistas enquanto estuda. Transforme foco em diversão.',
    color: 'bg-accent',
  },
  {
    icon: Shield,
    title: 'Bloqueio Inteligente',
    description: 'Controle de interrupções que bloqueia apps e notificações durante suas sessões de foco.',
    color: 'bg-chart-3',
  },
  {
    icon: MessageCircleHeart,
    title: 'Mensagens de Incentivo',
    description: 'Receba frases motivacionais de grandes pensadores e versículos bíblicos para inspirar sua jornada de estudos.',
    color: 'bg-chart-5',
  },
  {
    icon: Target,
    title: 'Metas e Progresso',
    description: 'Acompanhe suas estatísticas, mantenha sequências e alcance seus objetivos de estudo.',
    color: 'bg-chart-4',
  },
]

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { setCurrentScreen } = useApp()

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentScreen('login')
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleSkip = () => {
    setCurrentScreen('login')
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handlePrev}
          className={currentSlide === 0 ? 'invisible' : ''}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>
        <Button variant="ghost" size="sm" onClick={handleSkip}>
          Pular
        </Button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className={`mb-12 flex h-32 w-32 items-center justify-center rounded-[2.5rem] ${slide.color} transition-all duration-500`}>
          <Icon className="h-16 w-16 text-primary-foreground" />
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {slide.title}
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            {slide.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 p-8">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <Button 
          size="lg" 
          className="w-full max-w-sm gap-2"
          onClick={handleNext}
        >
          {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
