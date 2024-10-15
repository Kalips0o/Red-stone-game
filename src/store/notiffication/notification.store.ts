import { create } from "zustand"
import { useGameStore } from "../game/game.store"
import { useSoundStore } from "../game/actions/hero-attack"

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
    // Воспроизводим соответствующий звук для победы или поражения
    if (type === 'win') {
      useSoundStore.getState().playWin();
    } else if (type === 'lose') {
      useSoundStore.getState().playLose();
    }
    // Автоматически скрываем уведомление через определенное время
    const hideDelay = type === 'win' || type === 'lose' ? 8000 : 2000;
    setTimeout(() => {
      if (get().message === message) {
        set({ message: '', type: 'info' });
      }
    }, hideDelay);
  },
  hide: () => set({ message: '', type: 'info' })
}))
