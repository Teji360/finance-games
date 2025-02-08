'use client'

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import GameLayout from "./layout"; 
import Question from "../components/Question";
import { Button } from "@/components/ui/button";

const companySymbols = [
    "AAPL", "GOOG", "AMZN", "MSFT", "TSLA", "PLTR", "META", "NFLX", "NVDA", 
    "SPY", "TSM", "INTC", "AMD", "BABA", "DIS", "V", "PYPL", "BA", "WMT", "UNH",
    "JPM", "GS", "VZ", "INTU", "HD", "MCD", "PFE", "CRM", "ORCL", "KO", "NKE",
    "GM", "CVX", "XOM", "ADBE", "IBM", "CAT", "MMM", "NEE", "GE", "MS", "UPS", 
    "LYFT", "SNAP", "TWTR", "AMD", "BIDU", "MU", "LULU", "UBER", "F", "ATVI"
];

export default function GamePage() {
  const { pointsNeeded, setPointsNeeded } = useGame();
  const [marketData, setMarketData] = useState<{ question: string; answer: number; symbol: string } | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  // Fetch market data using a dynamic symbol
  const fetchMarketData = async (symbol: string) => {
    try {
      const response = await fetch(`/api/market?symbol=${symbol}`);
      const data = await response.json();

      // Check if the response contains the price data
      if (data && data.price) {
        setMarketData({
          question: `What is the current stock price of ${symbol}?`,
          answer: data.price,
          symbol: symbol,
        });
        setFeedback(""); // Clear any previous feedback
      } else {
        console.error("Invalid response data:", data);
        setFeedback("Failed to fetch stock price.");
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
      setFeedback("Error fetching stock price.");
    }
  };

  useEffect(() => {
    const randomSymbol = companySymbols[Math.floor(Math.random() * companySymbols.length)];
    fetchMarketData(randomSymbol); // Fetch for a random company from the predefined list
  }, []);

  // Handle the answer submission from the Question component
  const handleAnswer = (userGuess: number) => {
    if (marketData) {
      const difference = Math.abs(userGuess - marketData.answer);
      let points = Math.max(0, 50 - difference); // Points based on how close the guess is

      setPointsNeeded(pointsNeeded - points); // Update points
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

        <Button
          onClick={() => {
            const randomSymbol = companySymbols[Math.floor(Math.random() * companySymbols.length)];
            fetchMarketData(randomSymbol); // Next question logic
          }}
          className="bg-gray-500 text-white px-4 py-2 mt-4"
        >
          Next Question
        </Button>
      </div>
    </GameLayout>
  );
}
