import { Button } from "@/components/ui/button/Button";
import { useGameStore } from "@/store/game/game.store";

export function EndTurnButton() {
    const {endTurn, currentTurn, isGameOver, player, opponent} = useGameStore()

    const isOpponentTurn = currentTurn === "opponent"
    const isGameEnded = isGameOver || player.health <= 0 || opponent.health <= 0
    const isDisabled = isOpponentTurn || isGameEnded || player.health <= 0

    return <Button 
    className="absolute 
    right-4 z-10"
    style={{
        top: -29.25
    }}
    variant={ isDisabled ? 'disabled' : 'primary'} 
    disabled={isDisabled}
    onClick={isDisabled ? ()=> null : endTurn}
    >
    {isOpponentTurn ? 'Opponent Turn' : isGameEnded ? 'Game Over' : player.health <= 0 ? 'You Lost' : 'End Turn'}
    </Button>
}
