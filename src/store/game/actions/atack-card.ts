import type { IGameCard, IGameStore } from "../game.types";
import { useDamageStore } from "./damage.store";
export const getCardById = (cardId: string, deck: IGameCard[]) => {
    return deck.find(card => card.id === cardId)
}

export const attackCardAction =(state:IGameStore, targetId:string, attackerId:string)=>{
    const isAttackerPlayer = state.currentTurn === 'player'


const attacker = getCardById(
    attackerId,
    isAttackerPlayer ? state.player.deck : state.opponent.deck
)

const target = getCardById(
    targetId,
    isAttackerPlayer ? state.opponent.deck : state.player.deck
)

if(attacker && target  && attacker.isCanAttack) {
   target.health -= attacker.attack
   attacker.isCanAttack = false

useDamageStore.getState().addDamage(targetId, attacker.attack)


if(target && target.health <= 0){
    if(isAttackerPlayer){
        state.opponent.deck = state.opponent.deck.filter(card => card.id !== targetId)
    } else {
        state.player.deck = state.player.deck.filter(card => card.id !== targetId

        )
    }
}
}
return {player:state.player, opponent:state.opponent}
}