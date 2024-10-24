import { useGameStore } from "@/store/game/game.store";
import styles from '@/components/ui/button/Button.module.scss';
import cn from 'clsx';
import { useState } from 'react';

export function EndTurnButton() {
    const {endTurn, currentTurn, isGameOver, player, opponent} = useGameStore();
    const [isHovered, setIsHovered] = useState(false);

    const isOpponentTurn = currentTurn === "opponent";
    const isGameEnded = isGameOver || player.health <= 0 || opponent.health <= 0;
    const isDisabled = isOpponentTurn || isGameEnded || player.health <= 0;

    const getButtonText = () => {
        if (isOpponentTurn) return "Opponent's Turn";
        if (isGameEnded) return "Game Over";
        if (player.health <= 0) return "You Lost";
        return isHovered ? "End Turn" : "Your Turn";
    };

    return (
        <button 
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
            onClick={isDisabled ? ()=> null : endTurn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>{getButtonText()}</span>
            <span>{getButtonText()}</span>
        </button>
    );
}
