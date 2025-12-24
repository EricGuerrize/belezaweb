'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const analyzingSteps = [
  'Detectando rosto na imagem...',
  'Analisando hidratação...',
  'Verificando elasticidade...',
  'Avaliando textura da pele...',
  'Identificando áreas de atenção...',
  'Gerando recomendações personalizadas...',
]

export default function AnalyzingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalSteps = analyzingSteps.length
    const stepDuration = 1000 // 1 segundo por step
    const progressInterval = 50 // atualizar progresso a cada 50ms

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1
        }
        return prev
      })
    }, stepDuration)

    const progressIntervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressIntervalId)
          clearInterval(stepInterval)
          setTimeout(() => {
            router.push('/results')
          }, 500)
          return 100
        }
        return prev + (100 / (totalSteps * (stepDuration / progressInterval)))
      })
    }, progressInterval)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressIntervalId)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12 p-4 sm:p-6">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Animated Face Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </motion.div>

            {/* Current Step Text */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[50px] sm:min-h-[60px]"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-semibold mb-3 sm:mb-4 px-2">
                {analyzingSteps[currentStep]}
              </h2>
            </motion.div>

            {/* Progress Bar */}
            <div className="space-y-2 px-4">
              <Progress value={progress} className="h-2 sm:h-3" />
              <p className="text-xs sm:text-sm text-gray-600">{Math.round(progress)}%</p>
            </div>

            {/* Privacy Note */}
            <div className="pt-4 sm:pt-6 md:pt-8 px-4">
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Sua privacidade é nossa prioridade. Você permanece anônimo, ninguém verá
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>sua face quando você escanear.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

