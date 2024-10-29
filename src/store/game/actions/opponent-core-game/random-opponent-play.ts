import { EnumTypeCard } from "@/card.types";
import type { IGameStore } from "../../game.types";
import { attackCardAction } from "../attack-card";
import { attackHeroAction } from "../hero-attack";
import random from "lodash/random";
import { playCardAction } from "../play-card";
import { useSelectAttacker } from "../select-attacker";
import { useAttackedCardStore } from '../attacked-card';
import { useSoundStore } from "../hero-attack";
import { useGameStore } from "../../game.store";

// Вспомогательная функция для создания задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Функция для выполнения случайного хода противника
export const randomOpponentPlay = async (state: IGameStore) => {
    let currentState: IGameStore = { ...state };

    // Сначала выложим карты
    let mana = currentState.opponent.mana;
    const playableCards = currentState.opponent.deck.filter(
        card => !card.isOnBoard && card.isOnHand && card.mana <= mana
    ).sort((a, b) => b.mana - a.mana); 

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
                useGameStore.setState(currentState);
                await delay(750); 
            }
        }
    }

    await delay(1100); 

    // Затем выполняем атаки
    const attackingCards = currentState.opponent.deck.filter(
        card => card.isOnBoard && !card.isPlayedThisTurn && card.isCanAttack
    );
    
    for (const card of attackingCards) {
        // Подсвечиваем атакующую карту
        useSelectAttacker.getState().setCardAttackerId(card.id);
        await delay(1500); 

        const taunt = currentState.player.deck.find(
            card => card.type === EnumTypeCard.taunt && card.isOnBoard
        );

        let attackResult;
        if (taunt) {
            attackResult = attackCardAction(currentState, card.id, taunt.id);
            useAttackedCardStore.getState().setAttackedCardId(taunt.id);
        } else if (!currentState.player.deck.filter(card => card.isOnBoard).length) {
            attackResult = attackHeroAction(currentState, card.id);
        } else {
            if (random(10) > 5 && currentState.player.deck.length > 0) {
                const targetCard = currentState.player.deck.find(c => c.isOnBoard);
                if (targetCard) {
                    attackResult = attackCardAction(currentState, card.id, targetCard.id);
                    useAttackedCardStore.getState().setAttackedCardId(targetCard.id);
                }
            } else {
                attackResult = attackHeroAction(currentState, card.id);
            }
        }

        if (attackResult) {
            currentState = {
                ...currentState,
                player: attackResult.player || currentState.player,
                opponent: attackResult.opponent || currentState.opponent
            };
            useGameStore.setState(currentState);

            if (currentState.player.health <= 0) {
                currentState.isGameOver = true;
                break; 
            }
        }

     
        await delay(3000); 
        
        useSelectAttacker.getState().setCardAttackerId(null);
        useAttackedCardStore.getState().setAttackedCardId(null);
        
        await delay(1000);
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
