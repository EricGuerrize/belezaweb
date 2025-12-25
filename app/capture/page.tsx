'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Upload, Camera, X } from 'lucide-react'
import { useImageStore } from '@/store/image-store'
import { useRefreshRedirect } from '@/hooks/useRefreshRedirect'
import BackButton from '@/components/navigation/BackButton'

export default function CapturePage() {
  useRefreshRedirect() // Redireciona para home ao atualizar página
  const router = useRouter()
  const { setCapturedImage } = useImageStore()
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Avisar ao sair da página com foto capturada
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (image) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [image])

  // Cleanup da câmera ao desmontar
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

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
    e.target.value = ''
  }

  const startCamera = async () => {
    try {
      setError(null)

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Seu navegador não suporta acesso à câmera. Tente usar um navegador mais recente.')
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        },
        audio: false
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setShowCamera(true)
      }
    } catch (err: any) {
      console.error('Erro ao acessar câmera:', err)
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Permissão de câmera negada. Por favor, permita o acesso à câmera nas configurações do navegador.')
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('Nenhuma câmera encontrada. Verifique se há uma câmera conectada.')
      } else {
        setError('Não foi possível acessar a câmera. Verifique as permissões do navegador.')
      }
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
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
        setImage(dataUrl)
        setCapturedImage(dataUrl)
        stopCamera()
        setError(null)
      }
    }
  }

  const handleContinue = () => {
    if (image) {
      router.push('/onboarding')
    } else {
      setError('Por favor, tire uma foto ou faça upload de uma imagem primeiro.')
    }
  }

  return (
    <div className="min-h-screen bg-background px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton href="/" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-center mb-3 sm:mb-4 px-2">
            Tire uma foto do seu rosto
          </h1>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
            Precisamos de uma foto para personalizar sua análise
          </p>

          <Card className="mb-4 sm:mb-6">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              {showCamera ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-black aspect-[3/4] max-w-2xl mx-auto">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                    <button
                      onClick={stopCamera}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-10"
                      aria-label="Fechar câmera"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    {/* Grid de guia */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-full grid grid-cols-3 grid-rows-3 opacity-30">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="border border-white/30" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                    <Button
                      variant="outline"
                      onClick={stopCamera}
                      className="w-full sm:flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={capturePhoto}
                      size="lg"
                      className="w-full sm:flex-1"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Capturar Foto
                    </Button>
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              ) : !image ? (
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
                        <span className="text-sm sm:text-base">Abrir Câmera</span>
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                    />
                    <button
                      onClick={() => {
                        if (confirm('Tem certeza que deseja remover esta foto?')) {
                          setImage(null)
                          setCapturedImage(null)
                        }
                      }}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                      aria-label="Remover foto"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImage(null)
                        setCapturedImage(null)
                        fileInputRef.current?.click()
                      }}
                      className="w-full sm:w-auto"
                    >
                      Trocar foto
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImage(null)
                        setCapturedImage(null)
                        cameraInputRef.current?.click()
                      }}
                      className="w-full sm:w-auto"
                    >
                      Tirar outra foto
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

          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              size="lg"
              disabled={!image}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


