import type { IGameCard } from "@/store/game/game.types";
import { motion } from "framer-motion";
import cn from 'clsx';
import { useGameStore } from "@/store/game/game.store";
import { useEnemyTarget } from "./useEnemyTarget";
import { useSellectAttacker } from "@/store/game/actions/select-attacker";

interface Props {
  card: IGameCard;
  isPlayerSide: boolean
}

export function BoardCard({ card, isPlayerSide }: Props) {
  const {returnCard, currentTurn} = useGameStore()
  const {handleSelectTarget} = useEnemyTarget()
  const {setCardAttackerId, cardAttackerId} = useSellectAttacker()

  const handleClick = (cardId: number) => {
  
   if(isPlayerSide){
    if(card.isCanAttack){
      setCardAttackerId(cardId)
    }
    else if (card.isPlayedThisTurn){
      returnCard(cardId)
    }
    else {
      handleSelectTarget(cardId)
    }
   }
  }

  const isSelectPlayerAttacker = isPlayerSide && cardAttackerId === card.id
  
  return (
    <motion.button
      className={cn("h-[11.3rem] w-32 rounded-lg border-2 border-transparent border-solid transition-colors", {
      
    

        '!border-green-400 shadow-2xl':
        card.isCanAttack &&
        !isSelectPlayerAttacker && 
        isPlayerSide &&
        currentTurn === "player",

        '!border-primary shadow-2xl': isSelectPlayerAttacker,
        '!border-red-400': !isPlayerSide && cardAttackerId,
        'cursor-not-allowed': currentTurn !== 'player'
      })}
      initial={{ scale: 0.5, rotate: -15, y: -200, opacity: 0 }}
      animate={{
        scale:  1,
        rotate: 0,
        y: 0,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 1 }}
      onClick={()=> currentTurn !== 'player' ? null : handleClick(card.id)}
    >
      <img alt={card.name} src={card.imageUrl} draggable="false" />
    </motion.button>
  );
}
