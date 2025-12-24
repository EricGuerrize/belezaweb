export interface SkinAnalysis {
  hydration: number
  elasticity: number
  texture: number
  skinAge: number
  overallScore: number
  skinType: 'dry' | 'normal' | 'combination' | 'oily'
  poreScore: number
  acneScore: number
  wrinkleScore: number
  darkSpotScore: number
  darkCircleScore: number
  imageUrl: string
  zones: FaceZoneAnalysis[]
}

export interface FaceZoneAnalysis {
  zone: 'forehead' | 'nose' | 'left_cheek' | 'right_cheek' | 'chin'
  issues: string[]
  severity: 'none' | 'mild' | 'moderate' | 'severe'
}

export const mockAnalysis: SkinAnalysis = {
  hydration: 28,
  elasticity: 39,
  texture: 32,
  skinAge: 35,
  overallScore: 78,
  skinType: 'dry',
  poreScore: 25,
  acneScore: 15,
  wrinkleScore: 30,
  darkSpotScore: 20,
  darkCircleScore: 45,
  imageUrl: '/placeholder-face.jpg',
  zones: [
    {
      zone: 'forehead',
      issues: ['dryness', 'fine_lines'],
      severity: 'moderate',
    },
    {
      zone: 'left_cheek',
      issues: ['dryness'],
      severity: 'mild',
    },
    {
      zone: 'right_cheek',
      issues: ['dryness'],
      severity: 'mild',
    },
    {
      zone: 'nose',
      issues: ['pores'],
      severity: 'mild',
    },
    {
      zone: 'chin',
      issues: ['dark_spots'],
      severity: 'mild',
    },
  ],
}

export const mockAnalysisAfter: SkinAnalysis = {
  hydration: 94,
  elasticity: 81,
  texture: 92,
  skinAge: 28,
  overallScore: 95,
  skinType: 'normal',
  poreScore: 15,
  acneScore: 5,
  wrinkleScore: 10,
  darkSpotScore: 8,
  darkCircleScore: 20,
  imageUrl: '/placeholder-face-after.jpg',
  zones: [
    {
      zone: 'forehead',
      issues: [],
      severity: 'none',
    },
    {
      zone: 'left_cheek',
      issues: [],
      severity: 'none',
    },
    {
      zone: 'right_cheek',
      issues: [],
      severity: 'none',
    },
    {
      zone: 'nose',
      issues: [],
      severity: 'none',
    },
    {
      zone: 'chin',
      issues: [],
      severity: 'none',
    },
  ],
}

