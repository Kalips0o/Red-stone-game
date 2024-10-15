import { create } from "zustand"
import { useGameStore } from "../game/game.store"

interface INotificationStore {
  message: string
  type: 'win' | 'lose' | 'info'
  show: (message: string, type?: 'win' | 'lose' | 'info') => void
  hide: () => void
}

export const useNotificationStore = create<INotificationStore>((set, get) => ({
  message: '',
  type: 'info',
  show: (message, type = 'info') => {
    set({ message, type });
    if (message === 'Your turn') {
      useGameStore.setState({ isPlayerTurnNotified: true });
    }
    // Автоматически скрываем уведомление через определенное время
    const hideDelay = type === 'win' || type === 'lose' ? 5000 : 2000;
    setTimeout(() => {
      if (get().message === message) {
        set({ message: '', type: 'info' });
      }
    }, hideDelay);
  },
  hide: () => set({ message: '', type: 'info' })
}))
