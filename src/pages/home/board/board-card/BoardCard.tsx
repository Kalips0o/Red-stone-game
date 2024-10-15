import { useState, useEffect } from "react";
import type { IGameCard } from "@/store/game/game.types";
import { motion, AnimatePresence } from "framer-motion";
import cn from 'clsx';
import { useGameStore } from "@/store/game/game.store";
import { useEnemyTarget } from "./useEnemyTarget";
import { useSelectAttacker } from "@/store/game/actions/select-attacker";
import { DamageList } from "../DamageList";
import { Card } from "@/components/cards/Card";
import { useRemoveCardStore } from "@/store/game/actions/attack-card";
import { useNotificationStore } from "@/store/notiffication/notification.store";

interface Props {
  card: IGameCard; 
  isPlayerSide: boolean; 
}

const destroyAnimation = {
  initial: { opacity: 1, scale: 1, filter: "brightness(1)" },
  animate: { 
    opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
    scale: [1, 1.1, 1.2, 1.1, 1, 0.9],
    filter: ["brightness(1)", "brightness(1.5)", "brightness(2)", "brightness(1.5)", "brightness(1)", "brightness(0.5)"],
  },
  transition: { 
    duration: 1.5,
    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    ease: "easeInOut"
  }
};

export function BoardCard({ card, isPlayerSide }: Props) {
  const { handleSelectTarget } = useEnemyTarget();
  const { returnCard, currentTurn, isPlayerTurnNotified, attackCard } = useGameStore();
  const { setCardAttackerId, cardAttackerId } = useSelectAttacker();
  const [isHovered, setIsHovered] = useState(false);
  const [isDestroying, setIsDestroying] = useState(false);
  const cardsToRemove = useRemoveCardStore((state) => state.cardsToRemove);
  const { message } = useNotificationStore();

  useEffect(() => {
    if (cardsToRemove.includes(card.id)) {
      setIsDestroying(true);
    }
  }, [cardsToRemove, card.id]);

  const handleClick = (cardId: string) => {
    if (isPlayerSide) {
      if (card.isCanAttack) {
        setCardAttackerId(cardId);
      } else if (card.isPlayedThisTurn) {
        returnCard(cardId);
      }
    } else if (cardAttackerId) {
      attackCard(cardAttackerId, cardId);
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
      zIndex: 50,
      transition: { duration: 0.2 }
    }
  };

  const canEnlarge = currentTurn === "player" && isPlayerTurnNotified && !message;

  return (
    <AnimatePresence>
      {!isDestroying && (
        <motion.div
          className={cn("h-[11.3rem] w-32 rounded-lg border-2 border-transparent border-solid transition-colors relative", 
            {
              'cursor-pointer !border-green-400 shadow-2xl': card.isCanAttack && !isSelectPlayerAttacker && isPlayerSide && currentTurn === "player",
              '!border-primary shadow-2xl': isSelectPlayerAttacker,
              '!border-red-400': !isPlayerSide && cardAttackerId,
              'cursor-not-allowed': currentTurn !== 'player'
            }
          )}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover={canEnlarge ? "hover" : "animate"}
          onClick={() => (currentTurn !== 'player' ? null : handleClick(card.id))}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ zIndex: isHovered && canEnlarge ? 10 : 'auto' }}
        >
          <Card mana={card.mana} attack={card.attack} health={card.health} imageUrl={card.imageUrl} isHovered={isHovered && canEnlarge} />
          <DamageList id={card.id} isRight /> 
        </motion.div>
      )}
      {isDestroying && (
        <motion.div
          className="h-[11.3rem] w-32 rounded-lg relative"
          initial={destroyAnimation.initial}
          animate={destroyAnimation.animate}
          transition={destroyAnimation.transition}
          onAnimationComplete={() => {
            setIsDestroying(false);
          }}
        >
          <Card mana={card.mana} attack={card.attack} health={card.health} imageUrl={card.imageUrl} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
