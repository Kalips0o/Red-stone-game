import { EnumTypeCard } from "@/card.types";
import type { IGameStore } from "../../game.types";
import { attackCardAction } from "../attack-card";
import { attackHeroAction } from "../hero-attack";
import random from "lodash/random";
import { MAX_MANA } from "@/constants/game/core.constants";
import { playRandomCard } from "./play-random-card";


// Функция для выполнения случайного хода противника
export const randomOpponentPlay = (state: IGameStore) => {
    const opponent = state.opponent; // Получаем состояние противника

    // Проходим по всем картам на поле противника
    opponent.deck
        .filter(card => card.isOnBoard) // Фильтруем карты, находящиеся на поле
        .forEach(card => {
            // Ищем карты типа "таунт" у игрока
            const taunt = state.player.deck.find(
                card => card.type === EnumTypeCard.taunt && card.isOnBoard
            );

            // Если есть карта "таунт", атакуем ее
            if (taunt) {
                state = { ...state, ...attackCardAction(state, card.id, taunt.id) };
                return; // Выходим из текущей итерации
            }

            // Если у игрока нет карт на поле, атакуем героя игрока
            if (!state.player.deck.filter(card => card.isOnBoard).length) {
                state = { ...state, ...attackHeroAction(state, card.id) };
                return; // Выходим из текущей итерации
            }

            // Случайное решение: атаковать карту игрока или героя
            if (random(10) > 5 && state.player.deck) {
                const targetId = state.player.deck[random(state.player.deck.length)].id; // Случайная карта игрока для атаки
                state = { ...state, ...attackCardAction(state, card.id, targetId) };
            } else {
                state = { ...state, ...attackHeroAction(state, card.id) }; // Атакуем героя
            }
        });

    let mana = opponent.mana; // Получаем количество маны противника
    let iterations = 0; // Счетчик итераций

    // Выполняем случайные ходы, пока есть мана и не превышено максимальное количество итераций
    while (mana > 0 && iterations <= MAX_MANA) {
        const newState = playRandomCard(state, mana); // Выполняем случайный ход
        mana = newState.opponent.mana; // Обновляем количество маны
        state = { ...state, ...newState }; // Обновляем состояние игры
        iterations++; // Увеличиваем счетчик итераций
    }

    return {
        ...state,
        opponent: {
            ...state.opponent,
            mana: 0 // Устанавливаем ману противника в 0 после хода
        },
    };
};
