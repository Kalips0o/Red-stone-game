import { create } from "zustand";

// Интерфейс для состояния магазина урона
interface IDamageStore {
  damages: {
    [key: string]: { id: string; amount: number }[]; // Урон по каждой карте хранится в виде массива объектов с id и количеством урона
  };
  addDamage: (cardId: string, damage: number) => void; // Метод для добавления урона по карте
}

// Создаем Zustand магазин для хранения урона
export const useDamageStore = create<IDamageStore>((set) => ({
  damages: {}, // Инициализируем объект урона пустым

  // Метод для добавления урона по карте
  addDamage: (cardId, damage) => {
    const damageId = `${cardId}-${Date.now()}`; // Уникальный ID для каждого нанесенного урона (используем время для уникальности)

    // Обновляем состояние, добавляя новый урон по карте
    set((state) => ({
      damages: {
        ...state.damages, // Сохраняем существующий урон
        [cardId]: [
          ...(state.damages[cardId] || []), // Если урон по карте уже есть, добавляем новый урон к существующему массиву
          { id: damageId, amount: damage }, // Добавляем новый объект урона
        ],
      },
    }));

    // Через 2 секунды удаляем добавленный урон из состояния
    setTimeout(() => {
      set((state) => ({
        damages: {
          ...state.damages, // Сохраняем остальной урон
          [cardId]: state.damages[cardId].filter((d) => d.id !== damageId), // Удаляем урон с соответствующим id после истечения времени
        },
      }));
    }, 2000); // Урон отображается 2 секунды, после чего удаляется
  },
}));
