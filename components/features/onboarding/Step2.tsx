'use client'

import { useOnboardingStore } from '@/store/onboarding-store'
import { SkinConcern } from '@/lib/mock-data/onboarding'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface AreaPosition {
  concern: SkinConcern
  label: string
  position: { top: string; left: string }
}

const areas: AreaPosition[] = [
  { concern: 'forehead', label: 'Forehead', position: { top: '15%', left: '50%' } },
  { concern: 'temples', label: 'Temples', position: { top: '20%', left: '20%' } },
  { concern: 'eyes', label: 'Eyes', position: { top: '35%', left: '25%' } },
  { concern: 'cheeks', label: 'Cheeks', position: { top: '45%', left: '20%' } },
  { concern: 'lips', label: 'Lips', position: { top: '60%', left: '50%' } },
  { concern: 'neck', label: 'Neck', position: { top: '70%', left: '25%' } },
  { concern: 'jawline', label: 'Jawline', position: { top: '55%', left: '75%' } },
  { concern: 'chin', label: 'Chin', position: { top: '65%', left: '50%' } },
  { concern: 'décolleté', label: 'Décolleté (neckline)', position: { top: '80%', left: '50%' } },
]

export default function Step2() {
  const { data, updateData } = useOnboardingStore()
  const [hoveredArea, setHoveredArea] = useState<SkinConcern | null>(null)

  const toggleConcern = (concern: SkinConcern) => {
    const currentConcerns = data.concerns || []
    if (currentConcerns.includes(concern)) {
      updateData({
        concerns: currentConcerns.filter((c) => c !== concern),
      })
    } else {
      updateData({
        concerns: [...currentConcerns, concern],
      })
    }
  }

  return (
    <div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-heading mb-2">
        Quais áreas você gostaria de melhorar?
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        Se não tiver certeza, pode pressionar Continuar
      </p>
      
      <div className="relative max-w-2xl mx-auto mb-4 sm:mb-6">
        {/* Face Image Container */}
        <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
          {/* Placeholder for face image - in production, use actual image */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-primary/20">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-2 rounded-full bg-gray-300 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400" />
                    </div>
                    <p className="text-xs md:text-sm">Imagem do Rosto</p>
                  </div>
          </div>

          {/* Interactive Checkboxes */}
          {areas.map((area) => {
            const isSelected = data.concerns?.includes(area.concern) || false
            const isHovered = hoveredArea === area.concern

            return (
              <motion.div
                key={area.concern}
                className="absolute"
                style={{
                  top: area.position.top,
                  left: area.position.left,
                  transform: 'translate(-50%, -50%)',
                }}
                onHoverStart={() => setHoveredArea(area.concern)}
                onHoverEnd={() => setHoveredArea(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => toggleConcern(area.concern)}
                  className={`
                    flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg border-2 transition-all
                    ${isSelected
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-primary'
                    }
                    ${isHovered ? 'shadow-lg' : ''}
                  `}
                >
                  <div
                    className={`
                      w-3 h-3 md:w-4 md:h-4 rounded border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected
                        ? 'border-white bg-white'
                        : 'border-gray-400 bg-white'
                      }
                    `}
                  >
                    {isSelected && (
                      <svg
                        className="w-2 h-2 md:w-3 md:h-3 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                    {area.label}
                  </span>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Selected Areas Summary */}
      {data.concerns && data.concerns.length > 0 && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-accent rounded-lg">
          <p className="text-xs sm:text-sm font-medium mb-2">Áreas selecionadas:</p>
          <div className="flex flex-wrap gap-2">
            {data.concerns.map((concern) => {
              const area = areas.find((a) => a.concern === concern)
              return (
                <span
                  key={concern}
                  className="px-2 sm:px-3 py-1 bg-primary text-white rounded-full text-xs sm:text-sm"
                >
                  {area?.label || concern}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

