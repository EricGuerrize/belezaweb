'use client'

import { useOnboardingStore } from '@/store/onboarding-store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const goals = [
  { value: 'anti_aging', label: 'Anti-aging', icon: '✨' },
  { value: 'hydration', label: 'Hidratação', icon: '💧' },
  { value: 'acne', label: 'Controle de acne', icon: '🎯' },
  { value: 'brightening', label: 'Clareamento', icon: '🌟' },
  { value: 'even_tone', label: 'Uniformizar tom', icon: '🌈' },
  { value: 'glow', label: 'Make my face glow', icon: '✨' },
]

export default function Step4() {
  const { data, updateData } = useOnboardingStore()

  return (
    <div>
      <h3 className="text-2xl font-heading mb-2">
        Qual é o seu objetivo principal?
      </h3>
      <p className="text-gray-600 mb-6">
        Selecione o que mais importa para você no momento
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const isSelected = data.mainGoal === goal.value
          return (
            <motion.div
              key={goal.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isSelected ? 'default' : 'outline'}
                className="w-full h-auto py-6 flex flex-col gap-2"
                onClick={() => updateData({ mainGoal: goal.value })}
              >
                <span className="text-3xl">{goal.icon}</span>
                <span>{goal.label}</span>
              </Button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

