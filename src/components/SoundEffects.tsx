import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { useSoundStore } from '../store/game/actions/hero-attack';

export const SoundEffects: React.FC = () => {
  const [playPlayerScream1] = useSound('/src/assets/music/screamPlayer/womanScream1.mp3', { volume: 0.2 });
  const [playPlayerScream2] = useSound('/src/assets/music/screamPlayer/womanScream2.mp3', { volume: 0.2 });
  const [playOpponentScream1] = useSound('/src/assets/music/screamOpponent/scream1.mp3', { volume: 0.2 });
  const [playOpponentScream2] = useSound('/src/assets/music/screamOpponent/scream2.mp3', { volume: 0.2 });
  const [playCardDeal] = useSound('/src/assets/music/cardsPlay/mb_card_deal.mp3', { volume: 0.2 });
  const [playCardOnTable] = useSound('/src/assets/music/cardsPlay/card-on-the-table.mp3', { volume: 0.2 });
  const [playCardAttack] = useSound('/src/assets/music/cardsPlay/play-card.mp3', { volume: 0.2 });
  const [playWin] = useSound('/src/assets/music/endGame/win.mp3', { volume: 0.2 });
  const [playLose] = useSound('/src/assets/music/endGame/lose.mp3', { volume: 0.2 });

  useEffect(() => {
    useSoundStore.setState({
      playPlayerScream: () => Math.random() < 0.5 ? playPlayerScream1() : playPlayerScream2(),
      playOpponentScream: () => Math.random() < 0.5 ? playOpponentScream1() : playOpponentScream2(),
      playCardDeal: () => playCardDeal(),
      playCardOnTable: () => playCardOnTable(),
      playCardAttack: () => playCardAttack(),
      playWin: () => playWin(),
      playLose: () => playLose(),
    });
  }, [playPlayerScream1, playPlayerScream2, playOpponentScream1, playOpponentScream2, playCardDeal, playCardOnTable, playCardAttack, playWin, playLose]);

  return null;
};
