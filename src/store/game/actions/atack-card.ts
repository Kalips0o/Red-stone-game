import type { IGameCard, IGameStore } from "../game.types";
import { useDamageStore } from "./damage.store";

export const getCardById = (cardId: string, deck: IGameCard[]) =>
  deck.find(card => card.id === cardId);

export const attackCardAction = (
  state: IGameStore, // Состояние игры
  targetId: string, // ID карты-цели
  attackerId: string // ID карты-атакующего
) => {

  const isAttackerPlayer = state.currentTurn === 'player'; 

  // Логируем состояния колод перед атакой
  console.log('Колода игрока:', state.player.deck);
  console.log('Колода противника:', state.opponent.deck);

  // Получаем атакующую карту
  const attacker = getCardById(
    attackerId,
    isAttackerPlayer ? state.player.deck : state.opponent.deck // Атакующая карта ищется в колоде игрока или противника
  );

  // Получаем карту-цель
  const target = getCardById(
    targetId,
    isAttackerPlayer ? state.opponent.deck : state.player.deck // Цель ищется в колоде противника или игрока
  );


  // Логируем информацию об атакующей и целевой картах
  console.log(`Атакующая карта: ${attacker ? attacker.name : 'Не найдена'}, ID: ${attackerId}`);
  console.log(`Целевая карта: ${target ? target.name : 'Не найдена'}, ID: ${targetId}`);

  // Проверка: если атакующая карта и цель существуют и атакующая карта может атаковать
  if (attacker && target && attacker.isCanAttack) {
    // Логируем информацию о здоровье перед атакой
    console.log(`Здоровье атакующей карты до атаки: ${attacker.health}`);
    console.log(`Здоровье целевой карты до атаки: ${target.health}`);

    target.health -= attacker.attack; // Уменьшаем здоровье цели на величину атаки
    attacker.health -= target.attack; // Атакующий также получает урон от цели

    attacker.isCanAttack = false; // После атаки карта больше не может атаковать в этот ход

    // Добавляем урон для отображения на экране (используем damage store)
    useDamageStore.getState().addDamage(targetId, attacker.attack);
    useDamageStore.getState().addDamage(attackerId, target.attack);

    // Логируем информацию о здоровье после атаки
    console.log(`Здоровье атакующей карты после атаки: ${attacker.health}`);
    console.log(`Здоровье целевой карты после атаки: ${target.health}`);

   

if(target.health <= 0) {
if(isAttackerPlayer) {
state.opponent.deck=state.opponent.deck.filter(card => card.id !== targetId)
} else {
  state.player.deck=state.player.deck.filter(card => card.id !== targetId
  )
}
}



if(attacker.health <= 0) {
  if(isAttackerPlayer) {
  state.player.deck=state.player.deck.filter(card => card.id !== attackerId)
  } else {
    state.opponent.deck=state.opponent.deck.filter(card => card.id !== attackerId
    )
  }
  }
  

  }
    

  // Возвращаем обновленное состояние игроков
  return { player: state.player, opponent: state.opponent };
}
