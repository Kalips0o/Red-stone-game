import { Button } from "@/components/ui/button/Button";
import { useGameStore } from "@/store/game/game.store";

export function EndTurnButton() {
    const {endTurn} = useGameStore()
    // const isOpponentTurn = currentTurn === "opponent"
    return <Button 
    className="absolute 
    right-4 z-10"
    variant="primary"
    // variant={ isOpponentTurn ? 'disabled' : 'primary'} 
    // disabled={isOpponentTurn}
    onClick={endTurn}
    // onClick={isOpponentTurn ? ()=> null : endTurn}
    style={{
        top: -29.25
    }}>
     End Turn
    </Button>
}