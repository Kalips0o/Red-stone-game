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
    ...initialGameData,
    
    isGameStarted: false,

    startGame: () => set(startGameAction()),

    endTurn: () => {
        set(state => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return { ...state, isGameOver: true };
            }
            
            const updatedState = { ...state, ...endTurnAction(state) };
            
            if (!updatedState.isGameOver) {
                setTimeout(async () => {
                    set(state => ({
                        ...state,
                        isPlayerTurnNotified: false
                    }));

                    const finalState = await randomOpponentPlay(updatedState as IGameStore);
                    
                    set(() => {
                        if (!finalState.isGameOver) {
                            setTimeout(() => {
                                set(state => ({ ...state, ...endTurnAction(finalState) }));
                            }, 1500);
                        }
                        return finalState;
                    });
                }, 1500);
            }
            
            return updatedState;
        });
    },

    playCard: (cardId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            return { ...state, ...playCardAction(state, cardId) };
        });
    },

    returnCard: (cardId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            return { ...state, ...returnCardAction(state, cardId) };
        });
    },

    attackCard: (attackerId: string, targetId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            const newState = { ...state, ...attackCardAction(state, attackerId, targetId) };
            if (newState.player?.health <= 0 || newState.opponent?.health <= 0) {
                newState.isGameOver = true;
            }
            return newState;
        });
    },

    attackHero: (attackerId: string) => {
        set((state) => {
            if (state.isGameOver || state.player.health <= 0 || state.opponent.health <= 0) {
                return state;
            }
            const newState = { ...state, ...attackHeroAction(state, attackerId) };
            if (newState.player?.health <= 0 || newState.opponent?.health <= 0) {
                newState.isGameOver = true;
            }
            return newState;
        });
    },

    isGameOver: false,
}));

export { useGameStore };
