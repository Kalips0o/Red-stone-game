import type { ICard } from "@/card.types"

export type TPlayer = 'player' | 'opponent'

export interface IGameCard extends ICard {
	id: string
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
	playCard: (cardId: string) => void
	returnCard: (cardId: string) => void
	attackCard: (attackerId: string, targetId: string) => void
	attackHero: (attackerId: string) => void
	

}

export interface IGameStore extends IGameFnStore {
	player: IHero
	opponent: IHero
	isGameStarted: boolean
	isGameOver: boolean
	currentTurn: TPlayer
	turn: number
	isPlayerTurnNotified: boolean;
}

export interface CardStatsProps {
	mana: number;
	attack: number;
	health: number;
  }