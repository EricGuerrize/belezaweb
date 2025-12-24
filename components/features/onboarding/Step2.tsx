'use client'

import { useOnboardingStore } from '@/store/onboarding-store'
import { useImageStore } from '@/store/image-store'
import { SkinConcern } from '@/lib/mock-data/onboarding'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

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
  const { capturedImage } = useImageStore()
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

      <div className="relative w-full max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6">
        {/* Face Image Container */}
        <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          {capturedImage ? (
            <>
              {/* User's captured photo */}
              <img
                src={capturedImage}
                alt="Sua foto"
                className="w-full h-full object-cover"
              />

              {/* Highlight overlays for selected areas */}
              {areas.map((area) => {
                const isSelected = data.concerns?.includes(area.concern) || false
                if (!isSelected) return null

                // Tamanhos diferentes para cada área
                const areaSizes: Record<SkinConcern, { width: string; height: string }> = {
                  forehead: { width: '80px', height: '60px' },
                  temples: { width: '60px', height: '60px' },
                  eyes: { width: '100px', height: '70px' },
                  cheeks: { width: '90px', height: '90px' },
                  lips: { width: '50px', height: '40px' },
                  neck: { width: '70px', height: '80px' },
                  jawline: { width: '60px', height: '60px' },
                  chin: { width: '50px', height: '50px' },
                  'décolleté': { width: '80px', height: '60px' },
                }

                const size = areaSizes[area.concern] || { width: '60px', height: '60px' }

                return (
                  <motion.div
                    key={`highlight-${area.concern}`}
                    className="absolute pointer-events-none z-20"
                    style={{
                      top: area.position.top,
                      left: area.position.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div className="relative">
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/40 blur-lg"
                        style={{
                          width: size.width,
                          height: size.height,
                          marginLeft: `-${parseInt(size.width) / 2}px`,
                          marginTop: `-${parseInt(size.height) / 2}px`,
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* Highlight circle */}
                      <div
                        className="rounded-full border-3 border-primary bg-primary/30 backdrop-blur-sm"
                        style={{
                          width: size.width,
                          height: size.height,
                          marginLeft: `-${parseInt(size.width) / 2}px`,
                          marginTop: `-${parseInt(size.height) / 2}px`,
                          boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </>
          ) : (
            /* Placeholder for face image */
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-primary/20">
              <div className="text-center text-gray-500">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-2 rounded-full bg-gray-300 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-400" />
                </div>
                <p className="text-xs sm:text-sm">Imagem do Rosto</p>
              </div>
            </div>
          )}

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

