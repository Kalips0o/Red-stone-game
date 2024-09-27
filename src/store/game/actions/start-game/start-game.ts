import { MAX_HAND_CARDS } from "@/constants/game/core.constants";
import { createDeck } from "../../create-deck";
import { type IGameCard, type IGameStore } from "../../game.types";
import { initialGameData } from "../initial-data";
import shuffle from 'lodash/shuffle'

export const startGameAction = ():Partial<IGameStore> => {

const getFirstCards = (deck:IGameCard[]):IGameCard[]=> deck.map((card, index)=>({
        ...card,
        isOnHand: index < MAX_HAND_CARDS,
        isTaken: index < MAX_HAND_CARDS,
    }))
const deck = createDeck()
const playerInitialDeck = shuffle(deck)
const opponentInitialDeck = shuffle(deck)

    return {
        ...initialGameData, 
        player: {
            ...initialGameData.player,
            deck: getFirstCards(playerInitialDeck),
           
        },
        opponent: {
            ...initialGameData.opponent,
            deck: getFirstCards(opponentInitialDeck),
        
        },
    }
}