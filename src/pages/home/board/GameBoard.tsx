import {useGameStore} from "../../../store/game/game.store";
import { GridBoardCards } from "./board-card/GridBoardCard";
import { HandCard } from "./hand-card/HandCard";
import { PlayerInfo } from "./PlayerInfo";

export function GameBoard() {
  const { player, opponent, playCard } = useGameStore();

  return (
    <div
      className="relative h-screen w-full grid grid-rows-2"
      style={{ gridTemplateRows: '1fr 1fr' }}
    >
      <section className="pt-36">
        <div>
          <PlayerInfo player={opponent} typePlayer="opponent" />
          <div className="-top-12 absolute w-full">
            <div className="flex items-center justify-center">
              {opponent.deck
                .filter(card => !card.isOnBoard)
                .slice(0, 6)
                .map((card, index, array) => (
                  <HandCard
                    key={card.id}
                    card={card}
                    arrayLength={array.length}
                    index={index}
                    onClick={() => playCard(card.id)}
                    isHided
                  />
                ))}
            </div>
          </div>
        </div>

         <GridBoardCards deck={opponent.deck} />
      </section>

    <hr/>

      <section className="pb-36">
      <GridBoardCards deck={player.deck} />
        <PlayerInfo player={player} typePlayer="player" />
        <div className="-bottom-10 absolute w-full">
          <div className="flex items-center justify-center">
            {player.deck
              .filter(card => !card.isOnBoard)
              .slice(0, 6)
              .map((card, index, array) => (
                <HandCard
                  key={card.id}
                  card={card}
                  arrayLength={array.length}
                  index={index}
                  onClick={() => playCard(card.id)}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
