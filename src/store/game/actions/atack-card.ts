import type { IGameCard, IGameStore } from "../game.types";
import { useDamageStore } from "./damage.store";

export const getCardById = (cardId: string, deck: IGameCard[]) =>
  deck.find(card => card.id === cardId);

export const attackCardAction = (
  state: IGameStore,
  attackerId: string,
  targetId: string
) => {
  const isAttackerPlayer = state.currentTurn === 'player';
  const attacker = getCardById(
    attackerId,
    isAttackerPlayer ? state.player.deck : state.opponent.deck
  );
  const target = getCardById(
    targetId,
    isAttackerPlayer ? state.opponent.deck : state.player.deck
  );

  if (attacker && target && attacker.isCanAttack) {
    // Наносим урон
    target.health -= attacker.attack;
    attacker.health -= target.attack;

    // Отмечаем, что атакующая карта больше не может атаковать в этом ходу
    attacker.isCanAttack = false;

    // Добавляем урон для отображения на экране
    useDamageStore.getState().addDamage(targetId, attacker.attack);
    useDamageStore.getState().addDamage(attackerId, target.attack);

    // Функция для удаления карты из колоды
    const removeCardFromDeck = (deck: IGameCard[], cardId: string) => 
      deck.filter(card => card.id !== cardId);

    // Проверяем и удаляем карты с нулевым или отрицательным здоровьем
    if (target.health <= 0) {
      if (isAttackerPlayer) {
        state.opponent.deck = removeCardFromDeck(state.opponent.deck, targetId);
      } else {
        state.player.deck = removeCardFromDeck(state.player.deck, targetId);
      }
    }

    if (attacker.health <= 0) {
      if (isAttackerPlayer) {
        state.player.deck = removeCardFromDeck(state.player.deck, attackerId);
      } else {
        state.opponent.deck = removeCardFromDeck(state.opponent.deck, attackerId);
      }
    }

  }

  return { player: state.player, opponent: state.opponent };}