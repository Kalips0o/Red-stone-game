// import { EnumTypeCard } from '@/card.types'
import type { IGameStore } from '../game.types'
import { getCardById } from './atack-card'
import { useNotificationStore } from '@/store/notiffication/notification.store'


export const attackHeroAction = (state: IGameStore, attackerId: number): Partial<IGameStore> => {
	const isAttackerPlayer = state.currentTurn === "player"
	const opponent = state[isAttackerPlayer ? 'opponent' : 'player']
	
	const attacker = getCardById(attackerId.toString(), isAttackerPlayer ?  state.player.deck :state.opponent.deck) 

	// const opponentTaunt = opponent.deck.find(card => card.type === EnumTypeCard.taunt && card.isOnBoard)

	if(attacker && attacker.isCanAttack ) {
		opponent.health -= attacker.attack
		attacker.isCanAttack = false

		if(opponent.health <= 0) {
			state.isGameOver = true
			state.isGameStarted = false

			useNotificationStore.getState().show(isAttackerPlayer ? 'You win' : 'You lose', isAttackerPlayer ? 'win' : 'lose')
		}
	}

	return {player: state.player,
		 opponent: state.opponent,
		  isGameOver: state.isGameOver,
		  isGameStarted:state.isGameStarted
		}
}