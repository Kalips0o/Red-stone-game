import React from 'react';
import type { ICard } from '@/card.types';
import type { IGameCard } from '@/store/game/game.types';
import './Cards.scss';
import { motion } from 'framer-motion';

type CardStatsProps = Pick<ICard | IGameCard, 'imageUrl'> & {
  mana?: number;
  attack?: number;
  health?: number;
  isInHand?: boolean;
  isHovered?: boolean;
  isOnBoard?: boolean;
};

const cardContainerVariants = {
  initial: (isOnBoard: boolean) => ({
    scale: isOnBoard ? 0.8 : 1,
    y: isOnBoard ? 50 : 0,
    opacity: isOnBoard ? 0 : 1,
  }),
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const statsVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.2,
    }
  },
};

export const Card: React.FC<CardStatsProps> = ({ 
  mana, 
  attack, 
  health, 
  imageUrl, 
  isInHand = false, 
  isHovered = false,
  isOnBoard = false
}) => {
  return (
    <motion.div 
      className='relative w-full h-full overflow-hidden rounded-lg'
      variants={cardContainerVariants}
      initial="initial"
      animate="animate"
      custom={isOnBoard}
    >
      <img 
        src={imageUrl} 
        alt='cover' 
        className='absolute top-0 left-0 w-full h-full object-cover'
      />
      <motion.div 
        className={`absolute top-0 left-0 w-full h-full ${isHovered ? 'z-20' : 'z-10'}`}
        variants={statsVariants}
        initial="initial"
        animate="animate"
      >
        {mana !== undefined && (
          <div className={`mana absolute top-1 left-1 ${isInHand ? 'mana-in-hand' : ''}`}>
            {mana}
          </div>
        )}
        {attack !== undefined && (
          <div className={`attack absolute bottom-1 left-1 ${isInHand ? 'attack-in-hand' : ''}`}>
            {attack}
          </div>
        )}
        {health !== undefined && (
          <div className={`health absolute bottom-1 right-1 ${isInHand ? 'health-in-hand' : ''}`}>
            {health}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
