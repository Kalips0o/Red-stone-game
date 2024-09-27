import { type IGameStore } from "../game.types";

export const returnCardAction = (
    state:IGameStore, 
    cardId:number):Partial<IGameStore> => {
        const isPlayerTurn = state.currentTurn === "player"
   const currentPlayer = isPlayerTurn ? state.player : state.opponent;
   const currentCard = currentPlayer.deck.find(card => card.id === cardId);

   if (currentCard && currentCard.isOnBoard) {
    currentCard.isOnBoard=false
    currentPlayer.mana += currentCard.mana
    }
    return isPlayerTurn ?  {player:currentPlayer} : {opponent:currentPlayer}
}