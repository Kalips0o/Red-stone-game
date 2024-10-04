import { create } from "zustand"

// Интерфейс для управления состоянием выбора атакующего
interface IUseSelectAttacker {
    // ID карты атакующего или null, если атакующий не выбран
    cardAttackerId: string | null;
    
    // Функция для установки ID карты атакующего
    setCardAttackerId: (cardId: string | null) => void;
}

// Хук Zustand для управления состоянием выбора атакующей карты
export const useSelectAttacker = create<IUseSelectAttacker>(set => ({
    // Изначально атакующий не выбран, поэтому значение null
    cardAttackerId: null,

    // Метод для обновления состояния с ID выбранной карты атакующего
    setCardAttackerId: (cardId) => set({ cardAttackerId: cardId })
}))
