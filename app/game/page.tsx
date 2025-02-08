"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import GameLayout from "./layout"; // Layout wrapper
import { Button } from "@/components/ui/button";

export default function GamePage() {
  const { pointsNeeded, setPointsNeeded } = useGame();
  const [marketData, setMarketData] = useState<{ question: string; answer: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | "">("");
  const [feedback, setFeedback] = useState<string>("");

  // Fetch market data
  useEffect(() => {
    async function fetchMarketData() {
      try {
        const response = await fetch("/api/market"); // Call API route we created
        const data = await response.json();

        setMarketData({
          question: `What is Apple's current stock price?`,
          answer: data.price,
        });
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    }

    fetchMarketData();
  }, []);

  // Handle user answer submission
  const handleSubmit = () => {
    if (marketData && userAnswer !== "") {
      const difference = Math.abs(userAnswer - marketData.answer);
      let points = Math.max(0, 50 - difference); // Max 50 points, reducing for inaccuracy

      setPointsNeeded(pointsNeeded + points); // Update total points
      setFeedback(`Correct answer: ${marketData.answer}. You earned ${points} points!`);
    }
  };

  return (
    <GameLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Market Quiz</h1>
        <p>Points Needed: {pointsNeeded}</p>

        {marketData ? (
          <>
            <p className="mt-4">{marketData.question}</p>
            <input
              type="number"
              className="border p-2 mt-2"
              value={userAnswer}
              onChange={(e) => setUserAnswer(Number(e.target.value))}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
              Submit Answer
            </button>
            {feedback && <p className="mt-2">{feedback}</p>}
          </>
        ) : (
          <p>Loading market data...</p>
        )}
      </div>
    </GameLayout>
  );
}
