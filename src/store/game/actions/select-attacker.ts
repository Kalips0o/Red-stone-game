import { create } from "zustand"


interface IUseSelectAttacker {
    cardAttackerId: number | null
    setCardAttackerId: (id: number | null) => void
}


export const useSellectAttacker = create<IUseSelectAttacker>((set,) => ({
    cardAttackerId: null,
    setCardAttackerId: cardId => set({ cardAttackerId: cardId })

}))
