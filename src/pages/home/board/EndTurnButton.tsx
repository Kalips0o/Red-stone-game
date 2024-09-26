import { Button } from "@/components/ui/button/Button";
import { useGameStore } from "@/store/game/game.store";

export function EndTurnButton() {
    const {endTurn} = useGameStore()
    return <Button variant='primary' className="absolute  right-4 z-10" onClick={endTurn}>
     End Turn
    </Button>
}