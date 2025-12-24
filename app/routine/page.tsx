'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockRoutine } from '@/lib/mock-data/recommendations'
import { motion } from 'framer-motion'
import { Clock, Sparkles } from 'lucide-react'

export default function RoutinePage() {
  const calculateTotalTime = (steps: typeof mockRoutine.morning) => {
    return steps.reduce((total, step) => total + (step.waitTime || 0), 0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    return mins > 0 ? `${mins} min` : `${seconds}s`
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Sua Rotina de Skincare Personalizada
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Baseado na análise da sua pele, criamos uma rotina personalizada para você
          </p>
        </motion.div>

        {/* Morning Routine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
              <span className="text-2xl">☀</span>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-semibold">Rotina Matinal</h2>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(calculateTotalTime(mockRoutine.morning))} total
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {mockRoutine.morning.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {step.order}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{step.productType}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {step.activeIngredients.map((ingredient, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-accent rounded text-xs font-medium"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{step.applicationTips}</p>
                        {step.waitTime && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Aguarde {formatTime(step.waitTime)} antes do próximo passo
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Evening Routine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-2xl">🌙</span>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-semibold">Rotina Noturna</h2>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(calculateTotalTime(mockRoutine.evening))} total
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {mockRoutine.evening.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="border-l-4 border-l-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                        {step.order}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{step.productType}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {step.activeIngredients.map((ingredient, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-accent rounded text-xs font-medium"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{step.applicationTips}</p>
                        {step.waitTime && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Aguarde {formatTime(step.waitTime)} antes do próximo passo
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Treatments */}
        {mockRoutine.weekly.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-semibold">Tratamentos Semanais</h2>
                <p className="text-sm text-gray-600">Use 1-2 vezes por semana</p>
              </div>
            </div>

            <div className="space-y-4">
              {mockRoutine.weekly.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="border-l-4 border-l-warning">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-warning text-white flex items-center justify-center font-bold">
                          {step.order}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{step.productType}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {step.activeIngredients.map((ingredient, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-accent rounded text-xs font-medium"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{step.applicationTips}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
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

