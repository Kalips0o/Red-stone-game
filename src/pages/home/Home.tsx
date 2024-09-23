import { useGameStore } from "@/store/game/game.store";
import { WelcomeScreen } from "../WelcomeScreen";
import { GameBoard } from "./board/GameBoard";

export const Home = () => {
    const { isGameStarted} = useGameStore()
    return (
        <main >
            {isGameStarted ? <GameBoard /> : <WelcomeScreen />}
        </main>
    )
}

