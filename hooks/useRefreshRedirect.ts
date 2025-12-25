import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { clearSession } from '@/lib/session'

/**
 * Hook que redireciona para home se a página foi recarregada (F5/refresh)
 * Usado em páginas protegidas para forçar início do fluxo
 */
export const useRefreshRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    // Verificar se foi um reload (F5, Ctrl+R, etc)
    const navigationType = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    if (navigationType?.type === 'reload') {
      // Foi um refresh - limpar sessão e redirecionar
      clearSession()
      router.replace('/')
    }
  }, [router])
}
