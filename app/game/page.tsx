'use client'

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import GameLayout from "./layout";
import Question from "../components/Question";
import { Button } from "@/components/ui/button";
import Logo from "../../public/MarketQuestion.png";
import Image from "next/image";
import Link from "next/link";

const companySymbols = [
    "AAPL", "GOOG", "AMZN", "MSFT", "TSLA", "PLTR", "META", "NFLX", "NVDA",
    "SPY", "TSM", "INTC", "AMD", "BABA", "DIS", "V", "PYPL", "BA", "WMT", "UNH",
    "JPM", "GS", "VZ", "INTU", "HD", "MCD", "PFE", "CRM", "ORCL", "KO", "NKE",
    "GM", "XOM", "ADBE", "IBM", "CAT", "MMM", "NEE", "GE", "MS", "UPS",
    "LYFT", "SNAP", "TWTR", "BIDU", "MU", "LULU", "UBER", "F", "ATVI"
];

interface MarketData {
    question: string;
    answer: number;
    symbol: string;
    name: string;
}

export default function GamePage() {
    const { pointsNeeded, setPointsNeeded } = useGame();
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [feedback, setFeedback] = useState<string>("");

    // Fetch market data using a dynamic symbol
    const fetchMarketData = async (symbol: string) => {
        try {
            const response = await fetch(`/api/market?symbol=${symbol}`);
            const data = await response.json();

            console.log("API Response Data:", data);
            //For error testing

            // Check if the response contains the price data and name
            if (data && data.price && data.name) {
                setMarketData({
                    question: `What is the current stock price of ${data.name}?`,
                    answer: data.price,
                    symbol: symbol,
                    name: data.name, // Include the name
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
            const roundedDifference = Math.floor(difference);
            let points = Math.max(0, 50 - roundedDifference); // Points based on how close the guess is

            setPointsNeeded(pointsNeeded - points); // Update points
            setFeedback(`Correct answer: ${marketData.answer}. You earned ${points} points!`);
        }
    };

    return (
        <GameLayout>

            <div className="p-8">
                <Image src={Logo} height={200} width={400} alt="Market Question" />

                <Link href="/">
                    <Button className="bg-red-500 m-auto" >Exit</Button>
                </Link>
                

                <div className="w-full flex flex-col space-y-16">
                    <p className="font-sans font-semibold">Points Needed: {pointsNeeded}</p>

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
                        className="bg-gray-500 text-white px-4 py-2 m-auto"
                    >
                        Next Question
                    </Button>
                </div>

            </div>
        </GameLayout>
    );
}
