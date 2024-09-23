import { Button } from "@/components/ui/button/Button"
import { Heading } from "@/components/ui/heading/Heading";
import { useGameStore } from "@/store/game/game.store";

export const WelcomeScreen = () => {
    const {startGame} = useGameStore()
    return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
            <Heading>RED STONE</Heading>
        <Button variant="primary" onClick={startGame}>Start game</Button>
        </div>
    )
}