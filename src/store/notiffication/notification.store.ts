import { create } from "zustand"

type TypeNotification = 'win' | 'lose' | 'info' | 'turn'

interface INotificationStore {
  message: string
  type: TypeNotification
  show: (message: string, type?:TypeNotification) => void;
}

export const useNotificationStore = create<INotificationStore>((set) => ({
  message: '',
  type: 'info',
  show: (message, type, duration = 2000) => {
    set({ message, type });
    setTimeout(() => {
      set({ message: '' });
    }, duration);
  },
}))
