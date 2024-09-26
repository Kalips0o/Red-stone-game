import { MAX_HAND_CARDS, MAX_MANA } from "@/constants/game/core.constants";
import {useGameStore} from "../../../store/game/game.store";
import { GridBoardCards } from "./board-card/GridBoardCard";
import { HandCard } from "./hand-card/HandCard";
import { PlayerInfo } from "./player-info/PlayerInfo";
import { PlayerMana } from "./player-info/PlayerMana";
import { AudioPlayer } from "./audio-player/AudioPlayer";
import { EndTurnButton } from "./EndTurnButton";

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

          <PlayerMana currentMana={opponent.mana} maxMana={MAX_MANA} typePlayer={"opponent"} />
          
          <div className="-top-12 absolute w-full">
            <div className="flex items-center justify-center">
              {opponent.deck
                .filter(card => !card.isOnBoard)
                .slice(0, MAX_HAND_CARDS)
                .map((card, index, array) => (
                  <HandCard
                    key={card.id}
                    card={card}
                    arrayLength={array.length}
                    index={index}
                    isHided
                
                  />
                ))}
            </div>
          </div>
        </div>

         <GridBoardCards deck={opponent.deck} />
      </section>


<div className="flex items-center justify-center">
  <hr  className="border-yellow-500 opacity-20 w-11/12"/>
  <EndTurnButton/>
</div>

      <section className="pb-36">
      <GridBoardCards deck={player.deck} />
      
        <PlayerInfo player={player} typePlayer="player" />

        <PlayerMana currentMana={player.mana} maxMana={MAX_MANA} typePlayer={"player"} />
        <AudioPlayer />

        <div className="-bottom-10 absolute w-full">
          <div className="flex items-center justify-center">
            {player.deck
              .filter(card => !card.isOnBoard)
              .slice(0, MAX_HAND_CARDS)
              .map((card, index, array) => (
                <HandCard
                  key={card.id}
                  card={card}
                  arrayLength={array.length}
                  index={index}
                  onClick={() => playCard(card.id)}
                  isDisabled={player.mana < card.mana}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}