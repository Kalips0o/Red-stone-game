import type { IGameCard, TPlayer } from './game.types'
import {CARDS} from "../../constants/game/cards.constants";

export function createDeck(typePlayer: TPlayer): IGameCard[] {
    return CARDS.map((card, index) => ({
        ...card,
        id: index + 1 + '' + typePlayer,
        isPlayedThisTurn: false,
        isTaken: false,
        isOnBoard: false,
        isCanAttack: false,
        isOnHand: false,
    }))
}
