'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../public/SelectDifficulty.png"
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { useEffect, useState } from "react";



export default function Home() {
    const router = useRouter();
    const { setPointsNeeded } = useGame();
    const [isMounted, setIsMounted] = useState(false);

    const handleDifficultySelect = (points: number) => {
        setPointsNeeded(points);
        router.push("/game");
    };


    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;
    return (
        <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">

            <Image src={Logo} height={200} width={400} alt="SelectDifficulty" />

            <Button className="bg-green-500" onClick={() => handleDifficultySelect(100)}>
                Easy
            </Button>

            <Button className="bg-yellow-500" onClick={() => handleDifficultySelect(200)}>
                Intermediate
            </Button>

            <Button className="bg-red-500" onClick={() => handleDifficultySelect(300)}>
                Hard
            </Button>

        </div>
    );
}
