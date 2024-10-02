import { create } from "zustand"

type TypeNotification = 'win' | 'lose' | 'info'

interface INotificationStore {
  message: string
  type: TypeNotification
  show: (message: string, type?:TypeNotification) => void;
}

export const useNotificationStore = create<INotificationStore>((set) => ({
  message: '',
  type: 'info',
  show: (message, type, duration = 1100) => {
    set({ message, type });
    setTimeout(() => {
      set({ message: '' });
    }, duration);
  },
}))
