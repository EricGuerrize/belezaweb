export type SkinType = 'dry' | 'normal' | 'combination' | 'oily' | 'sensitive'

export type SkinConcern = 
  | 'acne' 
  | 'wrinkles' 
  | 'dark_spots' 
  | 'dryness' 
  | 'oiliness' 
  | 'sensitivity' 
  | 'dark_circles' 
  | 'pores'
  | 'forehead'
  | 'temples'
  | 'eyes'
  | 'cheeks'
  | 'jawline'
  | 'chin'
  | 'lips'
  | 'neck'
  | 'décolleté'

export interface OnboardingData {
  skinType?: SkinType
  concerns: SkinConcern[]
  currentRoutine?: string[]
  mainGoal?: string
  allergies?: string[]
}

export const defaultOnboardingData: OnboardingData = {
  concerns: [],
  currentRoutine: [],
  allergies: [],
}

