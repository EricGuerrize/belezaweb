import { create } from 'zustand'

interface ImageStore {
  capturedImage: string | null
  setCapturedImage: (image: string | null) => void
  reset: () => void
}

export const useImageStore = create<ImageStore>((set) => ({
  capturedImage: null,
  setCapturedImage: (image) => set({ capturedImage: image }),
  reset: () => set({ capturedImage: null }),
}))
