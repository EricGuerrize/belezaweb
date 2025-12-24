'use client'

import { useOnboardingStore } from '@/store/onboarding-store'
import { Card, CardContent } from '@/components/ui/card'

export default function Step5() {
  const { data } = useOnboardingStore()

  const areas = data.concerns || []
  const areaLabels: Record<string, string> = {
    forehead: 'Forehead',
    temples: 'Temples',
    eyes: 'Eyes',
    cheeks: 'Cheeks',
    lips: 'Lips',
    neck: 'Neck',
    jawline: 'Jawline',
    chin: 'Chin',
    'décolleté': 'Décolleté',
  }

  return (
    <div>
      <h3 className="text-2xl font-heading mb-2">
        Resumo das suas informações
      </h3>
      <p className="text-gray-600 mb-6">
        Revise suas respostas antes de continuar
      </p>

      <div className="space-y-4">
        {data.skinType && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm text-gray-600">Tipo de Pele</p>
                  <p className="text-lg font-medium capitalize">{data.skinType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {areas.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="font-semibold text-sm text-gray-600 mb-2">Áreas de Preocupação</p>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                    >
                      {areaLabels[area] || area}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {data.currentRoutine && data.currentRoutine.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="font-semibold text-sm text-gray-600 mb-2">Rotina Atual</p>
                <div className="flex flex-wrap gap-2">
                  {data.currentRoutine.map((product) => (
                    <span
                      key={product}
                      className="px-3 py-1 bg-accent rounded-full text-sm"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {data.mainGoal && (
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="font-semibold text-sm text-gray-600">Objetivo Principal</p>
                <p className="text-lg font-medium">
                  {goals.find((g) => g.value === data.mainGoal)?.label || data.mainGoal}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

const goals = [
  { value: 'anti_aging', label: 'Anti-aging' },
  { value: 'hydration', label: 'Hidratação' },
  { value: 'acne', label: 'Controle de acne' },
  { value: 'brightening', label: 'Clareamento' },
  { value: 'even_tone', label: 'Uniformizar tom' },
  { value: 'glow', label: 'Make my face glow' },
]

