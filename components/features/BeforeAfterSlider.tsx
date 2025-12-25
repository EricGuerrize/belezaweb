'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes',
  afterLabel = 'Depois',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove as any)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleMouseMove as any)
      window.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as any)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleMouseMove as any)
      window.removeEventListener('touchend', handleMouseUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging])

  return (
    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-gray-100">
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Before Image (Left) - Como está */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
          />
        </div>

        {/* After Image (Right) - Como ficará - Clipped */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          {/* Imagem base com enhancement */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(1.15) contrast(1.2) saturate(1.25)',
              transform: 'scale(1.01)',
            }}
          />
          
          {/* Camada de suavização (simula redução de rugas e imperfeições) */}
          <div 
            className="absolute inset-0"
            style={{
              background: `url(${afterImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(1.5px) brightness(1.1)',
              opacity: 0.3,
              mixBlendMode: 'soft-light',
            }}
          />
          
          {/* Overlay de brilho e iluminação melhorada */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
              mixBlendMode: 'overlay',
            }}
          />
          
          {/* Overlay de melhoria de textura */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.05) 100%)',
              mixBlendMode: 'soft-light',
            }}
          />
          
          {/* Overlay de saturação e vivacidade */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(232,180,184,0.1) 0%, rgba(255,255,255,0) 50%, rgba(168,213,186,0.08) 100%)',
              mixBlendMode: 'color',
            }}
          />
        </div>

        {/* Slider Line Vertical */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Slider Handle */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-20"
            style={{ touchAction: 'none' }}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="flex flex-row gap-0.5">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold backdrop-blur-sm">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold backdrop-blur-sm">
          {afterLabel}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-xs sm:text-sm backdrop-blur-sm text-center">
          <span className="hidden sm:inline">Arraste a barra para os lados e veja como ficará</span>
          <span className="sm:hidden">Arraste para comparar</span>
        </div>
      </div>
    </div>
  )
}

