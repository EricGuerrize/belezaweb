'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
  href?: string
  onClick?: () => void
  className?: string
}

export default function BackButton({ href, onClick, className }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={`flex items-center gap-2 ${className || ''}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Voltar</span>
    </Button>
  )
}


