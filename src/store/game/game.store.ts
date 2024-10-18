import { create } from 'zustand'
import { endTurnAction } from './actions/end-turn'
import { playCardAction } from './actions/play-card'
import { type IGameStore} from './game.types'
import { attackCardAction } from './actions/attack-card'
import { attackHeroAction } from './actions/hero-attack'
import { returnCardAction } from './actions/return-card'
import { initialGameData } from './actions/initial-data'
import { startGameAction } from './actions/start-game/start-game'
import { randomOpponentPlay } from './actions/opponent-core-game/random-opponent-play'




const useGameStore = create<IGameStore>((set) => ({
    // Инициализируем данные игры, используя данные из initialGameData
    ...initialGameData,
    
    // Указываем, что игра еще не началась
    isGameStarted: false,

    // Экшен для старта игры, вызывается startGameAction, который изменяет состояние игры
    startGame: () => set(startGameAction()),

    // Экшен для завершения хода
    endTurn: () => {
        set(state => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return { ...state, isGameOver: true };
            }
            
            const updatedState = endTurnAction(state);
            
            if (!updatedState.isGameOver) {
                setTimeout(() => {
                    set(state => {
                        const updatedState = randomOpponentPlay(state);
                        
                        if (!updatedState.isGameOver) {
                            setTimeout(() => {
                                set(() => endTurnAction(updatedState));
                            }, 2500);
                        }
                        
                        return updatedState;
                    });
                }, 3000);
            }
            
            return updatedState;
        });
    },

    // Экшен для разыгрывания карты, идентифицируем карту по её id
    playCard: (cardId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            return playCardAction(state, cardId);
        });
    },

    // Экшен для возвращения карты в руку игрока, идентифицируем карту по её id
    returnCard: (cardId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            return returnCardAction(state, cardId);
        });
    },

    // Экшен для атаки карты, идентифицируем атакующего и цель по их id
    attackCard: (attackerId: string, targetId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            const newState = attackCardAction(state, attackerId, targetId);
            if (newState.player?.health <= 0 || newState.opponent?.health <= 0) {
                newState.isGameOver = true;
            }
            return newState;
        });
    },

    // Экшен для атаки героя противника, идентифицируем атакующего по его id
    attackHero: (attackerId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            const newState = attackHeroAction(state, attackerId);
            if (newState.player && newState.opponent) {
                if (newState.player.health <= 0 || newState.opponent.health <= 0) {
                    newState.isGameOver = true;
                }
            }
            return newState;
        });
    },

    isGameOver: false,
}));

// Экспортируем состояние игры для использования в других частях приложения
export { useGameStore };
