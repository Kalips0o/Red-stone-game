import { type IGameStore } from "../game.types";
import { useSoundStore } from "./hero-attack";

export const playCardAction = (
    state: IGameStore, 
    cardId: string
) => {
    const isPlayerTurn = state.currentTurn === 'player';
    const currentPlayer = isPlayerTurn ? state.player : state.opponent;
    const currentCardIndex = currentPlayer.deck.findIndex(
        card => card.id === cardId
    );
    const currentCard = currentPlayer.deck[currentCardIndex];

    if (currentCard && currentPlayer.mana >= currentCard.mana) {
        currentCard.isOnBoard = true;
        currentCard.isPlayedThisTurn = true;
        currentCard.isOnHand = false;
        currentPlayer.mana -= currentCard.mana;
        currentPlayer.deck.splice(currentCardIndex, 1);
        currentPlayer.deck.push(currentCard);
        useSoundStore.getState().playCardOnTable();
        console.log(`Карта ${currentCard.name} разыграна успешно.`);
    } else {
        console.log(`Недостаточно маны для разыгрывания карты ${currentCard.name}. Требуется: ${currentCard.mana}, Доступно: ${currentPlayer.mana}`);
    }

    return {
        player: isPlayerTurn ? currentPlayer : state.player,
        opponent: isPlayerTurn ? state.opponent : currentPlayer
    };
}
