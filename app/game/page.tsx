"use client"

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import GameLayout from "./layout"; 
import Question from "../components/Question"

// Predefined company symbols for simplicity
const companySymbols = ["AAPL", "GOOG", "AMZN", "MSFT", "TSLA"];

export default function GamePage() {
  const { pointsNeeded, setPointsNeeded } = useGame();
  const [marketData, setMarketData] = useState<{ question: string; answer: number; symbol: string } | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const fetchMarketData = async (symbol: string) => {
    try {
      const response = await fetch(`/api/market?symbol=${symbol}`); // Dynamic symbol in the query
      const data = await response.json();

      if (data.error) {
        console.error("Error fetching market data:", data.error);
        return;
      }

      setMarketData({
        question: `What is the current stock price of ${symbol}?`,
        answer: data.price,
        symbol: symbol,
      });

      setFeedback(""); // Clear any previous feedback
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  useEffect(() => {
    const randomSymbol = companySymbols[Math.floor(Math.random() * companySymbols.length)];
    fetchMarketData(randomSymbol); // Fetch for a random company from the predefined list
  }, []);

  const handleAnswer = (userGuess: number) => {
    if (marketData) {
      const difference = Math.abs(userGuess - marketData.answer);
      let points = Math.max(0, 50 - difference); // Points based on how close the guess is

      setPointsNeeded(pointsNeeded + points); // Update points
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
            <Question
              question={marketData.question}
              stockSymbol={marketData.symbol}
              correctAnswer={marketData.answer}
              onAnswer={handleAnswer} // Pass the answer handler to Question component
            />
            {feedback && <p className="mt-2">{feedback}</p>}
          </>
        ) : (
          <p>Loading market data...</p>
        )}

        <button
          onClick={() => {
            const randomSymbol = companySymbols[Math.floor(Math.random() * companySymbols.length)];
            fetchMarketData(randomSymbol); // Next question logic
          }}
          className="bg-gray-500 text-white px-4 py-2 mt-4"
        >
          Next Question
        </button>
      </div>
    </GameLayout>
  );
}
