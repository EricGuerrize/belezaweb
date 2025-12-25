'use client'

import { useOnboardingStore } from '@/store/onboarding-store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const routineOptions = [
  'Cleanser',
  'Toner',
  'Serum',
  'Moisturizer',
  'Sunscreen',
  'Eye Cream',
  'Exfoliant',
  'Mask',
]

export default function Step3() {
  const { data, updateData } = useOnboardingStore()
  const currentRoutine = data.currentRoutine || []

  const toggleProduct = (product: string) => {
    const newRoutine = currentRoutine.includes(product)
      ? currentRoutine.filter((p) => p !== product)
      : [...currentRoutine, product]
    updateData({ currentRoutine: newRoutine })
  }

  return (
    <div>
      <h3 className="text-2xl font-heading mb-2">
        Qual é a sua rotina atual de skincare?
      </h3>
      <p className="text-gray-600 mb-6">
        Selecione os produtos que você já usa regularmente
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {routineOptions.map((product) => {
          const isSelected = currentRoutine.includes(product)
          return (
            <motion.div
              key={product}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isSelected ? 'default' : 'outline'}
                className="w-full h-auto py-4"
                onClick={() => toggleProduct(product)}
              >
                {product}
              </Button>
            </motion.div>
          )
        })}
      </div>
      {currentRoutine.length === 0 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Nenhum produto selecionado. Você pode pular esta etapa.
        </p>
      )}
    </div>
  )
}


