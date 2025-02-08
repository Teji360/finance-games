import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type QuestionProps = {
    question: string;
    stockSymbol: string;
    correctAnswer: number;
    onAnswer: (userGuess: number) => void;
};

const Question: React.FC<QuestionProps> = ({ question, stockSymbol, correctAnswer, onAnswer }) => {
    const [userGuess, setUserGuess] = useState<string>(""); // Store user input as string

    const handleSubmit = () => {
        const guess = parseFloat(userGuess); // Convert the input to a number
        if (!isNaN(guess)) {
            onAnswer(guess); // Call onAnswer with the numeric value
        }
    };

    return (
        <div className="flex flex-col space-y-2">

            
            <h2>{question}</h2>
            <input
            
                type="text" // Change input type to "text" to avoid the leading zero issue
                value={userGuess}
                className="border shadow rounded-sm h-10 p-2"
                onChange={(e) => setUserGuess(e.target.value.replace(/^0+/, ""))} // Remove leading zeros on input change
                placeholder={`Guess the stock price of ${stockSymbol}`}
            />
            <Button onClick={handleSubmit} className="m-auto bg-green-500">
                Submit
            </Button>
        </div>
    );
};

export default Question;
