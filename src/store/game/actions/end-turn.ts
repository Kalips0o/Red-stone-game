import { MAX_MANA } from "@/constants/game/core.constants";
import type { IGameCard, IGameStore, TPlayer } from "../game.types";
import { drawCardsAction } from "./draw-cards";
import { useNotificationStore } from "@/store/notiffication/notification.store";

const getNewMana = (currentTurn: number) => {
  return Math.min(currentTurn, MAX_MANA);
};

const updateCardOnTheEndTurn = (deck: IGameCard[]) =>
  deck.map(card => ({
    ...card,
    isCanAttack: card.isOnBoard,
    isPlayedThisTurn: false
  }));

export const endTurnAction = (state: IGameStore): Partial<IGameStore> => {
  if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
    return state;
  }

  const newTurn: TPlayer = state.currentTurn === "player" ? "opponent" : "player";

  const isNewTurnPlayer = newTurn === "player";

  const newTurnNumber = isNewTurnPlayer ? state.turn + 1 : state.turn;

  let newPlayerMana = state.player.mana;
  let newOpponentMana = state.opponent.mana;

  if (isNewTurnPlayer) {
    newPlayerMana = getNewMana(newTurnNumber);
  } else {
    newOpponentMana = getNewMana(newTurnNumber);
  }

  const updatedState = {
    ...state,
    currentTurn: newTurn,
    player: {
      ...state.player,
      mana: newPlayerMana,
      deck: updateCardOnTheEndTurn(state.player.deck)
    },
    opponent: {
      ...state.opponent,
      mana: newOpponentMana,
      deck: updateCardOnTheEndTurn(state.opponent.deck)
    },
    turn: newTurnNumber
  };

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

  if (!isNewTurnPlayer && state.player.health <= 0) {
    return state;
  }

  if (!isNewTurnPlayer) {
    updatedState.opponent = {
      ...updatedState.opponent,
      deck: drawCardsAction(updatedState.opponent)
    };
  } else {
    updatedState.player = {
      ...updatedState.player,
      deck: drawCardsAction(updatedState.player)
    };
  }

  if (updatedState.player.health <= 0 || updatedState.opponent.health <= 0) {
    updatedState.isGameOver = true;
    updatedState.isGameStarted = false;

    const winner = updatedState.player.health > 0 ? 'player' : 'opponent';
    const message = winner === 'player' ? 'You win!' : 'You lose!';
    
    useNotificationStore.getState().show(message, winner === 'player' ? 'win' : 'lose');
  } else if (isNewTurnPlayer && !updatedState.isGameOver) {
    useNotificationStore.getState().show('Your turn');
  }

  return updatedState;
};
