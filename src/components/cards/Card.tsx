import React from 'react';
import type { ICard } from '@/card.types';
import type { IGameCard } from '@/store/game/game.types';
import './Cards.scss';

type CardStatsProps = Pick<ICard | IGameCard, 'mana' | 'attack' | 'health' | 'imageUrl'> & {
  isInHand?: boolean;
  isHovered?: boolean;
};

export const Card: React.FC<CardStatsProps> = ({ mana, attack, health, imageUrl, isInHand = false, isHovered = false }) => {
  return (
    <div className='relative w-full h-full'>
      <img 
        src={imageUrl} 
        alt='cover' 
        draggable="false" 
        className='absolute top-0 left-0 w-full h-full object-cover'
      />
      <div className={`absolute top-0 left-0 w-full h-full ${isHovered ? 'z-20' : 'z-10'}`}>
        <div className={`mana absolute top-1 left-1 ${isInHand ? 'mana-in-hand' : ''}`}>
          {mana}
        </div>
        <div className={`attack absolute bottom-1 left-1 ${isInHand ? 'attack-in-hand' : ''}`}>
          {attack}
        </div>
        <div className={`health absolute bottom-1 right-1 ${isInHand ? 'health-in-hand' : ''}`}>
          {health}
        </div>
      </div>
    </div>
  );
};
