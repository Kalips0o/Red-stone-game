import { useGameStore } from "@/store/game/game.store";
import { WelcomeScreen } from "../start-game/WelcomeScreen";
import { GameBoard } from "./board/GameBoard";
import { Notification } from "@/components/ui/notification/Notification";
import SmallScreenWarning from "@/components/SmallScreenWarning";
import { useState, useEffect } from "react";

export const Home = () => {
    const { isGameStarted } = useGameStore();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768); 
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (isSmallScreen) {
        return <SmallScreenWarning />;
    }

    return (
        <main>
            <Notification />
            {isGameStarted ? <GameBoard /> : <WelcomeScreen />}
        </main>
    );
};
