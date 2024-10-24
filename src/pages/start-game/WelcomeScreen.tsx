import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button/Button"; 
import { Heading } from "@/components/ui/heading/Heading";
import { Loader } from "@/components/ui/loader/Loader";
import { useGameStore } from "@/store/game/game.store";
import { useTransition } from "react";

import "./WelcomeScreen.scss";

export const WelcomeScreen = () => {
    const [isPending, startTransition] = useTransition();
    const { startGame } = useGameStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = '/assets/start-img.png'; // Ensure this path is correct
        img.onload = () => {
            setIsLoading(false);
        };
    }, []);

    const onClick = () => {
        startTransition(() => {
            startGame();
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-image">
                <Loader />
            </div>
        );
    }

    return (
        <div className="start-img flex flex-col items-center h-screen relative">
            <div className="game-title">
                <Heading>RED STONE</Heading>
            </div>
    
            <div className="button-container">
                <Button variant="start" onClick={onClick}>
                    {isPending ? <Loader /> : <span>Start</span>}
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
