import { Badge } from '@/components/ui/Badge';
import { MAX_HP } from '@/constants/game/core.constants';
import type { IHero, TPlayer } from '@/store/game/game.types';
import cn from 'clsx';
import { useEnemyTarget } from '../board-card/useEnemyTarget';
import { useGameStore } from '@/store/game/game.store';
import { useSelectAttacker } from '@/store/game/actions/select-attacker';
import { EnumTypeCard } from '@/card.types';
import { DamageList } from '../DamageList';
import { useState, useEffect } from 'react';


import './Player.scss';
import StunnedAnimation from './StunnedAnimation';

interface Props {
  player: Omit<IHero, 'deck'>;
  typePlayer: TPlayer;
}

export function PlayerInfo({ player, typePlayer }: Props) {
  const { cardAttackerId } = useSelectAttacker();
  const { handleSelectTarget } = useEnemyTarget();
  const { currentTurn, opponent } = useGameStore();
  const [isShaking, setIsShaking] = useState(false);

  const opponentTaunt = opponent.deck.find(
    (card) => card.type === EnumTypeCard.taunt && card.isOnBoard
  );

  const isPlayer = typePlayer === 'player';
  const isStunned = player.health <= 0;

  const handleClick = () => {
    if (!isPlayer && cardAttackerId && !opponentTaunt && !isStunned) {
      handleSelectTarget(typePlayer, true);
      if (!isPlayer) {
        setIsShaking(true);
      }
    }
  };

  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  const getHeroImage = () => {
    if (isPlayer) {
      return isStunned ? '/assets/heroes/playerLose.png' : '/assets/heroes/player.png';
    } else {
      return isStunned ? '/assets/heroes/opponentLose.png' : '/assets/heroes/opponent.png';
    }
  };

  return (
    <button
      className={cn(
        'absolute z-[1] border-4 border-transparent transition-colors rounded-full cursor-default player-info',
        {
          'player-info--left': isPlayer,
          'player-info--right ': !isPlayer,
          '!border-red-500 !cursor-pointer shadow-[0_0_15px_5px_rgba(255,0,0,0.7)]': !isPlayer && cardAttackerId && !opponentTaunt && !isStunned,
        }
      )}
      disabled={isPlayer || currentTurn === 'opponent' || isStunned}
      onClick={handleClick}
    >
      <div className="relative player-image-container">
        <img
          className={cn(
            " player-image", 
            { 
              'player-image--player': isPlayer,
              'player-image--opponent rounded-full': !isPlayer,
              'shake': !isPlayer && isShaking 
            }
          )}
          src={getHeroImage()}
          alt="avatar"
          draggable={false}
        />
        
        {isStunned && <StunnedAnimation isPlayer={isPlayer} />}
      </div>
    
      <div
        className={cn(
          'absolute w-full flex justify-center items-center player-health',
          isPlayer ? 'player-health--player' : 'player-health--opponent'
        )}
      >
        <Badge value={player.health} color="red" maxValue={MAX_HP} />
      </div>
    
      <DamageList id={typePlayer} isRight={isPlayer} />
    </button>
  );
}
