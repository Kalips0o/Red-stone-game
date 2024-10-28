import {type IGameStore } from "@/store/game/game.types";
import random from "lodash/random";
import { playCardAction } from "../play-card";

export const playRandomCard = (state: IGameStore, mana: number, specificCardId?: string) => {
    const playableCards = state.opponent.deck.filter(
        card => !card.isOnBoard && card.isOnHand && card.mana <= mana
    );

    if (playableCards.length === 0) return state;

    let cardToPlay;
    if (specificCardId) {
        cardToPlay = playableCards.find(card => card.id === specificCardId);
        if (!cardToPlay) return state;
    } else {
        const randomIndex = random(playableCards.length - 1);
        cardToPlay = playableCards[randomIndex];
    }

    const newState = playCardAction(state, cardToPlay.id);

    return newState;
};
