import type { ICard } from "@/card.types"

export type TPlayer = 'player' | 'opponent'

export interface IGameCard extends ICard {
	id: number
	isTaken: boolean
	isOnHand: boolean
	isOnBoard: boolean
	isCanAttack: boolean
	isPlayedThisTurn: boolean
}

export interface IHero {
	deck: IGameCard[]
	health: number
	mana: number
}

export interface IGameFnStore {
startGame: () => void
	endTurn: () => void
	playCard: (cardId: number) => void
	returnCard: (cardId: number) => void
	attackCard: (attackerId: number, targetId: number) => void
	attackHero: (attackerId: number) => void

}

export interface IGameStore extends IGameFnStore {
	isGameStarted: boolean
	isGameOver: boolean
	player: IHero
	opponent: IHero
	currentTurn: TPlayer
	turn: number
}

