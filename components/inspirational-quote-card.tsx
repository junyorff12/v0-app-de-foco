'use client'

import { useState, useEffect } from 'react'
import { Quote, RefreshCw, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface InspirationQuote {
  text: string
  author: string
  type: 'philosopher' | 'entrepreneur'
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
  {
    text: "Saber não é suficiente; precisamos aplicar. Querer não é suficiente; precisamos fazer.",
    author: "Johann Goethe",
    type: "philosopher"
  },
  // Empreendedores
  {
    text: "O único modo de fazer um excelente trabalho é amar o que você faz.",
    author: "Steve Jobs",
    type: "entrepreneur"
  },
  {
    text: "O sucesso não é o final, o fracasso não é fatal: é a coragem de continuar que conta.",
    author: "Winston Churchill",
    type: "entrepreneur"
  },
  {
    text: "Não tenha medo de desistir do bom para perseguir o ótimo.",
    author: "John D. Rockefeller",
    type: "entrepreneur"
  },
  {
    text: "A única maneira de fazer um trabalho excelente é amar o que você faz.",
    author: "Steve Jobs",
    type: "entrepreneur"
  },
  {
    text: "Se você não está disposto a arriscar o usual, terá que se contentar com o ordinário.",
    author: "Jim Rohn",
    type: "entrepreneur"
  },
  {
    text: "O fracasso é simplesmente a oportunidade de começar de novo, desta vez de forma mais inteligente.",
    author: "Henry Ford",
    type: "entrepreneur"
  },
  {
    text: "Seu tempo é limitado, não o desperdice vivendo a vida de outra pessoa.",
    author: "Steve Jobs",
    type: "entrepreneur"
  },
  {
    text: "A inovação distingue um líder de um seguidor.",
    author: "Steve Jobs",
    type: "entrepreneur"
  },
  {
    text: "Trabalhe como se você não precisasse do dinheiro. Ame como se você nunca tivesse sido magoado.",
    author: "Mark Twain",
    type: "entrepreneur"
  },
  {
    text: "Não espere. O tempo nunca será perfeito.",
    author: "Napoleon Hill",
    type: "entrepreneur"
  },
  {
    text: "O pessimista vê dificuldade em cada oportunidade. O otimista vê oportunidade em cada dificuldade.",
    author: "Winston Churchill",
    type: "entrepreneur"
  },
  {
    text: "A melhor maneira de prever o futuro é criá-lo.",
    author: "Peter Drucker",
    type: "entrepreneur"
  },
  {
    text: "Você não constrói um negócio. Você constrói pessoas, e então pessoas constroem o negócio.",
    author: "Zig Ziglar",
    type: "entrepreneur"
  },
  {
    text: "Se você pode sonhar, você pode fazer.",
    author: "Walt Disney",
    type: "entrepreneur"
  },
  {
    text: "O segredo do sucesso é fazer o que outros não querem fazer.",
    author: "Mark Cuban",
    type: "entrepreneur"
  },
  {
    text: "Não importa quantas vezes você falhe. Você só precisa estar certo uma vez.",
    author: "Mark Cuban",
    type: "entrepreneur"
  },
  {
    text: "As oportunidades não acontecem. Você as cria.",
    author: "Chris Grosser",
    type: "entrepreneur"
  },
  {
    text: "O risco vem de não saber o que você está fazendo.",
    author: "Warren Buffett",
    type: "entrepreneur"
  },
  {
    text: "Grandes coisas nos negócios nunca são feitas por uma pessoa. São feitas por uma equipe.",
    author: "Steve Jobs",
    type: "entrepreneur"
  },
  {
    text: "Não se preocupe com o fracasso; você só precisa estar certo uma vez.",
    author: "Drew Houston",
    type: "entrepreneur"
  }
]

interface InspirationalQuoteCardProps {
  compact?: boolean
}

export function InspirationalQuoteCard({ compact = false }: InspirationalQuoteCardProps) {
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
    <Card className={`relative overflow-hidden border-none bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 ${compact ? 'p-4' : 'p-5'}`}>
      <div className="absolute -right-4 -top-4 opacity-10">
        {currentQuote.type === 'entrepreneur' ? (
          <Lightbulb className={`${compact ? 'h-16 w-16' : 'h-24 w-24'} text-primary`} />
        ) : (
          <Quote className={`${compact ? 'h-16 w-16' : 'h-24 w-24'} text-primary`} />
        )}
      </div>
      
      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <div className={`flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ${
            currentQuote.type === 'entrepreneur' 
              ? 'bg-accent/20 text-accent-foreground' 
              : 'bg-primary/20 text-primary'
          }`}>
            {currentQuote.type === 'entrepreneur' ? (
              <>
                <Lightbulb className="h-3 w-3" />
                Empreendedor
              </>
            ) : (
              <>
                <Quote className="h-3 w-3" />
                Pensador
              </>
            )}
          </div>
        </div>
        
        <p className={`mb-3 font-medium leading-relaxed text-foreground transition-opacity duration-300 ${compact ? 'text-sm' : 'text-base'} ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {`"${currentQuote.text}"`}
        </p>
        
        <div className={`flex items-center justify-between transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div>
            <p className={`font-semibold text-primary ${compact ? 'text-xs' : 'text-sm'}`}>
              {currentQuote.author}
            </p>
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
