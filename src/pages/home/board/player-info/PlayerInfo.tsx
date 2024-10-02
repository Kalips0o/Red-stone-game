import { Badge } from '@/components/ui/Badge';
import { MAX_HP } from '@/constants/game/core.constants';
import type { IHero, TPlayer } from '@/store/game/game.types';
import cn from 'clsx';
import { useEnemyTarget } from '../board-card/useEnemyTarget';
import { useGameStore } from '@/store/game/game.store';
import { useSelectAttacker } from '@/store/game/actions/select-attacker';
import { EnumTypeCard } from '@/card.types';
import { DamageList } from '../DamageList';

interface Props {
  player: Omit<IHero, 'deck'>;
  typePlayer: TPlayer;
}

export function PlayerInfo({ player, typePlayer }: Props) {
  const {cardAttackerId}=useSelectAttacker()
   const {handleSelectTarget} = useEnemyTarget()
  const {currentTurn, opponent} = useGameStore()

  const opponentTaunt = opponent.deck.find(
    card => card.type === EnumTypeCard.taunt && card.isOnBoard
  )

  const isPlayer = typePlayer === 'player';

 

  return (
    <button
   className={cn('absolute z-[1] border-2 border-transparent  transition-colors', {
        'left-9 -bottom-1': isPlayer,
        'right-10 top-1': !isPlayer,
        '!border-red-400': !isPlayer && cardAttackerId && !opponentTaunt
      })}

      disabled={isPlayer || currentTurn === "opponent"}

      onClick={()=>isPlayer ? null : handleSelectTarget(undefined, true)}
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

  <DamageList id={typePlayer} isRight={isPlayer}/>

      </button>
  );
}
