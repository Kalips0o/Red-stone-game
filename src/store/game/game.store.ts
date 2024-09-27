import { create } from 'zustand'
import { endTurnAction } from './actions/end-turn'
import { playCardAction } from './actions/play-card'
import { type IGameStore} from './game.types'
import { attackCardAction } from './actions/atack-card'
import { attackHeroAction } from './actions/hero-atack'
import { returnCardAction } from './actions/return-card'
import { initialGameData } from './actions/initial-data'
import { startGameAction } from './actions/start-game/start-game'




const useGameStore = create<IGameStore>((set, get) => ({
	...initialGameData,
	isGameStarted: false,
	startGame: () => set(startGameAction()),
	endTurn: () => set(endTurnAction(get)),
	playCard: (cardId: number) => {
		set((state) => playCardAction(state, cardId))
	},
    returnCard: (cardId: number) => {
		set((state) => returnCardAction(state, cardId))
	},
	attackCard: (attackerId: number, targetId: number) => {
		set((state) => attackCardAction(state, attackerId, targetId))
	},	
	attackHero: (attackerId: number) => {
		set((state) => attackHeroAction(state, attackerId))
	},					
	resetGameOver: () => set({ isGameOver: false }),
}))

export { useGameStore }
