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
   className={cn('absolute left-3', {
        'bottom-5': isPlayer,
        'top-5': !isPlayer,
      })}
    >
      <h1>{isPlayer ? 'Player' : 'Opponent'}</h1>
      <p>HP: {player.health}</p>
      <p>Mana: {player.mana}</p>
    </div>
  );
}
