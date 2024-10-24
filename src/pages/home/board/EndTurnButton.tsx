import { useGameStore } from "@/store/game/game.store";
import styles from '@/components/ui/button/Button.module.scss';
import cn from 'clsx';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface EndTurnButtonProps {
    isFirstTurn: boolean;
    noPlayableCards: boolean;
    onEndTurn: () => void;
}

export function EndTurnButton({ isFirstTurn, noPlayableCards, onEndTurn }: EndTurnButtonProps) {
    const {endTurn, currentTurn, isGameOver, player, opponent} = useGameStore();
    const [isHovered, setIsHovered] = useState(false);

    const isOpponentTurn = currentTurn === "opponent";
    const isGameEnded = isGameOver || player.health <= 0 || opponent.health <= 0;
    const isDisabled = isOpponentTurn || isGameEnded || player.health <= 0;

    const getButtonText = () => {
        if (isOpponentTurn) return "Opponent's Turn";
        if (isGameEnded) return "Game Over";
        if (player.health <= 0) return "You Lost";
        return isHovered || (isFirstTurn && noPlayableCards) ? "End Turn" : "Your Turn";
    };

    const buttonVariants = {
        highlight: {
            boxShadow: ['0 0 0 rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.8)', '0 0 0 rgba(255,255,255,0)'],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse' as const,
            },
        },
    };

    const handleClick = () => {
        if (!isDisabled) {
            endTurn();
            onEndTurn();
        }
    };

    return (
        <motion.button 
            className={cn(styles.button, styles.endTurn, {
                [styles.disabled]: isDisabled
            })}
            style={{
                position: 'absolute',
                right: '1.7rem',
                top: '-30px',
                zIndex: 10
            }}
            disabled={isDisabled}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={buttonVariants}
            animate={isFirstTurn && noPlayableCards ? 'highlight' : 'initial'}
        >
            <span>{getButtonText()}</span>
            <span>{getButtonText()}</span>
        </motion.button>
    );
}
