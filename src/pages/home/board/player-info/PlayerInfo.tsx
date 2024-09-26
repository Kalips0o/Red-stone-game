import { Badge } from '@/components/ui/Badge';
import { MAX_HP } from '@/constants/game/core.constants';
import type { IHero, TPlayer } from '@/store/game/game.types';
import cn from 'clsx';

interface Props {
  player: Omit<IHero, 'deck'>;
  typePlayer: TPlayer;
}

export function PlayerInfo({ player, typePlayer }: Props) {
  const isPlayer = typePlayer === 'player';
  return (
    <div
   className={cn('absolute', {
        'left-9 -bottom-1': isPlayer,
        'right-10 top-1': !isPlayer,
      })}
    >
      <img 
      width={200}
      src={isPlayer ? '/src/assets/heroes/player.png' : '/src/assets/heroes/opponent.png'}
       alt="avatar" draggable={false}/>
    
    <div className={cn('absolute  w-full flex justify-center items-center', 
 isPlayer ? 'bottom-2.5' : '-bottom-1'
    )}>
      <Badge value={player.health}   color='red'  maxValue={MAX_HP} />
      </div>
  
      </div>
  );
}
