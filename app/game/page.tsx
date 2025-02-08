"use client";

import { useGame } from "@/context/GameContext";

export default function Home() {
  const { pointsNeeded } = useGame();

  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold">Game Page</h2>
      <p>Points Needed to Win: {pointsNeeded}</p>
    </div>
  );
}
