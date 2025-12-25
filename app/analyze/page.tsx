'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Upload, Camera, Shield } from 'lucide-react'
import { useImageStore } from '@/store/image-store'
import BackButton from '@/components/navigation/BackButton'

export default function AnalyzePage() {
  const router = useRouter()
  const { capturedImage, setCapturedImage } = useImageStore()
  const [image, setImage] = useState<string | null>(capturedImage)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setImage(imageData)
        setCapturedImage(imageData)
        setError(null)
      }
      reader.onerror = () => {
        setError('Erro ao ler o arquivo. Tente novamente.')
      }
      reader.readAsDataURL(file)
    } else {
      setError('Por favor, selecione uma imagem válida.')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
    // Reset input para permitir selecionar o mesmo arquivo novamente
    e.target.value = ''
  }

  const handleCameraInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
    // Reset input
    e.target.value = ''
  }

  const handleAnalyze = async () => {
    if (!image) {
      setError('Por favor, selecione ou tire uma foto primeiro.')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Converter base64 para blob
      const base64Data = image.includes(',') ? image.split(',')[1] : image
      const byteCharacters = atob(base64Data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'image/jpeg' })
      
      const formData = new FormData()
      formData.append('image', blob, 'photo.jpg')
      
      // Obter dados do onboarding
      const onboardingData = localStorage.getItem('onboardingData')
      if (onboardingData) {
        formData.append('onboardingData', onboardingData)
      }
      
      // Enviar para API
      const apiResponse = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erro ao processar análise')
      }

      const result = await apiResponse.json()
      
      // Salvar resultado no localStorage
      localStorage.setItem('analysisResult', JSON.stringify(result.analysis))

      // Redirecionar para página de análise
      router.push('/analyzing')
    } catch (err: any) {
      console.error('Erro ao analisar:', err)
      setError(err.message || 'Erro ao processar a análise. Tente novamente.')
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton href="/onboarding" />
        </div>
        
        {/* Info se já tem foto */}
        {capturedImage && (
          <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg text-sm text-center">
            <p>Você já tem uma foto. Pode fazer upload de uma nova ou continuar com a atual.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-center mb-3 sm:mb-4 px-2">
            Vamos analisar sua pele!
          </h1>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
            Faça upload de uma foto ou tire uma selfie para começar a análise
          </p>

          <Card className="mb-4 sm:mb-6">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              {!image ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`
                    border-2 border-dashed rounded-xl p-6 sm:p-8 md:p-12 text-center transition-all
                    ${isDragging
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 hover:border-primary/50'
                    }
                  `}
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Arraste sua foto aqui
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      ou clique nos botões abaixo
                    </p>
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 w-full"
                      >
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Enviar Foto</span>
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 w-full"
                      >
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Tirar Selfie</span>
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleCameraInput}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImage(null)
                        fileInputRef.current?.click()
                      }}
                      className="w-full sm:w-auto"
                    >
                      Trocar foto
                    </Button>
                    <Button 
                      onClick={handleAnalyze} 
                      size="lg" 
                      className="w-full sm:w-auto"
                      disabled={isUploading}
                    >
                      {isUploading ? 'Processando...' : 'Analisar minha pele'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {error && (
            <div className="mb-4 p-3 bg-danger/20 border border-danger/50 rounded-lg text-sm text-danger text-center">
              {error}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 px-4">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
            <span className="text-center">Sua foto não será visível para ninguém</span>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

