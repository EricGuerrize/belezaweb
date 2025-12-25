import { NextRequest, NextResponse } from 'next/server'
import { mockRoutine } from '@/lib/mock-data/recommendations'

export async function POST(request: NextRequest) {
  try {
    const { analysisId, skinType, concerns, mainGoal } = await request.json()

    // Simular geração de rotina baseada na análise
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Em produção, aqui você geraria a rotina baseada nos dados reais
    const routine = {
      id: `routine_${Date.now()}`,
      analysisId,
      ...mockRoutine,
      personalizedFor: {
        skinType: skinType || 'dry',
        concerns: concerns || [],
        mainGoal: mainGoal || 'glow',
      },
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      routine,
    })
  } catch (error) {
    console.error('Erro ao gerar rotina:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar rotina personalizada' },
      { status: 500 }
    )
  }
}


