import type { IGameCard } from "@/store/game/game.types";
import { motion } from "framer-motion";
import cn from 'clsx';
import { useGameStore } from "@/store/game/game.store";

interface Props {
  card: IGameCard;
}

export function BoardCard({ card }: Props) {
  const {returnCard} = useGameStore()
  
  return (
    <motion.button
      className={cn("h-[11.3rem] w-32 rounded-lg border-2 border-solid", {
        'border-transparent': !card.isCanAttack,
        'border-green-500 shadow-2xl ': card.isCanAttack,
      })}
      initial={{ scale: 0.5, rotate: -15, y: -200, opacity: 0 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: 0,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 1 }}
      onClick={
        card.isCanAttack
        ? ()=>console.log('attack')
        : ()=>returnCard(card.id)
      }
    >
      <img alt={card.name} src={card.imageUrl} draggable="false" />
    </motion.button>
  );
}
