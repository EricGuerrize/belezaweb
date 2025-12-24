'use client'

import { useOnboardingStore } from '@/store/onboarding-store'
import { SkinType } from '@/lib/mock-data/onboarding'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const skinTypes: { value: SkinType; label: string; description: string }[] = [
  {
    value: 'dry',
    label: 'Seca',
    description: 'Pele que sente repuxar, pode descamar e tem pouca oleosidade',
  },
  {
    value: 'normal',
    label: 'Normal',
    description: 'Pele equilibrada, sem excesso de oleosidade ou ressecamento',
  },
  {
    value: 'combination',
    label: 'Mista',
    description: 'Zona T oleosa e bochechas secas ou normais',
  },
  {
    value: 'oily',
    label: 'Oleosa',
    description: 'Pele com brilho excessivo, poros visíveis e tendência a acne',
  },
  {
    value: 'sensitive',
    label: 'Sensível',
    description: 'Pele que reage facilmente a produtos, pode ficar vermelha ou irritada',
  },
]

export default function Step1() {
  const { data, updateData } = useOnboardingStore()

  return (
    <div>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        Qual é o seu tipo de pele? Se não tiver certeza, pode pular esta pergunta.
      </p>
      <div className="grid gap-3 sm:gap-4">
        {skinTypes.map((type) => (
          <motion.div
            key={type.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={data.skinType === type.value ? 'default' : 'outline'}
              className="w-full justify-start h-auto py-3 sm:py-4 px-4 sm:px-6 text-left"
              onClick={() => updateData({ skinType: type.value })}
            >
              <div>
                <div className="font-semibold mb-1 text-sm sm:text-base">{type.label}</div>
                <div className="text-xs sm:text-sm opacity-80">{type.description}</div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

