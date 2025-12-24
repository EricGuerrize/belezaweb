import { create } from 'zustand'
import { OnboardingData, defaultOnboardingData } from '@/lib/mock-data/onboarding'

interface OnboardingStore {
  data: OnboardingData
  currentStep: number
  updateData: (data: Partial<OnboardingData>) => void
  nextStep: () => void
  previousStep: () => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('onboardingData') || JSON.stringify(defaultOnboardingData))
    : defaultOnboardingData,
  currentStep: 0,
  updateData: (newData) =>
    set((state) => {
      const updatedData = { ...state.data, ...newData }
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('onboardingData', JSON.stringify(updatedData))
      }
      return { data: updatedData }
    }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 4),
    })),
  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  reset: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('onboardingData')
    }
    set({
      data: defaultOnboardingData,
      currentStep: 0,
    })
  },
}))

