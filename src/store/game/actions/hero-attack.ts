import type { IGameStore } from '../game.types'
import { getCardById } from './attack-card'
import { useNotificationStore } from '@/store/notiffication/notification.store'
import { useDamageStore } from './damage.store'
import { EnumTypeCard } from '@/card.types'

export const attackHeroAction = (state: IGameStore, attackerId: string
): Partial<IGameStore> => {

    const isAttackerPlayer = state.currentTurn === 'player';
	const opponent = isAttackerPlayer ? state.opponent : state.player;
	const attacker = getCardById(attackerId, isAttackerPlayer ? state.player.deck : state.opponent.deck);
	const opponentTaunt = opponent.deck.find(
		card => card.type === EnumTypeCard.taunt && card.isOnBoard
	);

	if (attacker && attacker.isCanAttack && !opponentTaunt) {
		opponent.health -= attacker.attack;
		attacker.isCanAttack = false;

		console.log(`${isAttackerPlayer ? 'Player' : 'Opponent'} attacked hero and dealt ${attacker.attack} damage!`);

		useDamageStore
			.getState()
			.addDamage(isAttackerPlayer ? 'opponent' : 'player', attacker.attack);

		if (opponent.health <= 0) {
			state.isGameOver = true;
			state.isGameStarted = false;

			console.log(`${isAttackerPlayer ? 'Player' : 'Opponent'} wins the game!`);

			useNotificationStore
				.getState()
				.show(
					isAttackerPlayer ? 'You win' : 'You lose',
					isAttackerPlayer ? 'win' : 'lose'
				);
		}
	}

	return {
		player: state.player,
		opponent: state.opponent,
		isGameOver: state.isGameOver,
		isGameStarted: state.isGameStarted
	};
};
