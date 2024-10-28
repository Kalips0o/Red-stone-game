import { EnumTypeCard } from "@/card.types";
import type { IGameStore } from "../../game.types";
import { attackCardAction } from "../attack-card";
import { attackHeroAction } from "../hero-attack";
import random from "lodash/random";
import { playCardAction } from "../play-card";
import { useSelectAttacker } from "../select-attacker";
import { useAttackedCardStore } from '../attacked-card';
import { useSoundStore } from "../hero-attack";

// Вспомогательная функция для создания задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Функция для выполнения случайного хода противника
export const randomOpponentPlay = async (state: IGameStore) => {
    let currentState: IGameStore = { ...state };

    // Сначала выложим карты
    let mana = currentState.opponent.mana;
    const playableCards = currentState.opponent.deck.filter(
        card => !card.isOnBoard && card.isOnHand && card.mana <= mana
    ).sort((a, b) => b.mana - a.mana); // Сортируем по мане

    // Выкладываем карты по одной
    for (const card of playableCards) {
        if (mana >= card.mana) {
            const playResult = playCardAction(currentState, card.id);
            
            if (playResult.opponent) {
                currentState = {
                    ...currentState,
                    player: playResult.player || currentState.player,
                    opponent: playResult.opponent
                };
                mana = currentState.opponent.mana;
                useSoundStore.getState().playCardOnTable();
                await delay(1000); // Задержка после выкладывания карты
            }
        }
    }

    await delay(500);

    // Затем выполняем атаки только картами, которые были на поле с прошлого хода
    const attackingCards = currentState.opponent.deck.filter(
        card => card.isOnBoard && !card.isPlayedThisTurn && card.isCanAttack
    );
    
    for (const card of attackingCards) {
        // Подсвечиваем атакующую карту и ждем
        useSelectAttacker.getState().setCardAttackerId(card.id);
        await delay(1000);

        const taunt = currentState.player.deck.find(
            card => card.type === EnumTypeCard.taunt && card.isOnBoard
        );

        if (taunt) {
            const attackResult = attackCardAction(currentState, card.id, taunt.id);
            currentState = {
                ...currentState,
                player: attackResult.player || currentState.player,
                opponent: attackResult.opponent || currentState.opponent
            };
            useAttackedCardStore.getState().setAttackedCardId(taunt.id);
        } else if (!currentState.player.deck.filter(card => card.isOnBoard).length) {
            const attackResult = attackHeroAction(currentState, card.id);
            currentState = {
                ...currentState,
                player: attackResult.player || currentState.player,
                opponent: attackResult.opponent || currentState.opponent
            };
        } else {
            if (random(10) > 5 && currentState.player.deck.length > 0) {
                const targetCard = currentState.player.deck.find(c => c.isOnBoard);
                if (targetCard) {
                    const attackResult = attackCardAction(currentState, card.id, targetCard.id);
                    currentState = {
                        ...currentState,
                        player: attackResult.player || currentState.player,
                        opponent: attackResult.opponent || currentState.opponent
                    };
                    useAttackedCardStore.getState().setAttackedCardId(targetCard.id);
                }
            } else {
                const attackResult = attackHeroAction(currentState, card.id);
                currentState = {
                    ...currentState,
                    player: attackResult.player || currentState.player,
                    opponent: attackResult.opponent || currentState.opponent
                };
            }
        }

        // Сбрасываем подсветку после атаки
        useSelectAttacker.getState().setCardAttackerId(null);
        await delay(800); // Ждем, чтобы увидеть результат атаки
    }

    return {
        ...currentState,
        opponent: {
            ...currentState.opponent,
            mana: 0
        },
        currentTurn: currentState.currentTurn,
        isGameOver: currentState.isGameOver,
        isGameStarted: currentState.isGameStarted,
        turn: currentState.turn,
        isPlayerTurnNotified: currentState.isPlayerTurnNotified
    };
};
