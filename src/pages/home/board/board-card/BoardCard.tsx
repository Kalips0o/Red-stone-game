import { useState, useEffect } from "react";
import type { IGameCard } from "@/store/game/game.types";
import { motion, AnimatePresence } from "framer-motion";
import cn from 'clsx';
import { useGameStore } from "@/store/game/game.store";
import { useEnemyTarget } from "./useEnemyTarget";
import { useSelectAttacker } from "@/store/game/actions/select-attacker";
import { DamageList } from "../DamageList";
import { Card } from "@/components/ui/cards/Card";
import { useRemoveCardStore } from "@/store/game/actions/attack-card";
import { useNotificationStore } from "@/store/notiffication/notification.store";
import { useSoundStore } from "@/store/game/actions/hero-attack";
import { useAttackedCardStore } from '@/store/game/actions/attacked-card';

interface Props {
  card: IGameCard; 
  isPlayerSide: boolean; 
}


export function BoardCard({ card, isPlayerSide }: Props) {
  const { handleSelectTarget } = useEnemyTarget();
  const { returnCard, currentTurn, isPlayerTurnNotified, attackCard, opponent } = useGameStore();
  const { setCardAttackerId, cardAttackerId } = useSelectAttacker();
  const [isHovered, setIsHovered] = useState(false);
  const [isDestroying, setIsDestroying] = useState(false);
  const cardsToRemove = useRemoveCardStore((state) => state.cardsToRemove);
  const { message } = useNotificationStore();
  const { playCardAttack } = useSoundStore();
  const attackedCardId = useAttackedCardStore((state) => state.attackedCardId);
  const isAttacked = attackedCardId === card.id;
  const [isShaking, setIsShaking] = useState(false);
  const [lastHealth, setLastHealth] = useState(card.health);

  useEffect(() => {
    if (cardsToRemove.includes(card.id)) {
      setIsDestroying(true);
    }
  }, [cardsToRemove, card.id]);

  useEffect(() => {
  
    if (card.health !== lastHealth) {
      setLastHealth(card.health);
      if (card.health <= 0) {
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
          setIsDestroying(true);
        }, 2500); 
      } else {
      
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 1000);
      }
    }
  }, [card.health, lastHealth]);

  const handleClick = (cardId: string) => {
    if (isPlayerSide) {
      if (card.isCanAttack) {
        setCardAttackerId(cardId);
      } else if (card.isPlayedThisTurn) {
        returnCard(cardId);
      }
    } else if (cardAttackerId) {
      attackCard(cardAttackerId, cardId);
      playCardAttack();
      setCardAttackerId(null);
    } else {
      handleSelectTarget(cardId, true);
    }
  };

  const isSelectPlayerAttacker = isPlayerSide && cardAttackerId === card.id;

  const cardVariants = {
    initial: { 
      scale: 0.5, 
      rotate: isPlayerSide ? 15 : -15, 
      y: isPlayerSide ? 200 : -200, 
      opacity: 0 
    },
    animate: {
      scale: 1,
      rotate: 0,
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 150, 
        damping: 20, 
        mass: 1,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.5,
      zIndex: 20,
      transition: { duration: 0.2 }
    },
    attacked: {
      x: [-5, 5, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const canEnlarge = currentTurn === "player" && isPlayerTurnNotified && !message;

  const isOpponentDefeated = opponent.health <= 0;

  return (
    <AnimatePresence>
      {!isDestroying && (
        <motion.div
          className={cn("h-[11.3rem] w-32 rounded-lg border-2 border-transparent border-solid transition-colors relative no-drag", 
            {
              'shake-animation': isShaking,
              'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]': card.health <= 0,
              'cursor-pointer border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.7)] bg-green-400/80': card.isCanAttack && !isSelectPlayerAttacker && isPlayerSide && currentTurn === "player" && !isOpponentDefeated,
              'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] bg-yellow-400/80': isSelectPlayerAttacker && currentTurn === "player" && !isOpponentDefeated,
              'border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.5)] bg-red-400/80': (
                (!isPlayerSide && cardAttackerId && currentTurn === "player") || 
                (!isPlayerSide && card.id === cardAttackerId && currentTurn === "opponent") 
              ) && !isOpponentDefeated,
              'cursor-not-allowed': currentTurn !== 'player' || isOpponentDefeated
            }
          )}
          variants={cardVariants}
          initial="initial"
          animate={[
            "animate", 
            isAttacked ? "attacked" : ""
          ]}
          whileHover={canEnlarge && !isOpponentDefeated ? "hover" : "animate"}
          onClick={() => (currentTurn !== 'player' || isOpponentDefeated ? null : handleClick(card.id))}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        > 
          <Card 
            mana={card.mana} 
            attack={card.attack} 
            health={card.health} 
            imageUrl={card.imageUrl} 
            isHovered={isHovered && canEnlarge}
            isDying={card.health <= 0}
          />
         <DamageList id={card.id} isRight /> 
        </motion.div>
      )}
      
    </AnimatePresence>
  );
}
