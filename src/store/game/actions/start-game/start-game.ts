import { MAX_HAND_CARDS } from "@/constants/game/core.constants";
import { createDeck } from "../../create-deck";
import { type IGameCard, type IGameStore } from "../../game.types";
import { initialGameData } from "../initial-data";
import shuffle from 'lodash/shuffle'


const getFirstCards = (deck:IGameCard[]):IGameCard[]=> deck.map((card, index)=>({
        ...card,
        isOnHand: index < MAX_HAND_CARDS,
        isTaken: index < MAX_HAND_CARDS,
    }))



export const startGameAction = ():Partial<IGameStore> => {


const playerInitialDeck = shuffle(createDeck('player'))
const opponentInitialDeck = shuffle(createDeck('opponent'))

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