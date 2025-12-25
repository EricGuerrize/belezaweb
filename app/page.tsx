'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { resetApp } from '@/lib/reset-app'
import { ensureSession } from '@/lib/session'

export default function Home() {
  // Limpar cache quando voltar para home
  useEffect(() => {
    // Garante que há uma sessão ativa
    ensureSession()

    // Detecta se o usuário está voltando (navegação, não primeira visita)
    const hasVisited = sessionStorage.getItem('hasVisited')

    if (hasVisited === 'true') {
      // Limpa dados da sessão anterior
      resetApp()
    }

    // Marca que o usuário visitou
    sessionStorage.setItem('hasVisited', 'true')
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text mb-4 sm:mb-6">
              Beleza Viva
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-3 sm:mb-4 font-heading px-2">
              Obtenha a versão mais radiante da sua pele
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Descubra a idade real da sua pele e receba recomendações personalizadas de skincare com inteligência artificial
            </p>
            <Link href="/capture">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                Analisar minha pele grátis
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-12 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-2">
              89,345
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4">
              pessoas como você já analisaram sua pele
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 px-4"
          >
            Como funciona
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: '1. Faça upload da sua foto',
                description: 'Tire uma selfie ou faça upload de uma foto do seu rosto em boa iluminação',
                icon: 'camera',
              },
              {
                title: '2. Análise com IA',
                description: 'Nossa IA analisa hidratação, elasticidade, textura e muito mais',
                icon: 'brain',
              },
              {
                title: '3. Receba recomendações',
                description: 'Obtenha um plano personalizado de skincare baseado na sua análise',
                icon: 'sparkles',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      {feature.icon === 'camera' && <Camera className="w-6 h-6 text-primary" />}
                      {feature.icon === 'brain' && <div className="w-6 h-6 rounded-full bg-primary" />}
                      {feature.icon === 'sparkles' && <div className="w-6 h-6 rounded-full bg-primary/60" />}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
              Pronto para descobrir sua pele?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 px-4">
              Comece sua jornada para uma pele mais saudável e radiante
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                Começar agora
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-secondary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-lg font-heading mb-2">Beleza Viva</p>
          <p className="text-sm opacity-80">
            © 2024 Beleza Viva. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

