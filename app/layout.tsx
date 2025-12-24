import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Beleza Viva - Análise de Pele com IA",
  description: "Descubra a idade real da sua pele e receba recomendações personalizadas de skincare",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

