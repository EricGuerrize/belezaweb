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
  { concern: 'forehead', label: 'Testa', position: { top: '15%', left: '50%' } },
  { concern: 'temples', label: 'Têmporas', position: { top: '20%', left: '20%' } },
  { concern: 'eyes', label: 'Olhos', position: { top: '35%', left: '25%' } },
  { concern: 'cheeks', label: 'Bochechas', position: { top: '45%', left: '20%' } },
  { concern: 'lips', label: 'Lábios', position: { top: '60%', left: '50%' } },
  { concern: 'neck', label: 'Pescoço', position: { top: '70%', left: '25%' } },
  { concern: 'jawline', label: 'Mandíbula', position: { top: '55%', left: '75%' } },
  { concern: 'chin', label: 'Queixo', position: { top: '65%', left: '50%' } },
  { concern: 'décolleté', label: 'Décolleté', position: { top: '80%', left: '50%' } },
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
      <h3 className="text-base sm:text-lg md:text-xl font-heading mb-2">
        Quais áreas você gostaria de melhorar?
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
        Toque nas áreas do rosto que deseja melhorar
      </p>

      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-4 sm:mb-6">
        {/* Face Image Container */}
        <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-lg max-h-[60vh] sm:max-h-none">
          {/* Imagem genérica de pessoa */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-primary/20">
            <div className="w-full h-full flex items-center justify-center">
              {/* Placeholder de rosto genérico */}
              <svg
                className="w-full h-full"
                viewBox="0 0 200 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cabeça */}
                <ellipse cx="100" cy="100" rx="60" ry="70" fill="#E5E7EB" />
                {/* Cabelo */}
                <path
                  d="M40 80 Q40 40 60 30 Q80 20 100 25 Q120 20 140 30 Q160 40 160 80 L160 100 Q160 120 140 130 L60 130 Q40 120 40 100 Z"
                  fill="#9CA3AF"
                />
                {/* Olhos */}
                <circle cx="80" cy="90" r="8" fill="#4B5563" />
                <circle cx="120" cy="90" r="8" fill="#4B5563" />
                {/* Nariz */}
                <ellipse cx="100" cy="110" rx="4" ry="8" fill="#D1D5DB" />
                {/* Boca */}
                <path
                  d="M90 125 Q100 135 110 125"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Interactive Checkboxes */}
          {areas.map((area) => {
            const isSelected = data.concerns?.includes(area.concern) || false
            const isHovered = hoveredArea === area.concern

            return (
              <motion.div
                key={area.concern}
                className="absolute z-10"
                style={{
                  top: area.position.top,
                  left: area.position.left,
                  transform: 'translate(-50%, -50%)',
                }}
                onHoverStart={() => setHoveredArea(area.concern)}
                onHoverEnd={() => setHoveredArea(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => toggleConcern(area.concern)}
                  className={`
                    flex items-center gap-1 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-md sm:rounded-lg border-2 transition-all text-[10px] sm:text-xs
                    ${isSelected
                      ? 'bg-primary border-primary text-white shadow-md'
                      : 'bg-white/95 border-gray-300 text-gray-700 hover:border-primary backdrop-blur-sm'
                    }
                    ${isHovered ? 'shadow-lg' : ''}
                  `}
                  aria-label={`Selecionar ${area.label}`}
                >
                  <div
                    className={`
                      w-2.5 h-2.5 sm:w-3 sm:h-3 rounded border flex items-center justify-center flex-shrink-0
                      ${isSelected
                        ? 'border-white bg-white'
                        : 'border-gray-400 bg-white'
                      }
                    `}
                  >
                    {isSelected && (
                      <svg
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-primary"
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
                  <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap leading-tight">
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 sm:mt-4 p-3 sm:p-4 bg-accent/50 rounded-lg border border-primary/20"
        >
          <p className="text-xs sm:text-sm font-medium mb-2 text-gray-700">
            {data.concerns.length} {data.concerns.length === 1 ? 'área selecionada' : 'áreas selecionadas'}:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {data.concerns.map((concern) => {
              const area = areas.find((a) => a.concern === concern)
              return (
                <motion.span
                  key={concern}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary text-white rounded-full text-[10px] sm:text-xs font-medium"
                >
                  {area?.label || concern}
                </motion.span>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

