import { type IGameStore } from "../game.types";

// Экшен для возврата карты в руку
export const returnCardAction = (
    state: IGameStore, 
    cardId: string
): Partial<IGameStore> => {

    // Определяем текущего игрока, в зависимости от того, чей сейчас ход (игрок или противник)
    const currentPlayer = state.currentTurn === "player" ? state.player : state.opponent;

    // Находим карту в колоде текущего игрока по её id
    const currentCard = currentPlayer.deck.find(card => card.id === cardId);

    // Если карта найдена и находится на игровом поле (isOnBoard = true)
    if (currentCard && currentCard.isOnBoard) {
        // Убираем карту с поля (isOnBoard = false)
        currentCard.isOnBoard = false;

        // Возвращаем карту в руку (isOnHand = true)
        currentCard.isOnHand = true;

        // Возвращаем ману игроку за эту карту
        currentPlayer.mana += currentCard.mana;
    }

    // Возвращаем обновленное состояние игрока в зависимости от того, чей это ход
    return state.currentTurn === 'player' 
        ? { player: currentPlayer } 
        : { opponent: currentPlayer };
}
