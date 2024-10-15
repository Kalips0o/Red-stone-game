import type { IGameStore } from '../game.types'
import { getCardById } from './attack-card'
import { useNotificationStore } from '@/store/notiffication/notification.store'
import { useDamageStore } from './damage.store'
import { EnumTypeCard } from '@/card.types'
import create from 'zustand'

interface ISoundStore {
  playPlayerScream: () => void;
  playOpponentScream: () => void;
  playCardDeal: () => void;
  playCardOnTable: () => void;
  playCardAttack: () => void;
  playWin: () => void;
  playLose: () => void;
}

export const useSoundStore = create<ISoundStore>(() => ({
  playPlayerScream: () => {},
  playOpponentScream: () => {},
  playCardDeal: () => {},
  playCardOnTable: () => {},
  playCardAttack: () => {},
  playWin: () => {},
  playLose: () => {},
}));

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

		// Воспроизводим звук в зависимости от того, кто атакует
		if (isAttackerPlayer) {
			useSoundStore.getState().playOpponentScream();
		} else {
			useSoundStore.getState().playPlayerScream();
		}

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
