import type { IGameCard, IGameStore } from "../game.types";
import { useDamageStore } from "./damage.store";
import { useSoundStore } from "./hero-attack";
import { create } from 'zustand';

// Создаем новый стор для управления анимацией удаления карт
interface IRemoveCardStore {
  cardsToRemove: string[];
  addCardToRemove: (cardId: string) => void;
  clearCardsToRemove: () => void;
}

export const useRemoveCardStore = create<IRemoveCardStore>((set) => ({
  cardsToRemove: [],
  addCardToRemove: (cardId) => set((state) => ({ cardsToRemove: [...state.cardsToRemove, cardId] })),
  clearCardsToRemove: () => set({ cardsToRemove: [] }),
}));

export const getCardById = (cardId: string, deck: IGameCard[]) =>
  deck.find(card => card.id === cardId);

export const attackCardAction = (
  state: IGameStore,
  attackerId: string,
  targetId: string
): IGameStore => {
  const isAttackerPlayer = state.currentTurn === 'player';
  const attackerDeck = isAttackerPlayer ? state.player.deck : state.opponent.deck;
  const targetDeck = isAttackerPlayer ? state.opponent.deck : state.player.deck;

  const attackerIndex = attackerDeck.findIndex(card => card.id === attackerId);
  const targetIndex = targetDeck.findIndex(card => card.id === targetId);

  if (attackerIndex === -1 || targetIndex === -1) {
    return state;
  }

  const attacker = { ...attackerDeck[attackerIndex] };
  const target = { ...targetDeck[targetIndex] };

  if (attacker && target && attacker.isCanAttack) {
    const damageToTarget = attacker.attack;
    const damageToAttacker = target.attack;

    target.health -= damageToTarget;
    attacker.health -= damageToAttacker;

    attacker.isCanAttack = false;

    useDamageStore.getState().addDamage(targetId, damageToTarget);
    useDamageStore.getState().addDamage(attackerId, damageToAttacker);

    useSoundStore.getState().playCardAttack();

    const newAttackerDeck = [...attackerDeck];
    const newTargetDeck = [...targetDeck];

    if (target.health <= 0) {
      useRemoveCardStore.getState().addCardToRemove(targetId);
      newTargetDeck.splice(targetIndex, 1);
    } else {
      newTargetDeck[targetIndex] = target;
    }

    if (attacker.health <= 0) {
      useRemoveCardStore.getState().addCardToRemove(attackerId);
      newAttackerDeck.splice(attackerIndex, 1);
    } else {
      newAttackerDeck[attackerIndex] = attacker;
    }

    const newState = { ...state };
    if (isAttackerPlayer) {
      newState.player = { ...newState.player, deck: newAttackerDeck };
      newState.opponent = { ...newState.opponent, deck: newTargetDeck };
    } else {
      newState.opponent = { ...newState.opponent, deck: newAttackerDeck };
      newState.player = { ...newState.player, deck: newTargetDeck };
    }

    return newState;
  }

  return state;
}
