import { useOnboardingStore } from '@/store/onboarding-store'
import { useImageStore } from '@/store/image-store'
import { ensureSession } from './session'

/**
 * Reseta todos os dados da aplicação
 * - Limpa dados do onboarding
 * - Remove imagem capturada
 * - Limpa localStorage
 * - Renova sessão
 */
export const resetApp = () => {
  // Reset stores
  useOnboardingStore.getState().reset()
  useImageStore.getState().reset()

  // Limpar outros dados do localStorage se necessário
  if (typeof window !== 'undefined') {
    // Adicione aqui outras chaves do localStorage que precisam ser limpas
    const keysToKeep = ['theme', 'language'] // Mantém preferências do usuário
    const allKeys = Object.keys(localStorage)

    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key)
      }
    })

    // Renova a sessão para permitir novo fluxo
    ensureSession()
  }
}

/**
 * Hook para resetar app com confirmação
 */
export const useResetApp = () => {
  const resetWithConfirmation = (message?: string) => {
    const defaultMessage = 'Tem certeza que deseja iniciar uma nova análise? Todos os dados atuais serão perdidos.'

    if (confirm(message || defaultMessage)) {
      resetApp()
      return true
    }
    return false
  }

  return {
    resetApp,
    resetWithConfirmation,
  }
}
