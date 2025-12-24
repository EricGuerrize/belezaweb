'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { mockAnalysis, mockAnalysisAfter } from '@/lib/mock-data/skin-analysis'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'
import BackButton from '@/components/navigation/BackButton'

export default function ComparePage() {
  const metrics = [
    { label: 'Hidratação', before: mockAnalysis.hydration, after: mockAnalysisAfter.hydration, color: 'bg-blue-500' },
    { label: 'Elasticidade', before: mockAnalysis.elasticity, after: mockAnalysisAfter.elasticity, color: 'bg-purple-500' },
    { label: 'Textura', before: mockAnalysis.texture, after: mockAnalysisAfter.texture, color: 'bg-teal-500' },
  ]

  const getImprovement = (before: number, after: number) => {
    const diff = after - before
    return {
      value: diff,
      percentage: ((diff / before) * 100).toFixed(0),
      isPositive: diff > 0,
    }
  }

  return (
    <div className="min-h-screen bg-background px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton href="/results" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Comparação Antes e Depois
          </h1>
          <p className="text-lg text-gray-600">
            Veja a evolução da sua pele com o plano personalizado
          </p>
        </motion.div>

        {/* Images Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Antes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-400" />
                      </div>
                      <p className="text-sm">Antes</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-600">
                          {metric.label}
                        </span>
                        <span className="text-lg font-bold text-gray-700">
                          {metric.before}%
                        </span>
                      </div>
                      <Progress value={metric.before} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  Depois
                  <TrendingUp className="w-5 h-5 text-success" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/40" />
                      </div>
                      <p className="text-sm">Depois</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {metrics.map((metric) => {
                    const improvement = getImprovement(metric.before, metric.after)
                    return (
                      <div key={metric.label}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-600">
                            {metric.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-success">
                              {metric.after}%
                            </span>
                            {improvement.isPositive && (
                              <span className="text-xs text-success font-semibold">
                                +{improvement.value}%
                              </span>
                            )}
                          </div>
                        </div>
                        <Progress value={metric.after} className="h-2 bg-success" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Improvement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-success/20 to-accent/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-center">
                Melhorias Alcançadas
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {metrics.map((metric) => {
                  const improvement = getImprovement(metric.before, metric.after)
                  return (
                    <div key={metric.label} className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold text-success">
                        +{improvement.value}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {improvement.percentage}% de melhoria
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Overall Score Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm text-gray-600 mb-2">Pontuação Geral</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-4xl font-bold text-gray-400 line-through">
                        {mockAnalysis.overallScore}
                      </p>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div>
                      <p className="text-5xl font-bold text-success">
                        {mockAnalysisAfter.overallScore}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Melhoria Total</p>
                  <p className="text-4xl font-bold text-success">
                    +{mockAnalysisAfter.overallScore - mockAnalysis.overallScore} pontos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/offer">
            <Button size="lg" className="text-lg px-8">
              Ver plano completo
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

