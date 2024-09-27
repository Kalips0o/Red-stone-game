import { MAX_HAND_CARDS } from "@/constants/game/core.constants";
import type {  IGameCard, IGameStore } from "../game.types";

export const drawCardsAction =(state:IGameStore)=>{

const currentPlayer = state.currentTurn === 'player' ? state.player : state.opponent

const cardOnHands = currentPlayer.deck.filter(card => card.isOnHand).length

 const cardNeeded = MAX_HAND_CARDS - cardOnHands


 let drawCards = 0
 const updatedDeck =currentPlayer.deck.map((card:IGameCard)=>{
    
    if (!card.isTaken && !card.isOnHand && drawCards < cardNeeded){
       drawCards++
       return {...card, isOnHand:true, isTaken:true}
    }
    return card
 })


 return {updatedDeck}
}