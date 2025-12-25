import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File | null
    const onboardingData = formData.get('onboardingData')

    if (!image) {
      return NextResponse.json(
        { error: 'Imagem não fornecida' },
        { status: 400 }
      )
    }

    // Simular processamento de análise
    // Em produção, aqui você integraria com API de análise facial (Haut.ai, etc)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Dados mockados da análise
    const analysis = {
      id: `analysis_${Date.now()}`,
      hydration: Math.floor(Math.random() * 40) + 20, // 20-60
      elasticity: Math.floor(Math.random() * 40) + 25, // 25-65
      texture: Math.floor(Math.random() * 40) + 20, // 20-60
      skinAge: Math.floor(Math.random() * 15) + 25, // 25-40
      overallScore: Math.floor(Math.random() * 30) + 60, // 60-90
      skinType: 'dry' as const,
      poreScore: Math.floor(Math.random() * 30) + 15,
      acneScore: Math.floor(Math.random() * 20) + 5,
      wrinkleScore: Math.floor(Math.random() * 30) + 15,
      darkSpotScore: Math.floor(Math.random() * 25) + 10,
      darkCircleScore: Math.floor(Math.random() * 30) + 20,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error('Erro ao analisar imagem:', error)
    return NextResponse.json(
      { error: 'Erro ao processar análise' },
      { status: 500 }
    )
  }
}


