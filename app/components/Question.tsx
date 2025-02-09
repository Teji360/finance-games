import { useState } from "react";
import { Button } from "@/components/ui/button";

type QuestionProps = {
    question: string;
    stockSymbol: string;
    correctAnswer: number;

    onAnswer: (userGuess: number) => void;
};

const Question: React.FC<QuestionProps> = ({ question, stockSymbol, correctAnswer, onAnswer }) => {
    const [userGuess, setUserGuess] = useState<string>(""); // Store user input as string
    const [hintsRemaining, setHintsRemaining] = useState<number>(3); // Track hints left
    const [hint, setHint] = useState<string | null>(null); // Store hint text

    // Handle submitting the guess
    const handleSubmit = () => {
        const guess = parseFloat(userGuess); // Convert the input to a number
        if (!isNaN(guess)) {
            onAnswer(guess); // Call onAnswer with the numeric value
        }
    };

    // Handle showing a hint
    const handleHint = () => {
        if (hintsRemaining > 0) {
            const minRange = correctAnswer - 25;
            const maxRange = correctAnswer + 25;
            setHint(`Hint: The correct price is between $${minRange} and $${maxRange}`);
            setHintsRemaining(hintsRemaining - 1); // Decrease the number of hints left
        }
    };

    return (
        <div className="flex flex-col space-y-2">
               {/* Hints Section */}
               <div className="mt-4">
                {hintsRemaining > 0 ? (
                    <Button onClick={handleHint} className="bg-blue-500">
                        Get a Hint ({hintsRemaining} left)
                    </Button>
                ) : (
                    <p>No hints left for this round!</p>
                )}

                {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
            </div>
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
