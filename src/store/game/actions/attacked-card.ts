import { create } from 'zustand';

interface IAttackedCardStore {
  attackedCardId: string | null;
  setAttackedCardId: (cardId: string | null) => void;
}

export const useAttackedCardStore = create<IAttackedCardStore>((set) => ({
  attackedCardId: null,
  setAttackedCardId: (cardId) => set({ attackedCardId: cardId }),
}));
