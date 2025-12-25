'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { mockAnalysis } from '@/lib/mock-data/skin-analysis'
import { useEffect, useState } from 'react'
import { useImageStore } from '@/store/image-store'
import { motion } from 'framer-motion'
import { Target, TrendingUp } from 'lucide-react'
import BackButton from '@/components/navigation/BackButton'
import BeforeAfterSlider from '@/components/features/BeforeAfterSlider'

export default function ResultsPage() {
  const router = useRouter()
  const { capturedImage } = useImageStore()
  const [analysis, setAnalysis] = useState(mockAnalysis)

  useEffect(() => {
    // Carregar análise do localStorage se existir
    const savedAnalysis = localStorage.getItem('analysisResult')
    if (savedAnalysis) {
      try {
        setAnalysis(JSON.parse(savedAnalysis))
      } catch (e) {
        console.error('Erro ao carregar análise:', e)
      }
    }
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-danger'
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success'
    if (score >= 60) return 'bg-warning'
    return 'bg-danger'
  }

  const metrics = [
    {
      label: 'Hidratação',
      value: analysis.hydration,
      color: 'bg-blue-500',
    },
    {
      label: 'Elasticidade',
      value: analysis.elasticity,
      color: 'bg-purple-500',
    },
    {
      label: 'Textura',
      value: analysis.texture,
      color: 'bg-teal-500',
    },
  ]

  return (
    <div className="min-h-screen bg-background px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton href="/capture" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3 sm:mb-4">
            Visão Geral da Análise
          </h1>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 md:gap-6 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">Seu objetivo:</span>
              <span className="font-semibold text-sm sm:text-base">Fazer minha face brilhar</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">Plano adequado para você:</span>
              <span className="font-semibold text-sm sm:text-base text-primary">100%</span>
            </div>
          </div>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Pontuação Geral da Pele</p>
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${getScoreColor(analysis.overallScore)}`}
                  >
                    {analysis.overallScore}
                  </motion.div>
                  <span className="text-2xl sm:text-3xl text-gray-400">/100</span>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 px-2">
                  Sua pele tem aproximadamente <span className="font-semibold">{analysis.skinAge} anos</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Before/After Slider - Como está vs Como ficará */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl sm:text-2xl">
                Veja como sua pele ficará
              </CardTitle>
              <p className="text-center text-sm sm:text-base text-gray-600 mt-2">
                Arraste a barra para os lados e veja a transformação
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {capturedImage ? (
                <BeforeAfterSlider
                  beforeImage={capturedImage}
                  afterImage={capturedImage}
                  beforeLabel="Como está"
                  afterLabel="Como ficará"
                />
              ) : (
                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Faça upload de uma foto para ver a comparação</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          {metric.label}
                        </span>
                        <span className={`text-2xl font-bold ${getScoreColor(metric.value)}`}>
                          {metric.value}%
                        </span>
                      </div>
                      <Progress
                        value={metric.value}
                        className={`h-3 ${getProgressColor(metric.value)}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insight Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <Card className="bg-accent/50">
            <CardContent className="p-3 sm:p-4 md:pt-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Seu relatório de <span className="font-semibold text-primary">Hidratação da Pele</span> indica que sua pele poderia se beneficiar de uma hidratação mais profunda para restaurar seu brilho saudável.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col gap-3 sm:gap-4"
        >
          <Link href="/routine" className="w-full">
            <Button size="lg" className="w-full text-base sm:text-lg">
              Ver minha rotina personalizada
            </Button>
          </Link>
          <Link href="/compare" className="w-full">
            <Button variant="outline" size="lg" className="w-full text-base sm:text-lg">
              Comparar resultados
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

