import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas que são sempre acessíveis (não requerem fluxo)
const publicRoutes = [
  '/',           // Home page
  '/api',        // API routes
  '/_next',      // Next.js internals
  '/favicon',    // Favicon
  '/static',     // Static files
]

// Rotas do fluxo da aplicação (requerem que usuário comece pela home)
const protectedRoutes = [
  '/capture',
  '/onboarding',
  '/analyze',
  '/analyzing',
  '/results',
  '/routine',
  '/compare',
  '/offer',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir rotas públicas e assets
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Verificar se há um cookie de sessão ativa
    const hasSession = request.cookies.has('app-session')

    // Se não tem sessão, redirecionar para home
    if (!hasSession) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // Permitir a requisição continuar
  const response = NextResponse.next()

  // Se estiver acessando a home, criar cookie de sessão
  if (pathname === '/') {
    response.cookies.set('app-session', 'active', {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 horas
      sameSite: 'strict',
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
