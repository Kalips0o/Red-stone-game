import { create } from 'zustand'
import { endTurnAction } from './actions/end-turn'
import { playCardAction } from './actions/play-card'
import { type IGameStore} from './game.types'
import { attackCardAction } from './actions/atack-card'
import { attackHeroAction } from './actions/hero-atack'
import { returnCardAction } from './actions/return-card'
import { initialGameData } from './actions/initial-data'
import { startGameAction } from './actions/start-game/start-game'
import { randomOpponentPlay } from './actions/opponent-core-game/random-opponent-play'




const useGameStore = create<IGameStore>(set => ({
    // Инициализируем данные игры, используя данные из initialGameData
    ...initialGameData,
    
    // Указываем, что игра еще не началась
    isGameStarted: false,

    // Экшен для старта игры, вызывается startGameAction, который изменяет состояние игры
    startGame: () => set(startGameAction()),

    // Экшен для завершения хода
    endTurn: () => {
        // Устанавливаем состояние игры как завершенный ход
        set(endTurnAction);
        
        // Через 3 секунды запускаем ход оппонента
        setTimeout(() => {
            set(state => {
                // Выполняем случайный ход оппонента, обновляем состояние игры
                const updatedState = randomOpponentPlay(state);

                // Через 2.5 секунды завершаем ход оппонента, применяя его действия
                setTimeout(() => {
                    set(() => endTurnAction(updatedState));
                }, 2500);

                return updatedState;
            });
        }, 3000);
    },

    // Экшен для разыгрывания карты, идентифицируем карту по её id
    playCard: (cardId: string) => {
        // Обновляем состояние игры с учетом разыгранной карты
        set((state) => playCardAction(state, cardId));
    },

    // Экшен для возвращения карты в руку игрока, идентифицируем карту по её id
    returnCard: (cardId: string) => {
        // Обновляем состояние игры с учетом возвращенной карты
        set((state) => returnCardAction(state, cardId));
    },

    // Экшен для атаки карты, идентифицируем атакующего и цель по их id
    attackCard: (attackerId: string, targetId: string) => {
        // Обновляем состояние игры с учетом атаки карты
        set((state) => attackCardAction(state, attackerId, targetId));
    },

    // Экшен для атаки героя противника, идентифицируем атакующего по его id
    attackHero: (attackerId: string) => {
        // Обновляем состояние игры с учетом атаки героя
        set((state) => attackHeroAction(state, attackerId));
    },
}));

// Экспортируем состояние игры для использования в других частях приложения
export { useGameStore };