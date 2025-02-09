'use client'

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import GameLayout from "./layout";
import Question from "../components/Question";
import { Button } from "@/components/ui/button";
import Logo from "../../public/MarketQuestion.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


// Predefined company symbols with their image URLs
const companySymbols = [
    { symbol: 'AAPL', imageUrl: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.jpg" },
    { symbol: 'GOOG', imageUrl: "https://1000logos.net/wp-content/uploads/2021/05/Google-logo-500x281.png" },
    { symbol: 'AMZN', imageUrl: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-500x281.png" },
    { symbol: 'MSFT', imageUrl: "https://1000logos.net/wp-content/uploads/2017/04/Microsoft-Logo.png" },
    { symbol: 'TSLA', imageUrl: "https://1000logos.net/wp-content/uploads/2021/04/Tesla-logo-500x281.png" },
    { symbol: 'PLTR', imageUrl: "https://1000logos.net/wp-content/uploads/2022/08/Palantir-Logo-500x281.png" },
    { symbol: 'META', imageUrl: "https://1000logos.net/wp-content/uploads/2021/10/Meta-Logo-500x281.png" },
    { symbol: 'NFLX', imageUrl: "https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo-500x281.png" },
    { symbol: 'NVDA', imageUrl: "https://1000logos.net/wp-content/uploads/2022/02/NVIDIA_logo-768x432.png" },
    { symbol: 'UBER', imageUrl: "https://1000logos.net/wp-content/uploads/2021/04/Uber-logo-500x175.png" },
    { symbol: 'AMD', imageUrl: "https://1000logos.net/wp-content/uploads/2020/05/AMD-Logo-500x313.png" },
    { symbol: 'LULU', imageUrl: "https://1000logos.net/wp-content/uploads/2017/08/Lululemon-Logo-500x414.png" },
    { symbol: 'TSM', imageUrl: "https://1000logos.net/wp-content/uploads/2021/08/TSMC-Logo-500x315.png" },

    // Add more symbols with their corresponding logos
];


interface MarketData {
    question: string;
    answer: number;
    symbol: string;
    imageUrl: string;
    name: string;
}

export default function GamePage() {
    const { pointsNeeded, setPointsNeeded } = useGame();
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [feedback, setFeedback] = useState<string>("");
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0); // Track number of questions answered

    const router = useRouter();


    // Fetch market data using a dynamic symbol
    const fetchMarketData = async (symbol: string) => {
        try {
            const response = await fetch(`/api/market?symbol=${symbol}`);
            const data = await response.json();

            console.log("API Response Data:", data);

            // Check if the response contains the price data and name
            if (data && data.price && data.name) {
                // Find the logo image URL for the symbol
                const company = companySymbols.find(c => c.symbol === symbol);
                setMarketData({
                    question: `What is the current stock price of ${data.name}?`,
                    answer: data.price,
                    symbol: symbol,
                    name: data.name,
                    imageUrl: company ? company.imageUrl : '', // Include the logo URL
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
        const randomSymbol = companySymbols[Math.floor(Math.random() * companySymbols.length)].symbol;
        fetchMarketData(randomSymbol);
    }, []); // This only runs on mount to fetch initial data
 

    // Handle the answer submission from the Question component
    const handleAnswer = (userGuess: number) => {
        if (marketData) {
            const difference = Math.abs(userGuess - marketData.answer);
            const roundedDifference = Math.floor(difference);
            let points = Math.max(0, 50 - roundedDifference); // Points based on how close the guess is

            if (points > pointsNeeded) {
                router.push("/results");
            }

            setPointsNeeded(pointsNeeded - points); // Update points
            setQuestionsAnswered(questionsAnswered + 1); // Increment the number of questions answered
            setFeedback(`Correct answer: ${marketData.answer}. You earned ${points} points!`);

          
        }

        
    };


    return (
        <GameLayout>
            <div className="p-8">
                <Image src={Logo} height={200} width={400} alt="Market Question" />

                <Link href="/">
                    <Button className="bg-red-500 m-auto">Exit</Button>
                </Link>

                <div className="w-full flex flex-col space-y-16">
                    <p className="font-sans font-semibold">Points Needed: {pointsNeeded}</p>

                    {marketData ? (
                        <>
                            <div className="flex items-center space-x-4 w-full justify-center">
                                <img src={marketData.imageUrl} alt={marketData.name} width={200} height={400} />
                                
                            </div>

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
                            const randomSymbol = companySymbols[Math.floor(Math.random() * companySymbols.length)].symbol;
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
