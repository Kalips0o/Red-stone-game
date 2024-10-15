import { type IGameStore } from "../game.types";
import { useSoundStore } from "./hero-attack";

// Экшен для разыгрывания карты
export const playCardAction = (
    state: IGameStore, 
    cardId: string
) => {

    // Проверяем, ходит ли сейчас игрок
    const isPlayerTurn = state.currentTurn === 'player';

    // Определяем текущего игрока (игрок или оппонент)
    const currentPlayer = isPlayerTurn ? state.player : state.opponent;

    // Находим индекс карты в колоде по её ID
    const currentCardIndex = currentPlayer.deck.findIndex(
        card => card.id === cardId
    );

    // Получаем саму карту по её индексу
    const currentCard = currentPlayer.deck[currentCardIndex];



    // Проверяем, есть ли карта и достаточно ли у игрока маны для её разыгрывания
    if (currentCard && currentPlayer.mana >= currentCard.mana) {
       
        // Карта разыгрывается на поле (isOnBoard = true)
        currentCard.isOnBoard = true;

        // Отмечаем, что карта была разыграна в текущем ходу
        currentCard.isPlayedThisTurn = true;

        // Карта больше не находится в руке (isOnHand = false)
        currentCard.isOnHand = false;

        // Вычитаем стоимость карты из маны игрока
        currentPlayer.mana -= currentCard.mana;

        // Удаляем карту из её текущей позиции в колоде
        currentPlayer.deck.splice(currentCardIndex, 1);

        // Добавляем карту в конец колоды (обновляем её местоположение)
        currentPlayer.deck.push(currentCard);

        // Воспроизводим звук выкладывания карты на стол
        useSoundStore.getState().playCardOnTable();

        // Логируем успешное разыгрывание карты
        console.log(`Карта ${currentCard.name} разыграна успешно.`);
    } else {
        console.log(`Недостаточно маны для разыгрывания карты ${currentCard.name}. Требуется: ${currentCard.mana}, Доступно: ${currentPlayer.mana}`);
    }

    // Возвращаем обновленное состояние для игрока и оппонента
    return {
        player: isPlayerTurn ? currentPlayer : state.player,  // Если ход игрока, обновляем игрока
        opponent: isPlayerTurn ? state.opponent : currentPlayer  // Если ход оппонента, обновляем оппонента
    };
}
