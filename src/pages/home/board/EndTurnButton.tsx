import { Button } from "@/components/ui/button/Button";
import { useGameStore } from "@/store/game/game.store";

export function EndTurnButton() {
    const {endTurn, currentTurn} = useGameStore()


    const isOpponentTurn = currentTurn === "opponent"

    return <Button 
    className="absolute 
    right-4 z-10"
    style={{
        top: -29.25
    }}
    variant={ isOpponentTurn ? 'disabled' : 'primary'} 
    disabled={isOpponentTurn}
    onClick={isOpponentTurn ? ()=> null : endTurn}
    >
    {isOpponentTurn ? 'Opponent Turn' : 'End Turn'}
    </Button>
}