import React from 'react';
import type { ICard } from '@/card.types';
import type { IGameCard } from '@/store/game/game.types';
import './Cards.scss';

type CardStatsProps = Pick<ICard | IGameCard, 'mana' | 'attack' | 'health' | 'imageUrl'> & {
  isInHand?: boolean;
};

export const Card: React.FC<CardStatsProps> = ({ mana, attack, health, imageUrl, isInHand = false }) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      <img src={imageUrl} alt='cover' draggable="false" />
      <div className={`mana ${isInHand ? 'mana-in-hand' : ''}`}>
        {mana}
      </div>
      <div className={`attack ${isInHand ? 'attack-in-hand' : ''}`}>
        {attack}
      </div>
      <div className={`health ${isInHand ? 'health-in-hand' : ''}`}>
        {health}
      </div>
    </div>
  );
};
