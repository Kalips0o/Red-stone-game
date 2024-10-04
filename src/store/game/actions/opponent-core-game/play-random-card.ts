import {type IGameStore } from "@/store/game/game.types";
import  random  from "lodash/random";
import { playCardAction } from "../play-card";

// Функция для выполнения случайного хода с картой противника
export const playRandomCard = (state: IGameStore, mana: number) => {
    // Получаем карты, которые можно сыграть: не на поле, в руке и с затратой маны меньше или равной доступной
    const playableCards = state.opponent.deck.filter(
        card => !card.isOnBoard && card.isOnHand && card.mana <= mana
    );

    // Если нет доступных карт для игры, возвращаем текущее состояние
    if (playableCards.length === 0) return state;

    // Получаем случайный индекс доступной карты
    const randomIndex = random(playableCards.length - 1);
    
    // Получаем случайную карту
    const randomCard = playableCards[randomIndex];

    // Выполняем действие по играм карты и получаем новое состояние
    const newState = playCardAction(state, randomCard.id);

    return newState; // Возвращаем обновленное состояние
};