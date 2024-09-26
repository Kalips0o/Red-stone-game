import type { IGameCard } from "@/store/game/game.types";
import { motion } from "framer-motion";
import cn from 'clsx';

interface Props {
  card: IGameCard;
}

export function BoardCard({ card }: Props) {
  return (
    <motion.button
      className={cn("h-[11.3rem] w-32 shadow-2xl rounded-lg border-2 border-solid", {
        'border-transparent': !card.isCanAttack,
        'border-green-500': card.isCanAttack,
      })}
      initial={{ scale: 0.5, rotate: -15, y: -200, opacity: 0 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: 0,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 1 }}
    >
      <img alt={card.name} src={card.imageUrl} draggable="false" />
    </motion.button>
  );
}
