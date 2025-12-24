'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Upload, Camera, Shield, X } from 'lucide-react'

export default function AnalyzePage() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
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
  }

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (err) {
      setError('Não foi possível acessar a câmera. Verifique as permissões do navegador.')
      console.error('Erro ao acessar câmera:', err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const dataUrl = canvas.toDataURL('image/jpeg')
        setImage(dataUrl)
        stopCamera()
      }
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const handleAnalyze = () => {
    if (image) {
      router.push('/analyzing')
    }
  }

  return (
    <div className="min-h-screen bg-background px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-4xl">
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
                        onClick={startCamera}
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
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                </div>
              ) : showCamera ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                    <button
                      onClick={stopCamera}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-3 sm:gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={stopCamera}
                      className="flex-1 sm:flex-none"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={capturePhoto}
                      size="lg"
                      className="flex-1 sm:flex-none"
                    >
                      Capturar Foto
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
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
                    <Button onClick={handleAnalyze} size="lg" className="w-full sm:w-auto">
                      Analisar minha pele
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

          <div className="text-center mt-4 sm:mt-6">
            <button
              onClick={() => router.push('/results')}
              className="text-sm sm:text-base text-primary hover:underline"
            >
              Pular por enquanto
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

