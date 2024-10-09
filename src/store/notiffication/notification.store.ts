import { create } from "zustand"

interface INotificationStore {
  message: string
  type: 'win' | 'lose' | 'info'
  show: (message: string, type?: 'win' | 'lose' | 'info') => void
  hide: () => void
}

export const useNotificationStore = create<INotificationStore>(set => ({
  message: '',
  type: 'info',
  show: (message, type = 'info') => set({ message, type }),
  hide: () => set({ message: '', type: 'info' })
}))
