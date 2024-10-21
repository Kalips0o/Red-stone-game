import cn from 'clsx';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useState } from 'react';

import { getStyleRotation } from '@/pages/home/board/hand-card/get-style-rotation.ts';
import type { ICard } from '@/card.types';
import { useGameStore } from '@/store/game/game.store';
import { Card } from '@/components/cards/Card';

interface Props {
  card: ICard;
  onClick?: () => void;
  isDisabled?: boolean;
  isHided?: boolean;
  isOpponent?: boolean; 
  style?: CSSProperties;
  index: number;
  arrayLength: number;
}

export function HandCard({
  card,
  onClick,
  isDisabled,
  isHided,
  isOpponent,
  style,
  index,
  arrayLength,
}: Props) {
  const { currentTurn, player } = useGameStore();
  const [isHovered, setIsHovered] = useState(false);

  const { rotate, translateY } = getStyleRotation(index, arrayLength, !isHided);

  const isDisabledButton = isDisabled || (currentTurn !== 'player' && !isHided);

  const initialAnimation = {
    scale: 1,
    zIndex: 0,
    y: translateY,
    rotate,
  };

  return (
    <motion.button
      className={cn(
        'h-[8.5rem] w-24 inline-block -ml-6 rounded-lg will-change-transform relative',
        {
          'shadow -ml-7': !isHided,
          '-ml-[2.15rem]': isHided,
          'cursor-pointer': !isHided && !isDisabledButton,
          'border-green-400':
            !isHided && currentTurn === 'player' && player.mana >= card.mana,
        }
      )}
      style={style}
      disabled={isDisabledButton}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1, zIndex: 0, y: 0 }}
      animate={
        isHovered && !isHided
          ? {
              scale: 1.3,
              zIndex: 10,
              y: -95,
            }
          : initialAnimation
      }
      transition={{ type: 'just', stiffness: 230, damping: 32 }}
    >
      {isDisabledButton && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/60 z-[1] rounded-lg' />
      )}
    
      <Card
        mana={isOpponent ? undefined : card.mana}
        attack={isOpponent ? undefined : card.attack}
        health={isOpponent ? undefined : card.health}
        imageUrl={isHided ? '/assets/cards/cover.png' : card.imageUrl}
        isInHand={true}
        isHovered={isHovered}
      />
    </motion.button>
  );
}
