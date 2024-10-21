import { MAX_HAND_CARDS } from "@/constants/game/core.constants";
import type {  IGameCard,  IHero } from "../game.types";

// Функция для вытягивания карт
export const drawCardsAction = (currentPlayer: IHero) => {

   // Количество карт, которые уже находятся на руке у текущего игрока
   const cardOnHands = currentPlayer.deck.filter(card => card.isOnHand).length;
 
   // Сколько карт нужно вытянуть, чтобы заполнить руку до максимального количества
   const cardNeeded = MAX_HAND_CARDS - cardOnHands;
 
   let drawCards = 0; // Счетчик вытянутых карт
 
   // Обновляем колоду игрока, вытягивая нужное количество карт
   const updatedDeck = currentPlayer.deck.map((card: IGameCard) => {
 
     // Если карта не была взята и не находится на руке, и пока мы не вытянули нужное количество карт
     if (!card.isTaken && !card.isOnHand && drawCards < cardNeeded) {
       drawCards++;  // Увеличиваем счетчик вытянутых карт
       return { ...card, isOnHand: true, isTaken: true };  // Помечаем карту как взятую и добавляем ее на руку
     }
 
     // Возвращаем карту без изменений, если она не была вытянута
     return card;
   });
 
   return updatedDeck;  // Возвращаем обновленную колоду игрока
 };
