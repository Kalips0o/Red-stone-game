import { useSelectAttacker } from "@/store/game/actions/select-attacker";
import { useGameStore } from "@/store/game/game.store";

export function useEnemyTarget() {
  const { attackHero, attackCard, currentTurn } = useGameStore();
  const { cardAttackerId, setCardAttackerId } = useSelectAttacker();

  // Функция для обработки выбора цели атаки
  const handleSelectTarget = (targetId: string, isHero = false) => {
    if (!cardAttackerId) {
      console.log('Нет выбранной атакующей карты.');
      return;
    }
    if (currentTurn !== "player") {
      console.log('Не текущий ход игрока.');
      return;
    }
  
    console.log(`Выбрана цель: ${targetId}, атакующая карта: ${cardAttackerId}`);
  
    if (isHero) {
      attackHero(cardAttackerId); // Атаковать героя противника
    } else if (targetId) {
      attackCard(cardAttackerId, targetId); // Атаковать карту противника
    }
  
    setCardAttackerId(null); // Сбросить выбранного атакующего
  };

  return { handleSelectTarget }; // Возвращает функцию для использования в других компонентах
}
