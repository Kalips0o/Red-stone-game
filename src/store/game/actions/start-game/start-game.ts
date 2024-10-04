import { MAX_HAND_CARDS } from "@/constants/game/core.constants"; // Максимальное количество карт на руке
import { createDeck } from "../../create-deck"; // Функция для создания колоды карт
import { type IGameCard, type IGameStore } from "../../game.types"; // Типы для карт и состояния игры
import { initialGameData } from "../initial-data"; // Начальные данные игры
import shuffle from 'lodash/shuffle'; // Функция для перемешивания массива

// Функция для получения первых карт в руке игрока
const getFirstCards = (deck: IGameCard[]): IGameCard[] =>
  deck.map((card, index) => ({
    ...card, // Копируем свойства карты
    isOnHand: index < MAX_HAND_CARDS, // Устанавливаем, находится ли карта на руке
    isTaken: index < MAX_HAND_CARDS, // Устанавливаем, была ли карта взята
  }));

// Основная функция для начала игры
export const startGameAction = (): Partial<IGameStore> => {
  // Создаем и перемешиваем колоды для игрока и противника
  const playerInitialDeck = shuffle(createDeck('player'));
  const opponentInitialDeck = shuffle(createDeck('opponent'));

  return {
    ...initialGameData, // Возвращаем начальные данные игры
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
