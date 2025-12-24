export interface Recommendation {
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen' | 'treatment'
  timing: 'morning' | 'evening' | 'both'
  ingredients: string[]
  reason: string
  priority: 'essential' | 'recommended' | 'optional'
}

export interface RoutineStep {
  order: number
  productType: string
  activeIngredients: string[]
  applicationTips: string
  waitTime?: number
  category: Recommendation['category']
}

export interface SkincareRoutine {
  morning: RoutineStep[]
  evening: RoutineStep[]
  weekly: RoutineStep[]
}

export const mockRecommendations: Recommendation[] = [
  {
    category: 'sunscreen',
    timing: 'morning',
    ingredients: ['zinc oxide', 'titanium dioxide'],
    reason: 'Proteção essencial contra danos UV',
    priority: 'essential',
  },
  {
    category: 'serum',
    timing: 'both',
    ingredients: ['hyaluronic acid', 'glycerin', 'ceramides'],
    reason: 'Sua pele está desidratada e precisa de hidratação profunda',
    priority: 'essential',
  },
  {
    category: 'moisturizer',
    timing: 'both',
    ingredients: ['ceramides', 'niacinamide', 'peptides'],
    reason: 'Hidratação e reparação da barreira cutânea',
    priority: 'essential',
  },
  {
    category: 'serum',
    timing: 'evening',
    ingredients: ['retinol', 'vitamin c', 'peptides'],
    reason: 'Ingredientes anti-aging para prevenir e tratar rugas',
    priority: 'recommended',
  },
  {
    category: 'cleanser',
    timing: 'both',
    ingredients: ['hyaluronic acid', 'glycerin'],
    reason: 'Limpeza suave sem ressecar',
    priority: 'essential',
  },
]

export const mockRoutine: SkincareRoutine = {
  morning: [
    {
      order: 1,
      productType: 'Cleanser',
      activeIngredients: ['hyaluronic acid', 'glycerin'],
      applicationTips: 'Aplique com movimentos circulares suaves, enxágue com água morna',
      category: 'cleanser',
    },
    {
      order: 2,
      productType: 'Hydrating Serum',
      activeIngredients: ['hyaluronic acid', 'glycerin', 'ceramides'],
      applicationTips: 'Aplique em rosto e pescoço enquanto a pele ainda está úmida',
      waitTime: 30,
      category: 'serum',
    },
    {
      order: 3,
      productType: 'Moisturizer',
      activeIngredients: ['ceramides', 'niacinamide', 'peptides'],
      applicationTips: 'Massageie suavemente até absorver completamente',
      waitTime: 60,
      category: 'moisturizer',
    },
    {
      order: 4,
      productType: 'Sunscreen SPF 50+',
      activeIngredients: ['zinc oxide', 'titanium dioxide'],
      applicationTips: 'Aplique generosamente 15 minutos antes da exposição ao sol',
      category: 'sunscreen',
    },
  ],
  evening: [
    {
      order: 1,
      productType: 'Cleanser',
      activeIngredients: ['hyaluronic acid', 'glycerin'],
      applicationTips: 'Remova toda a maquiagem e impurezas do dia',
      category: 'cleanser',
    },
    {
      order: 2,
      productType: 'Hydrating Serum',
      activeIngredients: ['hyaluronic acid', 'glycerin', 'ceramides'],
      applicationTips: 'Aplique em rosto e pescoço',
      waitTime: 30,
      category: 'serum',
    },
    {
      order: 3,
      productType: 'Anti-Aging Serum',
      activeIngredients: ['retinol', 'vitamin c', 'peptides'],
      applicationTips: 'Comece usando 2-3 vezes por semana, aumente gradualmente',
      waitTime: 300,
      category: 'serum',
    },
    {
      order: 4,
      productType: 'Night Moisturizer',
      activeIngredients: ['ceramides', 'niacinamide', 'peptides'],
      applicationTips: 'Aplique uma camada generosa antes de dormir',
      category: 'moisturizer',
    },
  ],
  weekly: [
    {
      order: 1,
      productType: 'Exfoliating Mask',
      activeIngredients: ['AHA', 'BHA'],
      applicationTips: 'Use 1-2 vezes por semana, evite áreas sensíveis',
      category: 'treatment',
    },
  ],
}

