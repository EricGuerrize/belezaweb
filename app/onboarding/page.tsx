'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useOnboardingStore } from '@/store/onboarding-store'
import { SkinType, SkinConcern } from '@/lib/mock-data/onboarding'
import { motion, AnimatePresence } from 'framer-motion'
import Step1 from '@/components/features/onboarding/Step1'
import Step2 from '@/components/features/onboarding/Step2'
import Step3 from '@/components/features/onboarding/Step3'
import Step4 from '@/components/features/onboarding/Step4'
import Step5 from '@/components/features/onboarding/Step5'
import BackButton from '@/components/navigation/BackButton'

export default function OnboardingPage() {
  const router = useRouter()
  const { currentStep, nextStep, previousStep, data } = useOnboardingStore()

  const steps = [
    { component: Step1, title: 'Tipo de Pele' },
    { component: Step2, title: 'Áreas de Preocupação' },
    { component: Step3, title: 'Rotina Atual' },
    { component: Step4, title: 'Objetivos' },
    { component: Step5, title: 'Resumo' },
  ]

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      nextStep()
    } else {
      // Se já tem foto, vai direto para análise
      // Se não tem, volta para captura
      router.push('/analyzing')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      previousStep()
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-background px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton href={currentStep === 0 ? '/' : undefined} />
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Passo {currentStep + 1} de {steps.length}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-4 sm:mb-6 md:mb-8">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-heading">
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex-1 sm:flex-none"
          >
            Voltar
          </Button>
          <Button onClick={handleNext} className="flex-1 sm:flex-none">
            {currentStep === steps.length - 1 ? 'Continuar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  )
}

