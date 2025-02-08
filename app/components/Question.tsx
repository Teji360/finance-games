// components/Question.tsx

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type QuestionProps = {
  question: string;
  stockSymbol: string;
  correctAnswer: number;
  onAnswer: (userGuess: number) => void;
};

const Question: React.FC<QuestionProps> = ({ question, stockSymbol, correctAnswer, onAnswer }) => {
  const [userGuess, setUserGuess] = useState<number | "">("");

  const handleSubmit = () => {
    if (userGuess !== "") {
      onAnswer(Number(userGuess));
    }
  };

  return (
    <div className="flex flex-col">
      <h2>{question}</h2>
      <input
        type="number"
        value={userGuess}
        onChange={(e) => setUserGuess(Number(e.target.value))}
        placeholder={`Guess the stock price of ${stockSymbol}`}
      />
      <Button onClick={handleSubmit} className="m-auto bg-green-500">Submit</Button>
    </div>
  );
};

export default Question;
