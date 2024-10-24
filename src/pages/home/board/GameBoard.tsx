import { useState, useEffect, useCallback } from "react";
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
import { NoCardsMessage } from "./NoCardsMessage";
import { AnimatePresence } from "framer-motion"; 

export function GameBoard() {
  const { player, opponent, playCard, turn } = useGameStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showNoCardsMessage, setShowNoCardsMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [hasPlayedCard, setHasPlayedCard] = useState(false);
  const [hasShownMessage, setHasShownMessage] = useState(false);

  useEffect(() => {
    const images = [
      ...player.deck.map(card => card.imageUrl),
      ...opponent.deck.map(card => card.imageUrl),
      '/assets/bg.png',
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

  useEffect(() => {
    if (turn === 1 && !hasPlayedCard && !hasShownMessage) {
      const playableCards = player.deck.filter(card => card.isOnHand && card.mana <= player.mana);
      setTimeout(() => {
        if (playableCards.length > 0) {
          setShowNoCardsMessage(true);
          setMessageText("You can play a card, or end your turn ");
        } else {
          setShowNoCardsMessage(true);
          setMessageText("No playable cards. End your turn.");
        }
        setHasShownMessage(true);
      }, 2000); 
    }
  }, [turn, player.deck, player.mana, hasPlayedCard, hasShownMessage]);

  const handleEndTurn = useCallback(() => {
    setShowNoCardsMessage(false);
    setHasPlayedCard(false);
  }, []);

  const handlePlayCard = useCallback((cardId: string) => {
    playCard(cardId);
    setMessageText("End your turn");
    setHasPlayedCard(true);
  }, [playCard]);

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
        <EndTurnButton isFirstTurn={turn === 1} noPlayableCards={showNoCardsMessage} onEndTurn={handleEndTurn} />
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
                  onClick={() => handlePlayCard(card.id)}
                  isDisabled={player.mana < card.mana}
                  isOpponent={false}
                />
              ))}
          </div>
        </div>
        <AnimatePresence>
          {showNoCardsMessage && <NoCardsMessage text={messageText} />}
        </AnimatePresence>
      </SectionSide>
    </div>
  );
}
