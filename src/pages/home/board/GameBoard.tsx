import { useState, useEffect } from "react";
import { MAX_MANA } from "@/constants/game/core.constants";
import { useGameStore } from "../../../store/game/game.store";
import { GridBoardCards } from "./board-card/GridBoardCard";
import { HandCard } from "./hand-card/HandCard";
import { PlayerInfo } from "./player-info/PlayerInfo";
import { PlayerMana } from "./player-info/PlayerMana";
import { AudioPlayer } from "./audio-player/AudioPlayer";
import { EndTurnButton } from "./EndTurnButton";
import { SectionSide } from "./SectionSide";
import { DragonAnimation } from "@/components/DragonAnimation";
import { Loader } from "@/components/ui/loader/Loader";

export function GameBoard() {
  const { player, opponent, playCard } = useGameStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = [
      ...player.deck.map(card => card.imageUrl),
      ...opponent.deck.map(card => card.imageUrl),
      '/assets/bg.png', // Add any other background images or assets
    ];

    let loadedImages = 0;

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages += 1;
        if (loadedImages === images.length) {
          setIsLoading(false);
        }
      };
    });
  }, [player.deck, opponent.deck]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-image">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-image">
      <DragonAnimation />
      <SectionSide isPlayer={false}>
        <div>
          <PlayerInfo player={opponent} typePlayer="opponent" />
          <PlayerMana currentMana={opponent.mana} maxMana={MAX_MANA} typePlayer={"opponent"} />
          <div className="-top-12 absolute w-full">
            <div className="flex items-center justify-center">
              {opponent.deck
                .filter(card => card.isOnHand)
                .map((card, index, array) => (
                  <HandCard
                    key={card.id}
                    card={card}
                    arrayLength={array.length}
                    index={index}
                    isHided
                    isOpponent={true}
                  />
                ))}
            </div>
          </div>
        </div>
        <GridBoardCards deck={opponent.deck} isPlayerSide={false} />
      </SectionSide>

      <div className='absolute left-0 w-full' style={{ top: 'calc(50vh - 1px)' }}>
        <EndTurnButton />
      </div>

      <SectionSide isPlayer>
        <GridBoardCards deck={player.deck} isPlayerSide={true} />
        <PlayerInfo player={player} typePlayer="player" />
        <PlayerMana currentMana={player.mana} maxMana={MAX_MANA} typePlayer={"player"} />
        <AudioPlayer />
        <div className="-bottom-10 absolute w-full">
          <div className="flex items-center justify-center">
            {player.deck
              .filter(card => card.isOnHand)
              .map((card, index, array) => (
                <HandCard
                  key={card.id}
                  card={card}
                  arrayLength={array.length}
                  index={index}
                  onClick={() => playCard(card.id)}
                  isDisabled={player.mana < card.mana}
                  isOpponent={false}
                />
              ))}
          </div>
        </div>
      </SectionSide>
    </div>
  );
}
