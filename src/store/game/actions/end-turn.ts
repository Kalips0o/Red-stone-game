import { MAX_MANA } from "@/constants/game/core.constants";
import type { IGameCard, IGameStore, TPlayer } from "../game.types";
import { drawCardsAction } from "./draw-cards";

const getNewMana = (newTurn:TPlayer, currentTurn:number)=>{
    return newTurn === "player"
    ? Math.min (currentTurn, MAX_MANA)
    : currentTurn
    
}

const updateAttack = (deck: IGameCard[])=>deck.map((card)=>({
    ...card,
    isCanAttack: card.isOnBoard
}))

export const endTurnAction = (get: () => IGameStore):Partial <IGameStore >=> {
    const state = get();
    const newTurn: TPlayer = state.currentTurn === "player" ? "opponent" : "player";
  
    const newPlayerMana = getNewMana('player', state.turn);
    const newOpponentMana = getNewMana('opponent', state.turn);

  
  
    return {
      currentTurn: newTurn,
      player: {
        ...state.player,
        mana: newPlayerMana,
        deck: updateAttack(newTurn === 'player' ? drawCardsAction(state).updatedDeck : state.player.deck)
      },
      opponent: {
        ...state.opponent,
        mana: newOpponentMana,
        deck: updateAttack(newTurn === 'opponent' ? drawCardsAction(state).updatedDeck : state.opponent.deck)
      },
       turn: state.turn + 1,
    };
   
  };