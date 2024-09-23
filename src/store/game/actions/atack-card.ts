import type { IGameCard, IGameStore } from "../game.types";

export const getCardById = (cardId: string, deck: IGameCard[]) => {
    return deck.find(card => card.id.toString() === cardId)
}

export const attackCardAction =(state:IGameStore, targetId:number, attackerId:number)=>{
    const isAttackerPlayer = state.currentTurn === 'player'


const attacker = getCardById(
    attackerId.toString(),
    isAttackerPlayer ? state.player.deck : state.opponent.deck
)

const target = getCardById(
    targetId.toString(),
    isAttackerPlayer ? state.opponent.deck : state.player.deck
)

if(attacker && target  && attacker.isCanAttack){
   target.health -= attacker.attack
   attacker.isCanAttack = false
}

if(target && target.health <= 0){
    if(isAttackerPlayer){
        state.opponent.deck = state.opponent.deck.filter(card => card.id !== targetId)
    }else{
        state.player.deck = state.player.deck.filter(card => card.id !== targetId)
    }
}
return {player:state.player, opponent:state.opponent}
}