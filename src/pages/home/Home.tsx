import { useGameStore } from "@/store/game/game.store";
import { WelcomeScreen } from "../start-game/WelcomeScreen";
import { GameBoard } from "./board/GameBoard";
import { Notification } from "@/components/ui/notification/Notification";

export const Home = () => {

    const { isGameStarted} = useGameStore()

   
    return (
        <main >
            <Notification />
            {isGameStarted ? <GameBoard /> : <WelcomeScreen />}
        </main>
    )
}

