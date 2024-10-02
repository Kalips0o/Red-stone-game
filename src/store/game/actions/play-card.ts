import { type IGameStore } from "../game.types";

export const playCardAction = (
    state:IGameStore, 
    cardId:string
):Partial<IGameStore> => {

   const currentPlayer = 
   state.currentTurn === 'player' ? state.player : state.opponent;

   const currentCard = currentPlayer.deck.find(card => card.id === cardId);


   if (currentCard && currentPlayer.mana >= currentCard.mana) {
    currentCard.isOnBoard=true
    currentCard.isPlayedThisTurn=true
    currentCard.isOnHand=false

    currentPlayer.mana -= currentCard.mana

    }
    return state.currentTurn === 'player' ?  {player:currentPlayer} : {opponent:currentPlayer}
}