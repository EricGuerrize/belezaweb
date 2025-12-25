/**
 * Garante que há uma sessão ativa
 * Usado principalmente na home page para criar cookie de sessão
 */
export const ensureSession = () => {
  if (typeof window === 'undefined') return

  // Cria cookie de sessão via client-side também
  document.cookie = 'app-session=active; path=/; max-age=86400; SameSite=Strict'
}

/**
 * Limpa a sessão
 * Usado ao fazer logout ou limpar dados
 */
export const clearSession = () => {
  if (typeof window === 'undefined') return

  // Remove cookie de sessão
  document.cookie = 'app-session=; path=/; max-age=0'
}

/**
 * Verifica se há sessão ativa
 */
export const hasActiveSession = (): boolean => {
  if (typeof window === 'undefined') return false

  return document.cookie.includes('app-session=active')
}
