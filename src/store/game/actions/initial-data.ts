import { type IGameFnStore, type IGameStore, type IHero } from '../game.types'

export const initialPlayerData: IHero = {
	deck: [],
	health: 25,
	mana: 1,
}

export const initialGameData:Omit<
IGameStore,
keyof IGameFnStore
 > = {
	player: initialPlayerData,
	opponent:initialPlayerData,
	currentTurn: 'player',
	isGameOver: false,
	isGameStarted: true,
    turn: 1,
}