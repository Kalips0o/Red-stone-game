import type { IGameCard, TPlayer } from './game.types'
import { CARDS } from "../../constants/game/cards.constants"

// Функция создания колоды для игрока
export function createDeck(typePlayer: TPlayer): IGameCard[] {
    // Проходим по каждой карте из набора CARDS
    return CARDS.map((card, index) => ({
        // Копируем свойства карты
        ...card,

        // Присваиваем уникальный идентификатор карте, комбинируя индекс карты и тип игрока (например, "1player1")
        id: index + 1 + '' + typePlayer,

        // Карта еще не разыграна в этом ходу
        isPlayedThisTurn: false,

        // Карта не взята в руку
        isTaken: false,

        // Карта не на поле
        isOnBoard: false,

        // Карта пока не может атаковать
        isCanAttack: false,

        // Карта не находится в руке игрока
        isOnHand: false,
    }))
}
