import { Button } from "@/components/ui/button/Button"; 
import { Heading } from "@/components/ui/heading/Heading";
import { Loader } from "@/components/ui/loader/Loader";
import { useGameStore } from "@/store/game/game.store";
import { useTransition } from "react";

import "./WelcomeScreen.scss";

export const WelcomeScreen = () => {
    const [isPending, startTransition] = useTransition();
    const { startGame } = useGameStore();

    const onClick = () => {
        startTransition(() => {
            startGame();
        });
    };

    return (
        <div className="start-img flex flex-col gap-20 items-center h-screen relative">
            <Heading>RED STONE</Heading>
    
            <div className="button-container">
                <Button variant="start"  onClick={onClick} className="mt-[15rem]">
                    {isPending ? <Loader /> : <span> Start</span>}
                
                </Button>
            </div>

            <div className="squares">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className={`square square-${index + 1}`}></div>
                ))}
            </div>
        </div>
    );
};
