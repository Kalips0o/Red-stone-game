import { MAX_HAND_CARDS } from "@/constants/game/core.constants";
import { createDeck } from "../../create-deck";
import { type IGameCard, type IGameStore } from "../../game.types";
import { initialGameData } from "../initial-data";
import shuffle from 'lodash/shuffle';
import { useSelectAttacker } from "../select-attacker";
import { useAttackedCardStore } from '../attacked-card';

// Функция для получения первых карт в руке игрока
const getFirstCards = (deck: IGameCard[]): IGameCard[] =>
  deck.map((card, index) => ({
    ...card,
    isOnHand: index < MAX_HAND_CARDS, // Устанавливаем, находится ли карта на руке
    isTaken: index < MAX_HAND_CARDS, // Устанавливаем, была ли карта взята
  }));

// Основная функция для начала игры
export const startGameAction = (): Partial<IGameStore> => {
  // Сбрасываем состояния атакующей карты и атакованной карты
  useSelectAttacker.getState().setCardAttackerId(null);
  useAttackedCardStore.getState().setAttackedCardId(null);

  // Создаем и перемешиваем колоды для игрока и противника
  const playerInitialDeck = shuffle(createDeck('player'));
  const opponentInitialDeck = shuffle(createDeck('opponent'));

  return {
    ...initialGameData,
    player: {
      ...initialGameData.player, // Копируем начальные данные игрока
      deck: getFirstCards(playerInitialDeck), // Устанавливаем начальные карты на руке игрока
    },
    opponent: {
      ...initialGameData.opponent, // Копируем начальные данные противника
      deck: getFirstCards(opponentInitialDeck), // Устанавливаем начальные карты на руке противника
    },
  };
};
