'use client'

import { useState, useEffect } from 'react'
import { Trophy, Zap, BarChart3, User, Lock, Rocket, Timer, Flame, Brain, Moon, Crown, Star, Quote, RefreshCw, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'
import { mockAchievements } from '@/lib/mock-data'

const iconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  timer: Timer,
  flame: Flame,
  brain: Brain,
  moon: Moon,
  crown: Crown,
  star: Star,
}

interface InspirationQuote {
  text: string
  author: string
  type: 'philosopher' | 'biblical'
  reference?: string
}

const inspirationQuotes: InspirationQuote[] = [
  // Pensadores Famosos
  {
    text: "O segredo de progredir é começar.",
    author: "Mark Twain",
    type: "philosopher"
  },
  {
    text: "A disciplina é a ponte entre metas e conquistas.",
    author: "Jim Rohn",
    type: "philosopher"
  },
  {
    text: "O único modo de fazer um excelente trabalho é amar o que você faz.",
    author: "Steve Jobs",
    type: "philosopher"
  },
  {
    text: "A persistência é o caminho do êxito.",
    author: "Charles Chaplin",
    type: "philosopher"
  },
  {
    text: "Conhecimento não é aquilo que você sabe, mas o que você faz com aquilo que você sabe.",
    author: "Aldous Huxley",
    type: "philosopher"
  },
  {
    text: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
    author: "Nelson Mandela",
    type: "philosopher"
  },
  {
    text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    author: "Robert Collier",
    type: "philosopher"
  },
  {
    text: "Não é a força, mas a constância dos bons resultados que conduz os homens à felicidade.",
    author: "Friedrich Nietzsche",
    type: "philosopher"
  },
  {
    text: "A mente que se abre a uma nova ideia jamais volta ao seu tamanho original.",
    author: "Albert Einstein",
    type: "philosopher"
  },
  {
    text: "O homem é aquilo que ele faz com o que fizeram dele.",
    author: "Jean-Paul Sartre",
    type: "philosopher"
  },
  // Frases Bíblicas
  {
    text: "Tudo posso naquele que me fortalece.",
    author: "Filipenses 4:13",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "Porque sou eu que conheço os planos que tenho para vocês, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
    author: "Jeremias 29:11",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "Não te mandei eu? Sê forte e corajoso; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que andares.",
    author: "Josué 1:9",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    author: "Isaías 40:31",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
    author: "Salmos 37:5",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.",
    author: "Josué 1:9",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "O coração do homem pode fazer planos, mas a resposta certa dos lábios vem do Senhor.",
    author: "Provérbios 16:1",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.",
    author: "Provérbios 3:5",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "Peçam, e lhes será dado; busquem, e encontrarão; batam, e a porta lhes será aberta.",
    author: "Mateus 7:7",
    type: "biblical",
    reference: "Bíblia Sagrada"
  },
  {
    text: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.",
    author: "Romanos 8:28",
    type: "biblical",
    reference: "Bíblia Sagrada"
  }
]

function InspirationalQuoteCard() {
  const [currentQuote, setCurrentQuote] = useState<InspirationQuote>(inspirationQuotes[0])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * inspirationQuotes.length)
    setCurrentQuote(inspirationQuotes[randomIndex])
  }, [])

  const getNewQuote = () => {
    setIsAnimating(true)
    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * inspirationQuotes.length)
      while (inspirationQuotes[randomIndex].text === currentQuote.text) {
        randomIndex = Math.floor(Math.random() * inspirationQuotes.length)
      }
      setCurrentQuote(inspirationQuotes[randomIndex])
      setIsAnimating(false)
    }, 300)
  }

  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-5">
      <div className="absolute -right-4 -top-4 opacity-10">
        {currentQuote.type === 'biblical' ? (
          <BookOpen className="h-24 w-24 text-primary" />
        ) : (
          <Quote className="h-24 w-24 text-primary" />
        )}
      </div>
      
      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <div className={`flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ${
            currentQuote.type === 'biblical' 
              ? 'bg-accent/20 text-accent-foreground' 
              : 'bg-primary/20 text-primary'
          }`}>
            {currentQuote.type === 'biblical' ? (
              <>
                <BookOpen className="h-3 w-3" />
                Sabedoria Bíblica
              </>
            ) : (
              <>
                <Quote className="h-3 w-3" />
                Pensador
              </>
            )}
          </div>
        </div>
        
        <p className={`mb-3 text-base font-medium leading-relaxed text-foreground transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {`"${currentQuote.text}"`}
        </p>
        
        <div className={`flex items-center justify-between transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div>
            <p className="text-sm font-semibold text-primary">
              {currentQuote.author}
            </p>
            {currentQuote.reference && (
              <p className="text-xs text-muted-foreground">{currentQuote.reference}</p>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={getNewQuote}
            className="h-8 w-8 rounded-full p-0 hover:bg-primary/10"
          >
            <RefreshCw className={`h-4 w-4 text-primary ${isAnimating ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function AchievementsScreen() {
  const { setCurrentScreen, user } = useApp()

  const unlockedAchievements = mockAchievements.filter(a => a.unlockedAt)
  const lockedAchievements = mockAchievements.filter(a => !a.unlockedAt)

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="p-6 pb-3">
        <h1 className="text-2xl font-bold text-foreground">Conquistas</h1>
        <p className="text-muted-foreground">
          {unlockedAchievements.length} de {mockAchievements.length} desbloqueadas
        </p>
      </div>

      {/* Inspirational Quote */}
      <div className="px-6 pb-4">
        <InspirationalQuoteCard />
      </div>

      {/* Stats Summary */}
      <div className="px-6 pb-6">
        <Card className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
              <Trophy className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de XP</p>
              <p className="text-xl font-bold text-foreground">
                {user?.xp.toLocaleString() || 0}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Nível</p>
            <p className="text-xl font-bold text-primary">{user?.level || 1}</p>
          </div>
        </Card>
      </div>

      {/* Unlocked Achievements */}
      <div className="px-6 pb-6">
        <h2 className="mb-4 font-semibold text-foreground">Desbloqueadas</h2>
        <div className="grid grid-cols-1 gap-3">
          {unlockedAchievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Star
            return (
              <Card key={achievement.id} className="flex items-center gap-4 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.unlockedAt && (
                    <p className="mt-1 text-xs text-primary">
                      Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Locked / In Progress Achievements */}
      <div className="px-6 pb-6">
        <h2 className="mb-4 font-semibold text-foreground">Em Progresso</h2>
        <div className="grid grid-cols-1 gap-3">
          {lockedAchievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Star
            const progress = achievement.progress && achievement.maxProgress 
              ? (achievement.progress / achievement.maxProgress) * 100 
              : 0
            return (
              <Card key={achievement.id} className="flex items-center gap-4 p-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                  <Icon className="h-7 w-7 text-muted-foreground" />
                  {progress === 0 && (
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="text-primary">{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary">Conquistas</span>
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
