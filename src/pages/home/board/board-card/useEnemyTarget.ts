
import { useSellectAttacker } from "@/store/game/actions/select-attacker"
import { useGameStore } from "@/store/game/game.store"


export function useEnemyTarget(){
const {attackHero, attackCard, currentTurn} = useGameStore()
const {cardAttackerId, setCardAttackerId} = useSellectAttacker()


const handleSelectTarget = (targetId?: number, isHero = false) => {
    if(!cardAttackerId) return
    if(currentTurn !== "player") return

if(isHero){
    attackHero(cardAttackerId)
} else if(targetId){
    attackCard(cardAttackerId, targetId)
}
setCardAttackerId(null)
}

return {handleSelectTarget}
}