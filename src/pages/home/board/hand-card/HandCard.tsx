import cn from 'clsx';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useState } from 'react';

import { getStyleRotation } from '@/pages/home/board/hand-card/get-style-rotation.ts';
import type { ICard } from '@/card.types';


interface Props {
  card: ICard;
  onClick?: () => void;
  isDisabled?: boolean;
  isHided?: boolean;
  style?: CSSProperties;
  index: number;
  arrayLength: number;
}

export function HandCard({
  card,
  onClick,
  isDisabled,
  isHided,
  style,
  index,
  arrayLength
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const { rotate, translateY } = getStyleRotation(index, arrayLength, !isHided);

  const initialAnimation = {
    scale: 1,
    zIndex: 0,
    y: translateY,
    rotate
  };

  return (
    <motion.button
      className={cn(
        'h-[8.5rem] w-24 inline-block -ml-6  rounded-lg  will-change-transform relative ',
        {
         ' shadow ' : !isHided,
         'cursor-pointer' : !isHided && !isDisabled 
    
        }
      )}
      style={style}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1, zIndex: 0, y: 0 }}
      animate={
        isHovered && !isHided
          ? {
              scale: 1.3,
              zIndex: 10,
              y: -95
            }
          : initialAnimation
      }
      transition={{ type:'just', stiffness: 230, damping: 32 }}
    >
      {isDisabled && (<div className='absolute top-0 left-0 w-full h-full bg-black/60 z-[1] rounded-lg' />) }
      <img
        src={isHided ? '/src/assets/cards/cover.png' : card.imageUrl}
        alt={card.name}
        draggable="false"
        className="will-change-transform"
      />
    </motion.button>
  );
}
