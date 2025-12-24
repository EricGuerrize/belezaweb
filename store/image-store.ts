import { create } from 'zustand'

interface ImageStore {
  capturedImage: string | null
  setCapturedImage: (image: string | null) => void
}

export const useImageStore = create<ImageStore>((set) => ({
  capturedImage: null,
  setCapturedImage: (image) => set({ capturedImage: image }),
}))
