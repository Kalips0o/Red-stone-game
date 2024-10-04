import { MAX_MANA } from "@/constants/game/core.constants";
import type { IGameCard, IGameStore, TPlayer } from "../game.types";
import { drawCardsAction } from "./draw-cards";
import { useNotificationStore } from "@/store/notiffication/notification.store";


// Функция для получения нового значения маны в зависимости от текущего хода
const getNewMana = (currentTurn: number) => {
  return Math.min(currentTurn, MAX_MANA);  // Максимальная мана ограничена MAX_MANA
};

// Обновление карт в конце хода (установка флага атаки и сброс флага хода)
const updateCardOnTheEndTurn = (deck: IGameCard[]) =>
  deck.map(card => ({
    ...card,
    isCanAttack: card.isOnBoard,  // Карты, находящиеся на поле, могут атаковать
    isPlayedThisTurn: false       // Сброс флага "сыграно в этом ходу"
  }));

// Экшен для завершения хода
export const endTurnAction = (state: IGameStore): Partial<IGameStore> => {

  // Определяем новый ход (если сейчас ход игрока, следующий будет оппонента и наоборот)
  const newTurn: TPlayer = state.currentTurn === "player" ? "opponent" : "player";

  // Проверяем, является ли новый ход ходом игрока
  const isNewTurnPlayer = newTurn === "player";

  // Если ход игрока, увеличиваем счетчик хода (turn)
  const newTurnNumber = isNewTurnPlayer ? state.turn + 1 : state.turn;

  // Устанавливаем значения маны для игрока и оппонента
  let newPlayerMana = state.player.mana;
  let newOpponentMana = state.opponent.mana;

  // Если следующий ход игрока, обновляем ману игрока и выводим уведомление
  if (isNewTurnPlayer) {
    newPlayerMana = getNewMana(newTurnNumber);
    useNotificationStore.getState().show('Your turn');  // Уведомление о начале хода игрока
  } else {
    // Иначе обновляем ману оппонента
    newOpponentMana = getNewMana(newTurnNumber);
  }

  // Обновляем состояние игры, изменяя игрока, оппонента, ход и колоды
  const updatedState = {
    ...state,
    currentTurn: newTurn,  // Изменение текущего хода
    player: {
      ...state.player,
      mana: newPlayerMana,  // Обновление маны игрока
      deck: updateCardOnTheEndTurn(state.player.deck)  // Обновление карт игрока
    },
    opponent: {
      ...state.opponent,
      mana: newOpponentMana,  // Обновление маны оппонента
      deck: updateCardOnTheEndTurn(state.opponent.deck)  // Обновление карт оппонента
    },
    turn: newTurnNumber  // Обновление номера хода
  };

  // Если ход оппонента, тянем карты для него
  if (!isNewTurnPlayer) {
    updatedState.opponent = {
      ...updatedState.opponent,
      deck: drawCardsAction(updatedState.opponent)  // Тянем карты для оппонента
    };
  } else {
    // Если ход игрока, тянем карты для игрока
    updatedState.player = {
      ...updatedState.player,
      deck: drawCardsAction(updatedState.player)  // Тянем карты для игрока
    };
  }

  return updatedState;  // Возвращаем обновленное состояние игры
};