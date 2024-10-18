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
  // Если игра уже завершена или у игрока 0 HP, не выполняем никаких действий
  if (state.isGameOver || state.player.health <= 0) {
    return state;
  }

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
  if (isNewTurnPlayer && !state.isGameOver) {
    newPlayerMana = getNewMana(newTurnNumber);
    // Проверяем, что игра не закончена и здоровье игрока больше 0 перед показом уведомления
    if (state.player.health > 0) {
      useNotificationStore.getState().show('Your turn');  // Уведомление о начале хода игрока
    }
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

  // Проверяем, остались ли карты у игроков (на поле, в руке или в колоде)
  const playerHasCards = updatedState.player.deck.length > 0;
  const opponentHasCards = updatedState.opponent.deck.length > 0;

  if (!playerHasCards || !opponentHasCards) {
    updatedState.isGameOver = true;
    updatedState.isGameStarted = false;

    const winner = playerHasCards ? 'player' : 'opponent';
    const message = winner === 'player' ? 'You win!' : 'You lose!';
    
    useNotificationStore.getState().show(message, winner === 'player' ? 'win' : 'lose');

    return updatedState;
  }

  // Если ход оппонента и у игрока 0 HP, не переходим к ходу игрока
  if (!isNewTurnPlayer && state.player.health <= 0) {
    return state;
  }

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

  // Проверяем здоровье игроков перед возвратом обновленного состояния
  if (updatedState.player.health <= 0 || updatedState.opponent.health <= 0) {
    updatedState.isGameOver = true;
    updatedState.isGameStarted = false;

    const winner = updatedState.player.health > 0 ? 'player' : 'opponent';
    const message = winner === 'player' ? 'You win!' : 'You lose!';
    
    useNotificationStore.getState().show(message, winner === 'player' ? 'win' : 'lose');
  }

  return updatedState;  // Возвращаем обновленное состояние игры
};
