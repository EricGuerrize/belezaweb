'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockAnalysis } from '@/lib/mock-data/skin-analysis'
import { motion } from 'framer-motion'
import { Check, Sparkles, Target, TrendingUp, Shield } from 'lucide-react'
import BackButton from '@/components/navigation/BackButton'

export default function OfferPage() {
  const benefits = [
    'Baseado na análise da sua pele',
    'Personalizado para melhorias significativas',
    'Desenvolvido para resultados duradouros',
    'Acompanhamento e ajustes contínuos',
  ]

  return (
    <div className="min-h-screen bg-background px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton href="/routine" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Plano Beleza Viva com 100% de adequação
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vamos conseguir a pele dos sonhos. Mostraremos como construir uma rotina eficaz, ajudaremos a escolher os produtos certos e te acompanharemos nesta jornada.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Analysis Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Face Image with Analysis */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-primary/20">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-400" />
                      </div>
                      <p className="text-sm">Análise Facial</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Hydration</span>
                      <span className="text-lg font-bold text-blue-600">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Elasticity</span>
                      <span className="text-lg font-bold text-purple-600">39%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '39%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Texture</span>
                      <span className="text-lg font-bold text-teal-600">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Details */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Objetivo principal</p>
                    <p className="font-semibold">Fazer minha face brilhar</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Preocupações</p>
                    <p className="font-semibold">Tom de pele</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tipo de Pele</p>
                    <p className="font-semibold capitalize">{mockAnalysis.skinType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Produtos</p>
                    <p className="font-semibold">Creme para olhos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Plan Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
              <CardHeader>
                <CardTitle className="text-3xl font-heading mb-2">
                  Vamos conseguir a pele dos sonhos
                </CardTitle>
                <div className="flex items-center gap-2 text-primary mb-4">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Melhor abordagem</span>
                </div>
                <div className="text-2xl font-heading text-primary mb-4">
                  Plano Beleza Viva
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[9/16] bg-white rounded-lg overflow-hidden shadow-lg mb-4">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-primary/10">
                    <div className="text-center text-gray-500">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded bg-primary/40" />
                      </div>
                      <p className="text-xs">Preview da Rotina</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Plan Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-accent/50 to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">
                Seu plano personalizado é
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center space-y-6"
        >
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">
              Pronto para transformar sua pele?
            </h2>
            <p className="text-gray-600 mb-6">
              Comece sua jornada para uma pele mais saudável e radiante hoje mesmo
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-12 py-6 w-full sm:w-auto">
              O QUE VEM A SEGUIR
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-success" />
            <span>Garantia de satisfação ou seu dinheiro de volta</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

