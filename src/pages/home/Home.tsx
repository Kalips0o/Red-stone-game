import { useGameStore } from "@/store/game/game.store";
import { WelcomeScreen } from "../WelcomeScreen";
import { GameBoard } from "./board/GameBoard";
import { Notification } from "@/components/ui/notification/Notification";
import { useEffect } from "react";

export const Home = () => {

    const { isGameStarted, isGameOver, resetGameOver} = useGameStore()

    useEffect(() => {
        const timeout = setTimeout(() => {
            resetGameOver();
        }, 3500);

        return () => clearTimeout(timeout);
    }, [resetGameOver]);

    return (
        <main >
{ isGameOver && <Notification /> }
            {isGameStarted ? <GameBoard /> : <WelcomeScreen />}
        </main>
    )
}

